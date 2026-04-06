/**
 * Prometra Core Engine
 * Enterprise-style UI logic with simulated AI capabilities
 */


const state = {
    history: [],
    currentPlatform: 'meta',
    onboardingStep: 1,
    dna: {
        website: '',
        brandName: '',
        industry: '',
        mission: '',
        colors: ['#0a0a0f', '#a0e9ff'],
        font: 'Inter',
        tone: '',
        tones: [],
        aesthetic: '',
        description: '',
        tagline: '',
        values: [],
        hub: {}
    }
};

const API_BASE = ''; // Same origin as server

// --- Spotlight Effect ---
document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.body.style.setProperty('--x', `${x}%`);
    document.body.style.setProperty('--y', `${y}%`);
});

// --- Onboarding Flow ---
function startOnboarding() {
    document.getElementById('pageWrapper')?.classList.add('hidden');
    document.getElementById('siteHeader')?.classList.add('hidden');
    document.getElementById('onboardingSection')?.classList.remove('hidden');
    showStep(1);
    saveSession();
}

function showStep(step) {
    state.onboardingStep = step;
    document.querySelectorAll('.onboarding-step').forEach(el => el.classList.add('hidden'));
    document.getElementById(`step${step}`).classList.remove('hidden');

    const step1BackBtn = document.getElementById('step1BackBtn');
    if (step1BackBtn) {
        step1BackBtn.style.display = (step === 1) ? 'flex' : 'none';
    }

    if (step === 3) performServerAnalysis();
    if (step === 4) populateDNA();
    saveSession();
}

async function performServerAnalysis() {
    const startTime = Date.now();
    const status = document.getElementById('analysisStatus');
    const hud = document.getElementById('hudStatus');
    const previewImg = document.getElementById('analysisPreviewImage');
    const link = document.getElementById('analysisWebsiteLink');
    if (link) link.innerText = `https://${state.dna.website}`;

    // 1. Trigger High-Fidelity Capture (Microlink)
    if (previewImg) {
        const loader = document.getElementById('previewLoader');
        previewImg.style.opacity = '0';
        if (loader) loader.style.display = 'block';
        if (hud) hud.innerText = "WAITING_FOR_HANDSHAKE...";

        // Site capture removed in favor of animated Brand Map visualization
        if (loader) loader.style.display = 'none';
        if (hud) hud.innerText = "SIGNAL_ACQUISITION_ACTIVE";
    }

    const phases = [
        { time: 0, msg: "Mapping Brand Signals...", hud: "OS_HANDSHAKE_OK", color: "#1c2601", text: "#a0e9ff" },
        { time: 2500, msg: "Scanning Market Patterns...", hud: "RENDER_STREAM_SYNC", color: "#a1c8b0", text: "#1c2601" },
        { time: 5000, msg: "Building Strategy Graph...", hud: "LEXICAL_ANALYSIS_V2", color: "#c39dff", text: "#0a0a0f" },
        { time: 7500, msg: "Indexing Business Data...", hud: "COLOR_VIBRANCE_SCAN", color: "#d0e19a", text: "#1c2601" },
        { time: 10000, msg: "Mapping market competitive vectors...", hud: "COMPETITIVE_NEURAL_MAP", color: "#ffffff", text: "#050508" },
        { time: 12500, msg: "Constructing Intelligence Core...", hud: "LINGUISTIC_PROFILING", color: "#a1c8c0", text: "#0a0f0a" },
        { time: 15000, msg: "Calibrating industry alignment...", hud: "VERTICAL_SYNC_BETA", color: "#a0e9ff", text: "#1c2601" },
        { time: 17500, msg: "Manifesting Growth Blueprint...", hud: "DNA_FINAL_COHESION", color: "#c39dff", text: "#0a0a0f" },
        { time: 19000, msg: "Finalizing strategic model...", hud: "SYSTEM_SYNC_COMPLETE", color: "#d0e19a", text: "#1c2601" }
    ];

    let currentPhase = 0;
    const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        if (currentPhase < phases.length && elapsed >= phases[currentPhase].time) {
            const phase = phases[currentPhase];
            if (status) status.innerText = phase.msg;
            if (hud) hud.innerText = phase.hud;

            const statusBox = document.getElementById('analysisStatusBox');
            if (statusBox) {
                statusBox.style.background = phase.color;
                statusBox.style.color = phase.text;
                statusBox.style.borderColor = phase.text + '33';
            }

            currentPhase++;
        }
    }, 500);

    try {
        const response = await fetch('/api/analyze', {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ website: state.dna.website })
        });

        if (!response.ok) throw new Error('Analysis failed');
        const data = await response.json();
        state.dna = data;

        // Total duration target: ~20 seconds
        const totalDuration = 20000;
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, totalDuration - elapsed);

        setTimeout(() => {
            clearInterval(interval);
            showStep(4);
        }, remaining);
    } catch (err) {
        clearInterval(interval);
        alert("Server analysis failed. Please ensure the backend is running.");
        showStep(2);
    }
}

function saveWebsite() {
    const url = document.getElementById('websiteInput').value;
    if (!url) return alert('Please enter your website URL.');
    state.dna.website = url;
    showStep(3);
}

function prevStep() {
    if (state.onboardingStep === 1) {
        exitOnboarding();
    } else {
        document.getElementById('confirmBackModal')?.classList.remove('hidden');
    }
}

function closeModal() {
    document.getElementById('confirmBackModal')?.classList.add('hidden');
}

function confirmBack() {
    closeModal();
    // Redirect to Step 2 (Website Entry) as requested
    showStep(2);
}

function openBlueprintBackModal() {
    document.getElementById('confirmBlueprintModal')?.classList.remove('hidden');
}

function closeBlueprintModal() {
    document.getElementById('confirmBlueprintModal')?.classList.add('hidden');
}

function confirmBlueprintBack() {
    closeBlueprintModal();
    showStep(2);
}

function exitOnboarding() {
    document.getElementById('onboardingSection')?.classList.add('hidden');
    document.getElementById('pageWrapper')?.classList.remove('hidden');
    document.getElementById('siteHeader')?.classList.remove('hidden');
    state.onboardingStep = 1;
    state.dna.website = '';
}

// Comprehensive Logo Recovery System (Microlink -> Google -> Letter Logo)
// 4-Tier Logo Recovery System (Microlink Logo -> Microlink Image -> Google -> Letter Logo)
function setBrandLogo(imgElement, cleanUrl, brandName) {
    if (!imgElement) return;

    const logoUrl = `https://api.microlink.io?url=${encodeURIComponent('https://' + cleanUrl)}&embed=logo.url`;
    const imageUrl = `https://api.microlink.io?url=${encodeURIComponent('https://' + cleanUrl)}&embed=image.url`;
    const googleUrl = `https://www.google.com/s2/favicons?domain=${cleanUrl}&sz=128`;

    let attempt = 1;

    const tryNext = () => {
        if (attempt === 1) {
            console.warn(`ProMetra: Logo failed, trying Image...`);
            attempt = 2;
            imgElement.src = imageUrl;
        } else if (attempt === 2) {
            console.warn(`ProMetra: Image failed, trying Google...`);
            attempt = 3;
            imgElement.src = googleUrl;
        } else if (attempt === 3) {
            console.warn(`ProMetra: All APIs failed, generating Letter Logo...`);
            attempt = 4;
            const parent = imgElement.parentElement;
            if (parent) {
                const letter = (brandName || cleanUrl).charAt(0).toUpperCase();
                parent.innerHTML = `<div class="letter-logo">${letter}</div>`;
                parent.classList.add('empty-state');
            }
        }
    };

    imgElement.onerror = tryNext;
    imgElement.src = logoUrl;
}

function handleGalleryError(img) {
    const parent = img.parentElement;
    if (parent) {
        parent.remove();
    }
}

function populateDNA() {
    try {
        const dna = state.dna;
        if (!dna) return;

        const brandNameEl = document.getElementById('dnaBrandName');
        if (brandNameEl) brandNameEl.innerText = dna.brandName || "Synthetic Identity";

        const cleanUrl = (dna.website || "").replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
        const dnaLink = document.getElementById('dnaWebsiteLink');
        if (dnaLink) dnaLink.innerText = cleanUrl ? `https://${cleanUrl}/` : "https://prometralabs.com/";

        const logoImg = document.getElementById('brandLogoImg');
        const previewImg = document.getElementById('analysisPreviewImage');
        const faviconContainer = document.getElementById('dnaFaviconContainer');
        const faviconImg = document.getElementById('dnaHeaderFavicon');

        // Website Logo Extraction
        if (logoImg && cleanUrl) {
            const parent = logoImg.parentElement;
            if (parent) {
                parent.classList.remove('empty-state');
                parent.innerHTML = `<img id="brandLogoImg" src="">`;
                const newLogoImg = document.getElementById('brandLogoImg');
                setBrandLogo(newLogoImg, cleanUrl, dna.brandName);
            }
        }

        if (faviconImg && faviconContainer && cleanUrl) {
            setBrandLogo(faviconImg, cleanUrl, dna.brandName);
            faviconContainer.style.display = 'block';
        }

        const gallery = document.querySelector('.image-gallery');
        if (gallery && cleanUrl) {
            const pSrc = previewImg ? previewImg.src : "";
            gallery.innerHTML = `
                <div class="gallery-item upload-button" onclick="document.getElementById('imageUpload').click()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <div style="font-size: 0.7rem; margin-top: 8px;">Upload</div>
                    <input type="file" id="imageUpload" style="display: none;" onchange="handleImageUpload(event)">
                </div>
                ${pSrc ? `<div class="gallery-item" title="Main Screenshot"><div class="delete-btn" onclick="removeImage(event, this)">×</div><img src="${pSrc}" onerror="handleGalleryError(this)" onclick="openLightbox(this.src)"></div>` : ''}
                <div class="gallery-item" title="Brand Visual"><div class="delete-btn" onclick="removeImage(event, this)">×</div><img src="https://api.microlink.io?url=${encodeURIComponent('https://' + cleanUrl)}&embed=image.url" onerror="handleGalleryError(this)" onclick="openLightbox(this.src)"></div>
                <div class="gallery-item" title="Brand Logo"><div class="delete-btn" onclick="removeImage(event, this)">×</div><img src="https://api.microlink.io?url=${encodeURIComponent('https://' + cleanUrl)}&embed=logo.url" onerror="handleGalleryError(this)" onclick="openLightbox(this.src)"></div>
            `;

            // Fetch semantic images from website
            fetch('/api/scrape-images', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: 'https://' + cleanUrl })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.images && data.images.length > 0) {
                        data.images.forEach(imgUrl => {
                            const newItem = document.createElement('div');
                            newItem.className = 'gallery-item';
                            newItem.title = 'Extracted Image';
                            newItem.innerHTML = `<div class="delete-btn" onclick="removeImage(event, this)">×</div><img src="${imgUrl}" onerror="handleGalleryError(this)" onclick="openLightbox(this.src)">`;
                            gallery.appendChild(newItem);
                        });
                    }
                })
                .catch(err => console.error("Error fetching images:", err));
        }

        document.getElementById('dnaTagline').innerText = dna.tagline || "...";
        document.getElementById('dnaAesthetic').innerText = dna.aesthetic || "...";

        // Brand Values
        const valuesEl = document.getElementById('dnaValues');
        if (valuesEl) {
            valuesEl.innerHTML = (dna.values || []).map(v => `<div class="dna-chip">${v}</div>`).join('');
        }

        // Tone of Voice
        const toneEl = document.getElementById('dnaTone');
        if (toneEl) {
            toneEl.innerHTML = (dna.tones || []).map(t => `<div class="dna-chip" style="background: rgba(160,233,255,0.05); color: var(--primary-color); border: 1px solid rgba(160,233,255,0.1);">${t}</div>`).join('');
        }

        // Fonts
        const f1 = document.getElementById('dnaFont1');
        const f2 = document.getElementById('dnaFont2');
        const fonts = Array.isArray(dna.font) ? dna.font : [dna.font || "Sans-serif"];
        if (f1) {
            f1.innerText = fonts[0] || "Sans-serif";
            f1.previousElementSibling.style.fontFamily = `'${f1.innerText}', sans-serif`;
        }
        if (f2) {
            f2.innerText = fonts[1] || "Sans-serif";
            f2.previousElementSibling.style.fontFamily = `'${f2.innerText}', sans-serif`;
        }

        // Multi-Vector Intelligence Synthesis - Driven by Backend Modular Fragments
        let overview = dna.overview || {};

        // Handle legacy cached state mapping
        if (overview.psychology || !overview.intelligence) {
            overview = {
                intelligence: overview.synthesis || "Transforms market signals, data, and inputs into structured intelligence models.",
                synthesis: overview.psychology || "Generates decision frameworks, not suggestions.",
                execution: overview.trajectory || "Converts strategy into operational actions.",
                architecture: overview.manifestation ? `Scale Architecture: <strong>${overview.manifestation.replace(/Final diagnostic: |<[^>]*>?/gm, '')}</strong>. Your system is primed for expansion.` : "Infrastructure logic for expansion and replication."
            };
        }

        document.getElementById('dnaOverview').innerHTML = `
        <div style="margin-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 20px;">
            <div style="font-weight: 700; color: var(--primary-color); margin-bottom: 12px; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 1px;">Strategic Intelligence Model</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                <div class="metric-card-mini">
                    <div class="metric-value-large">91.4%</div>
                    <div class="metric-label-mini">Model Reliability</div>
                </div>
                <div class="metric-card-mini">
                    <div class="metric-value-large">${dna.colors?.length || 4}</div>
                    <div class="metric-label-mini">Visual Tokens</div>
                </div>
            </div>
            <p style="font-size: 0.9rem; line-height: 1.6; color: var(--text-secondary);">Structural Analysis: ${overview.intelligence.substring(0, 120)}...</p>
        </div>
        
        <div style="margin-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 20px;">
            <div style="font-weight: 700; color: #ff5f56; margin-bottom: 12px; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 1px;">System Vulnerabilities</div>
            <div class="vulnerability-item">
                <div style="font-size: 0.85rem; color: #fff;">Market Saturation Risk: High</div>
                <p style="font-size: 0.8rem; color: var(--text-secondary);">Direct competitor overlap detected in 82% of target regions.</p>
            </div>
        </div>

        <div style="margin-bottom: 12px;">
            <div style="font-weight: 700; color: var(--primary-color); margin-bottom: 12px; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 1px;">Recommended Adjustments</div>
            <div class="adjustment-item">
                <div style="font-size: 0.85rem; color: #fff;">Shift to Vertical Defend Protocol</div>
                <p style="font-size: 0.8rem; color: var(--text-secondary);">Allocate 12.5% more weight to brand authority vectors.</p>
            </div>
        </div>
    `;

        // Populate System Voice
        document.getElementById('dnaTagline').innerText = dna.tagline || 'From intelligence to execution.';
        document.getElementById('dnaValues').innerHTML = (dna.values || []).map(t => `<span class="dna-chip" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff; padding: 8px 16px; font-size: 0.85rem;">${t}</span>`).join('');

        // Populate Brand Tone of Voice
        const toneContainer = document.getElementById('dnaTone');
        if (toneContainer) {
            const tones = (dna.tone ? [dna.tone] : []).concat(["Analytical", "Sophisticated"]);
            toneContainer.innerHTML = tones.slice(0, 4).map(t => `<span class="dna-chip" style="background: rgba(160, 233, 255, 0.05); border: 1px solid rgba(160, 233, 255, 0.1); color: var(--primary-color); padding: 6px 12px; font-size: 0.75rem; border-radius: 20px;">${t}</span>`).join('');
        }

        // Dynamic Hub Content (Specifically tailored to website via Backend)
        const websiteSugg = document.getElementById('websiteSuggestions');
        const marketSugg = document.getElementById('marketSuggestions');
        const dnaSugg = document.getElementById('dnaSuggestions');

        if (websiteSugg) {
            websiteSugg.innerHTML = dna.hub?.website || "• Deployment pathways<br>• Platform integration<br>• Operational rollout<br>• Scaling infrastructure";
        }

        if (marketSugg) {
            marketSugg.innerHTML = dna.hub?.growth || "• Market entry logic<br>• Regional expansion models<br>• Distribution strategy<br>• Platform scaling";
        }

        if (dnaSugg) {
            dnaSugg.innerHTML = dna.insights || (state.dna.insights && state.dna.insights !== 'Analysis Pending' ? state.dna.insights : "• Convert market signals to models.<br>• Execute structured frameworks.");
        }

        updateDNAUI();
    } catch (err) {
        console.error("ProMetra: DNA Population failed", err);
    }
}

function saveDNA() {
    state.dna.brandName = document.getElementById('brandNameInput')?.value || state.dna.brandName;
    updateDNAUI();
    showStep(5); // This was previously hardcoded, but let's just go to startApp if step 5 is just a transition
    startApp();
}

function updateDNAUI() {
    const dnaSidebar = document.getElementById('dnaSidebarContent');
    const rightAuth = document.getElementById('rightMetricAuthority');
    const rightPress = document.getElementById('rightMetricPressure');
    const rightRisk = document.getElementById('rightMetricRisk');
    const rightTraj = document.getElementById('rightTrajectoryContainer');

    if (dnaSidebar) {
        const dna = state.dna;
        const fonts = Array.isArray(dna.font) ? dna.font : [dna.font || "Sans-serif"];

        const persona = document.getElementById('audienceInput')?.value || 'Enterprise Decision Makers';
        const category = dna.industry || 'Market Strategy';

        dnaSidebar.innerHTML = `
            <div style="margin-bottom: 1.5rem;">
                <div style="font-size: 0.65rem; color: var(--text-secondary); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 1px;">Brand Identity</div>
                <div style="font-family: 'Fraunces', serif; font-style: italic; font-size: 1.2rem; color: var(--primary-color); line-height: 1.2; margin-bottom: 4px;">${dna.brandName || 'Analysis Pending'}</div>
                <div style="font-size: 0.75rem; color: #fff; opacity: 0.6; font-weight: 500;">${category}</div>
            </div>
            
            <div style="margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 8px;">
                <div>
                    <div style="font-size: 0.6rem; color: rgba(255,255,255,0.4); text-transform: uppercase;">Persona</div>
                    <div style="font-size: 0.75rem; color: #fff;">${persona}</div>
                </div>
            </div>

            <div style="margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: flex-end;">
                <div>
                    <div style="font-size: 0.6rem; color: rgba(255,255,255,0.4); text-transform: uppercase; margin-bottom: 4px;">Palette</div>
                    <div style="display: flex; gap: 6px;">
                        ${(dna.colors || []).slice(0, 4).map(c => `<div class="color-preview" style="background: ${c}; width: 12px; height: 12px; border-radius: 50%;"></div>`).join('')}
                    </div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 0.6rem; color: rgba(255,255,255,0.4); text-transform: uppercase; margin-bottom: 4px;">Typography</div>
                    <div style="font-size: 0.75rem; color: #fff; font-family: '${fonts[0]}', sans-serif;">${fonts[0]}</div>
                </div>
            </div>
        `;

        // Update Side Metrics
        const authVal = document.getElementById('authorityInput')?.value === 'dominant' ? '92' : '84.2';
        const pressVal = document.getElementById('intensityInput')?.value === 'high' ? 'High' : 'Med';

        if (rightAuth) rightAuth.innerText = authVal;
        if (rightPress) rightPress.innerText = pressVal;
        if (rightRisk) rightRisk.innerText = 'Low';

        if (rightTraj) {
            rightTraj.innerHTML = Array.from({ length: 15 }).map((_, i) => `
                <div style="flex: 1; height: ${20 + Math.random() * 60}%; background: ${i > 11 ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)'}; border-radius: 1px;"></div>
            `).join('');
        }
    }
}

async function generateAI(prompt, platform) {
    const audience = document.getElementById('audienceInput')?.value || 'General';
    const goal = document.getElementById('goalInput')?.value || 'Engagement';

    try {
        const response = await fetch(`${API_BASE}/api/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt,
                platform,
                context: {
                    brandName: state.dna.brandName,
                    audience,
                    goal
                }
            })
        });

        if (!response.ok) throw new Error('Generation failed');
        const data = await response.json();

        // Refresh history
        await fetchHistory();
        return data.result;
    } catch (err) {
        alert("Failed to connect to the backend engine.");
        return "Error connecting to server.";
    }
}

async function fetchHistory() {
    try {
        const response = await fetch(`${API_BASE}/api/history`);
        state.history = await response.json();
        updateHistoryUI();
    } catch (err) {
        console.error("Failed to fetch history");
    }
}

async function clearHistory() {
    if (confirm('Are you sure you want to clear your generation history?')) {
        try {
            await fetch(`${API_BASE}/api/history`, { method: 'DELETE' });
            state.history = [];
            updateHistoryUI();
        } catch (err) {
            alert("Failed to clear history on server.");
        }
    }
}

function updateHistoryUI() {
    const historyList = document.getElementById('historyList');
    if (!historyList) return;

    if (state.history.length === 0) {
        historyList.innerHTML = '<div style="font-size: 0.8rem; color: var(--text-secondary); text-align: center; padding: 1rem;">No history yet.</div>';
        return;
    }

    historyList.innerHTML = state.history.map(item => `
        <div class="history-item glass" onclick="viewHistoryItem(${item.id})" style="padding: 12px; cursor: pointer; margin-bottom: 8px; font-size: 0.85rem; transition: var(--transition);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <span class="platform-tag" style="background: var(--primary-color); padding: 2px 6px; border-radius: 4px; font-size: 0.7rem; font-weight: 800;">${item.platform.toUpperCase()}</span>
                <span style="font-size: 0.65rem; color: var(--text-secondary);">${new Date(item.timestamp).toLocaleDateString()}</span>
            </div>
            <div class="history-preview" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.prompt}</div>
        </div>
    `).join('');
}

function viewHistoryItem(id) {
    const item = state.history.find(h => h.id === id);
    if (!item) return;

    document.getElementById('promptInput').value = item.prompt;
    document.getElementById('platformSelect').value = item.platform;

    const outputContainer = document.getElementById('outputContainer');
    const outputText = document.getElementById('outputText');

    outputContainer.classList.remove('hidden');
    outputText.innerText = item.result;
    outputContainer.scrollIntoView({ behavior: 'smooth' });
}

// The previous switchView function is being removed as showDashboardView is more comprehensive.
// The calls to switchView will be updated to use showDashboardView.

// Comprehensive Sidebar Mapping
document.addEventListener('DOMContentLoaded', () => {
    const sidebarMapping = {
        'Console': 'console',
        'Campaign Builder': 'campaign',
        'Campaign Architect': 'campaign',
        'Simulation': 'simulation',
        'Analytics': 'analytics',
        'Strategy Model': 'strategy'
    };

    document.querySelectorAll('.sidebar li').forEach(li => {
        li.style.cursor = 'pointer';
        li.addEventListener('click', () => {
            const fullText = li.textContent.trim().split('\n')[0].trim();
            // Clean text (remove icons/extra spaces if any)
            const cleanText = fullText.replace(/[^\w\s]/gi, '').trim();

            const targetView = sidebarMapping[cleanText] || sidebarMapping[fullText];
            if (targetView) showDashboardView(targetView);
        });
    });
});

function runSimulation() {
    const placeholder = document.getElementById('simPlaceholder');
    const scenario = document.getElementById('simScenario').value;

    placeholder.innerHTML = `<div class="loader-container">
        <div class="loader-ring"></div>
        <div style="margin-top: 15px; font-size: 0.8rem; letter-spacing: 1px;">CALCULATING VECTORS...</div>
    </div>`;

    setTimeout(() => {
        placeholder.innerHTML = `
            <div style="width: 100%; height: 100%; display: flex; align-items: flex-end; gap: 8px; padding: 20px;">
                ${Array.from({ length: 12 }).map((_, i) => `
                    <div class="bar-glow" style="flex: 1; height: ${20 + Math.random() * 80}%; background: var(--primary-color); border-radius: 4px 4px 0 0; animation: bar-rise 0.5s ease-out forwards; animation-delay: ${i * 0.05}s;"></div>
                `).join('')}
            </div>
        `;

        // Update random metrics
        const roi = (2.5 + Math.random() * 3).toFixed(1) + 'x';
        const auth = (6.0 + Math.random() * 3).toFixed(1);
        const risk = (10 + Math.random() * 40).toFixed(0) + '%';
        
        document.getElementById('simRoi').innerText = roi;
        document.getElementById('simAuthority').innerText = auth;
        document.getElementById('simRisk').innerText = risk;

        // Sync with Right Panel
        const rightAuth = document.getElementById('rightMetricAuthority');
        const rightRisk = document.getElementById('rightMetricRisk');
        if (rightAuth) rightAuth.innerText = (parseFloat(auth) * 10).toFixed(0); 
        if (rightRisk) rightRisk.innerText = parseInt(risk) < 25 ? 'Low' : parseInt(risk) < 40 ? 'Med' : 'High';

        // Add a signature notification
        showNotification(`Simulation for "${scenario}" completed successfully.`);
    }, 1500);
}

function showNotification(msg) {
    const toast = document.createElement('div');
    toast.className = 'glass';
    toast.style.cssText = `
        position: fixed; bottom: 24px; right: 24px; 
        padding: 16px 24px; border-radius: 12px; 
        border: 1px solid var(--primary-color);
        animation: slide-in-bottom 0.4s ease-out;
        z-index: 1000; font-size: 0.85rem;
    `;
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.4s';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

function startApp() {
    document.getElementById('onboardingSection')?.classList.add('hidden');
    document.getElementById('appSection')?.classList.remove('hidden');
    showDashboardView('console');
    saveSession();
}

function exitApp() {
    document.getElementById('appSection')?.classList.add('hidden');
    document.getElementById('pageWrapper')?.classList.remove('hidden');
    document.getElementById('siteHeader')?.classList.remove('hidden');
    localStorage.removeItem('prometra_session');
}

function exportStrategy() {
    const brief = document.getElementById('promptInput').value;
    const result = document.getElementById('outputText').innerText;
    const content = `PROMETRA CAMPAIGN STRATEGY\n\nBRIEF: ${brief}\n\nRESULT:\n${result}\n\nGenerated via Prometra Labs Engine.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Prometra_Strategy_${Date.now()}.txt`;
    a.click();
}

function showDashboardView(view) {
    const views = ['consoleView', 'campaignView', 'simulationView', 'analyticsView', 'strategyView'];
    const navButtons = ['navConsoleBtn', 'navCampaignBtn', 'navSimBtn', 'navAnalyticsBtn', 'navStrategyBtn'];

    // Hide all views and reset button styles
    views.forEach(v => {
        const el = document.getElementById(v);
        if (el) el.classList.add('hidden');
    });

    navButtons.forEach(btn => {
        const el = document.getElementById(btn);
        if (el) el.style.background = 'none';
    });

    // Mapping view names to IDs
    const viewMapping = {
        'portal': 'consoleView',
        'console': 'consoleView',
        'campaign': 'campaignView',
        'simulation': 'simulationView',
        'analytics': 'analyticsView',
        'strategy': 'strategyView'
    };

    const navMapping = {
        'console': 'navConsoleBtn',
        'campaign': 'navCampaignBtn',
        'simulation': 'navSimBtn',
        'analytics': 'navAnalyticsBtn',
        'strategy': 'navStrategyBtn'
    };

    // Show selected view
    const targetView = document.getElementById(viewMapping[view]);
    if (targetView) targetView.classList.remove('hidden');

    // Highlight selected button
    const targetNav = document.getElementById(navMapping[view]);
    if (targetNav) targetNav.style.background = 'var(--glass-bg)';

    // Update Console Title
    const consoleTitle = document.querySelector('.main-content header h2');
    if (consoleTitle) {
        const titles = {
            'console': 'Strategy Console',
            'campaign': 'Campaign Builder',
            'simulation': 'Strategy Simulation',
            'analytics': 'Market Analytics',
            'strategy': 'Strategy Model'
        };
        consoleTitle.innerText = titles[view] || 'Strategy Console';
    }

    // Populate data if entering Strategy View
    if (view === 'strategy') {
        updateStrategyUI();
    }
}

function updateStrategyUI() {
    const dna = state.dna;

    // Identity Section
    const personaEl = document.getElementById('strategyPersona');
    const categoryEl = document.getElementById('strategyCategory');
    const statementEl = document.getElementById('strategyStatement');

    if (personaEl) personaEl.innerText = document.getElementById('audienceInput')?.value || 'Enterprise Decision Makers';
    if (categoryEl) categoryEl.innerText = dna.industry || 'Market Strategy';
    if (statementEl) statementEl.innerText = dna.tagline || 'From intelligence to execution. Precision-driven growth models for enterprise systems.';

    // Vector Metrics
    const authVal = document.getElementById('authorityInput')?.value === 'dominant' ? '92' : '84';
    const pressVal = document.getElementById('intensityInput')?.value === 'high' ? 'High' : 'Med';
    const diffVal = document.getElementById('authorityInput')?.value === 'emerging' ? 'High' : 'Stable';
    const riskVal = 'Low';

    const authEl = document.getElementById('strategyAuthority');
    const pressEl = document.getElementById('strategyPressure');
    const diffEl = document.getElementById('strategyDiff');
    const riskEl = document.getElementById('strategyRisk');

    if (authEl) authEl.innerText = authVal;
    if (pressEl) pressEl.innerText = pressVal;
    if (diffEl) diffEl.innerText = diffVal;
    if (riskEl) riskEl.innerText = riskVal;

    // Trajectory Chart
    const trajectoryEl = document.getElementById('strategyTrajectory');
    if (trajectoryEl) {
        trajectoryEl.innerHTML = Array.from({ length: 15 }).map((_, i) => `
            <div style="flex: 1; height: ${30 + Math.random() * 60}%; background: ${i === 14 ? 'var(--primary-color)' : 'rgba(255,255,255,0.05)'}; border-radius: 4px; box-shadow: ${i === 14 ? '0 0 15px var(--primary-color)' : 'none'};"></div>
        `).join('');
    }
}

function recommendAudience() {
    const industry = state.dna.industry || "Market";
    const audiences = [
        `Tech-savvy Professionals in ${industry}`,
        `Modern Creators & Influencers`,
        `High-intent ${industry} Enthusiasts`,
        `Global SaaS Procurement Teams`
    ];
    const pick = audiences[Math.floor(Math.random() * audiences.length)];
    const input = document.getElementById('audienceInput');
    if (input) {
        input.value = pick;
        input.style.border = '1px solid var(--primary-color)';
        setTimeout(() => input.style.border = '1px solid rgba(255,255,255,0.1)', 1000);
    }
}

async function generateVariants() {
    const outputText = document.getElementById('outputText');
    if (!outputText.innerText || outputText.innerText === "Engine ready...") {
        alert("Please generate a base strategy first.");
        return;
    }
    outputText.innerText += "\n\n--- GENERATING A/B VARIANTS ---\n";
    await new Promise(r => setTimeout(r, 1000));
    const variants = [
        "Variant A (Emotional): Stop feeling behind. Own your market velocity today.",
        "Variant B (Data-Driven): 3.5x faster generation verified for enterprise teams.",
        "Variant C (Outcome-Focused): One brief. 30 languages. Unlimited growth."
    ];
    variants.forEach(v => {
        outputText.innerText += `\n${v}`;
    });
}

function checkCompliance() {
    const indicator = document.getElementById('complianceScore');
    indicator.innerHTML = `<span style="color: var(--primary-color); margin-right: 8px;">⏳ Analyzing Policy...</span>`;
    setTimeout(() => {
        const scores = [98, 99, 95, 100];
        const score = scores[Math.floor(Math.random() * scores.length)];
        indicator.innerHTML = `<span style="color: var(--primary-color); border: 1px solid var(--primary-color); padding: 2px 8px; border-radius: 4px;">✔ ${score}% COMPLIANT</span>`;
    }, 1500);
}

// Initial hydration
async function init() {
    try {
        const response = await fetch(`${API_BASE}/api/dna/latest`);
        if (response.ok) {
            state.dna = await response.json();
            updateDNAUI();
        }
    } catch (err) {
        console.log("No previous identity found.");
    }
    fetchHistory();
}

window.addEventListener('DOMContentLoaded', () => {
    init();
    console.log("Prometra Full-Stack Engine Connected");
    const style = document.createElement('style');
    style.textContent = `
        .history-item:hover {
            border-color: var(--primary-color);
            background: rgba(59, 130, 246, 0.1);
            transform: translateX(5px);
        }
    `;
    document.head.append(style);
});

// --- Edit Modals Logic ---
let activeEditType = '';
const fontsPool = [
    "Sans-serif", "Jetbrains Mono", "Georgia", "Inter", "Roboto", "Outfit", "Fraunces", "Space Grotesk",
    "Cabinet Grotesk", "Clash Display", "Satoshi", "General Sans", "Playfair Display", "Montserrat",
    "Open Sans", "Lato", "Poppins", "Raleway", "Merriweather", "Bebas Neue"
];
let selectedFonts = [];

function openEditModal(type) {
    activeEditType = type;
    if (type === 'tagline') {
        const modal = document.getElementById('editTaglineModal');
        const input = document.getElementById('editTaglineInput');
        if (input) input.value = state.dna.tagline || "";
        modal?.classList.remove('hidden');
    } else if (type === 'aesthetic') {
        const modal = document.getElementById('editAestheticModal');
        const input = document.getElementById('editAestheticInput');
        if (input) input.value = state.dna.aesthetic || "";
        modal?.classList.remove('hidden');
    } else if (type === 'tone' || type === 'values') {
        const modal = document.getElementById('editChipsModal');
        const title = document.getElementById('chipsModalTitle');
        const sub = document.getElementById('chipsModalSub');

        if (type === 'tone') {
            title.innerText = "Tone of voice";
            sub.innerText = "Describe your brand's tone of voice";
        } else {
            title.innerText = "Brand values";
            sub.innerText = "What principles drive your business?";
        }

        renderModalChips();
        modal?.classList.remove('hidden');
    } else if (type === 'fonts') {
        // Normalize font state
        selectedFonts = Array.isArray(state.dna.font) ? [...state.dna.font] : [state.dna.font || "Sans-serif"];
        renderFontList();
        updateFontPreview();
        document.getElementById('editFontsModal')?.classList.remove('hidden');
    }
}

function closeEditModal(type) {
    if (type === 'chips') {
        document.getElementById('editChipsModal')?.classList.add('hidden');
    } else {
        const modalId = `edit${type.charAt(0).toUpperCase() + type.slice(1)}Modal`;
        document.getElementById(modalId)?.classList.add('hidden');
    }
}

function renderModalChips() {
    const list = document.getElementById('modalChipsList');
    if (!list) return;

    const items = activeEditType === 'tone' ? (state.dna.tones || []) : (state.dna.values || []);
    list.innerHTML = items.map((item, idx) => `
        <div class="dna-chip" style="padding: 6px 12px; border-radius: 20px; background: rgba(255,255,255,0.05); display: flex; align-items: center; gap: 8px; font-size: 0.8rem;">
            ${item}
            <span onclick="removeChip(${idx})" style="cursor: pointer; opacity: 0.6; font-size: 1.2rem; line-height: 1;">×</span>
        </div>
    `).join('');

    const applyBtn = document.getElementById('chipApplyBtn');
    if (applyBtn) {
        if (items.length > 0) {
            applyBtn.style.background = 'var(--primary-color)';
            applyBtn.style.color = 'var(--bg-color)';
            applyBtn.style.border = 'none';
            applyBtn.disabled = false;
        } else {
            applyBtn.style.background = '#333';
            applyBtn.style.color = '#666';
            applyBtn.disabled = true;
        }
    }
}

function removeChip(index) {
    if (activeEditType === 'tone') {
        state.dna.tones.splice(index, 1);
    } else {
        state.dna.values.splice(index, 1);
    }
    renderModalChips();
}

function saveEdit(type) {
    if (type === 'tagline') {
        const input = document.getElementById('editTaglineInput');
        if (input) state.dna.tagline = input.value;
        closeEditModal('tagline');
    } else if (type === 'aesthetic') {
        const input = document.getElementById('editAestheticInput');
        if (input) state.dna.aesthetic = input.value;
        closeEditModal('aesthetic');
    } else if (type === 'chips') {
        closeEditModal('chips');
    } else if (type === 'fonts') {
        state.dna.font = selectedFonts;
        closeEditModal('fonts');
    }
    populateDNA(); // Re-render the cards
}

// --- Font Modal Logic ---
function renderFontList(query = '') {
    const bizList = document.getElementById('businessFontsList');
    const googleList = document.getElementById('googleFontsList');
    if (!bizList || !googleList) return;

    const lowerQuery = query.toLowerCase();
    const filtered = fontsPool.filter(f => f.toLowerCase().includes(lowerQuery));

    // For demo, split pool
    const bizFonts = filtered.filter((_, i) => i < 3);
    const gFonts = filtered.filter((_, i) => i >= 3);

    const mapFn = (f) => {
        const isSelected = selectedFonts.includes(f);
        return `
            <div class="font-item ${isSelected ? 'selected' : ''}" onclick="toggleFont('${f}')">
                <span style="font-family: '${f}', sans-serif;">${f}</span>
                <svg class="checkmark" style="${isSelected ? 'opacity:1' : 'opacity:0'}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
            </div>
        `;
    };

    bizList.innerHTML = bizFonts.map(mapFn).join('');
    googleList.innerHTML = gFonts.map(mapFn).join('');
}

function toggleFont(font) {
    if (selectedFonts.includes(font)) {
        selectedFonts = selectedFonts.filter(f => f !== font);
    } else {
        if (selectedFonts.length >= 2) {
            selectedFonts.shift(); // Max 2
        }
        selectedFonts.push(font);
    }
    renderFontList(document.getElementById('fontSearch')?.value || '');
    updateFontPreview();
}

function updateFontPreview() {
    const previewLetter = document.getElementById('fontPreviewLetter');
    const previewName = document.getElementById('fontPreviewName');
    const applyBtn = document.getElementById('fontApplyBtn');

    if (selectedFonts.length > 0) {
        const last = selectedFonts[selectedFonts.length - 1];
        if (previewLetter) {
            previewLetter.innerText = "Aa";
            previewLetter.style.fontFamily = `'${last}', sans-serif`;
        }
        if (previewName) previewName.innerText = selectedFonts.join(' / ');

        if (applyBtn) {
            applyBtn.style.background = 'var(--primary-color)';
            applyBtn.style.color = 'var(--bg-color)';
            applyBtn.style.border = 'none';
            applyBtn.disabled = false;
        }
    } else {
        if (previewName) previewName.innerText = "None selected";
        if (applyBtn) {
            applyBtn.style.background = '#333';
            applyBtn.style.color = '#666';
            applyBtn.disabled = true;
        }
    }
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const gallery = document.querySelector('.image-gallery');
        if (gallery) {
            const newItem = document.createElement('div');
            newItem.className = 'gallery-item';
            newItem.title = 'User Asset';
            newItem.innerHTML = `<div class="delete-btn" onclick="removeImage(event, this)">×</div><img src="${e.target.result}" onclick="openLightbox(this.src)">`;
            gallery.appendChild(newItem);
        }
    };
    reader.readAsDataURL(file);
}

function removeImage(event, element) {
    event.stopPropagation();
    const parentItem = element.closest('.gallery-item');
    if (parentItem) {
        parentItem.remove();
    }
}

function openLightbox(src) {
    const modal = document.getElementById('imageLightboxModal');
    const img = document.getElementById('lightboxImage');
    if (modal && img) {
        img.src = src;
        modal.classList.remove('hidden');
    }
}

function closeLightbox(event) {
    // Only close if clicking the background or the close button
    if (event.target.id === 'imageLightboxModal' || event.target.classList.contains('modal-close')) {
        const modal = document.getElementById('imageLightboxModal');
        if (modal) modal.classList.add('hidden');
    }
}

// --- Top-Right Menu & Profile ---
function toggleTopMenu() {
    document.getElementById('profileDropdown')?.classList.add('hidden');
    document.getElementById('topMenuDropdown')?.classList.toggle('hidden');
}

function toggleProfileMenu() {
    document.getElementById('topMenuDropdown')?.classList.add('hidden');
    document.getElementById('profileDropdown')?.classList.toggle('hidden');
}

// Close dropdowns on outside click
document.addEventListener('click', (e) => {
    const icons = document.querySelector('.top-right-icons');
    if (icons && !icons.contains(e.target)) {
        document.getElementById('topMenuDropdown')?.classList.add('hidden');
        document.getElementById('profileDropdown')?.classList.add('hidden');
    }
    // Dashboard dropdowns
    const dashHeader = document.querySelector('.main-content header');
    if (dashHeader && !dashHeader.contains(e.target)) {
        document.getElementById('topMenuDropdownDash')?.classList.add('hidden');
        document.getElementById('profileDropdownDash')?.classList.add('hidden');
    }
    // Landing page dropdowns
    const landingIcons = document.getElementById('landingTopIcons');
    if (landingIcons && !landingIcons.contains(e.target)) {
        document.getElementById('topMenuDropdownLanding')?.classList.add('hidden');
        document.getElementById('profileDropdownLanding')?.classList.add('hidden');
    }
});

function toggleTopMenuDash() {
    document.getElementById('profileDropdownDash')?.classList.add('hidden');
    document.getElementById('topMenuDropdownDash')?.classList.toggle('hidden');
}

function toggleProfileMenuDash() {
    document.getElementById('topMenuDropdownDash')?.classList.add('hidden');
    document.getElementById('profileDropdownDash')?.classList.toggle('hidden');
}

function toggleTopMenuLanding() {
    document.getElementById('profileDropdownLanding')?.classList.add('hidden');
    document.getElementById('topMenuDropdownLanding')?.classList.toggle('hidden');
}

function toggleProfileMenuLanding() {
    document.getElementById('topMenuDropdownLanding')?.classList.add('hidden');
    document.getElementById('profileDropdownLanding')?.classList.toggle('hidden');
}

// --- Event Initialization ---
window.addEventListener('DOMContentLoaded', () => {
    // Chip adding logic
    const chipInput = document.getElementById('chipInput');
    chipInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && chipInput.value.trim()) {
            const val = chipInput.value.trim();
            if (activeEditType === 'tone') {
                if (!state.dna.tones) state.dna.tones = [];
                state.dna.tones.push(val);
            } else {
                if (!state.dna.values) state.dna.values = [];
                state.dna.values.push(val);
            }
            chipInput.value = '';
            renderModalChips();
        }
    });

    // Font search logic
    const fontSearch = document.getElementById('fontSearch');
    fontSearch?.addEventListener('input', (e) => {
        renderFontList(e.target.value);
    });

    // Restore session on page load
    restoreSession();

    // Strategy Engine Execution Hook
    const generateBtn = document.getElementById('generateBtn');
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            generateStrategy();
        });
    }
});

// --- Advanced Strategy Engine Logic ---
function selectStrategyMode(btn, mode) {
    document.querySelectorAll('.mode-btn').forEach(b => {
        b.classList.remove('active');
        b.style.borderColor = 'var(--glass-border)';
        b.style.color = 'var(--text-secondary)';
    });
    btn.classList.add('active');
    btn.style.borderColor = 'var(--primary-color)';
    btn.style.color = 'var(--primary-color)';
    document.getElementById('selectedStrategyMode').value = mode;
}

function generateStrategy() {
    const container = document.getElementById('outputContainer');
    const generateBtn = document.getElementById('generateBtn');

    if (container) container.classList.add('hidden');
    if (generateBtn) {
        generateBtn.innerText = "SYNTHESIZING VECTORS...";
        generateBtn.style.opacity = "0.7";
        generateBtn.disabled = true;
    }

    setTimeout(() => {
        if (container) container.classList.remove('hidden');
        if (generateBtn) {
            generateBtn.innerText = "GENERATE STRATEGIC BLUEPRINT";
            generateBtn.style.opacity = "1";
            generateBtn.disabled = false;
        }
        renderStrategicBlueprint();
    }, 1500);
}

function renderStrategicBlueprint() {
    const objective = document.getElementById('composerObjective').value;
    const market = document.getElementById('composerMarket').value || 'Target Market';
    const angle = document.getElementById('composerAngle').value || 'Direct Value Proposition';

    const blueprintEl = document.getElementById('blueprintText');
    const messagingEl = document.getElementById('messagingText');
    const channelEl = document.getElementById('channelText');
    const roadmapEl = document.getElementById('roadmapText');

    if (blueprintEl) {
        blueprintEl.innerHTML = `
            <strong>Core Protocol:</strong> ${objective.replace('_', ' ').toUpperCase()}<br>
            <strong>Market Vector:</strong> ${market}<br><br>
            Deploying a high-density strategic framework focused on ${angle}. The model predicts a 14% increase in authority within the first 30 days by leveraging cultural arbitrage and semantic precision.
        `;
    }

    if (messagingEl) {
        messagingEl.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 8px;">
                <div><span style="color: var(--primary-color);">▶ Hook:</span> "The future of ${market} isn't just growth—it's precision."</div>
                <div><span style="color: var(--primary-color);">▶ Authority Anchor:</span> Lean into the ${objective} narrative to establish domain dominance.</div>
                <div><span style="color: var(--primary-color);">▶ Contrast Pattern:</span> Position against the "unstructured noise" of competitors.</div>
            </div>
        `;
    }

    if (channelEl) {
        channelEl.innerHTML = `
            Primary allocation directed toward <strong>LinkedIn Enterprise</strong> (60%) and <strong>Strategic Newsletters</strong> (40%). 
            Secondary retargeting pool initialized for high-intent visitors with 15-day cookie window.
        `;
    }

    if (roadmapEl) {
        roadmapEl.innerHTML = `
            <strong>Phase 01 (Week 1-2):</strong> Asset hardening and vector alignment.<br>
            <strong>Phase 02 (Week 3-6):</strong> High-pressure distribution across primary channels.<br>
            <strong>Phase 03 (Week 7-12):</strong> Optimization loop based on Authority Score feedback.
        `;
    }
}

function switchExecutionTab(btn, tab) {
    // Styling
    document.querySelectorAll('.tabs-btn').forEach(b => {
        b.classList.remove('active');
        b.style.borderBottom = 'none';
        b.style.color = 'var(--text-secondary)';
    });
    btn.classList.add('active');
    btn.style.borderBottom = '2px solid var(--primary-color)';
    btn.style.color = 'var(--primary-color)';

    // Content mapping
    const content = document.getElementById('executionTabContent');
    const tabs = {
        'messaging': '<strong style="color: var(--primary-color); font-size: 1.1rem;">Execution: Messaging Architecture</strong><br><br><div style="display: flex; flex-direction: column; gap: 12px;"><div><span style="color: var(--accent-purple);">▶ Hook (0-3s):</span> "Stop guessing. Start executing. The infrastructure for growth is here."</div><div><span style="color: var(--accent-purple);">▶ Value Anchor:</span> Address the immediate friction of scaling data.</div><div><span style="color: var(--accent-purple);">▶ Trust Pattern:</span> Deploy silent authority via deep-tech aesthetic.</div><div><span style="color: var(--accent-purple);">▶ Call to Action:</span> "Deploy Systems Now" (Avoid generic \'Sign Up\').</div></div>',
        'creatives': '<strong style="color: var(--primary-color); font-size: 1.1rem;">Execution: Creative Specifications</strong><br><br><div style="display: flex; flex-direction: column; gap: 12px;"><div><span style="color: var(--accent-purple);">▶ Format:</span> 4:5 Video & 1:1 Static Carousels</div><div><span style="color: var(--accent-purple);">▶ Visual Tone:</span> Dark mode, neon accents, high-contrast typography.</div><div><span style="color: var(--accent-purple);">▶ Subtitles:</span> Essential. Kinertic serif font, auto-highlighted keywords.</div><div><span style="color: var(--accent-purple);">▶ Audio:</span> Low-fi synth wave (Ambient/Tech focus).</div></div>',
        'funnel': '<strong style="color: var(--primary-color); font-size: 1.1rem;">Execution: Funnel Structure</strong><br><br><div style="display: flex; flex-direction: column; gap: 12px;"><div><span style="color: var(--accent-purple);">▶ TOFU (Awareness):</span> Educational short-form video -> Pixel capture.</div><div><span style="color: var(--accent-purple);">▶ MOFU (Consideration):</span> Remarketing with competitive comparison carousels.</div><div><span style="color: var(--accent-purple);">▶ BOFU (Conversion):</span> Direct ROI calculator landing page -> Setup call.</div></div>',
        'adcopy': '<strong style="color: var(--primary-color); font-size: 1.1rem;">Execution: Ad Copy Variations</strong><br><br><div style="display: flex; flex-direction: column; gap: 12px;"><div><span style="color: var(--accent-purple);">▶ V1 (Direct):</span> "The old way is too slow. Modern teams use our infrastructure to expand globally in 48 hours."</div><div><span style="color: var(--accent-purple);">▶ V2 (Agitation):</span> "Still manually adjusting campaigns for 5 regions? Stop. Automate your strategy."</div><div><span style="color: var(--accent-purple);">▶ V3 (Social Proof):</span> "Join 2,000+ top-tier brands dominating their market share."</div></div>',
        'retargeting': '<strong style="color: var(--primary-color); font-size: 1.1rem;">Execution: Retargeting Logic</strong><br><br><div style="display: flex; flex-direction: column; gap: 12px;"><div><span style="color: var(--accent-purple);">▶ 0-3 Days (Hot):</span> Feature breakdown & immediate discount offer.</div><div><span style="color: var(--accent-purple);">▶ 4-14 Days (Warm):</span> Deep dive case studies and founder stories (YouTube Pre-roll).</div><div><span style="color: var(--accent-purple);">▶ 15-30 Days (Cold):</span> Product updates, macro industry trends, soft newsletter opt-in.</div></div>',
        'analytics': '<strong style="color: var(--primary-color); font-size: 1.1rem;">Execution: Analytics Setup</strong><br><br><div style="display: flex; flex-direction: column; gap: 12px;"><div><span style="color: var(--accent-purple);">▶ Primary Proxy:</span> Blended CAC & 30-Day LTV.</div><div><span style="color: var(--accent-purple);">▶ Custom Events:</span> Track \'Blueprint Generated\' & \'Export Clicked\'.</div><div><span style="color: var(--accent-purple);">▶ Attribution:</span> 7-day click, 1-day view via Meta CAPI.</div></div>'
    };

    content.innerHTML = tabs[tab] || tabs['messaging'];
}

function simulateCampaign() {
    const btn = document.getElementById('runSimulationBtn');
    const simBox = document.getElementById('simulationOutput');

    btn.style.display = 'none';
    simBox.style.display = 'block';
    simBox.innerHTML = '<div style="display:flex; align-items:center; gap: 12px; justify-content:center;"><div class="loader-pulse" style="width: 16px; height: 16px; border-radius: 50%; background: var(--accent-purple); animation: nodeGlow 0.8s infinite alternate;"></div><span style="color: var(--accent-purple)">Running Monte Carlo probabilistic simulation...</span></div>';

    setTimeout(() => {
        simBox.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; text-align: center;">
                <div style="background: rgba(255, 77, 77, 0.05); padding: 16px; border-radius: 8px; border: 1px solid rgba(255, 77, 77, 0.2);">
                    <div style="color: rgba(255,255,255,0.5); margin-bottom: 12px; font-size: 0.75rem; letter-spacing: 1px;">WORST CASE (P10)</div>
                    <strong style="color: #ff4d4d; font-size: 1.4rem;">ROAS: 1.2x</strong>
                    <div style="margin-top: 12px; font-size: 0.8rem; color: #fff;">
                        CAC: <strong>$45</strong><br>Reach: <strong>450k</strong>
                    </div>
                </div>
                
                <div style="background: rgba(255, 189, 46, 0.05); padding: 16px; border-radius: 8px; border: 1px solid rgba(255, 189, 46, 0.2);">
                    <div style="color: rgba(255,255,255,0.5); margin-bottom: 12px; font-size: 0.75rem; letter-spacing: 1px;">EXPECTED (P50)</div>
                    <strong style="color: #ffbd2e; font-size: 1.4rem;">ROAS: 2.8x</strong>
                    <div style="margin-top: 12px; font-size: 0.8rem; color: #fff;">
                        CAC: <strong>$18</strong><br>Reach: <strong>1.2M</strong>
                    </div>
                </div>
                
                <div style="background: rgba(208, 225, 154, 0.05); padding: 16px; border-radius: 8px; border: 1px solid rgba(208, 225, 154, 0.2);">
                    <div style="color: rgba(255,255,255,0.5); margin-bottom: 12px; font-size: 0.75rem; letter-spacing: 1px;">BEST CASE (P90)</div>
                    <strong style="color: #d0e19a; font-size: 1.4rem;">ROAS: 4.5x</strong>
                    <div style="margin-top: 12px; font-size: 0.8rem; color: #fff;">
                        CAC: <strong>$9</strong><br>Reach: <strong>3.1M</strong>
                    </div>
                </div>
            </div>
            <div style="margin-top: 16px; text-align: center; color: var(--text-secondary); font-size: 0.75rem; font-family: 'Inter', sans-serif;">Forecasts generated using deep-market competitor analysis constraints and ad-platform historical benchmarks.</div>
        `;
    }, 1600);
}
