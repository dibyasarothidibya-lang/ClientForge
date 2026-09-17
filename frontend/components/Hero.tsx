"use client";

import React from "react";
import { 
  ArrowRight, 
  Play, 
  Sparkles, 
  Radar,
  TrendingUp,
  Compass
} from "lucide-react";

export default function Hero() {
  return (
    <section id="_hero_agency_showcase_v6_001" className="pt-28 pb-20 sm:pt-36 sm:pb-28 bg-white dark:bg-[#080808] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Editorial Header */}
        <div className="text-center max-w-4xl mx-auto mb-14 sm:mb-18">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-300 text-xs font-semibold mb-6 shadow-xs tracking-wider uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="font-semibold">Client Intelligence · Pipeline · Conversion</span>
          </div>

          {/* Luxury Editorial Serif Headline */}
          <h1 className="display-xl text-slate-950 dark:text-[#f5f5f3] tracking-tight mb-4">
            Turn Better Opportunities <br />
            Into Better Clients.
          </h1>

          {/* Editorial Italic Gradient Accent */}
          <div className="editorial-italic text-2xl sm:text-3xl md:text-4xl text-slate-600 dark:text-neutral-400 mb-7">
            <span className="gradient-text font-serif italic">Without the Guesswork.</span>
          </div>

          {/* Supporting Copy */}
          <p className="body-lg text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Client Forge brings prospect intelligence, outreach preparation, opportunity pipelines, and client operations into one focused workspace—so you can spend less time searching and more time moving the right work forward.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap justify-center items-center gap-4">
            <a 
              href="#pricing" 
              className="px-8 py-4 bg-slate-950 dark:bg-white hover:bg-slate-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-semibold text-sm rounded-full transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Start Forging</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="#demo" 
              className="px-8 py-4 border border-slate-300 dark:border-neutral-800 hover:bg-slate-50 dark:hover:bg-neutral-900 text-slate-800 dark:text-neutral-200 font-semibold text-sm rounded-full transition-all"
            >
              Explore the Platform
            </a>
          </div>

        </div>

        {/* Bento Grid Layout with Team & Workflow Photography */}
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Main Dossier Card - spans 8 columns */}
          <div className="lg:col-span-8">
            <div className="relative rounded-3xl overflow-hidden h-84 sm:h-96 lg:h-[460px] group border border-slate-200/80 dark:border-neutral-800/80 shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80" 
                alt="Independent team preparing client pitch and evaluating dossiers" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              
              <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between gap-4">
                <div>
                  <span className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                    <Radar className="w-3.5 h-3.5" />
                    PROSPECT INTELLIGENCE & CONTEXT
                  </span>
                  <h3 className="section-title text-white font-serif tracking-tight text-2xl sm:text-3xl mb-1.5">
                    Walk Into Every Pitch Already Informed.
                  </h3>
                  <p className="text-neutral-300 text-xs sm:text-sm max-w-xl hidden sm:block leading-relaxed">
                    Turn scattered information into a clear picture of the company, the opportunity, and the key stakeholders. Research faster and start conversations with real context.
                  </p>
                </div>

                <a 
                  href="#demo" 
                  className="w-12 h-12 rounded-2xl bg-white/15 hover:bg-indigo-600 text-white backdrop-blur-md flex items-center justify-center shrink-0 transition-all group-hover:scale-110 border border-white/20"
                  aria-label="View live intelligence preview"
                >
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - 4 columns */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Value Proposition Card */}
            <div className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 rounded-3xl p-7 flex-1 flex flex-col justify-between text-white shadow-xl border border-neutral-800">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-300 text-xs font-semibold mb-4 border border-indigo-500/30">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                  THE WORK BEHIND THE WIN
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-white tracking-tight mb-2.5">
                  Stop Guessing Who Is Worth Your Time.
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  Qualify companies with real signals, prioritize high-value opportunities, and track conversation velocity without spreadsheet fatigue.
                </p>
              </div>

              <a 
                href="#features" 
                className="mt-6 inline-flex items-center justify-between px-5 py-3.5 bg-white text-neutral-950 hover:bg-neutral-100 font-semibold text-sm rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] group"
              >
                <span>Open Your Pipeline</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Strategic Workflow Photo Card */}
            <div className="relative rounded-3xl overflow-hidden h-48 sm:h-52 group border border-slate-200/80 dark:border-neutral-800/80 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&auto=format&fit=crop&q=80" 
                alt="Strategy session aligning client requirements" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                <div>
                  <span className="text-white font-serif text-lg block">Stage Momentum</span>
                  <span className="text-indigo-300 text-xs">From Signal to Signed Client</span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                  Verified Signals
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Real Outcome Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-18 pt-14 border-t border-slate-200/80 dark:border-neutral-900">
          <div className="text-center sm:text-left">
            <span className="metric text-slate-900 dark:text-white block">3.4×</span>
            <span className="text-sm font-semibold text-slate-900 dark:text-neutral-200 mt-1 block">Faster Prospect Context</span>
            <span className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5 block">From hours of scattered research to immediate executive dossiers.</span>
          </div>
          <div className="text-center sm:text-left">
            <span className="metric text-slate-900 dark:text-white block">14 hrs</span>
            <span className="text-sm font-semibold text-slate-900 dark:text-neutral-200 mt-1 block">Reclaimed Weekly</span>
            <span className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5 block">No more cross-referencing tabs, social feeds, and news alerts.</span>
          </div>
          <div className="text-center sm:text-left">
            <span className="metric text-slate-900 dark:text-white block">62%</span>
            <span className="text-sm font-semibold text-slate-900 dark:text-neutral-200 mt-1 block">Higher Reply-to-Pitch Rate</span>
            <span className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5 block">Pitches grounded in verified company triggers and strategic pain points.</span>
          </div>
          <div className="text-center sm:text-left">
            <span className="metric text-slate-900 dark:text-white block">Zero</span>
            <span className="text-sm font-semibold text-slate-900 dark:text-neutral-200 mt-1 block">Spreadsheet Chaos</span>
            <span className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5 block">A clear operating system for every conversation and contract.</span>
          </div>
        </div>

      </div>
    </section>
  );
}
