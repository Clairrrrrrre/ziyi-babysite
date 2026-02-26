export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // ---- CORS 预检 ----
    if (request.method === "OPTIONS") {
      return cors(new Response(null, { status: 204 }));
    }

    // ---- 健康检查 ----
    if (url.pathname === "/hello" && request.method === "GET") {
      return cors(
        new Response("hello v3 worker + api enabled", {
          headers: { "content-type": "text/plain; charset=utf-8" },
        })
      );
    }

    // ---- /api/ai ----
    if (url.pathname === "/api/ai") {
      if (request.method !== "POST") {
        return cors(json({ error: "Method Not Allowed" }, 405));
      }

      try {
        // 1) 取登录 token（前端会带 Authorization: Bearer <access_token>）
        const auth = request.headers.get("Authorization") || "";
        const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
        if (!token) return cors(json({ error: "未登录用户" }, 401));

        // 2) 读 prompt
        const bodyText = await request.text();
        if (!bodyText) return cors(json({ error: "body 不能为空" }, 400));
        let body;
        try {
          body = JSON.parse(bodyText);
        } catch {
          return cors(json({ error: "body 必须是 JSON" }, 400));
        }
        const prompt = (body?.prompt || "").trim();
        if (!prompt) return cors(json({ error: "prompt 不能为空" }, 400));

        // 3) 校验 env
        const SUPABASE_URL = env.SUPABASE_URL;
        const SUPABASE_SERVICE_ROLE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;
        const GEMINI_API_KEY = env.GEMINI_API_KEY;
        if (!SUPABASE_URL) return cors(json({ error: "SUPABASE_URL missing" }, 500));
        if (!SUPABASE_SERVICE_ROLE_KEY)
          return cors(json({ error: "SUPABASE_SERVICE_ROLE_KEY missing" }, 500));
        if (!GEMINI_API_KEY) return cors(json({ error: "GEMINI_API_KEY missing" }, 500));

        // 4) 用 Supabase Auth API 验证 token 并拿到 user.id
        const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
          method: "GET",
          headers: {
            apikey: SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${token}`,
          },
        });

        const userText = await userRes.text();
        if (!userRes.ok) {
          return cors(json({ error: `Supabase auth error ${userRes.status}: ${userText}` }, 401));
        }

        let userJson;
        try {
          userJson = JSON.parse(userText);
        } catch {
          return cors(json({ error: "Supabase auth returned non-JSON" }, 500));
        }

        const userId = userJson?.id;
        if (!userId) return cors(json({ error: "无效用户" }, 401));

        // 5) 调 Gemini 2.5 Flash（按你老板要求）
        const answer = await callGeminiV1(GEMINI_API_KEY, prompt);

        // 6) 写入 messages 表（PostgREST）
        const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/messages`, {
          method: "POST",
          headers: {
            apikey: SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`, // 用 service role 写库
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify([{ user_id: userId, prompt, answer }]),
        });

        const insertText = await insertRes.text();
        if (!insertRes.ok) {
          return cors(json({ error: `Supabase insert error ${insertRes.status}: ${insertText}` }, 500));
        }

        return cors(json({ answer }));
      } catch (e) {
        return cors(json({ error: e?.message || String(e) }, 500));
      }
    }

    // 其他路径：交给静态站点（不要拦截）
    return fetch(request);
  },
};

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function cors(res) {
  const h = new Headers(res.headers);
  h.set("Access-Control-Allow-Origin", "*");
  h.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  h.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return new Response(res.body, { status: res.status, headers: h });
}

async function callGeminiV1(apiKey, prompt) {
  const url =
    "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=" +
    apiKey;

  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
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