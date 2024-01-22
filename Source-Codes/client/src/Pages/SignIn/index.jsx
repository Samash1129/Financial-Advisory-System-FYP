import React, { useState } from 'react';
import styles from './styles.module.css';
import Button from '../../Components/Button';
import NavBar from '../../Components/NavBar';
import backgroundImage from '../../Assets/Images/background.png';
import LoadingSpinner from '../../Components/LoadingAnimation';

const SignIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (value) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(value);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };


  return (
    <div className={styles.container}>

    <div className={styles.leftContainer}>
    <img src={backgroundImage} alt="Cover Image" className={styles.coverImage} />
    </div>    

    <div className={styles.rightContainer}>
    <LoadingSpinner loadingText="Loading...">
    <div className={styles.signInContainer}>
      <NavBar title="Sign In" />
      <form className={styles.signInForm} onSubmit={handleSubmit}>
        <label htmlFor="email">EMAIL OR NUMBER:</label>
        <input type="text" id="email" placeholder="Enter your email address" value={email} onChange={handleEmailChange} />
        {emailError && <div className={styles.errorMessage}>{emailError}</div>}

        <label htmlFor="password">PASSWORD:</label>
        <input type="password" id="password" placeholder="Enter your 8-digit password" value={password} onChange={handlePasswordChange} />
        {passwordError && <div className={styles.errorMessage}>{passwordError}</div>}

        <a href="/forgot-password" className={styles.forgotPasswordLink}>Forgot your password?</a>
        
        <Button text="Log In" onClick={() => {/* Handle login */}} />
        <div className={styles.secondaryAction}>
          Need an account? <a href="/signup" className={styles.signUpLink}>Sign up</a>
        </div>
      </form>
    </div>
    </LoadingSpinner>
    </div>

    </div>

);
};

export default SignIn;