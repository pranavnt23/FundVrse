const User = require('../models/user');  // Import user model
const Scheme = require('../models/scheme');  // Import scheme model

// Function to handle bidding
exports.placeBid = async (req, res) => {
  try {
    const { username, scheme_id, month, bid_amount } = req.body;

  // Fetch the user from the database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the scheme user is registered for
    const scheme = user.schemes_registered.find(s => s.scheme_id === scheme_id);

    if (!scheme) {
      return res.status(404).json({ message: 'User not registered for this scheme' });
    }

    // Check if the user has already won a bid in this scheme
    if (scheme.has_won_bid) {
      return res.status(400).json({ message: 'User has already won a bid and cannot bid again.' });
    }

    // Check if the bid is being placed for a valid month
    const bidStatus = scheme.bid_status.find(b => b.month === month);
    if (!bidStatus || bidStatus.bid_made) {
      return res.status(400).json({ message: 'Bid for this month is already made or invalid month.' });
    }

    // Process the bid (assuming some bid processing logic exists)
    // For simplicity, we'll just mark the bid as placed here
    bidStatus.bid_made = true;
    scheme.bids_made_count += 1;

    // Assuming some logic that checks if the user won the bid
    const userWon = checkIfUserWon(bid_amount);  // Hypothetical function

    if (userWon) {
      scheme.has_won_bid = true;  // Mark user as having won the bid
    }

    await user.save();  // Save the updated user data

    res.status(200).json({ message: 'Bid placed successfully!', has_won_bid: userWon });
  } catch (error) {
    console.error('Error placing bid:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Hypothetical bid winning logic function
function checkIfUserWon(bid_amount) {
  // Placeholder for actual logic
  return bid_amount > 10000;  // Example: if bid is higher than 10,000, the user wins the bid
}
