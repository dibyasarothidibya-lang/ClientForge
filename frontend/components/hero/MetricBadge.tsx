"use client";

import React from "react";
import { LucideIcon, Sparkles } from "lucide-react";

interface MetricBadgeProps {
  label: string;
  value?: string;
  icon?: LucideIcon;
  variant?: "indigo" | "emerald" | "violet" | "amber" | "zinc";
  className?: string;
}

export default function MetricBadge({
  label,
  value,
  icon: Icon = Sparkles,
  variant = "zinc",
  className = "",
}: MetricBadgeProps) {
  const variantStyles = {
    zinc: "bg-zinc-900/90 border-zinc-700/60 text-zinc-300",
    indigo: "bg-indigo-950/70 border-indigo-500/30 text-indigo-200",
    emerald: "bg-emerald-950/70 border-emerald-500/30 text-emerald-200",
    violet: "bg-violet-950/70 border-violet-500/30 text-violet-200",
    amber: "bg-amber-950/70 border-amber-500/30 text-amber-200",
  };

  const dotColors = {
    zinc: "bg-zinc-400",
    indigo: "bg-indigo-400",
    emerald: "bg-emerald-400",
    violet: "bg-violet-400",
    amber: "bg-amber-400",
  };

  return (
    <div
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full backdrop-blur-md border text-xs font-medium tracking-tight shadow-sm select-none ${variantStyles[variant]} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />
      <Icon className="w-3 h-3 opacity-80" />
      <span className="text-zinc-100">{label}</span>
      {value && <span className="text-zinc-400 font-normal text-[11px] border-l border-zinc-700 pl-1.5">{value}</span>}
    </div>
  );
}
