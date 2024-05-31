import React, { useState } from "react";
import styles from "./styles.module.css";

const ToggleButton = ({ label, onClick, isSelected, isRestricted }) => {

  const buttonClassNames = `${styles.customButton} ${
    isSelected ? styles.selected : styles.notSelected
  } ${isRestricted ? styles.restricted : ""}`;

  return (
    <button
      onClick={onClick}
      className={buttonClassNames}
    >
      {label}
    </button>
  );
};

export default ToggleButton;
