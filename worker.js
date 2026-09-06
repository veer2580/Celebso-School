/**
 * Cloudflare Worker Handler for Celebso Startup School
 * Automatically serves static assets (HTML, CSS, JS, Images)
 * and can be extended with custom API endpoints if needed.
 */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Optional: Custom clean URL routing if not handled by asset binding
    const path = url.pathname;
    if (!path.includes('.') && path !== '/') {
      const htmlUrl = new URL(path + '.html', request.url);
      const response = await env.ASSETS.fetch(new Request(htmlUrl, request));
      if (response.status === 200) {
        return response;
      }
    }

    // Default: Serve from Cloudflare Static Assets
    return env.ASSETS.fetch(request);
  }
};
