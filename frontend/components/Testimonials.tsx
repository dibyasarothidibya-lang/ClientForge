"use client";

import React from "react";
import { Star, Quote, ArrowUpRight } from "lucide-react";
import ThreeDCard from "./motion/ThreeDCard";

const principles = [
  {
    topic: "Strict Multi-Tenant Isolation",
    decision: "Organization-Scoped Data Boundary",
    detail: "Every database query and model manager enforces tenant scoping at the ORM layer. Cross-tenant leakage is prevented structurally before reaching API serializers.",
    tag: "Security Architecture",
    metric: "100% Isolated",
  },
  {
    topic: "Granular RBAC Authorization",
    decision: "6-Tier Role Permission Model",
    detail: "Fine-grained permissions separate Owners, Admins, Managers, Finance, Auditors, and Members. Sensitive payroll and audit logs require explicit privilege tiers.",
    tag: "Access Control",
    metric: "6 RBAC Roles",
  },
  {
    topic: "Continuous Automated Verification",
    decision: "71 Automated Test Suites",
    detail: "Comprehensive test suite spanning accounts, attendance, payroll formulas, leave workflows, and organization lifecycle ensuring zero regression during upgrades.",
    tag: "Quality Assurance",
    metric: "71 Tests Passing",
  }
];

export default function Testimonials() {
  return (
    <section id="engineering-principles" className="py-24 sm:py-32 bg-white/20 dark:bg-[#080808]/20 backdrop-blur-[1px] border-t border-slate-200/80 dark:border-white/[0.06] transition-colors duration-200 relative z-10 overflow-hidden scroll-mt-20">
      {/* Subtle atmospheric ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-br from-indigo-500/10 via-teal-500/5 to-transparent dark:from-indigo-900/10 dark:via-teal-900/5 dark:to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Editorial Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] text-slate-600 dark:text-neutral-400 text-xs tracking-wider uppercase mb-5 font-sans font-medium shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
            Engineering Principles & Decisions
          </div>
          
          <h2 className="section-title text-slate-950 dark:text-[#f5f5f3] tracking-tight">
            Architectural Decisions <span className="editorial-italic gradient-text">Built Into the Code.</span>
          </h2>
          
          <p className="body-lg text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto mt-4 font-normal">
            Core technical philosophies guiding the architecture of Client Forge—from resilient database modeling to asynchronous execution and strict multi-tenant boundaries.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Large Featured Architecture Thesis Card (Spans 2 cols, 2 rows) */}
          <ThreeDCard glareColor="#6366f1" maxTilt={6} elevationZ={20} className="lg:col-span-2 lg:row-span-2 h-full">
            <div className="rounded-3xl p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-[#121214] dark:to-[#0c0c0e] border border-slate-200 dark:border-white/[0.08] shadow-xl dark:shadow-2xl h-full">
              <div className="absolute top-0 right-0 p-8 text-slate-900/[0.04] dark:text-white/[0.04] pointer-events-none">
                <Quote className="w-28 h-28" />
              </div>

              <div className="relative z-10">
                {/* Architecture Pill */}
                <div className="flex items-center gap-2 mb-8">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs font-mono font-medium uppercase tracking-wider">
                    Core Architectural Thesis
                  </span>
                  <span className="text-xs font-sans font-medium uppercase tracking-wider text-slate-500 dark:text-neutral-400 ml-2">Production Engineering Standard</span>
                </div>

                {/* Big Architectural Statement */}
                <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-slate-950 dark:text-[#f5f5f3] leading-snug tracking-tight mb-8">
                  “Production SaaS is defined by its resilience under edge cases—strict multi-tenant isolation, tamper-evident audit logging, robust domain service layers, and automated regression tests that verify every critical state change before deployment.”
                </blockquote>
              </div>

              {/* Author Info / Engineer Attribution */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-slate-200 dark:border-white/[0.08] relative z-10">
                <div className="flex items-center gap-4">
                  <img 
                    src="/creator-editorial-v2.png" 
                    alt="Dibya Sarothi Simanta" 
                    className="w-14 h-14 rounded-full object-cover border-2 border-slate-200 dark:border-white/10 shadow-lg bg-black"
                  />
                  <div>
                    <h4 className="font-medium text-slate-950 dark:text-[#f5f5f3] text-lg">Dibya Sarothi Simanta</h4>
                    <p className="text-sm text-slate-600 dark:text-neutral-400 font-normal">Full-Stack Systems Architect & Engineer</p>
                    <span className="text-xs text-slate-500 dark:text-neutral-400 font-sans">Python / Django / Next.js / PostgreSQL / Redis</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08]">
                  <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold">Verified</span>
                  <span className="text-xs text-slate-600 dark:text-neutral-400 font-sans">Repository Implementation</span>
                </div>
              </div>
            </div>
          </ThreeDCard>

          {/* Photo & Mission Card */}
          <ThreeDCard glareColor="#6366f1" maxTilt={8} elevationZ={18} className="h-64 lg:h-auto">
            <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-white/[0.08] shadow-md dark:shadow-lg relative group h-full bg-slate-950 dark:bg-[#101012]">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80" 
                alt="Client Forge engineering workspace" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex flex-col justify-end p-6">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-indigo-300 mb-1">
                  Architecture Philosophy
                </span>
                <div className="font-serif text-lg text-white font-normal leading-snug">
                  Clean service layers. Rigorous isolation. Zero compromise on test coverage.
                </div>
              </div>
            </div>
          </ThreeDCard>

          {/* Key Metric Card */}
          <ThreeDCard glareColor="#6366f1" maxTilt={8} elevationZ={18} className="h-full">
            <div className="rounded-3xl p-8 flex flex-col justify-center bg-gradient-to-b from-slate-50 to-white dark:from-[#141417] dark:to-[#0d0d0f] border border-slate-200 dark:border-white/[0.08] shadow-md dark:shadow-lg relative overflow-hidden h-full">
              <div className="text-xs font-sans font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-400 mb-2">Codebase Telemetry</div>
              <div className="font-sans text-4xl md:text-5xl font-normal md:font-medium tracking-tight tabular-nums text-slate-950 dark:text-white">71 Tests</div>
              <p className="text-slate-600 dark:text-neutral-300 text-sm font-normal mt-2 leading-relaxed">
                Automated unit & integration test coverage across all 13 Django application domains with 100% pass rate.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400 font-sans">
                <span>Django REST Framework</span>
                <span>PostgreSQL 16</span>
              </div>
            </div>
          </ThreeDCard>

          {/* 3 Architecture Principle Cards */}
          {principles.map((item, idx) => (
            <ThreeDCard key={idx} glareColor="#6366f1" maxTilt={8} elevationZ={16} className="h-full">
              <div 
                className="rounded-2xl p-6 bg-slate-50/70 dark:bg-[#0e0e10] border border-slate-200/80 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/[0.12] transition-colors flex flex-col justify-between group shadow-xs dark:shadow-none h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-medium">
                      {item.tag}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200/70 dark:bg-white/[0.05] text-slate-800 dark:text-neutral-200">
                      {item.metric}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-normal text-slate-950 dark:text-white mb-2">
                    {item.decision}
                  </h3>
                  <p className="text-slate-600 dark:text-neutral-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    {item.detail}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 dark:border-white/[0.06] flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400 font-sans">
                  <span>{item.topic}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </div>
            </ThreeDCard>
          ))}

        </div>

      </div>
    </section>
  );
}
