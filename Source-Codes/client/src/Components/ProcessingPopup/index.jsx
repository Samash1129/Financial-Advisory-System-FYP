import React from 'react';
import styles from './styles.module.css';
import animationData from '../../Assets/Animations/Tickk.json';
import animationData2 from '../../Assets/Animations/Cross.json'; // Import the Cross animation JSON
import Lottie from 'react-lottie';

const ProcessingPopup = ({ onClose, isProcessingComplete, isProcessingFailed }) => {
    const successOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData, // Your Lottie animation JSON data for successful transaction
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const failureOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData2, // Your Lottie animation JSON data for failed transaction
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className={styles.processingPopupContainer}>
            <div className={styles.processingPopupBackground} onClick={onClose}></div>
            <div className={styles.processingPopupContent}>
                {isProcessingComplete ? (
                    <div className={styles.processingDoneContainer}>
                        <Lottie options={successOptions} height={200} width={200} />
                        <p className={styles.processingDoneText}>Transaction Successful!</p>
                    </div>
                ) : isProcessingFailed ? (
                    <div className={styles.processingFailedContainer}>
                        <Lottie options={failureOptions} height={100} width={100} />
                        <p className={styles.processingFailedText}>Transaction Failed!</p>
                    </div>
                ) : (
                    <div className={styles.processingLoadingSpinnerContainer}>
                        <div className={styles.processingSpinner}></div>
                        <p className={styles.processingLoadingText}>Processing</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProcessingPopup;
