import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { ThemeProvider as CustomProvider } from "styled-components";
import { theme } from "theme";

export const ThemeContext = createContext<{
  darkMode: boolean;
  toggleDarkMode: () => void;
} | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState<boolean>(
    // localStorage.getItem("user-dark-mode") === "true"
    true
  );

  useEffect(() => {
    localStorage.setItem("user-dark-mode", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const activeTheme = useMemo(() => theme(darkMode), [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <CustomProvider theme={activeTheme}>{children}</CustomProvider>
    </ThemeContext.Provider>
  );
};
