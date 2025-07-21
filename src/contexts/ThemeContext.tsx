import React, { useEffect, useState, createContext, useContext } from 'react';
type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
  systemPreference: boolean;
  useSystemPreference: () => void;
};
const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
  setDarkMode: () => {},
  systemPreference: false,
  useSystemPreference: () => {}
});
export const useTheme = () => useContext(ThemeContext);
export const ThemeProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  // Check if user previously set a preference
  const [darkMode, setDarkMode] = useState(false);
  const [systemPreference, setSystemPreference] = useState(false);
  // Initialize theme based on localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      if (savedTheme === 'dark') {
        setDarkMode(true);
      } else if (savedTheme === 'light') {
        setDarkMode(false);
      } else if (savedTheme === 'system') {
        setSystemPreference(true);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDark);
      }
    } else {
      // Default to system preference if no saved theme
      setSystemPreference(true);
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);
  // Toggle between light and dark mode
  const toggleDarkMode = () => {
    setSystemPreference(false);
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };
  // Explicitly set dark mode
  const setDarkModeValue = (value: boolean) => {
    setSystemPreference(false);
    setDarkMode(value);
    localStorage.setItem('theme', value ? 'dark' : 'light');
  };
  // Use system preference
  const useSystemPreference = () => {
    setSystemPreference(true);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
    localStorage.setItem('theme', 'system');
  };
  // Listen for system preference changes when in system mode
  useEffect(() => {
    if (systemPreference) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        setDarkMode(e.matches);
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }
  }, [systemPreference]);
  // Update document class when theme changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  return <ThemeContext.Provider value={{
    darkMode,
    toggleDarkMode,
    setDarkMode: setDarkModeValue,
    systemPreference,
    useSystemPreference
  }}>
      {children}
    </ThemeContext.Provider>;
};