const mongoose = require('mongoose');
const { updateRate } = require('./controllers/conversionController');
require('dotenv').config();
const connectDB = require('./config/db');

async function runCron() {
  await connectDB();
  await updateRate();
  mongoose.connection.close();
}

runCron();
