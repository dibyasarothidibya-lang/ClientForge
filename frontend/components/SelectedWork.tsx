"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Activity, Users, Shield, Plane, Cpu, Database, Server, Terminal, CheckCircle2 } from "lucide-react";
import ThreeDCard from "./motion/ThreeDCard";

const projects = [
  {
    title: "MediGuard AI",
    badge: "100 Active Users",
    category: "Medicine Information & Verification Platform",
    tagline: "Evidence First. AI Second.",
    notice: "Research / Educational Software — Not a Medical Device",
    description: "An independently built healthcare research and educational platform designed to help users explore medicine information, verify pharmaceutical records, and receive evidence-grounded explanations using structured regulatory data.",
    role: "Full-Stack Engineer & AI Integration",
    highlights: [
      "100-user milestone achieved across research and student testing",
      "Evidence-first AI architecture with defensive LLM guardrails against hallucinations",
      "Bangladesh-focused pharmaceutical catalogue cross-referenced with openFDA integration",
      "Controlled citations and strict safety gating before returning responses"
    ],
    tech: ["Python", "FastAPI", "Next.js", "TypeScript", "Tailwind CSS", "openFDA API", "Claude / OpenAI"],
    link: "https://github.com/dibyasarothidibya-lang/Mediguard-AI",
    linkText: "View Mediguard-AI Repository",
    icon: Activity,
    accent: "text-emerald-500",
    borderGlow: "#10b981",
  },
  {
    title: "Flight Deal Finder",
    badge: "Python Automation",
    category: "Automated Flight Monitoring & WhatsApp Alert System",
    tagline: "SerpApi + Sheety + Twilio Pipeline",
    notice: "Real-Time Price Change Detection & Synchronous Alerts",
    description: "A Python automation system that retrieves destination targets from Google Sheets through Sheety, queries live round-trip pricing through SerpApi's Google Flights engine, detects record-low fares, updates stored pricing data, and sends instant WhatsApp alerts through Twilio.",
    role: "Automation Engineer & Pipeline Architect",
    highlights: [
      "Automated flight querying with cheapest-fare parsing via Google Flights SerpApi engine",
      "Destination and threshold price synchronization via Sheety and Google Sheets",
      "Intelligent price-change detection with response caching to prevent redundant queries",
      "Real-time WhatsApp notification dispatch via Twilio API with environment-based secret isolation"
    ],
    tech: ["Python", "SerpApi / Google Flights", "Sheety", "Twilio WhatsApp", "requests", "requests-cache", "python-dotenv"],
    link: "https://github.com/dibyasarothidibya-lang/Flight-Deal-Finder",
    linkText: "View Flight-Deal-Finder Repository",
    icon: Plane,
    accent: "text-sky-500",
    borderGlow: "#0ea5e9",
  }
];

export default function SelectedWork() {
  return (
    <section id="selected-projects" className="py-24 sm:py-32 bg-slate-50/50 dark:bg-black/40 border-t border-slate-200/80 dark:border-white/[0.06] transition-colors relative z-10 overflow-hidden scroll-mt-20">
      
      {/* Background Radial Glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-radial from-indigo-500/5 via-sky-500/5 to-transparent blur-[140px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] text-slate-700 dark:text-neutral-300 text-xs tracking-wider uppercase mb-4 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Additional Engineering Work
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950 dark:text-white leading-tight">
            Selected Systems & Projects
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 text-base sm:text-lg mt-4 font-sans font-light leading-relaxed">
            Beyond Client Forge, here are other production and automation systems engineered with modern backend frameworks, real-time data pipelines, and verified user adoption.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((proj, idx) => {
            const Icon = proj.icon;
            return (
              <ThreeDCard key={idx} glareColor={proj.borderGlow} maxTilt={6} elevationZ={20} className="h-full">
                <div className="rounded-3xl p-7 sm:p-9 bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-white/[0.08] shadow-xl hover:border-slate-300 dark:hover:border-white/20 transition-all flex flex-col justify-between h-full group">
                  
                  <div>
                    {/* Top Pill & Category */}
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 flex items-center justify-center">
                          <Icon className={`w-4 h-4 ${proj.accent}`} />
                        </div>
                        <span className="text-xs font-sans font-medium uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                          {proj.category}
                        </span>
                      </div>
                      <span className="text-xs font-sans font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        {proj.badge}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="flex flex-wrap items-baseline gap-2 mb-1.5">
                      <h3 className="font-serif text-2xl sm:text-3xl font-normal text-slate-950 dark:text-white tracking-tight">
                        {proj.title}
                      </h3>
                      {proj.tagline && (
                        <span className="text-xs font-sans text-indigo-600 dark:text-indigo-400 font-medium">
                          — {proj.tagline}
                        </span>
                      )}
                    </div>
                    {proj.notice && (
                      <div className="text-xs font-sans text-amber-800 dark:text-amber-300/90 mb-3 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20 inline-block font-medium">
                        {proj.notice}
                      </div>
                    )}
                    <p className="text-slate-600 dark:text-neutral-300 text-sm leading-relaxed mb-6 font-sans">
                      {proj.description}
                    </p>

                    {/* Engineering Highlights */}
                    <div className="space-y-2.5 mb-7 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/[0.05]">
                      <div className="text-xs font-sans font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-400 mb-2">
                        Key Architecture Highlights:
                      </div>
                      {proj.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs font-sans text-slate-700 dark:text-neutral-300 leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom: Tech Stack Badges & GitHub Link */}
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 mb-6">
                      {proj.tech.map((t) => (
                        <span 
                          key={t}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.05] border border-slate-200/60 dark:border-white/10 text-xs font-sans font-medium text-slate-700 dark:text-neutral-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-sans font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                    >
                      <span>{proj.linkText}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>

                </div>
              </ThreeDCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}
