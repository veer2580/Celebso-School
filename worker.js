export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Redirect any .html URL to clean professional URL (e.g., /contact.html -> /contact)
    if (url.pathname.endsWith(".html")) {
      let cleanPath = url.pathname.slice(0, -5);
      cleanPath = (cleanPath === "/index" || cleanPath === "") ? "/" : cleanPath;
      url.pathname = cleanPath;
      return Response.redirect(url.toString(), 301);
    }

    // 2. Strip trailing slash for consistency (e.g., /contact/ -> /contact)
    if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
      url.pathname = url.pathname.slice(0, -1);
      return Response.redirect(url.toString(), 301);
    }

    // 3. Map clean URLs to actual static HTML files
    const cleanRoutes = {
      "/about": "/about.html",
      "/programs": "/programs.html",
      "/pitch-day": "/pitch-day.html",
      "/pictures": "/pictures.html",
      "/insights": "/insights.html",
      "/contact": "/contact.html",
      "/apply": "/apply.html",
      "/terms": "/terms.html",
      "/terms-of-use": "/terms.html",
      "/privacy": "/privacy.html",
      "/privacy-policy": "/privacy.html",
    };

    if (cleanRoutes[url.pathname]) {
      url.pathname = cleanRoutes[url.pathname];
      return env.ASSETS.fetch(new Request(url, request));
    }

    return env.ASSETS.fetch(request);
  },
};
