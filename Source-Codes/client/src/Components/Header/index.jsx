import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import tut from '../../Assets/SVGs/tut.svg';
import reload from '../../Assets/SVGs/Reload.svg';
import edit from '../../Assets/SVGs/Edit.svg';

const Header = ({name}) => {
    const navigate = useNavigate();
    const handlePreferencesClick = () => {
        // Navigate to the /preferences route
        navigate('/preferences');
    };
    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerTitle}>My Dashboard </div>
            {/* <div className={styles.userName}>{name}</div> */}
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
        </div>
    );
};
export default Header;