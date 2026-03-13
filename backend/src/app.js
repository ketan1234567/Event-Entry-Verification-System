const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');               // <-- add this
const publicRoutes = require('./routes/publicRoutes');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());

// Serve uploaded files (selfies)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/api/public', publicRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'INTERNAL_ERROR' });
});

module.exports = app;