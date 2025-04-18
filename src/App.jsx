import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useTheme } from "./context/ThemeContext.jsx";
import { ConfigProvider } from "antd";
import AppRoutes from "./routes/AppRoutes.jsx";

const App = () => {
  // const { theme } = useContext(ThemeContext);
  const { theme } = useTheme();

  return (
    // <div className={`App ${dark}`}>
    <ConfigProvider theme={theme}>
      <Router>
        <AppRoutes />
      </Router>
    </ConfigProvider>
    // </div>
  );
};

export default App;
