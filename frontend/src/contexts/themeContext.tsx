import { createContext, useState, useContext, ReactNode } from 'react';

type ThemeContextProps = {
  theme: string;
  isDarkMode: boolean;
  setTheme: (theme: string) => void;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<string>(() => {
    const localStorageTheme = localStorage.getItem('default-theme');
    const browserDefault = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    return localStorageTheme ?? browserDefault;
  });

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setThemeState(newTheme);
    localStorage.setItem('default-theme', newTheme);
  };

  const isDarkMode = theme === 'dark';

  const contextValue: ThemeContextProps = {
    theme,
    isDarkMode,
    setTheme: setThemeState,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
