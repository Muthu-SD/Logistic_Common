import React from "react";
import Header from "./Header";
import styles from "../styles/MainLayout.module.css";
import Dashboard from "../pages/dashboard/Dashboard";

const MainLayout = () => {
  return (
    <>
      <div className={styles.headerContainer}>
        <Header />
        <div >
          <Dashboard />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
