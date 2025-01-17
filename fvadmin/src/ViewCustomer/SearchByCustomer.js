import React, { useState } from 'react';
import './SearchByCustomer.css'; // Ensure you have a CSS file for styling

const SearchByCustomer = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [customerDetails, setCustomerDetails] = useState(null);
  const [error, setError] = useState('');

  // Sample customer data
  const customers = [
    {
      _id: '6718b3f82584bface82f16c4',
      username: 'user_23',
      fname: 'Pranav',
      lname: 'N T',
      aadharno: '5441723111211112',
      panno: 'hmfxgse',
      asset_doc: {
        file_name: '1729672184039-Screenshot 2023-10-09 210711.png',
        file_type: 'image/png',
      },
      email: 'pranav39nt@gmail.com',
      phone_number: '9976334386',
      password: 'Pranav',
      dob: '2024-10-11T00:00:00.000Z',
      confirm_password: 'Pranav',
      schemes_registered: [
        {
          scheme_id: '67177ad360c793b57d45d4a4',
          bid_status: ['won'],
          months_completed: 5,
          bids_made_count: 3,
          has_won_bid: true,
        },
        {
          scheme_id: '67177ad360c793b57d45d4a5',
          bid_status: ['pending'],
          months_completed: 2,
          bids_made_count: 1,
          has_won_bid: false,
        },
      ],
      __v: 1,
    },
  ];

  const handleSearch = () => {
    const customer = customers.find(
      (cust) => cust.phone_number === mobileNumber
    );

    if (customer) {
      setCustomerDetails(customer);
      setError('');
    } else {
      setCustomerDetails(null);
      setError('Customer does not exist');
    }
  };

  const handleClear = () => {
    setMobileNumber('');
    setCustomerDetails(null);
    setError('');
  };

  return (
    <div className="search-by-customer-container">
      <h3>Search by Customer</h3>
      <input
        type="text"
        placeholder="Enter customer mobile number..."
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
      />
      <div className="button-container">
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleClear}>Clear</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {customerDetails && (
        <div className="customer-details">
          <h4>CUSTOMER DETAILS</h4>
          <div className="customer-info">
            <div className="customer-row">
              <span className="customer-label">Username:</span>
              <span className="customer-value">{customerDetails.username}</span>
            </div>
            <div className="customer-row">
              <span className="customer-label">First Name:</span>
              <span className="customer-value">{customerDetails.fname}</span>
            </div>
            <div className="customer-row">
              <span className="customer-label">Last Name:</span>
              <span className="customer-value">{customerDetails.lname}</span>
            </div>
            <div className="customer-row">
              <span className="customer-label">Aadhar No:</span>
              <span className="customer-value">{customerDetails.aadharno}</span>
            </div>
            <div className="customer-row">
              <span className="customer-label">PAN No:</span>
              <span className="customer-value">{customerDetails.panno}</span>
            </div>
            <div className="customer-row">
              <span className="customer-label">Email:</span>
              <span className="customer-value">{customerDetails.email}</span>
            </div>
            <div className="customer-row">
              <span className="customer-label">Phone Number:</span>
              <span className="customer-value">{customerDetails.phone_number}</span>
            </div>
            <div className="customer-row">
              <span className="customer-label">Date of Birth:</span>
              <span className="customer-value">{new Date(customerDetails.dob).toLocaleDateString()}</span>
            </div>
            <div className="customer-row">
              <span className="customer-label">Age : </span>
            </div>
            <div className="customer-row">
              <span className="customer-label">Account Number : </span>
            </div>
            <div className="customer-row">
              <span className="customer-label">IFSC Code : </span>
            </div>
            <div className="customer-row">
              <span className="customer-label">Bank Account Name : </span>
            </div>
          </div>

          {customerDetails.schemes_registered.length > 0 && (
            <div className="schemes-registered">
              <h5 style={{ textAlign: 'center' }}>SCHEMES REGISTERED</h5>
              <div className="scheme-details-container">
                {customerDetails.schemes_registered.map((scheme, index) => (
                  <div key={index} className="scheme-detail">
                    <p><strong>Scheme Name:</strong> {scheme.scheme_id}</p>
                    <p><strong>Bid Status:</strong> {scheme.bid_status.join(', ')}</p>
                    <p><strong>Months Completed:</strong> {scheme.months_completed}</p>
                    <p><strong>Bids Made Count:</strong> {scheme.bids_made_count}</p>
                    <p><strong>Has Won Bid:</strong> {scheme.has_won_bid ? 'Yes' : 'No'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchByCustomer;
