import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import '@ant-design/v5-patch-for-react-19'; // This is necessary to ensure Ant Design works with React 19

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <>
    <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </> 
);
 