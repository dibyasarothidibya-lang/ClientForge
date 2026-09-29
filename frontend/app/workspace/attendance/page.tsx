"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import ThreeDCard from "@/components/motion/ThreeDCard";
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  Search,
  Filter,
  Download,
  Building2,
  MapPin,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function AttendancePage() {
  const { attendanceRecords, members } = useWorkspace();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");

  const filteredRecords = attendanceRecords.filter((rec) => {
    const matchesSearch =
      rec.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === "All" || rec.department === selectedDept;
    const matchesStatus = selectedStatus === "All" || rec.status === selectedStatus;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const presentCount = attendanceRecords.filter((r) => r.status === "Present").length;
  const remoteCount = attendanceRecords.filter((r) => r.workMode === "Remote").length;
  const lateCount = attendanceRecords.filter((r) => r.status === "Late").length;
  const absentCount = attendanceRecords.filter((r) => r.status === "Absent").length;

  return (
    <div className="space-y-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
            Time & Presence Telemetry
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-white tracking-tight">
            Attendance & Work Schedules
          </h1>
          <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
            Real-time biometric check-ins, hybrid office allocations, overtime tracking, and statutory timesheet verification.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 dark:bg-white/[0.04] p-1 rounded-xl border border-slate-200 dark:border-white/[0.08] text-xs">
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                viewMode === "list"
                  ? "bg-white dark:bg-white text-slate-950 dark:text-neutral-950 shadow-xs font-semibold"
                  : "text-slate-600 dark:text-neutral-400"
              }`}
            >
              Timesheet Grid
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                viewMode === "calendar"
                  ? "bg-white dark:bg-white text-slate-950 dark:text-neutral-950 shadow-xs font-semibold"
                  : "text-slate-600 dark:text-neutral-400"
              }`}
            >
              Calendar Heatmap
            </button>
          </div>

          <button
            onClick={() => alert("Attendance timesheet CSV exported.")}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] hover:bg-slate-200/70 dark:hover:bg-white/[0.08] text-xs font-medium text-slate-700 dark:text-neutral-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Timesheet</span>
          </button>
        </div>
      </div>

      {/* 4 Attendance KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <ThreeDCard glareColor="#10b981" maxTilt={6} elevationZ={10} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Present Today</span>
              <span className="text-[10px] text-emerald-600 font-semibold">Active</span>
            </div>
            <div className="text-2xl font-bold text-slate-950 dark:text-white tabular-nums">{presentCount}</div>
            <div className="text-[10px] text-slate-400 mt-1">94% of roster checked in</div>
          </div>
        </ThreeDCard>

        <ThreeDCard glareColor="#3b82f6" maxTilt={6} elevationZ={10} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Remote / WFH</span>
              <span className="text-[10px] text-blue-600 font-semibold">Hybrid Policy</span>
            </div>
            <div className="text-2xl font-bold text-slate-950 dark:text-white tabular-nums">{remoteCount}</div>
            <div className="text-[10px] text-slate-400 mt-1">IP & VPN authenticated</div>
          </div>
        </ThreeDCard>

        <ThreeDCard glareColor="#f59e0b" maxTilt={6} elevationZ={10} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Late Arrivals</span>
              <span className="text-[10px] text-amber-600 font-semibold">Grace Period</span>
            </div>
            <div className="text-2xl font-bold text-slate-950 dark:text-white tabular-nums">{lateCount}</div>
            <div className="text-[10px] text-slate-400 mt-1">&lt; 30 min variance</div>
          </div>
        </ThreeDCard>

        <ThreeDCard glareColor="#ef4444" maxTilt={6} elevationZ={10} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Absent / On Leave</span>
              <span className="text-[10px] text-red-500 font-semibold">Recorded</span>
            </div>
            <div className="text-2xl font-bold text-slate-950 dark:text-white tabular-nums">{absentCount}</div>
            <div className="text-[10px] text-slate-400 mt-1">Approved time-off</div>
          </div>
        </ThreeDCard>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search employee or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-sans"
          />
        </div>

        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="px-3 py-2 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] rounded-xl text-xs text-slate-800 dark:text-white outline-none font-sans font-medium cursor-pointer"
        >
          <option value="All">All Departments</option>
          <option value="Executive & Governance">Executive & Governance</option>
          <option value="Finance & Operations">Finance & Operations</option>
          <option value="Technology & Systems">Technology & Systems</option>
          <option value="Internal Audit & Risk">Internal Audit & Risk</option>
          <option value="Programs & Outreach">Programs & Outreach</option>
          <option value="Field Engineering">Field Engineering</option>
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-2 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] rounded-xl text-xs text-slate-800 dark:text-white outline-none font-sans font-medium cursor-pointer"
        >
          <option value="All">All Statuses</option>
          <option value="Present">Present</option>
          <option value="Late">Late</option>
          <option value="Absent">Absent</option>
        </select>
      </div>

      {/* LIST OR CALENDAR VIEW */}
      {viewMode === "list" ? (
        <div className="rounded-3xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0c0c0e] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 dark:border-white/[0.08] bg-slate-50/70 dark:bg-white/[0.02] text-slate-500 dark:text-neutral-400 font-sans font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Employee</th>
                  <th className="py-3.5 px-4">Department</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Check-In</th>
                  <th className="py-3.5 px-4">Check-Out</th>
                  <th className="py-3.5 px-4">Hours</th>
                  <th className="py-3.5 px-4">Mode</th>
                  <th className="py-3.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
                {filteredRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50/60 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={rec.employeeAvatar}
                          alt={rec.employeeName}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-white/10"
                        />
                        <span className="font-medium text-slate-900 dark:text-white">{rec.employeeName}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">{rec.department}</td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-neutral-300 font-medium">{rec.date}</td>
                    <td className="py-3.5 px-4 text-slate-900 dark:text-white font-medium">{rec.checkIn}</td>
                    <td className="py-3.5 px-4 text-slate-900 dark:text-white font-medium">{rec.checkOut}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white tabular-nums">
                      {rec.totalHours > 0 ? `${rec.totalHours} hrs` : "—"}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-neutral-300">
                        {rec.workMode}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          rec.status === "Present"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                            : rec.status === "Late"
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                            : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
                        }`}
                      >
                        {rec.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* CALENDAR HEATMAP VIEW */
        <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/[0.06]">
            <h3 className="text-base font-semibold text-slate-950 dark:text-white">September 2026 Workforce Schedule</h3>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-slate-500"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Full Presence</span>
              <span className="flex items-center gap-1 text-slate-500"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Remote</span>
              <span className="flex items-center gap-1 text-slate-500"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Partial / Holiday</span>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="py-2 text-[11px] font-semibold uppercase text-slate-400">
                {day}
              </div>
            ))}
            {Array.from({ length: 30 }).map((_, i) => {
              const dayNum = i + 1;
              const isWeekend = (dayNum % 7 === 6) || (dayNum % 7 === 0);
              return (
                <div
                  key={dayNum}
                  className={`p-3 rounded-2xl border text-left min-h-[75px] flex flex-col justify-between transition-colors ${
                    isWeekend
                      ? "bg-slate-50/50 dark:bg-white/[0.01] border-slate-100 dark:border-white/[0.03] text-slate-400"
                      : "bg-white dark:bg-[#121216] border-slate-200 dark:border-white/[0.08] hover:border-emerald-500/40"
                  }`}
                >
                  <span className="font-semibold text-slate-900 dark:text-white text-xs">{dayNum}</span>
                  {!isWeekend && (
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                      96% Present
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
