import React from 'react';
import styles from './styles.module.css';
import Errors400 from '../../Assets/SVGs/Errors400.svg';

const Error500 = () => {
    return (
        <div className={styles.errorContainer}>
            <img src={Errors400} alt="Error 400 Logo" className={styles.errorLogo} /> {/* Using Errors400 variable */}
            <h2 className={styles.errorTitle}>Unexpected Error.</h2>
            <p className={styles.errorParagraph}>Our team is working on getting things back to normal soon.</p>
        </div>
    );
};

export default Error500;