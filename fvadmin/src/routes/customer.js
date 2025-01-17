// routes/customers.js
const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer'); // Adjust the path based on your project structure

// Route to search customers by scheme name
router.get('/api/customers-by-scheme/:schemeName', async (req, res) => {
  try {
    const { schemeName } = req.params;

    // Query the database to find customers registered in the specified scheme
    const customers = await Customer.find({
      'schemes_registered.scheme_id': schemeName,
    });

    if (customers.length > 0) {
      res.json(customers);
    } else {
      res.status(404).json({ message: 'No customers found for the specified scheme.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
