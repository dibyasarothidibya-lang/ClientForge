"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import { LeaveRequest } from "@/lib/peopleCoreData";
import ThreeDCard from "@/components/motion/ThreeDCard";
import {
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Plus,
  Filter,
  Search,
  ChevronRight,
  UserCheck,
  Building2,
  FileText,
  X
} from "lucide-react";

export default function LeaveManagementPage() {
  const { leaveRequests, addLeaveRequest, approveLeaveRequest, rejectLeaveRequest } = useWorkspace();

  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);

  // New leave modal
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [leaveType, setLeaveType] = useState<LeaveRequest["leaveType"]>("Annual Leave");
  const [startDate, setStartDate] = useState("2026-10-15");
  const [endDate, setEndDate] = useState("2026-10-20");
  const [days, setDays] = useState(4);
  const [reason, setReason] = useState("");

  const filteredLeaves = leaveRequests.filter((l) => {
    const matchesSearch =
      l.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.reason.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "All" || l.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = leaveRequests.filter((l) => l.status === "Pending").length;
  const approvedCount = leaveRequests.filter((l) => l.status === "Approved").length;
  const rejectedCount = leaveRequests.filter((l) => l.status === "Rejected").length;

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    addLeaveRequest({
      employeeId: "usr_curr",
      employeeName: "Dr. Sarah Lin",
      employeeAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80",
      department: "Executive & Governance",
      leaveType,
      startDate,
      endDate,
      days,
      reason: reason || "Scheduled personal time off.",
      approver: "Board of Directors",
      balanceRemaining: 12,
    });
    setRequestModalOpen(false);
    setReason("");
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
            Time Off Governance
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-white tracking-tight">
            Leave & Paid Time Off
          </h1>
          <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
            Multi-tier approval workflows (Employee &rarr; Manager &rarr; HR), statutory leave balances, and availability schedules.
          </p>
        </div>

        <button
          onClick={() => setRequestModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-semibold flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Request Leave</span>
        </button>
      </div>

      {/* 4 Leave KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <ThreeDCard glareColor="#f59e0b" maxTilt={6} elevationZ={10} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Pending Reviews</span>
              <span className="text-[10px] text-amber-600 font-semibold">Action Required</span>
            </div>
            <div className="text-2xl font-bold text-slate-950 dark:text-white tabular-nums">{pendingCount}</div>
            <div className="text-[10px] text-slate-400 mt-1">Awaiting manager sign-off</div>
          </div>
        </ThreeDCard>

        <ThreeDCard glareColor="#10b981" maxTilt={6} elevationZ={10} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Approved (Trailing 30d)</span>
              <span className="text-[10px] text-emerald-600 font-semibold">Scheduled</span>
            </div>
            <div className="text-2xl font-bold text-slate-950 dark:text-white tabular-nums">{approvedCount}</div>
            <div className="text-[10px] text-slate-400 mt-1">Calendar invitations synced</div>
          </div>
        </ThreeDCard>

        <ThreeDCard glareColor="#ef4444" maxTilt={6} elevationZ={10} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Rejected / Cancelled</span>
              <span className="text-[10px] text-slate-400">Resolved</span>
            </div>
            <div className="text-2xl font-bold text-slate-950 dark:text-white tabular-nums">{rejectedCount}</div>
            <div className="text-[10px] text-slate-400 mt-1">Reason memo attached</div>
          </div>
        </ThreeDCard>

        <ThreeDCard glareColor="#6366f1" maxTilt={6} elevationZ={10} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Team Availability</span>
              <span className="text-[10px] text-indigo-600 font-semibold">Capacity</span>
            </div>
            <div className="text-2xl font-bold text-slate-950 dark:text-white tabular-nums">96.8%</div>
            <div className="text-[10px] text-slate-400 mt-1">Sufficient quorum maintained</div>
          </div>
        </ThreeDCard>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search employee, leave type, or reason..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-sans"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] rounded-xl text-xs text-slate-800 dark:text-white outline-none font-sans font-medium cursor-pointer"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* LEAVE TABLE */}
      <div className="rounded-3xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0c0c0e] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 dark:border-white/[0.08] bg-slate-50/70 dark:bg-white/[0.02] text-slate-500 dark:text-neutral-400 font-sans font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Employee</th>
                <th className="py-3.5 px-4">Leave Type</th>
                <th className="py-3.5 px-4">Duration</th>
                <th className="py-3.5 px-4">Days</th>
                <th className="py-3.5 px-4">Remaining Balance</th>
                <th className="py-3.5 px-4">Status & Stage</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {filteredLeaves.map((lve) => (
                <tr key={lve.id} className="hover:bg-slate-50/60 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={lve.employeeAvatar}
                        alt={lve.employeeName}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-white/10"
                      />
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">{lve.employeeName}</div>
                        <div className="text-[11px] text-slate-500">{lve.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-white">{lve.leaveType}</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-neutral-300">
                    {lve.startDate} &rarr; {lve.endDate}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white tabular-nums">
                    {lve.days} days
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {lve.balanceRemaining} days left
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col gap-1">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold w-max ${
                          lve.status === "Approved"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                            : lve.status === "Pending"
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                            : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
                        }`}
                      >
                        {lve.status}
                      </span>
                      <span className="text-[9px] text-slate-400">Workflow: {lve.workflowStage}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedRequest(lve)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-xs font-medium text-slate-800 dark:text-white transition-colors cursor-pointer"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* APPROVAL WORKFLOW MODAL */}
      <AnimatePresence>
        {selectedRequest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRequest(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white dark:bg-[#121215] border border-slate-200 dark:border-white/[0.12] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 space-y-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Leave Request Details</h3>
                  <div className="text-xs text-slate-500">Submitted by {selectedRequest.employeeName}</div>
                </div>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Approval Workflow Stage Graphic */}
              <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 space-y-2">
                <div className="text-[10px] uppercase font-semibold text-indigo-700 dark:text-indigo-300">Approval Workflow Route</div>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-emerald-600">1. Employee (Submitted)</span>
                  <span className="text-slate-400">&rarr;</span>
                  <span className="text-indigo-600">2. Manager Review</span>
                  <span className="text-slate-400">&rarr;</span>
                  <span className="text-slate-400">3. HR Confirmation</span>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between border-b border-slate-100 dark:border-white/[0.04] pb-2">
                  <span className="text-slate-400">Leave Type:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{selectedRequest.leaveType}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-white/[0.04] pb-2">
                  <span className="text-slate-400">Timeframe:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{selectedRequest.startDate} to {selectedRequest.endDate} ({selectedRequest.days} business days)</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-white/[0.04] pb-2">
                  <span className="text-slate-400">Reason:</span>
                  <span className="text-slate-800 dark:text-neutral-200 max-w-xs text-right">{selectedRequest.reason}</span>
                </div>
              </div>

              {selectedRequest.status === "Pending" && (
                <div className="flex gap-3 pt-3">
                  <button
                    onClick={() => {
                      approveLeaveRequest(selectedRequest.id);
                      setSelectedRequest(null);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs cursor-pointer shadow-md"
                  >
                    Approve Request
                  </button>
                  <button
                    onClick={() => {
                      rejectLeaveRequest(selectedRequest.id);
                      setSelectedRequest(null);
                    }}
                    className="px-4 py-2.5 rounded-xl border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-50 text-xs font-semibold cursor-pointer"
                  >
                    Reject
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CREATE LEAVE REQUEST MODAL */}
      <AnimatePresence>
        {requestModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setRequestModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white dark:bg-[#121215] border border-slate-200 dark:border-white/[0.12] rounded-3xl max-w-md w-full p-6 shadow-2xl z-10 space-y-4"
            >
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Submit Leave Request</h3>
              <form onSubmit={handleCreateRequest} className="space-y-4 text-xs font-sans">
                <div>
                  <label className="text-slate-500 block mb-1 font-medium">Leave Classification</label>
                  <select
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] outline-none"
                  >
                    <option value="Annual Leave">Annual Paid Vacation</option>
                    <option value="Sick Leave">Medical / Sick Leave</option>
                    <option value="Parental Leave">Parental Leave</option>
                    <option value="Compassionate">Compassionate / Emergency</option>
                    <option value="Unpaid">Unpaid Sabbatical</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-500 block mb-1 font-medium">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 block mb-1 font-medium">End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-slate-500 block mb-1 font-medium">Total Days</label>
                  <input
                    type="number"
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-500 block mb-1 font-medium">Reason & Handover Details</label>
                  <textarea
                    rows={3}
                    placeholder="Brief description of coverage..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-semibold text-xs cursor-pointer shadow-md"
                  >
                    Submit for Approval
                  </button>
                  <button
                    type="button"
                    onClick={() => setRequestModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
