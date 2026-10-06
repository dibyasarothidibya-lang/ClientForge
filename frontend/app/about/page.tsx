"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpatialMeshBackground from "@/components/ui/SpatialMeshBackground";
import ThreeDCard from "@/components/motion/ThreeDCard";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Sparkles,
  Target,
  Globe2,
  ArrowRight,
  Code2,
  Server,
  Database,
  Lock,
  Layers,
  CheckCircle2,
  Cpu,
  Terminal,
  ExternalLink
} from "lucide-react";

export default function AboutPage() {
  const engineeringMotivations = [
    {
      icon: Layers,
      title: "Multi-Tenancy & Data Isolation",
      desc: "Designed and implemented strict organization-scoped query boundaries across PostgreSQL models to guarantee zero data leakage between tenants at the ORM layer."
    },
    {
      icon: Lock,
      title: "Granular Role-Based Access Control",
      desc: "Architected a 6-tier RBAC permission model separating Owners, Administrators, Managers, Finance, Auditors, and Members with custom permission classes."
    },
    {
      icon: Server,
      title: "Django REST Framework Backend Services",
      desc: "Structured 13 decoupled domain applications covering accounts, organizations, payroll calculations, attendance records, leave tracking, document workflows, and audit logging."
    },
    {
      icon: Cpu,
      title: "Asynchronous Background Processing",
      desc: "Integrated Redis and Celery worker pipelines to handle long-running document generation, payroll runs, and notifications off the critical HTTP request cycle."
    },
    {
      icon: CheckCircle2,
      title: "Automated Regression Verification",
      desc: "Engineered and maintain 71 automated unit and integration tests across all domain apps, asserting authorization boundaries, payroll logic, and model lifecycle states."
    },
    {
      icon: Database,
      title: "Production Linux & Docker Deployment",
      desc: "Containerized the complete application stack with Docker Compose, reverse-proxied with Nginx, TLS termination, and hosted on a dedicated Oracle Cloud Linux VM."
    }
  ];

  const engineeringPrinciples = [
    {
      title: "Tenant Isolation by Design",
      desc: "Every database operation, serializer validation, and query filter must be scoped to the authenticated user's active tenant context."
    },
    {
      title: "Explicit Permission Boundaries",
      desc: "Privileged actions—such as approving payroll, modifying billing, or exporting audit trails—require deterministic role checks before executing domain logic."
    },
    {
      title: "Evidence Over Assumptions",
      desc: "Systems should communicate verified realities. Telemetry, test suites, and audit trails provide verifiable truth instead of optimistic marketing assertions."
    },
    {
      title: "Domain-Oriented Backend Services",
      desc: "Business logic is encapsulated in clean domain services rather than bloated view controllers, preserving maintainability as features scale."
    },
    {
      title: "Defensive Validation",
      desc: "Data entering the system is strictly validated at both the serializer layer and database constraints to prevent inconsistent or malformed records."
    },
    {
      title: "Observable & Maintainable Infrastructure",
      desc: "Structured audit trails record significant state mutations, enabling tamper-evident operational compliance and straightforward debugging."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070709] text-slate-900 dark:text-neutral-100 font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200 relative overflow-x-hidden">
      <SpatialMeshBackground />
      <Navbar />

      {/* Hero: Honest Positioning */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
          <Code2 className="w-3.5 h-3.5" />
          <span>Independent Engineering Case Study</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-950 dark:text-white max-w-4xl mx-auto">
          About <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-sky-500 to-indigo-400">Client Forge.</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-neutral-400 max-w-3xl mx-auto mt-5 leading-relaxed font-sans">
          Client Forge is an independently engineered SaaS platform created by <strong className="text-slate-900 dark:text-white font-semibold">Dibya Sarothi Simanta</strong> to explore and demonstrate production-grade multi-tenant architecture, workforce operations, security boundaries, asynchronous task execution, and modern full-stack web infrastructure.
        </p>
      </section>

      {/* Verified Repository Telemetry Strip */}
      <section className="py-12 bg-white/70 dark:bg-black/30 border-y border-slate-200 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center font-sans">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tabular-nums">71 Tests</div>
              <div className="text-xs text-slate-500 mt-1">Automated Test Suites Passing</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 tabular-nums">6 Roles</div>
              <div className="text-xs text-slate-500 mt-1">Granular RBAC Permissions</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">13 Apps</div>
              <div className="text-xs text-slate-500 mt-1">Django Domain Services</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tabular-nums">Docker + Nginx</div>
              <div className="text-xs text-slate-500 mt-1">Production Linux VM Deployment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why I Built It */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono">
            Architectural Motivation
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white">
            Why I built Client Forge.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 leading-relaxed font-sans">
            Workforce platforms represent some of the most demanding problems in software engineering: multi-tenant security, auditability, complex arithmetic, and strict permission models. Client Forge was built from end-to-end to master and demonstrate these challenges in code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {engineeringMotivations.map((m, i) => {
            const Icon = m.icon;
            return (
              <div
                key={i}
                className="p-7 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-3 hover:border-slate-300 dark:hover:border-white/20 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-950 dark:text-white">{m.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">{m.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Engineering Principles */}
      <section className="py-20 bg-slate-100/60 dark:bg-[#09090d] border-y border-slate-200 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono">
              Core Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white">
              Engineering principles guiding the codebase.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {engineeringPrinciples.map((p, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold mb-2">0{i + 1} // PRINCIPLE</div>
                  <h3 className="font-bold text-base text-slate-950 dark:text-white mb-2">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built By Section: Dibya Sarothi Simanta */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-white/[0.1] shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-indigo-500/40 dark:border-white/20 shadow-xl shrink-0 bg-neutral-900">
              <img
                src="/creator-avatar.png"
                alt="Dibya Sarothi Simanta"
                className="w-full h-full object-cover object-top scale-105"
              />
            </div>

            <div className="space-y-3 flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-xs font-mono text-indigo-600 dark:text-indigo-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Available for SaaS Architecture & Engineering Contracts
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">
                Built by Dibya Sarothi Simanta
              </h2>
              <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                Full-Stack Systems Architect & Backend Engineer
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed font-sans">
                I specialize in architecting and delivering full-stack SaaS applications, designing robust relational databases in PostgreSQL, engineering clean REST APIs with Django, and building fluid, responsive interfaces with TypeScript and Next.js.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3">
                <a
                  href="https://github.com/dibyasarothidibya-lang/ClientForge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-semibold text-xs hover:opacity-90 transition shadow-sm"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>View GitHub Repository</span>
                </a>

                <Link
                  href="/workspace"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-semibold text-xs hover:bg-slate-200 dark:hover:bg-white/10 transition"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Explore Live Workspace</span>
                </Link>

                <a
                  href="mailto:dibyasarothidibya@gmail.com"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-500 transition shadow-sm"
                >
                  <span>Discuss a Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
