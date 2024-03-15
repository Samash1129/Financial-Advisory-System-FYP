import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import stockicon from '../../Assets/SVGs/stock-icon.svg';
import techicon from '../../Assets/SVGs/tech-icon.svg';
import bankicon from '../../Assets/SVGs/bank-icon.svg';
import searchIcon from '../../Assets/SVGs/search-icon.svg';

const SearchBar = ({ placeholder, data }) => {
    const [inputValue, setInputValue] = useState(''); // State for the input value
    const [filteredData, setFilteredData] = useState(data); // State for the filtered data
    const inputRef = useRef(null); // Ref for the input element
    const [isSearchClicked, setIsSearchClicked] = useState(false);

    // Effect for filtering data based on input
    useEffect(() => {
        const filtered = inputValue === ''
            ? data
            : data.filter(item =>
                item.name.toLowerCase().includes(inputValue.toLowerCase())
            );
        setFilteredData(filtered);
    }, [inputValue, data]);

    const handleSearchClick = () => {
        setIsSearchClicked(true);
    };

    const handleOutsideClick = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            setIsSearchClicked(false);
        }
    };

    // Effect to reset the filter when the input is clicked
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const getIconPath = (category) => {
        switch (category) {
            case 'Banking':
                return bankicon;
            case 'Technology':
                return techicon;
            case 'Stocks':
                return stockicon;
            default:
                return 'default-icon';
        }
    };

    return (
        <div className={styles.searchContainer}>
            <div className={styles.inputWrapper}>
                <img src={searchIcon} alt="Search" className={styles.searchIcon} />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onClick={handleSearchClick}
                    className={styles.searchInput}
                />
            </div>
            {isSearchClicked && (
                <ul className={styles.searchResults}>
                    {filteredData.map(item => (
                        <li key={item.symbol} className={styles.searchItem}>
                            <img
                                src={getIconPath(item.category)}
                                alt={`${item.name} icon`}
                                className={styles.icon}
                            />
                            <div className={styles.itemInfo}>
                                <div className={styles.symbol}>{item.symbol}</div>
                                <div className={styles.name}>{item.name}</div>
                            </div>
                            <div className={styles.searchPrice}>Rs. {item.price}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>

    );

};

export default SearchBar;