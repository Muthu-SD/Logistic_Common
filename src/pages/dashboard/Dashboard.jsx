import React from "react";
import { Col, Row } from "antd";
import InfoCard from "../../components/InfoCard";
import CustomsClearanceLeadTimeChart from "../../components/chart_component/customs_clearance_lead_time_chart/CustomsClearanceLeadTimeChart";
import TransitLeadTimeChart from "../../components/chart_component/transit_lead_time_chart/TransitLeadTimeChart";
import SupplierWiseVolumeChart from "../../components/chart_component/supplier_wise_volume_chart/SupplierWiseVolumeChart";
import CountryWiseVolumeChart from "../../components/chart_component/country_wise_volume_chart/CountryWiseVolumeChart";
import TotalShipmentsHandledChart from "../../components/chart_component/total_shipments_handled_chart/TotalShipmentsHandledChart";
import ShipmentUnderClearanceTable from "../../components/chart_component/shipment_under_clearance_table/ShipmentUnderClearanceTable";
import OutstandingOverdueTable from "../../components/chart_component/outstanding_overdue_table/OutstandingOverdueTable";
import ShipmentInPipelineTable from "../../components/chart_component/shipment_in_pipeline_table/ShipmentInPipelineTable";

const Dashboard = () => {

  return (
    <>
      <div style={{ padding: "10px" }}>
        <Row gutter={[10, 10]}>

          {/* Clearance lead time  */}
          <Col span={8}>
            <InfoCard>
              <CustomsClearanceLeadTimeChart />
            </InfoCard>
          </Col>

          {/* Transit lead time  */}
          <Col span={10}>
            <InfoCard>
              <TransitLeadTimeChart />
            </InfoCard>
          </Col>

          {/* Outstanding Overdue Table Data */}
          <Col span={6}>
            <InfoCard >
              <OutstandingOverdueTable />
            </InfoCard>
          </Col>

          {/* Main content area */}
          <Col span={24}>
            <Row gutter={[10, 10]}>
              {/* Left: 3 small cards + Shipment In Pipeline */}
              <Col span={16}>
                <Row gutter={[10, 10]}>

                  {/*Supplier Data */}
                  <Col span={6}>
                    <InfoCard>
                      <SupplierWiseVolumeChart />
                    </InfoCard>
                  </Col>

                  {/* Country Data */}
                  <Col span={6}>
                    <InfoCard>
                      <CountryWiseVolumeChart />
                    </InfoCard>
                  </Col>

                  {/* Total Shipment Handled Data */}
                  <Col span={12}>
                    <InfoCard>
                      <TotalShipmentsHandledChart />
                    </InfoCard>
                  </Col>

                  {/* Shipment In Pipeline Table Data */}
                  <Col span={24}>
                    <InfoCard>
                      <ShipmentInPipelineTable />
                    </InfoCard>
                  </Col>
                </Row>
              </Col>

              {/* Right: Shipment Under Clearance fills full height */}
              <Col span={8} >
                <InfoCard minHeight="390px">
                  <ShipmentUnderClearanceTable />
                </InfoCard>
              </Col>
            </Row>
          </Col>

        </Row>

      </div>
    </>
  );
};

export default Dashboard;
