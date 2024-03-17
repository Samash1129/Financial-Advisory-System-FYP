import React from 'react';
import styles from './styles.module.css';
import Slider from '../../Components/Slider';
import Header from '../../Components/Header';
import SearchBar from '../../Components/SearchBar';
import StockReports from '../../Components/StockReports';
import Stocks from '../../Components/Stocks';
import PremiumPopup from '../../Components/PremiumPopup';

const DashRegular = ({ filteredData }) => {

    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <Slider />
            </div>

            <div className={styles.rightContainer}>
                <div className={styles.headerContainer}>
                    <Header />
                </div>
                <div className={styles.rightColumns}>

                    <div className={styles.col1}>
                        <div className={styles.searchBarContainer}>
                            <SearchBar placeholder="Search your desired stocks" />
                        </div>
                        <div className={styles.stocksContainer}>
                            <Stocks filteredData={filteredData} />
                        </div>
                    </div>

                    <div className={styles.col2}>
                        <StockReports />
                    </div>

                </div>


            </div>

        </div>

    );
};

export default DashRegular;