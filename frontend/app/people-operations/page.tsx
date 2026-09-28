"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpatialMeshBackground from "@/components/ui/SpatialMeshBackground";
import ThreeDCard from "@/components/motion/ThreeDCard";
import GlareHover from "@/components/motion/GlareHover";
import { 
  Users, 
  HeartHandshake, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Activity, 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  Layers, 
  AlertCircle,
  FileCheck2,
  Sliders
} from "lucide-react";
import { motion } from "framer-motion";

export default function PeopleOperationsPage() {
  const [activeTab, setActiveTab] = useState(0);

  const pillars = [
    {
      title: "Real-Time Sentiment Telemetry",
      desc: "Continuous, non-intrusive employee engagement analytics that detect friction and burnout before it causes attrition.",
      icon: Activity,
      stat: "94.6%",
      statLabel: "Team Sentiment Index",
      color: "#6366f1"
    },
    {
      title: "Zero-Friction Autonomous Onboarding",
      desc: "Generate custom legal packets, setup role environments, and guide new hires through day-one workflows in 72 hours.",
      icon: Clock,
      stat: "3 Days",
      statLabel: "Time to Full Productivity",
      color: "#10b981"
    },
    {
      title: "Retention & Flight-Risk Modeling",
      desc: "Calibrated predictive signals based on compensation benchmarks, project velocity drops, and milestone completion.",
      icon: TrendingUp,
      stat: "+18.4%",
      statLabel: "Year-over-Year Retention",
      color: "#8b5cf6"
    },
    {
      title: "Cross-Functional Knowledge Mesh",
      desc: "Index organizational competencies, track informal mentorship links, and eliminate operational single-points-of-failure.",
      icon: Layers,
      stat: "100%",
      statLabel: "Skill Coverage Mapping",
      color: "#0284c7"
    }
  ];

  const simulationMetrics = [
    { label: "Culture Cohesion Index", value: 94, target: "90+ Optimal", status: "Optimal" },
    { label: "Predictive Attrition Risk", value: 4.2, target: "< 6% Low Risk", status: "Secure" },
    { label: "Onboarding Cycle Time", value: 72, target: "< 96h Target", status: "Expedited" },
    { label: "Weekly Pulse Participation", value: 89, target: "> 85% Target", status: "High Conviction" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#070709] text-slate-900 dark:text-neutral-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white transition-colors duration-200 relative">
      {/* 3D Spatial Canvas (Calm particle depth, zero 3D geometric objects) */}
      <SpatialMeshBackground />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden">
        {/* Ambient Top Glow */}
        <div 
          aria-hidden="true"
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[380px] bg-gradient-to-b from-indigo-500/10 dark:from-indigo-500/15 via-violet-500/5 to-transparent blur-[130px] pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Editorial Headline & Copy */}
            <div className="lg:col-span-7">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-slate-950 dark:text-white leading-[1.04] mb-6"
              >
                The Modern Standard for{" "}
                <span className="font-serif italic bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-600 dark:from-indigo-400 dark:via-purple-300 dark:to-sky-400 bg-clip-text text-transparent">
                  People Teams
                </span>
                .
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-base sm:text-lg text-slate-600 dark:text-neutral-400 max-w-xl leading-relaxed mb-8 font-normal"
              >
                Automate talent onboarding lifecycles, monitor real-time pulse data, and scale your culture seamlessly—orchestrated by intelligent, context-aware workforce agents.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center gap-4"
              >
                <a
                  href="/signup"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-white bg-slate-950 hover:bg-slate-800 dark:text-slate-950 dark:bg-white dark:hover:bg-zinc-100 rounded-xl transition-all shadow-md group cursor-pointer"
                >
                  <span>Deploy People Operations</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="/pricing"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold border border-slate-200/90 bg-white/90 hover:bg-slate-50 text-slate-800 dark:border-neutral-800 dark:bg-neutral-900/80 dark:hover:bg-neutral-800 dark:text-neutral-200 rounded-xl transition-all shadow-xs backdrop-blur-md cursor-pointer"
                >
                  <span>Explore Investment Plans</span>
                </a>
              </motion.div>

              {/* Mini Highlights */}
              <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-slate-200/80 dark:border-neutral-800/80">
                <div>
                  <div className="font-serif text-2xl sm:text-3xl text-slate-950 dark:text-white font-normal">+18.4%</div>
                  <div className="text-[11px] text-slate-500 dark:text-neutral-400 font-mono mt-0.5">Top-Performer Retention</div>
                </div>
                <div>
                  <div className="font-serif text-2xl sm:text-3xl text-slate-950 dark:text-white font-normal">3 Days</div>
                  <div className="text-[11px] text-slate-500 dark:text-neutral-400 font-mono mt-0.5">Time to Productivity</div>
                </div>
                <div>
                  <div className="font-serif text-2xl sm:text-3xl text-slate-950 dark:text-white font-normal">94 / 100</div>
                  <div className="text-[11px] text-slate-500 dark:text-neutral-400 font-mono mt-0.5">Real-Time Culture Index</div>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Interactive Hero Showcase with Preserved Image */}
            <div className="lg:col-span-5">
              <ThreeDCard
                glareColor="#818cf8"
                glareOpacity={0.16}
                maxTilt={8}
                elevationZ={28}
                className="w-full"
              >
                <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 dark:border-neutral-800 shadow-2xl bg-white dark:bg-[#121217] p-2.5">
                  <div className="relative h-96 sm:h-[460px] rounded-2xl overflow-hidden">
                    <img
                      src="/images/people-operations.jpg"
                      alt="The Modern Standard for People Teams"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                  </div>
                </div>
              </ThreeDCard>
            </div>

          </div>
        </div>
      </section>

      {/* 4 Core Pillars Grid with 3D Tilt */}
      <section className="py-20 bg-slate-100/50 dark:bg-[#09090d]/50 border-t border-slate-200/80 dark:border-neutral-900 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-950 dark:text-white font-normal">
              Four Core Disciplines of Modern People Ops
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 mt-3 max-w-xl mx-auto leading-relaxed">
              Every discipline operates autonomously while feeding insights into a central organizational intelligence graph.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <ThreeDCard
                  key={idx}
                  glareColor={pillar.color}
                  maxTilt={6}
                  elevationZ={18}
                  className="h-full"
                >
                  <div className="rounded-3xl border border-slate-200/90 dark:border-neutral-800 bg-white/95 dark:bg-[#0f0f14]/95 p-8 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between backdrop-blur-xl">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/60 dark:border-indigo-800/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="text-right">
                          <div className="font-serif text-2xl sm:text-3xl text-slate-950 dark:text-white font-normal">
                            {pillar.stat}
                          </div>
                          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                            {pillar.statLabel}
                          </div>
                        </div>
                      </div>

                      <h3 className="font-serif text-2xl text-slate-950 dark:text-white font-normal mb-3">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed font-normal">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </ThreeDCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive 3D Simulator: Telemetry & Culture Radar Console */}
      <section className="py-20 sm:py-28 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl text-slate-950 dark:text-white font-normal">
              Autonomous Team Health Dashboard
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 mt-2">
              Preview how Client Forge aggregates sentiment telemetry into operational decision intelligence.
            </p>
          </div>

          <GlareHover
            className="rounded-3xl border border-slate-200/90 dark:border-neutral-800 bg-white/95 dark:bg-[#111116]/95 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl"
            glareColor="#6366f1"
            glareOpacity={0.12}
            glareSize={340}
          >
            <div className="space-y-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-neutral-800">
                <div>
                  <h3 className="font-serif text-2xl text-slate-950 dark:text-white">
                    Quarterly Cultural Sentiment & Friction Map
                  </h3>
                </div>

                <div className="flex items-center gap-3 font-mono text-xs text-slate-500 dark:text-neutral-400">
                  <Clock className="w-4 h-4 text-indigo-500" />
                  <span>Telemetry refreshed 4m ago</span>
                </div>
              </div>

              {/* Live Metric Gauges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {simulationMetrics.map((met, mIdx) => (
                  <div 
                    key={mIdx} 
                    className="p-4 rounded-2xl bg-slate-50/80 dark:bg-neutral-900/60 border border-slate-200/80 dark:border-neutral-800"
                  >
                    <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 mb-2">
                      {met.label}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-sans text-3xl font-medium tracking-tight text-slate-950 dark:text-white">
                        {met.value}
                      </span>
                      <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                        {met.status}
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 dark:text-neutral-500 mt-1">
                      Target: {met.target}
                    </div>
                  </div>
                ))}
              </div>

              {/* Actionable Insights Ledger */}
              <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/70 dark:border-indigo-900/50">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300">
                      AUTONOMOUS AGENT RECOMMENDATION
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-neutral-200 mt-1 leading-relaxed">
                      Engineering handoff cycles in Q3 experienced a 12% friction drop following automated role provisioning. Retention risks in EMEA senior advisory remain below 3.5%. Recommend rolling out cross-border localized health perks.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </GlareHover>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-slate-200/80 dark:border-neutral-900 bg-slate-100/50 dark:bg-[#070709] relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-950 dark:text-white font-normal mb-4">
            Ready to Transform Your Workplace Culture?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 max-w-xl mx-auto mb-8 leading-relaxed font-normal">
            Equip your people team with the autonomous intelligence platform trusted by senior operators and fast-scaling boutique consultancies.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-white bg-slate-950 hover:bg-slate-800 dark:text-slate-950 dark:bg-white dark:hover:bg-zinc-100 rounded-xl transition-all shadow-md group cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold border border-slate-200 dark:border-neutral-800 bg-white hover:bg-slate-50 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-800 dark:text-neutral-200 rounded-xl transition-all cursor-pointer"
            >
              <span>View Pricing Plans</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
