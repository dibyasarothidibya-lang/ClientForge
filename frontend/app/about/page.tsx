"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpatialMeshBackground from "@/components/ui/SpatialMeshBackground";
import ThreeDCard from "@/components/motion/ThreeDCard";
import { motion } from "framer-motion";
import {
  Users,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  Target,
  Globe2,
  ArrowRight,
  Award,
  Building2,
  CheckCircle2
} from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Sparkles,
      title: "Obsessive Craftsmanship",
      desc: "Software used 8 hours a day should be fast, elegant, and delightful. We obsess over pixel alignment, tactile keystrokes, and millisecond latencies."
    },
    {
      icon: ShieldCheck,
      title: "Zero-Compromise Trust",
      desc: "Personnel records, salaries, and statutory compliance data are sacred. We protect them with hardware cryptography, zero data retention on AI models, and immutable audit logs."
    },
    {
      icon: Target,
      title: "Simplicity Despite Depth",
      desc: "An enterprise platform shouldn't require months of training or certified consultants. Complex multi-state payroll and OKR reviews feel as intuitive as consumer apps."
    },
    {
      icon: Globe2,
      title: "Global-First Architecture",
      desc: "Modern teams aren't constrained by city borders. We design for remote, hybrid, and cross-border teams with multi-currency payroll and regional data sovereignty."
    }
  ];

  const leadership = [
    {
      name: "Marcus Vance",
      title: "Co-Founder & CEO",
      prev: "Ex-Stripe, Head of Workforce Infrastructure",
      desc: "Marcus spent a decade engineering high-availability payment rails and global workforce systems before founding PeopleCore."
    },
    {
      name: "Dr. Evelyn Reed",
      title: "Co-Founder & CTO",
      prev: "Ex-Google Brain, Distributed Systems",
      desc: "Evelyn leads core architecture, zero-trust cryptographic vaults, and real-time state synchronization engines."
    },
    {
      name: "Sarah Ahmed",
      title: "VP of People Operations & Compliance",
      prev: "Ex-Deel, Head of Global Labor Legal",
      desc: "Sarah spearheads statutory compliance engines, ensuring automatic adherence across 150+ international labor jurisdictions."
    },
    {
      name: "Julian Thorne",
      title: "Head of Product Design",
      prev: "Ex-Linear, Principal Interface Designer",
      desc: "Julian is the architect of our desktop-first enterprise design system, subtle micro-interactions, and keyboard-driven flows."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070709] text-slate-900 dark:text-neutral-100 font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200 relative overflow-x-hidden">
      <SpatialMeshBackground />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Mission</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-950 dark:text-white max-w-4xl mx-auto">
          Reimagining how the world’s best teams <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-sky-500 to-indigo-400">work together.</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto mt-4 leading-relaxed">
          PeopleCore was founded on a simple observation: modern companies were using brilliant tools for code, design, and messaging, but their HR and payroll software felt like 2004. We set out to fix that.
        </p>
      </section>

      {/* Story & Stats Strip */}
      <section className="py-16 bg-white/70 dark:bg-black/30 border-y border-slate-200 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tabular-nums">45,000+</div>
              <div className="text-xs text-slate-500 mt-1">Employees Supported</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 tabular-nums">150+</div>
              <div className="text-xs text-slate-500 mt-1">Countries with Compliance Rules</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">99.99%</div>
              <div className="text-xs text-slate-500 mt-1">Payroll & API Uptime</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tabular-nums">$2.4B+</div>
              <div className="text-xs text-slate-500 mt-1">Annual Payroll Dispatched</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            Operating Principles
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white">
            The values guiding everything we build.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="p-8 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-950 dark:text-white">{v.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-slate-100/60 dark:bg-[#09090d] border-y border-slate-200 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white">
              Built by veterans of enterprise scale.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((leader, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-500 text-white font-bold text-lg flex items-center justify-center mb-4 shadow-md">
                    {leader.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <h3 className="font-bold text-base text-slate-950 dark:text-white">{leader.name}</h3>
                  <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-0.5">{leader.title}</div>
                  <div className="text-[11px] text-slate-400 mt-1 font-mono">{leader.prev}</div>
                  <p className="text-xs text-slate-600 dark:text-neutral-400 mt-3 leading-relaxed">
                    {leader.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers Teaser */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-10 rounded-3xl bg-indigo-950/20 border border-indigo-500/20 max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">
            We’re hiring systems engineers, designers, and HR experts.
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 text-xs sm:text-sm">
            Help us build the next generation of workforce operating infrastructure. Distributed global team.
          </p>
          <div className="pt-2">
            <Link
              href="/workspace/recruitment"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md transition cursor-pointer"
            >
              <span>View Open Engineering & Product Roles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
