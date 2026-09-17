"use client";

import React, { useState } from "react";
import { 
  Briefcase, 
  TrendingUp, 
  Target, 
  CheckCircle2, 
  Sparkles, 
  Search, 
  Bell, 
  ArrowUpRight, 
  Radar, 
  Play, 
  RefreshCw,
  Compass,
  Building2,
  Send,
  Zap,
  ChevronRight
} from "lucide-react";

export default function DashboardPreview() {
  const [isRunningAnalysis, setIsRunningAnalysis] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const simulateAnalysis = () => {
    if (isRunningAnalysis) return;
    setIsRunningAnalysis(true);
    setAnalysisComplete(false);
    setAnalysisStep(1);

    setTimeout(() => setAnalysisStep(2), 1100);
    setTimeout(() => setAnalysisStep(3), 2200);
    setTimeout(() => {
      setIsRunningAnalysis(false);
      setAnalysisComplete(true);
    }, 3300);
  };

  return (
    <section id="demo" className="relative pb-24 md:pb-32 overflow-hidden bg-white dark:bg-[#080808] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container with subtle glow */}
        <div className="relative rounded-3xl p-1 sm:p-2 bg-gradient-to-b from-slate-200/80 via-slate-300/40 to-slate-200/80 dark:from-neutral-800 dark:via-neutral-900/60 dark:to-neutral-800 shadow-2xl shadow-indigo-950/20 backdrop-blur-xl">
          
          {/* Top Window Chrome */}
          <div className="bg-slate-900 dark:bg-[#0c0c0e] text-slate-300 rounded-t-[22px] px-4 py-3 flex items-center justify-between border-b border-slate-800 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline">
                https://app.clientforge.io/workspace/opportunity-intelligence
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-1.5 animate-pulse" />
                Live Opportunity Feed
              </span>
              <button
                onClick={simulateAnalysis}
                disabled={isRunningAnalysis}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  isRunningAnalysis 
                    ? "bg-slate-700 text-slate-400 cursor-not-allowed" 
                    : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-500/30 hover:scale-105 active:scale-95"
                }`}
              >
                {isRunningAnalysis ? (
                  <>
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    Synthesizing Dossier...
                  </>
                ) : (
                  <>
                    <Radar className="w-3.5 h-3.5" />
                    Simulate Signal Analysis
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Interface Body */}
          <div className="bg-white dark:bg-[#0e0e10] rounded-b-[22px] p-4 sm:p-6 lg:p-8 text-slate-900 dark:text-neutral-100 shadow-inner transition-colors">
            
            {/* Dashboard Sub-Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-neutral-800/80">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-serif font-normal text-slate-900 dark:text-[#f5f5f3] tracking-tight">
                    Vanguard Operating Pipeline
                  </h3>
                  <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 text-xs font-semibold border border-indigo-100 dark:border-indigo-800">
                    High Confidence
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 mt-1">
                  14 Active Opportunities · $385,000 Weighted Pipeline · 3 High-Intent Triggers Detected Today
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search prospects, signals, deals..."
                    className="pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-50 dark:bg-neutral-850 border border-slate-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-48 sm:w-64 text-slate-900 dark:text-white placeholder:text-slate-400"
                    readOnly
                  />
                </div>
                <div className="relative p-2 rounded-xl border border-slate-200 dark:border-neutral-700 text-slate-600 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-neutral-800 cursor-pointer">
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600" />
                </div>
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-800 text-white flex items-center justify-center font-serif font-bold text-xs shadow-sm">
                  VS
                </div>
              </div>
            </div>

            {/* Simulated Live Analysis Notification */}
            {(isRunningAnalysis || analysisComplete) && (
              <div className="mt-4 p-4 rounded-2xl bg-indigo-50/90 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 transition-all duration-300 animate-in fade-in">
                <div className="flex items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-indigo-600 text-white">
                      {analysisComplete ? <CheckCircle2 className="w-5 h-5 text-emerald-300" /> : <RefreshCw className="w-5 h-5 animate-spin" />}
                    </div>
                    <div>
                      <div className="text-sm font-bold flex items-center gap-2">
                        {isRunningAnalysis && analysisStep === 1 && "Step 1/3: Parsing company funding rounds, leadership hires & engineering triggers for Apex Global..."}
                        {isRunningAnalysis && analysisStep === 2 && "Step 2/3: Mapping key decision makers: Marcus Vance (VP Design) & Elena Ward (Head of Product)..."}
                        {isRunningAnalysis && analysisStep === 3 && "Step 3/3: Calibrating high-context opening narrative & verified value angles..."}
                        {analysisComplete && "🎉 Intelligence Dossier Compiled in 3.3 Seconds!"}
                      </div>
                      <div className="text-xs text-indigo-700 dark:text-indigo-300 mt-0.5">
                        {analysisComplete 
                          ? "Apex Global identified as $65,000 opportunity. 94% fit score. High priority: series B expansion underway." 
                          : "Client Forge is extracting verified public signals to eliminate cold generic outreach."}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-white dark:bg-neutral-800 border border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300">
                    {analysisComplete ? "DOSSIER READY" : "INVESTIGATING"}
                  </span>
                </div>
              </div>
            )}

            {/* Metrics KPI Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
              
              {/* Card 1: Active Opportunities */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900/80 border border-slate-100 dark:border-neutral-800 hover:border-indigo-200 dark:hover:border-indigo-700 hover:bg-white dark:hover:bg-neutral-850 transition-all group">
                <div className="flex items-center justify-between text-slate-500 dark:text-neutral-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Active Opportunities</span>
                  <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                    <Target className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-normal text-slate-900 dark:text-white tracking-tight">18 Deals</div>
                <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>+$120k pipeline addition</span>
                </div>
              </div>

              {/* Card 2: Weighted Pipeline Value */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900/80 border border-slate-100 dark:border-neutral-800 hover:border-emerald-200 dark:hover:border-emerald-700 hover:bg-white dark:hover:bg-neutral-850 transition-all group">
                <div className="flex items-center justify-between text-slate-500 dark:text-neutral-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Weighted Pipeline</span>
                  <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-normal text-slate-900 dark:text-white tracking-tight">$385,000</div>
                <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>84% stage confidence</span>
                </div>
              </div>

              {/* Card 3: Qualified Match Rate */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900/80 border border-slate-100 dark:border-neutral-800 hover:border-violet-200 dark:hover:border-violet-700 hover:bg-white dark:hover:bg-neutral-850 transition-all group">
                <div className="flex items-center justify-between text-slate-500 dark:text-neutral-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Qualified Match Rate</span>
                  <div className="p-1.5 rounded-lg bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-normal text-slate-900 dark:text-white tracking-tight">74.2%</div>
                <div className="flex items-center gap-1 text-xs text-violet-600 dark:text-violet-400 font-semibold mt-1">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>High-intent fit</span>
                </div>
              </div>

              {/* Card 4: Avg Time to Pitch */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900/80 border border-slate-100 dark:border-neutral-800 hover:border-amber-200 dark:hover:border-amber-700 hover:bg-white dark:hover:bg-neutral-850 transition-all group">
                <div className="flex items-center justify-between text-slate-500 dark:text-neutral-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Avg Time to Pitch</span>
                  <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                    <Zap className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-normal text-slate-900 dark:text-white tracking-tight">2.4 Days</div>
                <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                  <span>Down from 2.5 weeks</span>
                </div>
              </div>

            </div>

            {/* Dashboard Lower Section: Split View */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              
              {/* Left 2 Cols: Pipeline Stream & Detailed Dossier */}
              <div className="lg:col-span-2 p-5 rounded-2xl border border-slate-100 dark:border-neutral-800 bg-white dark:bg-neutral-900/60">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-serif text-slate-900 dark:text-white text-lg">Opportunity Velocity by Stage</h4>
                    <p className="text-xs text-slate-500 dark:text-neutral-400">Track deals moving from initial signal to signed client engagement</p>
                  </div>
                  <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-lg">
                    Real-time Pipeline
                  </span>
                </div>

                {/* Progress bar visual for pipeline distribution */}
                <div className="space-y-3">
                  <div className="w-full h-3 bg-slate-100 dark:bg-neutral-800 rounded-full overflow-hidden flex">
                    <div className="h-full bg-indigo-500" style={{ width: '30%' }} title="Discovered: 30%" />
                    <div className="h-full bg-emerald-500" style={{ width: '25%' }} title="Intelligence Ready: 25%" />
                    <div className="h-full bg-amber-500" style={{ width: '25%' }} title="In Conversation: 25%" />
                    <div className="h-full bg-violet-500" style={{ width: '20%' }} title="Negotiating: 20%" />
                  </div>

                  {/* Legend */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                      <span className="text-slate-600 dark:text-neutral-400">Discovered (5)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="text-slate-600 dark:text-neutral-400">Dossier Ready (4)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span className="text-slate-600 dark:text-neutral-400">In Pitch (3)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-violet-500" />
                      <span className="text-slate-600 dark:text-neutral-400">Negotiating (2)</span>
                    </div>
                  </div>
                </div>

                {/* High Priority Opportunity Card */}
                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-neutral-800">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-xs font-bold text-slate-800 dark:text-neutral-200 uppercase tracking-wider">
                      Featured Opportunity Dossier
                    </h5>
                    <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold cursor-pointer hover:underline">
                      View Full Dossier &rarr;
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-neutral-850 border border-slate-200/80 dark:border-neutral-750">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/60 dark:border-neutral-800">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white text-base">Apex Global Systems</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            94% MATCH FIT
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                          Target: Marcus Vance (VP Design) • Potential Scope: $65,000 Retainer
                        </div>
                      </div>
                      <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300">
                        STAGE: PITCH READY
                      </span>
                    </div>

                    <div className="pt-3 space-y-2 text-xs">
                      <div>
                        <span className="font-semibold text-slate-800 dark:text-neutral-200">Verified Trigger:</span>
                        <p className="text-slate-600 dark:text-neutral-400 mt-0.5">
                          Closed $35M Series B. Current product team expanding to EMEA with fragmented component libraries.
                        </p>
                      </div>
                      <div>
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400">Strategic Opening Hook:</span>
                        <p className="text-slate-600 dark:text-neutral-400 mt-0.5 italic">
                          "Marcus—congratulations on the Series B. Scaling product design across 3 recently acquired squads usually creates design debt fast. We built a unified token system for Hyperline in 3 weeks. Worth 15 minutes to share our blueprint?"
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right 1 Col: Live Signal Intelligence Stream */}
              <div className="p-5 rounded-2xl border border-slate-100 dark:border-neutral-800 bg-slate-50/60 dark:bg-neutral-900/60">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-serif text-slate-900 dark:text-white text-base flex items-center gap-1.5">
                    <Radar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    Live Signal Feeds
                  </h4>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded">
                    STREAMING
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-850 border border-slate-200/80 dark:border-neutral-800 shadow-2xs">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> Capital Raise
                      </span>
                      <span>12m ago</span>
                    </div>
                    <p className="text-slate-700 dark:text-neutral-300 font-medium">
                      <span className="font-bold text-slate-900 dark:text-white">NovaScale</span> closed $12M Series A. Architecture overhaul trigger detected.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-850 border border-slate-200/80 dark:border-neutral-800 shadow-2xs">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <Building2 className="w-3 h-3" /> Executive Move
                      </span>
                      <span>34m ago</span>
                    </div>
                    <p className="text-slate-700 dark:text-neutral-300 font-medium">
                      New VP Growth at <span className="font-bold text-slate-900 dark:text-white">CloudFleet</span>. Reviewing external advisory roster for Q3.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-850 border border-slate-200/80 dark:border-neutral-800 shadow-2xs">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span className="font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                        <Target className="w-3 h-3" /> Role Signals
                      </span>
                      <span>1h ago</span>
                    </div>
                    <p className="text-slate-700 dark:text-neutral-300 font-medium">
                      <span className="font-bold text-slate-900 dark:text-white">Synthetix</span> opened 3 contract positions for Design Systems Architects.
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-neutral-800 text-center">
                  <a href="#features" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 inline-flex items-center gap-1">
                    Explore all 20+ trigger types <ArrowUpRight className="w-3 h-3" />
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
