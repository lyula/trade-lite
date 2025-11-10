const mongoose = require('mongoose');

const OtpRequestSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  createdAt: { type: Number, required: true },
});

module.exports = mongoose.model('OtpRequest', OtpRequestSchema);