import { serveEdgeFunction } from "../_shared/edgeFunction.ts";
import { corsHeaders } from "../_shared/cors.ts";

// 调用 Gemini 生成回答
async function callGemini(apiKey: string, prompt: string) {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY missing");
  }

  const url =
    "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=" +
    apiKey;

  console.log("[ai] Gemini 请求开始");

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    }),
  });

  const text = await res.text();

  if (!res.ok) {
    console.error("[ai] Gemini 请求失败", res.status, text);
    throw new Error(`Gemini error ${res.status}: ${text}`);
  }

  const data = JSON.parse(text);
  const answer =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ??
    "（Gemini 没有返回内容）";

  console.log("[ai] Gemini 返回成功，长度:", answer.length);

  return answer;
}

// 统一入口：强制登录 + 记录日志 + 写入 messages 表
serveEdgeFunction(
  async ({ req, supabaseService, user }) => {
    console.log("[ai] 收到请求", req.method, req.url);

    // 只允许 POST
    if (req.method !== "POST") {
      console.warn("[ai] 方法不允许", req.method);
      return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 解析 POST body
    let body: { prompt?: string } = {};
    try {
      body = await req.json();
    } catch (error) {
      console.error("[ai] 解析 JSON 失败", error);
      throw new Error("body 必须是 JSON");
    }

    const prompt = (body?.prompt || "").trim();
    console.log("[ai] POST 参数 prompt:", prompt);

    if (!prompt) {
      throw new Error("prompt 不能为空");
    }

    // 当前登录用户（强制登录模式）
    console.log("[ai] 当前用户 ID:", user?.id);

    // 调用 Gemini 生成回答
    const apiKey = Deno.env.get("GEMINI_API_KEY") || "";
    const answer = await callGemini(apiKey, prompt);

    // 写入数据库 messages 表
    console.log("[ai] 准备写入数据库 messages");
    const { error } = await supabaseService.from("messages").insert({
      user_id: user?.id,
      prompt,
      answer,
    });

    if (error) {
      console.error("[ai] 写入数据库失败", error);
      throw new Error(error.message);
    }

    console.log("[ai] 写入数据库成功");

    // 返回给前端
    return new Response(JSON.stringify({ answer }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  },
  { requireAuth: true }
);
