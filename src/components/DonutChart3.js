// DonutChart.js
import React from "react";
import Chart from "react-apexcharts";
import { useTheme } from "../context/ThemeContext";

const DonutChart3 = () => {
  const { theme } = useTheme();
  // Configuration for the donut chart
  const options = {
    chart: {
      type: "donut",
    },
    labels: ["DPD (Direct Port Delivery)", "Other"],
    colors:[ theme.component.donutChart.color1 , theme.component.donutChart.color2], // Custom colors for segments
    legend: {
      position: "bottom",
    },
  };

  const series = [70, 30]; // Data for the donut chart

  return (
    <div style={{ textAlign: "center" }}>
      <h5>Shipment Processing Method</h5>
      <Chart options={options} series={series} type="donut" width="100%" height="100%"/>
    </div>
  );
};

export default DonutChart3;
