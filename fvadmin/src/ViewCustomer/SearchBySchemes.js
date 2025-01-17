import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import './SearchBySchemes.css';

const SearchByScheme = () => {
  const [schemeName, setSchemeName] = useState('');
  const [customerDetails, setCustomerDetails] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError(''); // Reset error before new search
    try {
      const response = await axios.get(`/api/customers/${schemeName}`);
      if (response.data.length > 0) {
        setCustomerDetails(response.data);
      } else {
        setCustomerDetails([]);
        setError('No customers found for the specified scheme. Try another one!');
      }
    } catch (error) {
      console.error(error);
      setError('Error fetching customer data. Please try again.');
    }
    setLoading(false);
  };

  const handleClear = () => {
    setSchemeName('');
    setCustomerDetails([]);
    setError('');
  };

  return (
    <div className="search-by-scheme-container">
      <h3>Search by Scheme</h3>
      <input
        type="text"
        placeholder="Enter scheme name..."
        value={schemeName}
        onChange={(e) => setSchemeName(e.target.value)}
        aria-label="Scheme Name"
      />
      <div className="button-container">
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleClear} disabled={!schemeName}>Clear</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {customerDetails.length > 0 && (
        <div className="table-responsive">
          <table className="customer-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone No</th>
                <th>Email ID</th>
                <th>Aadhar No</th>
                <th>PAN No</th>
                <th>Acc. No</th>
                <th>IFSC Code</th>
                <th>Bank Account Name</th>
                <th>Won Bid</th>
                <th>Won Bid Month</th>
              </tr>
            </thead>
            <tbody>
              {customerDetails.map((customer, index) => {
                const wonBidInfo = customer.schemes_registered.find(scheme => scheme.scheme_id === schemeName);
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{customer.username}</td>
                    <td>{customer.fname}</td>
                    <td>{customer.lname}</td>
                    <td>{customer.phone_number}</td>
                    <td>{customer.email}</td>
                    <td>{customer.aadharno}</td>
                    <td>{customer.panno}</td>
                    <td>{customer.acc_num}</td>
                    <td>{customer.ifsc_code}</td>
                    <td>{customer.bank_account_name}</td>
                    <td>{wonBidInfo ? (wonBidInfo.has_won_bid ? 'Yes' : 'No') : 'No'}</td>
                    <td>{wonBidInfo && wonBidInfo.has_won_bid ? wonBidInfo.won_bid_month : 'N/A'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchByScheme;
