// src/components/Button.js

import React from "react";
import { useTheme } from "../context/ThemeContext";

const Button = ({ label }) => {
  const { theme } = useTheme();

  return (
    <button
      style={{
        backgroundColor: theme.component.button.backgroundColor,
        color: theme.component.button.color,
        border: theme.component.button.border,
        borderRadius: theme.token.borderRadius,
        padding: "10px 20px",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
};

export default Button;
