"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Sparkles, Shield, Lock } from "lucide-react";

export default function CtaBanner() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-[#080808] border-t border-slate-200/80 dark:border-white/[0.06] transition-colors duration-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Luxury Card Container */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#141418] via-[#0f0f13] to-[#0a0a0c] border border-white/[0.09] p-8 sm:p-14 lg:p-20 text-white overflow-hidden shadow-2xl">
          
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            
            {/* Monospace Micro-Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 text-xs font-mono tracking-wider uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              <span>Opportunity Intelligence Engine</span>
            </div>

            {/* Editorial Headline */}
            <h2 className="section-title text-[#f5f5f3] tracking-tight leading-tight mb-6">
              Stop Guessing. <br className="hidden sm:inline" />
              <span className="editorial-italic gradient-text">Start Winning Better Work.</span>
            </h2>

            <p className="body-lg text-neutral-300 mb-10 max-w-2xl mx-auto font-normal">
              Equip your advisory firm or boutique studio with verified executive triggers, deep architectural dossiers, and calibrated opportunity pipelines.
            </p>

            {/* Form Experience */}
            {isSubmitted ? (
              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-medium max-w-md mx-auto flex items-center justify-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Workspace initialized. Check your inbox for your access key.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email..."
                  required
                  className="w-full px-5 py-4 rounded-xl bg-white/[0.05] border border-white/[0.12] text-white placeholder:text-neutral-500 text-sm focus:outline-none focus:border-indigo-400 focus:bg-white/[0.08] transition-all font-sans"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-xl bg-[#f5f5f3] hover:bg-white text-neutral-950 text-sm font-semibold tracking-tight transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shadow-xl"
                >
                  Start Forging
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </form>
            )}

            {/* Quiet Reassurance Badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-neutral-400 font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>14-day full signal trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-indigo-400" />
                <span>Zero credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-neutral-400" />
                <span>Private workspace encryption</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
