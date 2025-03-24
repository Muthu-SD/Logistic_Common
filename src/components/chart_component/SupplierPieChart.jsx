import React from "react";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "../../context/ThemeContext";

const SupplierPieChart = ({ chartTitle, data }) => {
  const { isThemeOne } = useTheme();

  // Filter out "Grand Total" and suppliers with 0 value
  const filteredData = data.filter(
    (item) => item["Gross weight in Tons"] > 0 && item["SUPPLIER NAME"] !== "Grand Total"
  );

  const grandTotal = data.find((item) => item["SUPPLIER NAME"] === "Grand Total")?.["Gross weight in Tons"] || 0;

  // Extract categories (supplier names) and series data (weights)
  const categories = filteredData.map((item) => item["SUPPLIER NAME"]);
  const seriesData = filteredData.map((item) => item["Gross weight in Tons"]);

  const options = {
    chart: {
      type: "pie", // Change to pie chart type
      toolbar: {
        show: false,
      },
    },
    labels: categories, // Set supplier names as pie chart labels
    tooltip: {
      y: {
        formatter: (value) => `${value.toFixed(2)} Tons`, // Format tooltip
      },
    },
    colors: [
       isThemeOne ? "#66BB6A" : "#0D1321",  // Vibrant Light Green : warm tealish blue
        isThemeOne ? "#FF5722" : "#D15B39",  // Vibrant Deep Orange : Warm Deep Orange
        isThemeOne ? "#FF6F61" : "#D85A4F",  // Vibrant Coral : Earthy Coral
        isThemeOne ? "#FF9F00" : "#D68A2C",  // Vibrant Amber : Warm Amber
        isThemeOne ? "#7D8D8C" : "#A0B2A6",  //  vibrant gray : muted gray
        isThemeOne ? "#B4CDED" : "#B4CDED",  // light sky blue : light sky blue
        isThemeOne ? "#9C27B0" : "#7A4C8C",  // Vibrant Purple : Muted Purple
        isThemeOne ? "#FFEB3B" : "#D1B433",  // Bright Yellow : Earthy Yellow 
        isThemeOne ?  "#00FF7F" : "#6D9D56",  // Bright Spring Green : Soft Spring Green
        isThemeOne ?  "#E91E63" : "#D85E79",  // Vibrant Pink : Warm Pink
        isThemeOne ?  "#8BC34A" : "#7C9A42",  // Bright Lime Green : Olive Lime Green
        isThemeOne ?  "#673AB7" : "#5C3D8D",  // Vibrant Indigo : Muted Indigo 
        isThemeOne ?  "#FF4081" : "#D73681",  // Vibrant Hot Pink : Rustic Hot Pink
        isThemeOne ?  "#00BCD4" : "#4A7F85",  // Bright Teal : Deep Teal
        isThemeOne ?  "#CDDC39" : "#9C3A3A",  // Lime Yellow Green : waem red
        isThemeOne ?  "#00A1D9" : "#3D8BBF"   // Bright Electric Blue : Muted Electric Blue
      ]
      
    // responsive: [
    //   {
    //     breakpoint: 480,
    //     options: {
    //       chart: {
    //         width: "100%",
    //       },
    //       legend: {
    //         position: "bottom",
    //       },
    //     },
    //   },
    // ],
  };

  const series = seriesData;

  return (
    <div>
      <h3>{chartTitle}</h3>
      <ReactApexChart options={options} series={series} type="pie" height="500px" />
      <p><b>Total Weight:</b> {grandTotal.toFixed(2)} Tons</p>
    </div>
  );
};

export default SupplierPieChart;
