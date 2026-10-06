"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import HeroHeadline from "./hero/CreatorHero";
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

  const metrics = [
    {
      label: "AUTOMATED SUITE",
      value: "71 Tests",
      detail: "End-to-end integration & unit coverage across 13 Django apps.",
      icon: ShieldCheck,
    },
    {
      label: "MULTI-TENANCY",
      value: "6 RBAC Roles",
      detail: "Strict organization-scoped isolation & permission guards.",
      icon: Users,
    },
    {
      label: "ARCHITECTURE",
      value: "13 Services",
      detail: "Payroll, attendance, audit logging, leave & doc workflows.",
      icon: Activity,
    },
    {
      label: "DEPLOYMENT",
      value: "Docker + Nginx",
      detail: "Production Linux VM with PostgreSQL, Redis & SSL reverse proxy.",
      icon: Clock,
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

        {/* Visual Divider / Spacer */}
        {/* 2. THREE CURATED ECOSYSTEM PILLARS (EDITORIAL COMPOSITION) */}
        <div className="w-full relative mt-16 sm:mt-24">
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
                title: "Workforce Operations & RBAC Core",
                subtitle: "Automate organizational hierarchy, role permissions, employee records, and audit workflows.",
                src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
                href: "/people-operations",
                tag: "Tenant Isolation & RBAC",
              },
              {
                title: "Talent & Pipeline Engine",
                subtitle: "Structured candidate pipelines, resume indexing, stage transitions, and telemetry tracking.",
                src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
                href: "/talent-intelligence",
                tag: "Pipeline Domain Services",
              },
              {
                title: "Global Mobility & Payroll Demo",
                subtitle: "Multi-currency compensation modeling, statutory tax calculations, and localized payout workflows.",
                src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
                href: "/global-mobility",
                tag: "Distributed Payroll Engine",
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
