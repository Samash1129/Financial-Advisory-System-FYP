import React from 'react';
import styles from './styles.module.css';
import stockicon from '../../Assets/SVGs/stock-icon.svg';
import techicon from '../../Assets/SVGs/tech-icon.svg';
import bankicon from '../../Assets/SVGs/bank-icon.svg';
import riseicon from '../../Assets/SVGs/Riseicon.svg';

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

const Stocks = ({ filteredData }) => {
    return (
      <div className={styles.ssearchContainer}>
        <div className={styles.srecommended}>
        <img src={riseicon} alt="Recommended" className={styles.srecommendedIcon} />
        <div className={styles.srecommendedTitle}>Recommended Stocks</div>
      </div>
      <ul className={styles.ssearchResults}>
        {filteredData.map((item, index) => ( // Add index parameter
          <li key={item.symbol} className={styles.ssearchItem}>
          {/* Add span for numbering */}
          <span className={styles.listNumber}>{index + 1}</span>
          <img 
            src={getIconPath(item.category)} 
            alt={`${item.name} icon`} 
            className={styles.sicon} 
          />
            <div className={styles.sitemInfo}>
              <div className={styles.ssymbol}>{item.symbol}</div>
              <div className={styles.sname}>{item.name}</div>
            </div>
            <div className={styles.sprice}>Rs. {item.price}</div>
          </li>
        ))}
      </ul>
      </div>
    );
  };

export default Stocks;