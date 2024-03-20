import React from 'react';
import styles from './styles.module.css';
import stockicon from '../../Assets/SVGs/stock-icon.svg';
import techicon from '../../Assets/SVGs/tech-icon.svg';
import bankicon from '../../Assets/SVGs/bank-icon.svg';
import History from '../../Assets/SVGs/History.svg';

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

const StockHistory = ({ filteredData, pageType }) => {
    return (
        <div className={styles.shSearchContainer}>
            <div className={styles.sRecent}>
                <img src={History} alt="Recommended" className={styles.sRecentIcon} />
                <div className={styles.sRecentTitle}>Recently Viewed</div>
            </div>
            <ul className={`${styles.shSearchResults} ${pageType === 'premium' ? styles.shpremiumResults : ''} ${styles.scrollbar}`}>
                {filteredData.map((item) => (
                    <li key={item.symbol} className={styles.shSearchItem}>
                        <img
                            src={getIconPath(item.category)}
                            alt={`${item.name} icon`}
                            className={styles.shIcon}
                        />
                        <div className={styles.shItemInfo}>
                            <div className={styles.shSymbol}>{item.symbol}</div>
                            <div className={styles.shName}>{item.name}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StockHistory;