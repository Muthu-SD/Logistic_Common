// utils/fetchClearedData.js
import * as XLSX from "xlsx";

export const fetchClearedSheetData = async () => {
  try {
    // Path to the Excel file (you may need to modify this to point to the correct file path)
    const response = await fetch("/path/to/your/excel/file.xlsx");
    const arrayBuffer = await response.arrayBuffer();

    // Read the file as a workbook
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    
    // Get the "CLEARED" sheet
    const clearedSheet = workbook.Sheets["CLEARED"];
    
    // Convert sheet to JSON format
    const data = XLSX.utils.sheet_to_json(clearedSheet, { header: 1 });
    
    // Map the data to create objects with meaningful column names
    const columns = [
      "SL_NO", "DATE", "BL_NO", "Origin", "InvoiceNo", "Description",
      "SupplierName", "NoOfP", "GR_WT", "BENoDate", "ETD", "ETA",
      "ContainerNo", "DPD_CFS", "NOCNo", "CustomsDuty", "OOCDate",
      "Remarks", "ClearanceLeadTime"
    ];

    // Skip the header row and map rows to objects
    const formattedData = data.slice(1).map((row) => {
      const rowData = {};
      columns.forEach((col, index) => {
        rowData[col] = row[index] || "";
      });
      return rowData;
    });

    return formattedData;
  } catch (error) {
    console.error("Error fetching cleared sheet data:", error);
    return [];
  }
};
