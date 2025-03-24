import React from "react";
import styles from "../styles/Dashboard.module.css";

const StatCard = ({ title, value, icon, color, progress }) => {
  return (
    <div className={styles.dashboardCard}>
      <div className={styles.cardHeader}>
        <div className={`${styles.icon} ${styles[color]}`}>{icon}</div>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.value}>{value}</div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressIndicator}
            style={{ width: `${progress}%`, backgroundColor: color }}
          />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
