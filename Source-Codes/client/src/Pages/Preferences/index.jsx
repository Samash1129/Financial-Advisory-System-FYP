import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Button from "../../Components/Button";
import NavBar from "../../Components/NavBar";
import ToggleButton from "../../Components/ToggleButton"; // The updated component with label prop
import Dropdown from "../../Components/Dropdown";
import backgroundImage from "../../Assets/Images/background.png";
import LogoAnimation from "../../Components/LogoAnimation";
import { useDispatch, useSelector } from "react-redux";
import { setPreviousPage } from "../../Slices/PageSlice/pageSlice";
import { useSignoutMutation } from "../../Slices/User/UserSlice/userApiSlice";
import { removeCredentials } from "../../Slices/User/AuthSlice/authSlice";

// Options for the Amount to Invest / Disposable Income dropdown
const amountToInvestOptions = [
  "$0 - $1,000",
  "$1,001 - $5,000",
  "$5,001 - $10,000",
  "More than $10,000",
];

// Options for the Stock Type dropdown
const stockTypeOptions = ["Dividend", "Non-Dividend", "Growth", "Value"];

const Preferences = () => {
  const [investmentGoals, setInvestmentGoals] = useState([]);
  const [riskTolerance, setRiskTolerance] = useState([]);
  const [preferredIndustries, setPreferredIndustries] = useState([]);
  const [amountToInvest, setAmountToInvest] = useState("");
  const [stockType, setStockType] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const previousPage = useSelector((state) => state.previousPage.previousPage);
  const userState = useSelector((state) => state.auth);

  const handleToggleInvestmentGoal = (goal) => {
    if (investmentGoals.includes(goal)) {
      setInvestmentGoals(investmentGoals.filter((item) => item !== goal));
    } else {
      setInvestmentGoals([...investmentGoals, goal]);
    }
  };

  const handleToggleRiskTolerance = (risk) => {
    if (riskTolerance.includes(risk)) {
      setRiskTolerance(riskTolerance.filter((item) => item !== risk));
    } else {
      setRiskTolerance([...riskTolerance, risk]);
    }
  };

  const handleTogglePreferredIndustry = (industry) => {
    if (preferredIndustries.includes(industry)) {
      setPreferredIndustries(
        preferredIndustries.filter((item) => item !== industry)
      );
    } else {
      setPreferredIndustries([...preferredIndustries, industry]);
    }
  };

  const handleDropdownAmountToInvest = (selectedOption) => {
    setAmountToInvest(selectedOption);
  };

  const handleDropdownStockType = (selectedOption) => {
    setStockType(selectedOption);
  };

  const handleSubmit = async () => {
    console.log(investmentGoals);
    console.log(riskTolerance);
    console.log(preferredIndustries);
    console.log(amountToInvest);
    console.log(stockType);
    // Navigate to the /dashboard route
    // At the moment navigating to premium dashboard to show the route
    navigate("/dashpremium");
  };
  const [signout] = useSignoutMutation();


  const handleBackButtonClick = async () => {
    try {
      if (previousPage === '/signup') {
        await signout().unwrap();
        dispatch(removeCredentials());
        dispatch(setPreviousPage(null));
        navigate(previousPage);
      }
      if (userState.isPremium === true) {
        navigate('/dashpremium')
        dispatch(setPreviousPage(null))
      } else {
        navigate('/dashregular')
        dispatch(setPreviousPage(null))
      }
    } catch (error) {
      console.error(error);
    }
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
                onClick={() => handleToggleInvestmentGoal("Short Term")}
              // additionalOnClick={() => console.log("Additional onClick for Short Term")}
              />
              <ToggleButton
                label="Long Term"
                onClick={() => handleToggleInvestmentGoal("Long Term")}
              // additionalOnClick={() => console.log("Additional onClick for Long Term")}
              />
            </div>
          </div>

          <div className={styles.section}>
            <h2>Risk Tolerance</h2>
            <div className={styles.toggleContainer2}>
              <ToggleButton
                label="Low"
                onClick={() => handleToggleRiskTolerance("Low")}
              />
              <ToggleButton
                label="Medium"
                onClick={() => handleToggleRiskTolerance("Medium")}
              />
              <ToggleButton
                label="High"
                onClick={() => handleToggleRiskTolerance("High")}
              />
            </div>
          </div>

          <div className={styles.section}>
            <h2>Amount to Invest / Disposable Income</h2>
            <Dropdown
              options={amountToInvestOptions}
              onOptionSelect={handleDropdownAmountToInvest}
            />
          </div>

          <div className={styles.section}>
            <h2>Preferred Industries</h2>
            <div className={styles.toggleContainer3}>
              <ToggleButton
                label="Clothing"
                onClick={() => handleTogglePreferredIndustry("Clothing")}
              />
              <ToggleButton
                label="Cosmetics"
                onClick={() => handleTogglePreferredIndustry("Cosmetics")}
              />
              <ToggleButton
                label="Logistics"
                onClick={() => handleTogglePreferredIndustry("Logistics")}
              />
            </div>
          </div>

          <div className={styles.section}>
            <h2>Stock Type</h2>
            <Dropdown
              options={stockTypeOptions}
              onOptionSelect={handleDropdownStockType}
            />
          </div>

          <div className={styles.saveButton}>
            <Button text="Save Preferences" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
