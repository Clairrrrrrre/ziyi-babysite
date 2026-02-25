import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";

export default function App() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 初始化登录态
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 注册
  const signUp = async () => {
    setError("");
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      alert("注册成功，请去邮箱验证后再登录");
    }
  };

  // 登录
  const signIn = async () => {
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    }
  };

  // 退出
  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setAnswer("");
    setPrompt("");
  };

  // 调用 AI
  const sendToAI = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ prompt }),
      });

      const text = await res.text();

      if (!res.ok) {
        throw new Error(text || "AI 请求失败");
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("后端返回了非 JSON 内容");
      }

      setAnswer(data.answer || "");
    } catch (e) {
      setError(e.message || "请求失败");
    } finally {
      setLoading(false);
    }
  };

  // 未登录态
  if (!session) {
    return (
      <div style={{ maxWidth: 420, margin: "80px auto", fontFamily: "sans-serif" }}>
        <h2>登录 / 注册</h2>

        <input
          placeholder="邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
        />

        <input
          placeholder="密码"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 12 }}
        />

        <button onClick={signIn} style={{ marginRight: 8 }}>
          登录
        </button>
        <button onClick={signUp}>注册</button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  }

  // 已登录态
  return (
    <div style={{ maxWidth: 600, margin: "60px auto", fontFamily: "sans-serif" }}>
      <h2>AI Demo</h2>
      <p>已登录：{session.user.email}</p>

      <textarea
        rows={4}
        placeholder="输入你想问 AI 的内容"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "100%", marginBottom: 12 }}
      />

      <button
        onClick={() => {
          alert("按钮被点到了");
          sendToAI();
        }}
        disabled={loading}
      >
        {loading ? "生成中…" : "发送 AI"}
      </button>

      <button onClick={signOut} style={{ marginLeft: 12 }}>
        退出登录
      </button>

      {error && <p style={{ color: "red", marginTop: 16 }}>{error}</p>}

      {answer && (
        <div style={{ marginTop: 24 }}>
          <h3>AI 回复</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>{answer}</pre>
        </div>
      )}
    </div>
  );
}