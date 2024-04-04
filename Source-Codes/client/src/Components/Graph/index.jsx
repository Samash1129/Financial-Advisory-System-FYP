import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import styles from "./styles.module.css";

const Graph = ({ labels, data, isVisible }) => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    if (isVisible && chartRef.current) {
      // Destroy previous chart instance if exists
      if (chartInstance) {
        chartInstance.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        chartInstance = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Sales",
                data: data,
                fill: false,
                borderColor: "rgba(255, 255, 255, 0.7)",
                tension: 0.02,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                labels: {
                  font: {
                    family: "Outfit", // Set font family
                    size: 14, // Set font size
                  },
                  color: "white", // Set label text color
                },
              },
            },
            scales: {
              x: {
                grid: {
                  display: true,
                  color: "rgba(255, 255, 255, 0.7)", // Adjust grid color
                },
                ticks: {
                  font: {
                    family: "Outfit", // Set font family
                    size: 14, // Set font size
                  },
                  color: "white", // Set tick text color
                },
                max: labels.length + 2
              },
              y: {
                grid: {
                  display: true,
                  color: "rgba(255, 255, 255, 0.7)", // Adjust grid color
                },
                ticks: {
                  font: {
                    family: "Outfit", // Set font family
                    size: 12, // Set font size
                  },
                  color: "white", // Set tick text color
                },
              },
            },
          },
        });
      }
    }

    // Cleanup function
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [labels, data, isVisible]);

  const canvasStyle = {
    width: "430px", // Stretch the x-axis to fill the container
    height: "120px", // Maintain aspect ratio
  };

  return <canvas ref={chartRef} style={canvasStyle}></canvas>;
};

export default Graph;
