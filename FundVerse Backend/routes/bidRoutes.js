const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/bid', async (req, res) => {
    const { userId, schemeId, bidAmount } = req.body;

    try {
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let registeredScheme = user.schemes_registered.find(scheme => scheme.scheme_id === schemeId);

        if (!registeredScheme) {
            registeredScheme = {
                scheme_id: schemeId,
                bidded_amount: []
            };
            user.schemes_registered.push(registeredScheme);
        }

        registeredScheme.bidded_amount.push(bidAmount);

        await user.save();

        res.json({ message: 'Bid placed successfully', bidded_amount: registeredScheme.bidded_amount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
