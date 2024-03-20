import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import Button from '../../Components/Button';
import NavBar from '../../Components/NavBar';
import backgroundImage from '../../Assets/Images/background.png';
import LogoAnimation from '../../Components/LogoAnimation';

const ProfileSettings = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
    } else {
      setPasswordError('');
    }
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    if (newName.length === 0) {
      setNameError('Name cannot be empty.');
    } else {
      setNameError('');
    }
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (!/\S+@\S+\.\S+/.test(newEmail)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
  };

  const handlePreferencesClick = () => {
    // Navigate to the /preferences route
    navigate('/preferences');
  }

  return (

    <div className={styles.container}>

    <div className={styles.leftContainer}>
    <div className={styles.logo}>
      <LogoAnimation />
      </div>
    <img src={backgroundImage} alt="Cover Image" className={styles.coverImage} />
    </div>    

    <div className={styles.rightContainer}>

    <div className={styles.profileSettingsContainer}>
      <NavBar title="Profile Settings" />
      <form className={styles.profileSettingsForm} onSubmit={handleSubmit}>
      <label htmlFor="name">NAME</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={handleNameChange}
        />
        {nameError && <div className={styles.errorMessage}>{nameError}</div>}

        <label htmlFor="email">EMAIL ADDRESS</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email address"
          value={email}
          onChange={handleEmailChange}
        />
        {emailError && <div className={styles.errorMessage}>{emailError}</div>}
        
        <label htmlFor="password">PASSWORD</label>
        <input type="password" id="password" placeholder="Enter your password" value={password} onChange={handlePasswordChange} />
        {passwordError && <div className={styles.errorMessage}>{passwordError}</div>}

        <div className={styles.editPreferences}>
        <p onClick={handlePreferencesClick} className={styles.editPreferences}>Edit Investment Preferences</p>
        </div>

        <Button text="Save" onClick={handleSubmit} />
      </form>
    </div>
    </div>
    </div>
  );
};

export default ProfileSettings;