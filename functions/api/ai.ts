import { createClient } from "@supabase/supabase-js";

type Env = {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  GEMINI_API_KEY: string;
};

export const onRequestPost = async ({ request, env }: any) => {
  try {
    const auth = request.headers.get("Authorization") || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
    if (!token) return json({ error: "未登录用户" }, 401);

    const body = (await request.json().catch(() => null)) as any;
    const prompt = body?.prompt?.trim();
    if (!prompt) return json({ error: "prompt 不能为空" }, 400);

    const supabase = createClient(
      env.SUPABASE_URL,
      env.SUPABASE_SERVICE_ROLE_KEY,
      {
        global: {
          headers: { Authorization: `Bearer ${token}` },
        },
      }
    );

    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userData?.user) {
      return json({ error: "无效用户" }, 401);
    }

    const answer = await callGemini(env.GEMINI_API_KEY, prompt);

    const { error: insertErr } = await supabase
      .from("messages")
      .insert([{ user_id: userData.user.id, prompt, answer }]);

    if (insertErr) return json({ error: insertErr.message }, 500);

    return json({ answer });
  } catch (e: any) {
    return json({ error: e?.message || String(e) }, 500);
  }
};

function json(obj: any, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

async function callGemini(apiKey: string, prompt: string) {
  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
    apiKey;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  const data: any = await res.json();
  if (!res.ok) {
    throw new Error(data?.error?.message || "Gemini API 调用失败");
  }

  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "（Gemini 没有返回文本）"
  );
}