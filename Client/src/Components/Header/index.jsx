import React from 'react';
import styles from './styles.module.css';
import info from '../../Assets/SVGs/Info.svg';
import reload from '../../Assets/SVGs/Reload.svg';
import edit from '../../Assets/SVGs/Edit.svg';

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerTitle}>My Dashboard</div>
      <div className={styles.headerIcons}>
      <button className={styles.iconContainer} data-tooltip="More Information">
          <img src={info} alt="Info" className={styles.headerIcon} />
        </button>
        <button className={styles.iconContainer} data-tooltip="Edit Preferences">
          <img src={edit} alt="Edit" className={styles.headerIcon} />
        </button>
        <button className={styles.iconContainer} data-tooltip="Reload Page">
          <img src={reload} alt="Reload" className={styles.headerIcon} />
        </button>
      </div>
    </div>
  );
};

export default Header;
