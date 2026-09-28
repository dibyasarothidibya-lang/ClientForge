"use client";

import React, { useState, useRef, useEffect } from "react";
import { Trash2, CheckCircle2 } from "lucide-react";

interface HoldButtonProps {
  backgroundColor?: string;
  doneLabel?: string;
  fillColor?: string;
  holdTime?: number;
  onHold?: () => void;
  radius?: number;
  size?: "sm" | "md" | "lg";
  textColor?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function HoldButton({
  backgroundColor,
  doneLabel = "Profile Deleted",
  fillColor = "#ef4444",
  holdTime = 2000,
  onHold,
  radius = 12,
  size = "md",
  textColor,
  children,
  className = "",
}: HoldButtonProps) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const startHold = () => {
    if (isCompleted) return;
    setIsHolding(true);
    startTimeRef.current = Date.now();

    const updateHold = () => {
      if (!startTimeRef.current) return;
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(100, (elapsed / holdTime) * 100);
      setProgress(pct);

      if (pct >= 100) {
        setIsHolding(false);
        setIsCompleted(true);
        onHold?.();
      } else {
        frameRef.current = requestAnimationFrame(updateHold);
      }
    };

    frameRef.current = requestAnimationFrame(updateHold);
  };

  const cancelHold = () => {
    if (isCompleted) return;
    setIsHolding(false);
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    setProgress(0);
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-xs sm:text-sm",
    lg: "px-5 py-3 text-sm sm:text-base",
  };

  const hasCustomBg = Boolean(backgroundColor);

  return (
    <button
      type="button"
      onMouseDown={startHold}
      onMouseUp={cancelHold}
      onMouseLeave={cancelHold}
      onTouchStart={startHold}
      onTouchEnd={cancelHold}
      style={{
        ...(isCompleted
          ? { backgroundColor: "#dc2626", color: "#ffffff" }
          : {
              ...(hasCustomBg ? { backgroundColor } : {}),
              ...(textColor ? { color: textColor } : {}),
            }),
        borderRadius: `${radius}px`,
      }}
      className={`relative overflow-hidden font-medium select-none shadow-sm transition-all duration-200 cursor-pointer ${
        !hasCustomBg && !isCompleted
          ? "bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-100 border border-slate-300 dark:border-zinc-700"
          : "border border-white/10"
      } ${sizeStyles[size]} ${isHolding ? "scale-98" : ""} ${className}`}
    >
      {/* Hold Progress Fill */}
      {!isCompleted && (
        <div
          style={{
            width: `${progress}%`,
            backgroundColor: fillColor,
          }}
          className="absolute inset-y-0 left-0 opacity-40 pointer-events-none transition-[width] duration-75"
        />
      )}

      {/* Button Content */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        {isCompleted ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>{doneLabel}</span>
          </>
        ) : (
          <>
            <Trash2 className="w-3.5 h-3.5 opacity-80" />
            <span>{children || "Hold to Confirm"}</span>
            {isHolding && (
              <span className="text-[10px] font-mono opacity-80 ml-1">
                {Math.ceil(((100 - progress) / 100) * (holdTime / 1000))}s
              </span>
            )}
          </>
        )}
      </div>
    </button>
  );
}
