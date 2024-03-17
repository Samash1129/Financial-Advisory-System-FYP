import React from 'react';
import styles from './styles.module.css';
import MaintenancesMode from '../../Assets/SVGs/maintenanceLogo.svg';

const MaintenanceMode = () => {
    return (
        <div className={styles.errorContainer}>
            <img src={MaintenancesMode} alt="Error 400 Logo" className={styles.errorLogo} />
            <h2 className={styles.errorTitle}>We're Improving Your Experience.</h2>
            <p className={styles.errorParagraph}>Our site is currently down for maintenance. We apologize for the inconvenience.</p>
        </div>
    );
};

export default MaintenanceMode;