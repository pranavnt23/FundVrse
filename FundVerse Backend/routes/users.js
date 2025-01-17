const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming the User model is saved in a 'models' directory

// Route to register a new user
router.post('/register', async (req, res) => {
  const { username, fname, lname, aadharno, panno, asset_doc, email, phone_number, password, confirm_password, dob } = req.body;

  // Ensure password and confirm_password match
  if (password !== confirm_password) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Create a new user instance with the provided data
    const newUser = new User({
      username,
      fname,
      lname,
      aadharno,
      panno,
      asset_doc,
      email,
      phone_number,
      password,
      confirm_password,
      dob
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;