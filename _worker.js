export default {
    async fetch(request, env) {
      const url = new URL(request.url);
  
      // 0) health check
      if (url.pathname === "/hello") {
        return new Response("hello from pages functions", {
          headers: { "content-type": "text/plain; charset=utf-8" },
        });
      }
  
      // 1) AI API: POST /api/ai
      if (url.pathname === "/api/ai") {
        // CORS / preflight
        if (request.method === "OPTIONS") {
          return new Response(null, { status: 204, headers: corsHeaders() });
        }
        if (request.method !== "POST") {
          return json({ error: "Method Not Allowed" }, 405);
        }
  
        try {
          // ---- env check ----
          assertEnv(env, ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "GEMINI_API_KEY"]);
  
          // ---- auth: must have Bearer access token ----
          const auth = request.headers.get("Authorization") || "";
          const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
          if (!token) return json({ error: "未登录用户（缺少 Bearer token）" }, 401);
  
          // ---- body ----
          const body = await safeJson(request);
          const prompt = (body?.prompt || "").trim();
          if (!prompt) return json({ error: "prompt 不能为空" }, 400);
  
          // ---- 1) verify user via Supabase Auth (get user) ----
          const userRes = await fetch(`${env.SUPABASE_URL}/auth/v1/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
              apikey: env.SUPABASE_SERVICE_ROLE_KEY, // 用 service role 作 apikey（稳定）
            },
          });
          const userText = await userRes.text();
          if (!userRes.ok) {
            return json({ error: `无效用户: ${userRes.status} ${userText}` }, 401);
          }
          const userJson = JSON.parse(userText);
          const userId = userJson?.id;
          if (!userId) return json({ error: "无效用户：缺少 user id" }, 401);
  
          // ---- 2) call Gemini ----
          const answer = await callGemini(env.GEMINI_API_KEY, prompt);
  
          // ---- 3) insert into Supabase DB (messages) ----
          const insertRes = await fetch(`${env.SUPABASE_URL}/rest/v1/messages`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
              apikey: env.SUPABASE_SERVICE_ROLE_KEY,
              "Content-Type": "application/json",
              Prefer: "return=minimal",
            },
            body: JSON.stringify([{ user_id: userId, prompt, answer }]),
          });
  
          if (!insertRes.ok) {
            const t = await insertRes.text();
            return json({ error: `DB insert failed: ${insertRes.status} ${t}` }, 500);
          }
  
          return json({ answer }, 200);
        } catch (e) {
          return json({ error: e?.message || String(e) }, 500);
        }
      }
  
      // 2) everything else -> static assets
      return env.ASSETS.fetch(request);
    },
  };
  
  function corsHeaders() {
    return {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
  }
  
  function json(obj, status = 200) {
    return new Response(JSON.stringify(obj), {
      status,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ...corsHeaders(),
      },
    });
  }
  
  async function safeJson(request) {
    const text = await request.text();
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  }
  
  function assertEnv(env, keys) {
    for (const k of keys) {
      if (!env[k]) throw new Error(`${k} missing`);
    }
  }
  
  async function callGemini(apiKey, prompt) {
    // 你老板要求：gemini-2.5-flash
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
    if (!text) throw new Error("Gemini empty response body");
  
    const data = JSON.parse(text);
    return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "（Gemini 没有返回内容）";
  }