const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const User = require('../models/User');

const router = express.Router();

// Multer setup for file upload
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

// User Registration Route
router.post('/register', upload.single('asset_doc'), async (req, res) => {
  try {
    // Hash the user's password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      username: req.body.username,
      fname: req.body.fname,
      lname: req.body.lname,
      aadharno: req.body.aadharno,
      panno: req.body.panno,
      asset_doc: {
        file_name: req.file.filename,
        file_type: req.file.mimetype,
      },
      email: req.body.email,
      phone_number: req.body.phone_number,
      password: hashedPassword,
      dob: req.body.dob,
      age: req.body.age,
      confirm_password: req.body.confirm_password,
      schemes_registered: []
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ error: error.message });
  }
});

// User Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }

    // Compare the hashed password with the input password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid username or password');
    }

    req.session.userId = user._id;
    res.json({ message: 'User logged in successfully', isLoggedIn: true });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
