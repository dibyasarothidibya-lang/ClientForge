"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, Check, AlertCircle, Loader2 } from "lucide-react";

interface SlideCommitProps {
  doneLabel?: string;
  errorLabel?: string;
  label?: string;
  onConfirm?: () => void | Promise<void>;
  trackColor?: string;
  handleColor?: string;
  successColor?: string;
  width?: number;
  height?: number;
  radius?: number;
  className?: string;
}

export default function SlideCommit({
  doneLabel = "Offer Dispatched",
  errorLabel = "Failed to dispatch",
  label = "Slide to dispatch offer",
  onConfirm,
  trackColor,
  handleColor,
  successColor = "#22c55e",
  width = 290,
  height = 52,
  radius = 26,
  className = "",
}: SlideCommitProps) {
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const trackRef = useRef<HTMLDivElement>(null);

  const handleSize = height - 8;
  const maxDrag = width - handleSize - 8;

  const handleStart = () => {
    if (status !== "idle") return;
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (clientX: number) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const currentX = clientX - rect.left - 4;
      const clamped = Math.max(0, Math.min(currentX, maxDrag));
      setDragOffset(clamped);

      // Check if threshold reached (88%)
      if (clamped >= maxDrag * 0.88) {
        setIsDragging(false);
        setDragOffset(maxDrag);
        setStatus("loading");
        try {
          const res = onConfirm?.();
          if (res instanceof Promise) {
            res.then(() => setStatus("done")).catch(() => setStatus("error"));
          } else {
            setStatus("done");
          }
        } catch {
          setStatus("error");
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);

    const handleEnd = () => {
      setIsDragging(false);
      // Snap back if not completed
      setDragOffset((prev) => (prev >= maxDrag * 0.88 ? maxDrag : 0));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, maxDrag, onConfirm]);

  const progressPercent = (dragOffset / maxDrag) * 100;
  const hasCustomTrack = Boolean(trackColor);

  return (
    <div
      ref={trackRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${radius}px`,
        ...(status === "done"
          ? { backgroundColor: successColor }
          : hasCustomTrack
          ? { backgroundColor: trackColor }
          : {}),
      }}
      className={`relative select-none overflow-hidden flex items-center p-1 shadow-inner transition-colors duration-300 ${
        status === "done"
          ? "border-emerald-500"
          : hasCustomTrack
          ? "border border-white/10"
          : "bg-slate-200/90 dark:bg-zinc-800 border border-slate-300/80 dark:border-zinc-700/80"
      } ${className}`}
    >
      {/* Sliding Fill Trail */}
      {status === "idle" && (
        <div
          style={{
            width: `${dragOffset + handleSize}px`,
            borderRadius: `${radius}px`,
          }}
          className="absolute inset-y-1 left-1 bg-indigo-500/15 dark:bg-white/10 pointer-events-none transition-[width] duration-75"
        />
      )}

      {/* Label Text */}
      <span
        style={{
          opacity: status === "idle" ? 1 - progressPercent / 75 : 1,
        }}
        className="w-full text-center text-xs font-semibold text-slate-700 dark:text-zinc-200 pointer-events-none transition-opacity"
      >
        {status === "loading" && "Dispatching..."}
        {status === "done" && doneLabel}
        {status === "error" && errorLabel}
        {status === "idle" && label}
      </span>

      {/* Draggable Handle */}
      {status === "idle" && (
        <div
          onMouseDown={handleStart}
          onTouchStart={handleStart}
          style={{
            width: `${handleSize}px`,
            height: `${handleSize}px`,
            borderRadius: `${radius - 4}px`,
            ...(handleColor ? { backgroundColor: handleColor } : {}),
            transform: `translateX(${dragOffset}px)`,
            cursor: isDragging ? "grabbing" : "grab",
            willChange: "transform",
          }}
          className={`absolute left-1 flex items-center justify-center shadow-md transition-transform duration-75 ease-out ${
            !handleColor
              ? "bg-white dark:bg-zinc-100 text-slate-900 border border-slate-200 dark:border-transparent"
              : "text-zinc-900"
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </div>
      )}

      {/* Loading Spinner */}
      {status === "loading" && (
        <div className="absolute right-4 text-white animate-spin">
          <Loader2 className="w-4 h-4" />
        </div>
      )}

      {/* Done Check Icon */}
      {status === "done" && (
        <div className="absolute right-4 text-white">
          <Check className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}
