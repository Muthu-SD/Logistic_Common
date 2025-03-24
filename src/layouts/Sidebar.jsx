import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { NavLink } from "react-router-dom";
import {  FileDoneOutlined, PieChartOutlined, } from "@ant-design/icons";
// import { FaShippingFast } from "react-icons/fa";
import styles from "../styles/Sidebar.module.css";
import useStore from "../store/UseStore";
import logo from "../assets/Logo2.png";
import { useTheme } from "../context/ThemeContext";
import { FaShippingFast } from "react-icons/fa";


const navItems = [
  {
    path: "/",
    role:"SuperAdmin",
    label: "Dashboard",
    icon: <PieChartOutlined />,
  },
  {
    path: "/",
    role:"Admin",
    label: "Dashboard",
    icon: <PieChartOutlined />,
  },
  {
    path: "#",
    role:"SuperAdmin",
    label: "Supplier Clearance",
    icon: <FileDoneOutlined />,
  },
  { 
    path: "#2",
    role:"SuperAdmin",
    label: "Shipping Status",
    icon: <FaShippingFast />,
  },
];

const Sidebar = () => {
  const { user ,logout } = useStore();
  const { theme, isThemeOne } = useTheme();
  // const { logout } = useStore();
  const [selectedKey, setSelectedKey] = useState("/");

  useEffect(() => {
    // Retrieve selectedKey from local storage on component mount
    const storedKey = localStorage.getItem("selectedKey");
    if (storedKey) {
      setSelectedKey(storedKey);
    }
  }, []);

  const handleSelectKey = (path) => {
    setSelectedKey(path);
    localStorage.setItem("selectedKey", path); // Store selectedKey in local storage
  };

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter(
    (item) => item.role === user?.role 
  );

  return (
    <div
      className={styles.sidebar}
      style={{ background: theme.token.colorBgContainer }}
    >
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" className={styles.logo}  style={{ filter: isThemeOne ? "invert(1)" : "invert(0)" }}  />
      </div>
      <ul className={styles.navLinks}>
        {filteredNavItems.map((item) => {
          const isActive = selectedKey === item.path;
          const itemStyle = {
            backgroundColor: isActive
              ? theme.component.menuItem.backgroundColor1
              : theme.component.menuItem.backgroundColor2,
            color: isActive
              ? theme.component.menuItem.color1
              : theme.component.menuItem.color2,
          };

          return (
            <li key={item.path} className={styles.navItem}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.activeLink : ""}`
                }
                // onClick={() => setSelectedKey(item.path)}
                onClick={() => handleSelectKey(item.path)}
                style={itemStyle} // Apply dynamic item style
              >
                {item.icon} <span>{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
      <Button onClick={logout} className={styles.signOut}>
        Sign Out
      </Button>
    </div>
  );
};

export default Sidebar;
