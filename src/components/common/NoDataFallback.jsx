import React from "react";
import { Empty } from "antd";

const NoDataFallback = ({ height = 100, description = "No Data Available" }) => {
  return (
    <div
      style={{
        minHeight: height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "12px",
      }}
    >
      <Empty description={description} />
    </div>
  );
};

export default NoDataFallback;
