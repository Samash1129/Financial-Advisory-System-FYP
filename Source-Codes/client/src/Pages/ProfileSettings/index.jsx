import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import Button from '../../Components/Button';
import NavBar from '../../Components/NavBar';
import backgroundImage from '../../Assets/Images/background.png';
import LogoAnimation from '../../Components/LogoAnimation';
import { useDispatch, useSelector } from 'react-redux';
import { setPreviousPage } from '../../Slices/PageSlice/pageSlice';
import { useUpdateUserMutation } from '../../Slices/User/UserSlice/userApiSlice';
import { setUserData } from '../../Slices/User/AuthSlice/authSlice';
import LoadingSpinner from '../../Components/LoadingAnimation';

const ProfileSettings = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [topError, setTopError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const previousPage = useSelector((state) => state.previousPage.previousPage);
  const currentUserData = useSelector((state) => state.auth);

  useEffect(() => {
    setName(currentUserData.name);
    setEmail(currentUserData.email);
  }, [currentUserData.email, currentUserData.name]);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword.length < 8 && newPassword.length!=0) {
      setPasswordError('Password must be at least 8 characters long.');
    } 
    else if (newPassword.length==0)
    { setPasswordError(''); }
    else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setTopError('');
    if (value !== password) {
      setConfirmPasswordError('Passwords do not match.');
    } 
    else if (value.length==0)
    { setConfirmPasswordError(''); }
    else {
      setConfirmPasswordError('');
    }
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    if (newName.length === 0) {
      setNameError('Name cannot be empty.');
    } else {
      setNameError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nameError || passwordError || confirmPasswordError) {
      return;
    }

    try {
      const res = await updateUser({
        name,
        password
      }).unwrap();
      console.log(res);

      dispatch(setUserData({ token:currentUserData.token, name:res.name, email:currentUserData.email, preferences:currentUserData.preferences}));

      navigate('/dashboard');

    } catch (err) {
      //console.error(err);
    }
  };

  const handleBackButtonClick = () => {
    navigate('/dashboard');
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
        {isLoading && <LoadingSpinner loadingText="Updating Profile" />}
        <div className={styles.profileSettingsContainer}>
          <NavBar title="Profile Settings" handleBackButtonClick={handleBackButtonClick} />
          {topError && <div className={styles.topError}>{topError}</div>}
          <form className={styles.profileSettingsForm} onSubmit={handleSubmit}>
            <label htmlFor="name">FULL NAME</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={handleNameChange}
            />
            {nameError && <div className={styles.errorMessage}>{nameError}</div>}

            <label htmlFor="email">EMAIL ADDRESS</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              value={email}
              readOnly  
              className={styles.emailInput}
              style={{ backgroundColor: '#dddddd' }}
            />
            {emailError && <div className={styles.errorMessage}>{emailError}</div>}

            <label htmlFor="password">NEW PASSWORD</label>
            <input type="password" id="password" placeholder="Enter your password" value={password} onChange={handlePasswordChange} />
            {passwordError && <div className={styles.errorMessage}>{passwordError}</div>}

            <label htmlFor="confirm-password">CONFIRM NEW PASSWORD</label>
              <input type="password" id="confirm-password" placeholder="Confirm your password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
              {confirmPasswordError && <div className={styles.errorMessage}>{confirmPasswordError}</div>}

            <Button text="Save"/>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;