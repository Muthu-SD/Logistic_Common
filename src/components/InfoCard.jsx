import React from "react";
import { Card } from "antd";

const InfoCard = ({ title, subtitle, children, padding = "7px", minHeight = "180px"  }) => {

  return (
    <Card
     styles={{ body: { padding: padding } }}
      style={{
        borderRadius: "8px",
        // padding: padding,
        background: "var(--primary-text)",
        height: "calc(100vh - 450px)",
        minHeight: minHeight,
      }}
      className="info-card"
    >
      <h3 style={{ fontSize: "1rem", fontWeight: "bold" }}>{title}</h3>
      {subtitle && <p style={{ marginBottom: "1rem" }}>{subtitle}</p>}
      {children}
    </Card>
  );
};

export default InfoCard;
