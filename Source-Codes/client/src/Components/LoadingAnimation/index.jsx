import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

const LoadingSpinner = ({ children, loadingText }) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(loadingTimer);
  }, []);

  return isLoading ? (
    <div className={styles.loadingSpinnerContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>{loadingText}</p>
    </div>
  ) : (
    children
  );
};

export default LoadingSpinner;