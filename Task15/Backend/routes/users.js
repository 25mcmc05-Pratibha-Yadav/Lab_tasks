const express = require('express');
const router = express.Router();
const connectDB = require("../db") 

router.get('/get-user', async (req, res) => {
  try {

    const db = await connectDB() ; 

    const [rows] = await db.execute('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/create-user', async (req, res) => {
  const { name, email } = req.body;

  try {

    const db = await connectDB() ; 

    const [result] = await db.execute(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );

    res.json({
      id: result.insertId,
      name,
      email
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/update-user/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    
    const db = await connectDB();
    
    const [result] = await db.execute(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, id]
    );

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete('/delete-user/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const db = await connectDB();
    const [result] = await db.execute('DELETE FROM users WHERE id = ?', [id]);

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;