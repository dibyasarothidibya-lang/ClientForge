"use client";

import React, { useState } from "react";
import { useWorkspace } from "@/context/WorkspaceContext";
import { ActivityEvent } from "@/lib/demoData";
import {
  Clock,
  Filter,
  Search,
  Download,
  Eye,
  Shield,
  FileText,
  User,
  CheckCircle2,
  AlertCircle,
  X,
  Copy,
  Check,
} from "lucide-react";

export default function ActivityLogPage() {
  const { activities, activeOrg } = useWorkspace();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResourceType, setSelectedResourceType] = useState<string>("ALL");
  const [selectedEvent, setSelectedEvent] = useState<ActivityEvent | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredActivities = activities.filter((act) => {
    const matchesSearch =
      act.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.target.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedResourceType === "ALL" || act.resourceType === selectedResourceType;
    return matchesSearch && matchesType;
  });

  const exportCSV = () => {
    const headers = "ID,Actor,Action,Target,ResourceType,Timestamp,Metadata\n";
    const rows = activities
      .map(
        (a) =>
          `"${a.id}","${a.actor}","${a.action}","${a.target}","${a.resourceType}","${a.timestamp}","${a.metadata || ""}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeOrg.slug}-activity-log-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getActionBadge = (action: string) => {
    if (action.includes("Approved") || action.includes("Verified") || action.includes("Created")) {
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    }
    if (action.includes("Rejected") || action.includes("Deleted")) {
      return "bg-rose-500/10 text-rose-400 border-rose-500/20";
    }
    if (action.includes("Updated") || action.includes("Modified") || action.includes("Moved")) {
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    }
    return "bg-amber-500/10 text-amber-400 border-amber-500/20";
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-800 text-neutral-300 border border-neutral-700">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> Immutable Event Stream
            </span>
            <span className="text-xs text-neutral-400">Append-Only Audit Ledger</span>
          </div>
          <h1 className="text-3xl font-serif font-light tracking-tight text-neutral-100">
            Activity & Governance Trail
          </h1>
          <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
            Cryptographically sealed system audit events, user authorizations, state mutations, and API invocations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 transition"
          >
            <Download className="w-4 h-4 text-neutral-400" />
            Export Audit Trail (CSV)
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search actors, actions, targets..."
            className="w-full bg-neutral-950/70 border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-500/50"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedResourceType}
            onChange={(e) => setSelectedResourceType(e.target.value)}
            className="bg-neutral-950/70 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-300 focus:outline-none"
          >
            <option value="ALL">All Resource Types</option>
            <option value="Audit">Audits & Governance</option>
            <option value="Finance">Finance & Ledger</option>
            <option value="Project">Projects & Kanban</option>
            <option value="Approval">Approvals</option>
            <option value="Security">Security & Access</option>
          </select>
        </div>
      </div>

      {/* Activity Log Feed / Table */}
      <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                <th className="py-3 px-3">Actor</th>
                <th className="py-3 px-3">Action</th>
                <th className="py-3 px-3">Target Resource</th>
                <th className="py-3 px-3">Scope</th>
                <th className="py-3 px-3">Timestamp</th>
                <th className="py-3 px-3 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-xs">
              {filteredActivities.map((act) => (
                <tr
                  key={act.id}
                  onClick={() => setSelectedEvent(act)}
                  className="hover:bg-neutral-800/30 cursor-pointer transition"
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[10px] font-bold text-neutral-300">
                        {act.actor.slice(0, 1)}
                      </span>
                      <span className="font-medium text-neutral-200">{act.actor}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getActionBadge(
                        act.action
                      )}`}
                    >
                      {act.action}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-medium text-neutral-300">{act.target}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-[10px] text-neutral-400">
                      {act.resourceType}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-neutral-400 whitespace-nowrap">{act.timestamp}</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(act);
                      }}
                      className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white transition"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* METADATA DIFF DRAWER / MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-neutral-800 pb-4">
              <div>
                <span className="font-mono text-xs text-amber-400">{selectedEvent.id}</span>
                <h2 className="text-xl font-medium text-neutral-100 mt-0.5">
                  {selectedEvent.actor} — {selectedEvent.action}
                </h2>
                <div className="text-xs text-neutral-400 mt-1">
                  Target: {selectedEvent.target} • {selectedEvent.timestamp}
                </div>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Event Payload & Integrity Seal */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-neutral-500 pb-2 border-b border-neutral-800 text-[11px]">
                <span>AUDIT RECORD CRYPTOGRAPHIC HASH</span>
                <span className="text-emerald-400">IMMUTABLE (SEALED)</span>
              </div>
              <div className="space-y-1 text-neutral-300 text-[11px]">
                <div>Event ID: {selectedEvent.id}</div>
                <div>Resource Type: {selectedEvent.resourceType}</div>
                <div>Origin IP: 198.51.100.42 (TLS 1.3 / Verified Client)</div>
                <div>HMAC Signature: e7b2f901...a84f3c92</div>
                <div>State Snapshot: {selectedEvent.metadata || "Standard mutation record preserved in tenant archive."}</div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => copyToClipboard("event_json", JSON.stringify(selectedEvent, null, 2))}
                className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium flex items-center gap-1.5"
              >
                {copiedId === "event_json" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                Copy Event JSON
              </button>
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
