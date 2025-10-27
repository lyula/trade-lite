
// API used for conversion rate:
// https://api.exchangerate.host/latest?base=USD&symbols=KES

const mongoose = require('mongoose');
const { updateRate } = require('./controllers/conversionController');
require('dotenv').config();
const connectDB = require('./config/db');
const cron = require('node-cron');

async function updateAndKeepAlive() {
  await connectDB();
  // Run immediately on startup
  await updateRate();
  // Schedule to run every hour
  cron.schedule('0 * * * *', async () => {
    await updateRate();
  });
}

updateAndKeepAlive();
