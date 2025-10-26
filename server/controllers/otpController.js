const Otp = require('../models/Otp');
const nodemailer = require('nodemailer');

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
}

exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required.' });

  // Check if email already exists in User collection
  const User = require('../models/User');
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ error: 'Email is already registered.' });
  }

  const code = generateOtp();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await Otp.deleteMany({ email }); // Remove previous OTPs for this email
  await Otp.create({ email, code, expiresAt });

  // Send OTP email
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `Equity Vault <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Your EquityVault Registration OTP',
    html: `
      <div style="font-family: Arial, sans-serif; background: #f8f9fa; border-radius: 8px; max-width: 500px; margin: auto; padding: 0;">
        <div style="background: #fff; border-radius: 8px; padding: 32px 16px 24px 16px; text-align: center;">
          <img src="https://equityvaultsecurities.vercel.app/lite-logo.jpg" alt="EquityVault Logo" style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 18px; display: block; margin-left: auto; margin-right: auto;" />
          <h2 style="color: #007bff; margin-bottom: 16px; font-size: 1.5em;">Your Registration OTP</h2>
          <p style="font-size: 18px; color: #222; font-weight: bold; margin-bottom: 24px;">${code}</p>
          <p style="font-size: 15px; color: #555; margin-bottom: 32px; text-align: left;">
            Please enter this code to verify your email address.<br/>
            This OTP will expire in 10 minutes.
          </p>
        </div>
        <footer style="background: #fff; border-top: 1px solid #eee; padding: 18px 0 0 0; text-align: center; border-radius: 0 0 8px 8px; font-size: 13px; color: #888; margin-top: 0;">
          EquityVault Securities &copy; ${new Date().getFullYear()}
        </footer>
      </div>
    `,
  });

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
