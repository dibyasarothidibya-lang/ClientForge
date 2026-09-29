"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import ThreeDCard from "@/components/motion/ThreeDCard";
import {
  Code,
  Key,
  Webhook,
  Terminal,
  Copy,
  Check,
  Plus,
  RefreshCw,
  Eye,
  EyeOff,
  Send,
  AlertCircle,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Shield,
  X,
  Cpu,
  Layers,
  Zap,
  Activity
} from "lucide-react";

interface ApiKeyItem {
  id: string;
  name: string;
  keyMasked: string;
  secretFull: string;
  type: "Live" | "Test";
  scope: string;
  createdAt: string;
  lastUsed: string;
}

interface WebhookItem {
  id: string;
  url: string;
  events: string[];
  status: "Active" | "Failing" | "Paused";
  secret: string;
  lastDelivered: string;
}

export default function DeveloperCenterPage() {
  const { activeOrg, audits, projects, campaigns, transactions } = useWorkspace();

  const [activeTab, setActiveTab] = useState<"keys" | "webhooks" | "explorer">("keys");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // API Keys state
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>([
    {
      id: "key_prod_01",
      name: "Primary ERP Sync Service",
      keyMasked: "pk_live_••••••••••••••••94f2",
      secretFull: "pk_live_8f9a2b7c1d4e6f803b2a94f2",
      type: "Live",
      scope: "Full Access (Read/Write)",
      createdAt: "2026-01-15",
      lastUsed: "2 mins ago",
    },
    {
      id: "key_test_02",
      name: "Donor Portal Sandbox Key",
      keyMasked: "pk_test_••••••••••••••••881c",
      secretFull: "pk_test_3a8b7c6d5e4f3a2b1c881c",
      type: "Test",
      scope: "Donations (Write-Only)",
      createdAt: "2026-02-10",
      lastUsed: "Just now",
    },
  ]);

  // Create Key Modal
  const [isCreateKeyOpen, setIsCreateKeyOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyType, setNewKeyType] = useState<"Live" | "Test">("Test");
  const [newKeyScope, setNewKeyScope] = useState("Read/Write");
  const [createdSecret, setCreatedSecret] = useState<string | null>(null);

  // Webhooks state
  const [webhooks, setWebhooks] = useState<WebhookItem[]>([
    {
      id: "wh_01",
      url: "https://api.hopefoundation.org/v1/webhooks/donations",
      events: ["donation.succeeded", "campaign.goal_reached"],
      status: "Active",
      secret: "whsec_99a8b7c6d5e4f3a2b1c0",
      lastDelivered: "14 mins ago (200 OK)",
    },
    {
      id: "wh_02",
      url: "https://compliance.internal.net/events/audit-findings",
      events: ["audit.finding_created", "audit.status_changed"],
      status: "Active",
      secret: "whsec_33d2e1f0a9b8c7d6e5f4",
      lastDelivered: "1 hour ago (200 OK)",
    },
  ]);

  // Webhook Delivery Logs
  const [deliveryLogs, setDeliveryLogs] = useState([
    { id: "del_01", event: "donation.succeeded", url: "https://api.hopefoundation.org/...", code: 200, latency: "84ms", time: "Just now" },
    { id: "del_02", event: "audit.finding_created", url: "https://compliance.internal.net/...", code: 200, latency: "112ms", time: "1 hour ago" },
    { id: "del_03", event: "task.status_changed", url: "https://api.hopefoundation.org/...", code: 200, latency: "62ms", time: "3 hours ago" },
  ]);

  const [testWebhookFiring, setTestWebhookFiring] = useState(false);
  const [testWebhookSuccess, setTestWebhookSuccess] = useState(false);

  // API Explorer state
  const [explorerEndpoint, setExplorerEndpoint] = useState("/v1/audits");
  const [explorerMethod, setExplorerMethod] = useState("GET");
  const [explorerResponse, setExplorerResponse] = useState<string | null>(null);
  const [explorerLoading, setExplorerLoading] = useState(false);

  const kpis = [
    {
      title: "Active API Credentials",
      value: apiKeys.length.toString(),
      subtext: "Scoped client credentials",
      icon: Key,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-500/10",
      glare: "#6366f1",
      badge: "Zero-trust tokens",
    },
    {
      title: "Webhook Subscriptions",
      value: webhooks.length.toString(),
      subtext: "HMAC SHA-256 signed hooks",
      icon: Webhook,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
      glare: "#10b981",
      badge: "All active",
    },
    {
      title: "Delivery Success Rate",
      value: "100.0%",
      subtext: "Trailing 1,000 deliveries",
      icon: CheckCircle2,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10",
      glare: "#3b82f6",
      badge: "HTTP 200 OK",
    },
    {
      title: "Median Hook Latency",
      value: "64ms",
      subtext: "Global edge dispatch roundtrip",
      icon: Zap,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10",
      glare: "#f59e0b",
      badge: "Edge P95 86ms",
    },
  ];

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    const secret = `pk_${newKeyType.toLowerCase()}_${Math.random().toString(36).substring(2, 18)}${Math.random().toString(36).substring(2, 10)}`;
    const masked = `pk_${newKeyType.toLowerCase()}_••••••••••••••••${secret.slice(-4)}`;

    const newKey: ApiKeyItem = {
      id: `key_${Date.now()}`,
      name: newKeyName,
      keyMasked: masked,
      secretFull: secret,
      type: newKeyType,
      scope: newKeyScope,
      createdAt: new Date().toISOString().slice(0, 10),
      lastUsed: "Never",
    };

    setApiKeys((prev) => [newKey, ...prev]);
    setCreatedSecret(secret);
    setNewKeyName("");
  };

  const handleFireTestWebhook = () => {
    setTestWebhookFiring(true);
    setTestWebhookSuccess(false);

    setTimeout(() => {
      setTestWebhookFiring(false);
      setTestWebhookSuccess(true);
      setDeliveryLogs((prev) => [
        {
          id: `del_${Date.now()}`,
          event: "donation.succeeded (TEST)",
          url: "https://api.hopefoundation.org/v1/webhooks/donations",
          code: 200,
          latency: "46ms",
          time: "Just now",
        },
        ...prev,
      ]);
    }, 900);
  };

  const handleRunExplorer = () => {
    setExplorerLoading(true);
    setTimeout(() => {
      let data: any = {};
      if (explorerEndpoint === "/v1/audits") {
        data = { audits };
      } else if (explorerEndpoint === "/v1/projects") {
        data = { projects };
      } else if (explorerEndpoint === "/v1/campaigns") {
        data = { campaigns };
      } else {
        data = { transactions: transactions.slice(0, 5) };
      }

      setExplorerResponse(
        JSON.stringify(
          {
            status: 200,
            organization: activeOrg.name,
            timestamp: new Date().toISOString(),
            data,
          },
          null,
          2
        )
      );
      setExplorerLoading(false);
    }, 400);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              <Code className="w-3.5 h-3.5" /> API & Developer Center
            </span>
            <span className="text-xs text-slate-500 dark:text-neutral-400">OpenAPI 3.1 Compliant</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-sans font-semibold tracking-tight text-slate-950 dark:text-neutral-100">
            Developer APIs & Webhooks
          </h1>
          <p className="text-sm text-slate-500 dark:text-neutral-400 mt-1 max-w-2xl">
            Programmatic access keys, HMAC-signed webhook dispatches, delivery telemetry, and interactive sandbox explorer.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsCreateKeyOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-400 text-white dark:text-black text-xs font-semibold shadow-md transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Generate New Key
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

      {/* Tabs Navigation with Spring Sliding Pill */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/[0.08] pb-3 text-xs font-sans font-medium">
        {[
          { key: "keys", label: `API Keys (${apiKeys.length})` },
          { key: "webhooks", label: `Webhooks & Endpoints (${webhooks.length})` },
          { key: "explorer", label: "Interactive API Sandbox Explorer" },
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
                  layoutId="developerTabIndicator"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  className="absolute inset-0 rounded-xl bg-slate-200/80 dark:bg-white/10 border border-slate-300 dark:border-white/10 shadow-xs z-0"
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* TAB 1: API KEYS */}
      {activeTab === "keys" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-4">
            <h2 className="text-base font-medium text-slate-950 dark:text-neutral-100">Production & Sandbox Credentials</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-neutral-800 text-[11px] font-sans font-semibold text-slate-500 dark:text-neutral-400 uppercase tracking-wider">
                    <th className="py-3 px-3">Label / Description</th>
                    <th className="py-3 px-3">Environment</th>
                    <th className="py-3 px-3">Token Mask</th>
                    <th className="py-3 px-3">Permission Scope</th>
                    <th className="py-3 px-3">Created</th>
                    <th className="py-3 px-3">Last Active</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-neutral-800/60 text-xs">
                  {apiKeys.map((k) => (
                    <motion.tr
                      key={k.id}
                      whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.03)" }}
                      className="transition-colors"
                    >
                      <td className="py-3 px-3 font-medium text-slate-900 dark:text-neutral-200">{k.name}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold border ${
                            k.type === "Live"
                              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
                              : "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20"
                          }`}
                        >
                          {k.type}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-500 dark:text-neutral-400">{k.keyMasked}</td>
                      <td className="py-3 px-3 text-slate-700 dark:text-neutral-300">{k.scope}</td>
                      <td className="py-3 px-3 text-slate-500 dark:text-neutral-400 font-sans text-xs whitespace-nowrap">{k.createdAt}</td>
                      <td className="py-3 px-3 text-slate-500 dark:text-neutral-400 font-sans text-xs whitespace-nowrap">{k.lastUsed}</td>
                      <td className="py-3 px-3 text-right">
                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => copyToClipboard(k.id, k.secretFull)}
                          className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-neutral-800 text-slate-400 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
                        >
                          {copiedId === k.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WEBHOOKS */}
      {activeTab === "webhooks" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-medium text-slate-950 dark:text-neutral-100">Registered Webhook Endpoints</h2>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                  Signed with HMAC SHA-256 signatures via <code className="text-amber-600 dark:text-amber-400 font-mono">X-Forge-Signature</code> header.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleFireTestWebhook}
                disabled={testWebhookFiring}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-800 dark:text-neutral-200 text-xs font-medium flex items-center gap-2 cursor-pointer transition shadow-xs"
              >
                {testWebhookFiring ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                Trigger Test Ping
              </motion.button>
            </div>

            {testWebhookSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Test payload dispatched successfully. Recipient responded with HTTP 200 OK.
              </motion.div>
            )}

            <div className="space-y-3">
              {webhooks.map((wh) => (
                <div key={wh.id} className="p-4 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <code className="font-mono text-xs text-slate-900 dark:text-neutral-200 font-semibold">{wh.url}</code>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-sans font-medium whitespace-nowrap">
                        {wh.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 text-[10px] text-slate-500 dark:text-neutral-400">
                      <span>Subscribed:</span>
                      {wh.events.map((e) => (
                        <span key={e} className="font-sans font-medium bg-white dark:bg-neutral-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-300">
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 dark:text-neutral-400 font-sans font-medium text-right whitespace-nowrap">
                    <div>{wh.lastDelivered}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Logs */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-4">
            <h3 className="text-sm font-medium text-slate-950 dark:text-neutral-200">Recent Dispatch & Delivery Telemetry</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-neutral-800 text-[11px] font-sans font-semibold text-slate-500 dark:text-neutral-400 uppercase tracking-wider">
                    <th className="py-2.5 px-3">Event Type</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Latency</th>
                    <th className="py-2.5 px-3">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-neutral-800/60 font-sans text-xs">
                  {deliveryLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-neutral-800/20">
                      <td className="py-2.5 px-3 text-slate-800 dark:text-neutral-300 font-medium whitespace-nowrap">{log.event}</td>
                      <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-medium whitespace-nowrap">{log.code} OK</td>
                      <td className="py-2.5 px-3 text-slate-500 dark:text-neutral-400 whitespace-nowrap">{log.latency}</td>
                      <td className="py-2.5 px-3 text-slate-400 dark:text-neutral-500 whitespace-nowrap">{log.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: API EXPLORER */}
      {activeTab === "explorer" && (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-medium text-slate-950 dark:text-neutral-100">REST API Playground</h2>
            <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
              Execute live schema queries against {activeOrg.name}&apos;s isolated tenant datastore.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <span className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 font-sans text-xs font-bold text-emerald-600 dark:text-emerald-400 text-center">
              {explorerMethod}
            </span>
            <select
              value={explorerEndpoint}
              onChange={(e) => {
                setExplorerEndpoint(e.target.value);
                setExplorerResponse(null);
              }}
              className="flex-1 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl px-3 py-2 text-xs font-sans font-medium text-slate-800 dark:text-neutral-200 focus:outline-none cursor-pointer"
            >
              <option value="/v1/audits">/v1/audits (List Audit Engagements & Findings)</option>
              <option value="/v1/projects">/v1/projects (List Program Initiatives)</option>
              <option value="/v1/campaigns">/v1/campaigns (List Active Fundraising Campaigns)</option>
              <option value="/v1/ledger">/v1/ledger (List Recent Treasury Transactions)</option>
            </select>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRunExplorer}
              disabled={explorerLoading}
              className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-400 disabled:opacity-50 text-white dark:text-black text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              {explorerLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              Send Request
            </motion.button>
          </div>

          {explorerResponse && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-slate-900 dark:bg-neutral-950 border border-slate-800 dark:border-neutral-800 text-xs overflow-x-auto max-h-96 shadow-md"
            >
              <div className="flex items-center justify-between text-neutral-400 pb-2 mb-2 border-b border-neutral-800 text-[11px] font-sans">
                <span>HTTP 200 OK • Content-Type: application/json</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => copyToClipboard("exp_resp", explorerResponse)}
                  className="hover:text-white flex items-center gap-1 cursor-pointer font-sans"
                >
                  {copiedId === "exp_resp" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />} Copy JSON
                </motion.button>
              </div>
              <pre className="text-emerald-400/90 leading-relaxed font-mono">{explorerResponse}</pre>
            </motion.div>
          )}
        </div>
      )}

      {/* MODAL: CREATE API KEY WITH ANIMATEPRESENCE */}
      <AnimatePresence>
        {isCreateKeyOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsCreateKeyOpen(false);
                setCreatedSecret(null);
              }}
              className="fixed inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-xs cursor-pointer"
            />

            {/* Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
              className="relative bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-neutral-800 pb-3">
                <h3 className="text-base font-medium text-slate-950 dark:text-neutral-100">Generate API Key</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setIsCreateKeyOpen(false);
                    setCreatedSecret(null);
                  }}
                  className="p-1 rounded-lg text-slate-400 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {!createdSecret ? (
                <form onSubmit={handleCreateKey} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1">Key Label *</label>
                    <input
                      type="text"
                      required
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      placeholder="e.g. CI/CD Deployment Integration"
                      className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-neutral-200 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1">Environment</label>
                      <select
                        value={newKeyType}
                        onChange={(e) => setNewKeyType(e.target.value as any)}
                        className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-neutral-200 focus:outline-none"
                      >
                        <option value="Test">Sandbox / Test</option>
                        <option value="Live">Live / Production</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1">Permission Scope</label>
                      <select
                        value={newKeyScope}
                        onChange={(e) => setNewKeyScope(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-neutral-200 focus:outline-none"
                      >
                        <option value="Full Access">Full Access</option>
                        <option value="Read-Only">Read-Only</option>
                        <option value="Write-Only">Write-Only</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-neutral-800">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setIsCreateKeyOpen(false)}
                      className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 text-xs font-medium hover:bg-slate-200 dark:hover:bg-neutral-700 cursor-pointer"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-400 text-white dark:text-black text-xs font-semibold shadow-md cursor-pointer transition"
                    >
                      Generate Secret
                    </motion.button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300">
                    Make sure to copy your key now. You will not be able to see this secret again!
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-800 dark:text-neutral-200 flex items-center justify-between">
                    <code className="font-mono truncate mr-2 font-medium">{createdSecret}</code>
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => copyToClipboard("new_key", createdSecret)}
                      className="p-1.5 rounded-lg bg-slate-200 dark:bg-neutral-800 hover:bg-slate-300 dark:hover:bg-neutral-700 text-slate-700 dark:text-neutral-300 cursor-pointer"
                    >
                      {copiedId === "new_key" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </motion.button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsCreateKeyOpen(false);
                      setCreatedSecret(null);
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-400 text-white dark:text-black text-xs font-semibold shadow-md cursor-pointer"
                  >
                    I have copied my secret key
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
