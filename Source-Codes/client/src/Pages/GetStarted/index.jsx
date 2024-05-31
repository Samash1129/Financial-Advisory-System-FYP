import React from 'react';
import styles from './styles.module.css';
import Button from '../../Components/Button';
import { useNavigate } from 'react-router-dom';
import background from '../../Assets/Images/background.png'
import bottomLogo from '../../Assets/Images/bottomLogo.png';
import LogoAnimation from '../../Components/LogoAnimation';
import tutorialIcon from '../../Assets/SVGs/Tutorial.svg';
import { Grid, Box} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import backgroundImage from "../../Assets/Images/background.png";

const GetStarted = () => {

  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:900px)');

  const handleSignInClick = () => {
    navigate('/signin');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleTutorialClick = () => {
    
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
  <Grid container spacing={0} className={styles.container}> 

    {!isMobile && (
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
    )}

    <Grid item xs={12} md={6} className={styles.rightContainer}>
  
      <button className={styles.tutorialButton} onClick={handleTutorialClick}>
        <img src={tutorialIcon} alt="Tutorial Icon" className={styles.tutorialIcon} />
        Tutorial
      </button>

      <h2 className={styles.title}>Get Started</h2>

      <Grid container spacing={3} className={styles.buttonContainer}>
        <Grid item xs={5} md={5}>
          <Button text="Log In" onClick={handleSignInClick} />
        </Grid>
        <Grid item xs={5} md={5}>
          <Button text="Sign Up" onClick={handleSignUpClick} />
        </Grid>
      </Grid>

      <Grid item xs={12} className={styles.bottomLogoContainer}>
        <img src={bottomLogo} alt="Bottom Logo" className={styles.bottomLogo} />
      </Grid>
    </Grid>

  </Grid>
</Box>

  );
};

export default GetStarted;