module.exports = async (req, res) => {
    // Natively handle CORS (No packages needed)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') { return res.status(200).end(); }

    const path = req.url.split('?')[0];

    // Respond natively to the Scanner without Express
    if (path === '/api/analyze' || path === '/analyze') {
        const website = req.body?.website || 'prometra.ai';
        const domain = website.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0].toLowerCase();
        const brandName = domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1);
        
        return res.status(200).json({
            website: domain,
            brandName: brandName,
            tagline: `Redefining the digital boundary for ${brandName}.`,
            industry: "Global Analysis AI",
            tone: "Ethereal & Precise",
            aesthetic: "Noir Minimalist",
            overview: `${brandName} is an emerging leader in enterprise transformation.`,
            values: ["Innovation", "Integrity", "Velocity"],
            font: "Inter",
            colors: ["#a0e9ff", "#8b5cf6"],
            hub: { website: "Deploy a custom Synaptic Interface.", growth: "Focus on high-leverage digital assets." },
            insights: "Use the Intelligence Panel to track real-time commands."
        });
    }

    if (path === '/api/generate' || path === '/generate') {
        const result = `📦 STRATEGY BLUEPRINT\n1. OBJECTIVE: Synthesis\n2. EXECUTION: Deploy high-density resonance model.`;
        return res.status(200).json({ result });
    }

    return res.status(404).json({ error: 'Endpoint not found' });
};
