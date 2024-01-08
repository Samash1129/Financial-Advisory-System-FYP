import React, { useState } from 'react';
import styles from './styles.module.css';
import Button from '../../Components/Button';
import NavBar from '../../Components/NavBar';
import backgroundImage from '../../Assets/Images/background.png';
import correctIcon from '../../Assets/SVGs/correct.svg';
import errorIcon from '../../Assets/SVGs/error.svg';
import LoadingSpinner from '../../Components/LoadingAnimation';


const SignUp = () => {

const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateEmail = (value) => {
    // Simple regex for email validation - adjust as needed
    const regex = /\S+@\S+\.\S+/;
    return regex.test(value);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    // Add name validation logic if needed
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value !== password) {
      setConfirmPasswordError('Passwords do not match.');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add submission logic here
  };

    return (
    <div className={styles.container}>

    <div className={styles.leftContainer}>
    <img src={backgroundImage} alt="Cover Image" className={styles.coverImage} />
    </div> 

    <div className={styles.rightContainer}>
    <LoadingSpinner loadingText="Loading...">
    <div className={styles.signUpContainer}>
      <NavBar title="Sign Up" />
      <form className={styles.signUpForm} onSubmit={handleSubmit}>
        <label htmlFor="name">NAME</label>
        <input type="text" id="name" placeholder="Enter your name" value={name} onChange={handleNameChange} />
        {nameError && <div className={styles.errorMessage}>{nameError}</div>}

        <label htmlFor="email">EMAIL ADDRESS</label>
        <input type="text" id="email" placeholder="Enter your email address" value={email} onChange={handleEmailChange} />
        {emailError && <div className={styles.errorMessage}>{emailError}</div>}

        <label htmlFor="password">PASSWORD</label>
        <input type="password" id="password" placeholder="Enter your password" value={password} onChange={handlePasswordChange} />
        {passwordError && <div className={styles.errorMessage}>{passwordError}</div>}

        <label htmlFor="confirm-password">CONFIRM PASSWORD</label>
        <input type="password" id="confirm-password" placeholder="Confirm your password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
        {confirmPasswordError && <div className={styles.errorMessage}>{confirmPasswordError}</div>}
        </form>
        
        <Button text="Sign Up" onClick={handleSubmit} />

        <div className={styles.secondaryAction}>
          Have an account? <a href="/signin" className={styles.signInLink}>Sign In</a>
        </div>

    </div>    
    </LoadingSpinner>
    </div>       
    </div>

);
};

export default SignUp;