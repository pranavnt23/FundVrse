const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection with updated options
mongoose.connect('mongodb://localhost:27017/FundVerse', {
  useNewUrlParser: true, // No effect in newer versions but doesn't cause errors
  useUnifiedTopology: true, // Same here, no longer needed, but we keep it for safety
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err.message);
});

// Scheme Schema definition
const schemeSchema = new mongoose.Schema({
  name: String,
  description: String,
  target_audience: String,
  investment_plan: {
    monthly_contribution: Number,
    chit_period: Number,
    total_fund_value: [
      {
        duration: Number,
        value: Number,
      },
    ],
  },
  benefits: [String],
  icon: String,
  number_of_slots: Number,
});
app.get('/api/customers/:schemeName', async (req, res) => {
  try {
    const { schemeName } = req.params;
    const customers = await Customer.find({
      'schemes_registered.scheme_id': schemeName
    });
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
app.get('/api/customers-by-scheme/:schemeName', async (req, res) => {
  try {
    const { schemeName } = req.params;

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
// Scheme Model
const Scheme = mongoose.model('Scheme', schemeSchema);

// Customer Schema definition
const customerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  aadharno: {
    type: String,
    required: true,
    unique: true,
  },
  panno: {
    type: String,
    required: true,
    unique: true,
  },
  asset_doc: {
    file_name: {
      type: String,
      required: true,
    },
    file_type: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone_number: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  confirm_password: {
    type: String,
    required: true,
  },
  schemes_registered: [
    {
      scheme_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      bid_status: {
        type: [String],
        required: true,
      },
      months_completed: {
        type: Number,
        required: true,
      },
      bids_made_count: {
        type: Number,
        required: true,
      },
      has_won_bid: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

// Customer Model
const Customer = mongoose.model('Customer', customerSchema);

// Fetch all schemes
app.get('/api/schemes', async (req, res) => {
  try {
    const schemes = await Scheme.find();
    res.status(200).json(schemes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add Scheme endpoint
app.post('/api/schemes', async (req, res) => {
  try {
    const {
      name,
      description,
      target_audience,
      investment_plan,
      benefits,
      icon,
      number_of_slots,
    } = req.body;

    // Create a new scheme instance based on the request data
    const newScheme = new Scheme({
      name,
      description,
      target_audience,
      investment_plan,
      benefits,
      icon,
      number_of_slots,
    });

    // Save the scheme to the database
    const savedScheme = await newScheme.save();
    res.status(201).json(savedScheme); // Return the newly created scheme
  } catch (error) {
    console.error('Error adding scheme:', error);
    res.status(500).json({ message: 'Failed to add scheme' });
  }
});

// Delete a scheme by ID
app.delete('/api/schemes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedScheme = await Scheme.findByIdAndDelete(id);

    if (!deletedScheme) {
      return res.status(404).json({ message: 'Scheme not found' });
    }

    res.status(200).json({ message: 'Scheme deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to search customer by phone number
app.get('/api/customers/:phoneNumber', async (req, res) => {
  try {
    const { phoneNumber } = req.params;

    if (!phoneNumber) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    // Find the customer in the database by phone number
    const customer = await Customer.findOne({ phone_number: phoneNumber });

    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
