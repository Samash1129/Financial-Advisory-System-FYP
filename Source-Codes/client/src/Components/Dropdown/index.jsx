import React, { useState } from 'react';
import styles from './styles.module.css';
import DropLogo from '../../Assets/SVGs/Drop.svg';
import DropWhiteLogo from '../../Assets/SVGs/DropWhite.svg';

const Dropdown = ({ options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
  
    // Determine which logo to use based on whether an option is selected
    const logo = selectedOption ? DropWhiteLogo : DropLogo;
  
    // Determine the styles for the dropdown header based on whether an option is selected
    const headerStyles = selectedOption
      ? { backgroundColor: '#3692FF', color: '#fff' }
      : {};
  
    const handleToggle = () => {
      setIsOpen(!isOpen);
    };
  
    const handleOptionClick = (option) => {
      setSelectedOption(option);
      setIsOpen(false);
    };
  
    return (
      <div className={styles.dropdownContainer}>
        <div 
          className={styles.dropdownHeader} 
          onClick={handleToggle}
          style={headerStyles} // Apply the dynamic styles
        >
          {selectedOption || 'Choose your desired income'}
          <img src={logo} className={styles.dropdownLogo} alt="drop" />
        </div>
        {isOpen && (
          <div className={styles.dropdownListContainer}>
            <ul className={styles.dropdownList}>
              {options.map((option, index) => (
                <li
                  key={index}
                  className={`${styles.dropdownListItem} ${selectedOption === option ? styles.selected : ''}`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  export default Dropdown;