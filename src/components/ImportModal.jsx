import React, { useState } from "react";
import { Modal, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";

const ImportModal = ({ visible, onClose }) => {
  const [data, setData] = useState(null);

  const handleUpload = (info) => {
    if (info.file.status === "done") {
      const file = info.file.originFileObj;
      const reader = new FileReader();
      reader.onload = (e) => {
        const workbook = XLSX.read(e.target.result, { type: "binary" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setData(jsonData); // Save data for processing
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleImport = () => {
    // Handle your data processing here
    console.log(data);
    onClose();
  };

  return (
    <Modal
      title="Import Excel File"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleImport}>
          Import
        </Button>,
      ]}
    >
      <Upload beforeUpload={() => false} onChange={handleUpload}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </Modal>
  );
};

export default ImportModal;
