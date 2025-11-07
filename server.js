// server.js
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);
console.log("MONGO_URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Mongo DB error:", err));

const stockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    unique: true,
    match: /^[A-Z]{1,5}$/,
  },
});

const Stock = mongoose.model('Stock', stockSchema);

app.post('/add', async (req, res) => {
  try {
    const { symbol } = req.body;
    if (!/^[A-Z]{1,5}$/.test(symbol)) return res.status(400).json({ error: 'Invalid format' });
    const stock = new Stock({ symbol });
    await stock.save();
    res.json({ message: 'Added', stock });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/list', async (req, res) => {
  const list = await Stock.find();
  res.json(list);
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => 
console.log("✅ Server running on port", PORT)
);