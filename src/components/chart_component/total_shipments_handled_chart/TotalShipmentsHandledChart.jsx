import React, { useState, useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";
import { Select, Button, Modal, Spin, Pagination } from "antd";
import { ExpandOutlined } from "@ant-design/icons";
import { fetchTotalShipmentsHandledData } from "./fetchTotalShipmentsHandledData";
import NoDataFallback from "../../common/NoDataFallback";

const DASHBOARD_ITEMS_LIMIT = 5;
const FULLVIEW_ITEMS_PER_PAGE = 10;

const TotalShipmentsHandledChart = () => {
  const [isFullView, setIsFullView] = useState(false);
  const [currentModalPage, setCurrentModalPage] = useState(1);
  const [selectedYearInModal, setSelectedYearInModal] = useState("all");

  const { data = {}, isLoading } = useQuery({
    queryKey: ["total-shipments-handled", "all"],
    queryFn: () => fetchTotalShipmentsHandledData("all"),
    refetchInterval: false, // Disable automatic refetching
    refetchOnWindowFocus: false, // Disable refetching on window focus
  });

  const { data: modalData = {}, isLoading: isLoadingModal } = useQuery({
    queryKey: ["total-shipments-handled-modal", selectedYearInModal],
    queryFn: () => fetchTotalShipmentsHandledData(selectedYearInModal),
    refetchInterval: false, // Disable automatic refetching
    refetchOnWindowFocus: false, // Disable refetching on window focus
  });

  const chartData = data.data || [];
  const availableYears = data.availableYears || [];
  const modalChartData = modalData.data || [];

  const yearOptions = useMemo(
    () => [
      { label: "All", value: "all" },
      ...availableYears.map((y) => ({ label: y, value: y })),
    ],
    [availableYears]
  );

  const handleYearChangeInModal = (value) => {
    setSelectedYearInModal(value);
    setCurrentModalPage(1); // Reset page on year change
  };

  const dashboardData = chartData.slice(0, DASHBOARD_ITEMS_LIMIT);
  const fullviewData = modalChartData.slice(
    (currentModalPage - 1) * FULLVIEW_ITEMS_PER_PAGE,
    currentModalPage * FULLVIEW_ITEMS_PER_PAGE
  );

  // Add a utility function to shorten the names
  const shortenName = (name, maxLength = 7) => {
    return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
  };


  const getDashboardChartOptions = (categories) => ({
    chart: {
      type: "bar",
      animations: {
      enabled: true,
      easing: "easeinout",
      speed: 1200,
      animateGradually: {
        enabled: true,
        delay: 200,
      },
    },
      toolbar: { show: false },
    },
     plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: '45%', 
      }
    },
    dataLabels: {
      enabled: false, // Hides data labels on bars
    },
    xaxis: {
      categories: categories.map((name) => shortenName(name)), // Shorten the names here
      labels: {
        style: { fontSize: "9px" },
        rotate: 0,
      },
    },
    yaxis: {
      title: {
        text: "Total Shipments",
        style: {
          fontSize: "10px",
          fontWeight: 600,
        },
      },
    },
    tooltip: {
      y: { formatter: (value) => `${value}` },
    },
  });
  const getFullViewChartOptions = (categories) => ({
    chart: {
      type: "bar",
        animations: {
    enabled: true,           // Enable/disable animation
    easing: "easeinout",        // Animation type: "linear", "easein", "easeout", "easeinout", "easeinback", "easeoutback", "easeinbounce", "easeoutbounce"
    speed: 1200,             // Duration in ms
    animateGradually: {
      enabled: true,
      delay: 200,            // Delay between each bar animation
    },
  },
  toolbar: { show: false },
},
    xaxis: {
      categories,
      labels: {
        style: {
          fontSize: "10px",
          fontWeight: 600,
        },
        rotate: 0, // to make labels in straight
      },
    },
    yaxis: {
      title: {
        text: "Total Shipments",
        style: {
          fontSize: "20px",
          fontWeight: 600,
        },
      },
    },
    tooltip: {
      y: { formatter: (value) => `${value}` },
    },
    title: {
      text: "Total Shipments Handled",
      align: "center",
      style: { fontSize: "24px" },
    },
  });

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
        <h6 style={{ fontSize: "12px", background:"#1A2F7E",color:"white",padding:"3px 3px"  }}>Total Shipments Handled</h6>
        <Button style={{ height: 18,width: 18, fontSize: "10px", }} icon={<ExpandOutlined />} onClick={() => setIsFullView(true)}/>
      </div>

      {isLoading ? (
        <div
          style={{
            minHeight: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spin size="medium"  />
        </div>
      ) : modalChartData.length === 0 ? (
        <NoDataFallback />
      ) : (
        <ReactApexChart
          options={getDashboardChartOptions(
            dashboardData.map((item) => item.shipper)
          )}
          series={[
            {
              name: "Shipments",
              data: dashboardData.map((item) => item.count),
            },
          ]}
          type="bar"
          height={140}
        />
      )}

      <Modal
        title="Full View - Total Shipments Handled"
        open={isFullView}
        onCancel={() => setIsFullView(false)}
        footer={null}
        style={{ top: 0 }}
        width="100vw"
        height="100vh"
        destroyOnClose
      >
        {isLoadingModal ? (
          <div
            style={{
              minHeight: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spin size="large" />
          </div>
        ) : modalChartData.length === 0 ? (
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
                value={selectedYearInModal}
                onChange={handleYearChangeInModal}
                options={yearOptions}
                style={{ width: 150 }}
              />
            </div>

            <ReactApexChart
              options={getFullViewChartOptions(
                fullviewData.map((item) => item.shipper)
              )}
              series={[
                {
                  name: "Shipments",
                  data: fullviewData.map((item) => item.count),
                },
              ]}
              type="bar"
              height={470}
            />

            <Pagination
              style={{ textAlign: "center", fontSize: "16px" }}
              current={currentModalPage}
              pageSize={FULLVIEW_ITEMS_PER_PAGE}
              total={modalChartData.length}
              onChange={(page) => setCurrentModalPage(page)}
            />
          </>
        )}
      </Modal>
    </div>
  );
};

export default TotalShipmentsHandledChart;
