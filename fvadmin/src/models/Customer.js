// models/Customer.js
const mongoose = require('mongoose');

const SchemeSchema = new mongoose.Schema({
  scheme_id: { type: String, required: true },
  has_won_bid: { type: Boolean, required: true },
  won_bid_month: { type: String },
});

const CustomerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  phone_number: { type: String, required: true },
  email: { type: String, required: true },
  aadharno: { type: String, required: true },
  panno: { type: String, required: true },
  acc_num: { type: String, required: true },
  ifsc_code: { type: String, required: true },
  bank_account_name: { type: String, required: true },
  schemes_registered: [SchemeSchema],
});

// Use the mongoose.models object to avoid redefinition
const Customer = mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
