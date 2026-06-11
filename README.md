# 🌾 FruitYield — AI-Powered Crop Yield Estimator

A **fully static, free-to-deploy** web app that uses Claude AI to estimate fruit/crop yields based on farm parameters. No backend, no server costs — runs entirely in the browser via GitHub Pages.

**Live Demo:** `https://<your-username>.github.io/fruit-yield-estimator/`

---

## ✨ Features

- **18+ Input Parameters** — Land area, tree count, soil type, irrigation, fertilizer, rainfall, temperature, pest pressure, crop health, and more
- **AI-Powered Estimates** — Claude Sonnet generates a yield range (kg), confidence level, risk analysis, 4 actionable recommendations, and harvest timeline
- **Visual Yield Meter** — Animated SVG gauge gives instant visual feedback
- **Estimate History** — Save up to 20 past estimates locally in the browser
- **Copy to Clipboard** — Export full report as plain text
- **Mobile Responsive** — Works on any screen size
- **100% Free** — GitHub Pages hosting + Anthropic free-tier API

---

## 🗂️ Project Structure

```
fruit-yield-estimator/
├── index.html          ← Single-page app shell
├── css/
│   └── style.css       ← All styles (design tokens, components)
├── js/
│   └── app.js          ← All logic (API call, form, results, history)
└── README.md
```

---

## 🚀 Deploy to GitHub Pages (Step-by-Step)

### Step 1 — Create GitHub Repository

1. Go to [github.com](https://github.com) → click **"New"** (top-left)
2. Repository name: `fruit-yield-estimator`
3. Set to **Public**
4. Click **"Create repository"** (do NOT initialise with README)

### Step 2 — Push Files

Open your terminal and run:

```bash
# Clone or create local folder
mkdir fruit-yield-estimator
cd fruit-yield-estimator

# Copy all project files here (index.html, css/, js/)

# Initialise git
git init
git add .
git commit -m "Initial commit: FruitYield app"

# Link to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/fruit-yield-estimator.git
git branch -M main
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** (top tab)
3. Scroll to **Pages** in the left sidebar
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait ~60 seconds, then your site is live at:
   ```
   https://YOUR_USERNAME.github.io/fruit-yield-estimator/
   ```

> 💡 GitHub Pages is **completely free** for public repositories with no usage limits for static sites.

---

## 🔑 API Key Setup

The app requires an Anthropic API key to call Claude:

1. Sign up at [console.anthropic.com](https://console.anthropic.com)
2. Go to **API Keys** → Create a key
3. New accounts get **free credits** (enough for hundreds of estimates)
4. Enter the key in the app's modal when you first open it

**Security note:** The key is stored only in `sessionStorage` (cleared when you close the tab). It is sent directly to Anthropic's API — never to any third-party server.

---

## 🛠️ Local Development

No build tools needed. Just open `index.html` in your browser:

```bash
# Option 1: Python server (recommended to avoid CORS)
python3 -m http.server 8080
# Then open: http://localhost:8080

# Option 2: VS Code Live Server extension
# Right-click index.html → "Open with Live Server"

# Option 3: Direct file open
open index.html   # macOS
```

---

## 🌿 Supported Crops

| Category | Crops |
|----------|-------|
| Tropical | Mango, Banana, Papaya, Pineapple, Guava, Jackfruit, Litchi |
| Citrus | Orange, Lemon, Lime, Grapefruit, Mandarin |
| Berries | Strawberry, Blueberry, Grapes |
| Temperate | Apple, Pear, Peach, Plum, Cherry |
| Other | Watermelon, Pomegranate, Avocado, Custom |

---

## 📦 Tech Stack

| Layer | Technology | Cost |
|-------|-----------|------|
| Frontend | HTML5, CSS3, Vanilla JS | Free |
| AI Engine | Anthropic Claude Sonnet | Free tier |
| Hosting | GitHub Pages | Free |
| Fonts | Google Fonts | Free |
| Build tools | None required | — |

---

## 📸 Adding to Your Portfolio

Update the GitHub repo URL in `index.html` footer:
```html
<a href="https://github.com/YOUR_USERNAME/fruit-yield-estimator" target="_blank">View on GitHub</a>
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Invalid API key" error | Make sure key starts with `sk-ant-` |
| 429 Rate Limit | Wait 60 seconds and retry |
| Site not loading after push | GitHub Pages takes 1-3 minutes to deploy |
| CORS error locally | Use `python3 -m http.server` instead of opening file directly |
| Blank page on GitHub Pages | Check repo is Public and Pages source is set to `main` |

---

## 📄 License

MIT — free to use, modify, and deploy.
