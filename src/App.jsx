import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";

export default function App() {
  const [session, setSession] = useState(null);

  // auth form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ai demo
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    // 1) 初次加载拿 session
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    // 2) 监听登录状态变化
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  async function signUp() {
    setErr("");
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setErr(error.message);
    else setErr("注册成功（如果你开启了邮箱验证，请去邮箱点确认）");
  }

  async function signIn() {
    setErr("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setErr(error.message);
  }

  async function signOut() {
    await supabase.auth.signOut();
    setAnswer("");
    setPrompt("");
  }

  async function askAI() {
    setErr("");
    setLoading(true);
    setAnswer("");

    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) {
        setErr("未登录，无法调用 AI");
        return;
      }

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "调用失败");

      setAnswer(json.answer);
    } catch (e) {
      setErr(e.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", padding: 16 }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>ziyi-babysite</h1>
      <p style={{ opacity: 0.7, marginBottom: 24 }}>
        Demo: Supabase 登录 + Gemini AI（通过 Cloudflare Functions）+ 写入 Supabase messages 表
      </p>

      {!session ? (
        <div style={{ border: "1px solid #333", borderRadius: 12, padding: 16 }}>
          <h2 style={{ fontSize: 18, marginBottom: 12 }}>登录 / 注册</h2>

          <div style={{ display: "grid", gap: 10 }}>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: 10, borderRadius: 8, border: "1px solid #555" }}
            />
            <input
              placeholder="Password（至少6位）"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: 10, borderRadius: 8, border: "1px solid #555" }}
            />

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={signIn} style={btnStyle}>
                登录
              </button>
              <button onClick={signUp} style={btnStyleSecondary}>
                注册
              </button>
            </div>

            {err ? <div style={{ color: "#ff6b6b" }}>{err}</div> : null}
          </div>
        </div>
      ) : (
        <div style={{ border: "1px solid #333", borderRadius: 12, padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <div>
              <div style={{ fontSize: 14, opacity: 0.7 }}>已登录</div>
              <div style={{ fontSize: 16 }}>{session.user.email}</div>
            </div>
            <button onClick={signOut} style={btnStyleSecondary}>
              退出登录
            </button>
          </div>

          <hr style={{ margin: "16px 0", opacity: 0.2 }} />

          <h2 style={{ fontSize: 18, marginBottom: 8 }}>AI Demo</h2>
          <textarea
            placeholder="输入一句话，然后点「发给 AI」"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={5}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #555",
              marginBottom: 10,
            }}
          />

          <button onClick={askAI} style={btnStyle} disabled={loading || !prompt.trim()}>
            {loading ? "生成中..." : "发给 AI"}
          </button>

          {err ? <div style={{ color: "#ff6b6b", marginTop: 10 }}>{err}</div> : null}

          {answer ? (
            <div style={{ marginTop: 14, padding: 12, borderRadius: 10, background: "rgba(255,255,255,0.05)" }}>
              <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 6 }}>AI 回复</div>
              <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{answer}</div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

const btnStyle = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #666",
  cursor: "pointer",
};

const btnStyleSecondary = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #666",
  cursor: "pointer",
  opacity: 0.85,
};