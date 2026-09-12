import React, { createContext, useContext, useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "sigma_theme";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === "light" || saved === "dark") {
        return saved;
      }
    } catch {
      // ignore
    }
    return "dark"; // default signature dark SIGMA theme
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
      root.setAttribute("data-theme", "light");
      root.style.colorScheme = "light";
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
      root.style.colorScheme = "dark";
    }

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const isDark = theme === "dark";

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeToggleProps {
  className?: string;
  variant?: "icon" | "pill" | "compact";
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = "",
  variant = "icon",
  showLabel = false,
}) => {
  const { theme, toggleTheme, isDark } = useTheme();

  if (variant === "pill" || showLabel) {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer select-none ${
          isDark
            ? "bg-[#181d2e] border border-white/15 text-amber-300 hover:bg-[#20263c] hover:border-amber-400/40 shadow-sm"
            : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 shadow-sm"
        } ${className}`}
        title={isDark ? "Beralih ke Mode Terang (Light Mode)" : "Beralih ke Mode Gelap (Dark Mode)"}
        aria-label={isDark ? "Aktifkan Mode Terang" : "Aktifkan Mode Gelap"}
      >
        <span className="relative flex items-center justify-center">
          {isDark ? (
            <Sun size={15} className="text-amber-400 animate-in spin-in-90 duration-300" />
          ) : (
            <Moon size={15} className="text-indigo-600 animate-in spin-in-90 duration-300" />
          )}
        </span>
        <span className="font-mono text-[11px] font-bold">
          {isDark ? "Mode Terang" : "Mode Gelap"}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full transition-all cursor-pointer select-none group ${
        isDark
          ? "bg-[#1c1f2e]/80 border border-white/15 text-amber-300 hover:text-amber-200 hover:bg-white/10 hover:border-amber-400/30 shadow-md"
          : "bg-white border border-slate-200 text-indigo-600 hover:text-indigo-700 hover:bg-slate-100 hover:border-slate-300 shadow-md"
      } ${className}`}
      title={isDark ? "Ganti ke Mode Terang (Light Mode)" : "Ganti ke Mode Gelap (Dark Mode)"}
      aria-label={isDark ? "Aktifkan Mode Terang" : "Aktifkan Mode Gelap"}
    >
      {isDark ? (
        <Sun
          size={17}
          className="text-amber-300 transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110"
        />
      ) : (
        <Moon
          size={17}
          className="text-indigo-600 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
        />
      )}
      <span className="sr-only">
        {isDark ? "Ganti ke Mode Terang" : "Ganti ke Mode Gelap"}
      </span>
    </button>
  );
};
