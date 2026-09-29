"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpatialMeshBackground from "@/components/ui/SpatialMeshBackground";
import ThreeDCard from "@/components/motion/ThreeDCard";
import { motion } from "framer-motion";
import {
  Users,
  Briefcase,
  Clock,
  Calendar,
  CreditCard,
  Target,
  FileText,
  Zap,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Layers,
  Database,
  Code2,
  CheckCircle2,
  Globe2,
  Lock,
  Cpu,
  Server
} from "lucide-react";

export default function ProductPage() {
  const [selectedPillar, setSelectedPillar] = useState<number>(0);

  const pillars = [
    {
      title: "Unified Employee Graph",
      subtitle: "Zero redundant data entry across systems",
      icon: Users,
      desc: "Every contract signed, PTO requested, expense filed, or performance review completed updates the employee's singular, cryptographically audited canonical record.",
      metrics: ["100% data consistency", "Zero duplicate CSV imports", "Instant audit history"],
      badge: "Architecture"
    },
    {
      title: "Automated Lifecycle Engine",
      subtitle: "From offer acceptance to seamless offboarding",
      icon: Zap,
      desc: "Event-driven micro-workflows handle IT provisioning, tax form collection, mentor pairing, equipment stipend distribution, and access revocations without human delay.",
      metrics: ["85% faster onboarding", "Zero lapsed NDAs", "SOC-2 compliant deprovisioning"],
      badge: "Automation"
    },
    {
      title: "Real-Time Payroll Calculation",
      subtitle: "Gross-to-net math synchronized with timesheets",
      icon: CreditCard,
      desc: "Hours tracked, overtime authorized, and paid leave taken calculate into statutory tax brackets and NACHA bank files automatically.",
      metrics: ["99.99% payout accuracy", "Multi-state tax engine", "Direct bank ACH transmission"],
      badge: "Financial Engine"
    },
    {
      title: "Statutory Compliance Shield",
      subtitle: "Proactive legal guards in 150+ jurisdictions",
      icon: ShieldCheck,
      desc: "Never miss a labor law amendment, required harassment training cycle, or statutory minimum wage adjustment with automated policy enforcement.",
      metrics: ["Built-in legal guards", "WORM compliant storage", "Automated EEO-1 reporting"],
      badge: "Governance"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070709] text-slate-900 dark:text-neutral-100 font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200 relative overflow-x-hidden">
      <SpatialMeshBackground />
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Product Overview</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-950 dark:text-white max-w-4xl mx-auto">
          Built for the future of <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-sky-500 to-indigo-400">enterprise people management.</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto mt-4 leading-relaxed">
          PeopleCore combines Core HR, ATS, attendance tracking, leave management, automated payroll, performance OKRs, and compliance into one cohesive platform.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
          <Link
            href="/auth?mode=signup"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/20 flex items-center gap-2 transition cursor-pointer"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/workspace"
            className="px-6 py-3 rounded-xl bg-white dark:bg-[#121216] hover:bg-slate-100 dark:hover:bg-neutral-800 text-slate-900 dark:text-white font-semibold text-xs border border-slate-200 dark:border-white/[0.08] shadow-xs transition cursor-pointer"
          >
            <span>Explore Live Workspace</span>
          </Link>
        </div>
      </section>

      {/* Interactive Core Pillars */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Pillar Selectors */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-neutral-500 mb-2">
              System Architecture Pillars
            </h3>
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isSelected = selectedPillar === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedPillar(idx)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? "bg-white dark:bg-[#121216] border-indigo-500 shadow-lg shadow-indigo-500/10"
                      : "bg-white/60 dark:bg-white/[0.02] border-slate-200 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/[0.1]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-lg ${isSelected ? "bg-indigo-500 text-white" : "bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400"}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-sm text-slate-900 dark:text-white">{pillar.title}</span>
                    </div>
                    <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                      {pillar.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 pl-9">
                    {pillar.subtitle}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right: Detailed Deep Dive Display */}
          <div className="lg:col-span-7 p-8 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  {React.createElement(pillars[selectedPillar].icon, { className: "w-6 h-6" })}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-950 dark:text-white">{pillars[selectedPillar].title}</h2>
                  <div className="text-xs text-slate-500">{pillars[selectedPillar].subtitle}</div>
                </div>
              </div>
              <span className="text-xs font-mono px-2 py-1 rounded bg-slate-100 dark:bg-neutral-900 text-slate-600 dark:text-neutral-400">
                Pillar 0{selectedPillar + 1}
              </span>
            </div>

            <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
              {pillars[selectedPillar].desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {pillars[selectedPillar].metrics.map((m, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-white/[0.06]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mb-1.5" />
                  <span className="text-xs font-semibold text-slate-900 dark:text-neutral-200">{m}</span>
                </div>
              ))}
            </div>

            {/* Architecture code preview for tech evaluators */}
            <div className="mt-4 p-4 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto border border-neutral-800">
              <div className="flex items-center justify-between text-neutral-500 pb-2 mb-2 border-b border-neutral-800 text-[10px]">
                <span>DRF / REST API Serializer Specification</span>
                <span>Django 5.1 Ready</span>
              </div>
              <pre className="text-[11px] leading-relaxed">
{`# Clean DRF API Separation
class EmployeeMasterSerializer(serializers.ModelSerializer):
    attendance_summary = AttendanceMetricSerializer(read_only=True)
    payroll_profile = PayrollComputationSerializer(read_only=True)
    active_okrs = PerformanceGoalSerializer(many=True, read_only=True)
    leave_balances = LeaveAccrualSerializer(read_only=True)

    class Meta:
        model = PeopleCoreEmployee
        fields = ['id', 'emp_id', 'full_name', 'department', 
                  'payroll_profile', 'attendance_summary', 'active_okrs']`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* 8 Feature Modules Showcase */}
      <section className="py-20 bg-slate-100/60 dark:bg-[#09090d] border-y border-slate-200 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white">
              End-to-end operational capabilities.
            </h2>
            <p className="text-slate-600 dark:text-neutral-400 text-sm">
              Each module is engineered to operate autonomously or as a fully synchronized fleet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Recruitment & ATS", icon: Briefcase, desc: "Stage-based Kanban, interview kits, feedback scorecards, and offer letter generation." },
              { title: "Attendance & Shifts", icon: Clock, desc: "Biometric and IP-validated punches, scheduled shift management, and auto overtime." },
              { title: "Leave & PTO", icon: Calendar, desc: "Statutory accrual calculators, manager escalation rules, and company holiday calendars." },
              { title: "Automated Payroll", icon: CreditCard, desc: "Tax withholding logic, NACHA direct deposit generation, and tamper-evident stubs." },
              { title: "Corporate Expenses", icon: Target, desc: "Smart OCR receipt scanning, policy limit rules, and seamless reimbursement." },
              { title: "Performance OKRs", icon: Target, desc: "Quarterly objective alignment, 360 review cycles, and calibration matrices." },
              { title: "Document Vault", icon: FileText, desc: "Cryptographic tamper-evidence, e-signatures, access control, and 7-year archives." },
              { title: "No-Code Workflows", icon: Zap, desc: "Event-based logic blocks that automate repetitive onboarding and operational tasks." }
            ].map((mod, i) => {
              const Icon = mod.icon;
              return (
                <div key={i} className="p-5 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{mod.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">{mod.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-10 sm:p-14 rounded-3xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xl max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white">
            See PeopleCore in action today.
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 text-sm max-w-xl mx-auto">
            Test drive our live workspace with realistic enterprise mock data or start your free 14-day organization trial.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/auth?mode=signup"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md transition cursor-pointer"
            >
              Get Started Free
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-slate-900 dark:text-white font-semibold text-xs border border-slate-200 dark:border-white/[0.08] transition cursor-pointer"
            >
              Schedule Enterprise Walkthrough
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
