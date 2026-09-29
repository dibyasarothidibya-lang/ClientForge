"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import { AutomationWorkflow } from "@/lib/peopleCoreData";
import ThreeDCard from "@/components/motion/ThreeDCard";
import {
  Bot,
  Zap,
  Play,
  Pause,
  Plus,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  GitBranch,
  Layers,
  Settings2
} from "lucide-react";

export default function AutomationWorkflowsPage() {
  const { workflows, toggleWorkflowStatus } = useWorkspace();
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredWorkflows = workflows.filter(
    (w) => categoryFilter === "All" || w.category === categoryFilter
  );

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
            Event-Driven HR Engine
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-white tracking-tight">
            Workflow Automation Builder
          </h1>
          <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
            Trigger automated multi-system actions on employee events (Onboarding, Leave Approvals, Contract Expiry, and Overtime Alerts).
          </p>
        </div>

        <button
          onClick={() => alert("Visual workflow canvas builder initialized.")}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-semibold flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Workflow</span>
        </button>
      </div>

      {/* 4 Automation KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <ThreeDCard glareColor="#6366f1" maxTilt={6} elevationZ={10} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Active Workflows</span>
              <span className="text-[10px] text-indigo-600 font-semibold">Running</span>
            </div>
            <div className="text-2xl font-bold text-slate-950 dark:text-white tabular-nums">
              {workflows.filter((w) => w.status === "Active").length}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Listening to webhooks</div>
          </div>
        </ThreeDCard>

        <ThreeDCard glareColor="#10b981" maxTilt={6} elevationZ={10} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Executions (30d)</span>
              <span className="text-[10px] text-emerald-600 font-semibold">+18% MoM</span>
            </div>
            <div className="text-2xl font-bold text-slate-950 dark:text-white tabular-nums">
              {workflows.reduce((acc, w) => acc + w.runCount, 0)}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">99.98% reliability rate</div>
          </div>
        </ThreeDCard>

        <ThreeDCard glareColor="#3b82f6" maxTilt={6} elevationZ={10} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Hours Saved / Mo</span>
              <span className="text-[10px] text-blue-600 font-semibold">Efficiency</span>
            </div>
            <div className="text-2xl font-bold text-slate-950 dark:text-white tabular-nums">
              142 hrs
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Eliminated manual entry</div>
          </div>
        </ThreeDCard>

        <ThreeDCard glareColor="#8b5cf6" maxTilt={6} elevationZ={10} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Third-Party Endpoints</span>
              <span className="text-[10px] text-purple-600 font-semibold">Integrated</span>
            </div>
            <div className="text-2xl font-bold text-slate-950 dark:text-white tabular-nums">
              7 APIs
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Slack, GSuite, Checkr, AWS</div>
          </div>
        </ThreeDCard>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {["All", "Onboarding", "Leave & Time Off", "Contracts & Legal", "Payroll"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-colors cursor-pointer whitespace-nowrap ${
              categoryFilter === cat
                ? "bg-slate-900 dark:bg-white text-white dark:text-neutral-950 font-semibold shadow-xs"
                : "bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-neutral-400 hover:text-slate-900"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* VISUAL WORKFLOW CARDS GRID WITH TRIGGER -> CONDITION -> ACTION NODES */}
      <div className="space-y-4">
        {filteredWorkflows.map((wf) => (
          <div
            key={wf.id}
            className="rounded-3xl p-6 sm:p-7 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-slate-950 dark:text-white">{wf.title}</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300">
                    {wf.category}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1 leading-relaxed">
                  {wf.description}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => toggleWorkflowStatus(wf.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    wf.status === "Active"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                      : "bg-slate-100 dark:bg-white/[0.04] text-slate-400"
                  }`}
                >
                  {wf.status === "Active" ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3" />}
                  <span>{wf.status}</span>
                </button>
              </div>
            </div>

            {/* VISUAL WORKFLOW NODES */}
            <div className="grid md:grid-cols-3 gap-3 text-xs font-sans">
              {/* TRIGGER NODE */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] relative">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
                  1. Trigger
                </span>
                <div className="font-medium text-slate-900 dark:text-white leading-snug">{wf.trigger}</div>
              </div>

              {/* CONDITION NODE */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] relative">
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
                  2. Condition Rule
                </span>
                <div className="font-medium text-slate-900 dark:text-white leading-snug">{wf.condition}</div>
              </div>

              {/* ACTION NODE */}
              <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 relative">
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-700 dark:text-indigo-300 block mb-1">
                  3. Automated Action
                </span>
                <div className="font-medium text-slate-900 dark:text-white leading-snug">{wf.action}</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>Executed {wf.runCount} times</span>
              <span>Last run: {wf.lastExecuted}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
