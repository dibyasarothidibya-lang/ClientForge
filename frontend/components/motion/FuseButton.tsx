"use client";

import React, { useState, useEffect, useRef } from "react";
import { Archive, Undo2, Check, Flame } from "lucide-react";

interface FuseButtonProps {
  background?: string;
  color?: string;
  doneLabel?: string;
  fuseColor?: string;
  label?: string;
  onCommit?: () => void;
  onUndo?: () => void;
  preset?: string;
  radius?: number;
  size?: "sm" | "md" | "lg";
  undoLabel?: string;
  undoWindow?: number;
  className?: string;
}

export default function FuseButton({
  background,
  color,
  doneLabel = "Archived",
  fuseColor = "#f59e0b",
  label = "Archive Candidate",
  onCommit,
  onUndo,
  preset = "archive",
  radius = 12,
  size = "md",
  undoLabel = "Undo",
  undoWindow = 4000,
  className = "",
}: FuseButtonProps) {
  const [state, setState] = useState<"idle" | "burning" | "committed">("idle");
  const [progress, setProgress] = useState(100);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startBurning = () => {
    setState("burning");
    setProgress(100);

    const startTime = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / undoWindow) * 100);
      setProgress(remaining);
    }, 50);

    timerRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setState("committed");
      onCommit?.();
    }, undoWindow);
  };

  const handleUndo = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setState("idle");
    setProgress(100);
    onUndo?.();
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-xs sm:text-sm",
    lg: "px-5 py-2.5 text-sm sm:text-base",
  };

  const hasCustomBg = Boolean(background);

  return (
    <button
      type="button"
      onClick={state === "idle" ? startBurning : state === "burning" ? handleUndo : undefined}
      style={{
        ...(hasCustomBg ? { backgroundColor: background } : {}),
        ...(color ? { color } : {}),
        borderRadius: `${radius}px`,
      }}
      className={`relative overflow-hidden font-medium select-none shadow-sm transition-all duration-200 cursor-pointer ${
        !hasCustomBg
          ? "bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-100 border border-slate-300 dark:border-zinc-700"
          : "border border-white/10"
      } ${sizeStyles[size]} ${className}`}
    >
      {/* Burning Fuse Progress Line */}
      {state === "burning" && (
        <div
          style={{
            width: `${progress}%`,
            backgroundColor: fuseColor,
          }}
          className="absolute inset-y-0 left-0 opacity-20 pointer-events-none transition-[width] duration-75"
        />
      )}

      {/* Button Content */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        {state === "idle" && (
          <>
            <Archive className="w-3.5 h-3.5 opacity-80" />
            <span>{label}</span>
          </>
        )}

        {state === "burning" && (
          <>
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span className="text-amber-300 font-semibold">{undoLabel}</span>
            <span className="text-[10px] font-sans font-medium opacity-70">
              ({Math.ceil((progress / 100) * (undoWindow / 1000))}s)
            </span>
            <Undo2 className="w-3.5 h-3.5 ml-1 opacity-80" />
          </>
        )}

        {state === "committed" && (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400">{doneLabel}</span>
          </>
        )}
      </div>

      {/* Bottom Fuse Spark Line */}
      {state === "burning" && (
        <div 
          style={{
            width: `${progress}%`,
            backgroundColor: fuseColor,
            boxShadow: `0 0 8px ${fuseColor}`,
          }}
          className="absolute bottom-0 left-0 h-1 transition-[width] duration-75"
        />
      )}
    </button>
  );
}
