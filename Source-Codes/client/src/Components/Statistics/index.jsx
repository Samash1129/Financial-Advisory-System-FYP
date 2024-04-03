import React from "react";
import styles from "./styles.module.css";

const Statistics = ({ isVisible }) => {
  return (
    <div
      className={isVisible ? styles.statisticsVisible : styles.statisticsHidden}
    >
      <div className={styles.statisticsPanel}>
        <h2>Stock Statistics</h2>
        <div className={styles.statistic}>
          <span>Profit:</span>
          <div className={styles.statisticValue}>50,000</div>
        </div>
        <div className={styles.statistic}>
          <span>Dividend:</span>
          <div className={styles.statisticValue}>67,500</div>
        </div>
        <div className={styles.statistic}>
          <span>Share:</span>
          <div className={styles.statisticValue}>4500</div>
        </div>
        <div className={styles.statistic}>
          <span>Equity:</span>
          <div className={styles.statisticValue}>500</div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
