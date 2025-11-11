const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  code: { type: String, required: true },
  type: { type: String, required: true }, // e.g. 'password_reset'
  expiresAt: { type: Date, required: true }
});

module.exports = mongoose.model('Otp', OtpSchema);
