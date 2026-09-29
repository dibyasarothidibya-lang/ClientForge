"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import HeroHeadline from "./hero/HeroHeadline";
import { 
  TrendingUp, 
  Users, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Globe2, 
  CreditCard, 
  Activity, 
  MapPin,
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from "lucide-react";

export default function Hero() {
  const [activeConsoleTab, setActiveConsoleTab] = useState<"overview" | "workforce" | "payroll" | "pipeline">("overview");

  const metrics = [
    {
      label: "RETENTION RATE",
      value: "+18.4%",
      detail: "Increase in top-performer retention year-over-year.",
      icon: TrendingUp,
    },
    {
      label: "TIME TO PRODUCTIVITY",
      value: "3 Days",
      detail: "From contract signature to live autonomous delivery.",
      icon: Clock,
    },
    {
      label: "CULTURE INDEX",
      value: "94 / 100",
      detail: "Real-time sentiment score & team cohesion index.",
      icon: Users,
    },
    {
      label: "RECRUITMENT VELOCITY",
      value: "10x Sourcing",
      detail: "Skill-grounded candidate matching pipeline.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section 
      id="hero-section"
      className="relative z-10 pt-24 sm:pt-32 pb-20 sm:pb-28 overflow-hidden text-slate-900 dark:text-white transition-colors duration-200"
    >
      {/* Subtle Background Radial Atmosphere */}
      <div 
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[380px] bg-gradient-to-b from-indigo-500/5 dark:from-zinc-800/20 via-transparent to-transparent blur-[140px] pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Hero Content & Copy */}
        <HeroHeadline />

        {/* 2. THE ONE HIGH-END PRODUCT VISUAL CENTERPIECE */}
        <div className="mt-14 sm:mt-18 relative w-full max-w-5xl mx-auto">
          {/* Subtle Outer Glow Edge */}
          <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-b from-indigo-500/20 via-white/5 to-transparent blur-md opacity-40 -z-10" />

          {/* Master Viewport Container */}
          <div className="rounded-3xl border border-slate-200/90 dark:border-white/[0.1] bg-white/95 dark:bg-[#0c0c0f] shadow-2xl backdrop-blur-2xl overflow-hidden text-left">
            
            {/* Viewport Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-7 py-4 border-b border-slate-200/80 dark:border-white/[0.08] bg-slate-50/70 dark:bg-white/[0.02]">
              {/* Left: Window Controls & System Breadcrumb */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-neutral-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-neutral-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-neutral-700" />
                </div>
                <span className="text-xs font-mono font-medium text-slate-500 dark:text-neutral-400 pl-2 border-l border-slate-200 dark:border-white/10 hidden sm:inline-block">
                  clientforge-os://global-mission-control
                </span>
              </div>

              {/* Center: Interactive Tabs */}
              <div className="flex items-center gap-1 bg-slate-200/70 dark:bg-white/[0.06] p-1 rounded-xl text-xs font-sans font-medium">
                {[
                  { id: "overview", label: "Executive Overview" },
                  { id: "workforce", label: "Workforce Ledger" },
                  { id: "payroll", label: "Payroll Clearing" },
                  { id: "pipeline", label: "Talent Radar" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveConsoleTab(tab.id as "overview" | "workforce" | "payroll" | "pipeline")}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer select-none ${
                      activeConsoleTab === tab.id
                        ? "bg-white dark:bg-neutral-900 text-slate-950 dark:text-white font-semibold shadow-xs"
                        : "text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Right: Direct Link Action */}
              <Link
                href="/workspace"
                className="hidden md:inline-flex items-center gap-1.5 text-xs font-sans font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
              >
                <span>Live Workspace</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Viewport Canvas Body */}
            <div className="p-6 sm:p-8 min-h-[380px]">
              <AnimatePresence mode="wait">
                {activeConsoleTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    {/* Telemetry Numbers Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06]">
                        <span className="text-[11px] font-sans font-medium text-slate-500 dark:text-neutral-400 uppercase tracking-wider block">
                          Active Workforce
                        </span>
                        <div className="font-sans text-2xl sm:text-3xl font-medium text-slate-950 dark:text-white tabular-nums mt-1">
                          248 FTE
                        </div>
                        <span className="text-[11px] font-sans text-indigo-600 dark:text-indigo-400 mt-0.5 block">
                          100% verified identities
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06]">
                        <span className="text-[11px] font-sans font-medium text-slate-500 dark:text-neutral-400 uppercase tracking-wider block">
                          Retention Stability
                        </span>
                        <div className="font-sans text-2xl sm:text-3xl font-medium text-slate-950 dark:text-white tabular-nums mt-1">
                          99.2%
                        </div>
                        <span className="text-[11px] font-sans text-slate-500 dark:text-neutral-400 mt-0.5 block">
                          12-month rolling avg
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06]">
                        <span className="text-[11px] font-sans font-medium text-slate-500 dark:text-neutral-400 uppercase tracking-wider block">
                          Monthly Payroll
                        </span>
                        <div className="font-sans text-2xl sm:text-3xl font-medium text-slate-950 dark:text-white tabular-nums mt-1">
                          $2,095,000
                        </div>
                        <span className="text-[11px] font-sans text-slate-500 dark:text-neutral-400 mt-0.5 block">
                          Zero statutory backlog
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06]">
                        <span className="text-[11px] font-sans font-medium text-slate-500 dark:text-neutral-400 uppercase tracking-wider block">
                          Global Duty Hubs
                        </span>
                        <div className="font-sans text-2xl sm:text-3xl font-medium text-slate-950 dark:text-white tabular-nums mt-1">
                          6 Stations
                        </div>
                        <span className="text-[11px] font-sans text-indigo-600 dark:text-indigo-400 mt-0.5 block">
                          Autonomous satellite telemetry
                        </span>
                      </div>
                    </div>

                    {/* Architectural Hairline Trajectory Curve */}
                    <div className="p-5 rounded-2xl bg-slate-50/50 dark:bg-white/[0.015] border border-slate-200/70 dark:border-white/[0.05]">
                      <div className="flex items-center justify-between mb-3 text-xs">
                        <span className="font-sans font-medium text-slate-700 dark:text-neutral-300">
                          Workforce Retention & Velocity Telemetry (Q1–Q4 2026)
                        </span>
                        <span className="font-mono text-slate-400 dark:text-neutral-500 text-[11px]">
                          LATENCY: 42ms • OFAC: PASS
                        </span>
                      </div>
                      <div className="h-28 w-full relative">
                        <svg viewBox="0 0 800 110" preserveAspectRatio="none" className="w-full h-full">
                          <defs>
                            <linearGradient id="heroCurveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M 0 80 C 120 75, 200 62, 320 54 C 440 46, 560 32, 680 20 C 740 14, 780 12, 800 10 L 800 110 L 0 110 Z"
                            fill="url(#heroCurveGrad)"
                          />
                          <path
                            d="M 0 80 C 120 75, 200 62, 320 54 C 440 46, 560 32, 680 20 C 740 14, 780 12, 800 10"
                            fill="none"
                            stroke="#6366f1"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                          />
                          <circle cx="320" cy="54" r="4" fill="#6366f1" stroke="#ffffff" strokeWidth="2" />
                          <circle cx="680" cy="20" r="4" fill="#6366f1" stroke="#ffffff" strokeWidth="2" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeConsoleTab === "workforce" && (
                  <motion.div
                    key="workforce"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="text-xs text-slate-500 dark:text-neutral-400 font-sans">
                      Active Deployment Roster • Hope Foundation Humanitarian Field Units
                    </div>
                    <div className="divide-y divide-slate-100 dark:divide-white/[0.04] text-xs font-sans">
                      {[
                        { station: "Kabul, Afghanistan", head: "Dr. Tariq Masood", count: "54 FTE", status: "Level 2 Field Clinic Active", lat: "34.5553° N, 69.2075° E" },
                        { station: "Cox's Bazar, Bangladesh", head: "Farhana Ahmed", count: "48 FTE", status: "WASH & Water Purification Hub", lat: "21.4272° N, 92.0058° E" },
                        { station: "Juba, South Sudan", head: "Deng Chol Deng", count: "42 FTE", status: "Nutrition & Emergency Surgical Unit", lat: "4.8594° N, 31.5713° E" },
                        { station: "Kyiv, Ukraine", head: "Olena Morozova", count: "32 FTE", status: "Winterization & Pediatric Trauma", lat: "50.4501° N, 30.5234° E" },
                      ].map((item, idx) => (
                        <div key={idx} className="py-3 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2.5">
                            <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                            <div>
                              <div className="font-medium text-slate-900 dark:text-white">{item.station}</div>
                              <div className="text-[11px] text-slate-500 dark:text-neutral-500">{item.head} • {item.lat}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="font-semibold text-slate-900 dark:text-white tabular-nums">{item.count}</span>
                            <div className="text-[11px] text-indigo-600 dark:text-indigo-400">{item.status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeConsoleTab === "payroll" && (
                  <motion.div
                    key="payroll"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between text-xs font-sans text-slate-500 dark:text-neutral-400">
                      <span>Multi-Currency Clearing & Treasury Settlement</span>
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">501(c)(3) Statutory Audit: 100% Passed</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-sans">
                      {[
                        { currency: "USD", amount: "$1,120,000", share: "53.5%", rail: "Fedwire Direct" },
                        { currency: "EUR", amount: "€410,000", share: "19.6%", rail: "SEPA Instant" },
                        { currency: "BDT", amount: "৳58,200,000", share: "12.8%", rail: "Bangladesh Bank BEFTN" },
                        { currency: "UAH", amount: "₴16,800,000", share: "8.2%", rail: "NBU Clearing System" },
                      ].map((curr, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06]">
                          <div className="font-bold text-slate-900 dark:text-white text-sm">{curr.currency}</div>
                          <div className="font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">{curr.amount}</div>
                          <div className="text-[11px] text-slate-500 dark:text-neutral-500 mt-1">{curr.share} • {curr.rail}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeConsoleTab === "pipeline" && (
                  <motion.div
                    key="pipeline"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="text-xs text-slate-500 dark:text-neutral-400 font-sans">
                      Autonomous Talent Scoring & Vetted Humanitarian Readiness
                    </div>
                    <div className="divide-y divide-slate-100 dark:divide-white/[0.04] text-xs font-sans">
                      {[
                        { name: "Dr. Amara Okafor", role: "Pediatric Trauma Surgeon", score: "98.8% Match", status: "Offer Dispatched", hub: "Juba Deployment" },
                        { name: "Siddharth Rao", role: "Cold-Chain Logistics Architect", score: "96.4% Match", status: "Security Clearance Ready", hub: "Cox's Bazar Hub" },
                        { name: "Lucie Bernard", role: "WASH Hydro-Systems Engineer", score: "95.1% Match", status: "Panel Interview Approved", hub: "Port-au-Prince Hub" },
                      ].map((cand, idx) => (
                        <div key={idx} className="py-3 flex items-center justify-between gap-4">
                          <div>
                            <div className="font-medium text-slate-900 dark:text-white">{cand.name}</div>
                            <div className="text-[11px] text-slate-500 dark:text-neutral-500">{cand.role} • {cand.hub}</div>
                          </div>
                          <div className="text-right">
                            <span className="font-semibold text-indigo-600 dark:text-indigo-400">{cand.score}</span>
                            <div className="text-[11px] text-slate-500 dark:text-neutral-400">{cand.status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Console Status Bar */}
            <div className="px-6 py-3.5 border-t border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.015] flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
              <div className="flex items-center gap-2 text-slate-500 dark:text-neutral-400">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <span>Production Environment Online • Hope Foundation Master Ledger</span>
              </div>
              <Link
                href="/workspace"
                className="inline-flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <span>Enter Full Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>

        {/* 3. THREE CURATED ECOSYSTEM PILLARS (EDITORIAL COMPOSITION) */}
        <div className="w-full relative mt-20 sm:mt-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-sans font-semibold tracking-wider uppercase text-indigo-600 dark:text-indigo-400 block mb-2">
              Integrated Architectural Pillars
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950 dark:text-white leading-tight">
              Three Pillars. One Cohesive System.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "People Operations & Culture OS",
                subtitle: "Automate talent workflows, monitor real-time pulse data, and scale your culture seamlessly.",
                src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
                href: "/people-operations",
                tag: "Core HR & Directory",
              },
              {
                title: "Autonomous Sourcing Engine",
                subtitle: "Continuously map candidate competencies, benchmark skill telemetry, and eliminate recruiter bias.",
                src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
                href: "/talent-intelligence",
                tag: "Talent Intelligence",
              },
              {
                title: "Global Mobility & Payroll",
                subtitle: "Automate statutory filings, localized health benefits, and multi-currency clearing across 140+ countries.",
                src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
                href: "/global-mobility",
                tag: "Cross-Border EOR",
              },
            ].map((pillar, idx) => (
              <Link
                key={idx}
                href={pillar.href}
                className="group relative rounded-3xl overflow-hidden border border-slate-200/90 dark:border-white/[0.08] bg-slate-900 h-[380px] sm:h-[420px] flex flex-col justify-end p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-slate-300 dark:hover:border-white/20 cursor-pointer"
              >
                {/* Background Image with Controlled Dark Vignette */}
                <div className="absolute inset-0">
                  <Image
                    src={pillar.src}
                    alt={pillar.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent pointer-events-none" />

                {/* Tag Badge */}
                <div className="relative z-10 mb-auto">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-sans font-medium text-white/90 bg-black/40 backdrop-blur-md border border-white/10 shadow-xs">
                    {pillar.tag}
                  </span>
                </div>

                {/* Text Content */}
                <div className="relative z-10 space-y-2">
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white leading-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed line-clamp-2">
                    {pillar.subtitle}
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-indigo-300 transition-colors">
                    <span>Inspect Capability</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 4. MODERN ENTERPRISE OUTCOME METRICS STRIP (RESTRAINED, HAIRLINE BORDERS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-20 pt-14 border-t border-slate-200/80 dark:border-white/[0.08] transition-colors">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 dark:border-white/[0.06] bg-white/80 dark:bg-white/[0.02] backdrop-blur-md p-5 sm:p-6 shadow-xs hover:border-slate-300 dark:hover:border-white/15 transition-all duration-300"
              >
                <div className="flex items-center gap-2 text-slate-500 dark:text-neutral-400 text-xs font-sans font-medium mb-2">
                  <Icon className="w-3.5 h-3.5 text-slate-400 dark:text-neutral-500" />
                  <span>{metric.label}</span>
                </div>
                <div className="font-sans text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-slate-950 dark:text-white tabular-nums">
                  {metric.value}
                </div>
                <div className="text-xs md:text-sm font-normal text-slate-600 dark:text-neutral-400 tracking-normal mt-2 leading-relaxed font-sans">
                  {metric.detail}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
