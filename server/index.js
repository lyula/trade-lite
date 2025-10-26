const express = require('express');
// ...existing code...
const cors = require('cors');
const userRoutes = require('./routes/user');
const authRoutes = require("./routes/auth");
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
// Serve static files (logo)
app.use('/public', express.static('public'));
const corsOptions = {
  origin: [
  "https://equityvaultsecurities.vercel.app",
    "http://localhost:8080"
  ],
  credentials: true
};
app.use(cors(corsOptions));
// Handle preflight requests for all routes (Express 5 compatible)
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    cors(corsOptions)(req, res, next);
  } else {
    next();
  }
});

app.use(express.json());

// OTP routes
const otpRoutes = require('./routes/otp');
app.use('/api/otp', otpRoutes);


// User routes
app.use('/api/users', userRoutes);

// Use auth routes
app.use("/api/auth", authRoutes);

// Admin routes
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);


// Live account routes
const liveAccountRoutes = require('./routes/liveAccount');

// Wallet routes
const walletRoutes = require('./routes/wallet');
app.use('/api/wallets', walletRoutes);


// Activity routes
const activityRoutes = require('./routes/activity');
app.use('/api/activity', activityRoutes);

app.use('/api/live-accounts', liveAccountRoutes);

// Demo account routes
const demoAccountRoutes = require('./routes/demoAccount');
app.use('/api/demo-accounts', demoAccountRoutes);


// Conversion rate route
const conversionRoutes = require('./routes/conversion');
app.use('/api/conversion', conversionRoutes);

// Contact form route
const contactRoutes = require('./routes/contact');
app.use('/api/contact', contactRoutes);

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    cors(corsOptions)(req, res, next);
  } else {
    next();
  }
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
