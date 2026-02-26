import { corsHeaders } from "./cors.ts";
import { getSupabaseClient } from "./supabaseClient.ts";
import { authenticateUser, requireAuth } from "./auth.ts";

type HandlerContext = {
  req: Request;
  supabaseService: ReturnType<typeof getSupabaseClient>;
  user: Awaited<ReturnType<typeof requireAuth>> | null;
};

type Handler = (ctx: HandlerContext) => Promise<Response>;

type Options = {
  requireAuth?: boolean;
};

// 统一入口：自动 Deno.serve + 注入 supabaseService/user + 统一错误响应
export function serveEdgeFunction(handler: Handler, options: Options = {}) {
  Deno.serve(async (req) => {
    // 预检请求
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    try {
      const supabaseService = getSupabaseClient();

      // 可选或强制认证
      const user = options.requireAuth
        ? await requireAuth(supabaseService, req)
        : (await authenticateUser(supabaseService, req)).user;

      return await handler({ req, supabaseService, user });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return new Response(JSON.stringify({ error: { message } }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  });
}
