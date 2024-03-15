import React from 'react';
import styles from './styles.module.css';
import Done from '../../Assets/SVGs/Done.svg';

const ProcessingPopup = ({ onClose, isprocessingComplete }) => {
    
    return (
        <div className={styles.processingPopupContainer}>
            <div className={styles.processingPopupBackground} onClick={onClose}></div>
            <div className={styles.processingPopupContent}>
                {isprocessingComplete ? (
                    <div className={styles.processingDoneContainer}>
                        <img src={Done} alt="Done" className={styles.doneIcon} />
                        <p className={styles.processingDoneText}>Transaction Successful!</p>
                    </div>
                ) : (
                    <div className={styles.processingLoadingSpinnerContainer}>
                        <div className={styles.processingSpinner}></div>
                        <p className={styles.processingLoadingText}>processing</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProcessingPopup;
