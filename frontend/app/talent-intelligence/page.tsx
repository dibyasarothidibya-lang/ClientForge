"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpatialMeshBackground from "@/components/ui/SpatialMeshBackground";
import ThreeDCard from "@/components/motion/ThreeDCard";
import GlareHover from "@/components/motion/GlareHover";
import { 
  Radar, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Target, 
  UserCheck, 
  Search, 
  Code, 
  Zap, 
  Clock, 
  CheckCircle2, 
  SlidersHorizontal,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

export default function TalentIntelligencePage() {
  const [selectedCandidate, setSelectedCandidate] = useState(0);

  const pillars = [
    {
      title: "Real-Time Public Signal Radar",
      desc: "Continuous ingestion of engineering commits, executive leadership transitions, funding milestones, and open-source contributions.",
      icon: Radar,
      stat: "10x Sourcing",
      statLabel: "Pipeline Generation Velocity",
      color: "#38bdf8"
    },
    {
      title: "Competency Telemetry & Skill Ontology",
      desc: "Deep programmatic benchmarking that matches verified work outputs against precise role specifications, eliminating resume exaggeration.",
      icon: Target,
      stat: "91.4%",
      statLabel: "Skill Calibration Accuracy",
      color: "#818cf8"
    },
    {
      title: "Calibrated Outreach Angle Generator",
      desc: "Generates high-conviction bespoke outreach based on real business dilemmas, token frictions, and strategic expansion milestones.",
      icon: Zap,
      stat: "82%",
      statLabel: "First-Touch Response Rate",
      color: "#c084fc"
    },
    {
      title: "Bias-Eliminating Blind Evaluation",
      desc: "Anonymized technical work samples and competency metrics ensure candidates are assessed purely on verified execution capability.",
      icon: ShieldCheck,
      stat: "100%",
      statLabel: "Objective Competency Index",
      color: "#2dd4bf"
    }
  ];

  const candidateSignals = [
    {
      role: "Lead Distributed Systems Architect",
      matchScore: "96% High Fit",
      publicSignals: "Authored Rust Raft consensus engine • Ex-Stripe Infrastructure Lead",
      openingAngle: "Calibrated to Q4 latency reduction and multi-region failover architecture",
      status: "Verified Lead"
    },
    {
      role: "Principal AI Research Engineer",
      matchScore: "92% High Fit",
      publicSignals: "Contributed to PyTorch core • 3 Published NeurIPS papers on speculative decoding",
      openingAngle: "Connects LLM inference speedup directly to cloud GPU cost reduction",
      status: "High Conviction"
    },
    {
      role: "VP of People & Talent Sourcing",
      matchScore: "88% Strong Fit",
      publicSignals: "Scaled headcount from 40 to 450 • Pioneer in async distributed compensation",
      openingAngle: "Spearheads cross-border tax compliance and talent retention systems",
      status: "Benchmarked"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#070709] text-slate-900 dark:text-neutral-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white transition-colors duration-200 relative">
      {/* 3D Spatial Canvas (Calm particle depth, strictly ZERO 3D geometric objects) */}
      <SpatialMeshBackground />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden">
        {/* Soft Radial Ambient Glow */}
        <div 
          aria-hidden="true"
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[380px] bg-gradient-to-b from-sky-500/10 dark:from-sky-500/15 via-indigo-500/5 to-transparent blur-[130px] pointer-events-none"
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
                Autonomous Pipeline &{" "}
                <span className="font-serif italic bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600 dark:from-sky-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
                  Sourcing Engine
                </span>
                .
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-600 dark:text-neutral-400 max-w-xl leading-relaxed mb-8 font-normal"
              >
                Continuously map candidate competencies, benchmark skill telemetry across 140M public data nodes, and eliminate recruiter bias with context-aware intelligence agents.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-4"
              >
                <a
                  href="/signup"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-white bg-slate-950 hover:bg-slate-800 dark:text-slate-950 dark:bg-white dark:hover:bg-zinc-100 rounded-xl transition-all shadow-md group cursor-pointer"
                >
                  <span>Launch Talent Sourcing</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="/pricing"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold border border-slate-200/90 bg-white/90 hover:bg-slate-50 text-slate-800 dark:border-neutral-800 dark:bg-neutral-900/80 dark:hover:bg-neutral-800 dark:text-neutral-200 rounded-xl transition-all shadow-xs backdrop-blur-md cursor-pointer"
                >
                  <span>Explore Platform Tiers</span>
                </a>
              </motion.div>

              {/* Mini Highlights */}
              <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-slate-200/80 dark:border-neutral-800/80">
                <div>
                  <div className="font-serif text-2xl sm:text-3xl text-slate-950 dark:text-white font-normal">10x</div>
                  <div className="text-[11px] text-slate-500 dark:text-neutral-400 font-mono mt-0.5">Sourcing Velocity</div>
                </div>
                <div>
                  <div className="font-serif text-2xl sm:text-3xl text-slate-950 dark:text-white font-normal">82%</div>
                  <div className="text-[11px] text-slate-500 dark:text-neutral-400 font-mono mt-0.5">Opening Angle Reply Rate</div>
                </div>
                <div>
                  <div className="font-serif text-2xl sm:text-3xl text-slate-950 dark:text-white font-normal">91.4%</div>
                  <div className="text-[11px] text-slate-500 dark:text-neutral-400 font-mono mt-0.5">Skill Fit Precision</div>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Interactive Hero Showcase with Preserved Image */}
            <div className="lg:col-span-5">
              <ThreeDCard
                glareColor="#38bdf8"
                glareOpacity={0.16}
                maxTilt={8}
                elevationZ={28}
                className="w-full"
              >
                <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 dark:border-neutral-800 shadow-2xl bg-white dark:bg-[#121217] p-2.5">
                  <div className="relative h-96 sm:h-[460px] rounded-2xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80"
                      alt="Autonomous Pipeline & Sourcing Engine"
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

      {/* 4 Core Capabilities Grid with 3D Tilt */}
      <section className="py-20 bg-slate-100/50 dark:bg-[#09090d]/50 border-t border-slate-200/80 dark:border-neutral-900 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-950 dark:text-white font-normal">
              Precision Architecture for High-Leverage Talent Sourcing
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 mt-3 max-w-xl mx-auto leading-relaxed font-normal">
              Replace subjective resume scanning with programmatic skill ontology and verified contribution telemetry.
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
                        <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/70 border border-sky-200/60 dark:border-sky-800/60 flex items-center justify-center text-sky-600 dark:text-sky-400">
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

      {/* Interactive 3D Candidate Match & Angle Console */}
      <section className="py-20 sm:py-28 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl text-slate-950 dark:text-white font-normal">
              Autonomous Dossier & Angle Synthesis
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 mt-2 font-normal">
              Select candidate profiles to explore how Client Forge matches out-of-band signals to tailored outreach.
            </p>
          </div>

          <GlareHover
            className="rounded-3xl border border-slate-200/90 dark:border-neutral-800 bg-white/95 dark:bg-[#111116]/95 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl"
            glareColor="#38bdf8"
            glareOpacity={0.12}
            glareSize={340}
          >
            <div className="space-y-8">
              {/* Candidate Selector Tabs */}
              <div className="flex flex-wrap gap-2 pb-6 border-b border-slate-100 dark:border-neutral-800">
                {candidateSignals.map((cand, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedCandidate(idx)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                      selectedCandidate === idx
                        ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                        : "bg-slate-100 dark:bg-neutral-800/70 text-slate-700 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-800"
                    }`}
                  >
                    <span>{cand.role}</span>
                  </button>
                ))}
              </div>

              {/* Selected Candidate Detailed View */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-neutral-400">
                    <span>{candidateSignals[selectedCandidate].status}</span>
                    <span>•</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{candidateSignals[selectedCandidate].matchScore}</span>
                  </div>

                  <h3 className="font-serif text-3xl text-slate-950 dark:text-white">
                    {candidateSignals[selectedCandidate].role}
                  </h3>

                  <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-neutral-900/60 border border-slate-200/80 dark:border-neutral-800 space-y-2">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 font-bold">
                      VERIFIED PUBLIC SIGNALS:
                    </div>
                    <p className="text-xs text-slate-800 dark:text-neutral-200 font-mono">
                      {candidateSignals[selectedCandidate].publicSignals}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-900/60 space-y-2">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-indigo-700 dark:text-indigo-300 font-bold">
                      SYNTHESIZED OUTREACH ANGLE:
                    </div>
                    <p className="text-xs text-slate-700 dark:text-neutral-300 leading-relaxed font-sans">
                      {candidateSignals[selectedCandidate].openingAngle}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-50 dark:bg-neutral-900/80 border border-slate-200 dark:border-neutral-800 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center mx-auto">
                    <Target className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="font-serif text-2xl text-slate-950 dark:text-white">
                      Instant Dossier
                    </div>
                    <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
                      Ready for 1-click executive review & export to Notion/Linear.
                    </p>
                  </div>
                  <a
                    href="/signup"
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-zinc-100 transition-colors shadow-sm"
                  >
                    <span>Deploy Candidate Dossier</span>
                  </a>
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
            Accelerate Your Senior Talent Pipeline
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 max-w-xl mx-auto mb-8 leading-relaxed font-normal">
            Turn public data signals into unfair hiring advantages. Eliminate recruiter friction and source top-tier operators with mathematical precision.
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
