import React from 'react';
import styles from './styles.module.css';
import BackButton from '../../Assets/SVGs/Vector1.svg';

const NavBar = ({ title, handleBackButtonClick }) => { // Accepting a title prop

  return (
    <nav className={styles.navBar}>
      <div className={styles.navContainer}>
        <div className={styles.titleContainer}>
          <h1>{title}</h1> {/* Using the title prop */}
        </div>
        <div className={styles.backButtonContainer} onClick={handleBackButtonClick}>
          <img src={BackButton} alt="Back" className={styles.backArrow}/>
          <span className={styles.backTitle}>BACK</span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;