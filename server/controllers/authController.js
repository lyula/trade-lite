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