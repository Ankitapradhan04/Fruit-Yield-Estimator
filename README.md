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

## 🐛 Troubleshooting

| Problem | Fix |
|---------|-----|
| "Invalid API key" | Ensure key starts with `sk-ant-` |
| 429 Rate Limit | Wait ~60 seconds and retry |
| Page blank on GitHub Pages | Check repo is Public + Pages source is `main/root` |
| CORS error locally | Use `python3 -m http.server` not `file://` |

---

MIT License — free to use and modify.
