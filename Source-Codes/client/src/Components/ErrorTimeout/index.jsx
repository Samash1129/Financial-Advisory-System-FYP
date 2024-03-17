import React from 'react';
import styles from './styles.module.css';

const ConnectionTimeout = () => {
    return (
        <div className={styles.errorContainer}>
            <div className={styles.errorLoadingSpinnerContainer}>
                <div className={styles.errorSpinner}></div>
            </div>
            <h2 className={styles.errorTitle}>Taking Longer Than Usual.</h2>
            <p className={styles.errorParagraph}>Your request has timed out as the server is taking too long to respond.</p>
        </div>
    );
};

export default ConnectionTimeout;