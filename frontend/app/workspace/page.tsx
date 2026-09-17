"use client";

import { useState } from "react";
import Link from "next/link";
import { useWorkspace } from "@/context/WorkspaceContext";
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
    currentRole
  } = useWorkspace();

  const [dateRange, setDateRange] = useState("30d");

  // Key metrics
  const activeProjectsCount = projects.filter((p) => p.status === "Active" || p.status === "At Risk").length;
  const totalRaised = campaigns.reduce((acc, c) => acc + c.raised, 0);
  const openFindings = findings.filter((f) => f.status === "Open" || f.status === "In Progress");
  const criticalFindingsCount = openFindings.filter((f) => f.severity === "Critical").length;
  const pendingApprovalsCount = approvals.filter((a) => a.status === "Pending").length;

  const overdueTasks = tasks.filter((t) => t.status !== "Done");

  return (
    <div className="space-y-8">
      {/* Top Welcome & Date Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-neutral-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Operational Command Center • Viewing as {currentRole}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#f5f5f3] tracking-tight font-normal">
            {activeOrg.name} Overview
          </h1>
        </div>

        {/* Date Filter Pills */}
        <div className="flex items-center bg-white/[0.04] border border-white/[0.08] rounded-xl p-1 text-xs font-mono">
          {[
            { label: "7 Days", val: "7d" },
            { label: "30 Days", val: "30d" },
            { label: "90 Days", val: "90d" },
            { label: "Year", val: "year" },
          ].map((item) => (
            <button
              key={item.val}
              onClick={() => setDateRange(item.val)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                dateRange === item.val
                  ? "bg-white text-neutral-950 font-semibold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4 PRIMARY KPI CARDS WITH TREND CONTEXT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Active Projects */}
        <div className="rounded-2xl p-5 bg-[#0e0e12] border border-white/[0.08] shadow-lg">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono mb-2">
            <span>Active Initiatives</span>
            <FolderKanban className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="metric gradient-text">{activeProjectsCount}</div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mt-2">
            <span className="text-emerald-400 font-medium">+2 this month</span>
            <span>• 1 at risk</span>
          </div>
        </div>

        {/* Funds & Donations */}
        <div className="rounded-2xl p-5 bg-[#0e0e12] border border-white/[0.08] shadow-lg">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono mb-2">
            <span>Total Funds Raised</span>
            <Heart className="w-4 h-4 text-red-400" />
          </div>
          <div className="metric text-[#f5f5f3]">${(totalRaised / 1000).toFixed(1)}k</div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mt-2">
            <span className="text-emerald-400 font-medium">+18.4% MoM</span>
            <span>• 3 campaigns</span>
          </div>
        </div>

        {/* Open Audit Findings (Standout Metric) */}
        <div className="rounded-2xl p-5 bg-[#0e0e12] border border-white/[0.08] shadow-lg">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono mb-2">
            <span>Audit Findings</span>
            <ShieldAlert className="w-4 h-4 text-amber-400" />
          </div>
          <div className="metric gradient-text">{openFindings.length}</div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mt-2">
            <span className="text-red-400 font-medium">{criticalFindingsCount} Critical</span>
            <span>• 2 resolved this week</span>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="rounded-2xl p-5 bg-[#0e0e12] border border-white/[0.08] shadow-lg">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-mono mb-2">
            <span>Pending Approvals</span>
            <FileCheck2 className="w-4 h-4 text-teal-400" />
          </div>
          <div className="metric text-[#f5f5f3]">{pendingApprovalsCount}</div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mt-2">
            <span className="text-amber-400 font-medium">Review required</span>
            <span>• Avg 6h turnaround</span>
          </div>
        </div>
      </div>

      {/* MID ROW: REVENUE TREND CHART & PROJECT PROGRESS */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Revenue & Budget Burn Trend Chart (Pure Responsive SVG) */}
        <div className="lg:col-span-8 rounded-3xl p-6 sm:p-8 bg-[#0e0e12] border border-white/[0.08] shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-serif text-xl text-white font-normal">Donations & Operating Burn Velocity</h3>
              <p className="text-xs text-neutral-400 font-mono mt-0.5">Jan 2026 – Sep 2026 Monthly Cash Flow</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <span className="text-neutral-300">Donations Received</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-neutral-300">Field Spend</span>
              </div>
            </div>
          </div>

          {/* SVG Chart */}
          <div className="h-64 w-full relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="40" x2="600" y2="40" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
              <line x1="0" y1="90" x2="600" y2="90" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
              <line x1="0" y1="140" x2="600" y2="140" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
              <line x1="0" y1="190" x2="600" y2="190" stroke="rgba(255,255,255,0.08)" />

              {/* Area 1: Donations */}
              <defs>
                <linearGradient id="donationsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
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
                stroke="#818cf8"
                strokeWidth="3"
              />

              {/* Line 2: Field Spend */}
              <path
                d="M 0 175 Q 75 160 150 140 T 300 115 T 450 85 T 600 65"
                fill="none"
                stroke="#34d399"
                strokeWidth="2.5"
                strokeDasharray="4 2"
              />
            </svg>

            {/* X-Axis Months */}
            <div className="flex justify-between text-[11px] font-mono text-neutral-500 mt-3 pt-2">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep (Current)</span>
            </div>
          </div>
        </div>

        {/* Active Projects Progress Summary */}
        <div className="lg:col-span-4 rounded-3xl p-6 sm:p-8 bg-[#0e0e12] border border-white/[0.08] shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl text-white font-normal">Initiatives Progress</h3>
              <Link href="/workspace/projects" className="text-xs font-mono text-indigo-400 hover:underline">
                View All &rarr;
              </Link>
            </div>

            <div className="space-y-4">
              {projects.slice(0, 3).map((proj) => (
                <div key={proj.id} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium text-white truncate">{proj.name}</span>
                    <span className="font-mono text-emerald-400">{proj.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full"
                      style={{ width: `${proj.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
                    <span>Lead: {proj.lead.name.split(" ")[0]}</span>
                    <span>Target: {proj.targetDate.split(",")[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/workspace/projects"
            className="w-full mt-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-neutral-300 flex items-center justify-center gap-1 transition-colors"
          >
            <span>Open Project Kanban Board</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* BOTTOM ROW: AUDIT FINDINGS, PENDING TASKS & RECENT ACTIVITY */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Open Audit Findings (Standout Module Highlight) */}
        <div className="lg:col-span-4 rounded-3xl p-6 sm:p-8 bg-[#0e0e12] border border-white/[0.08] shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">Compliance & Risk</span>
              <h3 className="font-serif text-xl text-white font-normal mt-0.5">High-Risk Findings</h3>
            </div>
            <Link href="/workspace/audits" className="text-xs font-mono text-indigo-400 hover:underline">
              Risk Matrix &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {openFindings.slice(0, 3).map((f) => (
              <div key={f.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-white truncate">{f.title}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    f.severity === "Critical" ? "bg-red-500/20 text-red-400" : "bg-amber-500/20 text-amber-300"
                  }`}>
                    {f.severity}
                  </span>
                </div>
                <div className="text-[11px] text-neutral-400 line-clamp-1">{f.correctiveAction}</div>
                <div className="text-[10px] font-mono text-neutral-500 mt-2">Due: {f.dueDate} • Owner: {f.owner.split(" ")[0]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks Requiring Attention */}
        <div className="lg:col-span-4 rounded-3xl p-6 sm:p-8 bg-[#0e0e12] border border-white/[0.08] shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400">Team Execution</span>
              <h3 className="font-serif text-xl text-white font-normal mt-0.5">Tasks In Motion</h3>
            </div>
            <Link href="/workspace/projects" className="text-xs font-mono text-indigo-400 hover:underline">
              Kanban &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {overdueTasks.slice(0, 3).map((task) => (
              <div key={task.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-white truncate max-w-[200px]">{task.title}</div>
                  <div className="text-[10px] font-mono text-neutral-500 mt-1">Due {task.dueDate} • {task.assignee.name.split(" ")[0]}</div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Organization Activity Feed */}
        <div className="lg:col-span-4 rounded-3xl p-6 sm:p-8 bg-[#0e0e12] border border-white/[0.08] shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">Telemetry</span>
              <h3 className="font-serif text-xl text-white font-normal mt-0.5">Live Activity</h3>
            </div>
            <Link href="/workspace/activity" className="text-xs font-mono text-neutral-400 hover:text-white">
              Full Log &rarr;
            </Link>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {activities.slice(0, 4).map((act) => (
              <div key={act.id} className="flex items-start gap-2.5 pb-2 border-b border-white/[0.04] last:border-0">
                <img src={act.actorAvatar} alt={act.actor} className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5" />
                <div className="overflow-hidden">
                  <span className="text-white font-medium">{act.actor.split(" ")[0]} </span>
                  <span className="text-neutral-400">{act.action} </span>
                  <div className="text-[11px] text-neutral-300 truncate">{act.target}</div>
                  <div className="text-[9px] text-neutral-500">{act.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
