import React, { useState, useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";
import { fetchSupplierWiseVolumeData } from "./fetchSupplierVolumeData";
import { Button, Modal, Select, Spin } from "antd";
import { ExpandOutlined } from "@ant-design/icons";
import NoDataFallback from "../../common/NoDataFallback";

const SupplierWiseVolumeChart = () => {
  const [isFullView, setIsFullView] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  // Dashboard view (always uses month = 'all')
  const {
    data: dashboardData = {},
    isLoading: isDashboardLoading,
  } = useQuery({
    queryKey: ["supplier-wise-volume", "dashboard"],
    queryFn: () => fetchSupplierWiseVolumeData("all"),
    refetchInterval: false, // Disable automatic refetching
    refetchOnWindowFocus: false, // Disable refetching on window focus
  });

  // Only Top 5 suppliers for dashboard view
  const dashboardChartData = (dashboardData.data || [])
    .sort((a, b) => b.volume - a.volume) // Sort descending by volume
    .slice(0, 5); // Only top 5

  const dashboardLabels = dashboardChartData.map((item) => item.supplier);
  const dashboardSeries = dashboardChartData.map((item) => item.volume);

  const dashboardChartOptions = {
    chart: {
      type: "polarArea",
    },
    legend: {
      show: false,
    },
    labels: dashboardLabels,
    dataLabels: {
      enabled: false, 
    },
    tooltip: {
      y: {
        formatter: (value) => `${value.toLocaleString()} Tons`,
      },
    },
stroke: {
    // colors: ["#fff"], // Optional: adds white border between segments
    colors: ["transparent"], // Hide lines between segments
  },
  fill: {
    opacity: 0.9,
  },
 yaxis: {
    show: false, // Hide radial axis lines and marks
  },
  xaxis: {
    show: false, // Hide angular axis lines and marks
  },
 plotOptions: {
    polarArea: {
      rings: {
        strokeWidth: 0, // Remove circular grid lines
      },
      spokes: {
        strokeWidth: 0, // Remove lines from center to edges
      },
    },
  },
};

  // Modal Full View
  const {
    data: fullViewData = {},
    isLoading: isFullLoading,
  } = useQuery({
    queryKey: ["supplier-wise-volume-full", selectedMonth],
    queryFn: () => fetchSupplierWiseVolumeData(selectedMonth),
    enabled: isFullView, // only fetch when modal is open
  });

  const monthList = fullViewData.availableMonths || [];
  const fullData = fullViewData.data || [];

  const monthOptions = useMemo(
    () => [
      { label: "All", value: "all" },
      ...monthList.map((m) => ({ label: m, value: m })),
    ],
    [monthList]
  );

  const paginatedData =
    selectedMonth === "all"
      ? fullData
      : fullData.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
      );

  const fullLabels = paginatedData.map((item) => item.supplier);
  const fullSeries = paginatedData.map((item) => item.volume);

  const fullChartOptions = {
    chart: {
      type: "pie",
    },
    labels: fullLabels,
    tooltip: {
      y: {
        formatter: (value) => `${value.toLocaleString()} Tons`,
      },
    },
    title: {
      text: "Supplier Wise Volume",
      align: "center",
      style: {
        fontSize: "24px",
      },
    },
  };

  const handleMonthChange = (value) => {
    setSelectedMonth(value);
    setCurrentPage(0);
  };

  const handleNext = () => {
    if ((currentPage + 1) * itemsPerPage < fullData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
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
         <h6 style={{ fontSize: "11px", background:"#1A2F7E",color:"white",padding:"3px 3px"  }}>Supplier Wise Volume</h6>
        <Button
        style={{ height: 18,width: 18, fontSize: "10px",}}
          icon={<ExpandOutlined />}
          onClick={() => setIsFullView(true)}
        />
      </div>

      {/* Dashboard View */}
      {isDashboardLoading ? (
        <div
          style={{
            position: "relative",
            minHeight: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spin size="medium" />
        </div>
      ) : dashboardSeries.length === 0 ? (
        <NoDataFallback />
      ) : (
        <ReactApexChart
          options={dashboardChartOptions}
          series={dashboardSeries}
          type="polarArea"
          height={170}
        />
      )}

      {/* Modal Full View */}
      <Modal
        title="Full View - Supplier Wise Volume"
        open={isFullView}
        onCancel={() => setIsFullView(false)}
        footer={null}
        style={{ top: 0 }}
        width="100vw"
        height="100vh"
        destroyOnClose
      >
        {isFullLoading ? (
          <div
            style={{
              position: "relative",
              minHeight: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spin size="large" />
          </div>
        ) : fullSeries.length === 0 ? (
          <NoDataFallback height={200} />
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <Select
                value={selectedMonth}
                onChange={handleMonthChange}
                options={monthOptions}
                style={{ width: 150 }}
              />
              {selectedMonth !== "all" && (
                <div>
                  <Button
                    onClick={handlePrevious}
                    disabled={currentPage === 0}
                    style={{ marginRight: "8px" }}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={
                      (currentPage + 1) * itemsPerPage >= fullData.length
                    }
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
            <ReactApexChart
              options={fullChartOptions}
              series={fullSeries}
              type="pie"
              height={500}
            />
          </>
        )}
      </Modal>
    </div>
  );
};

export default SupplierWiseVolumeChart;
