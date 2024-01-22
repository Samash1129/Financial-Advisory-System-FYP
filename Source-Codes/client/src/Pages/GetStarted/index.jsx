import React from 'react';
import styles from './styles.module.css';
import Button from '../../Components/Button';
import { useNavigate } from 'react-router-dom';
import blankBackground from '../../Assets/Images/blankBackground.png';
import background from '../../Assets/Images/background.png'
import bottomLogo from '../../Assets/Images/bottomLogo.png';
import LogoAnimation from '../../Components/LogoAnimation';

const GetStarted = () => {

  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/signin');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className={styles.container}>

    <div className={styles.leftContainer}>
    
    {/* <LogoAnimation>
    <img src={blankBackground} alt="Cover Image" className={styles.coverImage} />
    </LogoAnimation> */}
    <img src={background} alt="Cover Image" className={styles.coverImage} />
    </div>

    <div className={styles.rightContainer}>
        <h2 className={styles.title}>Get Started</h2>
        <div className={styles.buttonContainer}>
        <Button text="Log In" onClick={handleSignInClick} />
        <Button text="Sign Up" onClick={handleSignUpClick} />
        </div>
        <img src={bottomLogo} alt="Bottom Logo" className={styles.bottomLogo} />
    </div>

    </div>
  );
};

export default GetStarted;