import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import logo from './images/FundLogo-removebg-preview.png';
import LoginComponent from './LoginComponent/LoginComponent';
import RegisterComponent from './RegisterComponent/RegisterComponent';
import Home from './Home'; // Ensure Home component is updated to display the logo
import AboutComponent from './AboutComponent/AboutComponent'; // Import the AboutComponent
import ContactComponent from './ContactComponent/ContactComponent';
import SchemesComponent from './SchemesComponent/SchemesComponent';
import FaqComponent from './FaqComponent/FaqComponent'; // Import the new FAQ component
import Footer from './FooterComponent/FooterComponent';
import LoginSchemeComponent from './LoginSchemeComponent/LoginSchemeComponent';
import MorePage from './MorePageComponent/MorePageComponent';
import RegisterScheme from './RegisterScheme/RegisterScheme';
import MorePageComponent from './MorePageComponent/MorePageComponent';
import Auction from './Auction/Auction';

const Schemes = () => <div>Schemes Page Content</div>;

function App() {
  return (
    <Router>
      <div className="App">
        <header className="fundverse-header">
          <div className="logo-section">
            <img src={logo} alt="Fundverse logo" />
            <span className="fundverse-title">FUNDVERSE</span>
          </div>
          <nav className="main-nav">
            <Link to="/">HOME</Link>
            <Link to="/about">ABOUT</Link>
            <Link to="/schemes">SCHEMES</Link>
            <Link to="/faqs">FAQs</Link> {/* Link to FAQ page */}
            <Link to="/contact">CONTACT</Link>
          </nav>
          <div className="auth-section">
            <Link to="/login">LOGIN</Link>
            <Link to="/register">REGISTER</Link>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page with logo */}
          <Route path="/more/:id" element={<MorePageComponent />} /> {/* Route for MorePage */}
          <Route path="/about" element={<AboutComponent />} /> {/* Render AboutComponent */}
          <Route path="/schemes" element={<SchemesComponent />} />
          <Route path="/faqs" element={<FaqComponent />} /> {/* Render FaqComponent */}
          <Route path="/contact" element={<ContactComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register-scheme/:id" element={<RegisterScheme />} />
          <Route path="/login-schemes/:username" element={<LoginSchemeComponent />} />
          <Route path="/auction" element={<Auction />} />
          <Route path="/register" element={<RegisterComponent />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
