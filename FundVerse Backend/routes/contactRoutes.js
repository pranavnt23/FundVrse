const express = require('express');
const router = express.Router();

router.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        // Save contact information (extend with a Contact model as needed)
        res.status(200).json({ message: 'Contact form submitted successfully!' });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ message: 'Error submitting contact form' });
    }
});

module.exports = router;
