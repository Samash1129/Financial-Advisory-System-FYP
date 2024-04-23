import React from 'react';
import styles from './styles.module.css';
import Slider from '../../Components/Slider';
import Header from '../../Components/Header';
import SearchBar from '../../Components/SearchBar';
import PremiumStockReports from '../../Components/PremiumStockReports';
import Stocks from '../../Components/Stocks';
import StockHistory from '../../Components/StockHistory';

const DashboardPremium = ({ filteredData }) => {

    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
            <Slider pageType="premium" />
            </div>

            <div className={styles.rightContainer}>
                <div className={styles.headerContainer}>
                    <Header />
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
                        <PremiumStockReports />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPremium;