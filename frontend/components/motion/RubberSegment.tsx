"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface RubberSegmentProps {
  items: string[];
  defaultValue?: string;
  onChange?: (val: string) => void;
  trackColor?: string;
  thumbColor?: string;
  textColor?: string;
  activeTextColor?: string;
  size?: "sm" | "md" | "lg";
  radius?: number;
  inset?: number;
  equalSlots?: boolean;
  stretch?: number;
  squash?: number;
  speed?: number;
  glide?: number;
  draggable?: boolean;
  className?: string;
}

export default function RubberSegment({
  items,
  defaultValue,
  onChange,
  trackColor,
  thumbColor,
  textColor,
  activeTextColor,
  size = "md",
  radius = 12,
  inset = 3,
  equalSlots = true,
  stretch = 100,
  squash = 3,
  speed = 1,
  glide = 75,
  draggable = true,
  className = "",
}: RubberSegmentProps) {
  const [selected, setSelected] = useState<string>(defaultValue || items[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-4 py-2 text-xs sm:text-sm",
    lg: "px-5 py-2.5 text-sm sm:text-base",
  };

  const handleSelect = (item: string) => {
    if (item === selected) return;
    setIsAnimating(true);
    setSelected(item);
    onChange?.(item);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const hasCustomTrack = Boolean(trackColor);
  const hasCustomThumb = Boolean(thumbColor);

  return (
    <div
      style={{
        ...(hasCustomTrack ? { backgroundColor: trackColor } : {}),
        borderRadius: `${radius}px`,
        padding: `${inset}px`,
      }}
      className={`inline-flex items-center relative select-none shadow-inner transition-colors duration-200 ${
        hasCustomTrack
          ? "border border-white/5"
          : "bg-slate-200/80 dark:bg-zinc-900 border border-slate-300/80 dark:border-zinc-800"
      } ${className}`}
    >
      {items.map((item) => {
        const isSelected = selected === item;
        const buttonStyle: React.CSSProperties = {
          borderRadius: `${radius - inset}px`,
        };
        if (isSelected && activeTextColor) {
          buttonStyle.color = activeTextColor;
        } else if (!isSelected && textColor) {
          buttonStyle.color = textColor;
        }

        return (
          <button
            key={item}
            type="button"
            onClick={() => handleSelect(item)}
            style={buttonStyle}
            className={`relative z-10 font-medium transition-colors duration-150 cursor-pointer text-center ${
              !activeTextColor && !textColor
                ? isSelected
                  ? "text-slate-950 dark:text-white font-semibold"
                  : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
                : ""
            } ${sizeClasses[size]} ${equalSlots ? "flex-1 min-w-[90px] sm:min-w-[110px]" : ""}`}
          >
            {/* Rubber Active Thumb Indicator */}
            {isSelected && (
              <motion.div
                layoutId="rubber-thumb"
                style={{
                  ...(hasCustomThumb ? { backgroundColor: thumbColor } : {}),
                  borderRadius: `${radius - inset}px`,
                }}
                className={`absolute inset-0 -z-10 shadow-xs ${
                  !hasCustomThumb
                    ? "bg-white dark:bg-zinc-800 border border-slate-300/60 dark:border-zinc-700/80"
                    : ""
                }`}
                transition={{
                  type: "spring",
                  stiffness: 450 * (speed || 1),
                  damping: 32 + (glide ? glide / 10 : 0),
                  mass: 0.8,
                }}
              />
            )}
            <span className="relative z-20 flex items-center justify-center gap-1.5 whitespace-nowrap">
              {item}
            </span>
          </button>
        );
      })}
    </div>
  );
}
