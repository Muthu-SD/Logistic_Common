import React from "react";
import Chart from "react-apexcharts";
import { useTheme } from "../context/ThemeContext";

// Data from your provided list
const data = [
  "CLEARED ON 04-10-2021",
  "UNDER CLEARENCE",
  "CLEARED ON 07-10-2021",
  "UNDER CLEARENCE",
  "CLEARED ON 11-10-2021",
  "UNDER CLEARENCE",
  "CLEARED ON 12-10-2021",
  "UNDER CLEARENCE",
  "CLEARED ON 13-10-2021",
  "CLEARED ON 13-10-2021",
  "CLEARED ON 13-10-2021",
  "CLEARED ON 18-10-2021",
  "CLEARED ON 18-10-2021",
  "CLEARED ON 20-10-2021",
  "CLEARED ON 21-10-2021",
  "VESSEL EXPECTED",
  "CLEARED ON 22-11-2021",
  "AWT. FOR STO DOCUMENTS",
  "CLEARED ON 18-11-2021",
  "CLEARED ON 23-10-2021",
  "CLEARED ON 26-10-2021",
  "CLEARED ON 29-10-2021",
  "CLEARED ON 01-11-2021",
  "CLEARED ON 03-12-2021",
  "CLEARED ON 04-12-2021",
  "CLEARED ON 06-12-2021",
  "CLEARED ON 07-12-2021",
  "CLEARED ON 11-12-2021",
  "CLEARED ON 12-12-2021",
  "CLEARED ON 19-12-2021",
  "CLEARED ON 21-12-2021",
  "CLEARED ON 27-12-2021",
  "CLEARED ON 30-12-2021",
  "CLEARED ON 01-01-2022",
  "CLEARED ON 05-01-2022",
  "CLEARED ON 07-01-2022",
  "CLEARED ON 10-01-2022",
  "CLEARED ON 12-01-2022",
  "CLEARED ON 20-01-2022",
  "CLEARED ON 28-01-2022",
  "CLEARED ON 29-01-2022",
  "CLEARED ON 02-03-2022",
  "CLEARED ON 03-03-2022",
  "CLEARED ON 05-03-2022",
  "CLEARED ON 11-03-2022",
  "CLEARED ON 17-03-2022",
  "CLEARED ON 21-03-2022",
  "CLEARED ON 23-03-2022",
  "CLEARED ON 02-04-2022",
  "CLEARED ON 11-04-2022",
  "CLEARED ON 11-04-2022",
  "CLEARED ON 12-04-2022",
];

// Count CLEARED and UNDER CLEARENCE
const countCleared = data.filter((item) => item.includes("CLEARED")).length;
const countUnderClearance = data.filter((item) =>
  item.includes("UNDER CLEARENCE")
).length;

const DonutChart2 = () => {
  const { theme } = useTheme();

  // Configuration for the donut chart
  const options = {
    chart: {
      type: "donut",
    },
    labels: ["Cleared", "Under Clearance"], // Labels for the segments
    colors: [
      theme.component.donutChart.color1,
      theme.component.donutChart.color2,
    ], // Custom colors for segments
    legend: {
      position: "bottom",
    },
    // fill: {
    //   type: 'gradient',
    // },
  };

  // Series data for the donut chart
  const series = [countCleared, countUnderClearance];

  return (
    <div style={{ textAlign: "center" }}>
      <Chart
        options={options}
        series={series}
        type="donut"
        height="190px"
      />
    </div>
  );
};

export default DonutChart2;
