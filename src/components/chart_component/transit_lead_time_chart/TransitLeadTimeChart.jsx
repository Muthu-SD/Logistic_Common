import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";
import { fetchTransitLeadTimeData } from "./fetchTransitLeadTimeData";
import { Select, Button, Modal, Spin } from "antd";
import { ExpandOutlined } from "@ant-design/icons";
import NoDataFallback from "../../common/NoDataFallback";

const TransitLeadTimeChart = () => {
  const [isFullView, setIsFullView] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["transit-lead-time-data", "Month"], // Default groupBy
    queryFn: () => fetchTransitLeadTimeData("Month"),
    refetchInterval: false, // Disable automatic refetching
    refetchOnWindowFocus: false, // Disable refetching on window focus
  });

  const chartData = (data || []).slice(0, 7); // Dashboard view: max 7
  const categories = chartData.map((item) => item.group.split(" ")[0]);
  const seriesData = chartData.map((item) => item.averageTransitTime);

  const chartOptions = {
    chart: { 
      id: "transit-lead-time", 
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
    xaxis: {
      categories,
      labels: {
        style: {
          fontSize: "9px",
        },
      },
    },
    yaxis: {
      title: {
        text: "Transit Lead Time (days)",
        style: { fontSize: "10px", fontWeight: 600 },
      },
    },
    // title: {
    //   text: "Transit Lead Time",
    //   style: { fontSize: "12px" },
    //   align: "center",
    // },
    stroke: { curve: "smooth", width: 2, colors: ["#3b82f6"] },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100],
        colorStops: [
          { offset: 0, color: "#3b82f6", opacity: 0.4 },
          { offset: 100, color: "#3b82f6", opacity: 0.1 },
        ],
      },
    },
    dataLabels: { enabled: false },
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
         <h6  style={{ fontSize: "12px", background:"#1A2F7E",color:"white",padding:"3px 3px" }}>Transit Lead Time</h6>
        <Button  style={{ height: 18,width: 18, fontSize: "10px", }} icon={<ExpandOutlined />} onClick={() => setIsFullView(true)} />
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
        <NoDataFallback />
      ) : (
        <ReactApexChart
          options={chartOptions}
          series={[{ name: "Transit Time", data: seriesData }]}
          type="area"
          height={140}
        />
      )}

      <FullViewModal isOpen={isFullView} onClose={() => setIsFullView(false)} />
    </div>
  );
};

const FullViewModal = ({ isOpen, onClose }) => {
  const [groupBy, setGroupBy] = useState("Month");
  const [currentPage, setCurrentPage] = useState(0);

  const { data = [], isLoading } = useQuery({
    queryKey: ["full-transit-lead-time-data", groupBy],
    queryFn: () => fetchTransitLeadTimeData(groupBy),
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
  const seriesData = paginated.map((item) => item.averageTransitTime);

  const chartOptions = {
    chart: { 
      id: "full-view-transit-chart", 
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
        text: "Transit Lead Time (days)",
        style: { fontSize: "20px", fontWeight: 600 },
      },
    },
    title: {
      text: "Transit Lead Time",
      style: { fontSize: "24px" },
      align: "center",
    },
    stroke: { curve: "smooth", width: 2, colors: ["#3b82f6"] },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100],
        colorStops: [
          { offset: 0, color: "#3b82f6", opacity: 0.4 },
          { offset: 100, color: "#3b82f6", opacity: 0.1 },
        ],
      },
    },
    dataLabels: { enabled: false },
  };

  return (
    <Modal
      title="Full View - Transit Lead Time"
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
        <ReactApexChart
          options={chartOptions}
          series={[{ name: "Transit Time", data: seriesData }]}
          type="area"
          height={500}
        />
      )}
    </Modal>
  );
};

export default TransitLeadTimeChart;
