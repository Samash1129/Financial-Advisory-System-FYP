import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import MiniBoomer from "../../Assets/Images/MiniBoomer.png";
import Logo from "../../Assets/SVGs/Logo.svg";
import Textt from "../../Assets/SVGs/STAY AHEAD OF THE GAME.svg";
import CenterTextt from "../../Assets/SVGs/CenterTextt.svg";
import Boomer from "../../Assets/Images/placeholder.jpg";
import Initializer from "../../Components/InitializingAnimation";
import { useSignoutMutation } from "../../Slices/User/UserSlice/userApiSlice";
import { removeUserData } from "../../Slices/User/AuthSlice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { setPreviousPage } from "../../Slices/PageSlice/pageSlice";
import {
  removeAllStocks,
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
  const [showInitializer, setShowInitializer] = useState(true);

  const [boomerImage, setBoomerImage] = useState(Boomer);
  const [textImage, setTextImage] = useState(Textt);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) {
        setBoomerImage(MiniBoomer);
        setTextImage(CenterTextt);
      } else {
        setBoomerImage(Boomer);
        setTextImage(Textt);
      }
    };

    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    signout().unwrap();
    dispatch(removeUserData());
    dispatch(removeRecommendedStocks());
    dispatch(removeAllStocks());
    const timer = setTimeout(() => {
      setShowInitializer(false); // Hide the Initializer component after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <div className={styles.landingPage}>
      {showInitializer && <Initializer />}
      {!showInitializer && (
        <>
          <header className={styles.headerarea}>
            <img src={Logo} alt="Logo" className={styles.Logo} />
            <nav className={styles.navbar}>
              <a href="#home">HOME</a>
              <a onClick={handleServices}>SERVICES</a>
              {/* <a href="#pricing">PRICING</a> */}
              <a onClick={handleAboutUs}>ABOUT US</a>
            </nav>
            <div className={styles.authButtons}>
              {/* <button className="sign-in-btn" onClick={handleSignIn}>
                Sign In
              </button> */}
              <button className={styles.signupButtons} onClick={handleSignUp}>
                Get Started
              </button>
            </div>
          </header>
          <main className={styles.mainContent}>
            <section className={styles.hero}>
              <img src={textImage} alt="Textt" className={styles.Textt} />
              <div className={styles.heroContent}>
                <p>
                  READY TO TAKE YOUR INVESTMENT GAME TO THE NEXT LEVEL? OUR
                  STOCK PREDICTOR APP HAS GOT YOUR COVERED WITH UP TO DATE
                  MARKET NEWS, REAL TIME STOCK PRICES AND IN-DEPTH ANALYSIS.
                </p>
                <a href="#read-more-section" className={styles.readmoreButton}>
                  Read More
                </a>
              </div>
            </section>
            <div className={styles.bigImage}>
              <img
                src={boomerImage}
                alt="Boomer"
                className={styles.Boomer}
              />
            </div>
          </main>
          <footer className={styles.footer}>
            <p className={styles.footerText}>© Elev8.ai 2024 - Elevate Your Game</p>
          </footer>
        </>
      )}
    </div>
  );
};
export default LandingPage;