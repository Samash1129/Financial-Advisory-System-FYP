import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Button from "../../Components/Button";
import NavBar from "../../Components/NavBar";
import backgroundImage from "../../Assets/Images/background.png";
import LoadingSpinner from "../../Components/LoadingAnimation";
import LogoAnimation from "../../Components/LogoAnimation";
import { useSignoutMutation } from "../../Slices/User/UserSlice/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSigninMutation } from "../../Slices/User/UserSlice/userApiSlice";
import { setUserData, removeUserData } from "../../Slices/User/AuthSlice/authSlice";
import { setPreviousPage } from "../../Slices/PageSlice/pageSlice";
import { Grid, Box} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useGetRecommendedStocksMutation, useGetAllStocksMutation } from "../../Slices/StockSlice/stockApiSlice";
import { setRecommendedStocks, setAllStocks } from "../../Slices/StockSlice/stockSlice";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isFailure, setFailure] = useState(false);
  const [topError, setTopError] = useState('');
  const isMobile = useMediaQuery('(max-width:900px)');

  const dispatch = useDispatch();
  const [signout] = useSignoutMutation();
  const [sendPreferences] = useGetRecommendedStocksMutation();
  
  const navigate = useNavigate();

  // Calling the API
  const [signin, { isLoading, isSuccess }] = useSigninMutation();

  // Accessing the current state
  const currentUserData = useSelector(state => state.auth);

  const previousPage = useSelector(state => state.previousPage.previousPage);
  const [loadingText1, setLoadingText1] = useState("");

  useEffect(() => {
  
    if (previousPage == "/dashboard")
    { setLoadingText1("Logging Out");  }
    else if (previousPage == "/signup")
    { setLoadingText1("Proceeding"); }
    else 
    { setLoadingText1("Loading"); }

  }, [previousPage]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setTopError('Please fill both input fields!');
      return;
    }

    if (emailError || passwordError) {
      return;
    }

    setTopError('');

    try {
      const response = await signin({ email, password }).unwrap();
      
      dispatch(setUserData({ 
        token: true, 
        name: response.name, 
        email: response.email, 
        preferences: response.preferences, 
        conversations: response.conversations 
      }));

    
      const sendPref = await sendPreferences({ 
        risk_tolerance: response.preferences.riskTolerance, 
        stock_type: response.preferences.stockType, 
        duration: response.preferences.investmentGoals 
      }).unwrap(); 
    
      dispatch(setRecommendedStocks({ recommendedStocks: sendPref.content }));
      
      dispatch(setPreviousPage("/signin"));
      navigate("/dashboard");
    } catch (error) {
      setTopError(error.data.error);
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
    setTopError('');
    if (!validateEmail(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setTopError('');
    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
    } else {
      setPasswordError("");
    }
  };

  const handleChangeToSignUp = () => {
    dispatch(setPreviousPage("/signin"));
    navigate("/signup");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={0} className={styles.container}>
    {!isMobile &&
      <Grid item xs={12} md={6}  className={styles.leftContainer}>
        <div className={styles.logo}>
          <LogoAnimation />
        </div>
        <img
          src={backgroundImage}
          alt="Cover Image"
          className={styles.coverImage}
        />
      </Grid>
      }
      <Grid item xs={12} md={6} className={styles.rightContainer}>
      { isLoading && <LoadingSpinner loadingText="Signing In" /> } 
        <LoadingSpinner loadingText={loadingText1}>
          <div className={styles.signInContainer}>
            <NavBar
              title="Sign In"
              handleBackButtonClick={handleBackButtonClick}
            />
            {topError && <div className={styles.topError}>{topError}</div>}
            <form className={styles.signInForm} onSubmit={handleSubmit}>
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
                Not registered?
                <p onClick={handleChangeToSignUp} className={styles.signUpLink}>
                  Sign up
                </p>
              </div>
            </form>
          </div>
        </LoadingSpinner>
      </Grid>
    </Grid>
    </Box>
  );
};

export default SignIn;
