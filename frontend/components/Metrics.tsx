"use client";

import React from "react";
import { Compass, Clock, Zap, Target } from "lucide-react";

export default function Metrics() {
  const metrics = [
    {
      value: "3.8x",
      label: "Proposal Win Velocity",
      description: "From 12% speculative pitch close rates to 46% dossier-backed conversion.",
      icon: Target,
    },
    {
      value: "18.5h",
      label: "Reclaimed Hours Per Deal",
      description: "Eliminating manual executive searches, tech auditing, and blind prospect research.",
      icon: Clock,
    },
    {
      value: "$140k",
      label: "Average Contract Expansion",
      description: "Higher initial retainers driven by addressing verified high-stakes architectural friction.",
      icon: Zap,
    },
    {
      value: "Zero",
      label: "Cold Speculative Outreach",
      description: "100% contextual peer advisory conversations timed to structural organizational triggers.",
      icon: Compass,
    }
  ];

  return (
    <section className="py-20 sm:py-24 bg-slate-50/20 dark:bg-[#070709]/40 border-y border-slate-200/80 dark:border-white/[0.06] text-slate-900 dark:text-white transition-colors duration-200 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="flex flex-col items-start p-6 sm:p-7 rounded-2xl bg-white/80 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/15 transition-all shadow-xs h-full"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/10 flex items-center justify-center mb-5 text-slate-700 dark:text-neutral-300">
                  <Icon className="w-5 h-5 text-indigo-500" />
                </div>
                {/* Modern Tech / Enterprise Sans-Serif Number */}
                <div className="font-sans text-4xl md:text-5xl font-medium tracking-tight text-slate-950 dark:text-white tabular-nums mb-2">
                  {item.value}
                </div>
                <div className="text-sm font-semibold text-slate-900 dark:text-neutral-200 mb-1.5 tracking-tight font-sans">
                  {item.label}
                </div>
                <p className="text-xs md:text-sm font-normal text-slate-500 dark:text-neutral-400 tracking-normal leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
