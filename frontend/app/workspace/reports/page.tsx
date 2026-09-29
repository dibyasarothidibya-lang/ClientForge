"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import {
  BarChart3,
  Download,
  Printer,
  Calendar,
  Filter,
  Check,
  TrendingUp,
  FileText,
  Building2,
  ChevronRight
} from "lucide-react";

export default function ReportsPage() {
  const { activeOrg } = useWorkspace();

  const [reportType, setReportType] = useState<"workforce" | "payroll" | "recruitment" | "attendance">("workforce");
  const [timeRange, setTimeRange] = useState<"30d" | "q1" | "ytd">("ytd");

  const monthlyData = [
    { month: "Jan 2026", headcount: 228, spend: 1910000, hires: 6, exits: 1 },
    { month: "Feb 2026", headcount: 231, spend: 1935000, hires: 4, exits: 1 },
    { month: "Mar 2026", headcount: 234, spend: 1960000, hires: 5, exits: 2 },
    { month: "Apr 2026", headcount: 236, spend: 1980000, hires: 3, exits: 1 },
    { month: "May 2026", headcount: 239, spend: 2005000, hires: 4, exits: 1 },
    { month: "Jun 2026", headcount: 242, spend: 2035000, hires: 5, exits: 2 },
    { month: "Jul 2026", headcount: 244, spend: 2055000, hires: 4, exits: 2 },
    { month: "Aug 2026", headcount: 246, spend: 2070000, hires: 3, exits: 1 },
    { month: "Sep 2026", headcount: 248, spend: 2095000, hires: 4, exits: 2 },
  ];

  const maxSpend = Math.max(...monthlyData.map((d) => d.spend));

  const exportCSV = () => {
    const headers = "Month,Headcount,Monthly Spend ($),Hires,Exits\n";
    const rows = monthlyData
      .map((d) => `"${d.month}",${d.headcount},${d.spend},${d.hires},${d.exits}`)
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hope-foundation-report-${reportType}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reportPresets = [
    { id: "workforce", label: "Workforce & Headcount", desc: "Growth, FTE/contractor ratios & retention" },
    { id: "payroll", label: "Payroll & Compensation", desc: "Monthly run rate & tax withholds" },
    { id: "recruitment", label: "Talent Acquisition ATS", desc: "Time-to-hire velocity & conversion" },
    { id: "attendance", label: "Duty Station Presence", desc: "Biometric check-ins & remote logs" },
  ];

  return (
    <div className="space-y-5 font-sans antialiased text-slate-900 dark:text-neutral-100">
      
      {/* 1. Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-white/[0.07]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-neutral-400 border border-slate-200/80 dark:border-white/[0.06]">
              Workforce Intelligence
            </span>
            <span className="text-xs text-slate-400 dark:text-neutral-500 font-mono">
              Audited Telemetry Reports
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Executive Analytics & Workforce Telemetry
          </h1>
          <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
            Cross-department operational reporting across staffing, financial clearing, and field stations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => window.print()}
            className="h-8 px-3 rounded-lg bg-slate-100 hover:bg-slate-200/70 dark:bg-white/[0.05] dark:hover:bg-white/[0.08] border border-slate-200/80 dark:border-white/[0.07] text-xs font-medium text-slate-700 dark:text-neutral-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print View</span>
          </button>
          <button
            onClick={exportCSV}
            className="h-8 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-medium inline-flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 2. Analytical Preset Selector Strip (No glowing cards) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {reportPresets.map((preset) => {
          const isSelected = reportType === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => setReportType(preset.id as any)}
              className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-slate-100 dark:bg-white/[0.08] border-slate-300 dark:border-white/15"
                  : "bg-white dark:bg-[#111215] border border-slate-200/80 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/10"
              }`}
            >
              <div>
                <div className="text-xs font-semibold text-slate-900 dark:text-white">
                  {preset.label}
                </div>
                <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5 leading-snug">
                  {preset.desc}
                </div>
              </div>
              <div className="mt-2 text-[10px] font-mono text-slate-400">
                {isSelected ? "Active Preset" : "Click to View"}
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Dominant Analytical Chart Container */}
      <div className="bg-white dark:bg-[#111215] border border-slate-200/90 dark:border-white/[0.07] rounded-xl p-5 space-y-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
              Monthly Operational Spend & Staffing Progression
            </h2>
            <p className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              Reconciled monthly compensation spend (USD) alongside net headcount growth.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex p-0.5 rounded-lg bg-slate-100 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/[0.07] text-xs">
              {[
                { id: "30d", label: "30 Days" },
                { id: "q1", label: "Q1 2026" },
                { id: "ytd", label: "YTD Reconciled" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTimeRange(t.id as any)}
                  className={`px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                    timeRange === t.id
                      ? "bg-white dark:bg-white/[0.12] text-slate-950 dark:text-white font-medium shadow-2xs"
                      : "text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Restrained Bar Chart */}
        <div className="pt-4 pb-2">
          <div className="grid grid-cols-9 gap-3 items-end h-52 border-b border-slate-200/80 dark:border-white/[0.06] pb-3">
            {monthlyData.map((d) => {
              const heightPct = Math.round((d.spend / maxSpend) * 100);
              return (
                <div key={d.month} className="flex flex-col items-center gap-1.5 h-full justify-end group">
                  <div className="w-full flex items-end justify-center h-full">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-full max-w-[36px] bg-slate-200 dark:bg-white/[0.1] hover:bg-indigo-600 dark:hover:bg-indigo-500 rounded-t-sm transition-colors relative"
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-1.5 py-0.5 rounded text-[10px] font-mono whitespace-nowrap pointer-events-none transition shadow-xs">
                        ${(d.spend / 1000).toFixed(0)}k · {d.headcount} FTE
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-neutral-500 truncate w-full text-center">
                    {d.month.split(" ")[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Telemetry Data Table */}
      <div className="bg-white dark:bg-[#111215] border border-slate-200/90 dark:border-white/[0.07] rounded-xl overflow-hidden shadow-2xs">
        <div className="p-3.5 border-b border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider font-mono text-slate-900 dark:text-white">
            Audited Monthly Telemetry Ledger
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            Hope Foundation Official Registry
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 dark:bg-white/[0.02] border-b border-slate-200/80 dark:border-white/[0.06] text-slate-400 dark:text-neutral-500 font-mono text-[10px] uppercase">
              <tr>
                <th className="py-2.5 px-4">Period</th>
                <th className="py-2.5 px-3 text-right">Headcount</th>
                <th className="py-2.5 px-3 text-right">Monthly Spend</th>
                <th className="py-2.5 px-3 text-right">Hires</th>
                <th className="py-2.5 px-3 text-right">Departures</th>
                <th className="py-2.5 px-4 text-right">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {monthlyData.map((d) => (
                <tr key={d.month} className="hover:bg-slate-50/70 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                    {d.month}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-900 dark:text-white tabular-nums">
                    {d.headcount}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-700 dark:text-neutral-300 tabular-nums">
                    ${d.spend.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-900 dark:text-white tabular-nums">
                    +{d.hires}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-500 tabular-nums">
                    -{d.exits}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-[11px] text-slate-600 dark:text-neutral-400">
                    Reconciled
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
