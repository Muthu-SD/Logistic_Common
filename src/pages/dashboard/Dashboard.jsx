// Dashboard.jsx
import React from "react";
import { Col, Row } from "antd";
// import { useTheme } from "../../context/ThemeContext";
// import styles from "../../styles/Dashboard.module.css";
import { clearanceLeadTimeData, supplierData, materialData, shipmentData, shipmentCostsData } from "../../store/DataProvider"
import InfoCard from "../../components/InfoCard";
// import ShipperChargesChart from "../../components/chart_component/ShipperChargesChart";
import DashboardSidemenu from "./DashboardSidemenu";
import TransitLeadTime from "../../components/chart_component/TransitLeadTime";
import ClearanceLeadTime from "../../components/chart_component/ClearanceLeadTime"
import MaterialPieChart from "../../components/chart_component/MaterialPieChart";
// import ShipmentsStackedBarChart from "../../components/chart_component/ShipmentsStackedBarChart";
import ShipmentsHandledChart from "../../components/chart_component/ShipmentsHandledChart";
import ShipmentCostsChart from "../../components/chart_component/ShipmentCostsChart";
import SupplierPieChart from "../../components/chart_component/SupplierPieChart";

const Dashboard = () => {
  // const { isThemeOne } = useTheme();

  //-------------------------------- Transit lead time functions--> START ---------------------------------------
  // const formattedTransitData = rawTransitData.map((item) => ({
  //   label: item.docRcd, // Using docRcd as label
  //   value: item.leadTime, // Using leadTime as value
  // }));
  //-------------------------------- Transit lead time functions--> END ---------------------------------------

  // const itemsPerPage = 25; // Number of items to show per page
  // const [currentPage, setCurrentPage] = useState(1);

  // Handle next page
  // const goToNextPage = () => {
  //   if (currentPage * itemsPerPage < shipmentCostsData.length) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // // Handle previous page
  // const goToPreviousPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        {/* Three Card at top showing some progress status */}
        <Col span={24}>
          <DashboardSidemenu />
        </Col>

        <Col span={24}>
          <InfoCard>
            <TransitLeadTime chartTitle="Transit Lead Time" />
          </InfoCard>
        </Col>

        {/* Clearance lead time  */}
        <Col span={24}>
          <InfoCard>
            <ClearanceLeadTime chartTitle="Clearance Lead Time Over Date" data={clearanceLeadTimeData} />
          </InfoCard>
        </Col>

        {/*Supplier Data */}

        <Col span={12}>
          <InfoCard>
            {/* <SupplierBarChart chartTitle="Supplier Data" data={supplierData} /> */}
            <SupplierPieChart chartTitle="Supplier Data" data={supplierData} />
          </InfoCard>
        </Col>

        {/* <Col span={24}>
          <InfoCard>
            {isThemeOne ? (
              <DonutChartGradient
                chartTitle="Supplier Data"
                chartData={supplierData}
              />
            ) : (
              <DonutChart chartTitle="Supplier Data" chartData={supplierData} />
            )}
          </InfoCard>
        </Col> */}

        {/*Material Data */}
        <Col span={12}>
          <InfoCard>
            <MaterialPieChart chartTitle="Material Data" data={materialData} />
          </InfoCard>
        </Col>

        {/* shipments handled  */}
        <Col span={24}>
          <InfoCard>
            <ShipmentsHandledChart chartTitle="Shipments Handled (Pending)" data={shipmentData} />
          </InfoCard>
        </Col>

        {/* Shipment Costs Analysis by Shipper */}
        <Col span={24}>
          <InfoCard>
            <ShipmentCostsChart chartTitle="Shipment Costs Analysis by Shipper"
              data={shipmentCostsData}
            // currentPage={currentPage}
            // itemsPerPage={itemsPerPage}
            />

            {/* <div style={{ marginTop: "20px", textAlign:"center" }}>
        <Button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <span style={{ margin: "0 10px" }}>Page {currentPage}</span>
        <Button onClick={goToNextPage} disabled={currentPage * itemsPerPage >= shipmentCostsData.length}>
          Next
        </Button>
      </div>     */}
          </InfoCard>
        </Col>
      </Row>

    </div>

  );
};

export default Dashboard;
