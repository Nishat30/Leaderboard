require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors'); // 👈 import CORS

const app = require('./src/app');
const connectDB = require('./src/config/db');
const User = require('./src/models/User');

const PORT = process.env.PORT || 5000;

// 👇 Enable CORS only for localhost:3000 (frontend dev)
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
}));

// Connect to database
connectDB();

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
