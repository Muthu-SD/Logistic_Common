import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";
import { fetchCustomsClearanceLeadTimeData } from "./fetchCustomsClearanceLeadTimeData";
import { Select, Button, Modal, Spin } from "antd";
import { ExpandOutlined } from "@ant-design/icons";
import NoDataFallback from "../../common/NoDataFallback";

const CustomsClearanceLeadTimeChart = () => {
  const [isFullView, setIsFullView] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["current-shipment-data", "Month"], // Default groupBy for dashboard view
    queryFn: () => fetchCustomsClearanceLeadTimeData("Month"),
    refetchInterval: false, // Disable automatic refetching
    refetchOnWindowFocus: false, // Disable refetching on window focus
  });
  
  const chartData = (data || []).slice(0, 5); // Dashboard shows 4 months max
  const categories = chartData.map((item) => item.group.split(" ")[0]);
  const seriesData = chartData.map((item) => item.averageLeadTime);

  const chartOptions = {
    chart: { 
      id: "clearance-lead-time",
      animations: {
    enabled: true,          
    easing: "easeinout",   
    speed: 1200,             
    animateGradually: {
      enabled: true,
      delay: 200,            
    },
  },
      toolbar: { show: false } 
    },
    xaxis: {
      categories,
      labels: {
        style: {
          fontSize: "9px", // Reduced font size of month labels in dashboard view
        },
      },
    },
    yaxis: {
      title: {
        text: "Clearance Lead Time (days)",
        style: { fontSize: "10px", fontWeight: 600 },
      },
    },
    // title: { text: "Customs Clearance Lead Time", style: { fontSize: "12px" }, align: "center" },
    plotOptions: { bar: { borderRadius: 6, columnWidth: "45%" } },
   colors: [
    function ({ value }) {
      if (value < 0) return "#FEB019";
      if (value <= 5) return "#00E396";
      if (value <= 5.9) return "#A9E200";
      if (value <= 8) return "#E6E600";
      return "#FF4560";
    },
  ],
    dataLabels: { enabled: false, style: { fontSize: "12px" } },
  };

  return (
    <div>
      <div
        style={{
          marginBottom: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
         <h6 style={{ fontSize: "12px", background:"#1A2F7E",color:"white",padding:"3px 3px" }}>Customs Clearance Lead Time</h6>
        <Button
        style={{ height: 18,width: 18, fontSize: "10px",}}
          icon={<ExpandOutlined />}
          onClick={() => setIsFullView(true)}
        />
      </div>

      {isLoading ? (
        <div
          style={{
            position: "relative",
            minHeight: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spin
            size="medium"
            style={{
              position: "absolute",
              zIndex: 1,
            }}
          />
        </div>
      ) : seriesData.length === 0 ? (
        <NoDataFallback  />
      ) : (
        <ReactApexChart
          options={chartOptions}
          series={[{ name: "Lead Time", data: seriesData }]}
          type="bar"
          height={140}
        />
      )}

      {/* Full View Modal with Select & Pagination */}
      <FullViewModal
        isOpen={isFullView}
        onClose={() => setIsFullView(false)}
      />
    </div>
  );
};

const FullViewModal = ({ isOpen, onClose }) => {
  const [groupBy, setGroupBy] = useState("Month");
  const [currentPage, setCurrentPage] = useState(0);

  const { data = [], isLoading } = useQuery({
    queryKey: ["full-clearance-data", groupBy],
    queryFn: () => fetchCustomsClearanceLeadTimeData(groupBy),
    refetchInterval: false, // Disable automatic refetching
    refetchOnWindowFocus: false, // Disable refetching on window focus
  });

  const itemsPerPage =
    groupBy === "Day" ? 7 : groupBy === "Week" ? 3 : groupBy === "Month" ? 12 : 6;

  const paginated = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const categories = paginated.map((item) => item.group);
  const seriesData = paginated.map((item) => item.averageLeadTime);

  const chartOptions = {
    chart: { 
      id: "full-view-chart", 
      toolbar: { show: false },
      animations: {
      enabled: true,
      easing: "easeinout",
      speed: 1200,
      animateGradually: {
        enabled: true,
        delay: 200,
      },
    }, 
    },
    xaxis: { categories },
    yaxis: {
      title: {
        text: "Clearance Lead Time (days)",
        style: { fontSize: "20px", fontWeight: 600 },
      },
    },
    title: { text: "Customs Clearance Lead Time", style: { fontSize: "24px" }, align: "center" },
    plotOptions: { bar: { borderRadius: 4, columnWidth: "45%" } },
    colors: [
    function ({ value }) {
      if (value < 0) return "#FEB019";
      if (value <= 5) return "#00E396";
      if (value <= 5.9) return "#A9E200";
      if (value <= 8) return "#E6E600";
      return "#FF4560";
    },
  ],
    dataLabels: { enabled: true, style: { fontSize: "12px" } },
  };

  return (
    <Modal
      title="Full View - Customs Clearance Lead Time"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      style={{ top: 0 }}
      width="100vw"
      height="100vh"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Select
          value={groupBy}
          onChange={(value) => {
            setGroupBy(value);
            setCurrentPage(0);
          }}
          options={[
            { label: "Day", value: "Day" },
            { label: "Week", value: "Week" },
            { label: "Month", value: "Month" },
            { label: "Year", value: "Year" },
          ]}
          style={{ width: 120 }}
        />

        <div>
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
            style={{ marginRight: 8 }}
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              setCurrentPage((prev) =>
                (prev + 1) * itemsPerPage < data.length ? prev + 1 : prev
              )
            }
            disabled={(currentPage + 1) * itemsPerPage >= data.length}
          >
            Next
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div
          style={{
            position: "relative",
            minHeight: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spin
            size="large"
            style={{
              position: "absolute",
              zIndex: 1,
            }}
          />
        </div>
      ) : seriesData.length === 0 ? (
        <NoDataFallback height={200} />
      ) : (
        <div>
        <ReactApexChart
          options={chartOptions}
          series={[{ name: "Lead Time", data: seriesData }]}
          type="bar"
          height={460}
        />
        <div style={{ marginTop: 20, fontSize: 14 }}>
  {/* <strong>Color Legend:</strong> */}
  <div style={{ display: "flex",justifyContent:"center", gap: "16px", flexWrap: "wrap", marginTop: 8 }}>
    <div><span style={{ backgroundColor: "#FEB019", width: 12, height: 12, display: "inline-block", marginRight: 6 }} /> Negative Lead Time</div>
    <div><span style={{ backgroundColor: "#00E396", width: 12, height: 12, display: "inline-block", marginRight: 6 }} /> 0 to 5 days</div>
    <div><span style={{ backgroundColor: "#A9E200", width: 12, height: 12, display: "inline-block", marginRight: 6 }} /> 5.1 to 5.9 days</div>
    <div><span style={{ backgroundColor: "#E6E600", width: 12, height: 12, display: "inline-block", marginRight: 6 }} /> 6 to 8 days</div>
    <div><span style={{ backgroundColor: "#FF4560", width: 12, height: 12, display: "inline-block", marginRight: 6 }} /> 8.1+ days</div>
  </div>
</div>
        </div>

      )}
    </Modal>
  );
};

export default CustomsClearanceLeadTimeChart;
