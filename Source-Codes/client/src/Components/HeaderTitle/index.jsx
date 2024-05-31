import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import tut from '../../Assets/SVGs/tut.svg';
import reload from '../../Assets/SVGs/Reload.svg';
import edit from '../../Assets/SVGs/Edit.svg';

const HeaderTitle = ({name}) => {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerTitle}>{name}</div>
        </div>
    );
};
export default HeaderTitle;