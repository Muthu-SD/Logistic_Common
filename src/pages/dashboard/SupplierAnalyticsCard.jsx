import React from "react";
import { Tabs } from "antd";
import PolarChart from "../../components/PolarChart";
import LineChart from "../../components/LineChart";
import InfoCard from "../../components/InfoCard";
import { useTheme } from "../../context/ThemeContext";
const SupplierAnalyticsCard = () => {
  const { theme } = useTheme();
  const { TabPane } = Tabs;

  return (
    <InfoCard >
      <Tabs defaultActiveKey="1" tabPosition="bottom" >
        <TabPane tab={<span style={{ color: 'white' }}>Supplier Info</span>} key="1"  >
          <PolarChart />
        </TabPane>
        <TabPane tab={<span style={{ color: 'white' }}>Supplier Import Volume</span>} key="2" >
          <LineChart />
        </TabPane>
      </Tabs>
      <style jsx>{`
        .ant-tabs-nav-wrap {
          background: ${theme.component.paddingCard.backgroundColor};
        }
      `}</style>
    </InfoCard>
  );
};
export default SupplierAnalyticsCard;
