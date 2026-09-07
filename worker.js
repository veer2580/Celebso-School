export default {
  async fetch(request, env) {
    const url = new URL(request.url);
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
