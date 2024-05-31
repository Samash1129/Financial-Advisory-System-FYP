import React from 'react';
import { useState, useEffect } from "react";
import styles from './styles.module.css';
import riseicon from '../../Assets/SVGs/Riseicon.svg';
import { useSelector, useDispatch } from "react-redux";
import { updateCurrentChatHistory, updateCurrentTicker, updateCurrentConvoID } from "../../Slices/User/AuthSlice/authSlice";
import { bankNames } from '../../constants';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const SkeletonLoader = () => (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonIcon}></div>
      <div className={styles.skeletonText}></div>
    </div>
  );

const Stocks = ({ pyRunning }) => {

    const userState = useSelector(state => state.auth);
    const stockResultState = useSelector(state => state.stockSearch);
    const dispatch = useDispatch();
    const [searchData, setSearchData] = useState();

    useEffect(() => {
        if (pyRunning===1) {
            setSearchData(bankNames);
            
        }
        else
        {
            setSearchData();
        }
        
      }, [pyRunning]);


    const handleItemClick = (tickerSymbol) => {
        dispatch(updateCurrentChatHistory([]));
        if (pyRunning===1) { dispatch(updateCurrentTicker(tickerSymbol)); }
        dispatch(updateCurrentConvoID(""));
    };


    return (
        <div className={styles.ssearchContainer}>
            <div className={styles.srecommended}>
                <img src={riseicon} alt="Recommended" className={styles.srecommendedIcon} />    
                <div className={styles.srecommendedTitle}>Recommended Stocks</div> 
                
            </div>
           
            <ul className={styles.ssearchResults}>
                {pyRunning===0 && <div>
                    <SkeletonLoader />
                    <SkeletonLoader />
                    <SkeletonLoader />
                </div>}
            { pyRunning===1 && searchData &&
          searchData.map((item, index) => (
                        <li key={item.tickerSymbol} 
                        className={`${styles.ssearchItem} ${
                            item.tickerSymbol === userState.currentTicker &&
                            userState.currentConvoID === ""
                              ? styles.highlight
                              : ""
                          }`}
                        >
                            {searchData.length>1 &&<span className={styles.listNumber}>{index + 1}</span> }
                            <div
                            className = {styles.sitemInfo}
                            onClick={() => handleItemClick(item.tickerSymbol)}
                            >
                                <div className={styles.ssymbol}>{item.tickerSymbol}</div>
                                <div className={styles.sname}>{item.securityName}</div>
                            </div>
                            <div className={styles.sprice}>Rs. {item.stockPrice}</div>
                        </li>
                    ))
                }
                
                {pyRunning===-1 &&
                <div className={styles.errorText}>
                    <ReportProblemIcon className={styles.warningIcon}/>
                    &nbsp;&nbsp;Stocks can't be loaded
                </div>
                }

                {pyRunning===1 && !searchData &&
                <div className={styles.emptyStocks}>
                    Search for stocks or generate recommendations
                </div>
                }
                
                
            </ul>
        </div>
    );
};

export default Stocks;
