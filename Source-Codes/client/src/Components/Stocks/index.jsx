import React from 'react';
import { useState, useEffect } from "react";
import styles from './styles.module.css';
import riseicon from '../../Assets/SVGs/Riseicon.svg';
import { useSelector, useDispatch } from "react-redux";
import { updateCurrentChatHistory, updateCurrentTicker, updateCurrentConvoID } from "../../Slices/User/AuthSlice/authSlice";
import { bankNames } from '../../constants';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { getRecommendedStocks } from "../../Slices/StockSlice/stockSlice";
import { useGetRecommendedStocksMutation, useGetAllStocksMutation } from "../../Slices/StockSlice/stockApiSlice";
import { setRecommendedStocks, setAllStocks } from "../../Slices/StockSlice/stockSlice";

const SkeletonLoader = () => (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonIcon}></div>
      <div className={styles.skeletonText}></div>
    </div>
  );

const Stocks = ({ pyRunning }) => {

    const userState = useSelector(state => state.auth);
    const recStockState = useSelector(state => state.stockSlice);
    const stockResultState = useSelector(state => state.stockSearch);
    const dispatch = useDispatch();
    const [searchData, setSearchData] = useState();
    const [recStocks, setRecStocks] = useState([]);
    const allStocks = useSelector((state) => state.stockSlice.allStocks);

    useEffect(() => {
        if (pyRunning===1) {
            setSearchData(bankNames);
            
        }
        else
        {
            setSearchData();
        }
        
      }, [pyRunning]);

      useEffect(() => {
        setRecStocks(recStockState.recommendedStocks.recommendedStocks);
        // console.log("State var: ", recStockState.recommendedStocks.recommendedStocks);
        // console.log("Current stocks rec: ", recStocks);
      }, [recStockState]);


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
            { pyRunning===1 && recStocks &&
          recStocks.map((item, index) => (
                        <li key={item.Ticker} 
                        className={`${styles.ssearchItem} ${
                            item.Ticker === userState.currentTicker &&
                            userState.currentConvoID === ""
                              ? styles.highlight
                              : ""
                          }`}
                        >
                            {recStocks.length>1 &&<span className={styles.listNumber}>{index + 1}</span> }
                            <div
                            className = {styles.sitemInfo}
                            onClick={() => handleItemClick(item.Ticker)}
                            >
                                <div className={styles.ssymbol}>{item.Ticker}</div>
                                <div className={styles.sname}>{item.Name}</div>
                            </div>
                            <div className={styles.sprice}>Rs.{" "}
                            {allStocks &&
                                allStocks
                                    .filter((stock) => stock.Ticker === item.Ticker)
                                    .map((stock) => stock.Price)}
                            </div>
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
