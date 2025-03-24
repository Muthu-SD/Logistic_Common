import React from "react";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "../../context/ThemeContext"; 

const MaterialPieChart = ({ chartTitle, data }) => {
  const { isThemeOne } = useTheme();

  // Filter out "Grand Total" and create separate data for display
  const filteredData = data.filter((item) => item.Description !== "Grand Total");
  const grandTotal = data.find((item) => item.Description === "Grand Total")?.["Sum of Gross weight in Tons"] || 0;

  // Extract labels (material names) and values (weights)
  const labels = filteredData.map((item) => item.Description);
  const seriesData = filteredData.map((item) => item["Sum of Gross weight in Tons"]);

  const options = {
    chart: {
      type: "donut",
    },
    labels: labels,
    tooltip: {
      y: {
        formatter: (value) => `${value.toFixed(2)} Tons`, // Tooltip for values
      },
    },
    legend: {
      position: "bottom",
      fontSize: '10px',
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              formatter: () => `${grandTotal.toFixed(2)} Tons`, // Display total inside the donut

            },
          },
        },
      },
    },
    colors: isThemeOne ? ["#775DD0", "#00E396", "#FEB019", "#FF4560","#008FFB"] : ["#344966", "#A0B2A6", "#0D1321", "#B4CDED","#748CAB"], 
  };

  const series = seriesData;

  return (
    <div>
      <h3>{chartTitle}</h3>
      <ReactApexChart options={options} series={series} type="donut" height="260px" />
    </div>
  );
};

export default MaterialPieChart;
