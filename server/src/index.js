const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT NOW() AS currentTime');

    res.json({
      message: 'Backend is running 🚀',
      databaseTime: rows[0].currentTime,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Database connection failed',
    });
  }
});

app.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
      [firstName, lastName, email, hashedPassword]
    );

    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.first_name,
      },
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(2000, () => {
  console.log('Server running on port 2000');
});