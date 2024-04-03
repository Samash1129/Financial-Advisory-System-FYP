import React from 'react';
import styles from './styles.module.css';
import stockicon from '../../Assets/SVGs/stock-icon.svg';
import techicon from '../../Assets/SVGs/tech-icon.svg';
import bankicon from '../../Assets/SVGs/bank-icon.svg';
import riseicon from '../../Assets/SVGs/Riseicon.svg';
import { useGetRecommendedStocksQuery } from '../../Slices/StockSlice/stockApiSlice';
import { useDispatch } from 'react-redux';
import { setRecommendedStocks } from '../../Slices/StockSlice/stockSlice';
import LoadingSpinner from '../LoadingAnimation';

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

const Stocks = ({ pageType }) => {

    const dispatch = useDispatch();
    const { data: recommendedStocks, isLoading } = useGetRecommendedStocksQuery();

    dispatch(setRecommendedStocks(recommendedStocks));

    return (
        <div className={styles.ssearchContainer}>
            <div className={styles.srecommended}>
                <img src={riseicon} alt="Recommended" className={styles.srecommendedIcon} />
                <div className={styles.srecommendedTitle}>Recommended Stocks</div>
            </div>
            <ul className={`${styles.ssearchResults} ${pageType === 'premium' ? styles.premiumResults : ''}`}>
                {isLoading ? (
                    <LoadingSpinner loadingText={'Loading Recommended Stocks...'}/>
                ) : recommendedStocks ? (
                    recommendedStocks.map((item, index) => (
                        <li key={item.tickerSymbol} className={styles.ssearchItem}>
                            {/* Add span for numbering */}
                            <span className={styles.listNumber}>{index + 1}</span>
                            <img
                                src={getIconPath(item.category)}
                                alt={`${item.securityName} icon`}
                                className={styles.sicon}
                            />
                            <div className={styles.sitemInfo}>
                                <div className={styles.ssymbol}>{item.tickerSymbol}</div>
                                <div className={styles.sname}>{item.securityName}</div>
                            </div>
                            <div className={styles.sprice}>Rs. {item.stockPrice}</div>
                        </li>
                    ))
                ) : (
                    <div>No recommended stocks available</div>
                )}
            </ul>
        </div>
    );
};

export default Stocks;
