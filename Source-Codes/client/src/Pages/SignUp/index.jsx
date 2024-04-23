import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Button from "../../Components/Button";
import NavBar from "../../Components/NavBar";
import backgroundImage from "../../Assets/Images/background.png";
// import correctIcon from '../../Assets/SVGs/correct.svg';
// import errorIcon from '../../Assets/SVGs/error.svg';
import LoadingSpinner from "../../Components/LoadingAnimation";
import LogoAnimation from "../../Components/LogoAnimation";
import { useSignUpTempMutation } from "../../Slices/User/UserSlice/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../Slices/User/AuthSlice/authSlice";
import { setPreviousPage } from "../../Slices/PageSlice/pageSlice";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [topError, setTopError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signUpTemp, { isLoading }] = useSignUpTempMutation();

  const currentUserData = useSelector((state) => state.auth);
  const previousPage = useSelector((state) => state.previousPage.previousPage);
  const [loadingText1, setLoadingText1] = useState("");

  useEffect(() => {
    if (previousPage === "/preferences") {
      setLoadingText1("Going Back");
    } else {
      setLoadingText1("Loading");
    }

    if (currentUserData.name) {
      const { name, email } = currentUserData;
      setName(name);
      setEmail(email);
    }
  }, [previousPage, currentUserData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setTopError("Please fill all input fields!");
      return;
    }

    if (nameError || emailError || passwordError || confirmPasswordError) {
      return;
    }

    setTopError("");

    try {
      const response = await signUpTemp({ name, email, password }).unwrap();
      console.log(response);

      dispatch(
        setUserData({
          token: false,
          name: response.name,
          email: response.email,
        })
      );

      dispatch(setPreviousPage("/signup"));
      navigate("/preferences");
    } catch (response) {
      setTopError(response.data.error);
    }
  };

  const validateEmail = (value) => {
    // Simple regex for email validation - adjust as needed
    const regex = /\S+@\S+\.\S+/;
    return regex.test(value);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setTopError("");
    // Add name validation logic if needed
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setTopError("");
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setTopError("");
    setPassword(value);
    if (value.length < 8 && value.length !== 0) {
      setPasswordError("Password must be at least 8 characters long.");
    } else if (value.length === 0) {
      setPasswordError("");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setTopError("");
    if (value !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else if (value.length === 0) {
      setConfirmPasswordError("");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleBackButtonClick = () => {
    navigate("/");
  };

  const handleChangeToSignIn = () => {
    dispatch(setPreviousPage("/signup"));
    navigate("/signin");
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.logo}>
          <LogoAnimation />
        </div>
        <img
          src={backgroundImage}
          alt="Cover"
          className={styles.coverImage}
        />
      </div>

      <div className={styles.rightContainer}>
        <LoadingSpinner loadingText={loadingText1}>
          <div className={styles.signUpContainer}>
            <NavBar
              title="Sign Up"
              handleBackButtonClick={handleBackButtonClick}
            />
            {topError && <div className={styles.topError}>{topError}</div>}
            <form className={styles.signUpForm} onSubmit={handleSubmit}>
              <label htmlFor="name">FULL NAME</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={handleNameChange}
              />
              {nameError && (
                <div className={styles.errorMessage}>{nameError}</div>
              )}

              <label htmlFor="email">EMAIL ADDRESS</label>
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

              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
              />
              {passwordError && (
                <div className={styles.errorMessage}>{passwordError}</div>
              )}

              <label htmlFor="confirm-password">CONFIRM PASSWORD</label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {confirmPasswordError && (
                <div className={styles.errorMessage}>
                  {confirmPasswordError}
                </div>
              )}
              <Button text="Sign Up" />
            </form>

            <div className={styles.secondaryAction}>
              Already registered?
              <p onClick={handleChangeToSignIn} className={styles.signInLink}>
                Sign In
              </p>
            </div>
          </div>
        </LoadingSpinner>
      </div>
    </div>
  );
};

export default SignUp;
