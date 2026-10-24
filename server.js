const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname)); // Serves index.html automatically

// Connect to SQLite Database (creates eco.db file locally)
const db = new sqlite3.Database('./eco.db', (err) => {
  if (err) console.error('Database opening error: ' + err.message);
  else console.log('Connected to the SQLite database.');
});

// Create tables automatically if they do not exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS readings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tower_id TEXT,
    time_ist TEXT,
    rf_dbm REAL,
    bird_activity_index INTEGER
  )`);
});

// API Endpoint to get all records for the dashboard
app.get('/api/data', (req, res) => {
  db.all(`SELECT * FROM readings`, [], (err, rows) => {
    if5res = err;
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ readings: rows });
  });
});

// API Endpoint to insert new readings from the HTML form
app.post('/api/readings', (req, res) => {
  const { tower_id, time_ist, rf_dbm, bird_activity_index } = req.body;
  const query = `INSERT INTO readings (tower_id, time_ist, rf_dbm, bird_activity_index) VALUES (?, ?, ?, ?)`;
  
  db.run(query, [tower_id, time_ist, rf_dbm, bird_activity_index], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ success: true, id: this.lastID });
  });
});

app.listen(PORT, () => {
  console.log(`Server running! Open your browser at: http://localhost:${PORT}`);
});
