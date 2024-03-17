import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import Button from '../../Components/Button';
import NavBar from '../../Components/NavBar';
import ToggleButton from '../../Components/ToggleButton'; // The updated component with label prop
import Dropdown from '../../Components/Dropdown';
import backgroundImage from '../../Assets/Images/background.png';

// Options for the Amount to Invest / Disposable Income dropdown
const amountToInvestOptions = [
  '$0 - $1,000',
  '$1,001 - $5,000',
  '$5,001 - $10,000',
  'More than $10,000'
];

// Options for the Stock Type dropdown
const stockTypeOptions = [
  'Dividend',
  'Non-Dividend',
  'Growth',
  'Value'
];

const Preferences = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Navigate to the /dashboard route
    navigate('/dashpremium');
  }
  
  return (

    <div className={styles.container}>

      <div className={styles.leftContainer}>
        <img src={backgroundImage} alt="Cover Image" className={styles.coverImage} />
      </div>

      <div className={styles.rightContainer}>
        <div className={styles.preferences}>
          <NavBar title="Preferences" />

          <div className={styles.section}>
            <h2>Investment Goals</h2>
            <div className={styles.toggleContainer1}>
              <ToggleButton label="Short Term" />
              <ToggleButton label="Long Term" />
            </div>
          </div>

          <div className={styles.section}>
            <h2>Risk Tolerance</h2>
            <div className={styles.toggleContainer2}>
              <ToggleButton label="Low" />
              <ToggleButton label="Medium" />
              <ToggleButton label="High" />
            </div>
          </div>

          <div className={styles.section}>
            <h2>Amount to Invest / Disposable Income</h2>
            <Dropdown options={amountToInvestOptions} />
          </div>

          <div className={styles.section}>
            <h2>Preferred Industries</h2>
            <div className={styles.toggleContainer3}>
              <ToggleButton label="Clothing" />
              <ToggleButton label="Cosmetics" />
              <ToggleButton label="Logistics" />
            </div>
          </div>

          <div className={styles.section}>
            <h2>Stock Type</h2>
            <Dropdown options={stockTypeOptions} />
          </div>

          <div className={styles.saveButton}>
            <Button text="Save Preferences" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preferences;