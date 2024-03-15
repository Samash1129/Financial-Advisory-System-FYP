import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import BackButton from '../../Assets/SVGs/Vector1.svg';
import ElevyChatLogo from '../../Assets/SVGs/ElevyChat.svg';


const PremiumPopup = ({ onClose }) => {

    const navigate = useNavigate(); // Initialize useNavigate

    const handleUpgradeClick = () => {
        // Navigate to the /payment route
        navigate('/payment');
    };

    return (
        <div className={styles.popupContainer}>
            <div className={styles.popupBackground} onClick={onClose}></div>
            <div className={styles.popupContent}>
                <div className={styles.backButton1Container} onClick={() => window.history.back()}>
                    <img src={BackButton} alt="Back" className={styles.backArrow1} />
                    <span className={styles.backTitle1}>BACK</span>
                </div>
                <div className={styles.popupMainContent}>
                    <h2>Upgrade your Reports!</h2>
                    <div className={styles.popupVerticalLine1}></div>
                    <img src={ElevyChatLogo} alt="ElevyChat" className={styles.elevyChatLogo} />
                    <div className={styles.popupVerticalLine2}></div>
                    <div className={styles.popupActions}>
                        <p className={styles.startingPrice}>Starting at $25</p>
                        <button className={styles.upgradeButton} onClick={handleUpgradeClick}>Upgrade to Premium</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PremiumPopup;