import { cp, mkdir, rm } from "node:fs/promises";

await rm("public", { recursive: true, force: true });
await mkdir("public", { recursive: true });

for (const entry of [
  "404.html",
  "about.html",
  "apply.html",
  "contact.html",
  "index.html",
  "insights.html",
  "pitch-day.html",
  "pictures.html",
  "programs.html",
  "robots.txt",
  "sitemap.xml",
  "_headers",
  "_redirects",
  "assets",
]) {
  await cp(entry, `public/${entry}`, { recursive: true });
}
