import React, { useEffect, useState } from 'react';
import './DeleteScheme.css'; // Ensure this path is correct

const DeleteScheme = () => {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    // Fetch all schemes from the server
    const fetchSchemes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/schemes');
        const data = await response.json();
        setSchemes(data);
      } catch (error) {
        console.error('Error fetching schemes:', error);
      }
    };

    fetchSchemes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/schemes/${id}`, {
        method: 'DELETE',
      });
      setSchemes(schemes.filter((scheme) => scheme._id !== id)); // Remove deleted scheme from state
    } catch (error) {
      console.error('Error deleting scheme:', error);
    }
  };

  return (
    <div className="schemes-container">
      {schemes.map((scheme) => (
        <div key={scheme._id} className="scheme-card">
          <h3>{scheme.name}</h3>
          <p>{scheme.description}</p>
          <h4>Target Audience: {scheme.target_audience}</h4>
          <h4>Investment Plan:</h4>
          <ul>
            <li>Monthly Contribution: ₹{scheme.investment_plan.monthly_contribution}</li>
            <li>Chit Period: {scheme.investment_plan.chit_period} months</li>
            <li>Total Fund Value: {scheme.investment_plan.total_fund_value.map(v => `₹${v.value} for ${v.duration} months`).join(', ')}</li>
          </ul>
          <h4>Benefits:</h4>
          <ul>
            {scheme.benefits.map((benefit, i) => (
              <li key={i}>{benefit}</li>
            ))}
          </ul>
          <button onClick={() => handleDelete(scheme._id)} className="delete-btn">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default DeleteScheme;
