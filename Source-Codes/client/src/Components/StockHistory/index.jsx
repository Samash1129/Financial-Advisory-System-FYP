import React from 'react';
import styles from './styles.module.css';
import stockicon from '../../Assets/SVGs/stock-icon.svg';
import techicon from '../../Assets/SVGs/tech-icon.svg';
import bankicon from '../../Assets/SVGs/bank-icon.svg';
import History from '../../Assets/SVGs/History.svg';
import { useGetHistoryStockQuery } from '../../Slices/StockSlice/stockApiSlice';
import { useDispatch } from 'react-redux';
import { setHistoryStock } from '../../Slices/StockSlice/stockSlice';

// const getIconPath = (category) => {
//     switch (category) {
//         case 'Banking':
//             return bankicon;
//         case 'Technology':
//             return techicon;
//         case 'Stocks':
//             return stockicon;
//         default:
//             return 'default-icon';
//     }
// };
const SkeletonLoader = () => (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonIcon}></div>
      <div className={styles.skeletonText}></div>
    </div>
  );

const StockHistory = ({ pageType }) => {

    const dispatch = useDispatch();
    const { data: recentStocks, isLoading } = useGetHistoryStockQuery();

    dispatch(setHistoryStock(recentStocks));

    return (
        <div className={styles.shSearchContainer}>
            <div className={styles.sRecent}>
                <img src={History} alt="Recommended" className={styles.sRecentIcon} />
                <div className={styles.sRecentTitle}>Recently Viewed</div>
            </div>
            <ul className={`${styles.shSearchResults} ${pageType === 'premium' ? styles.shpremiumResults : ''} ${styles.scrollbar}`}>
            {isLoading ? (
          // Display skeleton loader while data is loading
          <>
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </>
        ) : recentStocks ? (
                    recentStocks.map((item, index) => (
                        <li key={item.tickerSymbol} className={styles.shSearchItem}>
                            {/* Add span for numbering */}
                            {/* <span className={styles.listNumber}>{index + 1}</span> */}
                            {/* <img
                                src={getIconPath(item.category)}
                                alt={`${item.securityName} icon`}
                                className={styles.shIcon}
                            /> */}
                            <div className={styles.shItemInfo}>
                                <div className={styles.shSymbol}>{item.tickerSymbol}</div>
                                <div className={styles.shName}>{item.securityName}</div>
                            </div>
                        </li>
                    ))
                ) : (
                    <div>No recently viewed stocks available</div>
                )}
            </ul>
        </div>
    );
};

export default StockHistory;