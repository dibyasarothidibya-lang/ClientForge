"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import { ApprovalRequest } from "@/lib/demoData";
import ThreeDCard from "@/components/motion/ThreeDCard";
import {
  FileCheck2,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  UserCheck,
  AlertCircle,
  DollarSign,
  ShieldCheck,
  Inbox
} from "lucide-react";

export default function ApprovalsPage() {
  const { approvals, approveRequest, rejectRequest, currentRole } = useWorkspace();

  const [statusFilter, setStatusFilter] = useState<"All" | "Pending" | "Approved" | "Rejected">("Pending");
  const [selectedApproval, setSelectedApproval] = useState<ApprovalRequest | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const filteredApprovals = approvals.filter(
    (a) => statusFilter === "All" || a.status === statusFilter
  );

  const pendingCount = approvals.filter((a) => a.status === "Pending").length;
  const approvedCount = approvals.filter((a) => a.status === "Approved").length;
  const rejectedCount = approvals.filter((a) => a.status === "Rejected").length;

  return (
    <div className="space-y-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-sans font-semibold uppercase tracking-wider text-teal-400 block mb-1">
            Governance & Sign-Offs
          </span>
          <h1 className="text-2xl sm:text-3xl font-sans font-semibold text-slate-950 dark:text-[#f5f5f3] tracking-tight">Reusable Approval Workflow Engine</h1>
        </div>

        {/* Status Filter with Spring Sliding Pill */}
        <div className="flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.08] rounded-xl p-1 text-xs font-sans font-medium relative">
          {(["Pending", "Approved", "Rejected", "All"] as const).map((st) => {
            const isActive = statusFilter === st;
            return (
              <motion.button
                key={st}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStatusFilter(st)}
                className={`relative px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  isActive ? "text-neutral-950 font-semibold" : "text-neutral-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="approvalsFilterIndicator"
                    className="absolute inset-0 bg-white rounded-lg shadow-xs"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{st}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 4 KPI CARDS WITH 3D TILT & LANDING PAGE NUMERIC TYPOGRAPHY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ThreeDCard glareColor="#f59e0b" maxTilt={8} elevationZ={15} className="h-full">
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur hover:border-amber-500/40 transition-colors flex flex-col justify-between h-full group">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider font-sans">Pending Decisions</span>
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="font-sans text-3xl sm:text-4xl lg:text-5xl font-normal sm:font-medium tracking-tight text-white tabular-nums my-2">
              {pendingCount}
            </div>
          </div>
        </ThreeDCard>

        <ThreeDCard glareColor="#10b981" maxTilt={8} elevationZ={15} className="h-full">
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur hover:border-emerald-500/40 transition-colors flex flex-col justify-between h-full group">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider font-sans">Signed & Approved</span>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="font-sans text-3xl sm:text-4xl lg:text-5xl font-normal sm:font-medium tracking-tight text-white tabular-nums my-2">
              {approvedCount}
            </div>
          </div>
        </ThreeDCard>

        <ThreeDCard glareColor="#ef4444" maxTilt={8} elevationZ={15} className="h-full">
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur hover:border-red-500/40 transition-colors flex flex-col justify-between h-full group">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider font-sans">Rejected / Blocked</span>
              <div className="p-2 rounded-lg bg-red-500/10 text-red-400 group-hover:scale-110 transition-transform">
                <XCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="font-sans text-3xl sm:text-4xl lg:text-5xl font-normal sm:font-medium tracking-tight text-white tabular-nums my-2">
              {rejectedCount}
            </div>
          </div>
        </ThreeDCard>

        <ThreeDCard glareColor="#14b8a6" maxTilt={8} elevationZ={15} className="h-full">
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur hover:border-teal-500/40 transition-colors flex flex-col justify-between h-full group">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider font-sans">Total Workflows</span>
              <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 group-hover:scale-110 transition-transform">
                <FileCheck2 className="w-4 h-4" />
              </div>
            </div>
            <div className="font-sans text-3xl sm:text-4xl lg:text-5xl font-normal sm:font-medium tracking-tight text-white tabular-nums my-2">
              {approvals.length}
            </div>
          </div>
        </ThreeDCard>
      </div>

      {/* Approvals Table */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c0e] overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-white/[0.08] bg-white/[0.02] text-neutral-400 font-sans font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3.5 px-4">Request Item</th>
              <th className="py-3.5 px-4">Type</th>
              <th className="py-3.5 px-4">Requester</th>
              <th className="py-3.5 px-4">Workflow Step</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Review</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04] text-neutral-300">
            {filteredApprovals.map((appr) => (
              <motion.tr
                key={appr.id}
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                transition={{ duration: 0.15 }}
                className="transition-colors cursor-pointer"
              >
                <td className="py-3.5 px-4 font-sans font-medium text-white">
                  {appr.title}
                </td>
                <td className="py-3.5 px-4 font-sans text-xs text-neutral-400 whitespace-nowrap">
                  {appr.type}
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <img src={appr.requester.avatar} alt={appr.requester.name} className="w-6 h-6 rounded-full object-cover" />
                    <span className="font-sans font-medium text-white whitespace-nowrap">{appr.requester.name}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-sans text-xs text-neutral-300">
                  {appr.currentStep}
                </td>
                <td className="py-3.5 px-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-sans font-medium whitespace-nowrap ${
                    appr.status === "Pending"
                      ? "bg-amber-500/20 text-amber-300"
                      : appr.status === "Approved"
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-red-500/20 text-red-300"
                  }`}>
                    {appr.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedApproval(appr)}
                    className="px-3 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white font-sans font-medium text-xs cursor-pointer transition-colors"
                  >
                    Inspect
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* APPROVAL REVIEW MODAL WITH SPRING ANIMATION */}
      <AnimatePresence>
        {selectedApproval && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
              className="bg-[#121216] border border-white/[0.12] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 text-xs text-left"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <span className="text-xs font-sans font-semibold text-teal-400 uppercase tracking-wider">
                  Review Request • {selectedApproval.type}
                </span>
                <button onClick={() => setSelectedApproval(null)} className="text-neutral-400 hover:text-white cursor-pointer">✕</button>
              </div>

              <div>
                <h3 className="text-xl font-sans font-semibold text-white tracking-tight mb-2">{selectedApproval.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{selectedApproval.justification}</p>
              </div>

              {/* Approval Chain Steps */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-3 font-sans text-xs">
                <div className="text-neutral-500 uppercase text-[10px] font-sans font-medium">Multi-Step Sign-off Chain:</div>
                <div className="flex items-center gap-3 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Step 1: Department Manager Sign-off (Verified)</span>
                </div>
                <div className="flex items-center gap-3 text-amber-400">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>Step 2: {selectedApproval.currentStep} (Awaiting Decision)</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-500">
                  <span className="w-4 h-4 rounded-full border border-neutral-700 flex items-center justify-center text-[9px]">3</span>
                  <span>Step 3: Executive Ledger Synchronization</span>
                </div>
              </div>

              {/* Actions */}
              {selectedApproval.status === "Pending" ? (
                <div className="space-y-3 pt-2">
                  <input
                    type="text"
                    placeholder="Optional review note or compliance reason..."
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white text-xs font-sans focus:outline-none focus:border-teal-500"
                  />

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        approveRequest(selectedApproval.id, rejectReason);
                        setSelectedApproval(null);
                      }}
                      className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Approve Request
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        rejectRequest(selectedApproval.id, rejectReason || "Rejected by reviewer");
                        setSelectedApproval(null);
                      }}
                      className="flex-1 py-3 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject Request
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="p-3 text-center font-sans text-neutral-400">
                  This request is marked as <strong className="text-white">{selectedApproval.status}</strong>.
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
