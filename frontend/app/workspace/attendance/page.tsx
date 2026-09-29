"use client";

import React, { useState } from "react";
import { useWorkspace } from "@/context/WorkspaceContext";
import {
  Calendar as CalendarIcon,
  Clock,
  Check,
  AlertCircle,
  Users,
  Search,
  Filter,
  Download,
  Building2,
  MapPin,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function AttendancePage() {
  const { attendanceRecords } = useWorkspace();

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
    <div className="space-y-5 font-sans antialiased text-slate-900 dark:text-neutral-100">
      
      {/* 1. Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-white/[0.07]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-neutral-400 border border-slate-200/80 dark:border-white/[0.06]">
              Time & Duty Telemetry
            </span>
            <span className="text-xs text-slate-400 dark:text-neutral-500 font-mono">
              Live Biometric & Shift Verification
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Attendance & Shift Verification
          </h1>
          <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
            Real-time biometric check-ins, remote VPN authentication, duty station logs, and overtime compliance.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex p-0.5 rounded-lg bg-slate-100 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/[0.07] text-xs">
            <button
              onClick={() => setViewMode("list")}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                viewMode === "list"
                  ? "bg-white dark:bg-white/[0.12] text-slate-950 dark:text-white font-medium shadow-2xs"
                  : "text-slate-500 dark:text-neutral-400"
              }`}
            >
              Timesheet Ledger
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                viewMode === "calendar"
                  ? "bg-white dark:bg-white/[0.12] text-slate-950 dark:text-white font-medium shadow-2xs"
                  : "text-slate-500 dark:text-neutral-400"
              }`}
            >
              Calendar Heatmap
            </button>
          </div>

          <button
            onClick={() => alert("Attendance timesheet CSV exported.")}
            className="h-8 px-3 rounded-lg bg-slate-100 hover:bg-slate-200/70 dark:bg-white/[0.05] dark:hover:bg-white/[0.08] border border-slate-200/80 dark:border-white/[0.07] text-xs font-medium text-slate-700 dark:text-neutral-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Timesheet</span>
          </button>
        </div>
      </div>

      {/* 2. Operational Presence Ribbon */}
      <div className="bg-white dark:bg-[#111215] border border-slate-200/90 dark:border-white/[0.07] rounded-xl overflow-hidden shadow-2xs">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-slate-100 dark:divide-white/[0.05] md:divide-x md:divide-slate-200/80 md:dark:divide-white/[0.07]">
          
          <div className="p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              Present Today
            </div>
            <div className="text-2xl font-medium text-slate-950 dark:text-white tabular-nums mt-1">
              {presentCount}
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              97.2% total roster checked in
            </div>
          </div>

          <div className="p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              Remote / Field Mission
            </div>
            <div className="text-2xl font-medium text-slate-950 dark:text-white tabular-nums mt-1">
              {remoteCount}
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              IP & VPN authenticated
            </div>
          </div>

          <div className="p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              Late Arrivals (Variance)
            </div>
            <div className="text-2xl font-medium text-slate-950 dark:text-white tabular-nums mt-1">
              {lateCount}
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              &lt; 30m grace threshold
            </div>
          </div>

          <div className="p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              Absences / Leave
            </div>
            <div className="text-2xl font-medium text-slate-950 dark:text-white tabular-nums mt-1">
              {absentCount}
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              Authorized mission/sick leave
            </div>
          </div>

        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 dark:text-neutral-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search personnel or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-8 pl-9 pr-3 rounded-lg bg-white dark:bg-[#111215] border border-slate-200/80 dark:border-white/[0.08] text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="h-8 px-2.5 rounded-lg bg-white dark:bg-[#111215] border border-slate-200/80 dark:border-white/[0.08] text-xs text-slate-700 dark:text-neutral-300 focus:outline-none cursor-pointer"
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
            className="h-8 px-2.5 rounded-lg bg-white dark:bg-[#111215] border border-slate-200/80 dark:border-white/[0.08] text-xs text-slate-700 dark:text-neutral-300 focus:outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Present">Present</option>
            <option value="Late">Late</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
      </div>

      {/* 4. Timesheet Ledger Table */}
      {viewMode === "list" ? (
        <div className="bg-white dark:bg-[#111215] border border-slate-200/90 dark:border-white/[0.07] rounded-xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 dark:bg-white/[0.02] border-b border-slate-200/80 dark:border-white/[0.06] text-slate-400 dark:text-neutral-500 font-mono text-[10px] uppercase">
                <tr>
                  <th className="py-2.5 px-4">Personnel</th>
                  <th className="py-2.5 px-3">Department</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Clock In</th>
                  <th className="py-2.5 px-3">Clock Out</th>
                  <th className="py-2.5 px-3">Total Hours</th>
                  <th className="py-2.5 px-3">Mode</th>
                  <th className="py-2.5 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
                {filteredRecords.map((rec) => (
                  <tr
                    key={rec.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={rec.employeeAvatar}
                          alt={rec.employeeName}
                          className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-white/10 shrink-0"
                        />
                        <span className="font-medium text-slate-900 dark:text-white">
                          {rec.employeeName}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-slate-500 dark:text-neutral-400">
                      {rec.department}
                    </td>

                    <td className="py-3 px-3 font-mono text-slate-600 dark:text-neutral-300">
                      {rec.date}
                    </td>

                    <td className="py-3 px-3 font-mono text-slate-900 dark:text-white">
                      {rec.checkIn}
                    </td>

                    <td className="py-3 px-3 font-mono text-slate-900 dark:text-white">
                      {rec.checkOut}
                    </td>

                    <td className="py-3 px-3 font-mono text-slate-900 dark:text-white tabular-nums">
                      {rec.totalHours > 0 ? `${rec.totalHours} hrs` : "—"}
                    </td>

                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-neutral-400 border border-slate-200/60 dark:border-white/[0.04]">
                        {rec.workMode}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[11px] font-mono ${
                          rec.status === "Present"
                            ? "text-slate-800 dark:text-neutral-200"
                            : rec.status === "Late"
                            ? "text-amber-600 dark:text-amber-400 font-semibold"
                            : "text-slate-400"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-neutral-500" />
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
        /* Calendar Heatmap View */
        <div className="bg-white dark:bg-[#111215] border border-slate-200/90 dark:border-white/[0.07] rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.06]">
            <div>
              <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                September 2026 Shift Matrix
              </h3>
              <p className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
                Composite field presence across all 4 operational duty stations.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-400">Legend:</span>
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.06] text-[10px] font-mono">95%+ Presence</span>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div key={d} className="font-mono text-[11px] text-slate-400 uppercase py-1">
                {d}
              </div>
            ))}
            {Array.from({ length: 30 }).map((_, i) => {
              const day = i + 1;
              const isWeekend = (i % 7) >= 5;
              return (
                <div
                  key={day}
                  className={`p-3 rounded-lg border text-left flex flex-col justify-between h-20 ${
                    isWeekend
                      ? "bg-slate-50/40 dark:bg-white/[0.01] border-slate-100 dark:border-white/[0.03]"
                      : "bg-slate-50/70 dark:bg-white/[0.02] border-slate-200/70 dark:border-white/[0.05]"
                  }`}
                >
                  <span className="font-mono text-xs font-medium text-slate-600 dark:text-neutral-400">
                    {day}
                  </span>
                  {!isWeekend && (
                    <div className="text-[10px] font-mono text-slate-700 dark:text-neutral-300">
                      241/248
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
