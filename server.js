const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.post('/api/analyze', (req, res) => {
    const { website } = req.body;
    if (!website) return res.status(400).json({ error: 'Website URL required' });
    
    const domain = website.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0].toLowerCase();
    const brandName = domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1);
    
    const dna = {
        website: domain,
        brandName,
        tagline: `Redefining the digital boundary for ${brandName}.`,
        industry: "Global AI Enterprise",
        tone: "Ethereal & Precise",
        aesthetic: "Noir Minimalist",
        overview: `${brandName} is positioned as a disruptive force in the vertical.`,
        values: ["Innovation", "Integrity", "Speed"],
        hub: { website: "• Deploy a 'Synaptic Interface' to lead technical intent.", growth: "• Target high-velocity markets for expansion." },
        insights: "• Leverage 'Silent Authority' to signal premium positioning."
    };
    
    db.saveIdentity(dna);
    res.json(dna);
});

app.post('/api/generate', (req, res) => {
    const { prompt, context } = req.body;
    setTimeout(() => {
        const result = `📦 STRATEGY BLUEPRINT\n\n1. OBJECTIVE: ${prompt}\n2. CONTEXT: ${context?.brandName || 'Global Brand'}\n3. EXECUTION: Deploy high-density market resonance model.`;
        db.saveHistory(prompt, "Strategy Builder", result);
        res.json({ result });
    }, 1000);
});

app.get('/api/history', (req, res) => { res.json(db.getHistory()); });
app.delete('/api/history', (req, res) => { db.clearHistory(); res.json({ success: true }); });

app.listen(PORT, () => { console.log(`Prometra Backend optimized and running on http://localhost:${PORT}`); });
