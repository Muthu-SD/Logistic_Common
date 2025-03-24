// src/layouts/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom"; // Outlet is where nested routes will render
import Sidebar from "./Sidebar"; // Sidebar component
import Header from "./Header";
import styles from "../styles/MainLayout.module.css";

const MainLayout = () => {
  return (
    <div className={styles.sidebarContainer}>
      <Sidebar />
      <div className={styles.headerContainer}>
        <Header />
        <div className={styles.outletContainer}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
