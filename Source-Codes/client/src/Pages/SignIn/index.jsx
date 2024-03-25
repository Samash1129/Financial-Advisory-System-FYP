import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import Button from '../../Components/Button';
import NavBar from '../../Components/NavBar';
import backgroundImage from '../../Assets/Images/background.png';
import LoadingSpinner from '../../Components/LoadingAnimation';
import LogoAnimation from '../../Components/LogoAnimation';
import { useDispatch, useSelector } from 'react-redux';
import { useSigninMutation } from '../../Slices/User/UserSlice/userApiSlice';
import { setCredentials } from '../../Slices/User/AuthSlice/authSlice';
import { setPreviousPage } from '../../Slices/PageSlice/pageSlice';

/**
 * SignIn component handles user sign in form and validation.
 * Uses react hooks for state management and redux for global state.
 * Handles submit to call signin API and dispatch user info to redux store.
 * Navigates to /dashpremium or /dashregular based on user type.
 * Contains validation and error handling for form fields.
 */
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signin, { isLoading }] = useSigninMutation();

  const EMAIL = useSelector((state) => state.auth.email);
  const IS_PREMIUM = useSelector((state) => state.auth.isPremium);

  useEffect(() => {
    if (EMAIL && IS_PREMIUM === true) {
      dispatch(setPreviousPage('/signin'));
      navigate("/dashpremium");
    } else if (EMAIL && IS_PREMIUM === false) {
      dispatch(setPreviousPage('/signin'));
      navigate("/dashregular");
    }
  }, [EMAIL, IS_PREMIUM, dispatch, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signin({ email, password }).unwrap();
      dispatch(setCredentials(response));
      dispatch(setPreviousPage('/signin'));
      if (response.isPremium === true) {
        navigate("/dashpremium");
      } else {
        navigate("/dashregular");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleBackButtonClick = () => {
    navigate("/");
  };

  const validateEmail = (value) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
    } else {
      setPasswordError("");
    }
  };

  const handleChangeToSignUp = () => {
    dispatch(setPreviousPage('/signin'));
    navigate("/signup");
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.logo}>
          <LogoAnimation />
        </div>
        <img
          src={backgroundImage}
          alt="Cover Image"
          className={styles.coverImage}
        />
      </div>
      <div className={styles.rightContainer}>
        {isLoading && <LoadingSpinner loadingText="Signing In" />}
        <LoadingSpinner loadingText="Loading...">
          <div className={styles.signInContainer}>
            <NavBar
              title="Sign In"
              handleBackButtonClick={handleBackButtonClick}
            />
            <form className={styles.signInForm} onSubmit={handleSubmit}>
              <label htmlFor="email">EMAIL OR NUMBER:</label>
              <input
                type="text"
                id="email"
                placeholder="Enter your email address"
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && (
                <div className={styles.errorMessage}>{emailError}</div>
              )}

              <label htmlFor="password">PASSWORD:</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your 8-digit password"
                value={password}
                onChange={handlePasswordChange}
              />
              {passwordError && (
                <div className={styles.errorMessage}>{passwordError}</div>
              )}

              <a href="/forgot-password" className={styles.forgotPasswordLink}>
                Forgot your password?
              </a>

              <Button text="Log In" />
              <div className={styles.secondaryAction}>
                Need an account?
                <p onClick={handleChangeToSignUp} className={styles.signUpLink}>
                  Sign up
                </p>
              </div>
            </form>
          </div>
        </LoadingSpinner>
      </div>
    </div>
  );
};

export default SignIn;