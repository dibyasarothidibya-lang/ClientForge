"use client";

import React, { useState } from "react";
import { useWorkspace } from "@/context/WorkspaceContext";
import {
  Bot,
  Zap,
  Play,
  Pause,
  Plus,
  ArrowRight,
  Check,
  Clock,
  GitBranch,
  Layers,
  Settings2,
  Workflow
} from "lucide-react";

export default function AutomationWorkflowsPage() {
  const { workflows, toggleWorkflowStatus } = useWorkspace();
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredWorkflows = workflows.filter(
    (w) => categoryFilter === "All" || w.category === categoryFilter
  );

  const activeWorkflowsCount = workflows.filter((w) => w.status === "Active").length;
  const totalRuns = workflows.reduce((acc, w) => acc + w.runCount, 0);

  return (
    <div className="space-y-5 font-sans antialiased text-slate-900 dark:text-neutral-100">
      
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-white/[0.07]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-neutral-400 border border-slate-200/80 dark:border-white/[0.06]">
              Event-Driven HR Engine
            </span>
            <span className="text-xs text-slate-400 dark:text-neutral-500 font-mono">
              Deterministic Logic Pipelines
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Workflow Automation Engine
          </h1>
          <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
            Automate multi-system actions on HR events (Onboarding, Leave Approvals, Visa Expiry, and Overtime Audits).
          </p>
        </div>

        <button
          onClick={() => alert("Visual workflow canvas builder initialized.")}
          className="h-8 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-medium inline-flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Workflow Pipeline</span>
        </button>
      </div>

      {/* 2. Engine Telemetry Ribbon */}
      <div className="bg-white dark:bg-[#111215] border border-slate-200/90 dark:border-white/[0.07] rounded-xl overflow-hidden shadow-2xs">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-slate-100 dark:divide-white/[0.05] md:divide-x md:divide-slate-200/80 md:dark:divide-white/[0.07]">
          
          <div className="p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              Active Engines
            </div>
            <div className="text-2xl font-medium text-slate-950 dark:text-white tabular-nums mt-1">
              {activeWorkflowsCount}
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              Listening to system webhooks
            </div>
          </div>

          <div className="p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              30-Day Executions
            </div>
            <div className="text-2xl font-medium text-slate-950 dark:text-white tabular-nums mt-1">
              {totalRuns}
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              99.98% execution reliability
            </div>
          </div>

          <div className="p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              Analyst Labor Reclaimed
            </div>
            <div className="text-2xl font-medium text-slate-950 dark:text-white tabular-nums mt-1">
              142 hrs
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              Eliminated manual data entry
            </div>
          </div>

          <div className="p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              Integrated Rails
            </div>
            <div className="text-2xl font-medium text-slate-950 dark:text-white tabular-nums mt-1">
              7 APIs
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              Workday, Slack, Checkr, AWS
            </div>
          </div>

        </div>
      </div>

      {/* 3. Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {["All", "Onboarding", "Leave & Time Off", "Contracts & Legal", "Payroll"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
              categoryFilter === cat
                ? "bg-slate-900 dark:bg-white text-white dark:text-neutral-950 shadow-2xs font-semibold"
                : "bg-white dark:bg-[#111215] border border-slate-200/80 dark:border-white/[0.08] text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 4. Logic Pipeline Engine: TRIGGER → CONDITION → ACTION → RESULT */}
      <div className="space-y-3.5">
        {filteredWorkflows.map((wf) => (
          <div
            key={wf.id}
            className="p-4 rounded-xl bg-white dark:bg-[#111215] border border-slate-200/90 dark:border-white/[0.07] shadow-2xs space-y-3.5"
          >
            {/* Pipeline Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100 dark:border-white/[0.05]">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-semibold text-slate-900 dark:text-white">
                    {wf.title}
                  </h3>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-neutral-400">
                    {wf.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-neutral-400 mt-0.5">
                  {wf.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleWorkflowStatus(wf.id)}
                  className={`h-7 px-2.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                    wf.status === "Active"
                      ? "bg-slate-100 dark:bg-white/[0.08] text-slate-900 dark:text-white border border-slate-200 dark:border-white/10"
                      : "bg-slate-50 dark:bg-white/[0.02] text-slate-400 border border-slate-100 dark:border-white/[0.04]"
                  }`}
                >
                  {wf.status === "Active" ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3" />}
                  <span>{wf.status}</span>
                </button>
              </div>
            </div>

            {/* Deterministic Logic Flow Sequence */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-xs">
              
              {/* TRIGGER */}
              <div className="p-3 rounded-lg border border-slate-200/70 dark:border-white/[0.05] bg-slate-50/50 dark:bg-white/[0.015] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500 block mb-1">
                    1. Trigger Event
                  </span>
                  <div className="font-medium text-slate-900 dark:text-white leading-snug">
                    {wf.trigger}
                  </div>
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-2">Source: Webhook</div>
              </div>

              {/* CONDITION */}
              <div className="p-3 rounded-lg border border-slate-200/70 dark:border-white/[0.05] bg-slate-50/50 dark:bg-white/[0.015] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500 block mb-1">
                    2. Condition Gate
                  </span>
                  <div className="font-medium text-slate-900 dark:text-white leading-snug">
                    {wf.condition}
                  </div>
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-2">Filter: Logic Evaluator</div>
              </div>

              {/* ACTION */}
              <div className="p-3 rounded-lg border border-slate-200/70 dark:border-white/[0.05] bg-slate-50/50 dark:bg-white/[0.015] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
                    3. Automated Execution
                  </span>
                  <div className="font-medium text-slate-900 dark:text-white leading-snug">
                    {wf.action}
                  </div>
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-2">Target: API Dispatch</div>
              </div>

              {/* RESULT */}
              <div className="p-3 rounded-lg border border-slate-200/70 dark:border-white/[0.05] bg-slate-50/50 dark:bg-white/[0.015] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500 block mb-1">
                    4. Audit Record
                  </span>
                  <div className="font-medium text-slate-900 dark:text-white leading-snug">
                    Telemetry logged in compliance audit registry.
                  </div>
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-2">Status: Reconciled</div>
              </div>

            </div>

            {/* Run Stats Footer */}
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-neutral-500 pt-1 border-t border-slate-100 dark:border-white/[0.04]">
              <span>Executed {wf.runCount} times in last 30d</span>
              <span>Last run: {wf.lastExecuted}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
