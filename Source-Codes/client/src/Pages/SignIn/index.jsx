import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import Button from '../../Components/Button';
import NavBar from '../../Components/NavBar';
import backgroundImage from '../../Assets/Images/background.png';
import LoadingSpinner from '../../Components/LoadingAnimation';
import axios from 'axios'
import { baseurl } from '../../constants';

const SignIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  // const [credintialsError, setCredentialsError] = useState('');
  const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Using Fetch
      // const response = await fetch('https://private-61242-elev8aiapis.apiary-mock.com/signin', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     email,
      //     password
      //   })
      // });

      // if (response.ok) {
      //   const result = await response.json();
      //   console.log(result);
      //   navigate('/dashregular');
      //   setEmail('');
      //   setPassword('');
      // } else {
      //   console.error(`Failed with status ${response.status}`);
      // }

      // Using Axios
      const response = await axios.post(baseurl + '/signin', {
        email,
        password,
      });

      if (response.status === 200) {
        console.log(response.data);
        navigate("/dashregular");
        setEmail("");
        setPassword("");
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

  const handleChangeToSignUp = () => {
    navigate('/signup');
  }


  return (
    <div className={styles.container}>

      <div className={styles.leftContainer}>
        <img src={backgroundImage} alt="Cover Image" className={styles.coverImage} />
      </div>

      <div className={styles.rightContainer}>
        <LoadingSpinner loadingText="Loading...">
          <div className={styles.signInContainer}>
            <NavBar title="Sign In" handleBackButtonClick={handleBackButtonClick} />
            <form className={styles.signInForm} onSubmit={handleSubmit}>
              <label htmlFor="email">EMAIL OR NUMBER:</label>
              <input type="text" id="email" placeholder="Enter your email address" value={email} onChange={handleEmailChange} />
              {emailError && <div className={styles.errorMessage}>{emailError}</div>}

              <label htmlFor="password">PASSWORD:</label>
              <input type="password" id="password" placeholder="Enter your 8-digit password" value={password} onChange={handlePasswordChange} />
              {passwordError && <div className={styles.errorMessage}>{passwordError}</div>}

              <a href="/forgot-password" className={styles.forgotPasswordLink}>Forgot your password?</a>

              <Button text="Log In" />
              <div className={styles.secondaryAction}>
                Need an account?
                <p onClick={handleChangeToSignUp} className={styles.signUpLink}>Sign up</p>
              </div>
            </form>
          </div>
        </LoadingSpinner>
      </div>

    </div>

  );
};

export default SignIn;