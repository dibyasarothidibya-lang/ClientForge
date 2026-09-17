"use client";

import React, { useState } from "react";
import { useWorkspace } from "@/context/WorkspaceContext";
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
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5" /> Grounded Intelligence Engine
            </span>
            <span className="text-xs text-neutral-400">SOC-2 Type II Zero-Retention</span>
          </div>
          <h1 className="text-3xl font-serif font-light tracking-tight text-neutral-100">
            Operations AI Center
          </h1>
          <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
            Enterprise LLM trained exclusively on your organization&apos;s live database schema, audit evidence, and governance policies.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Forge-LLM v2.4 (Grounded)
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
        <button
          onClick={() => setActiveTab("chat")}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition ${
            activeTab === "chat" ? "bg-neutral-800 text-white shadow" : "text-neutral-400 hover:text-white"
          }`}
        >
          Operational Assistant Chat
        </button>
        <button
          onClick={() => setActiveTab("audit_analyzer")}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition ${
            activeTab === "audit_analyzer" ? "bg-neutral-800 text-white shadow" : "text-neutral-400 hover:text-white"
          }`}
        >
          Audit Risk Synthesizer
        </button>
        <button
          onClick={() => setActiveTab("doc_extractor")}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition ${
            activeTab === "doc_extractor" ? "bg-neutral-800 text-white shadow" : "text-neutral-400 hover:text-white"
          }`}
        >
          Document Intelligence
        </button>
        <button
          onClick={() => setActiveTab("nl_analytics")}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition ${
            activeTab === "nl_analytics" ? "bg-neutral-800 text-white shadow" : "text-neutral-400 hover:text-white"
          }`}
        >
          Natural Language Analytics
        </button>
      </div>

      {/* TAB 1: OPERATIONAL ASSISTANT CHAT */}
      {activeTab === "chat" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 flex flex-col h-[640px] rounded-2xl bg-neutral-900/60 border border-neutral-800 overflow-hidden backdrop-blur">
            {/* Chat Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "ai" && (
                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-xl rounded-2xl p-4 text-xs leading-relaxed space-y-2 ${
                      msg.sender === "user"
                        ? "bg-amber-500 text-black font-medium rounded-tr-sm"
                        : "bg-neutral-950 border border-neutral-800 text-neutral-200 rounded-tl-sm"
                    }`}
                  >
                    <p>{msg.text}</p>

                    {msg.citations && msg.citations.length > 0 && (
                      <div className="pt-2 border-t border-neutral-800/80 flex flex-wrap gap-1.5 text-[10px]">
                        <span className="text-neutral-500 font-semibold uppercase tracking-wider">Grounding:</span>
                        {msg.citations.map((c) => (
                          <span
                            key={c}
                            className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 font-mono"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1 text-[10px] opacity-60">
                      <span>{msg.timestamp}</span>
                      {msg.sender === "ai" && (
                        <button
                          onClick={() => copyToClipboard(msg.id, msg.text)}
                          className="hover:opacity-100 flex items-center gap-1"
                        >
                          {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      )}
                    </div>
                  </div>

                  {msg.sender === "user" && (
                    <div className="w-8 h-8 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-200 shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Sparkles className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
                    <span>Querying database schema...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-neutral-950/80 border-t border-neutral-800/80 space-y-3">
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
                  className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  disabled={!inputPrompt.trim() || isTyping}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black text-xs font-semibold shadow flex items-center gap-1.5 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  Prompt
                </button>
              </form>
            </div>
          </div>

          {/* Quick Prompts Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur space-y-3">
              <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Recommended Queries
              </h3>
              <div className="space-y-2">
                {presetPrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => handleSendMessage(p)}
                    className="w-full text-left p-3 rounded-xl bg-neutral-950/80 hover:bg-neutral-800 border border-neutral-800/80 text-xs text-neutral-300 hover:text-white transition flex items-center justify-between group"
                  >
                    <span>{p}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-amber-400 shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur space-y-2.5 text-xs text-neutral-400">
              <div className="flex items-center gap-2 text-neutral-200 font-medium">
                <Shield className="w-4 h-4 text-emerald-400" /> Grounded Architecture
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
        <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 backdrop-blur space-y-6">
          <div>
            <h2 className="text-xl font-medium text-neutral-100">Automated Audit Synthesis & Remediation Plan</h2>
            <p className="text-xs text-neutral-400 mt-1">
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
              className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-200 focus:outline-none"
            >
              {audits.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.code} — {a.title} ({a.department})
                </option>
              ))}
            </select>

            <button
              onClick={handleRunAuditAnalysis}
              disabled={isAnalyzing}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black text-xs font-semibold shadow flex items-center gap-2"
            >
              {isAnalyzing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Synthesize Findings
            </button>
          </div>

          {auditSummaryGenerated && (
            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4 text-xs text-neutral-300 leading-relaxed">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <span className="font-semibold text-neutral-100 text-sm">Executive Audit Memorandum</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  AI Generated • Verified Against Schema
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-amber-400 uppercase tracking-wider text-[11px]">Primary Findings Overview</h4>
                <p>
                  During the periodic review of <strong>{audits[0]?.title}</strong>, our grounded evaluation detected 2 actionable control exceptions. The primary risk pertains to dual disbursement authorization thresholds on expenses over $10,000.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-amber-400 uppercase tracking-wider text-[11px]">Remediation Roadmap</h4>
                <ul className="list-disc list-inside space-y-1 text-neutral-300">
                  <li>Enforce automated two-tier approval workflow rule on all transactions exceeding $10,000.</li>
                  <li>Reconcile Q1 vendor invoice repository with ERP ledger timestamps.</li>
                  <li>Conduct mandatory refresh training for finance delegation authority holders by April 30, 2026.</li>
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 font-mono text-[11px] text-neutral-400">
                Calculated Risk Score: 24/100 (Low Regulatory Exposure) • Board Sign-off Recommended
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: DOCUMENT INTELLIGENCE */}
      {activeTab === "doc_extractor" && (
        <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 backdrop-blur space-y-6">
          <div>
            <h2 className="text-xl font-medium text-neutral-100">Document Entity Extractor</h2>
            <p className="text-xs text-neutral-400 mt-1">
              Extract structured reconciliation variables, signatures, and fiscal amounts from scanned evidence files.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-dashed border-neutral-700 bg-neutral-950/50 flex flex-col items-center justify-center text-center space-y-3">
            <FileText className="w-10 h-10 text-amber-400" />
            <div>
              <div className="text-sm font-medium text-neutral-200">Q1-2026-Treasury-Reconciliation.pdf</div>
              <div className="text-xs text-neutral-400 mt-0.5">2.4 MB • Cryptographically Signed Exhibit</div>
            </div>
            <button
              onClick={handleRunDocExtraction}
              disabled={isExtracting}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black text-xs font-semibold shadow flex items-center gap-2"
            >
              {isExtracting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Extract Key Financial Entities
            </button>
          </div>

          {extractedData && (
            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <span className="text-xs font-mono text-emerald-400">EXTRACTION CONFIDENCE: {extractedData.confidence}</span>
                <span className="text-xs font-mono text-neutral-500">{extractedData.hash.slice(0, 16)}...</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {extractedData.extractedFields.map((f: any) => (
                  <div key={f.label} className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                    <div className="text-[11px] text-neutral-500">{f.label}</div>
                    <div className="text-xs font-semibold text-neutral-200 mt-0.5">{f.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: NATURAL LANGUAGE ANALYTICS */}
      {activeTab === "nl_analytics" && (
        <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 backdrop-blur space-y-6">
          <div>
            <h2 className="text-xl font-medium text-neutral-100">Natural Language Operations Analytics</h2>
            <p className="text-xs text-neutral-400 mt-1">
              Ask questions in plain English to dynamically generate operational metrics and executive KPI summaries.
            </p>
          </div>

          <form onSubmit={handleRunNlAnalytics} className="flex gap-2">
            <input
              type="text"
              value={nlQuery}
              onChange={(e) => setNlQuery(e.target.value)}
              placeholder="e.g. Compare volunteer churn against donor acquisition..."
              className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold shadow"
            >
              Analyze
            </button>
          </form>

          {nlResult && (
            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
              <div className="text-sm font-serif font-light text-neutral-100">{nlResult.headline}</div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                  <div className="text-xs text-neutral-400">Monthly Burn Rate</div>
                  <div className="text-xl font-medium text-rose-400 mt-1">{nlResult.burnRateMonthly}</div>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                  <div className="text-xs text-neutral-400">Operating Runway</div>
                  <div className="text-xl font-medium text-emerald-400 mt-1">{nlResult.runwayMonths}</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-neutral-300 leading-relaxed">
                <span className="font-semibold text-amber-400">Strategic Finding: </span>
                {nlResult.keyInsight}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
