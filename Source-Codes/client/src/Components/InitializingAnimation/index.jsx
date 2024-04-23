import React from 'react';
import styles from './styles.module.css';
import logo from '../../Assets/Images/initializerLogo.png';
import gif from '../../Assets/Images/initializerAnimation.gif';

const Initializer = () => {
    return (
        <div className={styles.bodyContainer}>
            <div className={styles.logoContainer}>
                <img src={logo} alt="Logo" className={styles.logo} />
                <img src={gif} alt="gif" className={styles.gif} />
            </div>
        </div>

    );
};

export default Initializer;