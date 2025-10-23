const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user');
const authRoutes = require("./routes/auth");
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: [
    "https://tradelite.vercel.app",
    "http://localhost:8080"
  ],
  credentials: true
}));
app.use(express.json());

// User routes
app.use('/api/users', userRoutes);

// Use auth routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
