import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import SliderImg from '../../Assets/SVGs/SliderImg.svg';
import SliderImg2 from '../../Assets/SVGs/SliderImg2.svg';
import SettingIcon from '../../Assets/SVGs/SettingIcon.svg';
import LogoutIcon from '../../Assets/SVGs/LogoutIcon.svg';
import PremiumPopup from '../PremiumPopup';

const Slider = () => {

    const [showPremiumPopup, setShowPremiumPopup] = useState(false);
    const navigate = useNavigate();

    const handleUpgradeClick = () => {
        setShowPremiumPopup(true);
    };

    const handleClosePopup = () => {
        setShowPremiumPopup(false);
    };

    const handleLogout = () => {
        // Navigate to the /signin route
        navigate('/signin');
    };

    return (
        <div className={styles.sliderContainer}>
            <div className={styles.imageContainer}>
                <img src={SliderImg} alt="Slider" />
            </div>
            <div className={styles.textContainer}>
                <h1 className={styles.welcomeText}>Welcome to elev8.ai!</h1>
                <p className={styles.descriptionText}>Your New Best Friend for Smart and Friendly Investment Advice!</p>
                <button className={styles.upgradeBtn} onClick={handleUpgradeClick}>Upgrade to Premium</button>
            </div>
            <div className={styles.sliderButtonContainer}>
                <hr className={styles.divider} />
                <button className={styles.profileBtn} type="button">
                    <img src={SettingIcon} alt="Profile Settings" className={styles.icon} />
                    <span>Profile Settings</span>
                </button>
                <button className={styles.logoutBtn} type="button" onClick={handleLogout}>
                    <img src={LogoutIcon} alt="Logout" className={styles.icon} />
                    <span>Logout</span>
                </button>
            </div>
            {showPremiumPopup && <PremiumPopup onClose={handleClosePopup} />}
        </div>
    );
};

export default Slider;