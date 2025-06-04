import { Avatar, Dropdown, message } from "antd";
import { UserOutlined, UserAddOutlined, ImportOutlined, DownloadOutlined, LogoutOutlined, } from "@ant-design/icons";
import useStore from "../store/UseStore";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Header.module.css";
import ImportExcel from "../components/ImportExcel";
import logo from "../assets/Logo3.png";
import CurrentInfoMarquee from "../components/marquee/CurrentInfoMarquee";
import { downloadFile } from "../utils/Api";


const Header = ({ onImport }) => {
  const navigate = useNavigate();
  const { user, logout } = useStore();

  const handleLogout = () => {
    logout();
    message.success("Logged out successfully");
  };

  const triggerImport = () => {
    document.getElementById("triggerImportBtn")?.click();
  };

  const handleDownload = async () => {
    try {
      await downloadFile("/excel/download", "logistics_dashboard_data.xlsx");
      message.success("Excel file downloaded successfully");
    } catch (error) {
      console.error("Download error:", error);
      message.error("Failed to download Excel file");
    }
  };

  // Build menu items array
  const menuItems = [
    ...(user?.role === "Superadmin"
      ? [
        {
          key: "createAccount",
          icon: <UserAddOutlined />,
          label: "Create an Account",
          onClick: () => navigate("/signup"),
        },
      ]
      : []),
    ...(user?.role === "Superadmin" || user?.role === "Admin"
      ? [
        {
          key: "import",
          icon: <ImportOutlined />,
          label: "Import",
          onClick: triggerImport,
        },
        {
          key: "download",
          icon: <DownloadOutlined />,
          label: "Download",
          onClick: handleDownload,
        },
      ]
      : []),
    {
      key: "signout",
      icon: <LogoutOutlined />,
      label: "Sign Out",
      onClick: handleLogout,
    },
  ];


  return (
    <div className={styles.header}>
      <img src={logo} alt="Logo" className={styles.logo} />
      {/* Marquee displayed on the header */}
      <CurrentInfoMarquee />
      <div style={{ display: "flex", alignItems: "center" }}>
        <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
          <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} />
        </Dropdown>

        {/* Hidden Import Excel Component */}
        <ImportExcel onSuccess={onImport} />
      </div>
    </div>
  );
};

export default Header;
