import axios from "axios";
import useStore from "../store/UseStore";

// Create axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// ==============================
// ✅ REQUEST INTERCEPTOR
// ==============================
API.interceptors.request.use((config) => {
  const skipAuth = config.headers["x-skip-auth"];

  if (!skipAuth) {
    // Get the token from zustand store instead of localStorage
    const token = useStore.getState().token;  // Get token from zustand store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } else {
    delete config.headers["x-skip-auth"];
  }

  return config;
});

// ==============================
// ❌ RESPONSE INTERCEPTOR (Global Error Handler)
// ==============================
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const errRes = error.response;

    if (errRes) {
      if (errRes.status === 401) {
        // 🔐 Token expired, force logout or redirect
        console.warn("Unauthorized. Logging out...");
        // Clear token from zustand store
        useStore.getState().logout();  // Calling the logout method to clear user and token
        window.location.href = "/login"; // or trigger logout via context/store
      }

      // Return normalized error
      return Promise.reject(
        errRes.data?.message || errRes.data?.error || "Something went wrong"
      );
    }

    return Promise.reject("Network error");
  }
);

// ==============================
// ✅ REUSABLE REQUEST FUNCTION
// ==============================
export const apiRequest = async (
  method,
  endpoint,
  data = {},
  { customHeaders = {}, auth = true, params = {} } = {}
) => {
  try {
    const headers = { ...customHeaders };

    const isFormData = data instanceof FormData;
    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    // Signal interceptor to skip auth if requested
    if (!auth) {
      headers["x-skip-auth"] = true;
    }

    const response = await API({
      method,
      url: endpoint,
      data,
      params,
      headers,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// ==============================
// DOWNLOAD FILE FUNCTION
// ==============================
export const downloadFile = async (endpoint, fileName) => {
  try {
    const token = useStore.getState().token;

    const response = await API.get(endpoint, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`, // 🔐 Attach token manually
      },
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw error;
  }
};