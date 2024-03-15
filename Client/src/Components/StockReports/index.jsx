import React from 'react';
import styles from './styles.module.css';
import ReportIcon from '../../Assets/SVGs/ReportIcon.svg';
import Elevy from '../../Assets/SVGs/Elevy.svg';

const StockReports = () => {
    return (
      <div className={styles.overallContainer}>
        <div className={styles.srContainer}>
            <div className={styles.srHeader}>
                <img src={ReportIcon} alt="Reports" className={styles.srIcon} />
                <div className={styles.titleContainer}>
                    <div className={styles.mainTitle}>Stock Reports -</div>
                    <div className={styles.companyTitle}>Amazon.com, Inc</div>
                </div>
                <div className={styles.loader}></div>
            </div>
            <div className={styles.summaryContainer}>
                <div className={styles.summaryItem}>
                    <img src={Elevy} alt="Company Icon" className={styles.summaryIcon} />
                    <p className={styles.summaryParagraph}>Based on the provided data, Tesla sold 1,298,434 Model 3 and Model Y vehicles for the fiscal year ending on December 31, 2022. This represents a growth rate of 43.31% compared to the previous year. For the quarter ending on June 30, 2023, Tesla sold 460,211 Model 3 and Model Y vehicles, with a growth rate of 90.04% compared to the same quarter in the previous year. Regarding Elon Musk's thoughts on profit margins, he mentioned in a company transcript that every time Tesla sells a car, it has the ability to enable full self-driving through software updates. This presents a significant upside potential because most cars have Hardware 3, allowing for the sale of full.</p>
                </div>
            </div>
        </div>
        <div className={styles.buttonContainer}>
            <button className={styles.button}>Generate Detailed Report</button>
            <button className={styles.button}>Chat With Elevy</button>
        </div>
      </div>      
    );
};

export default StockReports;
