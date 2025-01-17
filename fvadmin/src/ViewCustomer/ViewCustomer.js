import React, { useState } from 'react';
import './ViewCustomer.css';
import SearchByCustomer from './SearchByCustomer'; // Adjust the import path as necessary
import SearchByScheme from './SearchBySchemes';

const ViewCustomer = () => {
  const [view, setView] = useState(null); // Initialize with null, 'customer', or 'scheme'

  return (
    <div className="view-customer-container">
      <div className="search-options">
        <button onClick={() => setView('customer')} className={view === 'customer' ? 'active' : ''}>
          Search by Customer
        </button>
        <button onClick={() => setView('scheme')} className={view === 'scheme' ? 'active' : ''}>
          Search by Scheme
        </button>
      </div>

      {view === 'customer' && (
        <div className="search-form">
          <SearchByCustomer /> {/* Render the SearchByCustomer component */}
        </div>
      )}

      {view === 'scheme' && (
        <div className="search-form">
          <SearchByScheme />
        </div>
      )}
    </div>
  );
};

export default ViewCustomer;
