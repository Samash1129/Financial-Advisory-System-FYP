import React from 'react';
import styles from './styles.module.css';
import small from '../../Assets/SVGs/Small.svg';
import stretch from '../../Assets/SVGs/Stretch.svg';

const LogoAnimation = () => {
  return (
    <div className={styles.logoAnimationContainer}>
      <img src={small} alt="Small Logo" className={styles.logoSmall} />
      <img src={stretch} alt="Stretched Logo" className={styles.logoStretch} />
    </div>
  );
};

export default LogoAnimation;