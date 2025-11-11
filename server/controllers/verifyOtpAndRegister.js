// Verify OTP and create user after email confirmation
const User = require("../models/User");
const Otp = require("../models/Otp");

exports.verifyOtpAndRegister = async (req, res) => {
  try {
    const { firstName, lastName, gender, email, city, phone, password, referredBy, code } = req.body;
    // Check OTP
    const otpDoc = await Otp.findOne({ email, code, type: 'registration' });
    if (!otpDoc) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    if (otpDoc.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Generate referral code
    const generateReferralCode = () => Math.random().toString(36).substring(2, 10).toUpperCase();
    let referralCode;
    let codeExists = true;
    while (codeExists) {
      referralCode = generateReferralCode();
      codeExists = await User.findOne({ referralCode });
    }
    // Find referrer
    let refCode = null;
    if (referredBy) {
      const referrer = await User.findOne({ referralCode: referredBy });
      if (referrer) refCode = referrer.referralCode;
    }
    // Create user
    const user = new User({ firstName, lastName, gender, email, city, phone, password, referralCode, referredBy: refCode });
    await user.save();
    // Remove OTP after successful registration
    await Otp.deleteMany({ email, type: 'registration' });
    // Send welcome email
    try {
      const { sendAccountEmail } = require('../utils/emailSender');
      await sendAccountEmail({
        to: email,
        subject: 'Welcome to EquityVault Securities!',
        accountDetails: `Welcome, ${firstName}!\n\nThank you for registering with EquityVault Securities.\nYour account has been created successfully.\nYou can now log in and start using our platform.`,
        type: 'Welcome',
      });
      console.log('Welcome email sent successfully to:', email);
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError.response?.data || emailError.message);
    }
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
