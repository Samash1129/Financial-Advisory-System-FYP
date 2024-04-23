import React from 'react';
import styles from './styles.module.css';
import Button from '../../Components/Button';
import { useNavigate } from 'react-router-dom';
import background from '../../Assets/Images/background.png'
import bottomLogo from '../../Assets/Images/bottomLogo.png';
import LogoAnimation from '../../Components/LogoAnimation';
import tutorialIcon from '../../Assets/SVGs/Tutorial.svg';

const GetStarted = () => {

  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/signin');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleTutorialClick = () => {
    
  };

  return (
    <div className={styles.container}>

      <div className={styles.leftContainer}>

      <div className={styles.logo}>
      <LogoAnimation animateDiagonal={false} />
      </div>
        <img src={background} alt="Cover Image" className={styles.coverImage} />
      </div>

      <div className={styles.rightContainer}>
      <div className={styles.topRightButton}> {/* Added a container for the top-right button */}
          <button className={styles.tutorialButton} onClick={handleTutorialClick}>
            <img src={tutorialIcon} alt="Tutorial Icon" className={styles.tutorialIcon} />
            Tutorial
          </button>
        </div>
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