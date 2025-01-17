const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer');
const cors = require('cors');

// Initialize app
const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: 'fundverse-secret-key',
    resave: false,
    saveUninitialized: true,
}));

// Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/fundverse', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Import route files
const authRoutes = require('..//routes/authRoutes'); 
const bidRoutes = require('../routes/bidRoutes');
const userRoutes = require('../routes/userRoutes');
const schemeRoutes = require('../routes/schemeRoutes');
const contactRoutes = require('../routes/contactRoutes'); 
const faqRoutes = require('../routes/faqRoutes');         

// Use routes
app.use(authRoutes);
app.use(bidRoutes);
app.use(userRoutes);
app.use(schemeRoutes);
app.use(contactRoutes); // Contact route
app.use(faqRoutes);     // FAQ route

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to FundVerse API!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});