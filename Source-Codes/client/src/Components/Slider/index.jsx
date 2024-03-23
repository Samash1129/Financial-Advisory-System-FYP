import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import SliderImg from "../../Assets/SVGs/SliderImg.svg";
import SettingIcon from "../../Assets/SVGs/SettingIcon.svg";
import LogoutIcon from "../../Assets/SVGs/LogoutIcon.svg";
import PremiumPopup from "../PremiumPopup";
import { useSignoutMutation } from "../../Slices/UserSlice/userApiSlice";
import { removeCredentials } from "../../Slices/AuthSlice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { setPreviousPage } from "../../Slices/PageSlice/pageSlice";

const Slider = ({ pageType }) => {
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.auth);

  const [signout] = useSignoutMutation();

  const renderActionButton = () => {
    if (pageType === "premium") {
      return (
        <button className={styles.rechargeBtn} onClick={handleUpgradeClick}>
          Recharge Account
        </button>
      );
    }
    // Default to showing the upgrade button if pageType is 'regular' or undefined
    return (
      <button className={styles.upgradeBtn} onClick={handleUpgradeClick}>
        Upgrade to Premium
      </button>
    );
  };

  const handleUpgradeClick = () => {
    setShowPremiumPopup(true);
  };

  const handleClosePopup = () => {
    setShowPremiumPopup(false);
  };

  const handleLogout = async () => {
    try {
      await signout().unwrap();
      dispatch(removeCredentials());
      dispatch(setPreviousPage(null));
      navigate("/signin");
    } catch (error) {
      console.error(error);
    }
  };

  const handleProfileClick = () => {
    // Navigate to the /profilesettings route
    if (userState.isPremium === true) {
      dispatch(setPreviousPage('/dashpremium'));
      navigate("/profilesettings");
    } else {
      dispatch(setPreviousPage('/dashregular'));
      navigate("/profilesettings");
    }
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.imageContainer}>
        <img
          src={SliderImg}
          alt="Slider"
          className={`${styles.sliderImage} ${pageType !== "premium" ? styles.sliderImageOverlay : ''}`}
        />
      </div>

      <div className={styles.textContainer}>
        <h1 className={styles.welcomeText}>Welcome to elev8.ai!</h1>
        <p className={styles.descriptionText}>
          Your New Best Friend for Smart and Friendly Investment Advice!
        </p>
      </div>
      <div className={styles.sliderButtonContainer}>
        {renderActionButton()}
        <hr className={styles.divider} />
        <button
          className={styles.profileBtn}
          type="button"
          onClick={handleProfileClick}
        >
          <img
            src={SettingIcon}
            alt="Profile Settings"
            className={styles.icon}
          />
          <span>Profile Settings</span>
        </button>
        <button
          className={styles.logoutBtn}
          type="button"
          onClick={handleLogout}
        >
          <img src={LogoutIcon} alt="Logout" className={styles.icon} />
          <span>Logout</span>
        </button>
      </div>
      {showPremiumPopup && <PremiumPopup onClose={handleClosePopup} />}
    </div>
  );
};

export default Slider;
