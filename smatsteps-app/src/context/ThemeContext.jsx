// ThemeContext.js
import React, {
  createContext,
  useContext,
  useState,
  useLayoutEffect,
} from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  // Lire la valeur du thème depuis le localStorage au chargement initial
  const storedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(storedTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useLayoutEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`theme-${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { ThemeProvider, useTheme };
