"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import ThreeDCard from "@/components/motion/ThreeDCard";
import {
  TrendingUp,
  FolderKanban,
  Heart,
  ShieldAlert,
  FileCheck2,
  ArrowUpRight,
  Clock,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Plus
} from "lucide-react";

export default function WorkspaceDashboard() {
  const {
    activeOrg,
    projects,
    tasks,
    audits,
    findings,
    campaigns,
    approvals,
    activities,
    currentRole,
    currentUser,
    members,
    leaveRequests,
    jobs
  } = useWorkspace();

  const [dateRange, setDateRange] = useState("30d");

  // Key metrics
  const activeProjectsCount = projects.filter((p) => p.status === "Active" || p.status === "At Risk").length;
  const totalRaised = campaigns.reduce((acc, c) => acc + c.raised, 0);
  const openFindings = findings.filter((f) => f.status === "Open" || f.status === "In Progress");
  const pendingApprovalsCount = approvals.filter((a) => a.status === "Pending").length;
  const overdueTasks = tasks.filter((t) => t.status !== "Done");

  // PeopleCore HR specific calculations
  const totalEmployees = members.length;
  const newHiresCount = 3;
  const employeesOnLeave = leaveRequests.filter((l) => l.status === "Approved").length;
  const attendanceRate = "96.4%";
  const openPositionsCount = jobs.filter((j) => j.status === "Open").reduce((acc, j) => acc + j.openings, 0);

  return (
    <div className="space-y-8 font-sans">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-xs font-sans text-slate-600 dark:text-neutral-400 mb-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse shrink-0" />
            <span>PeopleCore Enterprise Workforce OS</span>
            <span className="text-slate-300 dark:text-neutral-600">•</span>
            <span>Viewing as {currentRole}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-semibold text-slate-950 dark:text-[#f5f5f3] tracking-tight leading-tight">
            Good morning, {currentUser.name.split(" ")[0]}
          </h1>
          <p className="text-sm text-slate-500 dark:text-neutral-400 mt-1">
            Here&apos;s what&apos;s happening across your organization today.
          </p>
        </div>

        {/* Date Filter Pills */}
        <div className="flex items-center bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-xl p-1 text-xs font-sans font-medium relative">
          {[
            { label: "7 Days", val: "7d" },
            { label: "30 Days", val: "30d" },
            { label: "90 Days", val: "90d" },
            { label: "Year", val: "year" },
          ].map((item) => {
            const isActive = dateRange === item.val;
            return (
              <motion.button
                key={item.val}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDateRange(item.val)}
                className={`relative px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  isActive
                    ? "text-slate-950 dark:text-neutral-950 font-semibold"
                    : "text-slate-600 hover:text-slate-950 dark:text-neutral-400 dark:hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeWorkspaceDateRange"
                    className="absolute inset-0 bg-white dark:bg-white rounded-lg shadow-xs"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 6 TOP PEOPLECORE KPI CARDS WITH TREND VISUALIZATIONS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Employees */}
        <ThreeDCard glareColor="#6366f1" maxTilt={6} elevationZ={12} className="h-full">
          <div className="rounded-2xl p-4 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs flex flex-col justify-between h-full group hover:border-indigo-500/40 transition-colors">
            <div className="flex items-center justify-between text-slate-500 dark:text-neutral-400 text-[11px] font-medium mb-1">
              <span>Total Employees</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">+12%</span>
            </div>
            <div className="text-2xl lg:text-3xl font-normal sm:font-medium tracking-tight text-slate-950 dark:text-white tabular-nums my-1">
              {totalEmployees}
            </div>
            <div className="text-[10px] text-slate-400 dark:text-neutral-500 flex items-center gap-1">
              <span>vs. 52 last quarter</span>
            </div>
          </div>
        </ThreeDCard>

        {/* New Hires */}
        <ThreeDCard glareColor="#10b981" maxTilt={6} elevationZ={12} className="h-full">
          <div className="rounded-2xl p-4 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs flex flex-col justify-between h-full group hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center justify-between text-slate-500 dark:text-neutral-400 text-[11px] font-medium mb-1">
              <span>New Hires</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">+2 this mo</span>
            </div>
            <div className="text-2xl lg:text-3xl font-normal sm:font-medium tracking-tight text-slate-950 dark:text-white tabular-nums my-1">
              {newHiresCount}
            </div>
            <div className="text-[10px] text-slate-400 dark:text-neutral-500 flex items-center gap-1">
              <span>100% onboarding pace</span>
            </div>
          </div>
        </ThreeDCard>

        {/* Employees on Leave */}
        <ThreeDCard glareColor="#f59e0b" maxTilt={6} elevationZ={12} className="h-full">
          <div className="rounded-2xl p-4 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs flex flex-col justify-between h-full group hover:border-amber-500/40 transition-colors">
            <div className="flex items-center justify-between text-slate-500 dark:text-neutral-400 text-[11px] font-medium mb-1">
              <span>On Leave Today</span>
              <span className="text-[10px] text-slate-500 dark:text-neutral-400 font-medium">Scheduled</span>
            </div>
            <div className="text-2xl lg:text-3xl font-normal sm:font-medium tracking-tight text-slate-950 dark:text-white tabular-nums my-1">
              {employeesOnLeave}
            </div>
            <div className="text-[10px] text-slate-400 dark:text-neutral-500 flex items-center gap-1">
              <span>2 return next Monday</span>
            </div>
          </div>
        </ThreeDCard>

        {/* Attendance Rate */}
        <ThreeDCard glareColor="#3b82f6" maxTilt={6} elevationZ={12} className="h-full">
          <div className="rounded-2xl p-4 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs flex flex-col justify-between h-full group hover:border-blue-500/40 transition-colors">
            <div className="flex items-center justify-between text-slate-500 dark:text-neutral-400 text-[11px] font-medium mb-1">
              <span>Attendance Rate</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">+0.8%</span>
            </div>
            <div className="text-2xl lg:text-3xl font-normal sm:font-medium tracking-tight text-slate-950 dark:text-white tabular-nums my-1">
              {attendanceRate}
            </div>
            <div className="text-[10px] text-slate-400 dark:text-neutral-500 flex items-center gap-1">
              <span>Target: 95.0%</span>
            </div>
          </div>
        </ThreeDCard>

        {/* Open Positions */}
        <ThreeDCard glareColor="#8b5cf6" maxTilt={6} elevationZ={12} className="h-full">
          <div className="rounded-2xl p-4 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs flex flex-col justify-between h-full group hover:border-purple-500/40 transition-colors">
            <div className="flex items-center justify-between text-slate-500 dark:text-neutral-400 text-[11px] font-medium mb-1">
              <span>Open Positions</span>
              <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">Active</span>
            </div>
            <div className="text-2xl lg:text-3xl font-normal sm:font-medium tracking-tight text-slate-950 dark:text-white tabular-nums my-1">
              {openPositionsCount}
            </div>
            <div className="text-[10px] text-slate-400 dark:text-neutral-500 flex items-center gap-1">
              <span>119 active applicants</span>
            </div>
          </div>
        </ThreeDCard>

        {/* Pending Approvals */}
        <ThreeDCard glareColor="#ef4444" maxTilt={6} elevationZ={12} className="h-full">
          <div className="rounded-2xl p-4 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs flex flex-col justify-between h-full group hover:border-red-500/40 transition-colors">
            <div className="flex items-center justify-between text-slate-500 dark:text-neutral-400 text-[11px] font-medium mb-1">
              <span>Pending Actions</span>
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">Action needed</span>
            </div>
            <div className="text-2xl lg:text-3xl font-normal sm:font-medium tracking-tight text-slate-950 dark:text-white tabular-nums my-1">
              {pendingApprovalsCount}
            </div>
            <div className="text-[10px] text-slate-400 dark:text-neutral-500 flex items-center gap-1">
              <span>Leave & Expenses</span>
            </div>
          </div>
        </ThreeDCard>
      </div>

      {/* HR WORKFORCE & ATTENDANCE CHARTS ROW */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Workforce Headcount Growth Chart */}
        <div className="lg:col-span-8 rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm dark:shadow-xl transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-[10px] font-sans uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold mb-0.5">Headcount Analytics</div>
              <h3 className="font-sans text-lg font-semibold text-slate-950 dark:text-white tracking-tight leading-snug">Workforce Trajectory</h3>
              <p className="text-xs text-slate-500 dark:text-neutral-400 font-sans mt-0.5">Active full-time & contractor personnel over time</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-sans">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <span className="text-slate-600 dark:text-neutral-300">Total Personnel (64)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-slate-600 dark:text-neutral-300">Net Additions (+8)</span>
              </div>
            </div>
          </div>

          {/* SVG Headcount Chart */}
          <div className="h-60 w-full relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
              <line x1="0" y1="40" x2="600" y2="40" stroke="currentColor" className="text-slate-200/80 dark:text-white/[0.06]" strokeDasharray="3 3" />
              <line x1="0" y1="90" x2="600" y2="90" stroke="currentColor" className="text-slate-200/80 dark:text-white/[0.06]" strokeDasharray="3 3" />
              <line x1="0" y1="140" x2="600" y2="140" stroke="currentColor" className="text-slate-200/80 dark:text-white/[0.06]" strokeDasharray="3 3" />
              <line x1="0" y1="190" x2="600" y2="190" stroke="currentColor" className="text-slate-200/90 dark:text-white/[0.08]" />

              <defs>
                <linearGradient id="headcountGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.30" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 170 Q 75 160 150 145 T 300 110 T 450 75 T 600 45 L 600 190 L 0 190 Z"
                fill="url(#headcountGrad)"
              />
              <path
                d="M 0 170 Q 75 160 150 145 T 300 110 T 450 75 T 600 45"
                fill="none"
                stroke="#6366f1"
                strokeWidth="3"
              />
              <circle cx="600" cy="45" r="4" fill="#6366f1" />
            </svg>

            {/* X-Axis Months */}
            <div className="flex justify-between text-[11px] font-sans font-medium text-slate-400 dark:text-neutral-500 mt-3 pt-2">
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span className="font-semibold text-slate-900 dark:text-white">Sep (Current: 64)</span>
            </div>
          </div>
        </div>

        {/* Today's Attendance Overview */}
        <div className="lg:col-span-4 rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm dark:shadow-xl flex flex-col justify-between transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-sans uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">Today&apos;s Presence</span>
                <h3 className="font-sans text-lg font-semibold text-slate-950 dark:text-white tracking-tight mt-0.5">Attendance Breakdown</h3>
              </div>
              <Link href="/workspace/attendance" className="text-xs font-sans font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                Real-time &rarr;
              </Link>
            </div>

            <div className="space-y-3 font-sans">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                <span className="text-emerald-800 dark:text-emerald-300 font-medium">Present (In Office)</span>
                <span className="font-bold text-emerald-950 dark:text-emerald-200">38 employees (59%)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs">
                <span className="text-blue-800 dark:text-blue-300 font-medium">Remote Work</span>
                <span className="font-bold text-blue-950 dark:text-blue-200">22 employees (34%)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
                <span className="text-amber-800 dark:text-amber-300 font-medium">Late Check-in</span>
                <span className="font-bold text-amber-950 dark:text-amber-200">2 employees (3%)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs">
                <span className="text-red-800 dark:text-red-300 font-medium">On Approved Leave</span>
                <span className="font-bold text-red-950 dark:text-red-200">2 employees (3%)</span>
              </div>
            </div>
          </div>

          <Link
            href="/workspace/attendance"
            className="mt-4 w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-xs font-sans font-medium text-slate-700 dark:text-neutral-300 flex items-center justify-center gap-1 transition-colors"
          >
            <span>View Full Timesheet Grid</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* HIRING PIPELINE & UPCOMING EVENTS ROW */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Recruitment Pipeline Funnel */}
        <div className="lg:col-span-8 rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm dark:shadow-xl transition-colors">
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="text-[10px] font-sans uppercase tracking-wider text-purple-600 dark:text-purple-400 font-semibold">Talent Acquisition</span>
              <h3 className="font-sans text-lg font-semibold text-slate-950 dark:text-white tracking-tight mt-0.5">Applicant Pipeline Stages</h3>
            </div>
            <Link href="/workspace/recruitment" className="text-xs font-sans font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
              Open ATS Kanban &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-sans">
            {[
              { stage: "Applied", count: 68, color: "border-slate-300 dark:border-white/10", badge: "New" },
              { stage: "Screening", count: 24, color: "border-blue-400/40", badge: "Active" },
              { stage: "Interview", count: 16, color: "border-indigo-400/40", badge: "This Week" },
              { stage: "Offer", count: 3, color: "border-amber-400/40", badge: "Sent" },
              { stage: "Hired", count: 8, color: "border-emerald-400/40", badge: "Q3 Total" },
            ].map((col) => (
              <div key={col.stage} className={`p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border ${col.color} text-center`}>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-400">{col.stage}</div>
                <div className="text-2xl font-bold text-slate-950 dark:text-white tabular-nums my-1">{col.count}</div>
                <span className="inline-block text-[9px] font-medium px-2 py-0.5 rounded-full bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-neutral-300">
                  {col.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events: Birthdays & Anniversaries */}
        <div className="lg:col-span-4 rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm dark:shadow-xl transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-sans uppercase tracking-wider text-pink-600 dark:text-pink-400 font-semibold">Culture & Team</span>
              <h3 className="font-sans text-lg font-semibold text-slate-950 dark:text-white tracking-tight mt-0.5">Upcoming Milestones</h3>
            </div>
            <Calendar className="w-4 h-4 text-slate-400" />
          </div>

          <div className="space-y-3 font-sans text-xs">
            <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center gap-3">
              <span className="text-lg">🎂</span>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-slate-900 dark:text-white truncate">Elena Rostova&apos;s Birthday</div>
                <div className="text-[11px] text-pink-700 dark:text-pink-300 font-medium">Tomorrow • Oct 1</div>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-3">
              <span className="text-lg">🎉</span>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-slate-900 dark:text-white truncate">Marcus Thorne • 3 Year Anniversary</div>
                <div className="text-[11px] text-indigo-700 dark:text-indigo-300 font-medium">Thursday • Oct 3</div>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
              <span className="text-lg">🚀</span>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-slate-900 dark:text-white truncate">Q4 Global All-Hands Meeting</div>
                <div className="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium">Oct 6 • 10:00 AM UTC</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MID ROW: REVENUE TREND CHART & PROJECT PROGRESS */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Revenue & Budget Burn Trend Chart (Pure Responsive SVG) */}
        <div className="lg:col-span-8 rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm dark:shadow-xl transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-sans text-lg font-semibold text-slate-950 dark:text-white tracking-tight leading-snug">Donations & Operating Burn Velocity</h3>
              <p className="text-xs text-slate-500 dark:text-neutral-400 font-sans mt-1">Jan 2026 – Sep 2026 Monthly Cash Flow</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-sans">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <span className="text-slate-600 dark:text-neutral-300">Donations Received</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-slate-600 dark:text-neutral-300">Field Spend</span>
              </div>
            </div>
          </div>

          {/* SVG Chart */}
          <div className="h-64 w-full relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="40" x2="600" y2="40" stroke="currentColor" className="text-slate-200/80 dark:text-white/[0.06]" strokeDasharray="3 3" />
              <line x1="0" y1="90" x2="600" y2="90" stroke="currentColor" className="text-slate-200/80 dark:text-white/[0.06]" strokeDasharray="3 3" />
              <line x1="0" y1="140" x2="600" y2="140" stroke="currentColor" className="text-slate-200/80 dark:text-white/[0.06]" strokeDasharray="3 3" />
              <line x1="0" y1="190" x2="600" y2="190" stroke="currentColor" className="text-slate-200/90 dark:text-white/[0.08]" />

              {/* Area 1: Donations */}
              <defs>
                <linearGradient id="donationsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 160 Q 75 140 150 110 T 300 70 T 450 50 T 600 30 L 600 190 L 0 190 Z"
                fill="url(#donationsGrad)"
              />
              <path
                d="M 0 160 Q 75 140 150 110 T 300 70 T 450 50 T 600 30"
                fill="none"
                stroke="#6366f1"
                strokeWidth="3"
              />

              {/* Line 2: Field Spend */}
              <path
                d="M 0 175 Q 75 160 150 140 T 300 115 T 450 85 T 600 65"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeDasharray="4 2"
              />
            </svg>

            {/* X-Axis Months */}
            <div className="flex justify-between text-[11px] font-sans font-medium text-slate-400 dark:text-neutral-500 mt-3 pt-2">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span className="font-medium text-slate-600 dark:text-neutral-300">Sep</span>
            </div>
          </div>
        </div>

        {/* Active Projects Progress Summary */}
        <div className="lg:col-span-4 rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm dark:shadow-xl flex flex-col justify-between transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-sans text-lg font-semibold text-slate-950 dark:text-white tracking-tight">Initiatives Progress</h3>
              <Link href="/workspace/projects" className="text-xs font-sans font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                View All &rarr;
              </Link>
            </div>

            <div className="space-y-4">
              {projects.slice(0, 3).map((proj) => (
                <motion.div
                  key={proj.id}
                  whileHover={{ scale: 1.015, x: 2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.04] transition-all"
                >
                  <div className="flex items-center justify-between text-xs mb-2 gap-2">
                    <span className="font-medium text-slate-900 dark:text-white truncate min-w-0 flex-1">{proj.name}</span>
                    <span className="font-sans text-emerald-600 dark:text-emerald-400 font-semibold shrink-0">{proj.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-neutral-800 rounded-full overflow-hidden mb-2.5">
                    <motion.div
                      className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${proj.progress}%` }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-sans text-slate-500 dark:text-neutral-500 gap-2 whitespace-nowrap">
                    <span className="truncate">Lead:{" "}{proj.lead.name.split(" ")[0]}</span>
                    <span className="shrink-0">Target:{" "}{proj.targetDate.split(",")[0]}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-4">
            <Link
              href="/workspace/projects"
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-slate-200 dark:border-transparent text-xs font-sans font-medium text-slate-700 dark:text-neutral-300 flex items-center justify-center gap-1 transition-colors"
            >
              <span>Open Project Kanban Board</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* BOTTOM ROW: AUDIT FINDINGS, PENDING TASKS & RECENT ACTIVITY */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Open Audit Findings (Standout Module Highlight) */}
        <div className="lg:col-span-4 rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm dark:shadow-xl transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-sans uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold">Compliance & Risk</span>
              <h3 className="font-sans text-lg font-semibold text-slate-950 dark:text-white tracking-tight mt-0.5">High-Risk Findings</h3>
            </div>
            <Link href="/workspace/audits" className="text-xs font-sans font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
              Risk Matrix &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {openFindings.slice(0, 3).map((f) => (
              <motion.div
                key={f.id}
                whileHover={{ scale: 1.015, x: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.04] space-y-2 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs gap-2">
                  <span className="font-medium text-slate-900 dark:text-white truncate min-w-0 flex-1" title={f.title}>{f.title}</span>
                  <span className={`text-[10px] font-sans px-2 py-0.5 rounded font-semibold shrink-0 ${
                    f.severity === "Critical" ? "bg-red-500/15 text-red-700 dark:text-red-400 border border-red-500/20" : "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/20"
                  }`}>
                    {f.severity}
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 dark:text-neutral-400 line-clamp-1 leading-relaxed">{f.correctiveAction}</div>
                <div className="flex items-center gap-1.5 text-[11px] font-sans text-slate-500 dark:text-neutral-400 pt-0.5 whitespace-nowrap">
                  <span className="shrink-0 font-medium">Due {f.dueDate}</span>
                  <span className="text-slate-300 dark:text-neutral-600">•</span>
                  <span className="truncate">Owner: {f.owner.split(" ")[0]}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tasks Requiring Attention */}
        <div className="lg:col-span-4 rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm dark:shadow-xl transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-sans uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">Team Execution</span>
              <h3 className="font-sans text-lg font-semibold text-slate-950 dark:text-white tracking-tight mt-0.5">Tasks In Motion</h3>
            </div>
            <Link href="/workspace/projects" className="text-xs font-sans font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
              Kanban &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {overdueTasks.slice(0, 3).map((task) => (
              <motion.div
                key={task.id}
                whileHover={{ scale: 1.015, x: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-between gap-3 transition-all cursor-pointer"
              >
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium text-slate-900 dark:text-white truncate" title={task.title}>{task.title}</div>
                  <div className="flex items-center gap-1.5 text-[11px] font-sans text-slate-500 dark:text-neutral-400 mt-1 whitespace-nowrap">
                    <span className="shrink-0 font-medium">Due {task.dueDate}</span>
                    <span className="text-slate-300 dark:text-neutral-600">•</span>
                    <span className="truncate">{task.assignee.name.split(" ")[0]}</span>
                  </div>
                </div>
                <span className="shrink-0 text-[10px] font-sans font-medium px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                  {task.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Real-time Organization Activity Feed */}
        <div className="lg:col-span-4 rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm dark:shadow-xl transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-sans uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">Telemetry</span>
              <h3 className="font-sans text-lg font-semibold text-slate-950 dark:text-white tracking-tight mt-0.5">Live Activity</h3>
            </div>
            <Link href="/workspace/activity" className="text-xs font-sans font-medium text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white">
              Full Log &rarr;
            </Link>
          </div>

          <div className="space-y-3 font-sans text-xs">
            {activities.slice(0, 4).map((act) => (
              <motion.div
                key={act.id}
                whileHover={{ scale: 1.015, x: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="flex items-start gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.04] last:border-0 last:pb-0 rounded-lg p-1 transition-all"
              >
                <img src={act.actorAvatar} alt={act.actor} className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5 border border-slate-200 dark:border-white/10" />
                <div className="overflow-hidden min-w-0 flex-1">
                  <div className="flex items-baseline flex-wrap gap-x-1.5 text-xs">
                    <span className="text-slate-900 dark:text-white font-medium">{act.actor.split(" ")[0]}</span>
                    <span className="text-slate-500 dark:text-neutral-400 font-normal">{act.action}</span>
                  </div>
                  <div className="text-[11px] text-slate-700 dark:text-neutral-300 font-normal truncate mt-0.5">{act.target}</div>
                  <div className="text-[10px] text-slate-400 dark:text-neutral-500 mt-1 font-normal">{act.timestamp}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
