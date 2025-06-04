import { apiRequest } from "../../../utils/Api";

export const fetchTotalShipmentsHandledData = async (year = "all") => {
  const res = await apiRequest(
    "GET",
    `/excel/total-shipments-handled?year=${year}`
  );
  return res;
};
