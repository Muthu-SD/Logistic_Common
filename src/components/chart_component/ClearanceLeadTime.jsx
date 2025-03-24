import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "../../context/ThemeContext";
// import TimeFilter from "../date-picker/TimeFilter";

const ClearanceLeadTime = ({ chartTitle, data }) => {
  const { isThemeOne } = useTheme();
  // const [filterType, setFilterType] = useState("month"); // Default to "month"

  // return (
  //   <div >
  //     <h3>{chartTitle}</h3>

  //     {/* Time filter buttons */}
  //     <div>
  //       <button onClick={() => setFilterType("day")}>Day Wise</button>
  //       <button onClick={() => setFilterType("week")}>Week Wise</button>
  //       <button onClick={() => setFilterType("month")}>Month Wise</button>
  //       <button onClick={() => setFilterType("quarter")}>Quarterly</button>
  //       <button onClick={() => setFilterType("halfYear")}>Half Yearly</button>
  //       <button onClick={() => setFilterType("year")}>Year Wise</button>
  //     </div>


      {/* TimeFilter wraps ClearanceLeadTime logic */}
//       <TimeFilter data={data} filterType={filterType}>
//         {(filteredData) => {

// // Extract x-axis categories and y-axis data from the filtered data
// const categories = filteredData.map((item) => item.OOC_date);
// const seriesData = filteredData.map((item) => item.clearance_lead_time);

          // Extract x-axis categories and y-axis data from the provided prop
          const categories = data.map((item) => item.OOC_date);
          const seriesData = data.map((item) => item.clearance_lead_time);


          // Define color ranges for bars and corresponding legend labels
          const colorRanges = [
            { from: -100, to: -1, color: isThemeOne ? "#FEB019" : "#C17E3A", label: "Negative Lead Time" },
            { from: 0, to: 5, color: isThemeOne ? "#00E396" : "#6E9C3A", label: "0-5 Days (Green)" },
            { from: 5.1, to: 5.9, color: isThemeOne ? "#A9E200" : "#B5D42A", label: "5.1-5.9 Days (Greenish-Yellow)" },
            { from: 6, to: 8, color: isThemeOne ? "#E6E600" : "#F3D83E", label: "6-8 Days (Yellow)" },
            { from: 8.1, to: 1000, color: isThemeOne ? "#FF4560" : "#9C3A3A", label: "Above 8 Days (Red)" }
          ];


          // Custom Legend items to display the color ranges
          // const customLegendItems = colorRanges.map((range) => ({
          //   text: range.label,
          //   color: range.color

          // }));
          // console.log("CUSTOM",customLegendItems);

          const series = [
            {
              name: "Lead Time",
              data: seriesData,
            },

          ];

          const options = {
            chart: {
              type: "bar",
              toolbar: {
                show: false,
              },
            },
            xaxis: {
              categories: categories,
              title: {
                text: "OOC Date",
                style: {
                  fontSize: "14px"
                }
              }
            },
            yaxis: {
              title: {
                text: "Clearance Lead Time (Days)",
                style: {
                  fontSize: "14px"
                }
              }
            },
            // legend: {
            //   position: "right",
            //   offsetY: 40,
            //   itemMargin: {
            //     horizontal: 10,
            //     vertical: 0
            //   },
            //   show: true,
            //   customLegendItems: customLegendItems,
            //   markers: {
            //     width: 10,    // Width of the legend color box
            //     height: 10,   // Height of the legend color box
            //     radius: 12,   // Rounding of the color box
            //   },
            // },

            tooltip: {
              y: {
                formatter: (value, { dataPointIndex }) => {
                  const eta = data[dataPointIndex].ETA;  // Get the ETA based on the index
                  return `${value} days | ETA: ${eta}`;
                },
              },
            },

            plotOptions: {
              bar: {
                colors: {
                  ranges: colorRanges.map((range) => ({
                    from: range.from,
                    to: range.to,
                    color: range.color,
                  }))
                },
              },
            },
          };


          return (
            <div>
              <h3>{chartTitle}</h3>
              <ReactApexChart
                options={options}
                series={series}
                type="bar"
                height="500px" />

              {/* Custom Legend */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ margin: '0 20px' }}>
                  <span style={{ backgroundColor: isThemeOne ? "#FEB019" : "#C17E3A", padding: '0px 8px', }}></span>
                  <span style={{ paddingLeft: "3px" }}> Negative Lead Time</span>
                </div>
                <div style={{ margin: '0 20px' }}>
                  <span style={{ backgroundColor: isThemeOne ? "#00E396" : "#6E9C3A", padding: '0px 8px', }}></span>
                  <span style={{ paddingLeft: "3px" }}> 0-5 Days</span>
                </div>
                <div style={{ margin: '0 20px' }}>
                  <span style={{ backgroundColor: isThemeOne ? "#A9E200" : "#B5D42A", padding: '0px 8px', }}></span>
                  <span style={{ paddingLeft: "3px" }}> 5.1-5.9 Days</span>
                </div>
                <div style={{ margin: '0 20px' }}>
                  <span style={{ backgroundColor: isThemeOne ? "#E6E600" : "#F3D83E", padding: '0px 8px', }}></span>
                  <span style={{ paddingLeft: "3px" }}> 6-8 Days</span>
                </div>
                <div style={{ margin: '0 20px' }}>
                  <span style={{ backgroundColor: isThemeOne ? "#FF4560" : "#9C3A3A", padding: '0px 8px', }}></span>
                  <span style={{ paddingLeft: "3px" }}> Above 8 Days</span>
                </div>
              </div>
          {/* ); */}
         {/* }} */}
       {/* </TimeFilter> */}
    </div>
  );
};

export default ClearanceLeadTime;
