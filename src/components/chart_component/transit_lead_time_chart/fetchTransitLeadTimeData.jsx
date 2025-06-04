import { apiRequest } from "../../../utils/Api";

export const fetchTransitLeadTimeData = async (groupBy = "Month") => {
  const response = await apiRequest("GET", `/excel/transit-lead-time?groupBy=${groupBy}`);
  return response; 
};
