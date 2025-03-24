import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useTheme } from ".././context/ThemeContext";
import { DatePicker, Button } from "antd"; // Ant Design components
import dayjs from "dayjs"; // For date formatting

import styled from "styled-components";


const StyledDatePickerWrapper = styled.div`
  .ant-picker-panel-container.ant-picker-month-panel-container {
    width: 70% !important;
    height: 40vh !important;
  }

  .ant-picker-content {
    width: 70% !important;
    height: 32vh !important;
  }

  .ant-picker-header {
    width: 70% !important;
  }
`;

const StyledDatePickerInput = styled(DatePicker)`
  background: ${(props) => props.bgColor || "#fff"} !important;
  width: 100px;
  border-radius: 4px;
`;

const StackedGraph = ({ colors }) => {
  const { theme } = useTheme();
  const [filteredMonth, setFilteredMonth] = useState(null);

  // Initial data
  const data = {
    categories: [
      "01-Jan",
      "15-Jan",
      "01-Feb",
      "15-Feb",
      "01-Mar",
      "15-Mar",
      "01-Apr",
      "15-Apr",
      "01-May",
      "15-May",
      "01-Jun",
      "15-Jun",
      "01-Jul",
      "15-Jul",
    ],
    grossWeight: [
      200, 300, 250, 400, 350, 300, 250, 400, 350, 300, 250, 400, 350, 250,
    ],
    delayedBy: [5, 10, 5, 8, 6, 5, 7, 9, 10, 6, 5, 11, 8, 10],
  };

  // Filter data based on selected month
  const filteredData = () => {
    if (!filteredMonth) return data; // No filter applied, return all data
    const month = dayjs(filteredMonth).format("MMM"); // Format selected month
    const filteredIndexes = data.categories
      .map((date, index) => (date.includes(month) ? index : null))
      .filter((index) => index !== null);

    return {
      categories: filteredIndexes.map((i) => data.categories[i]),
      grossWeight: filteredIndexes.map((i) => data.grossWeight[i]),
      delayedBy: filteredIndexes.map((i) => data.delayedBy[i]),
    };
  };

  const chartData = filteredData();

  const stackedChartData = {
    series: [
      {
        name: "Gross Weight",
        data: chartData.grossWeight,
      },
      {
        name: "Delayed by (days)",
        data: chartData.delayedBy,
      },
    ],
    options: {
      chart: {
        type: "bar",
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: chartData.categories, // Filtered categories
        title: {
          text: "Values",
        },
      },
      yaxis: {
        title: {
          text: "Months", // Representing the data fields
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 4,
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "bottom",
        horizontalAlign: "left",
      },
      colors: colors || [
        theme.component.donutChart.color2,
        theme.component.donutChart.color1,
        // theme.component.stackedChart1.color3,
      ],
    },
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Calendar Filter and Clear Button */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 10,
          display: "flex",
          gap: "8px",
        }}
      >
       <StyledDatePickerWrapper>
       <StyledDatePickerInput
          picker="month"
          value={filteredMonth} // Bind the state to the DatePicker value
          onChange={(date) => setFilteredMonth(date)}
          placeholder="Filter by Month"
          style={{
            background: theme.component.input.backgroundColor,
          }}
          getPopupContainer={(trigger) => trigger.parentElement} // Ensures styles are applied to the dropdown
        />
         </StyledDatePickerWrapper>
        <Button
          type="default"
          onClick={() => {
            setFilteredMonth(null); // Clear the filter state
          }}
          style={{ background: theme.component.input.backgroundColor }}
        >
          Clear Filter
        </Button>
      </div>

      {/* Stacked Bar Chart */}
      <ReactApexChart
        options={stackedChartData.options}
        series={stackedChartData.series}
        type="bar"
        height={400}
      />
    </div>
  );
};

export default StackedGraph;
