/* ============================================
   FruitYield — app.js
   Claude AI-powered Fruit Yield Estimator
   ============================================ */

// ── State ──────────────────────────────────
const state = {
  apiKey: sessionStorage.getItem('fy_api_key') || '',
  history: JSON.parse(localStorage.getItem('fy_history') || '[]'),
  currentResult: null,
};

// ── DOM refs ───────────────────────────────
const $ = (id) => document.getElementById(id);
const apiModal        = $('api-modal');
const apiKeyInput     = $('api-key-input');
const saveKeyBtn      = $('save-key-btn');
const changeKeyBtn    = $('change-key-btn');
const estimateBtn     = $('estimate-btn');
const estimateBtnText = $('estimate-btn-text');
const resetBtn        = $('reset-btn');
const resultsSection  = $('results-section');
const errorCard       = $('error-card');
const errorMsg        = $('error-msg');
const dismissError    = $('dismiss-error');
const historyToggle   = $('history-toggle');
const historyPanel    = $('history-panel');
const historyBackdrop = $('history-backdrop');
const historyClose    = $('history-close');
const historyList     = $('history-list');
const clearHistoryBtn = $('clear-history-btn');
const copyBtn         = $('copy-btn');
const saveResultBtn   = $('save-result-btn');
const newEstimateBtn  = $('new-estimate-btn');
const healthSlider    = $('health');
const healthDisplay   = $('health-display');

// ── Health slider labels ───────────────────
const HEALTH_LABELS = ['Poor', 'Below Average', 'Average', 'Good', 'Excellent'];

healthSlider.addEventListener('input', () => {
  healthDisplay.textContent = HEALTH_LABELS[healthSlider.value - 1];
});

// ── API Key Modal ──────────────────────────
function showModal() {
  apiModal.classList.remove('hidden');
  apiKeyInput.focus();
}
function hideModal() {
  apiModal.classList.add('hidden');
}

if (!state.apiKey) showModal();

saveKeyBtn.addEventListener('click', () => {
  const key = apiKeyInput.value.trim();
  if (!key.startsWith('sk-ant-')) {
    apiKeyInput.style.borderColor = '#e74c3c';
    apiKeyInput.placeholder = 'Must start with sk-ant-...';
    return;
  }
  state.apiKey = key;
  sessionStorage.setItem('fy_api_key', key);
  hideModal();
});

apiKeyInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') saveKeyBtn.click();
  apiKeyInput.style.borderColor = '';
});

changeKeyBtn.addEventListener('click', () => {
  apiKeyInput.value = state.apiKey;
  showModal();
});

// ── Form helpers ───────────────────────────
function getFormData() {
  return {
    fruitType:   $('fruit-type').value,
    landArea:    $('land-area').value,
    landUnit:    $('land-unit').value,
    treeCount:   $('tree-count').value,
    treeAge:     $('tree-age').value,
    ageUnit:     $('age-unit').value,
    season:      $('season').value,
    soilType:    $('soil-type').value,
    irrigation:  $('irrigation').value,
    fertilizer:  $('fertilizer').value,
    rainfall:    $('rainfall').value,
    temperature: $('temperature').value,
    tempUnit:    $('temp-unit').value,
    health:      HEALTH_LABELS[healthSlider.value - 1],
    pest:        $('pest').value,
    prevYield:   $('prev-yield').value,
    yieldUnit:   $('yield-unit').value,
    notes:       $('notes').value.trim(),
  };
}

function validateForm(d) {
  if (!d.fruitType) return 'Please select a fruit or crop type.';
  if (!d.landArea || parseFloat(d.landArea) <= 0) return 'Please enter a valid land area.';
  if (!d.treeCount || parseInt(d.treeCount) < 1) return 'Please enter the number of trees/plants.';
  if (!d.treeAge || parseFloat(d.treeAge) < 0) return 'Please enter the tree/plant age.';
  return null;
}

resetBtn.addEventListener('click', () => {
  document.querySelectorAll('input[type="number"], textarea').forEach(el => el.value = '');
  $('fruit-type').value = '';
  $('season').value = 'Summer';
  $('soil-type').value = 'Red loamy';
  $('irrigation').value = 'Drip irrigation';
  $('fertilizer').value = 'Organic (compost/manure)';
  $('pest').value = 'None observed';
  $('land-unit').value = 'acres';
  $('age-unit').value = 'years';
  $('temp-unit').value = '°C';
  $('yield-unit').value = 'kg';
  healthSlider.value = 3;
  healthDisplay.textContent = 'Average';
  resultsSection.classList.add('hidden');
  errorCard.classList.add('hidden');
});

// ── Build prompt ───────────────────────────
function buildPrompt(d) {
  const prevYieldStr = d.prevYield
    ? `Previous season yield: ${d.prevYield} ${d.yieldUnit}.`
    : 'No previous yield data available.';
  const notesStr = d.notes ? `Additional context from the farmer: "${d.notes}"` : '';

  return `You are an expert agricultural scientist and crop yield specialist with deep knowledge of tropical, subtropical, and temperate fruit cultivation. Provide a precise, data-grounded yield estimate based on the following farm parameters.

FARM DATA:
- Fruit/Crop: ${d.fruitType}
- Land Area: ${d.landArea} ${d.landUnit}
- Number of Trees/Plants: ${d.treeCount}
- Average Age: ${d.treeAge} ${d.ageUnit}
- Season: ${d.season}
- Soil Type: ${d.soilType}
- Irrigation: ${d.irrigation}
- Fertilizer: ${d.fertilizer}
- Recent Rainfall (30 days): ${d.rainfall || 'Not provided'} mm
- Average Temperature: ${d.temperature || 'Not provided'} ${d.tempUnit}
- Crop Health: ${d.health}
- Pest/Disease Pressure: ${d.pest}
- ${prevYieldStr}
${notesStr}

Respond ONLY with a valid JSON object (no markdown, no code fences, no extra text) in this exact structure:
{
  "yield_low_kg": <number>,
  "yield_high_kg": <number>,
  "confidence": "<Low|Medium|High>",
  "summary": "<2-3 sentence analysis of the key factors driving this estimate>",
  "risks": ["<risk 1>", "<risk 2>", "<risk 3 if applicable>"],
  "recommendations": ["<actionable rec 1>", "<actionable rec 2>", "<actionable rec 3>", "<actionable rec 4>"],
  "harvest_timeline": "<When to expect harvest, signs of readiness, and post-harvest advice in 2-3 sentences>"
}`;
}

// ── Call Claude API ─────────────────────────
async function callClaude(prompt) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': state.apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    if (response.status === 401) throw new Error('Invalid API key. Please check and update your key.');
    if (response.status === 429) throw new Error('Rate limit reached. Please wait a moment and try again.');
    throw new Error(err?.error?.message || `API error (${response.status}). Please try again.`);
  }

  const data = await response.json();
  const text = data.content.map(b => b.text || '').join('');
  const clean = text.replace(/```json|```/g, '').trim();
  return JSON.parse(clean);
}

// ── Render results ──────────────────────────
function animateMeter(fraction) {
  // Arc total path length ≈ 283 (half-circle of radius 90)
  const ARC_LEN = 283;
  const arc = document.getElementById('meter-arc');
  const needle = document.getElementById('meter-needle');

  let start = null;
  const duration = 900;

  function step(ts) {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const currentFrac = ease * fraction;

    arc.setAttribute('stroke-dasharray', `${currentFrac * ARC_LEN} ${ARC_LEN}`);

    // Needle: rotate from -90deg (left) to +90deg (right), full span = 180deg
    const deg = -90 + (currentFrac * 180);
    needle.setAttribute('transform', `rotate(${deg}, 110, 115)`);

    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function renderResults(result, formData) {
  state.currentResult = { result, formData, timestamp: Date.now() };

  // Yield numbers
  $('yield-low').textContent  = result.yield_low_kg.toLocaleString();
  $('yield-high').textContent = result.yield_high_kg.toLocaleString();
  $('yield-unit-display').textContent = 'kg estimated';
  $('yield-confidence').textContent = result.confidence;

  // Meter: map yield vs typical range per tree (rough scale)
  const perTree = result.yield_high_kg / Math.max(1, parseInt(formData.treeCount));
  // Rough: 0-10 kg/tree = 0–50%, 10-30 = 50–80%, 30+ = 80–100%
  const fraction = Math.min(perTree / 35, 1);
  animateMeter(fraction);

  // Analysis
  $('analysis-text').textContent = result.summary;

  // Risks
  const riskContainer = $('risk-text');
  riskContainer.innerHTML = '';
  (result.risks || []).forEach(risk => {
    const tag = document.createElement('span');
    tag.className = 'tag tag-risk';
    tag.textContent = risk;
    riskContainer.appendChild(tag);
  });

  // Recommendations
  const recContainer = $('rec-text');
  recContainer.innerHTML = '';
  (result.recommendations || []).forEach(rec => {
    const item = document.createElement('div');
    item.className = 'rec-item';
    item.textContent = rec;
    recContainer.appendChild(item);
  });

  // Harvest timeline
  $('harvest-text').textContent = result.harvest_timeline;

  resultsSection.classList.remove('hidden');
  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Estimate button ─────────────────────────
estimateBtn.addEventListener('click', async () => {
  errorCard.classList.add('hidden');

  if (!state.apiKey) { showModal(); return; }

  const formData = getFormData();
  const validationErr = validateForm(formData);
  if (validationErr) {
    showError(validationErr);
    return;
  }

  // Loading state
  estimateBtn.disabled = true;
  estimateBtn.classList.add('btn-loading');
  estimateBtnText.textContent = 'Analysing…';
  const icon = estimateBtn.querySelector('.btn-icon');
  icon.textContent = '⏳';

  try {
    const prompt = buildPrompt(formData);
    const result = await callClaude(prompt);
    renderResults(result, formData);
  } catch (err) {
    showError(err.message || 'Something went wrong. Please try again.');
  } finally {
    estimateBtn.disabled = false;
    estimateBtn.classList.remove('btn-loading');
    estimateBtnText.textContent = 'Estimate Yield';
    icon.textContent = '🌱';
  }
});

// ── Error helpers ───────────────────────────
function showError(msg) {
  errorMsg.textContent = msg;
  errorCard.classList.remove('hidden');
  errorCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
dismissError.addEventListener('click', () => errorCard.classList.add('hidden'));

// ── Copy result ─────────────────────────────
copyBtn.addEventListener('click', () => {
  if (!state.currentResult) return;
  const r = state.currentResult.result;
  const d = state.currentResult.formData;
  const text = `FruitYield Estimate — ${d.fruitType}
Land: ${d.landArea} ${d.landUnit} | Trees: ${d.treeCount} | Age: ${d.treeAge} ${d.ageUnit}
Season: ${d.season} | Health: ${d.health}

ESTIMATED YIELD: ${r.yield_low_kg.toLocaleString()} – ${r.yield_high_kg.toLocaleString()} kg
Confidence: ${r.confidence}

ANALYSIS: ${r.summary}

RISKS: ${r.risks.join(', ')}

RECOMMENDATIONS:
${r.recommendations.map((rec, i) => `${i+1}. ${rec}`).join('\n')}

HARVEST TIMELINE: ${r.harvest_timeline}`;
  navigator.clipboard.writeText(text).then(() => {
    copyBtn.textContent = '✅ Copied!';
    setTimeout(() => { copyBtn.innerHTML = '📋 Copy'; }, 2000);
  });
});

// ── Save to history ─────────────────────────
saveResultBtn.addEventListener('click', () => {
  if (!state.currentResult) return;
  state.history.unshift(state.currentResult);
  if (state.history.length > 20) state.history = state.history.slice(0, 20);
  localStorage.setItem('fy_history', JSON.stringify(state.history));
  saveResultBtn.textContent = '✅ Saved!';
  setTimeout(() => { saveResultBtn.textContent = 'Save to History'; }, 2000);
  renderHistoryList();
});

newEstimateBtn.addEventListener('click', () => {
  resultsSection.classList.add('hidden');
  window.scrollTo({ top: document.querySelector('.app-container').offsetTop - 80, behavior: 'smooth' });
});

// ── History panel ───────────────────────────
function renderHistoryList() {
  historyList.innerHTML = '';
  if (state.history.length === 0) {
    historyList.innerHTML = '<p class="history-empty">No saved estimates yet.</p>';
    return;
  }
  state.history.forEach((entry, idx) => {
    const d = entry.formData;
    const r = entry.result;
    const date = new Date(entry.timestamp).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
    const item = document.createElement('div');
    item.className = 'history-item';
    item.innerHTML = `
      <div class="history-item-title">${d.fruitType} · ${d.landArea} ${d.landUnit}</div>
      <div class="history-item-sub">${r.yield_low_kg.toLocaleString()}–${r.yield_high_kg.toLocaleString()} kg · ${r.confidence} confidence · ${date}</div>
    `;
    item.addEventListener('click', () => {
      renderResults(r, d);
      closeHistory();
    });
    historyList.appendChild(item);
  });
}

function openHistory() {
  historyPanel.classList.remove('hidden');
  historyBackdrop.classList.remove('hidden');
  renderHistoryList();
}
function closeHistory() {
  historyPanel.classList.add('hidden');
  historyBackdrop.classList.add('hidden');
}

historyToggle.addEventListener('click', openHistory);
historyClose.addEventListener('click', closeHistory);
historyBackdrop.addEventListener('click', closeHistory);
clearHistoryBtn.addEventListener('click', () => {
  if (!confirm('Clear all saved estimates?')) return;
  state.history = [];
  localStorage.removeItem('fy_history');
  renderHistoryList();
});
