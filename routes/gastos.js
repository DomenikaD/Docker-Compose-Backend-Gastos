const express = require('express');
const router = express.Router();
const db = require('../base-datos/db');

// GET all gastos
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM gastos ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('GET Error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST a new gasto
router.post('/', async (req, res) => {
  const { item, amount, category, expense_date } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO gastos (item, amount, category, expense_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [item, amount, category, expense_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('POST Error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
