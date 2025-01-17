import React, { useState } from 'react';
import './RegisterScheme.css';

const RegisterDialog = ({ onClose, schemeId, username }) => {
  const [formData, setFormData] = useState({
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    username: username, // Pre-fill username
    password: ''
  });
  const [error, setError] = useState(null); // For displaying errors

  // Handle changes in form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    // Proceed with registration
    try {
      const response = await fetch('http://localhost:5000/api/register-scheme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, schemeId }) // Include schemeId in the request
      });

      if (response.ok) {
        alert('Registration successful!');
        onClose(); // Close the dialog on successful registration
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <div className="dialog-header">
          <h2 className="dialog-title">FILL OUT TO REGISTER</h2>
          <button className="close-x" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="accountNumber">Account Number</label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              placeholder="Enter your account number"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="ifscCode">IFSC Code</label>
            <input
              type="text"
              id="ifscCode"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              placeholder="Enter IFSC code"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="bankName">Bank Account Name</label>
            <input
              type="text"
              id="bankName"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              placeholder="Enter your bank account name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
             // readOnly // Make username read-only since it's pre-filled
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
          <div className="button-group">
            <button type="submit" className="submit-button">REGISTER NOW</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterDialog;
