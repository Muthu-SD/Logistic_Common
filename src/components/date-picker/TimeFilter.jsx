// import React from "react";

const TimeFilter = ({ data, filterType, children }) => {
  // Helper to aggregate data
  const aggregateData = (keyExtractor) => {
    const groupedData = data.reduce((acc, item) => {
      const key = keyExtractor(new Date(item.OOC_date));
      if (!acc[key]) {
        acc[key] = { OOC_date: key, clearance_lead_time: 0, count: 0 };
      }
      acc[key].clearance_lead_time += item.clearance_lead_time;
      acc[key].count += 1;
      return acc;
    }, {});

    return Object.values(groupedData).map((entry) => ({
      OOC_date: entry.OOC_date,
      clearance_lead_time: entry.clearance_lead_time / entry.count,
    }));
  };

  // Define the logic for each filter type
  const filteredData = (() => {
    switch (filterType) {
      case "month":
        return aggregateData((date) => `${date.getFullYear()}-${date.getMonth() + 1}`);
      case "year":
        return aggregateData((date) => `${date.getFullYear()}`);
      case "week":
        return aggregateData((date) => {
          const year = date.getFullYear();
          const week = Math.ceil(((date - new Date(year, 0, 1)) / 86400000 + 1) / 7);
          return `${year}-W${week}`;
        });
      case "quarter":
        return aggregateData((date) => {
          const year = date.getFullYear();
          const quarter = Math.ceil((date.getMonth() + 1) / 3);
          return `${year}-Q${quarter}`;
        });
      case "halfYear":
        return aggregateData((date) => {
          const year = date.getFullYear();
          const half = date.getMonth() < 6 ? "H1" : "H2";
          return `${year}-${half}`;
        });
      default:
        return data; // Default to raw data for "day"
    }
  })();

  // Render children with the filtered data
  return children(filteredData);
};

export default TimeFilter;
