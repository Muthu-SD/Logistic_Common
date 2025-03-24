import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Button } from "antd";  // For pagination buttons
import { useTheme } from "../../context/ThemeContext";

const ShipmentCostsChart = ({ chartTitle, data, itemsPerPage = 20 }) => {
  const { isThemeOne } = useTheme();

    const [currentPage, setCurrentPage] = useState(1);

     // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

    // Get paginated data
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

    // Process paginated data
    const categories = paginatedData.map((item) => item.SHIPPER); // Include repeated shipper data
    // const categories = [...new Set(data.map((item) => item.SHIPPER))];
    const storageCosts = categories.map(
        (shipper) => parseFloat(paginatedData.find((item) => item.SHIPPER === shipper)?.["STORAGE / DEMURRAGE"].replace("USD ", "") || 0)
    );
    const detentionCharges = categories.map(
        (shipper) => parseFloat(paginatedData.find((item) => item.SHIPPER === shipper)?.["detention charges"].replace("USD ", "") || 0)
    );
    const grossWeight = categories.map(
        (shipper) => parseFloat(paginatedData.find((item) => item.SHIPPER === shipper)?.["GR. WT."] || 0)
    );

    const options = {
        chart: {
            type: "bar",
            stacked: true,
            toolbar: {
                show: false,
            },
        },
        colors: isThemeOne ? ["#628eff", "#580475"] : ["#344966", "#a5a5a5"],
        xaxis: {
            categories: categories,
            title: {
                text: "Shippers", 
                style: {
                fontSize:"14px"
              }
            },
            // labels: {
            //     rotate: -45, // Rotate labels to save space if needed
            //   },
        },
        yaxis: {
            title: {
                text: "Costs (USD)", 
                style: {
                fontSize:"14px"
              }
            },
        },
        tooltip: {
            custom: function ({ series, seriesIndex, dataPointIndex }) {
                const shipper = categories[dataPointIndex];
              const costLabel =
                seriesIndex === 0 ? "Storage / Demurrage"
                  : seriesIndex === 1 ? "Detention Charges"
                  : "";
              const costValue = series[seriesIndex][dataPointIndex].toFixed(2);
              const grossWeightValue = grossWeight[dataPointIndex].toFixed(2);
      
              return `
                <div style="padding: 10px; background: #fff;">
                <strong>Shipper:</strong> ${shipper}<br/>
                  <strong>${costLabel}:</strong> $${costValue}<br/>
                  <strong>Gross Weight:</strong> ${grossWeightValue} Tons
                </div>`;
            },
          },
        legend: {
            position: "top",
        },
        plotOptions: {
            bar: {
                horizontal: false,
                dataLabels: {
                    position: "top",
                },
                // columnWidth: "55%",  // Reduce bar width
            },
        },
        // grid: {
        //     padding: {
        //       left: 0,
        //       right: 0,
        //     },
        //   },
    };
    

    const series = [
        {
            name: "Storage / Demurrage",
            data: storageCosts,
        },
        {
            name: "Detention Charges",
            data: detentionCharges,
        },
    ];

    // Pagination logic for next/previous
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

    return (
        <div>
            <h3>{chartTitle}</h3>
            <ReactApexChart options={options} series={series} type="bar" height="500px"/>
        {/* Pagination controls */}
      <div style={{ marginTop: 20, textAlign:"center" }}>
        <Button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </Button>
        <span style={{ margin: "0 10px" }}>Page {currentPage}</span>
        <Button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
    );
};

export default ShipmentCostsChart;
