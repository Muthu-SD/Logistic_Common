import React, { createContext, useContext, useState, useEffect } from "react";
import { theme1, theme2 } from "../theme/Theme";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
   // Read the initial theme from localStorage or default to theme1
   const savedTheme = localStorage.getItem("theme") === "true"; // "true" means theme1, "false" means theme2
  const [isThemeOne, setIsThemeOne] = useState(savedTheme); // State to toggle between two themes

  useEffect(() => {
    // Save the theme to localStorage whenever it changes
    localStorage.setItem("theme", isThemeOne);
  }, [isThemeOne]);

  const toggleTheme = () => {
    setIsThemeOne((prev) => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{
        isThemeOne,
        toggleTheme,
        theme: isThemeOne ? theme1 : theme2, // Select theme based on state
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => useContext(ThemeContext);
