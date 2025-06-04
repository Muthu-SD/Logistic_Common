import { apiRequest } from "../../../utils/Api";

export const fetchCountryWiseVolumeData = async (monthYear = "all") => {
  const data = await apiRequest("GET", `/excel/country-wise-volume?monthYear=${monthYear}`);
  return data;
};
