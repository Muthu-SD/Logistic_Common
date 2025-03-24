import React from "react";
import ReactApexChart from "react-apexcharts";

const SupplierBarChart = ({ chartTitle, data }) => {
  // Filter out "Grand Total" and suppliers with 0 value
  const filteredData = data.filter(
    (item) => item["Gross weight in Tons"] > 0 && item["SUPPLIER NAME"] !== "Grand Total"
  );

  const grandTotal = data.find((item) => item["SUPPLIER NAME"] === "Grand Total")?.["Gross weight in Tons"] || 0;

  // Extract x-axis categories (supplier names) and y-axis data (weights)
  const categories = filteredData.map((item) => item["SUPPLIER NAME"]);
  const seriesData = filteredData.map((item) => item["Gross weight in Tons"]);

  const options = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true, // Horizontal orientation
        barHeight: "50%", // Adjust bar height for better spacing
      },
    },
    xaxis: {
      categories: categories,
      title: { text: "Gross Weight (Tons)" },
    },
    yaxis: {
      title: { text: "Supplier Name" },
    },
    tooltip: {
      y: {
        formatter: (value) => `${value.toFixed(2)} Tons`, 
      },
    },
    colors: ["#101820"], 
  };

  const series = [
    {
      name: "Gross Weight (Tons)",
      data: seriesData,
    },
  ];

  return (
    <div>
      <h3>{chartTitle}</h3>
      <ReactApexChart options={options} series={series} type="bar" height="500px" />
      <p><b>Total Weight:</b> 
        {grandTotal.toFixed(2)} Tons
        {/* <span style={{
      backgroundColor: 'yellow', 
      border: '2px dashed red', 
      padding: '2px 6px', 
      borderRadius: '5px', 
      fontWeight: 'bold'
    }}>
      {grandTotal.toFixed(2)}
    </span> Tons */}
        </p>
    </div>
  );
};

export default SupplierBarChart;
