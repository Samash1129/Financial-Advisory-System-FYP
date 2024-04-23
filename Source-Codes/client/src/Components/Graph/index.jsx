import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Graph = ({ labels, data, isVisible }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");
    if (!ctx || !isVisible) return;

    // Destroy previous chart instance if exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
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
            max: labels.length + 2,
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

    // Cleanup function
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [labels, data, isVisible]);

  const canvasStyle = {
    width: "40%",
    height: "70%",
  };

  return <canvas ref={chartRef} style={canvasStyle}></canvas>;
};

export default Graph;