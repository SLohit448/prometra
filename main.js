const API_BASE = 'http://localhost:3000';
const state = { website: '', dna: {}, history: [] };

const phases = [
  { label: "Mapping Brand Signals...", duration: 4000, status: "Discover" },
  { label: "Synthesizing DNA Vectors...", duration: 6000, status: "Model" },
  { label: "Constructing Growth Blueprint...", duration: 6000, status: "Plan" },
  { label: "Finalizing Synthesis...", duration: 4000, status: "Ready" }
];

async function performServerAnalysis(website) {
  const statusLabel = document.getElementById('analysisStatus');
  const pipelineSteps = document.querySelectorAll('.pipeline-step');
  let currentStep = 0;
  for (const phase of phases) {
    statusLabel.innerText = phase.label;
    if (pipelineSteps[currentStep]) pipelineSteps[currentStep].classList.add('active');
    await new Promise(r => setTimeout(r, phase.duration));
    currentStep++;
  }
  const response = await fetch(`${API_BASE}/api/analyze`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ website }) });
  state.dna = await response.json();
  populateDNA();
  showStep(4);
}

function runSimulation() {
  const authority = Math.floor(Math.random() * 30) + 70;
  const pressure = Math.floor(Math.random() * 20) + 40;
  const risk = Math.floor(Math.random() * 10) + 5;
  document.getElementById('rightMetricAuthority').innerText = `${authority}%`;
  document.getElementById('rightMetricPressure').innerText = `${pressure}%`;
  document.getElementById('rightMetricRisk').innerText = `${risk}%`;
}
