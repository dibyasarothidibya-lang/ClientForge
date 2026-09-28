"use client";

import React from "react";
import { Compass, Clock, Zap, Target } from "lucide-react";
import ThreeDCard from "./motion/ThreeDCard";

export default function Metrics() {
  const metrics = [
    {
      value: "3.8x",
      label: "Proposal Win Velocity",
      description: "From 12% speculative pitch close rates to 46% dossier-backed conversion.",
      icon: Target,
      color: "text-emerald-500 dark:text-emerald-400"
    },
    {
      value: "18.5h",
      label: "Reclaimed Hours Per Deal",
      description: "Eliminating manual executive searches, tech auditing, and blind prospect research.",
      icon: Clock,
      color: "text-indigo-500 dark:text-indigo-400"
    },
    {
      value: "$140k",
      label: "Average Contract Expansion",
      description: "Higher initial retainers driven by addressing verified high-stakes architectural friction.",
      icon: Zap,
      color: "text-teal-500 dark:text-teal-400"
    },
    {
      value: "Zero",
      label: "Cold Speculative Outreach",
      description: "100% contextual peer advisory conversations timed to structural organizational triggers.",
      icon: Compass,
      color: "text-violet-500 dark:text-violet-400"
    }
  ];

  return (
    <section className="py-20 sm:py-24 bg-slate-50/20 dark:bg-[#09090b]/20 border-y border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white transition-colors duration-200 relative z-10 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-gradient-to-r from-indigo-500/5 via-teal-500/5 to-transparent dark:from-indigo-900/10 dark:via-teal-900/10 dark:to-transparent blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ThreeDCard key={idx} glareColor="#6366f1" maxTilt={10} elevationZ={20} className="h-full">
                <div 
                  className="flex flex-col items-start p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 group hover:border-slate-300 dark:hover:border-zinc-700 transition-colors shadow-sm h-full"
                >
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 mb-5 text-slate-800 dark:text-white group-hover:scale-110 transition-transform">
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  {/* Modern Tech / Enterprise Sans-Serif Number */}
                  <div className="font-sans text-4xl md:text-5xl font-normal md:font-medium tracking-tight text-slate-950 dark:text-white tabular-nums mb-2">
                    {item.value}
                  </div>
                  <div className="text-base font-semibold text-slate-900 dark:text-zinc-100 mb-1.5 tracking-tight">
                    {item.label}
                  </div>
                  <p className="text-xs md:text-sm font-medium text-slate-500 dark:text-zinc-400 tracking-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ThreeDCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
