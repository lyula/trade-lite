const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  email: { type: String, required: false },
  code: { type: String, required: true },
  type: { type: String, required: true }, // e.g. 'password_reset', 'registration'
  expiresAt: { type: Date, required: true }
});

module.exports = mongoose.model('Otp', OtpSchema);
