"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import { ActivityEvent } from "@/lib/demoData";
import ThreeDCard from "@/components/motion/ThreeDCard";
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
  ShieldCheck,
  Fingerprint,
  Layers,
  Database
} from "lucide-react";

export default function ActivityLogPage() {
  const { activities, activeOrg } = useWorkspace();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResourceType, setSelectedResourceType] = useState<string>("ALL");
  const [selectedEvent, setSelectedEvent] = useState<ActivityEvent | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const resourceTypes = [
    { key: "ALL", label: "All Activities" },
    { key: "Audit", label: "Audits" },
    { key: "Finance", label: "Finance" },
    { key: "Project", label: "Projects" },
    { key: "Approval", label: "Approvals" },
    { key: "Security", label: "Security" },
  ];

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
      return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20";
    }
    if (action.includes("Rejected") || action.includes("Deleted")) {
      return "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20";
    }
    if (action.includes("Updated") || action.includes("Modified") || action.includes("Moved")) {
      return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20";
    }
    return "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20";
  };

  const uniqueActors = new Set(activities.map((a) => a.actor)).size;

  const kpis = [
    {
      title: "Immutable Event Stream",
      value: activities.length.toString(),
      subtext: "Append-only ledger entries",
      icon: Clock,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-500/10",
      glare: "#6366f1",
      badge: "Real-time sync",
    },
    {
      title: "Authenticated Actors",
      value: uniqueActors.toString(),
      subtext: "Verified digital identities",
      icon: Fingerprint,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
      glare: "#10b981",
      badge: "TLS 1.3 sealed",
    },
    {
      title: "Cryptographic Seal",
      value: "100%",
      subtext: "HMAC SHA-256 verified",
      icon: ShieldCheck,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10",
      glare: "#3b82f6",
      badge: "Zero tampering",
    },
    {
      title: "Compliance Retention",
      value: "7 Yrs",
      subtext: "Statutory WORM archive",
      icon: Database,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10",
      glare: "#f59e0b",
      badge: "SOC-2 Type II",
    },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-neutral-700">
              <Clock className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" /> Immutable Event Stream
            </span>
            <span className="text-xs text-slate-500 dark:text-neutral-400">Append-Only Audit Ledger</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-sans font-semibold tracking-tight text-slate-950 dark:text-neutral-100">
            Activity & Governance Trail
          </h1>
          <p className="text-sm text-slate-500 dark:text-neutral-400 mt-1 max-w-2xl">
            Cryptographically sealed system audit events, user authorizations, state mutations, and API invocations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-medium text-slate-800 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-neutral-800 transition cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4 text-slate-500 dark:text-neutral-400" />
            Export Audit Trail (CSV)
          </motion.button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <ThreeDCard key={idx} glareColor={kpi.glare} maxTilt={6} elevationZ={12} className="h-full">
              <div className="p-5 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] flex flex-col justify-between h-full shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[11px] font-sans font-semibold text-slate-500 dark:text-neutral-400 uppercase tracking-wider">
                    {kpi.title}
                  </div>
                  <div className={`p-2 rounded-xl ${kpi.bg} ${kpi.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <div className="font-sans text-3xl sm:text-4xl lg:text-5xl font-normal sm:font-medium tracking-tight text-slate-950 dark:text-white tabular-nums my-1.5">
                    {kpi.value}
                  </div>
                </div>
              </div>
            </ThreeDCard>
          );
        })}
      </div>

      {/* Filter and Search Bar with Sliding Spring Pills */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 dark:text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search actors, actions, targets..."
            className="w-full bg-white dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-neutral-200 placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-amber-500/50 shadow-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {resourceTypes.map((type) => {
            const isSelected = selectedResourceType === type.key;
            return (
              <motion.button
                key={type.key}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedResourceType(type.key)}
                className={`relative px-3 py-1.5 rounded-xl transition-colors cursor-pointer text-xs font-sans font-medium ${
                  isSelected
                    ? "text-slate-950 dark:text-white"
                    : "text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activityResourceTypeIndicator"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-xl bg-slate-200/80 dark:bg-white/10 border border-slate-300 dark:border-white/10 shadow-xs z-0"
                  />
                )}
                <span className="relative z-10">{type.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Activity Log Feed / Table */}
      <div className="rounded-2xl bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-white/[0.08] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/[0.08] bg-slate-50/70 dark:bg-white/[0.02] text-[11px] font-sans font-semibold text-slate-500 dark:text-neutral-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Actor</th>
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4">Target Resource</th>
                <th className="py-3.5 px-4">Scope</th>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04] text-xs">
              {filteredActivities.map((act) => (
                <motion.tr
                  key={act.id}
                  whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.03)" }}
                  onClick={() => setSelectedEvent(act)}
                  className="cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 flex items-center justify-center text-[10px] font-bold text-slate-700 dark:text-neutral-300">
                        {act.actor.slice(0, 1)}
                      </span>
                      <span className="font-sans font-medium text-slate-900 dark:text-neutral-200">{act.actor}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-sans font-medium border ${getActionBadge(
                        act.action
                      )}`}
                    >
                      {act.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-sans font-medium text-slate-800 dark:text-neutral-300">{act.target}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-[10px] font-sans font-medium text-slate-600 dark:text-neutral-400">
                      {act.resourceType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-neutral-400 whitespace-nowrap font-sans text-xs">{act.timestamp}</td>
                  <td className="py-3.5 px-4 text-right">
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(act);
                      }}
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800 text-slate-400 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* METADATA DIFF DRAWER / MODAL WITH ANIMATEPRESENCE */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-xs cursor-pointer"
            />

            {/* Dialog Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
              className="relative bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl z-10"
            >
              <div className="flex items-start justify-between border-b border-slate-200 dark:border-neutral-800 pb-4">
                <div>
                  <span className="font-sans text-xs text-amber-600 dark:text-amber-400 font-semibold">{selectedEvent.id}</span>
                  <h2 className="text-xl font-medium text-slate-950 dark:text-neutral-100 mt-0.5">
                    {selectedEvent.actor} — {selectedEvent.action}
                  </h2>
                  <div className="text-xs text-slate-500 dark:text-neutral-400 mt-1 font-sans">
                    Target: {selectedEvent.target} • {selectedEvent.timestamp}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedEvent(null)}
                  className="p-1.5 rounded-lg text-slate-400 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Event Payload & Integrity Seal */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 space-y-3 font-sans text-xs">
                <div className="flex items-center justify-between text-slate-500 dark:text-neutral-500 pb-2 border-b border-slate-200 dark:border-neutral-800 text-[11px] font-sans font-medium">
                  <span>AUDIT RECORD CRYPTOGRAPHIC HASH</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">IMMUTABLE (SEALED)</span>
                </div>
                <div className="space-y-1 text-slate-700 dark:text-neutral-300 text-[11px] font-sans">
                  <div>Event ID: {selectedEvent.id}</div>
                  <div>Resource Type: {selectedEvent.resourceType}</div>
                  <div>Origin IP: 198.51.100.42 (TLS 1.3 / Verified Client)</div>
                  <div>HMAC Signature: <code className="bg-slate-200 dark:bg-neutral-900 px-1 py-0.5 rounded text-[11px]">e7b2f901...a84f3c92</code></div>
                  <div>State Snapshot: {selectedEvent.metadata || "Standard mutation record preserved in tenant archive."}</div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => copyToClipboard("event_json", JSON.stringify(selectedEvent, null, 2))}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-800 dark:text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer border border-slate-200 dark:border-transparent transition"
                >
                  {copiedId === "event_json" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  Copy Event JSON
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedEvent(null)}
                  className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-400 text-white dark:text-black text-xs font-semibold shadow-md cursor-pointer transition"
                >
                  Dismiss
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
