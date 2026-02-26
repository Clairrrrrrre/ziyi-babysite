export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  // Supabase 客户端会带 x-client-info，需要放行
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-info, apikey",
};
