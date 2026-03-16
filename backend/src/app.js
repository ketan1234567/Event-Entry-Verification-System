const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const publicRoutes = require('./routes/publicRoutes');

const app = express();

// 1. CORS Configuration
app.use(cors({
  origin: '*', // Allow all origins for development
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// 2. Helmet Configuration (FIX: Allow Cross-Origin Resources)
// This prevents the browser from blocking the error response JSON
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Increase request size limit for selfie uploads
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

// Serve uploaded selfie images
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Routes
app.use('/api/public', publicRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'INTERNAL_ERROR' });
});
const bcrypt = require('bcryptjs');
const password = 'admin123';

// bcrypt.hash(password, 10, (err, hash) => {
//     if (err) throw err;
//     console.log('--------------------------------');
//     console.log('Copy this SQL query and run it in your Database:');
//     console.log(`UPDATE admin SET password = '${hash}' WHERE email = 'admin@ondirect.com';`);
//     console.log('--------------------------------');
// });
module.exports = app;