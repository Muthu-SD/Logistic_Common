import React from "react";
import Chart from "react-apexcharts";

const LineChart = () => {
  const options = {
    series: [
      {
        name: "Import Volume",
        data: [120, 110, 115, 100, 130], // Import volumes for each supplier
      },
    ],
    chart: {
      // height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false, // Hides the toolbar, including the menu icon
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth", // Smooth curve for the line
    },
    title: {
      text: "Supplier Import Volumes",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // Row colors
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "JIANGXI",
        "BEYRON LTD",
        "CJ BIO",
        "CJ CHEIL",
        "DAESANG",
      ],
    },
  };

  return (
    <div id="chart">
      <Chart
        options={options}
        series={options.series}
        type="line"
        height={235}
      />
    </div>
  );
};

export default LineChart;
