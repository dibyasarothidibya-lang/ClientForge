"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import ThreeDCard from "@/components/motion/ThreeDCard";
import {
  BarChart3,
  Download,
  Printer,
  Calendar,
  Filter,
  CheckCircle2,
  TrendingUp,
  FileText,
  Sliders,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

export default function ReportsPage() {
  const { activeOrg, transactions, tasks, findings, projects } = useWorkspace();

  const [reportType, setReportType] = useState<"executive" | "financial" | "compliance" | "delivery">("executive");
  const [timeRange, setTimeRange] = useState<"30d" | "q1" | "ytd">("ytd");

  // Chart data calculation
  const monthlyData = [
    { month: "Jan 2026", raised: 142000, spend: 89000, tasksCompleted: 45 },
    { month: "Feb 2026", raised: 188000, spend: 112000, tasksCompleted: 58 },
    { month: "Mar 2026", raised: 224000, spend: 138000, tasksCompleted: 72 },
    { month: "Apr 2026 (Proj)", raised: 260000, spend: 145000, tasksCompleted: 68 },
  ];

  const maxVal = Math.max(...monthlyData.map((d) => d.raised));

  const exportCSV = () => {
    const headers = "Month,Capital Raised ($),Program Spend ($),Tasks Completed\n";
    const rows = monthlyData
      .map((d) => `"${d.month}",${d.raised},${d.spend},${d.tasksCompleted}`)
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeOrg.slug}-report-${reportType}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <BarChart3 className="w-3.5 h-3.5" /> Analytics Engine
            </span>
            <span className="text-xs text-neutral-400">Report Builder Lite</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-sans font-semibold tracking-tight text-neutral-100">
            Executive Reports & Analytics
          </h1>
          <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
            Configure dynamic reports across capital allocation, delivery velocity, and audit compliance metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 transition cursor-pointer"
          >
            <Printer className="w-4 h-4 text-neutral-400" />
            Print View
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold shadow-md shadow-amber-500/20 transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </motion.button>
        </div>
      </div>

      {/* Preset Selector with 3D Tilt */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {[
          { id: "workforce", title: "Workforce", desc: "Headcount & tenure", icon: Sparkles, glare: "#6366f1" },
          { id: "recruitment", title: "Recruitment", desc: "Time-to-hire & ATS", icon: TrendingUp, glare: "#8b5cf6" },
          { id: "attendance", title: "Attendance", desc: "Hours & presence", icon: CheckCircle2, glare: "#10b981" },
          { id: "leave", title: "Leave & PTO", desc: "Usage & balances", icon: BarChart3, glare: "#f59e0b" },
          { id: "payroll", title: "Payroll Ledger", desc: "Taxes & disbursements", icon: TrendingUp, glare: "#38bdf8" },
          { id: "expenses", title: "Expenses", desc: "Spend by category", icon: CheckCircle2, glare: "#ec4899" },
          { id: "performance", title: "Performance", desc: "OKR completion", icon: Sparkles, glare: "#14b8a6" },
        ].map((item) => {
          const Icon = item.icon;
          const isSelected = reportType === item.id;
          return (
            <ThreeDCard key={item.id} glareColor={item.glare} maxTilt={6} elevationZ={10} className="h-full">
              <div
                onClick={() => setReportType(item.id as any)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition flex flex-col justify-between h-full group ${
                  isSelected
                    ? "bg-indigo-500/10 border-indigo-500/40 shadow-sm"
                    : "bg-white dark:bg-[#0e0e12] border-slate-200 dark:border-white/[0.08] hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`p-1.5 rounded-lg transition-transform group-hover:scale-110 ${
                        isSelected ? "bg-indigo-500/20 text-indigo-400" : "bg-slate-100 dark:bg-white/[0.04] text-slate-500"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    {isSelected && (
                      <span className="text-[9px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider font-sans">Active</span>
                    )}
                  </div>
                  <h3 className="text-xs font-semibold text-slate-900 dark:text-neutral-100">{item.title}</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">{item.desc}</p>
                </div>
              </div>
            </ThreeDCard>
          );
        })}
      </div>

      {/* Dynamic Visual Chart */}
      <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-medium text-neutral-100">
              Comparative Velocity: Capital Raised vs. Program Spend
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5 font-sans font-medium">
              Live normalized values for {activeOrg.name} (USD)
            </p>
          </div>

          {/* Time Range Toggle with Spring Sliding Pill */}
          <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-xl p-1 font-sans text-xs relative">
            {[
              { id: "30d", label: "30 Days" },
              { id: "q1", label: "Q1 2026" },
              { id: "ytd", label: "YTD Full" },
            ].map((t) => {
              const isActive = timeRange === t.id;
              return (
                <motion.button
                  key={t.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTimeRange(t.id as any)}
                  className={`relative px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    isActive ? "text-white font-semibold" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="reportsTimeRangeIndicator"
                      className="absolute inset-0 bg-neutral-800 rounded-lg shadow-sm"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{t.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Bar Chart Visualization */}
        <div className="pt-6 pb-2">
          <div className="grid grid-cols-4 gap-6 items-end h-64 border-b border-neutral-800 pb-4">
            {monthlyData.map((d) => {
              const raisedHeight = Math.round((d.raised / maxVal) * 100);
              const spendHeight = Math.round((d.spend / maxVal) * 100);
              return (
                <div key={d.month} className="flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="flex items-end gap-2 w-full max-w-[120px] justify-center h-full">
                    {/* Raised Bar */}
                    <div className="w-1/2 h-full flex items-end">
                      <motion.div
                        className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg transition-all duration-500 relative group-hover:brightness-110"
                        initial={{ height: 0 }}
                        animate={{ height: `${raisedHeight}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-950 border border-neutral-700 px-2 py-0.5 rounded text-[10px] text-white whitespace-nowrap pointer-events-none transition font-sans font-semibold tabular-nums">
                          +${(d.raised / 1000).toFixed(0)}k
                        </div>
                      </motion.div>
                    </div>
                    {/* Spend Bar */}
                    <div className="w-1/2 h-full flex items-end">
                      <motion.div
                        className="w-full bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-lg transition-all duration-500 relative group-hover:brightness-110"
                        initial={{ height: 0 }}
                        animate={{ height: `${spendHeight}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-950 border border-neutral-700 px-2 py-0.5 rounded text-[10px] text-white whitespace-nowrap pointer-events-none transition font-sans font-semibold tabular-nums">
                          -${(d.spend / 1000).toFixed(0)}k
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  <span className="text-xs font-sans font-medium text-neutral-400 text-center">{d.month}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-6 pt-4 text-xs font-sans font-medium">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-neutral-300">Capital Raised / Inflow</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-neutral-300">Programmatic Disbursement / Spend</span>
            </div>
          </div>
        </div>
      </div>

      {/* Granular Breakdown Table */}
      <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur space-y-4">
        <h3 className="text-sm font-medium text-neutral-200">Granular Metric Ledger</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 text-[11px] font-sans font-semibold text-neutral-400 uppercase tracking-wider">
                <th className="py-3 px-3">Reporting Period</th>
                <th className="py-3 px-3 text-right">Inflow Volume</th>
                <th className="py-3 px-3 text-right">Outflow Volume</th>
                <th className="py-3 px-3 text-right">Net Reserve Addition</th>
                <th className="py-3 px-3 text-right">Initiatives Completed</th>
                <th className="py-3 px-3 text-right">Margin Efficiency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 font-sans text-xs">
              {monthlyData.map((d) => (
                <tr key={d.month} className="hover:bg-neutral-800/30 transition">
                  <td className="py-3 px-3 font-medium text-neutral-200 whitespace-nowrap">{d.month}</td>
                  <td className="py-3 px-3 text-right text-emerald-400 font-medium whitespace-nowrap">
                    ${d.raised.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right text-rose-400 font-medium whitespace-nowrap">
                    ${d.spend.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right text-neutral-200 font-medium whitespace-nowrap">
                    ${(d.raised - d.spend).toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right text-neutral-300 whitespace-nowrap">{d.tasksCompleted} items</td>
                  <td className="py-3 px-3 text-right text-amber-400 font-medium whitespace-nowrap">
                    {Math.round(((d.raised - d.spend) / d.raised) * 100)}%
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
