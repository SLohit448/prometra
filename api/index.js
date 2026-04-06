const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let identities = [];
let history = [];

app.post('/api/analyze', (req, res) => {
    const { website } = req.body;
    if (!website) return res.status(400).json({ error: 'URL required' });
    
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
    
    identities.push({...dna, created_at: new Date()});
    res.json(dna);
});

app.post('/api/generate', (req, res) => {
    const { prompt, context } = req.body;
    const result = `📦 STRATEGY BLUEPRINT\n\n1. OBJECTIVE: ${prompt}\n2. CONTEXT: ${context?.brandName || 'Global Brand'}\n3. EXECUTION: Deploy high-density market resonance model.`;
    history.push({prompt, platform: "Strategy Builder", result, timestamp: new Date()});
    res.json({ result });
});

app.get('/api/history', (req, res) => { 
    res.json([...history].sort((a,b) => b.timestamp - a.timestamp)); 
});
app.delete('/api/history', (req, res) => { 
    history = []; 
    res.json({ success: true }); 
});

module.exports = app;
