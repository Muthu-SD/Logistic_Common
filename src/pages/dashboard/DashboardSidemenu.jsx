// Dashboard.js
import React from "react";
import StatCard from "../../components/StatCard";

const DashboardSidemenu = () => {
  return (
    <div>
      {/* Dashboard Cards */}
      <div className="StatCardContainer" style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-evenly",
          }}
        >
          <StatCard
            title="Daily Sales"
            value="$2000.00"
            icon="📈"
            color="green"
            progress={75} // Adjust progress as needed
          />
          <StatCard
            title="Raw Material"
            value="$1640.00"
            icon="📦"
            color="red"
            progress={30} // Adjust progress as needed
          />
          <StatCard
            title="Storage Balance"
            value="40"
            icon="📦"
            color="yellow"
            progress={60} // Adjust progress as needed
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardSidemenu;
