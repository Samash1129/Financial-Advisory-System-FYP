import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import Lottie from 'react-lottie';
import successAnimationData from '../../Assets/Animations/Tickk.json'; // Import the JSON for success animation
import failureAnimationData from '../../Assets/Animations/Cross.json'; // Import the JSON for failure animation

const LoadingSpinner = ({ children, loadingText }) => {
  const [isLoading, setLoading] = useState(true);
  const [isSuccess, setSuccess] = useState(false);
  const [isFailure, setFailure] = useState(false);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(loadingTimer);
  }, []);

  return isLoading ? (
    <div className={styles.loadingSpinnerContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>{loadingText}</p>
    </div>
  ) : isSuccess ? (
    <div className={styles.successContainer}>
      <Lottie
        options={{
          loop: false,
          autoplay: true,
          animationData: successAnimationData,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        }}
        height={170}
        width={170}
      />
      <p className={styles.successText}>Logged In</p>
    </div>
  ) : isFailure ? (
    <div className={styles.failureContainer}>
      <Lottie
        options={{
          loop: false,
          autoplay: true,
          animationData: failureAnimationData,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        }}
        height={170}
        width={170}
      />
      <p className={styles.failureText}>Login Error</p>
    </div>
  ) : (
    children
  );
};

export default LoadingSpinner;
