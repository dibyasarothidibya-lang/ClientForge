"use client";

import React from "react";
import { Star, Quote, ArrowUpRight } from "lucide-react";
import ThreeDCard from "./motion/ThreeDCard";

const testimonials = [
  {
    quote: "The dossier generation alone saves us eight hours before every major consultation. Walking into introductory calls understanding their precise executive transitions and tech stack friction points gives us an immediate, undeniable authority advantage.",
    name: "Elena Rostova",
    title: "Principal & Brand Strategist",
    firm: "Rostova Advisory",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
    dealMetric: "$120k Retainer"
  },
  {
    quote: "Traditional CRMs are bloated contact rolodexes built for SDR spam armies. Client Forge is the first intelligence engine built for senior partners who actually deliver the work and need deep, contextual signal.",
    name: "Marcus Thorne",
    title: "Fractional VP of Engineering",
    firm: "Thorne Systems & Architecture",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80",
    dealMetric: "3.2x Deal Velocity"
  },
  {
    quote: "We replaced spreadsheet fragmentation and cold guessing with calibrated opportunity signals. Closed a $145,000 multi-quarter enterprise engagement within thirty days of onboarding.",
    name: "Siddharth Mehta",
    title: "Managing Director",
    firm: "Kroma Interactive Lab",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    dealMetric: "+$145k Contract"
  }
];

export default function Testimonials() {
  return (
    <section id="reviews" className="py-24 sm:py-32 bg-white/20 dark:bg-[#080808]/20 backdrop-blur-[1px] border-t border-slate-200/80 dark:border-white/[0.06] transition-colors duration-200 relative z-10 overflow-hidden scroll-mt-20">
      {/* Subtle atmospheric ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-br from-indigo-500/10 via-teal-500/5 to-transparent dark:from-indigo-900/10 dark:via-teal-900/5 dark:to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Editorial Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] text-slate-600 dark:text-neutral-400 text-xs tracking-wider uppercase mb-5 font-sans font-medium shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"></span>
            Operator Perspectives
          </div>
          
          <h2 className="section-title text-slate-950 dark:text-[#f5f5f3] tracking-tight">
            Perspectives From Those <span className="editorial-italic gradient-text">Doing the Work.</span>
          </h2>
          
          <p className="body-lg text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto mt-4 font-normal">
            Independent principals, boutique studio partners, and specialized advisory practices on how Client Forge reshaped their client acquisition velocity.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Large Featured Testimonial Card (Spans 2 cols, 2 rows) */}
          <ThreeDCard glareColor="#6366f1" maxTilt={6} elevationZ={20} className="lg:col-span-2 lg:row-span-2 h-full">
            <div className="rounded-3xl p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-[#121214] dark:to-[#0c0c0e] border border-slate-200 dark:border-white/[0.08] shadow-xl dark:shadow-2xl h-full">
              <div className="absolute top-0 right-0 p-8 text-slate-900/[0.04] dark:text-white/[0.04] pointer-events-none">
                <Quote className="w-28 h-28" />
              </div>

              <div className="relative z-10">
                {/* Trust Badge */}
                <div className="flex items-center gap-2 mb-8">
                  <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-sans font-medium uppercase tracking-wider text-slate-500 dark:text-neutral-400 ml-2">Verified Engagement</span>
                </div>

                {/* Big Quote */}
                <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-slate-950 dark:text-[#f5f5f3] leading-snug tracking-tight mb-8">
                  “We completely stopped sending speculative pitches to cold inboxes. With Client Forge, every outreach conversation starts from verified executive transition and technical debt signals. Our proposal-to-signed-client rate shifted from one-in-ten to nearly <span className="editorial-italic gradient-text">one-in-two</span>.”
                </blockquote>
              </div>

              {/* Author Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-slate-200 dark:border-white/[0.08] relative z-10">
                <div className="flex items-center gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80" 
                    alt="Julian Vance" 
                    className="w-14 h-14 rounded-full object-cover border-2 border-slate-200 dark:border-white/10 shadow-lg"
                  />
                  <div>
                    <h4 className="font-medium text-slate-950 dark:text-[#f5f5f3] text-lg">Julian Vance</h4>
                    <p className="text-sm text-slate-600 dark:text-neutral-400 font-normal">Founding Partner, Vanguard Systems Advisory</p>
                    <span className="text-xs text-slate-500 dark:text-neutral-400 font-sans">Specialized Enterprise Architecture • London & Zurich</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08]">
                  <span className="text-xs font-sans text-slate-900 dark:text-white font-semibold">+240%</span>
                  <span className="text-xs text-slate-600 dark:text-neutral-400 font-sans">Annual contract value</span>
                </div>
              </div>
            </div>
          </ThreeDCard>

          {/* Photo & Mission Card */}
          <ThreeDCard glareColor="#38bdf8" maxTilt={8} elevationZ={18} className="h-64 lg:h-auto">
            <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-white/[0.08] shadow-md dark:shadow-lg relative group h-full bg-slate-950 dark:bg-[#101012]">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80" 
                alt="Client Forge boutique studio workspace" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex flex-col justify-end p-6">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-indigo-300 mb-1">
                  Studio Philosophy
                </span>
                <div className="font-serif text-lg text-white font-normal leading-snug">
                  Fewer clients. Higher stakes. Uncompromised delivery.
                </div>
              </div>
            </div>
          </ThreeDCard>

          {/* Key Metric Card */}
          <ThreeDCard glareColor="#10b981" maxTilt={8} elevationZ={18} className="h-full">
            <div className="rounded-3xl p-8 flex flex-col justify-center bg-gradient-to-b from-slate-50 to-white dark:from-[#141417] dark:to-[#0d0d0f] border border-slate-200 dark:border-white/[0.08] shadow-md dark:shadow-lg relative overflow-hidden h-full">
              <div className="text-xs font-sans font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-400 mb-2">Portfolio Impact</div>
              <div className="font-sans text-4xl md:text-5xl font-normal md:font-medium tracking-tight tabular-nums text-slate-950 dark:text-white">68%</div>
              <p className="text-slate-600 dark:text-neutral-300 text-sm font-normal mt-2 leading-relaxed">
                Average increase in closed deal size within 90 days of adopting dossier-backed opportunity intelligence.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400 font-sans">
                <span>Sample: 420+ Studios</span>
                <span>Verified Q2 2026</span>
              </div>
            </div>
          </ThreeDCard>

          {/* 3 Operator Quotation Cards */}
          {testimonials.map((item, idx) => (
            <ThreeDCard key={idx} glareColor="#6366f1" maxTilt={8} elevationZ={16} className="h-full">
              <div 
                className="rounded-2xl p-6 bg-slate-50/70 dark:bg-[#0e0e10] border border-slate-200/80 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/[0.12] transition-colors flex flex-col justify-between group shadow-xs dark:shadow-none h-full"
              >
                <p className="text-slate-700 dark:text-neutral-300 text-sm leading-relaxed mb-6 font-normal">
                  "{item.quote}"
                </p>
                
                <div className="pt-4 border-t border-slate-200/80 dark:border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.avatar} 
                      alt={item.name} 
                      className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-white/10"
                    />
                    <div>
                      <h5 className="font-medium text-sm text-slate-950 dark:text-[#f5f5f3]">{item.name}</h5>
                      <p className="text-xs text-slate-500 dark:text-neutral-500">{item.title}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-sans font-medium px-2 py-1 rounded bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-neutral-300 shadow-xs dark:shadow-none">
                    {item.dealMetric}
                  </span>
                </div>
              </div>
            </ThreeDCard>
          ))}

        </div>

      </div>
    </section>
  );
}
