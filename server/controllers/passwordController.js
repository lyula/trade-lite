const User = require('../models/User');
const Otp = require('../models/Otp');
const { sendOtpEmail } = require('../utils/emailSender');

// Request password reset: send OTP
exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ success: false, error: 'User not found' });
  // Generate OTP
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  await Otp.create({ userId: user._id, code: otpCode, type: 'password_reset', expiresAt: Date.now() + 10 * 60 * 1000 });
  await sendOtpEmail(email, otpCode);
  return res.json({ success: true });
};

// Verify OTP and reset password
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ success: false, error: 'User not found' });
  const otpDoc = await Otp.findOne({ userId: user._id, code: otp, type: 'password_reset', expiresAt: { $gt: Date.now() } });
  if (!otpDoc) return res.status(400).json({ success: false, error: 'Invalid or expired OTP' });
  user.password = newPassword; // hash in real code
  await user.save();
  await Otp.deleteMany({ userId: user._id, type: 'password_reset' });
  return res.json({ success: true });
};
