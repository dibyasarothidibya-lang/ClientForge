"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface LatticeLoaderProps {
  cellSize?: number;
  color?: string;
  doneColor?: string;
  doneLabel?: string;
  errorColor?: string;
  errorLabel?: string;
  fontSize?: number;
  gap?: number;
  grid?: number;
  label?: string;
  pattern?: "orbit" | "wave" | "pulse";
  shape?: "round" | "square";
  showTimer?: boolean;
  status?: "working" | "done" | "error";
  className?: string;
}

export default function LatticeLoader({
  cellSize = 6,
  color = "currentColor",
  doneColor = "#22c55e",
  doneLabel = "Profile scored in",
  errorColor = "#ef4444",
  errorLabel = "Pipeline failed after",
  fontSize = 14,
  gap = 2,
  grid = 3,
  label = "Analyzing team culture fit...",
  pattern = "orbit",
  shape = "round",
  showTimer = true,
  status = "working",
  className = "",
}: LatticeLoaderProps) {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [activeCell, setActiveCell] = useState(0);

  // Timer loop
  useEffect(() => {
    if (status !== "working") return;
    const startTime = Date.now();
    const interval = setInterval(() => {
      setElapsedMs(Date.now() - startTime);
    }, 50);

    return () => clearInterval(interval);
  }, [status]);

  // Lattice animation loop
  useEffect(() => {
    if (status !== "working") return;
    const totalCells = grid * grid;
    const interval = setInterval(() => {
      setActiveCell((prev) => (prev + 1) % totalCells);
    }, 120);

    return () => clearInterval(interval);
  }, [status, grid]);

  const formattedTime = (elapsedMs / 1000).toFixed(1) + "s";
  const totalCells = grid * grid;

  return (
    <div className={`inline-flex items-center gap-3.5 select-none text-slate-900 dark:text-white ${className}`}>
      {/* 3x3 Lattice Grid Visual */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${grid}, ${cellSize}px)`,
          gap: `${gap}px`,
        }}
        className="shrink-0"
      >
        {Array.from({ length: totalCells }).map((_, idx) => {
          const isGlowing = status === "working" && activeCell === idx;
          let cellBg = color;
          let cellOpacity = isGlowing ? 1 : 0.25;

          if (status === "done") {
            cellBg = doneColor;
            cellOpacity = 1;
          } else if (status === "error") {
            cellBg = errorColor;
            cellOpacity = 1;
          }

          return (
            <div
              key={idx}
              style={{
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                backgroundColor: cellBg,
                opacity: cellOpacity,
                borderRadius: shape === "round" ? "50%" : "2px",
                transition: "opacity 120ms ease, background-color 200ms ease",
              }}
            />
          );
        })}
      </div>

      {/* Label & Status */}
      <div 
        style={{ fontSize: `${fontSize}px` }} 
        className="flex items-center gap-2 font-medium tracking-tight text-slate-800 dark:text-zinc-100"
      >
        {status === "working" && (
          <span className="text-slate-700 dark:text-zinc-200">{label}</span>
        )}
        {status === "done" && (
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>{doneLabel}</span>
          </div>
        )}
        {status === "error" && (
          <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
            <AlertCircle className="w-4 h-4" />
            <span>{errorLabel}</span>
          </div>
        )}

        {/* Stopwatch Timer */}
        {showTimer && (
          <span 
            style={{
              color: status === "done" ? doneColor : status === "error" ? errorColor : undefined,
            }}
            className="font-sans font-medium text-xs tabular-nums px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-white/5 border border-slate-300/80 dark:border-white/10 text-slate-600 dark:text-zinc-400"
          >
            {formattedTime}
          </span>
        )}
      </div>
    </div>
  );
}
