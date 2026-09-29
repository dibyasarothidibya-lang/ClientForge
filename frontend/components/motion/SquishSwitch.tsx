"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface SquishSwitchProps {
  checked?: boolean;
  onChange?: (val: boolean) => void;
  height?: number;
  width?: number;
  radius?: number;
  thumbColor?: string;
  thumbOnColor?: string;
  trackColor?: string;
  trackOnColor?: string;
  className?: string;
}

export default function SquishSwitch({
  checked = false,
  onChange,
  height = 32,
  width = 64,
  radius = 16,
  thumbColor,
  thumbOnColor = "#ffffff",
  trackColor,
  trackOnColor = "#6366f1",
  className = "",
}: SquishSwitchProps) {
  const thumbSize = height - 6;
  const travelDist = width - thumbSize - 6;
  const hasCustomTrack = Boolean(trackColor);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange?.(!checked)}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${radius}px`,
        ...(checked
          ? { backgroundColor: trackOnColor }
          : hasCustomTrack
          ? { backgroundColor: trackColor }
          : {}),
      }}
      className={`relative p-0.5 inline-flex items-center cursor-pointer shadow-inner transition-colors duration-250 select-none ${
        checked
          ? "border border-indigo-400/40"
          : hasCustomTrack
          ? "border border-white/10"
          : "bg-slate-300 dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700"
      } ${className}`}
    >
      <motion.div
        animate={{
          x: checked ? travelDist : 0,
          scaleX: [1, 1.28, 1],
          scaleY: [1, 0.85, 1],
        }}
        transition={{
          x: {
            type: "spring",
            stiffness: 500,
            damping: 30,
          },
          scaleX: {
            duration: 0.28,
            ease: "easeInOut",
          },
          scaleY: {
            duration: 0.28,
            ease: "easeInOut",
          },
        }}
        style={{
          width: `${thumbSize}px`,
          height: `${thumbSize}px`,
          borderRadius: "50%",
          ...(checked
            ? { backgroundColor: thumbOnColor }
            : thumbColor
            ? { backgroundColor: thumbColor }
            : {}),
        }}
        className={`shadow-md ${
          !checked && !thumbColor
            ? "bg-slate-500 dark:bg-zinc-400"
            : ""
        }`}
      />
    </button>
  );
}
