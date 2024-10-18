const express = require('express');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');  
const User = require('../models/users');
const router = express.Router();

// User Signup
router.post('/signup', [
    check('username').notEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Email is invalid'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ], async (req, res) => {
    
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json({
        message: 'User created successfully',
        user_id: newUser._id
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

// User Login
router.post('/login', [
    check('email').isEmail().withMessage('Email is invalid'),
    check('password').notEmpty().withMessage('Password is required')
  ], async (req, res) => {
    
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password' });
      }
  
      res.status(200).json({ message: 'Login successful' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
