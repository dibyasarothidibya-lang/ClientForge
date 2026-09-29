"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import { AuditFinding, Audit } from "@/lib/demoData";
import ThreeDCard from "@/components/motion/ThreeDCard";
import {
  Shield,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  ChevronRight,
  X,
  FileText,
  AlertCircle,
  Sliders,
  Check,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

function AuditsContent() {
  const { audits, findings, addFinding, updateFindingStatus } = useWorkspace();
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = searchParams.get("tab") as "matrix" | "findings" | "audits" | null;
  const searchParam = searchParams.get("search") || searchParams.get("q") || "";

  const [activeTab, setActiveTab] = useState<"matrix" | "findings" | "audits">(
    tabParam || (searchParam ? "findings" : "matrix")
  );
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [selectedSeverity, setSelectedSeverity] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedMatrixCell, setSelectedMatrixCell] = useState<{ likelihood: string; impact: string } | null>(null);

  // Synchronize when URL query parameters update
  useEffect(() => {
    const q = searchParams.get("search") || searchParams.get("q");
    const t = searchParams.get("tab");
    if (t === "matrix" || t === "findings" || t === "audits") {
      setActiveTab(t);
    } else if (q) {
      setActiveTab("findings");
    }
    if (q !== null && q !== undefined) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  // Detail Modal State
  const [selectedFinding, setSelectedFinding] = useState<AuditFinding | null>(null);

  // Create Finding Modal State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newSeverity, setNewSeverity] = useState<AuditFinding["severity"]>("Medium");
  const [newLikelihood, setNewLikelihood] = useState<AuditFinding["likelihood"]>("Medium");
  const [newImpact, setNewImpact] = useState<AuditFinding["impact"]>("Medium");
  const [newDepartment, setNewDepartment] = useState("Finance & Procurement");
  const [newOwner, setNewOwner] = useState("Sarah Jenkins");
  const [newDueDate, setNewDueDate] = useState("2026-05-15");
  const [newCorrective, setNewCorrective] = useState("");

  // Metrics
  const totalFindings = findings.length;
  const openFindings = findings.filter((f) => f.status === "Open" || f.status === "In Progress").length;
  const highCritical = findings.filter((f) => f.severity === "High" || f.severity === "Critical").length;
  const resolvedCount = findings.filter((f) => f.status === "Resolved" || f.status === "Verified").length;
  const complianceRate = totalFindings ? Math.round((resolvedCount / totalFindings) * 100) : 100;

  // Filter findings with UN SDG code and parent audit awareness
  const filteredFindings = findings.filter((f) => {
    const q = searchQuery.toLowerCase().trim();
    const parentAudit = audits.find((a) => a.id === f.auditId);
    const auditCodeMatches = parentAudit?.code.toLowerCase().includes(q);
    const auditTitleMatches = parentAudit?.title.toLowerCase().includes(q);

    const matchesSearch =
      !q ||
      f.title.toLowerCase().includes(q) ||
      f.owner.toLowerCase().includes(q) ||
      f.department.toLowerCase().includes(q) ||
      f.description.toLowerCase().includes(q) ||
      f.correctiveAction.toLowerCase().includes(q) ||
      f.evidenceNotes.toLowerCase().includes(q) ||
      f.auditId.toLowerCase().includes(q) ||
      f.id.toLowerCase().includes(q) ||
      Boolean(auditCodeMatches) ||
      Boolean(auditTitleMatches);

    const matchesSeverity = selectedSeverity === "ALL" || f.severity === selectedSeverity;
    const matchesStatus = selectedStatus === "ALL" || f.status === selectedStatus;
    const matchesCell =
      !selectedMatrixCell ||
      (f.likelihood === selectedMatrixCell.likelihood && f.impact === selectedMatrixCell.impact);
    return matchesSearch && matchesSeverity && matchesStatus && matchesCell;
  });

  // Filter scheduled audits
  const filteredAudits = audits.filter((a) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      a.title.toLowerCase().includes(q) ||
      a.code.toLowerCase().includes(q) ||
      a.department.toLowerCase().includes(q) ||
      a.id.toLowerCase().includes(q) ||
      a.leadAuditor.name.toLowerCase().includes(q) ||
      a.status.toLowerCase().includes(q)
    );
  });

  const handleCreateFinding = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addFinding({
      auditId: audits[0]?.id || "audit_fin_2026",
      title: newTitle,
      description: newDesc || "Documented during scheduled periodic internal control evaluation.",
      severity: newSeverity,
      likelihood: newLikelihood,
      impact: newImpact,
      status: "Open",
      owner: newOwner,
      department: newDepartment,
      dueDate: newDueDate,
      correctiveAction: newCorrective || "Initiate remediation plan within 10 business days.",
      evidenceNotes: "Fieldwork evidence log attached to audit trail.",
    });

    setNewTitle("");
    setNewDesc("");
    setNewCorrective("");
    setIsCreateOpen(false);
  };

  const getSeverityBadge = (sev: AuditFinding["severity"]) => {
    switch (sev) {
      case "Critical":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";
      case "High":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "Medium":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Low":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    }
  };

  const getStatusBadge = (status: AuditFinding["status"]) => {
    switch (status) {
      case "Open":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "In Progress":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Resolved":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Verified":
        return "bg-neutral-800 text-neutral-300 border-neutral-700";
    }
  };

  const getCellFindings = (likelihood: "Low" | "Medium" | "High", impact: "Low" | "Medium" | "High") => {
    return findings.filter((f) => f.likelihood === likelihood && f.impact === impact);
  };

  const getCellColor = (likelihood: string, impact: string) => {
    const isSelected =
      selectedMatrixCell?.likelihood === likelihood && selectedMatrixCell?.impact === impact;
    const border = isSelected ? "ring-2 ring-amber-400 shadow-lg shadow-amber-500/10" : "";

    if (impact === "High" && (likelihood === "High" || likelihood === "Medium")) {
      return `bg-rose-950/40 border-rose-800/40 hover:bg-rose-900/50 ${border}`;
    }
    if ((impact === "High" && likelihood === "Low") || (impact === "Medium" && likelihood === "High") || (impact === "Medium" && likelihood === "Medium")) {
      return `bg-amber-950/30 border-amber-800/40 hover:bg-amber-900/40 ${border}`;
    }
    return `bg-emerald-950/20 border-emerald-900/30 hover:bg-emerald-900/30 ${border}`;
  };

  const exportCSV = () => {
    const headers = "ID,Title,Severity,Likelihood,Impact,Status,Owner,Department,DueDate,CorrectiveAction\n";
    const rows = findings
      .map(
        (f) =>
          `"${f.id}","${f.title.replace(/"/g, '""')}","${f.severity}","${f.likelihood}","${f.impact}","${f.status}","${f.owner}","${f.department}","${f.dueDate}","${f.correctiveAction.replace(/"/g, '""')}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-findings-report-${new Date().toISOString().slice(0, 10)}.csv`;
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
              <Shield className="w-3.5 h-3.5" /> Standout Audit Engine
            </span>
            <span className="text-xs text-neutral-400">Enterprise Governance & Controls</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-sans font-semibold tracking-tight text-neutral-100">
            Internal Audit & Compliance
          </h1>
          <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
            Proactive risk matrix mapping, multi-tiered finding registries, and automated corrective action workflows.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 transition cursor-pointer"
          >
            <Download className="w-4 h-4 text-neutral-400" />
            Export Audit Package
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold shadow-md shadow-amber-500/20 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Record Finding
          </motion.button>
        </div>
      </div>

      {/* 4 PRIMARY KPI CARDS WITH 3D TILT & LANDING PAGE NUMERIC TYPOGRAPHY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Audits */}
        <ThreeDCard glareColor="#3b82f6" maxTilt={8} elevationZ={15} className="h-full">
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur hover:border-blue-500/40 transition-colors flex flex-col justify-between h-full group">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider font-sans">Active Audits</span>
                <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                  <Shield className="w-4 h-4" />
                </span>
              </div>
              <div className="font-sans text-3xl sm:text-4xl lg:text-5xl font-normal sm:font-medium tracking-tight text-white tabular-nums my-2">
                {audits.length}
              </div>
            </div>
          </div>
        </ThreeDCard>

        {/* Open Findings */}
        <ThreeDCard glareColor="#f43f5e" maxTilt={8} elevationZ={15} className="h-full">
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur hover:border-rose-500/40 transition-colors flex flex-col justify-between h-full group">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider font-sans">Open Findings</span>
                <span className="p-2 rounded-lg bg-rose-500/10 text-rose-400 group-hover:scale-110 transition-transform">
                  <AlertCircle className="w-4 h-4" />
                </span>
              </div>
              <div className="font-sans text-3xl sm:text-4xl lg:text-5xl font-normal sm:font-medium tracking-tight text-white tabular-nums my-2">
                {openFindings}
              </div>
            </div>
          </div>
        </ThreeDCard>

        {/* Remediated & Closed */}
        <ThreeDCard glareColor="#10b981" maxTilt={8} elevationZ={15} className="h-full">
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur hover:border-emerald-500/40 transition-colors flex flex-col justify-between h-full group">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider font-sans">Remediated & Closed</span>
                <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
              </div>
              <div className="font-sans text-3xl sm:text-4xl lg:text-5xl font-normal sm:font-medium tracking-tight text-white tabular-nums my-2">
                {resolvedCount}
              </div>
            </div>
          </div>
        </ThreeDCard>

        {/* Compliance Index */}
        <ThreeDCard glareColor="#f59e0b" maxTilt={8} elevationZ={15} className="h-full">
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur hover:border-amber-500/40 transition-colors flex flex-col justify-between h-full group">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider font-sans">Compliance Index</span>
                <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                  <Sliders className="w-4 h-4" />
                </span>
              </div>
              <div className="font-sans text-3xl sm:text-4xl lg:text-5xl font-normal sm:font-medium tracking-tight text-amber-400 tabular-nums my-2">
                {complianceRate}%
              </div>
            </div>
          </div>
        </ThreeDCard>
      </div>

      {/* Active Filter Banner when routed from public campaign or search */}
      {searchQuery && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs font-sans shadow-lg"
        >
          <div className="flex items-center gap-3 text-amber-300">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Shield className="w-4 h-4" />
            </span>
            <div>
              <div className="font-semibold text-white flex items-center gap-2">
                <span>Active UN Audit & Inspection Filter:</span>
                <span className="px-2 py-0.5 rounded-md bg-black/60 border border-amber-500/40 text-amber-300 font-semibold font-sans text-xs">
                  {searchQuery}
                </span>
              </div>
              <p className="text-neutral-400 text-[11px] mt-0.5">
                Showing verified UN SDG compliance audits, fieldwork evidence logs, and corrective action workflows.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-neutral-400 text-xs font-medium">
              {filteredFindings.length} finding{filteredFindings.length === 1 ? "" : "s"} matched
            </span>
            <button
              onClick={() => {
                setSearchQuery("");
                router.push("/workspace/audits");
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 text-xs font-medium transition cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear Filter</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Tabs Navigation with Spring Sliding Pill */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-2 relative font-sans text-xs font-medium">
        {[
          { id: "matrix", label: "3×3 Heatmap Risk Matrix" },
          { id: "findings", label: `Findings Registry (${filteredFindings.length}${searchQuery ? ` / ${findings.length}` : ""})` },
          { id: "audits", label: `Scheduled Audits (${filteredAudits.length}${searchQuery ? ` / ${audits.length}` : ""})` },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative px-4 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                isActive ? "text-white font-semibold" : "text-neutral-400 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="auditsTabIndicator"
                  className="absolute inset-0 bg-neutral-800 rounded-lg shadow-sm"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* TAB 1: 3x3 RISK MATRIX */}
      {activeTab === "matrix" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-base font-medium text-neutral-100">
                  Risk Heatmap Matrix (Likelihood vs. Impact)
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Click any quadrant to isolate mapped findings in the table below.
                </p>
              </div>

              {selectedMatrixCell && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-300">
                    Filtered: <strong>{selectedMatrixCell.likelihood} Likelihood</strong> /{" "}
                    <strong>{selectedMatrixCell.impact} Impact</strong>
                  </span>
                  <button
                    onClick={() => setSelectedMatrixCell(null)}
                    className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 text-xs flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" /> Clear filter
                  </button>
                </div>
              )}
            </div>

            {/* Matrix Grid */}
            <div className="grid grid-cols-12 gap-3 max-w-4xl mx-auto">
              <div className="col-span-2 flex flex-col justify-around text-right pr-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                <div className="text-rose-400">High Impact</div>
                <div className="text-amber-400">Med Impact</div>
                <div className="text-emerald-400">Low Impact</div>
              </div>

              <div className="col-span-10 grid grid-cols-3 gap-3">
                {(["Low", "Medium", "High"] as const).map((lik) => {
                  const cellFindings = getCellFindings(lik, "High");
                  return (
                    <div
                      key={`High-${lik}`}
                      onClick={() =>
                        setSelectedMatrixCell(
                          selectedMatrixCell?.likelihood === lik && selectedMatrixCell?.impact === "High"
                            ? null
                            : { likelihood: lik, impact: "High" }
                        )
                      }
                      className={`p-4 rounded-xl border cursor-pointer transition min-h-[105px] flex flex-col justify-between ${getCellColor(
                        lik,
                        "High"
                      )}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-medium text-neutral-300">
                          {lik} Likelihood
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-neutral-900/80 border border-neutral-700 text-white">
                          {cellFindings.length}
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-neutral-400 truncate">
                        {cellFindings.length > 0 ? (
                          cellFindings.map((f) => f.title).join(", ")
                        ) : (
                          <span className="text-neutral-600 italic">No open findings</span>
                        )}
                      </div>
                    </div>
                  );
                })}

                {(["Low", "Medium", "High"] as const).map((lik) => {
                  const cellFindings = getCellFindings(lik, "Medium");
                  return (
                    <div
                      key={`Medium-${lik}`}
                      onClick={() =>
                        setSelectedMatrixCell(
                          selectedMatrixCell?.likelihood === lik && selectedMatrixCell?.impact === "Medium"
                            ? null
                            : { likelihood: lik, impact: "Medium" }
                        )
                      }
                      className={`p-4 rounded-xl border cursor-pointer transition min-h-[105px] flex flex-col justify-between ${getCellColor(
                        lik,
                        "Medium"
                      )}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-medium text-neutral-300">
                          {lik} Likelihood
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-neutral-900/80 border border-neutral-700 text-white">
                          {cellFindings.length}
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-neutral-400 truncate">
                        {cellFindings.length > 0 ? (
                          cellFindings.map((f) => f.title).join(", ")
                        ) : (
                          <span className="text-neutral-600 italic">No open findings</span>
                        )}
                      </div>
                    </div>
                  );
                })}

                {(["Low", "Medium", "High"] as const).map((lik) => {
                  const cellFindings = getCellFindings(lik, "Low");
                  return (
                    <div
                      key={`Low-${lik}`}
                      onClick={() =>
                        setSelectedMatrixCell(
                          selectedMatrixCell?.likelihood === lik && selectedMatrixCell?.impact === "Low"
                            ? null
                            : { likelihood: lik, impact: "Low" }
                        )
                      }
                      className={`p-4 rounded-xl border cursor-pointer transition min-h-[105px] flex flex-col justify-between ${getCellColor(
                        lik,
                        "Low"
                      )}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-medium text-neutral-300">
                          {lik} Likelihood
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-neutral-900/80 border border-neutral-700 text-white">
                          {cellFindings.length}
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-neutral-400 truncate">
                        {cellFindings.length > 0 ? (
                          cellFindings.map((f) => f.title).join(", ")
                        ) : (
                          <span className="text-neutral-600 italic">No open findings</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="col-span-2"></div>
              <div className="col-span-10 grid grid-cols-3 gap-3 pt-2 text-center text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                <div>Low Likelihood</div>
                <div>Med Likelihood</div>
                <div>High Likelihood</div>
              </div>
            </div>
          </div>

          {/* Connected Table */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-neutral-200">
                Quadrant Findings Registry ({filteredFindings.length})
              </h3>
              {selectedMatrixCell && (
                <span className="text-xs text-amber-400 font-medium">Filtered by active matrix selection</span>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-800 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                    <th className="py-3 px-3">Severity</th>
                    <th className="py-3 px-3">Finding Description</th>
                    <th className="py-3 px-3">Likelihood / Impact</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Owner</th>
                    <th className="py-3 px-3">Due Date</th>
                    <th className="py-3 px-3 text-right">Remediation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 text-xs">
                  {filteredFindings.map((f) => (
                    <tr
                      key={f.id}
                      onClick={() => setSelectedFinding(f)}
                      className="hover:bg-neutral-800/30 cursor-pointer transition"
                    >
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${getSeverityBadge(
                            f.severity
                          )}`}
                        >
                          {f.severity}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-medium text-neutral-200 max-w-sm">{f.title}</div>
                        <div className="text-[11px] text-neutral-400">{f.department}</div>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-neutral-400">
                        {f.likelihood} / {f.impact}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusBadge(
                            f.status
                          )}`}
                        >
                          {f.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-neutral-300">{f.owner}</td>
                      <td className="py-3 px-3 text-neutral-400 whitespace-nowrap">{f.dueDate}</td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFinding(f);
                          }}
                          className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium"
                        >
                          View Plan
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FULL FINDINGS REGISTRY */}
      {activeTab === "findings" && (
        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search findings, owners, units..."
                className="w-full bg-neutral-950/70 border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="bg-neutral-950/70 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-300 focus:outline-none"
              >
                <option value="ALL">All Severities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-neutral-950/70 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-300 focus:outline-none"
              >
                <option value="ALL">All Statuses</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Verified">Verified</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                  <th className="py-3 px-3">Finding Ref</th>
                  <th className="py-3 px-3">Severity</th>
                  <th className="py-3 px-3">Title & Context</th>
                  <th className="py-3 px-3">Remediation Status</th>
                  <th className="py-3 px-3">Assignee</th>
                  <th className="py-3 px-3">Target Date</th>
                  <th className="py-3 px-3 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 text-xs">
                {filteredFindings.map((f) => {
                  const parentAudit = audits.find((a) => a.id === f.auditId);
                  return (
                    <tr
                      key={f.id}
                      onClick={() => setSelectedFinding(f)}
                      className="hover:bg-neutral-800/30 cursor-pointer transition"
                    >
                      <td className="py-3 px-3 font-sans text-xs text-neutral-400 whitespace-nowrap">
                        <div className="font-semibold text-neutral-300">{f.id}</div>
                        {parentAudit && (
                          <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-neutral-800 text-amber-400/90 border border-neutral-700">
                            {parentAudit.code}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${getSeverityBadge(
                            f.severity
                          )}`}
                        >
                          {f.severity}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-medium text-neutral-200">{f.title}</div>
                        <div className="text-[11px] text-neutral-400 truncate max-w-md">{f.description}</div>
                      </td>
                      <td className="py-3 px-3">
                        <select
                          value={f.status}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) =>
                            updateFindingStatus(f.id, e.target.value as AuditFinding["status"])
                          }
                          className="bg-neutral-950 border border-neutral-800 text-xs rounded px-2 py-1 text-neutral-200 focus:outline-none focus:border-amber-500"
                        >
                          <option value="Open">Open</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                          <option value="Verified">Verified</option>
                        </select>
                      </td>
                      <td className="py-3 px-3 text-neutral-300">{f.owner}</td>
                      <td className="py-3 px-3 text-neutral-400">{f.dueDate}</td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFinding(f);
                          }}
                          className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredFindings.length === 0 && (
              <div className="p-8 text-center text-xs text-neutral-400">
                No findings match the current filter "{searchQuery}".
                <button
                  onClick={() => setSearchQuery("")}
                  className="ml-2 text-amber-400 underline cursor-pointer"
                >
                  Clear filter
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: SCHEDULED AUDITS */}
      {activeTab === "audits" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAudits.map((audit) => (
              <div
                key={audit.id}
                className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur space-y-4 hover:border-neutral-700 transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-sans font-semibold text-xs text-amber-400">{audit.code}</span>
                    <h3 className="text-lg font-medium text-neutral-100 mt-1">{audit.title}</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">{audit.department}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-300 border border-neutral-700">
                    {audit.status}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5">
                    <span>Fieldwork Completion</span>
                    <span className="font-semibold text-neutral-200">{audit.progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                      style={{ width: `${audit.progress}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-neutral-800/80 text-xs">
                  <div>
                    <div className="text-neutral-500">Lead Auditor</div>
                    <div className="text-neutral-200 font-medium mt-0.5">{audit.leadAuditor.name}</div>
                  </div>
                  <div>
                    <div className="text-neutral-500">Report Due</div>
                    <div className="text-neutral-200 font-medium mt-0.5">{audit.dueDate}</div>
                  </div>
                  <div>
                    <div className="text-neutral-500">Total Findings</div>
                    <div className="text-neutral-200 font-medium mt-0.5">{audit.findingsCount}</div>
                  </div>
                  <div>
                    <div className="text-neutral-500">Critical Risks</div>
                    <div className="text-rose-400 font-medium mt-0.5">{audit.criticalCount} requiring board escalation</div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      setSearchQuery(audit.code);
                      setActiveTab("findings");
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-medium border border-amber-500/20 transition cursor-pointer"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>View Findings ({findings.filter((f) => f.auditId === audit.id).length})</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {filteredAudits.length === 0 && (
            <div className="p-8 text-center rounded-2xl bg-neutral-900/40 border border-neutral-800 text-neutral-400 text-xs">
              No scheduled audits match "{searchQuery}".
              <button
                onClick={() => setSearchQuery("")}
                className="ml-2 text-amber-400 underline cursor-pointer"
              >
                Clear filter
              </button>
            </div>
          )}
        </div>
      )}

      {/* MODAL: FINDING DETAIL */}
      <AnimatePresence>
        {selectedFinding && (
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
              className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl"
            >
              <div className="flex items-start justify-between border-b border-neutral-800 pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getSeverityBadge(
                        selectedFinding.severity
                      )}`}
                    >
                      {selectedFinding.severity}
                    </span>
                    <span className="font-sans font-medium text-xs text-neutral-400">{selectedFinding.id}</span>
                    {audits.find((a) => a.id === selectedFinding.auditId) && (
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {audits.find((a) => a.id === selectedFinding.auditId)?.code}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-medium text-neutral-100">{selectedFinding.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedFinding(null)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="text-neutral-400 font-semibold uppercase tracking-wider mb-1 font-sans">Observation & Context</h4>
                  <p className="text-neutral-300 leading-relaxed bg-neutral-950 p-3 rounded-lg border border-neutral-800/80 font-sans">
                    {selectedFinding.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-neutral-400 font-semibold uppercase tracking-wider mb-1 font-sans">Agreed Corrective Action Plan</h4>
                  <p className="text-amber-300/90 leading-relaxed bg-amber-500/5 p-3 rounded-lg border border-amber-500/20 font-sans">
                    {selectedFinding.correctiveAction}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-sans">
                  <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800">
                    <div className="text-neutral-500 text-[10px] uppercase font-medium">Likelihood</div>
                    <div className="text-neutral-200 font-medium mt-1">{selectedFinding.likelihood}</div>
                  </div>
                  <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800">
                    <div className="text-neutral-500 text-[10px] uppercase font-medium">Impact</div>
                    <div className="text-neutral-200 font-medium mt-1">{selectedFinding.impact}</div>
                  </div>
                  <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800">
                    <div className="text-neutral-500 text-[10px] uppercase font-medium">Responsible Owner</div>
                    <div className="text-neutral-200 font-medium mt-1 truncate">{selectedFinding.owner}</div>
                  </div>
                  <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800">
                    <div className="text-neutral-500 text-[10px] uppercase font-medium">Target Closure</div>
                    <div className="text-neutral-200 font-medium mt-1">{selectedFinding.dueDate}</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-neutral-400 font-semibold uppercase tracking-wider mb-1 font-sans">Evidence Trail Notes</h4>
                  <p className="text-neutral-400 italic bg-neutral-950 p-3 rounded-lg border border-neutral-800/80 leading-relaxed font-sans">
                    {selectedFinding.evidenceNotes || "Attached sample receipts, workflow authorization logs, and ERP timestamps verified."}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-800 font-sans">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-400">Current Status:</span>
                  <select
                    value={selectedFinding.status}
                    onChange={(e) => {
                      updateFindingStatus(selectedFinding.id, e.target.value as AuditFinding["status"]);
                      setSelectedFinding({
                        ...selectedFinding,
                        status: e.target.value as AuditFinding["status"],
                      });
                    }}
                    className="bg-neutral-950 border border-neutral-800 text-xs rounded-lg px-2.5 py-1.5 text-neutral-200 focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Verified">Verified</option>
                  </select>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    updateFindingStatus(selectedFinding.id, "Resolved");
                    setSelectedFinding(null);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition cursor-pointer"
                >
                  <Check className="w-4 h-4" /> Mark Remediated
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL: CREATE FINDING */}
      <AnimatePresence>
        {isCreateOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.form
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
              onSubmit={handleCreateFinding}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-xl p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <h3 className="text-lg font-medium text-neutral-100 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-400" />
                  Record New Audit Finding
                </h3>
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="p-1 rounded text-neutral-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Finding Title / Deficiency *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Incomplete Dual-Approval Logs on Disbursements > $10,000"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Context & Root Cause Analysis
                </label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Detail the control failure, test sample size, and root cause..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Severity</label>
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value as any)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2 py-2 text-xs text-neutral-200 focus:outline-none cursor-pointer"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Likelihood</label>
                  <select
                    value={newLikelihood}
                    onChange={(e) => setNewLikelihood(e.target.value as any)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2 py-2 text-xs text-neutral-200 focus:outline-none cursor-pointer"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Impact</label>
                  <select
                    value={newImpact}
                    onChange={(e) => setNewImpact(e.target.value as any)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2 py-2 text-xs text-neutral-200 focus:outline-none cursor-pointer"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Department</label>
                  <input
                    type="text"
                    value={newDepartment}
                    onChange={(e) => setNewDepartment(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Owner / Lead</label>
                  <input
                    type="text"
                    value={newOwner}
                    onChange={(e) => setNewOwner(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Agreed Corrective Action
                </label>
                <textarea
                  rows={2}
                  value={newCorrective}
                  onChange={(e) => setNewCorrective(e.target.value)}
                  placeholder="Outline the remediation milestones and verification protocol..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-medium hover:bg-neutral-700 cursor-pointer"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold shadow transition cursor-pointer"
                >
                  Log Finding
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AuditsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full" />
        </div>
      }
    >
      <AuditsContent />
    </Suspense>
  );
}
