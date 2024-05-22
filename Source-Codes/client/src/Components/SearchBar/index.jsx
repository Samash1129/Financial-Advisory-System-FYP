import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import stockicon from '../../Assets/SVGs/stock-icon.svg';
import techicon from '../../Assets/SVGs/tech-icon.svg';
import bankicon from '../../Assets/SVGs/bank-icon.svg';
import searchIcon from '../../Assets/SVGs/search-icon.svg';
import { bankNames } from '../../constants';
import { useSelector, useDispatch } from "react-redux";
import { setStockSearchData, removeStockSearchData } from "../../Slices/StockSlice/stockSearchSlice";
import { updateCurrentChatHistory, updateCurrentTicker, updateCurrentConvoID } from "../../Slices/User/AuthSlice/authSlice";
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';

import InputAdornment from '@mui/material/InputAdornment';

const useStyles = makeStyles({
    root: {
      '& .MuiInputBase-root': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Example custom background color
        borderRadius: '7px',
        border: 'none'
      },
      '& .MuiInputAdornment-root': {
        color: 'white', 
        cursor: 'default'
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none', // Example custom border color when focused
        
      },
      '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: 'none', // Example custom border color when focused
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: 'none', // Example custom border color when focused
      },
    },
  });

const SearchBar = () => {
    const [inputValue, setInputValue] = useState(''); // State for the input value
    const [filteredData, setFilteredData] = useState(bankNames); // State for the filtered data
    const inputRef = useRef(null); // Ref for the input element
    const [isSearchClicked, setIsSearchClicked] = useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();
    const stock = useSelector((state) => state.stockSearch.searchedStock);
    
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        const filtered = value === ''
            ? bankNames
            : bankNames.filter(item =>
                item.securityName.toLowerCase().includes(value.toLowerCase())
            );
        setFilteredData(filtered);
    };

    const handleSearchClick = () => {
        setIsSearchClicked(true);
        dispatch(setStockSearchData({ searchedStock: "" }));
    };

    const searchStock = (stock) => {
        dispatch(setStockSearchData({ searchedStock: stock }));
        setIsSearchClicked(false);
        dispatch(updateCurrentChatHistory([]));
        dispatch(updateCurrentTicker(stock.tickerSymbol));
        dispatch(updateCurrentConvoID(""));
    };

    const handleOutsideClick = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            setIsSearchClicked(false);
            dispatch(setStockSearchData({ searchedStock: "" }));
        }
    };
    

    useEffect(() => {
        
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);


    return (
        <div className={styles.searchContainer} ref={inputRef}> 

        <TextField
        placeholder="Search all stocks"
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleSearchClick}
        autoComplete="off"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        classes={{
            root: classes.root,
          }}
      />
            
            {isSearchClicked && (
                <ul className={styles.searchResults}>
                    {filteredData.map(item => (
                        <li key={item.tickerSymbol} className={styles.searchItem} onClick={() => searchStock(item)}>
                            <div className={styles.itemInfo}>
                                <div className={styles.symbol}>{item.tickerSymbol}</div>
                                <div className={styles.name}>{item.securityName}</div>
                            </div>
                            <div className={styles.searchPrice}>Rs. {item.stockPrice}</div>
                            
                        </li>
                    ))}
                   
                </ul>
            )}
        </div>
    );
};
export default SearchBar;