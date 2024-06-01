import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useGetFundValQuery } from "../../Slices/StockSlice/stockApiSlice";

const Statistics = ({ isVisible, currentTicker }) => {
  const [fundValHHV, setFundValHHV] = useState('')
  const [fundValHLV, setFundValHLV] = useState('')
  const [fundValPHV, setFundValPHV] = useState('')
  const [fundValPLV, setFundValPLV] = useState('')
  const [fundValPOV, setFundValPOV] = useState('')
  const [fundValPCV, setFundValPCV] = useState('')

  const { data: fundValues, error } = useGetFundValQuery({ companyTicker: currentTicker });

  useEffect(() => {
    if (fundValues && fundValues.result) {
      
      setFundValHHV(fundValues.result.HistoricalHighLow.High.Value.toFixed(2));
      setFundValHLV(fundValues.result.HistoricalHighLow.Low.Value.toFixed(2));
      
      setFundValPHV(fundValues.result.PredictedHighLow.High.Value.toFixed(2));
      setFundValPLV(fundValues.result.PredictedHighLow.Low.Value.toFixed(2));
      
      setFundValPOV(fundValues.result.PredictedOpenClose.Open.Value.toFixed(2));
      setFundValPCV(fundValues.result.PredictedOpenClose.Close.Value.toFixed(2));

    } else if (error) {
      console.error("Failed to fetch close values:", error);
    }
  }, [fundValues, error]);

  return (
    <div
      className={isVisible ? styles.statisticsVisible : styles.statisticsHidden}
    >
      <div className={styles.statisticsPanel}>
        <h2>Stock Statistics</h2>
        <div className={styles.statistic}>
          <span>Historical High:</span>
          <div className={styles.statisticValue}>{fundValHHV}</div>
        </div>
        <div className={styles.statistic}>
          <span>Historical Low:</span>
          <div className={styles.statisticValue}>{fundValHLV}</div>
        </div>
        <div className={styles.statistic}>
          <span>Predicted High:</span>
          <div className={styles.statisticValue}>{fundValPHV}</div>
        </div>
        <div className={styles.statistic}>
          <span>Predicted Low:</span>
          <div className={styles.statisticValue}>{fundValPLV}</div>
        </div>
        <div className={styles.statistic}>
          <span>Predicted Open:</span>
          <div className={styles.statisticValue}>{fundValPOV}</div>
        </div>
        <div className={styles.statistic}>
          <span>Predicted Close:</span>
          <div className={styles.statisticValue}>{fundValPCV}</div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
