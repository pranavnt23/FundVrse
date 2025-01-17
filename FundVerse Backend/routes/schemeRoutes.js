const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Scheme = require('../models/Scheme');

router.post('/api/register-scheme', async (req, res) => {
    const { username, schemeId } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const scheme = await Scheme.findById(schemeId);
        if (!scheme || scheme.number_of_slots === 0) {
            return res.status(400).json({ message: 'Scheme unavailable or full' });
        }

        const isAlreadyRegistered = user.schemes_registered.some(s => s.scheme_id.toString() === schemeId);
        if (isAlreadyRegistered) {
            return res.status(400).json({ message: 'User already registered for the scheme' });
        }

        user.schemes_registered.push({
            scheme_id: schemeId,
            bid_status: false,
            months_completed: 0,
            bids_made_count: 0,
            has_won_bid: false
        });

        scheme.number_of_slots -= 1;

        await user.save();
        await scheme.save();

        res.json({ message: 'Scheme registration successful' });
    } catch (error) {
        console.error('Error registering for scheme:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
