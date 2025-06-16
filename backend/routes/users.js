const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/users/register
router.post('/register', (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  const query = `INSERT INTO users (username) VALUES (?)`;

  db.run(query, [username], function (err) {
    if (err) {
      if (err.message.includes('UNIQUE')) {
        return res.status(409).json({ error: 'Username already exists' });
      }
      return res.status(500).json({ error: err.message });
    }

    return res.status(201).json({ id: this.lastID, username });
  });
});

module.exports = router;

