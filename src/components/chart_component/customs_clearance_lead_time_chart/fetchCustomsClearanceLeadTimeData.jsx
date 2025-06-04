import { apiRequest } from "../../../utils/Api";

export const fetchCustomsClearanceLeadTimeData = async (groupBy = "Month") => {
  const response = await apiRequest("GET", `/excel/customs-clearance-lead-time?groupBy=${groupBy}`);
  return response; 
};
