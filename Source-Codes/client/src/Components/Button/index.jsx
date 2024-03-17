import React from 'react';
import styles from './styles.module.css';

const Buttons = ({ text, onClick }) => {
  return (
    <button className={styles.customStaticbutton} onClick={onClick}>
      {text}
    </button>
  );
};

export default Buttons;