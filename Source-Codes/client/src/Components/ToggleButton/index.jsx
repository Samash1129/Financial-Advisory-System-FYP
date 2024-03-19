// import React, { useState } from 'react';
// import styles from './styles.module.css';

// const ToggleButton = ({ label }) => {  // Now accepts a label prop
//   const [isSelected, setIsSelected] = useState(false);

//   const handleToggle = () => {
//     setIsSelected(!isSelected);
//   };

//   return (
//     <button
//       onClick={handleToggle}
//       className={`${styles.customButton} ${isSelected ? styles.selected : styles.notSelected}`}
//     >
//       {label}
//     </button>
//   );
// };

// export default ToggleButton;

import React, { useState } from 'react';
import styles from './styles.module.css';

const ToggleButton = ({ label, onClick }) => { // Accepts two onClick functions as props
  const [isSelected, setIsSelected] = useState(false);

  const handleToggle = () => {
    setIsSelected(!isSelected);
    onClick(); // Call the original onClick function
    // if (additionalOnClick) { // Check if additionalOnClick is provided
    //   additionalOnClick(); // Call the additional onClick function if provided
    // }
  };

  return (
    <button
      onClick={handleToggle}
      className={`${styles.customButton} ${isSelected ? styles.selected : styles.notSelected}`}
    >
      {label}
    </button>
  );
};

export default ToggleButton;
