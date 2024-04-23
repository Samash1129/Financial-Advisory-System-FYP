import React, { useState } from "react";
import Graph from "../Graph";
import styles from "./styles.module.css";
import Statistics from "../Statistics";

function GraphPanel() {
  const [isPanelOpen, setPanelOpen] = useState(true);

  const togglePanel = () => {
    setPanelOpen(!isPanelOpen);
  };

  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const data = [65, 59, 80, 81, 56, 55, 40];

  return (
    <div className={styles.graphPanel}>
      {isPanelOpen && (
        <div className={styles.contentContainer}>
          <div className={styles.statisticsContent}>
            <Statistics isVisible={isPanelOpen} />
          </div>
          <div className={styles.graphContent}>
            <Graph labels={labels} data={data} isVisible={isPanelOpen} />
          </div>
        </div>
      )}
      <div className={styles.toggleIcon} onClick={togglePanel}>
        Click to {isPanelOpen ? "hide" : "view"} statistics
      </div>
    </div>
  );
}

export default GraphPanel;
