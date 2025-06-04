import { apiRequest } from "../../../utils/Api";

export const fetchSupplierWiseVolumeData = async (monthYear = "all") => {
  const data = await apiRequest("GET", `/excel/supplier-wise-volume?monthYear=${monthYear}`);
  return data;
};
