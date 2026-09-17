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
      color: "text-emerald-400"
    },
    {
      value: "18.5h",
      label: "Reclaimed Hours Per Deal",
      description: "Eliminating manual executive searches, tech auditing, and blind prospect research.",
      icon: Clock,
      color: "text-indigo-400"
    },
    {
      value: "$140k",
      label: "Average Contract Expansion",
      description: "Higher initial retainers driven by addressing verified high-stakes architectural friction.",
      icon: Zap,
      color: "text-teal-400"
    },
    {
      value: "Zero",
      label: "Cold Speculative Spam",
      description: "100% contextual peer advisory conversations timed to structural organizational triggers.",
      icon: Compass,
      color: "text-violet-400"
    }
  ];

  return (
    <section className="py-20 sm:py-24 bg-slate-50/50 dark:bg-[#080808] border-y border-slate-200/80 dark:border-white/[0.06] text-slate-900 dark:text-white transition-colors duration-200 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-gradient-to-r from-indigo-500/5 via-teal-500/5 to-transparent dark:from-indigo-900/10 dark:via-teal-900/10 dark:to-transparent blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col items-start p-6 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] group hover:border-slate-300 dark:hover:border-white/[0.12] transition-colors shadow-xs dark:shadow-none">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] mb-5 text-slate-800 dark:text-white group-hover:scale-110 transition-transform">
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div className="metric gradient-text mb-2">
                  {item.value}
                </div>
                <div className="text-base font-serif text-slate-950 dark:text-[#f5f5f3] font-normal mb-2 tracking-tight">
                  {item.label}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed font-normal">
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
