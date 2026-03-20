const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const publicRoutes = require('./routes/publicRoutes');
require("dotenv").config();
const app = express();

// 1. CORS Configuration
// ADDED 'Authorization' to allowedHeaders so the token can be sent
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));

// 2. Helmet Configuration
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// 3. Body Parser Middleware
// FIX: Removed the duplicate app.use(express.json())
// Only keep this one with the limit
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

// Serve uploaded selfie images
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Routes
app.use('/api/public', publicRoutes);

// NEW: For dashboard verification (Fixed typo: publicRout -> publicRoutes)
app.use('/api/auth', publicRoutes);




// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'INTERNAL_ERROR' });
});

module.exports = app;