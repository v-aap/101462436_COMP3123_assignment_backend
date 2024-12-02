const express = require("express");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/users");

const router = express.Router();
const SECRET_KEY = "valeria_secret_key"; // Replace with a secure, environment-based key

// Middleware for validation
const validateSignup = [
  check("username").notEmpty().withMessage("Username is required"),
  check("email").isEmail().withMessage("Email is invalid"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const validateLogin = [
  check("email").isEmail().withMessage("Email is invalid"),
  check("password").notEmpty().withMessage("Password is required"),
];

// User Signup
router.post("/signup", validateSignup, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Save the user (plaintext password)
    const newUser = new User({ username, email, password });
    await newUser.save();

    // Generate a token
    const token = jwt.sign({ user_id: newUser._id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.status(201).json({
      message: "Signup successful",
      token,
      username: newUser.username,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// User Login
router.post("/login", validateLogin, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a token
    const token = jwt.sign({ user_id: user._id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      username: user.username,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
