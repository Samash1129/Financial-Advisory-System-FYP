import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../Assets/SVGs/Logo.svg";
import "./Services.css";

const Services = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/getstarted");
  };

  const handleSignIn = () => {
    navigate("/signin");
  };

  const handleServices = () => {
    navigate("/services");
  };

  const handleAboutUs = () => {
    navigate("/about-us");
  };

  return (
    <div className="services-page">
      <header className="header">
        <img src={Logo} alt="Logo" className="Logo" />
        <nav className="navbar">
          <a href="/">HOME</a>
          <a onClick={handleServices}>SERVICES</a>
          <a onClick={handleAboutUs}>ABOUT US</a>
        </nav>
        <div className="auth-buttons">
          <button className="sign-in-btn" onClick={handleSignIn}>
            Sign In
          </button>
          <button className="sign-up-btn" onClick={handleSignUp}>
            Get Started
          </button>
        </div>
      </header>
      <main className="main-content">
        <h1>Our Services</h1>
        <p>Coming Soon.</p>
      </main>
      <footer className="footer">
        <p className="footer-text">© Elev8.ai 2024 - Elevate Your Game</p>
      </footer>
    </div>
  );
};

export default Services;
