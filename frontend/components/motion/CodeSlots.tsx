"use client";

import React, { useState, useRef, useEffect } from "react";
import { Check, AlertCircle, Loader2 } from "lucide-react";

interface CodeSlotsProps {
  length?: number;
  status?: "idle" | "working" | "success" | "error";
  onChange?: () => void;
  onComplete?: (code: string) => void | Promise<void>;
  accentColor?: string;
  inkColor?: string;
  slotColor?: string;
  digitColor?: string;
  dangerColor?: string;
  slotSize?: number;
  gap?: number;
  radius?: number;
  caret?: boolean;
  outcome?: "accept" | "reject";
  className?: string;
}

export default function CodeSlots({
  length = 6,
  status = "idle",
  onChange,
  onComplete,
  accentColor = "#6366f1",
  inkColor = "#fafafa",
  slotColor = "#27272a",
  digitColor = "#fafafa",
  dangerColor = "#ef4444",
  slotSize = 48,
  gap = 10,
  radius = 12,
  caret = true,
  outcome = "accept",
  className = "",
}: CodeSlotsProps) {
  const [digits, setDigits] = useState<string[]>(Array(length).fill(""));
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    onChange?.();
    if (e.key === "Backspace") {
      e.preventDefault();
      const newDigits = [...digits];
      if (digits[focusedIndex]) {
        newDigits[focusedIndex] = "";
      } else if (focusedIndex > 0) {
        newDigits[focusedIndex - 1] = "";
        setFocusedIndex(focusedIndex - 1);
      }
      setDigits(newDigits);
    } else if (e.key === "ArrowLeft") {
      setFocusedIndex((prev) => Math.max(0, prev - 1));
    } else if (e.key === "ArrowRight") {
      setFocusedIndex((prev) => Math.min(length - 1, prev + 1));
    } else if (/^[0-9a-zA-Z]$/.test(e.key)) {
      e.preventDefault();
      const newDigits = [...digits];
      newDigits[focusedIndex] = e.key.toUpperCase();
      setDigits(newDigits);

      if (focusedIndex < length - 1) {
        setFocusedIndex(focusedIndex + 1);
      }

      // Check if complete
      const fullCode = newDigits.join("");
      if (fullCode.length === length && !newDigits.includes("")) {
        onComplete?.(fullCode);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").trim().slice(0, length).toUpperCase();
    const newDigits = [...digits];
    for (let i = 0; i < paste.length; i++) {
      newDigits[i] = paste[i];
    }
    setDigits(newDigits);
    setFocusedIndex(Math.min(paste.length, length - 1));
    if (paste.length === length) {
      onComplete?.(paste);
    }
  };

  return (
    <div className={`relative flex flex-col items-center gap-3 ${className}`}>
      {/* Hidden real input for capturing mobile keyboards and focus */}
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        className="absolute opacity-0 pointer-events-none w-0 h-0"
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        autoFocus
      />

      <div 
        style={{ gap: `${gap}px` }} 
        className="flex items-center justify-center cursor-pointer"
        onClick={() => inputRef.current?.focus()}
      >
        {digits.map((digit, i) => {
          const isFocused = focusedIndex === i;
          const isError = status === "error";
          const isSuccess = status === "success";

          let borderColor = isFocused ? accentColor : "rgba(255,255,255,0.12)";
          if (isError) borderColor = dangerColor;
          if (isSuccess) borderColor = "#22c55e";

          return (
            <div
              key={i}
              style={{
                width: `${slotSize}px`,
                height: `${slotSize}px`,
                backgroundColor: slotColor,
                borderColor,
                borderRadius: `${radius}px`,
                color: digitColor,
              }}
              className={`relative flex items-center justify-center font-sans font-medium font-bold text-lg border transition-all duration-200 ${
                isFocused ? "shadow-md ring-2 ring-indigo-500/30 scale-105" : ""
              } ${isError ? "animate-shake ring-2 ring-red-500/30" : ""}`}
              onClick={() => {
                setFocusedIndex(i);
                inputRef.current?.focus();
              }}
            >
              {digit}

              {/* Blinking Caret */}
              {isFocused && !digit && caret && (
                <span className="w-0.5 h-5 bg-indigo-400 animate-pulse rounded-full" />
              )}
            </div>
          );
        })}
      </div>

      {/* Status Feedback Pill */}
      {status === "working" && (
        <div className="flex items-center gap-1.5 text-xs text-indigo-400 animate-pulse mt-1">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          <span>Verifying confirmation code...</span>
        </div>
      )}
      {status === "success" && (
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-1">
          <Check className="w-3.5 h-3.5" />
          <span>Code verified successfully</span>
        </div>
      )}
      {status === "error" && (
        <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Invalid code. Please try again.</span>
        </div>
      )}
    </div>
  );
}
