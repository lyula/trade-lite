const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Register a new user
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, gender, email, city, phone, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate OTP for registration verification
    const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();
    const code = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    const Otp = require('../models/Otp');
    await Otp.deleteMany({ email, type: 'registration' }); // Remove previous registration OTPs for this email
    await Otp.create({ email, code, type: 'registration', expiresAt });

    // Send OTP email for registration
    try {
      const { sendAccountEmail } = require('../utils/emailSender');
      await sendAccountEmail({
        to: email,
        subject: 'Your EquityVault Registration OTP',
        accountDetails: code,
        type: 'OTP',
      });
      console.log('Registration OTP email sent successfully to:', email);
    } catch (emailError) {
      console.error('Failed to send registration OTP email:', emailError.response?.data || emailError.message);
      // Don't fail registration if email fails
    }

    res.status(200).json({ message: "OTP sent to email for verification" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ token, user: { id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, referralCode: user.referralCode } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};