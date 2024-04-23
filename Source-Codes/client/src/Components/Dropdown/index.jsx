import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import DropLogo from '../../Assets/SVGs/Drop.svg';
import DropWhiteLogo from '../../Assets/SVGs/DropWhite.svg';

const Dropdown = ({ options, onOptionSelect, selectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const logo = selectedOption ? DropWhiteLogo : DropLogo;
  const headerStyles = selectedOption ? { backgroundColor: '#3692FF', color: '#fff' } : {};

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    onOptionSelect(option); // Call the callback function with the selected option
  };

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <div
        className={styles.dropdownHeader}
        onClick={handleToggle}
        style={headerStyles}
      >
        {selectedOption || 'Choose your desired option'}
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
