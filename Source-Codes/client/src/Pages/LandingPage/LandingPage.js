import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import Boomer from "../../Assets/Images/Group 157.png";
import Logo from "../../Assets/SVGs/Logo.svg";
import Textt from "../../Assets/SVGs/STAY AHEAD OF THE GAME.svg";
import PlaceholderImage from "../../Assets/Images/placeholder.jpg";
import Initializer from "../../Components/InitializingAnimation";
import { useSignoutMutation } from "../../Slices/User/UserSlice/userApiSlice";
import { removeUserData } from "../../Slices/User/AuthSlice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { setPreviousPage } from "../../Slices/PageSlice/pageSlice";
import {
  removeHistoryStock,
  removeRecommendedStocks,
} from "../../Slices/StockSlice/stockSlice";

const LandingPage = () => {
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch();
  const [signout] = useSignoutMutation();

  const handleSignUp = () => {
    navigate("/getstarted"); 
  };

  const handleSignIn = () => {
    navigate("/signin");
  };

  const handleServices = () => {
    navigate('/services');
  };

  const handleAboutUs = () => {
    navigate('/about-us');
  };

  const [imageLoaded, setImageLoaded] = useState(false);
  const [showInitializer, setShowInitializer] = useState(true);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    signout().unwrap();
    dispatch(removeUserData());
    dispatch(removeRecommendedStocks());
    dispatch(removeHistoryStock());
    const timer = setTimeout(() => {
      setShowInitializer(false); // Hide the Initializer component after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <div className="landing-page">
      {showInitializer && <Initializer />}
      {!showInitializer && (
        <>
          <header className="header">
            <img src={Logo} alt="Logo" className="Logo" />
            <nav className="navbar">
              <a href="#home">HOME</a>
              <a onClick={handleServices}>SERVICES</a>
              {/* <a href="#pricing">PRICING</a> */}
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
            <section className="hero">
              <img src={Textt} alt="Textt" className="Textt" />
              <div className="hero-content">
                <p>
                  READY TO TAKE YOUR INVESTMENT GAME TO THE NEXT LEVEL? OUR
                  STOCK PREDICTOR APP HAS GOT YOUR COVERED WITH UP TO DATE
                  MARKET NEWS, REAL TIME STOCK PRICES AND IN-DEPTH ANALYSIS.
                </p>
                <a href="#read-more-section" className="read-more-btn">
                  Read More
                </a>
              </div>
            </section>
            <div className={"big-image"}>
              {imageLoaded ? (
                <img
                  src={Boomer}
                  alt="Boomer"
                  className={"Boomer"}
                  onLoad={handleImageLoad}
                />
              ) : (
                <img
                  src={PlaceholderImage}
                  alt="Placeholder"
                  className={"placeholder"}
                />
              )}
            </div>
          </main>
          <footer className="footer">
            <p className="footer-text">© Elev8.ai 2024 - Elevate Your Game</p>
          </footer>
        </>
      )}
    </div>
  );
};
export default LandingPage;
