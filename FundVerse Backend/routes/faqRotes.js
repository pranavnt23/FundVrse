const express = require('express');
const router = express.Router();
const FAQ = require('../models/FAQ'); // Placeholder for FAQ model

// Get all FAQs
router.get('/faqs', async (req, res) => {
    try {
        const faqs = await FAQ.find({});
        res.json(faqs);
    } catch (error) {
        console.error('Error fetching FAQs:', error);
        res.status(500).json({ message: 'Error fetching FAQs' });
    }
});

module.exports = router;
