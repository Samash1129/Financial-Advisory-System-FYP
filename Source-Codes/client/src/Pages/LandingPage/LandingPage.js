import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import Boomer from "../../Assets/SVGs/Boomer.svg";
import Logo from "../../Assets/SVGs/Logo.svg";
import Textt from "../../Assets/SVGs/STAY AHEAD OF THE GAME.svg";
import Lottie from "react-lottie";
import animationData from "../../Assets/Animations/Animation - 1710273853696.json";

const LandingPage = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleSignUp = () => {
    navigate("/GetStarted"); // Navigate to the GetStarted page when Sign Up button is clicked
  };

  const handleSignIn = () => {
    navigate("/SignIn"); // Navigate to the SignIn page when Sign In button is clicked
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="landing-page">
      <div className="lottie-background1">
        <Lottie options={defaultOptions} />
      </div>
      <div className="lottie-background2">
        <Lottie options={defaultOptions} />
      </div>
      <header className="header">
        <img src={Logo} alt="Logo" className="Logo" />
        <nav className="navbar">
          <a href="#home">HOME</a>
          <a href="#services">SERVICES</a>
          <a href="#pricing">PRICING</a>
          <a href="#about-us">ABOUT US</a>
        </nav>
        <div className="auth-buttons">
          <button className="sign-in-btn" onClick={handleSignIn}>
            Sign In
          </button>
          <button className="sign-up-btn" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
      </header>
      <main className="main-content">
        <section className="hero">
          <img src={Textt} alt="Textt" className="Textt" />
          <div className="hero-content">
            <p>
              READY TO TAKE YOUR INVESTMENT GAME TO THE NEXT LEVEL? OUR STOCK
              PREDICTOR APP HAS GOT YOUR COVERED WITH UP TO DATE MARKET NEWS,
              REAL TIME STOCK PRICES AND IN-DEPTH ANALYSIS.
            </p>
            <a className="read-more-btn">Read More</a>
          </div>
        </section>
        <div className="big-image">
          <img src={Boomer} alt="Boomer" className="Boomer" />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
