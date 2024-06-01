import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../Assets/SVGs/Logo.svg";
import styles from './styles.module.css';
import Textt from "../../Assets/SVGs/ServicesText.svg";
import Boomer from "../../Assets/Images/ServiceContent.png";
import MiniBoomer from "../../Assets/Images/MiniContent.png";

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

  const [imageLoaded, setImageLoaded] = useState(false);
  const [showInitializer, setShowInitializer] = useState(true);

  const [boomerImage, setBoomerImage] = useState(Boomer);
  const [textImage, setTextImage] = useState(Textt);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) {
        setBoomerImage(MiniBoomer);
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

  return (
    <div className={styles.servicesPage}>
      <header className={styles.header}>
        <img src={Logo} alt="Logo" className={styles.logo} />
        <nav className={styles.navbar}>
          <a href="/">HOME</a>
          <a href="#" onClick={handleServices}>SERVICES</a>
          <a href="#" onClick={handleAboutUs}>ABOUT US</a>
        </nav>
        <div className={styles.authButtons}>
          <button className={styles.signUpBtn} onClick={handleSignUp}>
            Get Started
          </button>
        </div>
      </header>
      <main className={styles.mainContent}>
            <section className={styles.hero}>
              <img src={textImage} alt="Textt" className={styles.Textt} />
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
    </div>
  );
};

export default Services;
