# 🌾 FruitYield — AI Crop Yield Estimator

A **fully static, free-to-deploy** single-file web app that uses Claude AI to estimate fruit/crop yields based on farm parameters. No backend, no server, no build step — everything runs in the browser.

**Live:** `https://<your-username>.github.io/fruit-yield-estimator/`

---

## ✨ Features

- **18 farm input parameters** — fruit type (25+ crops), land area, tree count/age, soil, irrigation, fertilizer, rainfall, temperature, crop health, pest pressure, previous yield
- **Claude AI estimates** — yield range in kg, confidence level, risk analysis, 4 recommendations, harvest timeline  
- **Animated SVG gauge** — visual yield meter
- **Estimate history** — save up to 25 past estimates in localStorage
- **Copy report** — one-click text export
- **Mobile responsive** — works on any screen
- **Zero cost** — GitHub Pages (free) + Anthropic free-tier API

---

## 🗂️ Files

```
fruit-yield-estimator/
├── index.html    ← Complete self-contained app (HTML + CSS + JS)
└── README.md
```

Everything is in a single `index.html` file — no build tools, no dependencies, no npm.

---

## 🚀 Deploy to GitHub Pages

### Step 1 — Create GitHub repo

1. Go to [github.com](https://github.com) → click **New**
2. Name: `fruit-yield-estimator`, set to **Public**
3. Click **Create repository** (no README, no gitignore)

### Step 2 — Push the file

```bash
mkdir fruit-yield-estimator
cd fruit-yield-estimator
# Copy index.html here

git init
git add index.html README.md
git commit -m "Add FruitYield app"
git remote add origin https://github.com/YOUR_USERNAME/fruit-yield-estimator.git
git branch -M main
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Repo → **Settings** → **Pages** (left sidebar)
2. Source: `Deploy from a branch`
3. Branch: `main` / `/ (root)`
4. Click **Save**

Your site is live in ~60 seconds:
```
https://YOUR_USERNAME.github.io/fruit-yield-estimator/
```

---

## 🔑 API Key

1. Sign up at [console.anthropic.com](https://console.anthropic.com)
2. Create an API key (new accounts get free credits)
3. Enter it in the app modal when prompted

The key is stored only in `sessionStorage` and cleared when you close the tab.

---

## 🛠️ Run Locally

```bash
# Python (recommended — avoids CORS issues with local file:// URLs)
python3 -m http.server 8080
# Open: http://localhost:8080

# Or use VS Code Live Server extension
```

---

## 🐛 Troubleshooting

| Problem | Fix |
|---------|-----|
| "Invalid API key" | Ensure key starts with `sk-ant-` |
| 429 Rate Limit | Wait ~60 seconds and retry |
| Page blank on GitHub Pages | Check repo is Public + Pages source is `main/root` |
| CORS error locally | Use `python3 -m http.server` not `file://` |

---

MIT License — free to use and modify.
