import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import tut from '../../Assets/SVGs/tut.svg';
import reload from '../../Assets/SVGs/Reload.svg';
import edit from '../../Assets/SVGs/Edit.svg';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NavLogo from '../../Assets/Images/navlogo.png';

const DashNavbar = ({name, onClick}) => {
    const navigate = useNavigate();
    const handlePreferencesClick = () => {
        navigate('/preferences');
    };

    return (
        <AppBar position="static" className={styles.navbar}>
        <Toolbar className={styles.toolbar}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onClick}
          >
            <img src={NavLogo} className={styles.navLogo} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily:"Outfit", fontSize:"35px" }}>
            {name}
          </Typography>
          <div className={styles.headerIcons}>
                <button className={styles.iconContainer} data-tooltip="Edit Preferences" onClick={handlePreferencesClick}>
                    <img src={edit} alt="Edit" className={styles.headerIcon} />
                </button>
                <button className={styles.iconContainer} data-tooltip="Download PDF">
                    <img src={reload} alt="Reload" className={styles.headerIcon} />
                </button>
                <button className={styles.iconContainer} data-tooltip="Watch Tutorial">
                    <img src={tut} alt="Tut" className={styles.headerIcon} />
                </button>
            </div>
        </Toolbar>
        </AppBar>
    );
};
export default DashNavbar;