const Otp = require('../models/Otp');
const nodemailer = require('nodemailer');

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
}

exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required.' });

  // Rate limit: max 5 OTPs per 10 minutes per IP
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const OtpRequest = require('../models/OtpRequest');
  const now = Date.now();
  const tenMinsAgo = now - 10 * 60 * 1000;
  const recentRequests = await OtpRequest.countDocuments({ ip, createdAt: { $gte: tenMinsAgo } });
  if (recentRequests >= 5) {
    return res.status(429).json({ error: 'Too many OTP requests from this device. Please wait 10 minutes.' });
  }
  await OtpRequest.create({ ip, createdAt: now });

  // Check if email already exists in User collection
  const User = require('../models/User');
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ error: 'Email is already registered.' });
  }

  const code = generateOtp();
  const expiresAt = new Date(now + 10 * 60 * 1000); // 10 minutes

  await Otp.deleteMany({ email }); // Remove previous OTPs for this email
  await Otp.create({ email, code, expiresAt });

  // Send OTP email using SMTP Express
  try {
    const { sendAccountEmail } = require('../utils/emailSender');
    await sendAccountEmail({
      to: email,
      subject: 'Your EquityVault Registration OTP',
      accountDetails: code,
      type: 'OTP',
    });
    console.log('OTP email sent successfully to:', email);
  } catch (error) {
    console.error('Failed to send OTP email:', error.message);
    return res.status(500).json({ error: 'Failed to send OTP email. Please try again.' });
  }

  res.json({ success: true });
};

exports.verifyOtp = async (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ error: 'Email and OTP are required.' });

  const otp = await Otp.findOne({ email, code });
  if (!otp) return res.status(400).json({ error: 'Invalid OTP.' });
  if (otp.expiresAt < new Date()) return res.status(400).json({ error: 'OTP expired.' });

  await Otp.deleteMany({ email }); // Remove OTP after successful verification
  res.json({ success: true });
};
