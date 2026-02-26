import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.97.0";

// 从 Authorization 头读取用户 token，并返回认证结果
export async function authenticateUser(supabase: SupabaseClient, req: Request) {
  const auth = req.headers.get("Authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";

  if (!token) {
    return { user: null, isAuthenticated: false, error: "未提供登录 token" };
  }

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) {
    return { user: null, isAuthenticated: false, error: error?.message || "无效用户" };
  }

  return { user: data.user, isAuthenticated: true, error: null };
}

// 必须登录，否则抛出错误
export async function requireAuth(supabase: SupabaseClient, req: Request) {
  const result = await authenticateUser(supabase, req);
  if (!result.isAuthenticated || !result.user) {
    throw new Error(result.error || "未登录用户");
  }
  return result.user;
}
