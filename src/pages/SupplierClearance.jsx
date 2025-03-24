import React from "react";
import { Table } from "antd";
// import styles from "../styles/Dashboard.module.css";


const supplierData = [
  {
    key: "1",
    date: "23-02-2023",
    supplierName: "GOLDEN GAIN GROUP HK LTD",
    noOfBags: "1080 BGS",
    grWt: "27.2",
    dpdCfs: "CFS 1",
    status: "Cleared",
    clearanceLeadTime: "4",
  },
  {
    key: "2",
    date: "20-12-2023",
    supplierName: "DAESANG CORPORATION",
    noOfBags: "1080 BGS",
    grWt: "27.2",
    dpdCfs: "CFS 2",
    status: "Cleared",
    clearanceLeadTime: "2",
  },
  {
    key: "3",
    date: "10-02-2023",
    supplierName: "DAESANG CORPORATION",
    noOfBags: "960 BGS",
    grWt: "24.3",
    dpdCfs: "CFS 3",
    status: "Cleared",
    clearanceLeadTime: "6",
  },
  {
    key: "4",
    date: "10-03-2023",
    supplierName: "CJ CHEILJEDANG",
    noOfBags: "700 BGS",
    grWt: "17.7",
    dpdCfs: "CFS 4",
    status: "Cleared",
    clearanceLeadTime: "3",
  },
  {
    key: "5",
    date: "23-02-2023",
    supplierName: "GOLDEN GAIN GROUP HK LTD",
    noOfBags: "1080 BGS",
    grWt: "27.2",
    dpdCfs: "CFS 5",
    status: "Cleared",
    clearanceLeadTime: "1",
  },
  {
    key: "6",
    date: "22-03-2023",
    supplierName: "SHANDONG GOLDEN",
    noOfBags: "1080 BGS",
    grWt: "27.2",
    dpdCfs: "CFS 6",
    status: "Cleared",
    clearanceLeadTime: "0",
  },
  {
    key: "7",
    date: "29-03-2023",
    supplierName: "GOLDEN GAIN GROUP HK LTD",
    noOfBags: "1080 BGS",
    grWt: "27.2",
    dpdCfs: "CFS 7",
    status: "Cleared",
    clearanceLeadTime: "6",
  },
  {
    key: "8",
    date: "29-03-2023",
    supplierName: "GOLDEN GAIN GROUP HK LTD",
    noOfBags: "1080 BGS",
    grWt: "27.2",
    dpdCfs: "CFS 8",
    status: "Delayed",
    clearanceLeadTime: "-6",
  },
  {
    key: "9",
    date: "31-03-2023",
    supplierName: "GOLDEN GAIN GROUP HK LTD",
    noOfBags: "1080 BGS",
    grWt: "27.2",
    dpdCfs: "CFS 9",
    status: "Cleared",
    clearanceLeadTime: "3",
  },
  {
    key: "10",
    date: "28-04-2023",
    supplierName: "BEYRON LTD",
    noOfBags: "1080 BGS",
    grWt: "27.2",
    dpdCfs: "CFS 10",
    status: "Cleared",
    clearanceLeadTime: "4",
  },
];

const columns = [
  { title: "SL.No.", dataIndex: "key", key: "key" },
  { title: "Date", dataIndex: "date", key: "date" },
  { title: "Supplier Name", dataIndex: "supplierName", key: "supplierName" },
  { title: "No. of Bags", dataIndex: "noOfBags", key: "noOfBags" },
  { title: "GR. WT.", dataIndex: "grWt", key: "grWt" },
  { title: "DPD/CFS", dataIndex: "dpdCfs", key: "dpdCfs" },
  { title: "Status", dataIndex: "status", key: "status" },
  {
    title: "Clearance Lead Time",
    dataIndex: "clearanceLeadTime",
    key: "clearanceLeadTime",
  },
];

const SupplierClearance = () => {


  return (
    <div  style={{marginTop:"1rem"}} >
        <div >
            <div>
              {/* <h3>Supplier Clearance</h3> */}
              <Table
                columns={columns}
                dataSource={supplierData}
                pagination={false}
                rowClassName={(record, index) =>
                  index % 2 === 0 ? "table-row-even" : "table-row-odd"
                }
                scroll={{ y: 400 }}
              />
            </div>
            </div>
            </div>
     
  );
};

export default SupplierClearance