async function callGemini(apiKey: string, prompt: string) {
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY missing");
    }
  
    const url =
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=" +
      apiKey;
  
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      }),
    });
  
    const text = await res.text();
  
    if (!res.ok) {
      throw new Error(`Gemini error ${res.status}: ${text}`);
    }
  
    const data = JSON.parse(text);
  
    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "（Gemini 没有返回内容）"
    );
  }