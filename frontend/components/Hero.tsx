"use client";

import React from "react";
import HeroHeadline from "./hero/HeroHeadline";
import ScrollExpand from "./motion/ScrollExpand";
import GlareHover from "./motion/GlareHover";
import { TrendingUp, Users, Clock, ShieldCheck, ArrowRight } from "lucide-react";

export default function Hero() {
  const metrics = [
    {
      label: "RETENTION RATE",
      value: "+18.4%",
      detail: "Increase in top-performer retention year-over-year.",
      icon: TrendingUp,
      accent: "text-indigo-600 dark:text-indigo-400",
      glareColor: "#6366f1",
    },
    {
      label: "TIME TO PRODUCTIVITY",
      value: "3 Days",
      detail: "From contract signature to live autonomous delivery.",
      icon: Clock,
      accent: "text-emerald-600 dark:text-emerald-400",
      glareColor: "#10b981",
    },
    {
      label: "CULTURE INDEX",
      value: "94 / 100",
      detail: "Real-time sentiment score & team cohesion index.",
      icon: Users,
      accent: "text-violet-600 dark:text-violet-400",
      glareColor: "#8b5cf6",
    },
    {
      label: "RECRUITMENT VELOCITY",
      value: "10x Sourcing",
      detail: "Skill-grounded candidate matching pipeline.",
      icon: ShieldCheck,
      accent: "text-sky-600 dark:text-sky-400",
      glareColor: "#0284c7",
    },
  ];

  return (
    <section 
      id="hero-section"
      className="relative z-10 pt-24 sm:pt-32 pb-20 sm:pb-28 overflow-hidden bg-slate-50/20 dark:bg-[#09090b]/20 text-slate-900 dark:text-white transition-colors duration-200"
    >
      {/* Subtle Background Radial Glow */}
      <div 
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-indigo-500/5 dark:from-zinc-800/20 via-transparent to-transparent blur-[120px] pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Hero Content & Copy */}
        <HeroHeadline />

        {/* 2. Hero Showcase: ScrollExpand Interactive Unfolding Viewport (3 Curated Pillars) */}
        <div className="w-full relative my-16 space-y-24 sm:space-y-36">
          {[
            {
              title: "The Modern Standard for People Teams",
              subtitle: "Automate talent workflows, monitor real-time pulse data, and scale your culture seamlessly.",
              src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
              alt: "The Modern Standard for People Teams",
              scrollHint: "Scroll to expand ecosystem",
              href: "/people-operations",
              buttonText: "Explore People Operations & Culture OS",
            },
            {
              title: "Autonomous Pipeline & Sourcing Engine",
              subtitle: "Continuously map candidate competencies, benchmark skill telemetry, and eliminate recruiter bias.",
              src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80",
              alt: "Autonomous Pipeline & Sourcing Engine",
              scrollHint: "Scroll to explore intelligence",
              href: "/talent-intelligence",
              buttonText: "Explore Talent Intelligence Engine",
            },
            {
              title: "Unified Cross-Border Payroll & Compliance",
              subtitle: "Automate statutory filings, localized health benefits, and multi-currency clearing across 140+ countries.",
              src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
              alt: "Unified Cross-Border Payroll & Compliance",
              scrollHint: "Scroll to reveal global mesh",
              href: "/global-mobility",
              buttonText: "Explore Global Mobility & Payroll",
            },
          ].map((item, idx) => (
            <div key={idx} className="w-full relative">
              <ScrollExpand
                alt={item.alt}
                enabled={true}
                endRadius={12}
                holdDistance={0.35}
                mediaZoom={1.2}
                overlayScrim={0.35}
                scrollDistance={1.2}
                scrollHint={item.scrollHint}
                smoothing={0.1}
                src={item.src}
                startHeight={65}
                startRadius={24}
                startWidth={65}
                title={item.title}
                useWindowScroll={true}
              >
                <div className="max-w-2xl px-6 text-center text-white flex flex-col items-center">
                  <h2 className="font-serif text-3xl md:text-5xl font-normal tracking-tight">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm md:text-base text-zinc-300">
                    {item.subtitle}
                  </p>
                  <a
                    href={item.href}
                    className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-slate-950 bg-white hover:bg-slate-100 transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer font-mono"
                  >
                    <span>{item.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </ScrollExpand>
            </div>
          ))}
        </div>

        {/* 3. Modern Tech / Enterprise Outcome Metrics Strip with Interactive 3D Tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16 pt-12 border-t border-slate-200 dark:border-zinc-800/80 transition-colors">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <GlareHover
                key={idx}
                glareOpacity={0.12}
                glareSize={220}
                glareColor={metric.glareColor}
                transitionDuration={400}
                className="rounded-2xl border border-slate-200/90 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/60 backdrop-blur-md p-5 sm:p-6 shadow-xs hover:shadow-xl hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-300"
              >
                <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400 text-xs font-mono mb-2">
                  <Icon className={`w-3.5 h-3.5 ${metric.accent}`} />
                  <span>{metric.label}</span>
                </div>
                <div className="font-sans text-3xl sm:text-4xl lg:text-5xl font-normal sm:font-medium tracking-tight text-slate-950 dark:text-white tabular-nums">
                  {metric.value}
                </div>
                <div className="text-xs md:text-sm font-normal text-slate-600 dark:text-zinc-400 tracking-normal mt-2 leading-relaxed">
                  {metric.detail}
                </div>
              </GlareHover>
            );
          })}
        </div>

      </div>
    </section>
  );
}
