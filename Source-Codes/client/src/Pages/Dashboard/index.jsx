import React from 'react';
import { useState, useEffect } from "react";
import styles from './styles.module.css';
import Slider from '../../Components/Slider';
import Header from '../../Components/Header';
import SearchBar from '../../Components/SearchBar';
import ElevyChat from '../../Components/ElevyChat';
import Stocks from '../../Components/Stocks';
import StockHistory from '../../Components/StockHistory';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData, removeUserData } from "../../Slices/User/AuthSlice/authSlice";
import { useSignoutMutation } from "../../Slices/User/UserSlice/userApiSlice";

const Dashboard = ({ filteredData }) => {

const name1 = useSelector((state) => state.auth.name);
const [modifiedName, setModifiedName] = useState('');
const dispatch = useDispatch();
const [signout] = useSignoutMutation();

// useEffect(() => {
    
//     const handleBackButton = () => {
//     };

//     window.addEventListener('popstate', handleBackButton);

//     return () => {
//       window.removeEventListener('popstate', handleBackButton);
//     };
//   }, []);

  useEffect(() => {
    const names = name1.split(' ');
    let modified = names[0];

    if (names.length > 1) {
      modified += ' ' + names.slice(1).map(name => name.charAt(0) + '.').join(' ');
    }
    setModifiedName(modified);
  }, [name1]);


    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
            <Slider pageType="premium" name={modifiedName}/>
            </div>

            <div className={styles.rightContainer}>
                <div className={styles.headerContainer}>
                    <Header name={name1}/>
                </div>
                <div className={styles.rightColumns}>

                    <div className={styles.col1}>
                        <div className={styles.searchBarContainer}>
                        <SearchBar placeholder="Search for your desired stocks" data={filteredData} />
                        </div>
                        <div className={styles.stocksContainer}>
                        <Stocks filteredData={filteredData} pageType="premium" />
                        </div>
                        <div className={styles.stocksHistoryContainer}>
                            <StockHistory filteredData={filteredData} pageType="premium" />
                        </div>
                    </div>

                    <div className={styles.col2}>
                        <ElevyChat />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;