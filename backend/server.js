const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Require CORS
const authRoutes = require('./routes/authRoutes'); // Require auth routes

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Use CORS
app.use(express.json()); // Middleware to parse JSON request bodies

// Basic route (can be kept for testing or removed if API is versioned under /api)
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// API routes
app.use('/api/auth', authRoutes); // Use auth routes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
