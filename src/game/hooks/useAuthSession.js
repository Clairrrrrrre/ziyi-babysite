// 文件职责：管理登录态与认证操作
import { useEffect, useState } from "react"; // React Hooks
import { supabase } from "../../lib/supabaseClient"; // Supabase 客户端

// MARK: useAuthSession 登录态 Hook
export const useAuthSession = () => {
  const [session, setSession] = useState(null); // 登录会话
  const [email, setEmail] = useState(""); // 登录邮箱
  const [password, setPassword] = useState(""); // 登录密码
  const [authError, setAuthError] = useState(""); // 登录错误

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  // MARK: 注册
  const signUp = async () => {
    setAuthError("");
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setAuthError(error.message);
    } else {
      alert("注册成功，请去邮箱验证后再登录");
    }
  };

  // MARK: 登录
  const signIn = async () => {
    setAuthError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setAuthError(error.message);
    }
  };

  // MARK: 退出
  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return {
    session,
    email,
    password,
    setEmail,
    setPassword,
    signIn,
    signUp,
    signOut,
    authError,
  };
};
