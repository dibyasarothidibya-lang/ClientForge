"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import { DocumentItem } from "@/lib/demoData";
import ThreeDCard from "@/components/motion/ThreeDCard";
import {
  FileText,
  FileSpreadsheet,
  Image as ImageIcon,
  Folder,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Trash2,
  Clock,
  Shield,
  Tag,
  X,
  Check,
  Share2,
  Lock,
  HardDrive
} from "lucide-react";

export default function DocumentsPage() {
  const { documents, addDocument } = useWorkspace();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Preview Drawer
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);

  // Upload Modal
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [docName, setDocName] = useState("");
  const [docCategory, setDocCategory] = useState<DocumentItem["category"]>("Governance");
  const [docType, setDocType] = useState<DocumentItem["type"]>("PDF");
  const [docTagInput, setDocTagInput] = useState("audit, 2026");

  const sealedCount = documents.filter((d) => d.category === "Governance" || d.category === "Audits").length;

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === "ALL" || doc.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim()) return;

    addDocument({
      name: docName.endsWith(`.${docType.toLowerCase()}`) ? docName : `${docName}.${docType === "Spreadsheet" ? "xlsx" : docType.toLowerCase()}`,
      type: docType,
      size: "1.8 MB",
      category: docCategory,
      owner: "Sarah Jenkins",
      version: "v1.0",
      tags: docTagInput.split(",").map((t) => t.trim()).filter(Boolean),
    });

    setDocName("");
    setIsUploadOpen(false);
  };

  const getFileIcon = (type: DocumentItem["type"]) => {
    switch (type) {
      case "PDF":
        return <FileText className="w-8 h-8 text-rose-400" />;
      case "Spreadsheet":
        return <FileSpreadsheet className="w-8 h-8 text-emerald-400" />;
      case "Doc":
        return <FileText className="w-8 h-8 text-blue-400" />;
      case "Image":
        return <ImageIcon className="w-8 h-8 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Folder className="w-3.5 h-3.5" /> Compliant Evidence Vault
            </span>
            <span className="text-xs text-neutral-400">WORM Storage Simulation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-sans font-semibold tracking-tight text-neutral-100">
            Documents & Compliance Vault
          </h1>
          <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
            Cryptographically sealed governance records, audit field notes, financial reconciliations, and version histories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsUploadOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-black text-xs font-semibold shadow-md shadow-blue-500/20 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Upload Evidence
          </motion.button>
        </div>
      </div>

      {/* 4 PRIMARY STATS CARDS WITH 3D TILT & LANDING PAGE NUMERIC TYPOGRAPHY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ThreeDCard glareColor="#3b82f6" maxTilt={8} elevationZ={15} className="h-full">
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur hover:border-blue-500/40 transition-colors flex flex-col justify-between h-full group">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider font-sans">Total Vault Items</span>
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                <Folder className="w-4 h-4" />
              </div>
            </div>
            <div className="font-sans text-3xl sm:text-4xl lg:text-5xl font-normal sm:font-medium tracking-tight text-white tabular-nums my-2">
              {documents.length}
            </div>
          </div>
        </ThreeDCard>

        <ThreeDCard glareColor="#10b981" maxTilt={8} elevationZ={15} className="h-full">
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur hover:border-emerald-500/40 transition-colors flex flex-col justify-between h-full group">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider font-sans">Sealed Records</span>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                <Shield className="w-4 h-4" />
              </div>
            </div>
            <div className="font-sans text-3xl sm:text-4xl lg:text-5xl font-normal sm:font-medium tracking-tight text-white tabular-nums my-2">
              {sealedCount}
            </div>
          </div>
        </ThreeDCard>

        <ThreeDCard glareColor="#8b5cf6" maxTilt={8} elevationZ={15} className="h-full">
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur hover:border-purple-500/40 transition-colors flex flex-col justify-between h-full group">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider font-sans">Storage Utilized</span>
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                <HardDrive className="w-4 h-4" />
              </div>
            </div>
            <div className="font-sans text-3xl sm:text-4xl lg:text-5xl font-normal sm:font-medium tracking-tight text-white tabular-nums my-2">
              48.2 <span className="text-base text-neutral-400 font-normal">MB</span>
            </div>
          </div>
        </ThreeDCard>

        <ThreeDCard glareColor="#f59e0b" maxTilt={8} elevationZ={15} className="h-full">
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur hover:border-amber-500/40 transition-colors flex flex-col justify-between h-full group">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider font-sans">Integrity Status</span>
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                <Lock className="w-4 h-4" />
              </div>
            </div>
            <div className="font-sans text-3xl sm:text-4xl lg:text-5xl font-normal sm:font-medium tracking-tight text-amber-400 tabular-nums my-2">
              100%
            </div>
          </div>
        </ThreeDCard>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80 font-sans">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents, tags, owners..."
            className="w-full bg-neutral-950/70 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs font-sans text-neutral-200 focus:outline-none focus:border-blue-500/50"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto font-sans font-medium">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-neutral-950/70 border border-neutral-800 rounded-xl px-3 py-2 text-xs font-sans text-neutral-300 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Categories</option>
            <option value="Contracts">Contracts</option>
            <option value="Policies">Policies</option>
            <option value="Employee Documents">Employee Documents</option>
            <option value="Compliance">Compliance</option>
            <option value="Payroll & Tax">Payroll & Tax</option>
            <option value="Governance">Governance</option>
            <option value="Financials">Financials</option>
            <option value="Audits">Audits</option>
            <option value="Other">Other</option>
          </select>

          {/* View Mode with Spring Sliding Pill */}
          <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-xl p-1 relative">
            {(["grid", "table"] as const).map((mode) => {
              const isActive = viewMode === mode;
              const label = mode === "grid" ? "Grid" : "List";
              return (
                <motion.button
                  key={mode}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode(mode)}
                  className={`relative px-3 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
                    isActive ? "text-white font-semibold" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="documentsViewToggle"
                      className="absolute inset-0 bg-neutral-800 rounded-lg shadow-sm"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* GRID VIEW */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setPreviewDoc(doc)}
              className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 cursor-pointer transition flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80">
                    {getFileIcon(doc.type)}
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-sans font-medium bg-neutral-800 text-neutral-300">
                    {doc.version}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-neutral-200 group-hover:text-blue-400 transition truncate">
                    {doc.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-neutral-400">
                    <span>{doc.category}</span>
                    <span>•</span>
                    <span>{doc.size}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {doc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-[10px] text-neutral-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-neutral-800/80 text-xs text-neutral-400">
                <span>By {doc.owner}</span>
                <span className="text-blue-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                  <Eye className="w-3.5 h-3.5" /> Preview
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === "table" && (
        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                  <th className="py-3 px-3">File Name</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Version</th>
                  <th className="py-3 px-3">Size</th>
                  <th className="py-3 px-3">Owner</th>
                  <th className="py-3 px-3">Updated</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 text-xs">
                {filteredDocs.map((doc) => (
                  <tr
                    key={doc.id}
                    onClick={() => setPreviewDoc(doc)}
                    className="hover:bg-neutral-800/30 cursor-pointer transition"
                  >
                    <td className="py-3 px-3">
                      <div className="font-medium text-neutral-200">{doc.name}</div>
                      <div className="text-[10px] text-neutral-500">SHA-256: 7f8a9e...e3b1</div>
                    </td>
                    <td className="py-3 px-3 text-neutral-300">{doc.category}</td>
                    <td className="py-3 px-3">
                      <span className="font-sans font-medium text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                        {doc.version}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-neutral-400">{doc.size}</td>
                    <td className="py-3 px-3 text-neutral-300">{doc.owner}</td>
                    <td className="py-3 px-3 text-neutral-400 whitespace-nowrap">{doc.updatedAt}</td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewDoc(doc);
                        }}
                        className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white"
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
      )}

      {/* PREVIEW DRAWER */}
      <AnimatePresence>
        {previewDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
              className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl"
            >
              <div className="flex items-start justify-between border-b border-neutral-800 pb-4">
                <div>
                  <span className="font-sans font-semibold text-xs text-blue-400">{previewDoc.category} Vault</span>
                  <h2 className="text-xl font-medium text-neutral-100 mt-0.5">{previewDoc.name}</h2>
                  <div className="text-xs text-neutral-400 mt-1 font-sans">
                    Version {previewDoc.version} • {previewDoc.size} • Uploaded by {previewDoc.owner}
                  </div>
                </div>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Document Preview Frame */}
              <div className="p-8 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <span className="text-xs font-sans font-medium text-neutral-400">DOCUMENT PREVIEW FRAMEWORK</span>
                  <span className="text-xs text-emerald-400 font-sans font-medium">SEALED (SHA-256 VERIFIED)</span>
                </div>
                <div className="space-y-3 py-6 text-neutral-400 text-xs font-sans leading-relaxed">
                  <p className="text-sm font-semibold text-neutral-200">INTERNAL CONTROL & COMPLIANCE EXHIBIT</p>
                  <p>
                    This official document record was signed and ingested under standard internal governance protocols. All adjustments, approvals, and access logs are immutably preserved in the audit trail.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 font-sans text-xs">
                    <div>
                      <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Approval Status</span>
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold mt-0.5">
                        <Check className="w-3.5 h-3.5" /> Approved & Cryptographically Sealed
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Access Permissions</span>
                      <span className="text-neutral-200 font-medium mt-0.5 block">
                        Managers, HR & Compliance Officers
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Retention & Archive</span>
                      <span className="text-neutral-300">7-Year Statutory Governance Archive</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[10px] uppercase font-semibold">SHA-256 Checksum</span>
                      <code className="bg-neutral-950 px-1 py-0.5 rounded text-[10px] font-mono text-neutral-300 block truncate">
                        e3b0c44298fc1c149afbf4c8996fb92427ae41e4
                      </code>
                    </div>
                  </div>

                  {/* Activity History Timeline */}
                  <div className="pt-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
                      Document Audit & Activity History
                    </span>
                    <div className="space-y-2 border-l-2 border-neutral-800 pl-3 text-xs">
                      <div className="relative">
                        <div className="absolute -left-[19px] top-1 w-2 h-2 rounded-full bg-emerald-500" />
                        <div className="text-neutral-200 font-medium">Document verified and signed</div>
                        <div className="text-[10px] text-neutral-500">Today at 10:42 AM by Sarah Jenkins</div>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[19px] top-1 w-2 h-2 rounded-full bg-blue-500" />
                        <div className="text-neutral-200 font-medium">Automated Antivirus & Malware Ingestion Passed</div>
                        <div className="text-[10px] text-neutral-500">Zero security vulnerabilities detected</div>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[19px] top-1 w-2 h-2 rounded-full bg-neutral-600" />
                        <div className="text-neutral-200 font-medium">Original file uploaded to encrypted S3 bucket</div>
                        <div className="text-[10px] text-neutral-500">Version 1.0 initialized</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-neutral-800 font-sans">
                <div className="flex gap-2">
                  {previewDoc.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded bg-neutral-800 text-neutral-300">
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert(`Copied secure sharing token link for ${previewDoc.name} to clipboard.`)}
                    className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" /> Share
                  </button>
                  <button
                    onClick={() => {
                      const blob = new Blob([`Sample Content of ${previewDoc.name}`], { type: "text/plain" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = previewDoc.name;
                      a.click();
                    }}
                    className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-4 h-4" /> Download File
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to archive ${previewDoc.name}? Consequence: Access will be restricted to Compliance Auditors.`)) {
                        alert(`Document ${previewDoc.name} moved to statutory archived state.`);
                        setPreviewDoc(null);
                      }
                    }}
                    className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Archive
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setPreviewDoc(null)}
                    className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-black text-xs font-semibold cursor-pointer shadow-sm"
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL: UPLOAD */}
      <AnimatePresence>
        {isUploadOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.form
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
              onSubmit={handleUpload}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <h3 className="text-base font-medium text-neutral-100">Upload Evidence Document</h3>
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="p-1 rounded text-neutral-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Document Title *</label>
                <input
                  type="text"
                  required
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  placeholder="e.g. Q1-2026-Treasury-Reconciliation"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Category</label>
                  <select
                    value={docCategory}
                    onChange={(e) => setDocCategory(e.target.value as any)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none cursor-pointer"
                  >
                    <option value="Contracts">Contracts</option>
                    <option value="Policies">Policies</option>
                    <option value="Employee Documents">Employee Documents</option>
                    <option value="Compliance">Compliance</option>
                    <option value="Payroll & Tax">Payroll & Tax</option>
                    <option value="Governance">Governance</option>
                    <option value="Financials">Financials</option>
                    <option value="Audits">Audits</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Format Type</label>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value as any)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none cursor-pointer"
                  >
                    <option value="PDF">PDF</option>
                    <option value="Spreadsheet">Spreadsheet (XLSX)</option>
                    <option value="Doc">Document (DOCX)</option>
                    <option value="Image">Image (PNG/JPG)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={docTagInput}
                  onChange={(e) => setDocTagInput(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none"
                />
              </div>

              <div className="p-4 rounded-xl border border-dashed border-neutral-700 bg-neutral-950/50 text-center space-y-1">
                <Folder className="w-6 h-6 text-neutral-500 mx-auto" />
                <div className="text-xs text-neutral-300 font-medium">Drag & drop files or browse</div>
                <div className="text-[10px] text-neutral-500 font-sans">Up to 50MB per file with automatic SHA-256 seal</div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800 font-sans">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-medium hover:bg-neutral-700 cursor-pointer"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-black text-xs font-semibold shadow cursor-pointer"
                >
                  Store in Vault
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
