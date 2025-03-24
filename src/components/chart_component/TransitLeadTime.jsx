import React from "react";
import Chart from "react-apexcharts";
import { rawTransitData } from "../../store/DataProvider";
import { useTheme } from "../../context/ThemeContext";

const TransitLeadTime = ({ chartTitle }) => {
  const { isThemeOne } = useTheme();

  // Prepare the data for the chart
  const chartData = {
    series: [
      {
        name: "Transit Lead Time",
        data: rawTransitData.map((item) => item.leadTime),
      },
    ],
    options: {
      chart: {
        type: "area",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false, // Disable data labels on the chart line
      },
      xaxis: {
        categories: rawTransitData.map((item) => item.docRcd), // Dates on the x-axis
        title: {
          text: "Document Receipt Date (DOC. RCD.)",
          style: {
            fontSize: "14px"
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100],
          },
        },
      },
      yaxis: {
        title: {
          text: "Lead Time (Days)",
          style: {
            fontSize: "14px"
          },
        },
      },
      stroke: {
        curve: "smooth",
        // width: 2,
      },
      colors: [isThemeOne ? "#3B82F6" : "#344966"],  // Blue/ dark navy  color for the line
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, }) {
          const docRcd = rawTransitData[dataPointIndex].docRcd;
          const arrivalDt = rawTransitData[dataPointIndex].arrivalDt;
          const leadTime = series[seriesIndex][dataPointIndex];
          return `
              <div style="padding: 10px; border: 1px solid #ddd; background: #fff;">
                <strong>Document Receipt Date:</strong> ${docRcd}<br/>
                <strong>Arrival Date:</strong> ${arrivalDt}<br/>
                <strong>Transit Lead Time:</strong> ${leadTime} days
              </div>`;
        },
      },
    },
  };

  return (
    <div>
      <h3>{chartTitle}</h3>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height="300px"
      />
    </div>
  );
};

export default TransitLeadTime;
