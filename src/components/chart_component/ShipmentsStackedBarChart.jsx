import React from "react";
import ReactApexChart from "react-apexcharts";

const ShipmentsStackedBarChart = ({ chartTitle, data }) => {
  // Prepare data for pending and clearance categories
  const categories = [...new Set(data.map((item) => item.SHIPPER))]; // Unique shippers
  const pendingSeries = categories.map(
    (shipper) => data.find((item) => item.SHIPPER === shipper && item.STATUS === "PENDING")?.["GR. WT."] || 0
  );
  const clearanceSeries = categories.map(
    (shipper) => data.find((item) => item.SHIPPER === shipper && item.STATUS === "CLEARANCE")?.["GR. WT."] || 0
  );

  const options = {
    chart: {
      type: "bar",
      stacked: true, // Stacked bar
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true, // Horizontal orientation
      },
    },
    xaxis: {
      categories: categories,
      title: { text: "Gross Weight (Tons)" },
    },
    yaxis: {
      title: { text: "Shippers" },
    },
    dataLabels: {
        enabled: false,
      },
    tooltip: {
      y: {
        formatter: (value) => `${value.toFixed(2)} Tons`, // Format tooltip values
      },
    },
    legend: {
      position: "bottom",
    },
  };

  const series = [
    {
      name: "Pending",
      data: pendingSeries,
    },
    {
      name: "Clearance",
      data: clearanceSeries,
    },
  ];

  return (
    <div>
      <h3>{chartTitle}</h3>
      <ReactApexChart options={options} series={series} type="bar" height="500px" />
    </div>
  );
};

export default ShipmentsStackedBarChart;
