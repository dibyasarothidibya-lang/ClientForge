"use client";

import React, { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { faqs } from "@/lib/portfolio";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-slate-50/20 dark:bg-[#080808]/20 backdrop-blur-[1px] border-t border-slate-200/80 dark:border-white/[0.06] transition-colors duration-200 relative z-10 scroll-mt-20">
      <div id="security" className="scroll-mt-24" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] text-slate-600 dark:text-neutral-400 text-xs tracking-wider uppercase mb-5 font-sans font-medium shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
            <span>Clarifications & Mechanics</span>
          </div>
          <h2 className="section-title text-slate-950 dark:text-[#f5f5f3] tracking-tight">
            Frequently Considered. <span className="editorial-italic gradient-text">Clear Answers.</span>
          </h2>
          <p className="body-lg text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto mt-4 font-normal">
            Practical answers about project engagements, engineering evidence, technical guarantees, and delivery process.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden hover:[transform:perspective(800px)_translateZ(8px)] hover:shadow-lg ${
                  isOpen 
                    ? "border-indigo-200 dark:border-white/[0.16] bg-white dark:bg-white/[0.03] shadow-md dark:shadow-lg ring-1 ring-indigo-500/20" 
                    : "border-slate-200 dark:border-white/[0.06] bg-white/80 dark:bg-[#0c0c0e] hover:border-slate-300 dark:hover:border-white/[0.10] shadow-xs dark:shadow-none"
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className={`font-serif text-lg sm:text-xl font-normal pr-6 transition-colors ${
                    isOpen ? "text-indigo-950 dark:text-[#f5f5f3]" : "text-slate-800 dark:text-neutral-200 group-hover:text-indigo-600 dark:group-hover:text-white"
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-xl shrink-0 transition-transform duration-300 border ${
                    isOpen 
                      ? "rotate-180 bg-indigo-50 dark:bg-white/[0.08] border-indigo-200 dark:border-white/20 text-indigo-600 dark:text-white" 
                      : "bg-slate-100 dark:bg-white/[0.02] border-slate-200 dark:border-white/[0.06] text-slate-500 dark:text-neutral-400 group-hover:text-slate-900 dark:group-hover:text-white"
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-slate-600 dark:text-neutral-300 leading-relaxed border-t border-slate-100 dark:border-white/[0.04] font-normal animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
