const express = require("express");
const { register, login } = require("../controllers/authController");
const jwt = require("jsonwebtoken"); // Import jwt for token validation

const router = express.Router();

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

// Validate Token route
router.post("/validate-token", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;