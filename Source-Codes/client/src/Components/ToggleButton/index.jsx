import React, { useState } from "react";
import styles from "./styles.module.css";

const ToggleButton = ({ label, onClick, isSelected }) => {

  return (
    <button
      onClick={onClick}
      className={`${styles.customButton} ${
        isSelected ? styles.selected : styles.notSelected
      }`}
    >
      {label}
    </button>
  );
};

export default ToggleButton;
