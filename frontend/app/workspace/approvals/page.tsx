"use client";

import { useState } from "react";
import { useWorkspace } from "@/context/WorkspaceContext";
import { ApprovalRequest } from "@/lib/demoData";
import {
  FileCheck2,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  UserCheck,
  AlertCircle,
  DollarSign
} from "lucide-react";

export default function ApprovalsPage() {
  const { approvals, approveRequest, rejectRequest, currentRole } = useWorkspace();

  const [statusFilter, setStatusFilter] = useState<"All" | "Pending" | "Approved" | "Rejected">("Pending");
  const [selectedApproval, setSelectedApproval] = useState<ApprovalRequest | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const filteredApprovals = approvals.filter(
    (a) => statusFilter === "All" || a.status === statusFilter
  );

  return (
    <div className="space-y-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-teal-400 block mb-1">
            Governance & Sign-Offs
          </span>
          <h1 className="text-3xl font-serif text-[#f5f5f3] font-normal">Reusable Approval Workflow Engine</h1>
        </div>

        <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl p-1 text-xs font-mono">
          {(["Pending", "Approved", "Rejected", "All"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                statusFilter === st ? "bg-white text-neutral-950 font-semibold" : "text-neutral-400 hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Approvals Table */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c0e] overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-white/[0.08] bg-white/[0.02] text-neutral-400 font-mono uppercase tracking-wider text-[10px]">
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
              <tr key={appr.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 px-4 font-medium text-white">
                  {appr.title}
                </td>
                <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-400">
                  {appr.type}
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <img src={appr.requester.avatar} alt={appr.requester.name} className="w-6 h-6 rounded-full object-cover" />
                    <span>{appr.requester.name}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-mono text-neutral-400 text-[11px]">
                  {appr.currentStep}
                </td>
                <td className="py-3.5 px-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono ${
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
                  <button
                    onClick={() => setSelectedApproval(appr)}
                    className="px-3 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white font-mono"
                  >
                    Inspect
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* APPROVAL REVIEW MODAL */}
      {selectedApproval && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121216] border border-white/[0.12] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 text-xs text-left">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest">
                Review Request • {selectedApproval.type}
              </span>
              <button onClick={() => setSelectedApproval(null)} className="text-neutral-400 hover:text-white">✕</button>
            </div>

            <div>
              <h3 className="text-xl font-serif text-white font-normal mb-2">{selectedApproval.title}</h3>
              <p className="text-xs text-neutral-400">{selectedApproval.justification}</p>
            </div>

            {/* Approval Chain Steps */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-3 font-mono text-[11px]">
              <div className="text-neutral-500 uppercase text-[10px]">Multi-Step Sign-off Chain:</div>
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
                  className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white text-xs"
                />

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      approveRequest(selectedApproval.id, rejectReason);
                      setSelectedApproval(null);
                    }}
                    className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Approve Request
                  </button>
                  <button
                    onClick={() => {
                      rejectRequest(selectedApproval.id, rejectReason || "Rejected by reviewer");
                      setSelectedApproval(null);
                    }}
                    className="flex-1 py-3 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject Request
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-3 text-center font-mono text-neutral-400">
                This request is marked as <strong className="text-white">{selectedApproval.status}</strong>.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
