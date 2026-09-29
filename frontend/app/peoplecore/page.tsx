"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpatialMeshBackground from "@/components/ui/SpatialMeshBackground";
import ThreeDCard from "@/components/motion/ThreeDCard";
import GlareHover from "@/components/motion/GlareHover";
import { motion, AnimatePresence } from "framer-motion";
import {
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
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Play,
  X,
  Check,
  Building2,
  Layers,
  BarChart3,
  TrendingUp,
  Cpu,
  Lock,
  Globe2,
  PhoneCall,
  CalendarCheck
} from "lucide-react";

export default function PeopleCoreMarketingPage() {
  const [activePreviewTab, setActivePreviewTab] = useState<"dashboard" | "people" | "ats" | "attendance" | "payroll" | "workflows">("dashboard");
  const [billingCycle, setBillingCycle] = useState<"annual" | "monthly">("annual");
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoFormSubmitted, setDemoFormSubmitted] = useState(false);
  const [demoFormData, setDemoFormData] = useState({
    name: "",
    email: "",
    company: "",
    teamSize: "25-100",
    message: ""
  });

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoFormSubmitted(true);
    setTimeout(() => {
      setIsDemoModalOpen(false);
      setDemoFormSubmitted(false);
      setDemoFormData({ name: "", email: "", company: "", teamSize: "25-100", message: "" });
    }, 2200);
  };

  const featureCards = [
    {
      icon: Users,
      title: "Core HR & Directory",
      desc: "Single source of truth for global employee records, organizational charting, custom fields, and self-service portals.",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "hover:border-blue-500/30",
      glare: "#3b82f6",
      tag: "Foundation"
    },
    {
      icon: Briefcase,
      title: "Recruitment & ATS",
      desc: "Collaborative job board publishing, customizable Kanban pipeline, interview scorecards, and automated candidate communications.",
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
      border: "hover:border-indigo-500/30",
      glare: "#6366f1",
      tag: "Hiring"
    },
    {
      icon: Clock,
      title: "Time & Attendance",
      desc: "Biometric and browser check-in/out, GPS-verified shift scheduling, overtime calculations, and automated timesheet sync.",
      color: "text-cyan-500",
      bg: "bg-cyan-500/10",
      border: "hover:border-cyan-500/30",
      glare: "#06b6d4",
      tag: "Workforce"
    },
    {
      icon: Calendar,
      title: "Leave & Absence (PTO)",
      desc: "Multi-tier approval workflows (Employee → Manager → HR), statutory accruals, carryover rules, and global holiday calendars.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "hover:border-emerald-500/30",
      glare: "#10b981",
      tag: "Compliance"
    },
    {
      icon: CreditCard,
      title: "Automated Payroll",
      desc: "One-click gross-to-net calculations, statutory tax deductions, NACHA direct deposit file generation, and tamper-evident pay stubs.",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "hover:border-amber-500/30",
      glare: "#f59e0b",
      tag: "Financials"
    },
    {
      icon: Receipt,
      title: "Expenses & Reimbursements",
      desc: "AI-assisted receipt OCR parsing, corporate spend policies, automated manager approvals, and payroll-integrated reimbursements.",
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      border: "hover:border-rose-500/30",
      glare: "#f43f5e",
      tag: "Operations"
    },
    {
      icon: Target,
      title: "Performance & OKRs",
      desc: "Continuous goal alignment, 360-degree review cycles, manager feedback calibration, and skill competency heatmaps.",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "hover:border-purple-500/30",
      glare: "#8b5cf6",
      tag: "Talent"
    },
    {
      icon: FileText,
      title: "Document Vault",
      desc: "Cryptographically verifiable contracts, tax forms, e-signatures, access control policies, and audit-ready storage.",
      color: "text-sky-500",
      bg: "bg-sky-500/10",
      border: "hover:border-sky-500/30",
      glare: "#0ea5e9",
      tag: "Security"
    },
    {
      icon: Zap,
      title: "Workflow Automations",
      desc: "No-code event triggers: auto-provision software accounts, welcome emails, anniversary greetings, and contract renewal alerts.",
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      border: "hover:border-yellow-500/30",
      glare: "#eab308",
      tag: "Efficiency"
    }
  ];

  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      desc: "Ideal for early-stage startups and small agile teams up to 10 members.",
      popular: false,
      features: [
        "Up to 10 Active Employees",
        "Self-Service Employee Directory",
        "Basic Leave & PTO Requests",
        "Employee Document Storage",
        "Community & Standard Email Support"
      ],
      ctaText: "Start Free",
      ctaHref: "/auth?mode=signup&plan=free"
    },
    {
      name: "Professional",
      price: billingCycle === "annual" ? "$6" : "$8",
      period: "per employee / mo",
      desc: "For scaling companies needing structured time tracking, recruitment, and approvals.",
      popular: true,
      features: [
        "Up to 50 Active Employees",
        "Full Recruitment & ATS Kanban",
        "Biometric & Browser Attendance",
        "Multi-Tier Approval Chains",
        "Automated Timesheet Export",
        "10 Active Workflow Automations",
        "Priority 8h Business Support"
      ],
      ctaText: "Start 14-Day Trial",
      ctaHref: "/auth?mode=signup&plan=pro"
    },
    {
      name: "Business",
      price: billingCycle === "annual" ? "$11" : "$14",
      period: "per employee / mo",
      desc: "For mid-market enterprises demanding automated payroll, performance, and advanced analytics.",
      popular: false,
      features: [
        "Up to 250 Active Employees",
        "Automated Multi-State Payroll Engine",
        "NACHA Direct Deposit & Tax Filing",
        "360-Degree Performance & OKRs",
        "Receipt OCR Expense Processing",
        "Unlimited Custom Workflows",
        "Advanced Role-Based Permissions (RBAC)",
        "Dedicated Account Specialist"
      ],
      ctaText: "Deploy Business",
      ctaHref: "/auth?mode=signup&plan=business"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "tailored billing",
      desc: "For global enterprises requiring custom integrations, dedicated tenancy, and strict compliance.",
      popular: false,
      features: [
        "Unlimited Global Headcount",
        "Custom HRIS & ERP Integrations",
        "SAML SSO & SCIM Provisioning",
        "Dedicated Database / Data Residency",
        "99.99% Uptime Guarantee SLA",
        "Custom Payroll Rules & Union Policies",
        "24/7 Named Technical Lead"
      ],
      ctaText: "Contact Enterprise",
      ctaHref: "/contact"
    }
  ];

  const faqs = [
    {
      q: "Can PeopleCore replace our separate ATS, leave manager, and payroll tools?",
      a: "Yes. PeopleCore is architected as an all-in-one workforce OS. Your employee directory, job candidates, approved leave dates, expense claims, and hours logged flow natively into your payroll calculations without manual CSV export/import."
    },
    {
      q: "How does the payroll and tax engine handle multi-state or global regulations?",
      a: "PeopleCore includes built-in statutory compliance engines for federal, state, and local deductions. For international team members, it supports local currency payouts and EOR ledger mappings."
    },
    {
      q: "Can we connect PeopleCore to an external backend like Django/DRF or custom ERP?",
      a: "Absolutely. PeopleCore is constructed with an API-first headless data architecture. Every entity (Employees, Pay runs, Leave, OKRs) maps cleanly to standard REST/DRF serializers and GraphQL endpoints."
    },
    {
      q: "Is employee and financial data cryptographically secure?",
      a: "All sensitive records (social security numbers, bank routing info, compensation, passport scans) are encrypted using AES-256 at rest and TLS 1.3 in transit. We support SOC-2 Type II audit logging and role-based permissions."
    },
    {
      q: "How long does onboarding and migration take?",
      a: "Our one-click spreadsheet importer and BambooHR/Rippling migration wizards enable most teams to be fully operational within less than 24 hours."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070709] text-slate-900 dark:text-neutral-100 font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200 relative overflow-x-hidden">
      <SpatialMeshBackground />
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/25 text-indigo-700 dark:text-indigo-400 text-xs font-semibold tracking-wide uppercase"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Modern All-In-One Workforce Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-slate-950 dark:text-white leading-[1.08]"
          >
            Everything your people team needs, <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-sky-500 to-indigo-400">in one place.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed font-normal"
          >
            Manage employees, hiring, payroll, attendance, leave, documents, performance, and HR workflows from one secure platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              href="/auth?mode=signup"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer group"
            >
              <span>Start free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white dark:bg-[#121216] hover:bg-slate-100 dark:hover:bg-neutral-800 text-slate-900 dark:text-neutral-200 font-semibold text-sm border border-slate-200 dark:border-white/[0.08] shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-indigo-500" />
              <span>Book a demo</span>
            </button>

            <Link
              href="/workspace"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-slate-700 dark:text-neutral-300 font-medium text-sm border border-slate-200 dark:border-white/[0.06] flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <LayoutDashboardIcon className="w-4 h-4 text-emerald-500" />
              <span>Explore Live Workspace</span>
            </Link>
          </motion.div>

          {/* Micro trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-slate-500 dark:text-neutral-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Free 14-day full enterprise trial</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>SOC-2 Type II Certified</span>
            </div>
          </div>
        </div>

        {/* 2. PRODUCT DASHBOARD PREVIEW */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 rounded-2xl p-2 sm:p-4 bg-slate-200/50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/[0.08] shadow-2xl backdrop-blur-xl"
        >
          {/* Top Browser Bar */}
          <div className="flex flex-wrap items-center justify-between pb-3 px-3 border-b border-slate-200 dark:border-white/[0.06] gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono text-slate-500 dark:text-neutral-400 hidden sm:inline-block">
                app.peoplecore.com/workspace
              </span>
            </div>

            {/* Interactive Preview Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-neutral-900 p-1 rounded-xl text-xs font-medium">
              {[
                { id: "dashboard", label: "Executive Dashboard" },
                { id: "people", label: "People Directory" },
                { id: "ats", label: "Hiring Pipeline" },
                { id: "payroll", label: "Payroll Run" },
                { id: "workflows", label: "Automations" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePreviewTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activePreviewTab === tab.id
                      ? "bg-white dark:bg-neutral-800 text-indigo-600 dark:text-indigo-400 font-semibold shadow-xs"
                      : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Preview Canvas */}
          <div className="p-4 sm:p-6 bg-white dark:bg-[#0c0c10] rounded-xl mt-3 min-h-[360px] text-left">
            {activePreviewTab === "dashboard" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-slate-950 dark:text-white">Organization Command Center</h3>
                    <p className="text-xs text-slate-500 dark:text-neutral-400">Live operational telemetry across 6 global hubs</p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    All Systems Operational
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-white/[0.06]">
                    <div className="text-[11px] text-slate-500 dark:text-neutral-400 uppercase font-semibold">Total Employees</div>
                    <div className="text-2xl font-bold text-slate-950 dark:text-white mt-1">128</div>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">↑ 12% this quarter</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-white/[0.06]">
                    <div className="text-[11px] text-slate-500 dark:text-neutral-400 uppercase font-semibold">Attendance Rate</div>
                    <div className="text-2xl font-bold text-slate-950 dark:text-white mt-1">98.2%</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">124 present today</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-white/[0.06]">
                    <div className="text-[11px] text-slate-500 dark:text-neutral-400 uppercase font-semibold">Open Roles</div>
                    <div className="text-2xl font-bold text-slate-950 dark:text-white mt-1">14</div>
                    <div className="text-[10px] text-indigo-600 dark:text-indigo-400 mt-0.5">38 candidates in interview</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-white/[0.06]">
                    <div className="text-[11px] text-slate-500 dark:text-neutral-400 uppercase font-semibold">Next Payroll</div>
                    <div className="text-2xl font-bold text-slate-950 dark:text-white mt-1">$412,850</div>
                    <div className="text-[10px] text-amber-600 dark:text-amber-400 mt-0.5">Dispatches in 4 days</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-neutral-900/40 border border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                      HR
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Statutory Q3 Compliance Audit Passed</div>
                      <div className="text-slate-500">Zero labor law discrepancies flagged across all US and EU legal entities.</div>
                    </div>
                  </div>
                  <Link href="/workspace" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1">
                    Open Dashboard <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {activePreviewTab === "people" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-900 dark:text-white">Active Workforce Ledger (Sample View)</span>
                  <Link href="/workspace/people" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                    View All 128 Profiles →
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-neutral-800 text-slate-500 dark:text-neutral-400 font-semibold">
                        <th className="pb-2">Employee</th>
                        <th className="pb-2">Department</th>
                        <th className="pb-2">Role</th>
                        <th className="pb-2">Status</th>
                        <th className="pb-2">Location</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-neutral-800/60">
                      {[
                        { name: "Dr. Evelyn Reed", dept: "Engineering", title: "VP of Engineering", status: "Active", loc: "San Francisco, USA" },
                        { name: "Marcus Chen", dept: "Product", title: "Principal Product Manager", status: "Active", loc: "New York, USA" },
                        { name: "Elena Rostova", dept: "Design", title: "Design System Lead", status: "On Leave", loc: "London, UK" },
                        { name: "Julian Thorne", dept: "People Ops", title: "Global People Partner", status: "Active", loc: "Singapore" }
                      ].map((emp, i) => (
                        <tr key={i} className="py-2.5">
                          <td className="py-2.5 font-medium text-slate-900 dark:text-white">{emp.name}</td>
                          <td className="py-2.5 text-slate-600 dark:text-neutral-400">{emp.dept}</td>
                          <td className="py-2.5 text-slate-600 dark:text-neutral-400">{emp.title}</td>
                          <td className="py-2.5">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              emp.status === "Active" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"
                            }`}>
                              {emp.status}
                            </span>
                          </td>
                          <td className="py-2.5 text-slate-500">{emp.loc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activePreviewTab === "ats" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-900 dark:text-white">Active ATS Kanban Pipeline</span>
                  <Link href="/workspace/recruitment" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                    Manage ATS Board →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  {[
                    { stage: "Screening (8)", candidate: "Sophia Zhang", role: "Staff Backend Engineer", score: "4.8 / 5" },
                    { stage: "Technical (4)", candidate: "Liam O'Connor", role: "Sr. DevOps Lead", score: "4.9 / 5" },
                    { stage: "Executive Offer (2)", candidate: "Clara Vance", role: "Product Marketing Dir", score: "5.0 / 5" },
                    { stage: "Hired (5)", candidate: "David Kim", role: "Frontend Architect", score: "Completed" }
                  ].map((card, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-white/[0.06]">
                      <div className="font-semibold text-slate-500 dark:text-neutral-400 text-[11px] mb-2 uppercase">{card.stage}</div>
                      <div className="font-bold text-slate-900 dark:text-white">{card.candidate}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{card.role}</div>
                      <div className="mt-2 text-[10px] font-mono text-indigo-600 dark:text-indigo-400">Scorecard: {card.score}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activePreviewTab === "payroll" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-950 dark:text-white">Automated Semi-Monthly Payroll Run</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600">
                    Zero Calculation Discrepancies
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-neutral-900/50 border border-slate-200 dark:border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <div className="text-slate-500 text-[11px]">Gross Salaries</div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">$524,000.00</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-[11px]">Statutory Taxes</div>
                    <div className="text-lg font-bold text-rose-500 mt-0.5">-$82,450.00</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-[11px]">Benefits & 401(k)</div>
                    <div className="text-lg font-bold text-amber-500 mt-0.5">-$28,700.00</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-[11px]">Net Direct Deposit</div>
                    <div className="text-lg font-bold text-emerald-500 mt-0.5">$412,850.00</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-500">NACHA Direct Deposit file ready for CFO cryptographic approval.</span>
                  <Link href="/workspace/payroll" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                    Execute Payroll Run →
                  </Link>
                </div>
              </div>
            )}

            {activePreviewTab === "workflows" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-950 dark:text-white">Active Event-Driven HR Triggers</span>
                  <Link href="/workspace/automation" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                    Configure Node Builder →
                  </Link>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-white/[0.06] flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white">When New Hire Signs Offer Letter</span>
                      <div className="text-slate-500 text-[11px] mt-0.5">
                        Trigger Google Workspace account creation → Invite to Slack #general → Assign I-9 & W-4 packet
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">Active</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-white/[0.06] flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white">When Employee Submits Parental Leave Request</span>
                      <div className="text-slate-500 text-[11px] mt-0.5">
                        Route to People Partner → Recalculate FMLA Statutory Balance → Sync Team Calendar Out-of-Office
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">Active</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* 3. SOCIAL PROOF & METRICS STRIP */}
      <section className="border-y border-slate-200 dark:border-white/[0.06] bg-white/60 dark:bg-black/40 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-neutral-500 mb-8">
            Powering mission-critical people teams from fast-growth startups to enterprise leaders
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tabular-nums">45,000+</div>
              <div className="text-xs text-slate-500 dark:text-neutral-400 mt-1">Global Employees Managed</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">99.99%</div>
              <div className="text-xs text-slate-500 dark:text-neutral-400 mt-1">Payroll Accuracy SLA</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 tabular-nums">85%</div>
              <div className="text-xs text-slate-500 dark:text-neutral-400 mt-1">Faster New Hire Onboarding</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tabular-nums">SOC-2</div>
              <div className="text-xs text-slate-500 dark:text-neutral-400 mt-1">Type II Audited & Compliant</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURE OVERVIEW SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            Complete Suite Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-slate-950 dark:text-white tracking-tight">
            Every feature engineered for frictionless people operations.
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 text-base leading-relaxed">
            Eliminate fragmented logins, brittle zapier chains, and manual spreadsheet calculations. Everything talks to everything natively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <ThreeDCard key={idx} glareColor={feat.glare} maxTilt={6} elevationZ={10}>
                <div className={`p-6 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between h-full group ${feat.border}`}>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-11 h-11 rounded-xl ${feat.bg} ${feat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-white/[0.04] text-slate-500 dark:text-neutral-400 border border-slate-200 dark:border-white/[0.06]">
                        {feat.tag}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-slate-950 dark:text-white mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/[0.04] flex items-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                    <span>Explore module</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </div>
                </div>
              </ThreeDCard>
            );
          })}
        </div>
      </section>

      {/* 5. HR WORKFLOW SECTION */}
      <section className="py-20 bg-slate-100/70 dark:bg-[#09090d] border-y border-slate-200 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                Visual Automation Engine
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white tracking-tight">
                Put your routine HR workflows on intelligent autopilot.
              </h2>
              <p className="text-slate-600 dark:text-neutral-400 text-sm leading-relaxed">
                Connect triggers across the employee lifecycle directly into automated actions. Zero scripting or external webhook tools required.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  {
                    title: "Automated New Hire Provisioning",
                    desc: "Instantly create email, identity tokens, assign onboarding checklists, and notify their designated mentor."
                  },
                  {
                    title: "Smart Leave & Coverage Rules",
                    desc: "When an engineer requests vacation, automatically check minimum department coverage before notifying the engineering manager."
                  },
                  {
                    title: "Statutory Expiry Alarms",
                    desc: "Proactively alert HR & employees 60 and 30 days before work visas, NDA certificates, or contractor agreements lapse."
                  }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mt-1">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/workspace/automation"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
                >
                  <span>Build custom workflows in the workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Visual Workflow Node Preview */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xl space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Workflow Canvas Simulation</div>
              
              {/* Node 1 */}
              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">TRIGGER</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">Event: Employee.Joined</span>
                </div>
                <div className="text-xs font-medium text-slate-900 dark:text-white mt-1">
                  Candidate stage advances to &quot;Hired&quot; in Recruitment ATS
                </div>
              </div>

              {/* Connecting line */}
              <div className="flex justify-center -my-1">
                <div className="w-0.5 h-6 bg-slate-300 dark:bg-neutral-700" />
              </div>

              {/* Node 2 */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">CONDITION RULE</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">Department == &quot;Engineering&quot;</span>
                </div>
                <div className="text-xs font-medium text-slate-900 dark:text-white mt-1">
                  Verify employment type is &quot;Full-time Salaried&quot; and state is &quot;California&quot;
                </div>
              </div>

              {/* Connecting line */}
              <div className="flex justify-center -my-1">
                <div className="w-0.5 h-6 bg-slate-300 dark:bg-neutral-700" />
              </div>

              {/* Node 3 */}
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">AUTOMATED ACTIONS (3)</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-500">Batch Executed</span>
                </div>
                <ul className="text-xs text-slate-700 dark:text-neutral-300 mt-2 space-y-1 list-disc list-inside">
                  <li>Provision Google Workspace & Slack seats</li>
                  <li>Dispatch DocuSign I-9, W-4 and California Wage Notice packet</li>
                  <li>Enroll in standard semi-monthly payroll cycle</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ANALYTICS & SECURITY SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Security Card */}
          <div className="p-8 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-md space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Enterprise Grade Security</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">
              Bank-grade privacy and statutory document compliance.
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
              PeopleCore is built with zero-compromise security primitives. Confidential employee records, compensation, and SSNs are protected with hardware-isolated cryptography.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-white/[0.04]">
                <div className="font-semibold text-slate-900 dark:text-white">AES-256 Encryption</div>
                <div className="text-slate-500 text-[11px] mt-0.5">At rest and in-flight TLS 1.3</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-white/[0.04]">
                <div className="font-semibold text-slate-900 dark:text-white">Role-Based Access</div>
                <div className="text-slate-500 text-[11px] mt-0.5">Granular field-level RBAC</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-white/[0.04]">
                <div className="font-semibold text-slate-900 dark:text-white">Immutable Audit Logs</div>
                <div className="text-slate-500 text-[11px] mt-0.5">Timestamped IP records</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-white/[0.04]">
                <div className="font-semibold text-slate-900 dark:text-white">SOC-2 Type II & GDPR</div>
                <div className="text-slate-500 text-[11px] mt-0.5">Annual third-party audit</div>
              </div>
            </div>

            <div>
              <Link href="/security" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                Explore our Security Whitepaper & Trust Center <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Analytics Card */}
          <div className="p-8 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-md space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold">
              <BarChart3 className="w-4 h-4" />
              <span>Real-Time Intelligence</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">
              Executive clarity on retention, headcount, and payroll runway.
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
              Stop waiting for monthly spreadsheets. Analyze attrition velocity, gender and compensation parity, and forecast hiring budget burn in real-time.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-700 dark:text-neutral-300 font-semibold mb-1">
                  <span>Headcount Growth vs Plan</span>
                  <span>108% of target</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-neutral-800 overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full w-[88%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-700 dark:text-neutral-300 font-semibold mb-1">
                  <span>Employee Retention Rate</span>
                  <span>96.4% (Industry top decile)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-neutral-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[96.4%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-700 dark:text-neutral-300 font-semibold mb-1">
                  <span>ATS Pipeline Velocity</span>
                  <span>14 days avg time-to-hire</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-neutral-800 overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full w-[78%]" />
                </div>
              </div>
            </div>

            <div>
              <Link href="/workspace/reports" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                View Live Reporting Module <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. INTEGRATIONS ECOSYSTEM */}
      <section className="py-20 bg-slate-100/60 dark:bg-[#09090d] border-y border-slate-200 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            Connected Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white tracking-tight mt-2 mb-4">
            Connects seamlessly with your existing tools.
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 text-sm max-w-2xl mx-auto mb-12">
            No messy migrations or broken syncs. Direct two-way native integrations with leading enterprise software.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "Slack", category: "Alerts & Approvals", status: "Live" },
              { name: "Google Workspace", category: "SAML SSO & Directory", status: "Live" },
              { name: "Microsoft 365", category: "Azure AD & Calendar", status: "Live" },
              { name: "Stripe Connect", category: "Billing & Payouts", status: "Live" },
              { name: "QuickBooks Online", category: "General Ledger Sync", status: "Live" },
              { name: "AWS S3 Vault", category: "7-Year WORM Storage", status: "Live" }
            ].map((app, i) => (
              <div key={i} className="p-4 rounded-xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs text-left">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center text-xs">
                    {app.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    {app.status}
                  </span>
                </div>
                <div className="font-semibold text-xs text-slate-900 dark:text-white">{app.name}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{app.category}</div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/integrations"
              className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <span>Explore all 40+ supported integrations & REST API specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. PRICING SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            Predictable SaaS Pricing
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-slate-950 dark:text-white tracking-tight">
            Transparent pricing that scales with your headcount.
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 text-sm">
            No surprise implementation fees. All plans include 14-day full access.
          </p>

          {/* Billing cycle toggle */}
          <div className="inline-flex items-center gap-2 p-1 rounded-xl bg-slate-200/80 dark:bg-neutral-800 text-xs font-semibold mt-4">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-1.5 rounded-lg transition cursor-pointer ${
                billingCycle === "monthly" ? "bg-white dark:bg-neutral-900 text-slate-900 dark:text-white shadow-xs" : "text-slate-500"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-4 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                billingCycle === "annual" ? "bg-white dark:bg-neutral-900 text-slate-900 dark:text-white shadow-xs" : "text-slate-500"
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-600">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingTiers.map((tier, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl bg-white dark:bg-[#121216] border transition-all flex flex-col justify-between ${
                tier.popular
                  ? "border-indigo-500 shadow-xl shadow-indigo-500/10 relative"
                  : "border-slate-200 dark:border-white/[0.08] shadow-xs"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-600 text-white uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold text-slate-950 dark:text-white">{tier.name}</h3>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1 min-h-[32px]">{tier.desc}</p>

                <div className="my-6">
                  <span className="text-4xl font-extrabold text-slate-950 dark:text-white">{tier.price}</span>
                  <span className="text-xs text-slate-500 dark:text-neutral-400 ml-1.5">/ {tier.period}</span>
                </div>

                <div className="space-y-2.5 text-xs text-slate-700 dark:text-neutral-300">
                  {tier.features.map((f, fi) => (
                    <div key={fi} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/[0.06]">
                <Link
                  href={tier.ctaHref}
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center transition cursor-pointer ${
                    tier.popular
                      ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20"
                      : "bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-900 dark:text-white"
                  }`}
                >
                  {tier.ctaText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section className="py-20 bg-slate-100/60 dark:bg-[#09090d] border-y border-slate-200 dark:border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white tracking-tight">
              Everything you need to know about PeopleCore.
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs"
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left text-sm font-semibold text-slate-950 dark:text-white cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      faqOpen === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {faqOpen === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed pt-3 mt-3 border-t border-slate-100 dark:border-white/[0.04]">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FINAL HIGH-CONVERSION CTA */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-black text-white p-8 sm:p-14 overflow-hidden border border-indigo-500/30 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" /> Modernize your workforce operations
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Ready to give your people team the tools they deserve?
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Join thousands of forward-thinking organizations using PeopleCore to streamline hiring, payroll, attendance, and team performance.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link
                href="/auth?mode=signup"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-neutral-950 font-semibold text-sm shadow-xl flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <span>Start your 14-day free trial</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-md flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Schedule a 1-on-1 demo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DEMO BOOKING MODAL */}
      <AnimatePresence>
        {isDemoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.1] rounded-2xl p-6 shadow-2xl space-y-4 text-left relative"
            >
              <button
                onClick={() => setIsDemoModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 transition"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <CalendarCheck className="w-5 h-5" />
                <h3 className="text-lg font-bold text-slate-950 dark:text-white">Book an Executive Demo</h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-neutral-400">
                Our HR technology specialists will tailor a 20-minute live tour to your company size and regulatory requirements.
              </p>

              {demoFormSubmitted ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Demo Scheduled!</h4>
                  <p className="text-xs text-slate-600 dark:text-neutral-300">
                    A calendar invitation and pre-meeting questionnaire has been sent to your work email.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleDemoSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={demoFormData.name}
                      onChange={(e) => setDemoFormData({ ...demoFormData, name: e.target.value })}
                      placeholder="Sarah Jenkins"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={demoFormData.email}
                      onChange={(e) => setDemoFormData({ ...demoFormData, email: e.target.value })}
                      placeholder="sarah@acme.com"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">Company Name *</label>
                      <input
                        type="text"
                        required
                        value={demoFormData.company}
                        onChange={(e) => setDemoFormData({ ...demoFormData, company: e.target.value })}
                        placeholder="Acme Corp"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">Team Size</label>
                      <select
                        value={demoFormData.teamSize}
                        onChange={(e) => setDemoFormData({ ...demoFormData, teamSize: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white focus:outline-none cursor-pointer"
                      >
                        <option value="1-25">1-25 employees</option>
                        <option value="25-100">25-100 employees</option>
                        <option value="100-500">100-500 employees</option>
                        <option value="500+">500+ employees</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">Primary Interest / Questions</label>
                    <textarea
                      rows={2}
                      value={demoFormData.message}
                      onChange={(e) => setDemoFormData({ ...demoFormData, message: e.target.value })}
                      placeholder="We want to migrate from BambooHR and consolidate payroll..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition cursor-pointer shadow-md shadow-indigo-600/25"
                    >
                      Confirm Demo Request
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

function LayoutDashboardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="7" height="9" x="3" y="3" rx="1"/>
      <rect width="7" height="5" x="14" y="3" rx="1"/>
      <rect width="7" height="9" x="14" y="12" rx="1"/>
      <rect width="7" height="5" x="3" y="16" rx="1"/>
    </svg>
  );
}
