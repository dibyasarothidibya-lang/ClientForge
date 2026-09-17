"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
  compact?: boolean;
}

export default function ThemeToggle({ className = "", compact = false }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const syncTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    syncTheme();
    window.addEventListener("theme-change", syncTheme);
    window.addEventListener("storage", syncTheme);

    return () => {
      window.removeEventListener("theme-change", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  const setTheme = (mode: "light" | "dark") => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    }
    window.dispatchEvent(new Event("theme-change"));
  };

  if (!mounted) {
    return (
      <div 
        className={`h-8 w-16 rounded-full bg-slate-100 dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 opacity-60 ${className}`} 
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label="Color theme selection"
      className={`inline-flex items-center p-1 rounded-full bg-slate-200/60 dark:bg-neutral-900/80 border border-slate-300/70 dark:border-neutral-800/90 backdrop-blur-md shadow-inner transition-colors duration-200 ${className}`}
    >
      {/* Light Mode Segment */}
      <button
        type="button"
        role="radio"
        aria-checked={!isDark}
        onClick={() => setTheme("light")}
        title="Switch to Light Mode"
        className={`relative flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer ${
          compact ? "w-6 h-6" : "w-7 h-7"
        } ${
          !isDark
            ? "bg-white text-amber-500 shadow-sm shadow-slate-900/10 font-semibold scale-100 ring-1 ring-slate-200/90"
            : "text-slate-400 hover:text-slate-700 dark:text-neutral-500 dark:hover:text-neutral-300 scale-95"
        }`}
      >
        <Sun className={`${compact ? "w-3 h-3" : "w-3.5 h-3.5"} transition-transform duration-300 ${!isDark ? "rotate-0 scale-100" : "-rotate-45 scale-90"}`} />
        <span className="sr-only">Light mode</span>
      </button>

      {/* Dark Mode Segment */}
      <button
        type="button"
        role="radio"
        aria-checked={isDark}
        onClick={() => setTheme("dark")}
        title="Switch to Dark Mode"
        className={`relative flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer ${
          compact ? "w-6 h-6" : "w-7 h-7"
        } ${
          isDark
            ? "bg-neutral-800 text-indigo-300 shadow-sm shadow-black/50 font-semibold scale-100 ring-1 ring-neutral-700/60"
            : "text-slate-400 hover:text-slate-700 dark:text-neutral-500 dark:hover:text-neutral-300 scale-95"
        }`}
      >
        <Moon className={`${compact ? "w-3 h-3" : "w-3.5 h-3.5"} transition-transform duration-300 ${isDark ? "rotate-0 scale-100" : "rotate-45 scale-90"}`} />
        <span className="sr-only">Dark mode</span>
      </button>
    </div>
  );
}
