"use client";

import React from "react";

export default function LogoCloud() {
  const logos = [
    { name: "Vanguard Strategy", badge: "ADVISORY" },
    { name: "Arch & Metric", badge: "ARCHITECTURE" },
    { name: "Kroma Design Lab", badge: "PRODUCT DESIGN" },
    { name: "Hyperline", badge: "SYSTEMS" },
    { name: "Monolith Partners", badge: "VENTURE STUDIO" },
    { name: "Forma Interactive", badge: "CREATIVE TECH" },
    { name: "Cadence Intelligence", badge: "RESEARCH" },
    { name: "Northpoint", badge: "GROWTH" }
  ];

  return (
    <section className="py-12 border-y border-slate-200/70 dark:border-neutral-900 bg-slate-50/50 dark:bg-[#0a0a0a] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-neutral-500 mb-8">
          Engineered for modern independent consultants, boutique studios & advisory practices
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75 dark:opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
          {logos.map((logo, idx) => (
            <div key={idx} className="flex items-center gap-2.5 group cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-slate-800 dark:bg-neutral-800 border border-transparent dark:border-neutral-700 text-white flex items-center justify-center font-serif text-sm group-hover:bg-indigo-600 dark:group-hover:bg-indigo-600 transition-colors">
                {logo.name.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-slate-800 dark:text-neutral-200 text-sm tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {logo.name}
                </span>
                <span className="text-[9px] font-semibold tracking-wider text-slate-400 dark:text-neutral-500">
                  {logo.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
