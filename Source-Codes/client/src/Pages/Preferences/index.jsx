import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Button from "../../Components/Button";
import NavBar from "../../Components/NavBar";
import ToggleButton from "../../Components/ToggleButton"; // The updated component with label prop
import Dropdown from "../../Components/Dropdown";
import backgroundImage from "../../Assets/Images/background.png";
import LogoAnimation from "../../Components/LogoAnimation";
import LoadingSpinner from '../../Components/LoadingAnimation';
import { useDispatch, useSelector } from "react-redux";
import { useSignUpFinalMutation } from '../../Slices/User/UserSlice/userApiSlice';
import { setPreviousPage } from "../../Slices/PageSlice/pageSlice";
import { useSignoutMutation } from "../../Slices/User/UserSlice/userApiSlice";
import { useDeleteUserMutation } from "../../Slices/User/UserSlice/userApiSlice";
import { removeUserData, setUserData } from "../../Slices/User/AuthSlice/authSlice";
import { Grid, Box} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const stockTypeOptions = ["Dividend", "Non-Dividend", "Growth", "Value"];

const Preferences = () => {
  const [investmentGoals, setInvestmentGoals] = useState("");
  const [riskTolerance, setRiskTolerance] = useState("");
  const [preferredIndustries, setPreferredIndustries] = useState([]);
  const [stockType, setStockType] = useState("");
  const [amountToInvest, setAmountToInvest] = useState("");
  const [error, setError] = useState('');
  const isMobile = useMediaQuery('(max-width:900px)');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUserData = useSelector(state => state.auth);

  useEffect(() => {
    if (currentUserData.preferences) {
      const { investmentGoals, riskTolerance, preferredIndustries, stockType, amountToInvest } = currentUserData.preferences;
      setInvestmentGoals(investmentGoals || "Long Term");
      setRiskTolerance(riskTolerance || "Low");
      if (preferredIndustries.length > 0) { setPreferredIndustries(preferredIndustries); }
      else { setPreferredIndustries(["Banking"]); }
      setStockType(stockType || "Dividend");
      if (amountToInvest==0) { setAmountToInvest("100"); } 
      else { setAmountToInvest(amountToInvest.toLocaleString()); }
      //setAmountToInvest(amountToInvest.toLocaleString() || "100");
    }
  }, [currentUserData]);


  const [signUpFinal, { isLoading }] = useSignUpFinalMutation();
  const [deleteUser] = useDeleteUserMutation();

  const formatCurrency = (value) => {
    // Remove non-digit characters
    const cleanedValue = value.replace(/\D/g, '');
    // Format with commas
    return cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  
  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmountToInvest(formatCurrency(value));
  
    if (value < 100) {
      setError('Amount must be more than PKR 100');
    } 
    else {
      setError('');
    }
  };

  const previousPage = useSelector((state) => state.previousPage.previousPage);
  const userState = useSelector((state) => state.auth);

  const handleToggleInvestmentGoals = (goal) => {
    setInvestmentGoals(goal);
  };

  const handleToggleRiskTolerance = (risk) => {
    setRiskTolerance(risk);
  };

  const handleTogglePreferredIndustry = (industry) => {
    if (preferredIndustries.length > 1 && preferredIndustries.includes(industry)) {
      setPreferredIndustries(preferredIndustries.filter((item) => item !== industry));
    } else if (!preferredIndustries.includes(industry)) {
      setPreferredIndustries([...preferredIndustries, industry]);
    }
  };
  

  const handleDropdownStockType = (selectedOption) => {
    setStockType(selectedOption);
  };

  const handleSubmit = async () => {

    if (error) {
      return;
    }

    try { 
      const formattedAmountToInvest = parseFloat(amountToInvest.replace(/,/g, ''));
      const response = await signUpFinal({ email: currentUserData.email, investmentGoals, riskTolerance, amountToInvest:formattedAmountToInvest, preferredIndustries, stockType }).unwrap();
      console.log(response);

      let token1 = false;

      if (currentUserData.token == true) { token1 = true; }
      else { token1 = false; }
     
      dispatch(setUserData({ token: token1, name:response.user.name, email:response.user.email, preferences: response.user.preferences}));
      
      { dispatch(setPreviousPage('/signup')); }

      if (token1 == true) { navigate('/dashboard'); }
      else 
      { 
        dispatch(removeUserData());
        navigate('/signin'); 
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  const [signout] = useSignoutMutation();

  const handleBackButtonClick = async () => {

    dispatch(setPreviousPage("/preferences"));
    if (currentUserData.token == true) { navigate('/dashboard'); }
    else { 
      deleteUser(currentUserData.email).unwrap();
      navigate('/signup'); 
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={0} className={styles.container}>
        {!isMobile &&
        <Grid item xs={12} md={6} className={styles.leftContainer}>
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
      { isLoading && <LoadingSpinner loadingText="Saving Preferences" /> }
        <div className={styles.preferences}>
          <NavBar
            title="Preferences"
            handleBackButtonClick={handleBackButtonClick}
          />
          <div className={styles.section}>
            <h2>Investment Goals</h2>
            <div className={styles.toggleContainer1}>
              <ToggleButton
                label="Short Term"
                onClick={() => handleToggleInvestmentGoals("Short Term")}
                isSelected={investmentGoals === "Short Term"}
              />
              <ToggleButton
                label="Long Term"
                onClick={() => handleToggleInvestmentGoals("Long Term")}
                isSelected={investmentGoals === "Long Term"}
              />
            </div>
          </div>

          <div className={styles.section}>
            <h2>Risk Tolerance</h2>
            <div className={styles.toggleContainer2}>
              <ToggleButton
                label="Low"
                onClick={() => handleToggleRiskTolerance("Low")}
                isSelected={riskTolerance === "Low"}
              />
              <ToggleButton
                label="Medium"
                onClick={() => handleToggleRiskTolerance("Medium")}
                isSelected={riskTolerance === "Medium"}
              />
              <ToggleButton
                label="High"
                onClick={() => handleToggleRiskTolerance("High")}
                isSelected={riskTolerance === "High"}
              />
            </div>
          </div>

          <div className={styles.section}>
            <h2>Amount to Invest (PKR)</h2>
            <div className={styles.psrInputContainer}>
              <input
                type="text"
                className={styles.psrInputField}
                placeholder="Enter your investing amount"
                value={amountToInvest}
                onChange={handleAmountChange}
              />
              {error && <div className={styles.errorMessage}>{error}</div>}
            </div>
          </div>

          <div className={styles.section}>
            <h2>Preferred Industries</h2>
            <div className={styles.toggleContainer3}>
              <ToggleButton
                label="Banking"
                onClick={() => handleTogglePreferredIndustry("Banking")}
                isSelected={preferredIndustries.includes("Banking")}
                isRestricted={false}
              />
              <ToggleButton
                label="Textile"
                // onClick={() => handleTogglePreferredIndustry("Automobile")}
                // isSelected={preferredIndustries.includes("Automobile")}
                isRestricted={true}
              />
              <ToggleButton
                label="Automobile"
                // onClick={() => handleTogglePreferredIndustry("Automobile")}
                // isSelected={preferredIndustries.includes("Automobile")}
                isRestricted={true}
              />
            </div>
          </div>

          <div className={styles.section}>
            <h2>Stock Type</h2>
            <Dropdown
              options={stockTypeOptions}
              onOptionSelect={handleDropdownStockType}
              selectedOption={stockType}
            />
          </div>

          <div className={styles.saveButton}>
            <Button text="Save Preferences" onClick={handleSubmit} />
          </div>
        </div>
      </Grid>
    </Grid>
    </Box>
  );
};

export default Preferences;
