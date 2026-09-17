"use client";

import React, { useState } from "react";
import { useWorkspace } from "@/context/WorkspaceContext";
import { DocumentItem } from "@/lib/demoData";
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
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Folder className="w-3.5 h-3.5" /> Compliant Evidence Vault
            </span>
            <span className="text-xs text-neutral-400">WORM Storage Simulation</span>
          </div>
          <h1 className="text-3xl font-serif font-light tracking-tight text-neutral-100">
            Documents & Compliance Vault
          </h1>
          <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
            Cryptographically sealed governance records, audit field notes, financial reconciliations, and version histories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsUploadOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 text-black text-xs font-semibold shadow-md shadow-blue-500/20 transition"
          >
            <Plus className="w-4 h-4" />
            Upload Evidence
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents, tags, owners..."
            className="w-full bg-neutral-950/70 border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-blue-500/50"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-neutral-950/70 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-300 focus:outline-none"
          >
            <option value="ALL">All Categories</option>
            <option value="Governance">Governance</option>
            <option value="Financials">Financials</option>
            <option value="Audits">Audits</option>
            <option value="Projects">Projects</option>
          </select>

          <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-2.5 py-1 text-xs rounded ${
                viewMode === "grid" ? "bg-neutral-800 text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-2.5 py-1 text-xs rounded ${
                viewMode === "table" ? "bg-neutral-800 text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              List
            </button>
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
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-neutral-800 text-neutral-300">
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
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
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
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-neutral-800 pb-4">
              <div>
                <span className="font-mono text-xs text-blue-400">{previewDoc.category} Vault</span>
                <h2 className="text-xl font-medium text-neutral-100 mt-0.5">{previewDoc.name}</h2>
                <div className="text-xs text-neutral-400 mt-1">
                  Version {previewDoc.version} • {previewDoc.size} • Uploaded by {previewDoc.owner}
                </div>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Preview Frame */}
            <div className="p-8 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <span className="text-xs font-mono text-neutral-400">DOCUMENT PREVIEW FRAMEWORK</span>
                <span className="text-xs text-emerald-400 font-mono">SEALED (SHA-256 VERIFIED)</span>
              </div>
              <div className="space-y-3 py-6 text-neutral-400 text-xs font-serif leading-relaxed">
                <p className="text-sm font-semibold text-neutral-200">INTERNAL CONTROL & COMPLIANCE EXHIBIT</p>
                <p>
                  This official document record was signed and ingested under standard internal governance protocols. All adjustments, approvals, and access logs are immutably preserved in the audit trail.
                </p>
                <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 font-mono text-[11px] space-y-1">
                  <div>Checksum: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</div>
                  <div>Retention Policy: 7 Years (Statutory Governance Archive)</div>
                  <div>Classification: Confidential Internal Use</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
              <div className="flex gap-2">
                {previewDoc.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded bg-neutral-800 text-neutral-300">
                    #{t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const blob = new Blob([`Sample Content of ${previewDoc.name}`], { type: "text/plain" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = previewDoc.name;
                    a.click();
                  }}
                  className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" /> Download File
                </button>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 text-black text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: UPLOAD */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleUpload}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-base font-medium text-neutral-100">Upload Evidence Document</h3>
              <button
                type="button"
                onClick={() => setIsUploadOpen(false)}
                className="p-1 rounded text-neutral-400 hover:text-white"
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
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none"
                >
                  <option value="Governance">Governance</option>
                  <option value="Financials">Financials</option>
                  <option value="Audits">Audits</option>
                  <option value="Projects">Projects</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Format Type</label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value as any)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none"
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
              <div className="text-[10px] text-neutral-500">Up to 50MB per file with automatic SHA-256 seal</div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setIsUploadOpen(false)}
                className="px-4 py-2 rounded-lg bg-neutral-800 text-neutral-300 text-xs font-medium hover:bg-neutral-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 text-black text-xs font-semibold shadow"
              >
                Store in Vault
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
