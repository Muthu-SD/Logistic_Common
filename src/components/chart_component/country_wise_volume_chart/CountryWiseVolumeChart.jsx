import React, { useState, useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";
import { fetchCountryWiseVolumeData } from "./fetchCountryWiseVolumeData";
import { Button, Modal, Select, Spin } from "antd";
import { ExpandOutlined } from "@ant-design/icons";
import NoDataFallback from "../../common/NoDataFallback";

const CountryWiseVolumeChart = () => {
  const [isFullView, setIsFullView] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  // Dashboard view - always "all"
  const {
    data: dashboardData = {},
    isLoading: isDashboardLoading,
  } = useQuery({
    queryKey: ["country-wise-volume", "dashboard"],
    queryFn: () => fetchCountryWiseVolumeData("all"),
    refetchInterval: false, // Disable automatic refetching
    refetchOnWindowFocus: false, // Disable refetching on window focus
  });

  const dashboardChartData = dashboardData.data || [];
  const dashboardLabels = dashboardChartData.map((item) => item.country);
  const dashboardSeries = dashboardChartData.map((item) => item.volume);

  const dashboardChartOptions = {
    chart: { type: "radialBar" },
    labels: dashboardLabels,
    tooltip: {
       enabled: true,
      y: { formatter: (val) => `${val.toLocaleString()} Tons` },
    },
    dataLabels: {
      enabled: false, 
    },
    legend: { show: false },
    plotOptions: {
    radialBar: {
      hollow: { size: "10%" }, // Adjust as needed
      track: { background: "#f0f0f0", margin: 2 },
      dataLabels: {
        show: false,
      },
    },
  },
  };

  // Full view data
  const {
    data: fullViewData = {},
    isLoading: isFullLoading,
  } = useQuery({
    queryKey: ["country-wise-volume-full", selectedMonth],
    queryFn: () => fetchCountryWiseVolumeData(selectedMonth),
    enabled: isFullView,
  });

  const monthList = fullViewData.availableMonths || [];
  const fullChartData = fullViewData.data || [];

  const totalPages = Math.ceil(fullChartData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = currentPage * itemsPerPage;
    return fullChartData.slice(start, start + itemsPerPage);
  }, [fullChartData, currentPage]);

  const fullLabels = paginatedData.map((item) => item.country);
  const fullSeries = paginatedData.map((item) => item.volume);

  const fullChartOptions = {
    chart: { type: "pie" },
    labels: fullLabels,
    tooltip: {
      y: { formatter: (val) => `${val.toLocaleString()} Tons` },
    },
    title: {
      text: "Country Wise Volume",
      align: "center",
      style: { fontSize: "20px" },
    },
  };

  const monthOptions = useMemo(
    () => [
      { label: "All", value: "all" },
      ...monthList.map((m) => ({ label: m, value: m })),
    ],
    [monthList]
  );

  const handleMonthChange = (value) => {
    setSelectedMonth(value);
    setCurrentPage(0);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
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
         <h6 style={{ fontSize: "11px", background:"#1A2F7E",color:"white",padding:"3px 3px" }}>Country Wise Volume</h6>
        <Button style={{ height: 18,width: 18, fontSize: "10px",}} icon={<ExpandOutlined />} onClick={() => setIsFullView(true)}/>
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
          type="radialBar"
          height={160}
        />
      )}

      {/* Modal - Full View */}
      <Modal
        title="Full View - Country Wise Volume"
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
        ) : dashboardSeries.length === 0 ? (
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
              <div>
                <Button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  style={{ marginRight: 8 }}
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages - 1}
                >
                  Next
                </Button>
              </div>
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

export default CountryWiseVolumeChart;
