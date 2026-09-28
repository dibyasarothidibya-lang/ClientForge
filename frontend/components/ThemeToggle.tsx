"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

interface ThemeToggleProps {
  className?: string;
  compact?: boolean;
}

export default function ThemeToggle({ className = "", compact = false }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div 
        className={`h-8 w-16 rounded-full bg-slate-200/80 dark:bg-zinc-800/80 border border-slate-300 dark:border-zinc-700 opacity-60 ${className}`} 
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div
      role="radiogroup"
      aria-label="Color theme selection"
      className={`inline-flex items-center p-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] backdrop-blur-md transition-colors duration-300 ${className}`}
    >
      {/* Light Mode Segment */}
      <button
        type="button"
        role="radio"
        aria-checked={!isDark}
        onClick={() => setTheme("light")}
        title="Switch to Light Mode"
        className={`relative flex items-center justify-center rounded-full transition-all duration-300 ease-out focus:outline-none cursor-pointer ${
          compact ? "w-6 h-6" : "w-7 h-7"
        } ${
          !isDark
            ? "bg-white text-amber-500 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_1px_rgba(0,0,0,0.06)] scale-100"
            : "text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300 scale-95"
        }`}
      >
        <Sun className={`${compact ? "w-3 h-3" : "w-3.5 h-3.5"} transition-transform duration-300`} />
        <span className="sr-only">Light mode</span>
      </button>

      {/* Dark Mode Segment */}
      <button
        type="button"
        role="radio"
        aria-checked={isDark}
        onClick={() => setTheme("dark")}
        title="Switch to Dark Mode"
        className={`relative flex items-center justify-center rounded-full transition-all duration-300 ease-out focus:outline-none cursor-pointer ${
          compact ? "w-6 h-6" : "w-7 h-7"
        } ${
          isDark
            ? "bg-white/15 text-sky-200 shadow-[0_1px_3px_rgba(0,0,0,0.3)] scale-100 ring-1 ring-white/10"
            : "text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300 scale-95"
        }`}
      >
        <Moon className={`${compact ? "w-3 h-3" : "w-3.5 h-3.5"} transition-transform duration-300`} />
        <span className="sr-only">Dark mode</span>
      </button>
    </div>
  );
}
