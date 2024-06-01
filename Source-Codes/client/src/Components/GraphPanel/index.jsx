import React, { useEffect, useState } from "react";
import Graph from "../Graph";
import styles from "./styles.module.css";
import Statistics from "../Statistics";
import { useGetCloseValQuery } from "../../Slices/StockSlice/stockApiSlice";

function GraphPanel({ currentTicker }) {
  const [isPanelOpen, setPanelOpen] = useState(true);
  const [closeValues, setCloseValues] = useState([]);
  const [labels, setLabels] = useState([]);
  const [data1, setData1] = useState([]);

  const togglePanel = () => {
    setPanelOpen(!isPanelOpen);
  };

  console.log(currentTicker)

  const { data: closeVals, error } = useGetCloseValQuery({ companyTicker: currentTicker });

  useEffect(() => {
    if (closeVals && closeVals.result) {
      setCloseValues(closeVals.result.HistoricalVal);
      console.log(closeVals.result.HistoricalVal);
    } else if (error) {
      console.error("Failed to fetch close values:", error);
    }
  }, [closeVals, error]);

  useEffect(() => {
    if (closeValues.length > 0) {
      const yearlyData = closeValues.reduce((acc, value) => {
        const year = new Date(value["Date"]).getFullYear();
        if (!acc[year]) {
          acc[year] = { sum: 0, count: 0 };
        }
        acc[year].sum += value["Value"];
        acc[year].count += 1;
        return acc;
      }, {});

      const newLabels = [];
      const newData1 = [];
      for (const year in yearlyData) {
        newLabels.push(year);
        newData1.push(yearlyData[year].sum / yearlyData[year].count);
      }

      setLabels(newLabels);
      setData1(newData1);
    }
  }, [closeValues]);

  console.log(labels);
  console.log(data1);

  return (
    <div className={styles.graphPanel}>
      {isPanelOpen && (
        <div className={styles.contentContainer}>
          <div className={styles.statisticsContent}>
            <Statistics isVisible={isPanelOpen} currentTicker={currentTicker}/>
          </div>
          <div className={styles.graphContent}>
            <Graph labels={labels} data={data1} isVisible={isPanelOpen} />
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
