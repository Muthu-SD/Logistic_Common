import React, { useState } from "react";
import { Table, Button, Select, Input, Row, Col } from "antd";
import dayjs from "dayjs";
import { useTheme } from ".././context/ThemeContext";
import { BiFilterAlt } from "react-icons/bi";

const { Option } = Select;

const trackingData = [
  {
    key: "1",
    tracking: "ABC123",
    arrivedOn: "2024-11-10",
    status: "In Transit",
    delayedBy: "2 days",
  },
  {
    key: "2",
    tracking: "DEF456",
    arrivedOn: "2024-11-12",
    status: "Delivered",
    delayedBy: "0 days",
  },
  {
    key: "3",
    tracking: "GHI789",
    arrivedOn: "2024-11-14",
    status: "Pending",
    delayedBy: "3 days",
  },
  {
    key: "4",
    tracking: "JKL012",
    arrivedOn: "2024-11-15",
    status: "In Transit",
    delayedBy: "1 day",
  },
];

const columns = (theme) => [
  {
    title: "SL.No.",
    dataIndex: "key",
    key: "key",
    sorter: (a, b) => a.key - b.key,
  },
  {
    title: "Tracking",
    dataIndex: "tracking",
    key: "tracking",
    sorter: (a, b) => a.tracking.localeCompare(b.tracking),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    filters: [
      { text: "In Transit", value: "In Transit" },
      { text: "Delivered", value: "Delivered" },
      { text: "Pending", value: "Pending" },
    ],
    onFilter: (value, record) => record.status.includes(value),
  },
  {
    title: "Arrived On",
    dataIndex: "arrivedOn",
    key: "arrivedOn",
    sorter: (a, b) => (dayjs(a.arrivedOn).isAfter(dayjs(b.arrivedOn)) ? 1 : -1),
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Select
          showSearch
          style={{
            width: 150,
          }}
          placeholder="Select Month"
          onChange={(value) => setSelectedKeys([value])}
          value={selectedKeys[0]}
          allowClear
          onClear={clearFilters} // Trigger when the cross (X) is clicked
        >
          {Array.from({ length: 12 }, (_, i) => (
            <Option key={i} value={dayjs().month(i).format("MMMM YYYY")}>
              {dayjs().month(i).format("MMMM YYYY")}
            </Option>
          ))}
        </Select>
      </div>
    ),
    onFilter: (value, record) =>
      dayjs(record.arrivedOn).format("MMMM YYYY").includes(value),
  },
  {
    title: "Delayed By",
    dataIndex: "delayedBy",
    key: "delayedBy",
    sorter: (a, b) => {
      const daysA = parseInt(a.delayedBy.split(" ")[0]);
      const daysB = parseInt(b.delayedBy.split(" ")[0]);
      return daysA - daysB;
    },
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder="Enter number of days"
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys([e.target.value])}
          style={{ background: theme.component.input.backgroundColor }}
        />
        <Button
          type="primary"
          onClick={() => {
            confirm();
          }}
          style={{ marginTop: 8 }}
        >
          Apply
        </Button>
      </div>
    ),
    onFilter: (value, record) => record.delayedBy.includes(value),
  },
];

const TrackingTable = () => {
  const { theme } = useTheme();
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [statusFilter, setStatusFilter] = useState(null);

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
  };

  const handleHideFilters = () => {
    setFiltersVisible(false);
    setStatusFilter(null); // Reset status filter when hiding filters
  };

  const filteredData = trackingData.filter((item) =>
    statusFilter ? item.status === statusFilter : true
  );

  return (
    <div style={{ marginTop: "1rem" }}>
      <Row justify="end" style={{ marginBottom: "1rem" }}>
        <Col>
          {filtersVisible ? (
            <Button
              type="primary"
              onClick={handleHideFilters}
              // style={{ padding: " 20px 10px", fontSize: "25px" }}
            >
              Hide Filter
            </Button>
          ) : (
            <Button
              style={{ padding: " 20px 10px", fontSize: "25px" }}
              type="primary"
              onClick={() => setFiltersVisible(!filtersVisible)}
            >
              <BiFilterAlt />
            </Button>
          )}
        </Col>
        {filtersVisible && (
          <Col>
            <Select
              defaultValue="all"
              onChange={handleStatusFilterChange}
              style={{ width: 150, marginLeft: "1rem" }}
            >
              <Option value="all">All Status</Option>
              <Option value="In Transit">In Transit</Option>
              <Option value="Delivered">Delivered</Option>
              <Option value="Pending">Pending</Option>
            </Select>
          </Col>
        )}
      </Row>
      <Table
        columns={columns(theme)}
        dataSource={filteredData}
        pagination={true}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "table-row-even" : "table-row-odd"
        }
        scroll={{ y: 400 }}
      />
    </div>
  );
};

export default TrackingTable;
