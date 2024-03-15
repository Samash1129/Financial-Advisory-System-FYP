import React, { useState } from 'react';
import styles from './styles.module.css';
import Elevy from '../../Assets/SVGs/Elevy.svg';
import ElevyGPT from '../../Assets/SVGs/ElevyGPT.svg';
import Send from '../../Assets/SVGs/send.svg';
import user from '../../Assets/SVGs/User.svg';
import PremiumPopup from '../PremiumPopup';

const PremiumStockReports = () => {
    const [showPopup, setShowPopup] = useState(false);

    const openPopup = () => setShowPopup(true);
    const closePopup = () => setShowPopup(false);

    return (
        <div className={styles.overallContainer}>
            <div className={styles.psrContainer}>
                <div className={styles.psrHeader}>
                    <img src={ElevyGPT} alt="Reports" className={styles.psrIcon} />
                    <div className={styles.psrTitleContainer}>
                        <div className={styles.psrMainTitle}>Elevy -</div>
                        <div className={styles.psrCompanyTitle}>Amazon.com, Inc</div> 
                    </div>
                    <div className={styles.psrSpinner}></div>
                </div>
                <div className={styles.psrSummaryContainer}>
                    <div className={styles.psrSummaryItem}>
                        <img src={Elevy} alt="Company Icon" className={styles.psrSummaryIcon} /> 
                        <p className={styles.psrSummaryParagraph}>Based on the provided data, Tesla sold 1,298,434 Model 3 and Model Y vehicles for the fiscal year ending on December 31, 2022. This represents a growth rate of 43.31% compared to the previous year. For the quarter ending on June 30, 2023, Tesla sold 460,211 Model 3 and Model Y vehicles, with a growth rate of 90.04% compared to the same quarter in the previous year.Regarding Elon Musk's thoughts on profit margins, he mentioned in a company transcript that every time Tesla sells a car, it has the ability to enable full self-driving through software updates. This presents a significant upside potential because most cars have Hardware 3, allowing for the sale of full. </p>
                    </div>
                    <hr className={styles.psrSummaryDivider} />
                    <div className={styles.psrOptionsContainer}>
                    <img src={user} alt="Company Icon" className={styles.psrOptionsIcon} /> 
                    <div className={styles.psrActionButtons}>
                        <button className={styles.psrActionButton}>Create a financial plan for me →</button>
                        <button className={styles.psrActionButton}>Rephrase this into something simpler  →</button>
                        <button className={styles.psrActionButton}>What will be the potential risks  →</button>
                        <button className={styles.psrActionButton2} onClick={openPopup}>
                        Generate Detailed Report
                    </button>
                        </div>
                    </div>
                    {showPopup && <PremiumPopup onClose={closePopup} />}
                </div>
            </div>
            <div className={styles.psrInputContainer}>
                    <input type="text" className={styles.psrInputField} placeholder="Message Elevy" />
                    <button className={styles.psrInputButton}>
                    <img src={Send} alt="Reports" className={styles.psrInputIcon} />
                    </button>
                </div>
        </div>
    );
};

export default PremiumStockReports;
