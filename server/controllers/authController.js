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

    // Generate a unique referral code (no name chars, just random)
    const generateReferralCode = () => {
      return Math.random().toString(36).substring(2, 10).toUpperCase();
    };

    let referralCode;
    let codeExists = true;
    while (codeExists) {
      referralCode = generateReferralCode();
      codeExists = await User.findOne({ referralCode });
    }

    // Optionally, get referredBy from req.body if you want to support referral links
    let referredBy = null;
    if (req.body.referredBy) {
      // Find the user who owns the referral code
      const referrer = await User.findOne({ referralCode: req.body.referredBy });
      if (referrer) {
        referredBy = referrer.referralCode; // Store the code of the link owner
      }
    }

    // Create new user
    const user = new User({ firstName, lastName, gender, email, city, phone, password, referralCode, referredBy });
    await user.save();

    // Send welcome email using SMTP Express API
    try {
      const axios = require('axios');
      const SMTP_EXPRESS_API_URL = 'https://api.smtpexpress.com/send';
      const SMTP_EXPRESS_SECRET = process.env.SMTP_EXPRESS_SECRET;
      const SMTP_EXPRESS_SENDER = 'equityvault-770bbf@ensend.me';

      const payload = {
        subject: 'Welcome to EquityVault Securities!',
        message: `
          <div style="font-family: Arial, sans-serif; background: #f8f9fa; border-radius: 8px; max-width: 500px; margin: auto; padding: 0;">
            <div style="background: #fff; border-radius: 8px; padding: 32px 16px 24px 16px; text-align: center;">
              <img src="https://equityvaultsecurities.vercel.app/lite-logo.jpg" alt="EquityVault Logo" width="80" height="80" style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 18px; display: block; margin-left: auto; margin-right: auto; border: 0;" />
              <h2 style="color: #007bff; margin-bottom: 16px; font-size: 1.5em;">Welcome, ${firstName}!</h2>
              <p style="font-size: 16px; color: #333; margin-bottom: 24px; text-align: left;">
                Thank you for registering with <strong>EquityVault Securities</strong>.<br/>
                Your account has been created successfully.<br/>
                You can now log in and start using our platform.
              </p>
              <p style="font-size: 15px; color: #555; margin-bottom: 32px; text-align: left;">
                Best regards,<br/>
                <strong>EquityVault Securities Team</strong>
              </p>
            </div>
            <footer style="background: #fff; border-top: 1px solid #eee; padding: 18px 0 0 0; text-align: center; border-radius: 0 0 8px 8px; font-size: 13px; color: #888; margin-top: 0;">
              EquityVault Securities &copy; ${new Date().getFullYear()}
            </footer>
          </div>
        `,
        sender: {
          name: 'Equity Vault',
          email: SMTP_EXPRESS_SENDER,
        },
        recipients: { email },
      };

      await axios.post(SMTP_EXPRESS_API_URL, payload, {
        headers: {
          'Authorization': `Bearer ${SMTP_EXPRESS_SECRET}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Welcome email sent successfully to:', email);
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError.response?.data || emailError.message);
      // Don't fail registration if email fails
    }

    res.status(201).json({ message: "User registered successfully" });
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