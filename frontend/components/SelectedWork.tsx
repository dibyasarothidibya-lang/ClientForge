"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Activity, Users, Shield, Plane, Cpu, Database, Server, Terminal, CheckCircle2 } from "lucide-react";
import ThreeDCard from "./motion/ThreeDCard";

const projects = [
  {
    title: "MediGuard AI",
    badge: "100 Active Users",
    category: "Clinical Intelligence & Decision Support",
    description: "AI-assisted clinical safety and differential diagnosis validation engine. Analyzes patient symptoms, medication conflicts, and lab indicators with rule-grounded medical guardrails.",
    role: "Full-Stack Engineer & AI Integration",
    highlights: [
      "100 real users milestone during university & clinical pilot deployment",
      "FastAPI & Next.js full-stack architecture with streaming responses",
      "Strict hallucination mitigation guardrails & drug interaction verification",
      "Medical terminology indexing with low-latency vector retrieval"
    ],
    tech: ["Python", "FastAPI", "Next.js", "TypeScript", "Tailwind CSS", "OpenAI / Claude API"],
    link: "https://github.com/dibyasarothidibya-lang",
    linkText: "Inspect Source / GitHub",
    icon: Activity,
    accent: "text-emerald-500",
    borderGlow: "#10b981",
  },
  {
    title: "Flight Deal Finder",
    badge: "Python Automation",
    category: "Real-Time Fare Tracking & Scraper Pipeline",
    description: "Automated flight price scraping, trend tracking, and multi-channel notification engine. Monitors airline route inventory and triggers instant Telegram/Email alerts on anomalous fare dips.",
    role: "Backend Engineer & Automation Architect",
    highlights: [
      "Headless scraping engine with proxy rotation and rate-limit backoff",
      "Automated route price change detection and historical trend storage",
      "Instant Telegram bot and webhook dispatch for high-priority fare anomalies",
      "Scheduled background worker pipelines running 24/7 without manual intervention"
    ],
    tech: ["Python", "Playwright / BeautifulSoup", "PostgreSQL", "Telegram Bot API", "Docker", "Linux Cron"],
    link: "https://github.com/dibyasarothidibya-lang",
    linkText: "Inspect Source / GitHub",
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
                        <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                          {proj.category}
                        </span>
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-mono">
                        {proj.badge}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-slate-950 dark:text-white tracking-tight mb-3">
                      {proj.title}
                    </h3>
                    <p className="text-slate-600 dark:text-neutral-300 text-sm leading-relaxed mb-6 font-sans">
                      {proj.description}
                    </p>

                    {/* Engineering Highlights */}
                    <div className="space-y-2.5 mb-7 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/[0.05]">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 mb-2">
                        Key Architecture Highlights:
                      </div>
                      {proj.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-neutral-300 leading-snug">
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
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.05] border border-slate-200/60 dark:border-white/10 text-[11px] font-mono text-slate-700 dark:text-neutral-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
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
