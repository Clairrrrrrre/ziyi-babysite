export default {
    async fetch(request, env) {
      const url = new URL(request.url);
  
      // ---- CORS (让浏览器 fetch 不再 Failed to fetch) ----
      const corsHeaders = {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "GET,POST,OPTIONS",
        "access-control-allow-headers": "Content-Type, Authorization",
      };
  
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: corsHeaders });
      }
  
      // ---- health check ----
      if (url.pathname === "/hello") {
        return new Response("hello from pages functions", {
          headers: { "content-type": "text/plain; charset=utf-8", ...corsHeaders },
        });
      }
  
      // ---- API: /api/ai ----
      if (url.pathname === "/api/ai") {
        if (request.method !== "POST") {
          return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
            status: 405,
            headers: { "content-type": "application/json; charset=utf-8", ...corsHeaders },
          });
        }
  
        try {
          const auth = request.headers.get("Authorization") || "";
          const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
          if (!token) {
            return json({ error: "未登录用户（缺少 Bearer token）" }, 401, corsHeaders);
          }
  
          const bodyText = await request.text();
          if (!bodyText) return json({ error: "body 不能为空" }, 400, corsHeaders);
  
          let body;
          try {
            body = JSON.parse(bodyText);
          } catch {
            return json({ error: "body 必须是合法 JSON" }, 400, corsHeaders);
          }
  
          const prompt = (body?.prompt || "").trim();
          if (!prompt) return json({ error: "prompt 不能为空" }, 400, corsHeaders);
  
          // env check
          if (!env.SUPABASE_URL) return json({ error: "SUPABASE_URL missing" }, 500, corsHeaders);
          if (!env.SUPABASE_SERVICE_ROLE_KEY) return json({ error: "SUPABASE_SERVICE_ROLE_KEY missing" }, 500, corsHeaders);
          if (!env.GEMINI_API_KEY) return json({ error: "GEMINI_API_KEY missing" }, 500, corsHeaders);
  
          // 1) 用 token 去 Supabase Auth 拿 user
          const user = await getSupabaseUser(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, token);
  
          // 2) 调 Gemini
          const answer = await callGemini(env.GEMINI_API_KEY, prompt);
  
          // 3) 写 messages 表（用 service role，demo 先不管 RLS）
          await insertMessage(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
            user_id: user.id,
            prompt,
            answer,
          });
  
          return json({ answer }, 200, corsHeaders);
        } catch (e) {
          return json({ error: e?.message || String(e) }, 500, corsHeaders);
        }
      }
  
      // 其他请求走静态资源
      return env.ASSETS.fetch(request);
    },
  };
  
  function json(obj, status, corsHeaders) {
    return new Response(JSON.stringify(obj), {
      status,
      headers: { "content-type": "application/json; charset=utf-8", ...corsHeaders },
    });
  }
  
  async function getSupabaseUser(supabaseUrl, serviceRoleKey, userToken) {
    const res = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${userToken}`,
      },
    });
  
    const text = await res.text();
    if (!res.ok) throw new Error(`Supabase auth error ${res.status}: ${text}`);
  
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(`Supabase auth returned non-JSON: ${text}`);
    }
  
    if (!data?.id) throw new Error("Supabase auth: user not found");
    return data;
  }
  
  async function insertMessage(supabaseUrl, serviceRoleKey, row) {
    const res = await fetch(`${supabaseUrl}/rest/v1/messages`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify([row]),
    });
  
    const text = await res.text();
    if (!res.ok) throw new Error(`Supabase insert error ${res.status}: ${text}`);
  }
  
  async function callGemini(apiKey, prompt) {
    const url =
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=" +
      apiKey;
  
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      }),
    });
  
    const text = await res.text();
    if (!res.ok) throw new Error(`Gemini error ${res.status}: ${text}`);
  
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(`Gemini returned non-JSON: ${text}`);
    }
  
    return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "（Gemini 没有返回内容）";
  }