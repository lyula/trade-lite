const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const WalletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String, required: true },
  referralCode: { type: String },
  balance: { type: Number, default: 0 },
  currency: { type: String, required: true },
  password: { type: String, required: true },
  walletId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

WalletSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Wallet', WalletSchema);
