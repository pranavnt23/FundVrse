import React, { useEffect, useState } from 'react'; 
import { Coins, Diamond, Scale, Crown, GraduationCap, Plane, Heart, Smartphone, Stethoscope } from 'lucide-react';
import './SchemesComponent.css';
import { useNavigate } from 'react-router-dom';

const iconMap = {
  'Coins': <Coins className="scheme-icon" />,
  'Diamond': <Diamond className="scheme-icon" />,
  'Scale': <Scale className="scheme-icon" />,
  'Crown': <Crown className="scheme-icon" />,
  'GraduationCap': <GraduationCap className="scheme-icon" />,
  'Plane': <Plane className="scheme-icon" />,
  'Heart': <Heart className="scheme-icon" />,
  'Smartphone': <Smartphone className="scheme-icon" />,
  'Stethoscope': <Stethoscope className="scheme-icon" />
};

const SchemesComponent = () => {
  const [schemes, setSchemes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/schemes'); // Update URL here
        const data = await response.json();
        setSchemes(data);
      } catch (error) {
        console.error('Error fetching schemes:', error);
      }
    };

    fetchSchemes();
  }, []);

  const handleMoreClick = (id) => {
    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem('token'); // Assuming token is stored in localStorage

    if (isAuthenticated) {
      // If the user is authenticated, navigate to the MorePageComponent
      navigate(`/more/${id}`);
    } else {
      // If not authenticated, redirect to login page
      navigate('/login');
    }
  };

  return (
    <div className="schemes-container">
      <div className="schemes-grid">
        {schemes.map((scheme, index) => (
          <div key={index} className="scheme-card">
            <div className="icon-container">
              {iconMap[scheme.icon]} {/* Map the icon name to the respective icon component */}
            </div>
            <h3 className="card-title">{scheme.name}</h3> {/* Change title to name */}
            <p className="card-description">{scheme.description}</p>
            <button 
              className="register-button" 
              onClick={() => handleMoreClick(scheme._id)} // Pass scheme ID to the click handler
            >
              More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchemesComponent;
