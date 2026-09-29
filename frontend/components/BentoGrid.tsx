"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Bot, 
  ShieldCheck, 
  Network, 
  LineChart, 
  Puzzle, 
  Sparkles, 
  Check, 
  ArrowRight,
  Layers,
  RefreshCw,
  Zap,
  Globe2,
  Radar
} from "lucide-react";
import ThreeDCard from "./motion/ThreeDCard";

export default function BentoGrid() {
  const [aiQuestion] = useState("What is Apex Global's primary design bottleneck following their Series B?");

  return (
    <section id="telemetry" className="py-20 sm:py-28 bg-white/20 dark:bg-[#080808]/20 backdrop-blur-[1px] transition-colors border-t border-slate-200/60 dark:border-neutral-900 scroll-mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Editorial Header with Studio Image */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16 sm:mb-20">
          <div>
            <span className="ui-label text-indigo-600 dark:text-indigo-400 mb-3 block">
              The Client Forge Operating Model
            </span>
            <h2 className="section-title text-slate-950 dark:text-[#f5f5f3] mb-4">
              Everything Between <br />
              Finding and Winning.
            </h2>
            <div className="editorial-italic text-2xl sm:text-3xl text-slate-600 dark:text-neutral-400 mb-6">
              <span className="gradient-text font-serif italic">Built for the Work Behind the Win.</span>
            </div>
            <p className="body-lg text-slate-600 dark:text-neutral-400 mb-8 max-w-xl leading-relaxed">
              Great work does not begin with a signed agreement. It begins with identifying the opportunities worth pursuing, knowing who sits on the other side, and moving with precision.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link 
                href="/pricing" 
                className="px-7 py-3.5 bg-slate-950 dark:bg-white text-white dark:text-neutral-950 hover:bg-slate-800 dark:hover:bg-neutral-200 font-semibold text-sm rounded-full transition-all shadow-md"
              >
                Start Forging
              </Link>
              <Link 
                href="/workspace" 
                className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:gap-3 transition-all duration-300"
              >
                Explore Live Pipeline
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-neutral-800 group">
              <img 
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&auto=format&fit=crop&q=80" 
                alt="Strategy session analyzing client opportunity roadmap" 
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                <div>
                  <span className="text-xs uppercase font-bold text-indigo-300">Opportunity Intelligence</span>
                  <div className="font-serif text-xl font-normal">Context Over Cold Pitching</div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-600 text-white">
                  Verified Insights
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars Grid (Restrained, Quiet Architectural Cards) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Pillar 1: Prospect Intelligence */}
          <div className="p-6 sm:p-7 bg-white/80 dark:bg-white/[0.02] rounded-3xl border border-slate-200/80 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/15 transition-all duration-300 flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-neutral-300 border border-slate-200/60 dark:border-white/10 rounded-xl flex items-center justify-center mb-4">
                <Radar className="w-5 h-5 text-indigo-500" />
              </div>
              <span className="text-xs font-sans font-medium uppercase tracking-wider text-slate-500 dark:text-neutral-400 block mb-2">
                Prospect Intelligence
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-slate-900 dark:text-white mb-2 leading-snug">
                Know Before You Pitch.
              </h3>
              <p className="text-slate-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed font-sans">
                Turn scattered public signals into a clear picture of the company, their tech stack, leadership hires, and strategic priorities.
              </p>
            </div>
          </div>

          {/* Pillar 2: Opportunity Pipeline */}
          <div className="p-6 sm:p-7 bg-white/80 dark:bg-white/[0.02] rounded-3xl border border-slate-200/80 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/15 transition-all duration-300 flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-neutral-300 border border-slate-200/60 dark:border-white/10 rounded-xl flex items-center justify-center mb-4">
                <LineChart className="w-5 h-5 text-indigo-500" />
              </div>
              <span className="text-xs font-sans font-medium uppercase tracking-wider text-slate-500 dark:text-neutral-400 block mb-2">
                Opportunity Pipeline
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-slate-900 dark:text-white mb-2 leading-snug">
                Never Lose an Opportunity.
              </h3>
              <p className="text-slate-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed font-sans">
                Track potential work across transparent stages of conviction. Monitor deal velocity, weighted value, and next moves without spreadsheet chaos.
              </p>
            </div>
          </div>

          {/* Pillar 3: Outreach Calibration */}
          <div className="p-6 sm:p-7 bg-white/80 dark:bg-white/[0.02] rounded-3xl border border-slate-200/80 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/15 transition-all duration-300 flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-neutral-300 border border-slate-200/60 dark:border-white/10 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-5 h-5 text-indigo-500" />
              </div>
              <span className="text-xs font-sans font-medium uppercase tracking-wider text-slate-500 dark:text-neutral-400 block mb-2">
                Outreach Calibration
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-slate-900 dark:text-white mb-2 leading-snug">
                Context That Starts Dialogues.
              </h3>
              <p className="text-slate-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed font-sans">
                Never pitch cold. Ground every outreach in verified business triggers, organizational changes, and high-leverage pain points.
              </p>
            </div>
          </div>

          {/* Pillar 4: Client Operations */}
          <div className="p-6 sm:p-7 bg-white/80 dark:bg-white/[0.02] rounded-3xl border border-slate-200/80 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/15 transition-all duration-300 flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-neutral-300 border border-slate-200/60 dark:border-white/10 rounded-xl flex items-center justify-center mb-4">
                <Layers className="w-5 h-5 text-indigo-500" />
              </div>
              <span className="text-xs font-sans font-medium uppercase tracking-wider text-slate-500 dark:text-neutral-400 block mb-2">
                Client Operations
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-slate-900 dark:text-white mb-2 leading-snug">
                Every Relationship. Every Detail.
              </h3>
              <p className="text-slate-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed font-sans">
                Transition closed opportunities into active client delivery. Maintain full conversational context, milestones, and relationship health.
              </p>
            </div>
          </div>

        </div>

        {/* Intelligence Query Showcase Box */}
        <div className="rounded-3xl bg-[#0c0c0e] text-white p-7 sm:p-10 border border-white/[0.08] shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-widest font-sans">
                <Bot className="w-4 h-4" />
                <span>Opportunity Intelligence Assistant</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                Ask any prospect or opportunity question. Get verified context.
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed font-sans">
                Query company milestones, executive priorities, and competitive gaps in plain English—grounded in verified signals without hallucinated noise.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="p-4 rounded-2xl bg-black/60 border border-white/[0.08] shadow-inner space-y-3 font-sans">
                <div className="flex items-center gap-2 text-[11px] text-neutral-400 border-b border-white/[0.06] pb-2">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Client Forge Research Engine</span>
                </div>
                
                <div className="flex items-start gap-2 text-xs">
                  <div className="w-6 h-6 rounded-full bg-slate-800 text-white font-sans font-bold text-[10px] flex items-center justify-center shrink-0">
                    VS
                  </div>
                  <div className="bg-white/[0.06] border border-white/[0.06] px-3 py-2 rounded-xl text-neutral-200">
                    "{aiQuestion}"
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs">
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-sans font-bold text-[10px] flex items-center justify-center shrink-0">
                    CF
                  </div>
                  <div className="bg-neutral-900/90 border border-white/[0.1] px-3.5 py-2.5 rounded-xl text-neutral-200 space-y-1.5 w-full">
                    <div className="text-indigo-400 font-semibold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>High-Intent Opportunity Angle Identified</span>
                    </div>
                    <p className="text-neutral-300 text-[11px] leading-relaxed">
                      Series B expansion into US enterprise triggered 3 product acquisitions with fragmented design tokens. Marcus Vance (VP Design) is actively seeking external architectural systems guidance before Q4 launch.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
