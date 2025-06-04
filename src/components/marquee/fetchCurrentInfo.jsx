import { apiRequest } from "../../utils/Api";

export const fetchCurrentInfo = async () => {
  return await apiRequest("GET", "/excel/latest-oneliner");
};
