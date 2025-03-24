// PolarChart.js
import React from "react";
import Chart from "react-apexcharts";

const PolarChart = () => {
  // supplierData.js
  const supplierData = {
    labels: [
      "JIANGXI KELAM",
      "BEYRON LTD",
      "CJ BIO MALAYSIN",
      "CJ CHEILJEDANG",
      "DAESANG CORPORATION",
    ],
    series: [45, 35, 50, 30, 40], // Gross weights
  };

  const options = {
    chart: {
      type: "polarArea",
    },
    labels: supplierData.labels, // Use imported labels
    series: supplierData.series, // Use imported series
    stroke: {
      colors: ["#fff"],
    },
    fill: {
      opacity: 0.8,
    },
    legend: {
      position: "right",
    },
    title: {
      text: "Supplier Info",
      align: "left",
    },
  };

  return (
    // <div>
      <Chart
        options={options}
        series={options.series}
        type="polarArea"
        // width="260"
        height="245"
      />
    // </div>
  );
};

export default PolarChart;
