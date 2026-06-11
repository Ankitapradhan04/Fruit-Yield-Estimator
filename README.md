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

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Invalid API key" error | Make sure key starts with `sk-ant-` |
| 429 Rate Limit | Wait 60 seconds and retry |
| Site not loading after push | GitHub Pages takes 1-3 minutes to deploy |
| CORS error locally | Use `python3 -m http.server` instead of opening file directly |
| Blank page on GitHub Pages | Check repo is Public and Pages source is set to `main` |

---
