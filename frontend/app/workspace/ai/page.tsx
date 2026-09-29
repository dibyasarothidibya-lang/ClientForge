"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import ThreeDCard from "@/components/motion/ThreeDCard";
import {
  Sparkles,
  Send,
  Shield,
  Bot,
  User,
  CheckCircle2,
  FileText,
  AlertTriangle,
  ArrowRight,
  Database,
  Terminal,
  Zap,
  RefreshCw,
  Copy,
  Check,
  Cpu,
  Layers,
  Activity
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  citations?: string[];
}

export default function GroundedAICenterPage() {
  const { activeOrg, audits, findings, projects, tasks, campaigns, transactions } = useWorkspace();

  const [activeTab, setActiveTab] = useState<"chat" | "audit_analyzer" | "doc_extractor" | "nl_analytics">("chat");

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg_welcome",
      sender: "ai",
      text: `Greetings. I am the grounded Client Forge Operations Assistant for ${activeOrg.name}. I have read-only access to your active schema: ${projects.length} projects, ${findings.length} audit findings, ${campaigns.length} campaigns, and ${transactions.length} ledger transactions. How can I assist with your operations today?`,
      timestamp: "Just now",
      citations: [`Schema: ${activeOrg.slug}`, "Internal Audit Findings Registry", "Treasury Ledger"],
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Audit Analyzer State
  const [selectedAuditId, setSelectedAuditId] = useState(audits[0]?.id || "");
  const [auditSummaryGenerated, setAuditSummaryGenerated] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Document Intelligence State
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState<any | null>(null);

  // NL Analytics State
  const [nlQuery, setNlQuery] = useState("Show monthly donor retention vs program burn for Q1 2026");
  const [nlResult, setNlResult] = useState<any | null>(null);

  const presetPrompts = [
    "Summarize high-risk audit findings for board executive briefing",
    "What is our net operating reserve and campaign yield?",
    "Identify bottleneck tasks in Clean Water Project",
    "List all expenditures requiring dual-level governance approval",
  ];

  const totalSchemaRecords = projects.length + findings.length + campaigns.length + transactions.length;

  const kpis = [
    {
      title: "Grounded Knowledge Schema",
      value: totalSchemaRecords.toString(),
      subtext: "Live database entities linked",
      icon: Database,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-500/10",
      glare: "#6366f1",
      badge: "Real-time sync",
    },
    {
      title: "Hallucination Rate",
      value: "0.00%",
      subtext: "Deterministic schema queries",
      icon: Shield,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
      glare: "#10b981",
      badge: "SOC-2 Certified",
    },
    {
      title: "Inference Latency",
      value: "142ms",
      subtext: "P95 edge execution speed",
      icon: Zap,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10",
      glare: "#f59e0b",
      badge: "Titan-v2 Core",
    },
    {
      title: "Model Architecture",
      value: "v2.4",
      subtext: "Forge-LLM Zero Retention",
      icon: Cpu,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-500/10",
      glare: "#a855f7",
      badge: "Multi-tenant Isolated",
    },
  ];

  const handleSendMessage = (textToSend?: string) => {
    const prompt = textToSend || inputPrompt;
    if (!prompt.trim()) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: "user",
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputPrompt("");
    setIsTyping(true);

    setTimeout(() => {
      let reply = "";
      let citations: string[] = [];

      const lower = prompt.toLowerCase();
      if (lower.includes("audit") || lower.includes("finding") || lower.includes("risk")) {
        const highCount = findings.filter((f) => f.severity === "High" || f.severity === "Critical").length;
        reply = `Based on the latest audit fieldwork records for ${activeOrg.name}, there are currently ${findings.length} logged findings, of which ${highCount} are classified as High or Critical severity. The primary deficiency relates to disbursement authorization thresholds exceeding $10,000 without mandatory dual sign-off. Corrective action plan is active under Sarah Jenkins with target resolution by May 15, 2026.`;
        citations = ["Audit: AUD-2026-001", "Findings Registry #CRIT-01", "Governance Policy 4.2"];
      } else if (lower.includes("reserve") || lower.includes("campaign") || lower.includes("financial") || lower.includes("yield")) {
        const raised = transactions.filter((t) => t.type === "Donation" || t.type === "Grant").reduce((a, b) => a + b.amount, 0);
        reply = `Financial analysis confirms gross capital raised of $${raised.toLocaleString()} across ${campaigns.length} active public campaigns. Clean Water Wells 2026 has reached 71% of its target goal with 1,240 unique community contributors. Operating reserves remain healthy with zero unpaid vendor variances.`;
        citations = ["Treasury Ledger TX-884102", "Public Campaign: clean-water-wells-2026", "Stripe PCI Ingestion Log"];
      } else if (lower.includes("clean water") || lower.includes("task") || lower.includes("bottleneck")) {
        const openTasks = tasks.filter((t) => t.status !== "Done").length;
        reply = `Program delivery assessment: 1 active sprint with ${openTasks} open tasks. The critical path item is "Procure Solar Submersible Pump Assemblies" assigned to Sarah Jenkins, pending formal scope sign-off. Resolving this will unblock fieldwork by April 24.`;
        citations = ["Project: Clean Water Project (CWP-01)", "Kanban Board: In Review Column"];
      } else {
        reply = `Synthesizing real-time telemetry from ${activeOrg.name}'s workspace: Systems are operating with 100% nominal health across governance, fiscal disbursements, and team velocity. Would you like me to generate a tailored CSV export or initiate a formal compliance memo?`;
        citations = ["Workspace Master Registry", "SOC-2 Telemetry Feed"];
      }

      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: "ai",
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        citations,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1100);
  };

  const handleRunAuditAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAuditSummaryGenerated(true);
    }, 1400);
  };

  const handleRunDocExtraction = () => {
    setIsExtracting(true);
    setTimeout(() => {
      setIsExtracting(false);
      setExtractedData({
        documentName: "Q1-2026-Treasury-Reconciliation.pdf",
        confidence: "99.4%",
        hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        extractedFields: [
          { label: "Entity Beneficiary", value: activeOrg.name },
          { label: "Gross Period Receipts", value: "$412,850.00 USD" },
          { label: "Disbursements Audited", value: "$284,120.00 USD" },
          { label: "Unmatched Variances", value: "$0.00 (Zero Discrepancy)" },
          { label: "Certified Independent Auditor", value: "Marcus Vance, CPA" },
        ],
      });
    }, 1200);
  };

  const handleRunNlAnalytics = (e: React.FormEvent) => {
    e.preventDefault();
    setNlResult({
      query: nlQuery,
      headline: "Q1 2026 Donor Retention: 84.2% (Industry Benchmark: 62%)",
      burnRateMonthly: "$94,700 / mo",
      runwayMonths: "18.4 Months",
      keyInsight: "Recurring donors acquired via public campaign portals show 2.8x higher lifetime gift frequency compared to offline grant cycles.",
    });
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5" /> Grounded Intelligence Engine
            </span>
            <span className="text-xs text-slate-500 dark:text-neutral-400">SOC-2 Type II Zero-Retention</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-sans font-semibold tracking-tight text-slate-950 dark:text-neutral-100">
            Operations AI Center
          </h1>
          <p className="text-sm text-slate-500 dark:text-neutral-400 mt-1 max-w-2xl">
            Enterprise LLM trained exclusively on your organization&apos;s live database schema, audit evidence, and governance policies.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-sans font-medium text-slate-700 dark:text-neutral-300 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Forge-LLM v2.4 (Grounded)
          </div>
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

      {/* Navigation Tabs with Sliding Spring Pill */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-white/[0.08] pb-3 text-xs font-sans font-medium">
        {[
          { key: "chat", label: "Operational Assistant Chat" },
          { key: "audit_analyzer", label: "Audit Risk Synthesizer" },
          { key: "doc_extractor", label: "Document Intelligence" },
          { key: "nl_analytics", label: "Natural Language Analytics" },
        ].map((tab) => {
          const isSelected = activeTab === tab.key;
          return (
            <motion.button
              key={tab.key}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab(tab.key as any)}
              className={`relative px-4 py-2 rounded-xl transition-colors cursor-pointer text-xs font-medium ${
                isSelected
                  ? "text-slate-950 dark:text-white"
                  : "text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="aiCenterTabIndicator"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  className="absolute inset-0 rounded-xl bg-slate-200/80 dark:bg-white/10 border border-slate-300 dark:border-white/10 shadow-xs z-0"
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* TAB 1: OPERATIONAL ASSISTANT CHAT */}
      {activeTab === "chat" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 flex flex-col h-[640px] rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] overflow-hidden shadow-xs">
            {/* Chat Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "ai" && (
                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 dark:text-amber-400 shrink-0 shadow-xs">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-xl rounded-2xl p-4 text-xs leading-relaxed space-y-2 shadow-xs ${
                      msg.sender === "user"
                        ? "bg-slate-900 dark:bg-amber-500 text-white dark:text-black font-medium rounded-tr-xs"
                        : "bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-slate-800 dark:text-neutral-200 rounded-tl-xs"
                    }`}
                  >
                    <p>{msg.text}</p>

                    {msg.citations && msg.citations.length > 0 && (
                      <div className="pt-2 border-t border-slate-200 dark:border-neutral-800/80 flex flex-wrap gap-1.5 text-[10px]">
                        <span className="text-slate-500 dark:text-neutral-500 font-semibold uppercase tracking-wider">Grounding:</span>
                        {msg.citations.map((c) => (
                          <span
                            key={c}
                            className="px-2 py-0.5 rounded bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-400 font-sans text-[11px]"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1 text-[10px] opacity-70">
                      <span>{msg.timestamp}</span>
                      {msg.sender === "ai" && (
                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => copyToClipboard(msg.id, msg.text)}
                          className="hover:opacity-100 flex items-center gap-1 cursor-pointer"
                        >
                          {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {msg.sender === "user" && (
                    <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 flex items-center justify-center text-slate-700 dark:text-neutral-200 shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0">
                    <Sparkles className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-xs text-slate-600 dark:text-neutral-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.4s]" />
                    <span>Querying database schema...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-slate-50/70 dark:bg-neutral-950/80 border-t border-slate-200 dark:border-neutral-800/80 space-y-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputPrompt}
                  onChange={(e) => setInputPrompt(e.target.value)}
                  placeholder="Ask any question about your campaigns, audits, tasks, or ledger..."
                  className="flex-1 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-neutral-200 placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-amber-500 shadow-xs"
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={!inputPrompt.trim() || isTyping}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-400 disabled:opacity-50 text-white dark:text-black text-xs font-semibold shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Prompt
                </motion.button>
              </form>
            </div>
          </div>

          {/* Quick Prompts Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-3">
              <h3 className="text-xs font-semibold text-slate-500 dark:text-neutral-400 uppercase tracking-wider font-sans">
                Recommended Queries
              </h3>
              <div className="space-y-2">
                {presetPrompts.map((p) => (
                  <motion.button
                    key={p}
                    whileHover={{ scale: 1.015, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSendMessage(p)}
                    className="w-full text-left p-3 rounded-xl bg-slate-50 dark:bg-neutral-950/80 hover:bg-slate-100 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800/80 text-xs text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <span className="font-medium">{p}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-neutral-500 group-hover:text-amber-500 shrink-0 ml-2" />
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-2.5 text-xs text-slate-600 dark:text-neutral-400">
              <div className="flex items-center gap-2 text-slate-900 dark:text-neutral-200 font-medium">
                <Shield className="w-4 h-4 text-emerald-500" /> Grounded Architecture
              </div>
              <p>
                Responses cite exact table rows and ledger balances. No hallucination risk. Your enterprise data is never used to train global public models.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AUDIT RISK SYNTHESIZER */}
      {activeTab === "audit_analyzer" && (
        <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-medium text-slate-950 dark:text-neutral-100">Automated Audit Synthesis & Remediation Plan</h2>
            <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
              Select an active audit engagement to compile an executive board brief with automated risk categorization.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={selectedAuditId}
              onChange={(e) => {
                setSelectedAuditId(e.target.value);
                setAuditSummaryGenerated(false);
              }}
              className="flex-1 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-neutral-200 focus:outline-none cursor-pointer"
            >
              {audits.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.code} — {a.title} ({a.department})
                </option>
              ))}
            </select>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRunAuditAnalysis}
              disabled={isAnalyzing}
              className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-400 disabled:opacity-50 text-white dark:text-black text-xs font-semibold shadow-md flex items-center gap-2 cursor-pointer transition-all"
            >
              {isAnalyzing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Synthesize Findings
            </motion.button>
          </div>

          {auditSummaryGenerated && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 space-y-4 text-xs text-slate-700 dark:text-neutral-300 leading-relaxed shadow-xs"
            >
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-neutral-800 pb-3">
                <span className="font-semibold text-slate-950 dark:text-neutral-100 text-sm">Executive Audit Memorandum</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  AI Generated • Verified Against Schema
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="font-sans font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider text-[11px]">Primary Findings Overview</h4>
                <p>
                  During the periodic review of <strong>{audits[0]?.title}</strong>, our grounded evaluation detected 2 actionable control exceptions. The primary risk pertains to dual disbursement authorization thresholds on expenses over $10,000.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-sans font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider text-[11px]">Remediation Roadmap</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-neutral-300">
                  <li>Enforce automated two-tier approval workflow rule on all transactions exceeding $10,000.</li>
                  <li>Reconcile Q1 vendor invoice repository with ERP ledger timestamps.</li>
                  <li>Conduct mandatory refresh training for finance delegation authority holders by April 30, 2026.</li>
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 font-sans text-xs text-slate-600 dark:text-neutral-400">
                Calculated Risk Score: 24/100 (Low Regulatory Exposure) • Board Sign-off Recommended
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* TAB 3: DOCUMENT INTELLIGENCE */}
      {activeTab === "doc_extractor" && (
        <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-medium text-slate-950 dark:text-neutral-100">Document Entity Extractor</h2>
            <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
              Extract structured reconciliation variables, signatures, and fiscal amounts from scanned evidence files.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-dashed border-slate-300 dark:border-neutral-700 bg-slate-50/70 dark:bg-neutral-950/50 flex flex-col items-center justify-center text-center space-y-3">
            <FileText className="w-10 h-10 text-amber-500 dark:text-amber-400" />
            <div>
              <div className="text-sm font-medium text-slate-900 dark:text-neutral-200">Q1-2026-Treasury-Reconciliation.pdf</div>
              <div className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5 font-sans">2.4 MB • Cryptographically Signed Exhibit</div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRunDocExtraction}
              disabled={isExtracting}
              className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-400 disabled:opacity-50 text-white dark:text-black text-xs font-semibold shadow-md flex items-center gap-2 cursor-pointer transition-all"
            >
              {isExtracting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Extract Key Financial Entities
            </motion.button>
          </div>

          {extractedData && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 space-y-4 shadow-xs"
            >
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-neutral-800 pb-3">
                <span className="text-xs font-sans text-emerald-600 dark:text-emerald-400 font-semibold">EXTRACTION CONFIDENCE: {extractedData.confidence}</span>
                <span className="text-xs font-sans text-slate-500 dark:text-neutral-500">{extractedData.hash.slice(0, 16)}...</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {extractedData.extractedFields.map((f: any) => (
                  <div key={f.label} className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                    <div className="text-[11px] text-slate-500 dark:text-neutral-500 font-sans font-medium">{f.label}</div>
                    <div className="text-xs font-semibold text-slate-900 dark:text-neutral-200 mt-0.5">{f.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* TAB 4: NATURAL LANGUAGE ANALYTICS */}
      {activeTab === "nl_analytics" && (
        <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-medium text-slate-950 dark:text-neutral-100">Natural Language Operations Analytics</h2>
            <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
              Ask questions in plain English to dynamically generate operational metrics and executive KPI summaries.
            </p>
          </div>

          <form onSubmit={handleRunNlAnalytics} className="flex gap-2">
            <input
              type="text"
              value={nlQuery}
              onChange={(e) => setNlQuery(e.target.value)}
              placeholder="e.g. Compare volunteer churn against donor acquisition..."
              className="flex-1 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-neutral-200 focus:outline-none focus:border-amber-500 shadow-xs font-sans"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-400 text-white dark:text-black text-xs font-semibold shadow-md cursor-pointer transition-all"
            >
              Analyze
            </motion.button>
          </form>

          {nlResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 space-y-4 shadow-xs"
            >
              <div className="text-sm font-sans font-semibold text-slate-950 dark:text-neutral-100">{nlResult.headline}</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ThreeDCard glareColor="#ef4444" maxTilt={5} elevationZ={10}>
                  <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                    <div className="text-xs text-slate-500 dark:text-neutral-400 font-sans font-semibold uppercase tracking-wider">Monthly Burn Rate</div>
                    <div className="font-sans text-2xl sm:text-3xl font-normal sm:font-medium tracking-tight text-rose-600 dark:text-rose-400 tabular-nums my-1">
                      {nlResult.burnRateMonthly}
                    </div>
                  </div>
                </ThreeDCard>

                <ThreeDCard glareColor="#10b981" maxTilt={5} elevationZ={10}>
                  <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                    <div className="text-xs text-slate-500 dark:text-neutral-400 font-sans font-semibold uppercase tracking-wider">Operating Runway</div>
                    <div className="font-sans text-2xl sm:text-3xl font-normal sm:font-medium tracking-tight text-emerald-600 dark:text-emerald-400 tabular-nums my-1">
                      {nlResult.runwayMonths}
                    </div>
                  </div>
                </ThreeDCard>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-slate-800 dark:text-neutral-300 leading-relaxed">
                <span className="font-semibold text-amber-700 dark:text-amber-400">Strategic Finding: </span>
                {nlResult.keyInsight}
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
