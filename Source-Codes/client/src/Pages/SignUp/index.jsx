import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import Button from '../../Components/Button';
import NavBar from '../../Components/NavBar';
import backgroundImage from '../../Assets/Images/background.png';
import correctIcon from '../../Assets/SVGs/correct.svg';
import errorIcon from '../../Assets/SVGs/error.svg';
import LoadingSpinner from '../../Components/LoadingAnimation';
import LogoAnimation from '../../Components/LogoAnimation';
import axios from 'axios';
import { baseurl } from '../../constants';

const SignUp = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Using Fetch
      // const response = await fetch('https://private-61242-elev8aiapis.apiary-mock.com/signup', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     name,
      //     email,
      //     password
      //   })
      // });

      // if (response.ok) {
      //   const result = await response.json();
      //   console.log(result);
      //   navigate('/dashregular');
      //   setName('');
      //   setEmail('');
      //   setPassword('');
      // } else {
      //   console.error(`Failed with status ${response.status}`);
      // }

      // Using Axios
      const response = await axios.post(baseurl + '/signup', {
        name,
        email,
        password
      });

      if (response.status === 200) {
        console.log(response.data);
        // Add submission logic here
        // At the moment will navigate to preferrence then premium wala page..
        navigate('/preferences');
      } else {
        console.error(`Failed with status ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBackButtonClick = () => {
    navigate('/');
  }

  const handleChangeToSignIn = () => {
    navigate('/signin');
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
        <LoadingSpinner loadingText="Loading...">
          <div className={styles.signUpContainer}>
            <NavBar title="Sign Up" handleBackButtonClick={handleBackButtonClick} />
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

            <div className={styles.signupbutton}>
            <Button text="Sign Up" onClick={handleSubmit} />
            </div>

            <div className={styles.secondaryAction}>
              Have an account?
              <p onClick={handleChangeToSignIn} className={styles.signInLink}>Sign In</p>
            </div>

          </div>
        </LoadingSpinner>
      </div>
    </div>

  );
};

export default SignUp;