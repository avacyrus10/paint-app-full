const express = require('express');
const router = express.Router();
const db = require('../db');


router.post('/', (req, res) => {
  const { username, title, shapes } = req.body;

  if (!username || !shapes) {
    return res.status(400).json({ error: 'username and shapes are required' });
  }

  const shapesJson = JSON.stringify(shapes);

  db.get(`SELECT id FROM users WHERE username = ?`, [username], (err, user) => {
    if (err || !user) {
      return res.status(404).json({ error: 'User not found' });
    }


    db.run(`DELETE FROM paintings WHERE user_id = ?`, [user.id], (err) => {
      if (err) return res.status(500).json({ error: err.message });

      db.run(
        `INSERT INTO paintings (user_id, title, shapes) VALUES (?, ?, ?)`,
        [user.id, title, shapesJson],
        function (err) {
          if (err) return res.status(500).json({ error: err.message });

          return res.status(201).json({ id: this.lastID, title, shapes });
        }
      );
    });
  });
});


router.get('/:username', (req, res) => {
  const username = req.params.username;

  db.get(`SELECT id FROM users WHERE username = ?`, [username], (err, user) => {
    if (err || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    db.get(
      `SELECT title, shapes FROM paintings WHERE user_id = ?`,
      [user.id],
      (err, painting) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!painting) return res.status(404).json({ error: 'No painting found' });

        return res.json({
          title: painting.title,
          shapes: JSON.parse(painting.shapes)
        });
      }
    );
  });
});

module.exports = router;

