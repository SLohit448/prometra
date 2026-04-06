const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'prometra.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS identities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    website TEXT UNIQUE,
    brandName TEXT,
    industry TEXT,
    tone TEXT,
    aesthetic TEXT,
    description TEXT,
    tagline TEXT,
    overview_json TEXT,
    insights TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prompt TEXT,
    platform TEXT,
    result TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

module.exports = {
  saveIdentity: (data) => {
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO identities 
      (website, brandName, industry, tone, aesthetic, tagline, overview_json, insights) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(data.website, data.brandName, data.industry, data.tone, data.aesthetic, data.tagline, JSON.stringify(data.overview), data.insights);
  },
  saveHistory: (prompt, platform, result) => {
    const stmt = db.prepare('INSERT INTO history (prompt, platform, result) VALUES (?, ?, ?)');
    return stmt.run(prompt, platform, result);
  },
  getHistory: () => {
    return db.prepare('SELECT * FROM history ORDER BY timestamp DESC').all();
  },
  clearHistory: () => {
    return db.prepare('DELETE FROM history').run();
  }
};
