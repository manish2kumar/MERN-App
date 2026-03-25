require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const aiRoutes = require('./routes/ai');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  // origin: [
  //   'http://localhost:5173',
  //   'http://127.0.0.1:5173',
  //   'http://localhost:5174',
  //   'http://127.0.0.1:5174'
  // ],
  origin: true,
  methods: ['GET', 'POST'],
}));
app.use(express.json());

// Routes
app.use('/api', aiRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'AI Flow Backend is running!' });
});

// Connect to MongoDB then start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
