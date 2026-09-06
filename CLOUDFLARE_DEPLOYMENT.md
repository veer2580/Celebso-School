# 🚀 Cloudflare Workers Deployment Guide (Celebso Startup School)

> This repository is configured for **Cloudflare Workers Static Assets**. The Worker entrypoint is `worker.js` and the static files are served through the `ASSETS` binding.

Aapki website **Cloudflare Workers Static Assets** ke liye configure hai. Isme `worker.js`, `wrangler.toml` aur static files deployment ke liye ready hain.

---

## 🛠️ Setup ki gayi Configuration Files:

1. **`wrangler.toml`**:
   - Cloudflare Pages ka configuration file.
   - Pages build output directory: `.` (root folder).

2. **`_headers`**:
   - Production-level HTTP Security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, etc.).
   - Images aur CSS/JS ke liye automatic 1-year aggressive caching taaki site super-fast load ho.

3. **`_redirects`**:
   - Clean URLs support: Agar koi `/about`, `/programs`, `/contact` bina `.html` ke open karega toh bhi page bina error ke khulega.

4. **`404.html`**:
   - Branded dark-mode 404 page (Celebso brand styling ke saath).

5. **`worker.js`**:
   - Cloudflare Workers ka serverless entrypoint jo automatically assets serve karta hai aur future custom APIs ke liye ready hai.

6. **`.gitignore`**:
   - Unnecessary files (`node_modules`, `.wrangler`, `.env`) ko exclude karta hai.

---

## 🚀 Deploy Karne Ke 2 Tarike (Choose any one):

### Tarika 1: Wrangler CLI ke through (Sabse Fast - Terminal se direct)

Terminal / Command Prompt me project folder ke andar ye 2 commands run karein:

#### Step 1: Cloudflare me Login karein (sirf 1 baar karna hota hai)
```bash
npx wrangler login
```
*(Browser me Cloudflare ka login page khulega, waha **Allow** par click karein)*

#### Step 2: Deploy karein
```bash
npm run deploy
```
*Ya direct command:*
```bash
npx wrangler pages deploy . --project-name=celebso-school
```

🎉 **Done!** Wrangler aapko direct live URL (e.g., `https://celebso-school.pages.dev`) provide karega!

---

### Tarika 2: Cloudflare Dashboard (GitHub se)

Agar aapne code GitHub par push kiya hua hai:

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) me jayein.
2. Left menu me **Workers & Pages** par click karein.
3. **Create Application** ➔ **Pages** tab ➔ **Connect to Git** select karein.
4. Apna repository select karein aur niche ye settings dalein:
   - **Project Name**: `celebso-school`
   - **Framework preset**: `None`
   - **Build command**: *(Khali / Blank chhod dein)*
   - **Build output directory**: `.` (sirf ek dot)
   - **Deploy command**: *(Blank / unset — `npx wrangler deploy` mat use karein)*
5. **Save and Deploy** par click karein.

---

## 💡 Local Preview / Testing Command:
Agar deploy karne se pehle Cloudflare environment ko locally test karna ho:
```bash
npm run dev
```
*(Ye local port jaise `http://localhost:8788` par Cloudflare Pages environment simulate karega)*
