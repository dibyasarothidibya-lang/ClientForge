"use client";

import React, { useState } from "react";
import { 
  Calculator, 
  ArrowRight, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Sparkles,
  CheckCircle2
} from "lucide-react";

export default function RoiCalculator() {
  const [opportunities, setOpportunities] = useState(12);
  const [avgDealValue, setAvgDealValue] = useState(25000);

  // Dynamic calculations:
  // - 4.5 hours reclaimed per prospect dossier (eliminates manual LinkedIn/Google/news tracking)
  // - +18% win-rate lift from verified signals & personalized context hooks
  const hoursReclaimedPerMonth = Math.round(opportunities * 4.5);
  const annualHoursReclaimed = hoursReclaimedPerMonth * 12;
  const additionalDealsPerYear = Math.max(1, Math.round(opportunities * 0.18 * 12));
  const estimatedRevenueLift = Math.round(opportunities * avgDealValue * 0.22);

  return (
    <section id="calculator" className="py-20 md:py-28 bg-white dark:bg-[#080808] border-t border-slate-200/60 dark:border-neutral-900 transition-colors relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="ui-label text-indigo-600 dark:text-indigo-400 mb-3 block">
            Value & Velocity Audit
          </span>
          <h2 className="section-title text-slate-950 dark:text-[#f5f5f3] tracking-tight mb-3">
            Calculate the Return <br className="hidden sm:inline" />
            on Focused Client Acquisition.
          </h2>
          <div className="editorial-italic text-2xl sm:text-3xl text-slate-600 dark:text-neutral-400 mb-6">
            <span className="gradient-text font-serif italic">See What Clarity Is Worth.</span>
          </div>
          <p className="body-lg text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Estimate the monthly hours reclaimed from manual prospect research and the additional contract revenue unlocked by moving on qualified signals faster.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="max-w-5xl mx-auto rounded-3xl border border-slate-200 dark:border-neutral-800 bg-gradient-to-br from-slate-50 via-white to-indigo-50/20 dark:from-neutral-900 dark:via-[#0c0c0e] dark:to-neutral-900 p-6 sm:p-10 lg:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Controls: Sliders */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Slider 1: Opportunities Handled per Month */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label htmlFor="opportunities" className="text-sm font-semibold text-slate-900 dark:text-white">
                    Monthly Potential Opportunities Evaluated
                  </label>
                  <span className="font-serif text-lg text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-xl border border-indigo-100 dark:border-indigo-800">
                    {opportunities} Opportunities
                  </span>
                </div>
                <input
                  id="opportunities"
                  type="range"
                  min="3"
                  max="40"
                  step="1"
                  value={opportunities}
                  onChange={(e) => setOpportunities(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-slate-400 dark:text-neutral-500 mt-2 font-mono">
                  <span>3 Opportunities (Solo)</span>
                  <span>20 (Studio)</span>
                  <span>40+ (Agency)</span>
                </div>
              </div>

              {/* Slider 2: Average Client Value */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label htmlFor="dealValue" className="text-sm font-semibold text-slate-900 dark:text-white">
                    Average Client Engagement Value
                  </label>
                  <span className="font-serif text-lg text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-xl border border-indigo-100 dark:border-indigo-800">
                    ${avgDealValue.toLocaleString()}
                  </span>
                </div>
                <input
                  id="dealValue"
                  type="range"
                  min="5000"
                  max="100000"
                  step="5000"
                  value={avgDealValue}
                  onChange={(e) => setAvgDealValue(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-slate-400 dark:text-neutral-500 mt-2 font-mono">
                  <span>$5,000 (Advisory)</span>
                  <span>$50,000</span>
                  <span>$100,000+ (Retainer)</span>
                </div>
              </div>

              {/* Verified Impact Points */}
              <div className="space-y-3 pt-4 border-t border-slate-200/80 dark:border-neutral-800">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-neutral-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Replaces scattered spreadsheets, manual LinkedIn scraping, and notes apps</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-neutral-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Eliminates cold generic pitches by synthesizing verified context before outreach</span>
                </div>
              </div>

            </div>

            {/* Right Output: Impact Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-neutral-950 text-white p-6 sm:p-8 shadow-2xl border border-neutral-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center justify-between text-xs text-neutral-400 pb-4 border-b border-neutral-800">
                  <span className="font-semibold uppercase tracking-wider text-emerald-400">
                    Projected Pipeline Lift
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold">
                    18.4× LEVERAGE
                  </span>
                </div>

                {/* Primary Metric: Revenue Unlocked */}
                <div className="mt-6">
                  <div className="text-xs text-neutral-400 font-medium">Estimated Additional Contract Pipeline</div>
                  <div className="metric text-white tracking-tight mt-1 text-emerald-400">
                    ${estimatedRevenueLift.toLocaleString()}
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">
                    Generated through higher reply rates and accelerated deal cycles
                  </div>
                </div>

                {/* Secondary Metrics */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-neutral-800">
                  <div>
                    <div className="text-xs text-neutral-400">Research Hours Reclaimed</div>
                    <div className="font-serif text-2xl text-white mt-0.5">{hoursReclaimedPerMonth} hrs/mo</div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">{annualHoursReclaimed} hrs/year</div>
                  </div>

                  <div>
                    <div className="text-xs text-neutral-400">Time to High-Context Pitch</div>
                    <div className="font-serif text-2xl text-indigo-400 mt-0.5">2.4 Days</div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">Down from 18 days</div>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="mt-8">
                  <a
                    href="#pricing"
                    className="w-full inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-neutral-950 bg-white hover:bg-neutral-200 rounded-xl transition-colors shadow-md group"
                  >
                    Start Forging Today
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
