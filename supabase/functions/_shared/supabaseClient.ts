import { createClient } from "https://esm.sh/@supabase/supabase-js@2.97.0";

// 通过环境变量初始化服务端 Supabase 客户端（Service Role）
export function getSupabaseClient() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("缺少 SUPABASE_URL 或 SERVICE_ROLE_KEY");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
