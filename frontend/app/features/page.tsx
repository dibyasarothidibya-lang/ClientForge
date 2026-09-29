"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpatialMeshBackground from "@/components/ui/SpatialMeshBackground";
import { motion } from "framer-motion";
import {
  Search,
  Check,
  X,
  Sparkles,
  ArrowRight,
  Users,
  Briefcase,
  Clock,
  Calendar,
  CreditCard,
  Receipt,
  Target,
  FileText,
  Zap,
  ShieldCheck,
  Layers,
  ChevronRight
} from "lucide-react";

export default function FeaturesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModule, setSelectedModule] = useState<string>("ALL");

  const modules = [
    {
      id: "core-hr",
      name: "Core HR & Directory",
      icon: Users,
      features: [
        "Interactive Organizational Charting with drill-down hierarchy",
        "Configurable custom employee data attributes and fields",
        "Employee self-service personal profile and contact portal",
        "Emergency contacts & dependent beneficiary records",
        "Internal job transfer and promotion chronological audit log",
        "Bulk CSV employee roster importer and validator"
      ]
    },
    {
      id: "recruitment",
      name: "Recruitment & ATS",
      icon: Briefcase,
      features: [
        "Multi-stage Kanban hiring pipeline (Applied to Hired)",
        "Internal and external job board publishing",
        "Candidate resume parsing and structured scorecard evaluations",
        "Collaborative interviewer notes and rating calibration",
        "One-click stage promotion and automated email triggers",
        "Configurable salary bands, departmental requisition tags"
      ]
    },
    {
      id: "attendance",
      name: "Time & Attendance",
      icon: Clock,
      features: [
        "Biometric, browser, and mobile clock-in / clock-out",
        "Shift scheduling with departmental coverage minimums",
        "Overtime and weekend differential hour computation",
        "Monthly attendance heatmap and tardiness metrics",
        "Timesheet manager approval lock before payroll run",
        "Integrated public holiday calendars for 40+ countries"
      ]
    },
    {
      id: "leave",
      name: "Leave & PTO Management",
      icon: Calendar,
      features: [
        "3-Tier approval chains (Employee → Manager → HR)",
        "Statutory leave policy engines (Annual, Sick, FMLA, Parental)",
        "Automated year-end accrual and carryover calculations",
        "Departmental absence calendar and team availability alerts",
        "Medical certificate attachment and HIPAA compliance",
        "Partial-day, half-day, and multi-week leave configurations"
      ]
    },
    {
      id: "payroll",
      name: "Automated Payroll",
      icon: CreditCard,
      features: [
        "Semi-monthly, bi-weekly, and monthly scheduled payroll cycles",
        "Multi-state statutory tax calculations and deductions",
        "NACHA Direct Deposit file generation for corporate banking",
        "Irreversible action confirmation modals and safety checkpoints",
        "Itemized earnings statements and downloadable PDF stubs",
        "Pre-tax health insurance, 401(k), and HSA contribution deductions"
      ]
    },
    {
      id: "expenses",
      name: "Expenses & Reimbursements",
      icon: Receipt,
      features: [
        "Receipt upload with automatic image OCR analysis",
        "Expense category classification (Travel, Hardware, Wellness)",
        "Manager approval drawer with receipt inspection lightbox",
        "Corporate policy limits and duplicate claim detection",
        "Direct reimbursement dispatch integrated into next payroll run",
        "Exportable expense breakdown reports for CPA and tax audit"
      ]
    },
    {
      id: "performance",
      name: "Performance & OKRs",
      icon: Target,
      features: [
        "Company, team, and individual OKR progress tracking",
        "360-degree peer and manager review cycles",
        "Interactive goal calibration sliders with live percentage sync",
        "Manager private feedback and competency rating matrices",
        "Continuous performance milestone timelines",
        "Historical review archive for annual promotion cycles"
      ]
    },
    {
      id: "documents",
      name: "Document Vault",
      icon: FileText,
      features: [
        "WORM-compliant cryptographically sealed storage",
        "Offer letter, NDA, and statutory form e-signature workflows",
        "Category grouping (Contracts, Policies, Tax, Compliance)",
        "Granular access permissions (Employee-only, Manager, HR)",
        "Full document version history and tamper-evident audit logs",
        "Bulk document distribution to entire departments"
      ]
    },
    {
      id: "automation",
      name: "Workflow Automations",
      icon: Zap,
      features: [
        "Visual Trigger → Condition → Action node builder",
        "New hire IT account provisioning (Google, Slack, GitHub)",
        "Automated leave balance adjustment upon approval",
        "Contract and visa expiration warning notifications",
        "Automated milestone celebrations (Birthdays & Anniversaries)",
        "Custom webhook endpoints for external system synchronization"
      ]
    }
  ];

  const filteredModules = modules.filter((m) => {
    const matchesCategory = selectedModule === "ALL" || m.id === selectedModule;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070709] text-slate-900 dark:text-neutral-100 font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200 relative overflow-x-hidden">
      <SpatialMeshBackground />
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-14 sm:pt-40 sm:pb-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Feature Matrix</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-950 dark:text-white max-w-4xl mx-auto">
          Every tool your company needs to <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-sky-500 to-indigo-400">scale without chaos.</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto mt-4 leading-relaxed">
          Explore the exhaustive catalog of features built natively into PeopleCore. No plugins or third-party add-on purchases required.
        </p>

        {/* Search & Filter bar */}
        <div className="mt-8 max-w-xl mx-auto flex items-center bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-2 shadow-md">
          <Search className="w-4 h-4 text-slate-400 ml-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search features (e.g., payroll, NACHA, 360 review, OCR)..."
            className="w-full bg-transparent px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white mr-2">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Module Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4 max-w-3xl mx-auto">
          <button
            onClick={() => setSelectedModule("ALL")}
            className={`px-3 py-1 rounded-full text-xs transition cursor-pointer ${
              selectedModule === "ALL"
                ? "bg-slate-900 dark:bg-white text-white dark:text-neutral-950 font-semibold"
                : "bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            All Modules
          </button>
          {modules.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedModule(m.id)}
              className={`px-3 py-1 rounded-full text-xs transition cursor-pointer ${
                selectedModule === m.id
                  ? "bg-slate-900 dark:bg-white text-white dark:text-neutral-950 font-semibold"
                  : "bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {filteredModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                className="p-8 rounded-3xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-950 dark:text-white">{mod.name}</h3>
                    <span className="text-xs text-slate-500">{mod.features.length} core enterprise capabilities</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mod.features.map((feat, fi) => (
                    <div
                      key={fi}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-neutral-900/50 border border-slate-200 dark:border-white/[0.04] flex items-start gap-3"
                    >
                      <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs text-slate-700 dark:text-neutral-300 leading-relaxed font-medium">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison Table vs Legacy HR */}
      <section className="py-20 bg-slate-100/60 dark:bg-[#09090d] border-y border-slate-200 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              Direct Comparison
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white">
              Why modern teams switch from legacy HR.
            </h2>
            <p className="text-slate-600 dark:text-neutral-400 text-sm">
              See how PeopleCore outperforms traditional siloed platforms.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] rounded-2xl shadow-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-neutral-800 text-slate-500 font-semibold">
                  <th className="p-4">Capability</th>
                  <th className="p-4 text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50/50 dark:bg-indigo-950/20">
                    PeopleCore OS
                  </th>
                  <th className="p-4">BambooHR</th>
                  <th className="p-4">Workday</th>
                  <th className="p-4">Rippling</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-neutral-800/60 text-slate-700 dark:text-neutral-300">
                {[
                  { cap: "Unified Data Model (Zero Redundancy)", pc: true, b: false, w: false, r: true },
                  { cap: "Built-In Modern ATS Kanban", pc: true, b: "Add-on cost", w: "Complex setup", r: true },
                  { cap: "Automated NACHA Multi-State Payroll", pc: true, b: "Third-party", w: true, r: true },
                  { cap: "Visual Trigger Workflow Builder", pc: true, b: false, w: "Requires IT", r: true },
                  { cap: "360 Performance OKR Calibration", pc: true, b: "Add-on", w: true, r: "Add-on" },
                  { cap: "Clean Django/DRF API Architecture", pc: true, b: false, w: false, r: false },
                  { cap: "Implementation Time Under 24h", pc: true, b: "2-4 Weeks", w: "6-9 Months", r: "1-2 Weeks" }
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="p-4 font-semibold text-slate-900 dark:text-white">{row.cap}</td>
                    <td className="p-4 bg-indigo-50/50 dark:bg-indigo-950/20 font-bold text-indigo-600 dark:text-indigo-400">
                      {row.pc === true ? <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 inline" /> : row.pc}
                    </td>
                    <td className="p-4 text-slate-500">{row.b === true ? <Check className="w-4 h-4 text-emerald-500 inline" /> : row.b === false ? <X className="w-4 h-4 text-rose-400 inline" /> : row.b}</td>
                    <td className="p-4 text-slate-500">{row.w === true ? <Check className="w-4 h-4 text-emerald-500 inline" /> : row.w === false ? <X className="w-4 h-4 text-rose-400 inline" /> : row.w}</td>
                    <td className="p-4 text-slate-500">{row.r === true ? <Check className="w-4 h-4 text-emerald-500 inline" /> : row.r === false ? <X className="w-4 h-4 text-rose-400 inline" /> : row.r}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-10 rounded-3xl bg-slate-900 text-white max-w-4xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Ready to modernize your HR stack?</h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto">
            Experience the difference of a modern, fast, and unified people management platform.
          </p>
          <div className="pt-2">
            <Link
              href="/auth?mode=signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition cursor-pointer shadow-md"
            >
              <span>Get Started in 2 Minutes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
