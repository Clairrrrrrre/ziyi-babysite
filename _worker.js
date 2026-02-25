export default {
    async fetch(request, env, ctx) {
      const url = new URL(request.url);
  
      // 测试：确认 worker 生效
      if (url.pathname === "/hello") {
        return new Response("hello from _worker.js", {
          headers: { "content-type": "text/plain; charset=utf-8" },
        });
      }
  
      // 其他路径继续走静态站点（回到前端）
      return env.ASSETS.fetch(request);
    },
  };