import React from 'react';
import styles from './styles.module.css';
import Errors400 from '../../Assets/SVGs/Errors400.svg';

const Error400 = () => {
  return (
    <div className={styles.errorContainer}>
      <img src={Errors400} alt="Error 400 Logo" className={styles.errorLogo} /> {/* Using Errors400 variable */}
      <h2 className={styles.errorTitle}>Oops! Something went wrong.</h2>
      <p className={styles.errorParagraph}>We couldn't process your request. Please check your information and try again.</p>
    </div>
  );
};

export default Error400;
