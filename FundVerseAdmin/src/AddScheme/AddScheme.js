import React, { useState } from 'react';
import './AddScheme.css'; // Link to the CSS file if needed

const AddScheme = () => {
  // State to hold form input values
  const [schemeDetails, setSchemeDetails] = useState({
    schemeName: '',
    description: '',
    targetAudience: '',
    monthlyContribution: '',
    chitPeriod: '',
    totalSlots: '',
    startDate: '',
    startTime: '',
    totalFundAmount: ''
  });

  const [showLogin, setShowLogin] = useState(false); // State to manage login dialog visibility
  const [adminCredentials, setAdminCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchemeDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAdminChange = (e) => {
    const { name, value } = e.target;
    setAdminCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLogin(true); // Show login dialog when the form is submitted
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const correctUsername = "Mohanapriya";
    const correctPassword = "priya@aviation";

    if (adminCredentials.username === correctUsername && adminCredentials.password === correctPassword) {
      // Prepare the scheme data for submission
      const schemeData = {
        name: schemeDetails.schemeName,
        description: schemeDetails.description,
        target_audience: schemeDetails.targetAudience,
        investment_plan: {
          monthly_contribution: Number(schemeDetails.monthlyContribution),
          chit_period: Number(schemeDetails.chitPeriod),
          total_fund_value: [
            {
              duration: Number(schemeDetails.chitPeriod),
              value: Number(schemeDetails.totalFundAmount)
            }
          ]
        },
        benefits: [
          "Redeemable in gold bars or coins, or in cash based on market rates.",
          "Option for early withdrawal or purchase from partnered jewelers at discounted rates."
        ],
        icon: "Coins", // Update this if you have a different icon logic
        number_of_slots: Number(schemeDetails.totalSlots)
      };

      try {
        // Send the scheme data to the backend API
        const response = await fetch('http://localhost:5000/api/schemes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(schemeData),
        });

        if (response.ok) {
          const addedScheme = await response.json();
          console.log('Scheme added successfully:', addedScheme);
          setShowLogin(false); // Close login dialog after successful login
          // Reset the form
          setSchemeDetails({
            schemeName: '',
            description: '',
            targetAudience: '',
            monthlyContribution: '',
            chitPeriod: '',
            totalSlots: '',
            startDate: '',
            startTime: '',
            totalFundAmount: ''
          });
          setAdminCredentials({ username: '', password: '' });
        } else {
          throw new Error('Failed to add scheme');
        }
      } catch (error) {
        console.error('Error adding scheme:', error);
        alert('There was an error adding the scheme. Please try again.');
      }
    } else {
      alert('Invalid username or password!'); // Show error if credentials are incorrect
    }
  };

  return (
    <div className="add-scheme-container">
      <h2>Fill the Form to Add Schemes</h2>
      <form onSubmit={handleSubmit} className="add-scheme-form">
        {/* Scheme Name */}
        <label htmlFor="schemeName">Scheme Name:</label>
        <input
          type="text"
          id="schemeName"
          name="schemeName"
          value={schemeDetails.schemeName}
          onChange={handleChange}
          placeholder="Enter scheme name"
          required
        />

        {/* Scheme Description */}
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={schemeDetails.description}
          onChange={handleChange}
          placeholder="Description of the scheme"
        />

        {/* Target Audience */}
        <label htmlFor="targetAudience">Target Audience:</label>
        <input
          type="text"
          id="targetAudience"
          name="targetAudience"
          value={schemeDetails.targetAudience}
          onChange={handleChange}
          placeholder="Individuals seeking stable, long-term savings in gold"
        />

        {/* Monthly Contribution */}
        <label htmlFor="monthlyContribution">Monthly Contribution (₹):</label>
        <input
          type="number"
          id="monthlyContribution"
          name="monthlyContribution"
          value={schemeDetails.monthlyContribution}
          onChange={handleChange}
          placeholder="Enter monthly contribution"
          required
        />

        {/* Chit Period */}
        <label htmlFor="chitPeriod">Chit Period (months):</label>
        <input
          type="number"
          id="chitPeriod"
          name="chitPeriod"
          value={schemeDetails.chitPeriod}
          onChange={handleChange}
          placeholder="Enter chit period in months"
          required
        />

        {/* Total Slots */}
        <label htmlFor="totalSlots">Total Slots:</label>
        <input
          type="number"
          id="totalSlots"
          name="totalSlots"
          value={schemeDetails.totalSlots}
          onChange={handleChange}
          placeholder="Enter total number of slots"
          required
        />

        {/* Total Fund Amount */}
        <label htmlFor="totalFundAmount">Total Fund Amount (₹):</label>
        <input
          type="number"
          id="totalFundAmount"
          name="totalFundAmount"
          value={schemeDetails.totalFundAmount}
          onChange={handleChange}
          placeholder="Enter total fund amount"
          required
        />

        {/* Start Date */}
        <label htmlFor="startDate">Starting Date of Bidding:</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={schemeDetails.startDate}
          onChange={handleChange}
        />

        {/* Start Time */}
        <label htmlFor="startTime">Starting Time of Bidding:</label>
        <input
          type="time"
          id="startTime"
          name="startTime"
          value={schemeDetails.startTime}
          onChange={handleChange}
        />

        {/* Submit Button */}
        <button type="submit">Add Scheme</button>
      </form>

      {/* Login Dialog */}
      {showLogin && (
        <div className="login-dialog-overlay">
          <div className="login-dialog">
            <h3>Admin Login</h3>
            <form onSubmit={handleLoginSubmit}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={adminCredentials.username}
                onChange={handleAdminChange}
                required
              />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={adminCredentials.password}
                onChange={handleAdminChange}
                required
              />
              <button type="submit">Login to Add Scheme</button>
            </form>
            <button onClick={() => setShowLogin(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddScheme;
