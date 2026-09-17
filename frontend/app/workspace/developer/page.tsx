"use client";

import React, { useState } from "react";
import { useWorkspace } from "@/context/WorkspaceContext";
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
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Code className="w-3.5 h-3.5" /> API & Developer Center
            </span>
            <span className="text-xs text-neutral-400">OpenAPI 3.1 Compliant</span>
          </div>
          <h1 className="text-3xl font-serif font-light tracking-tight text-neutral-100">
            Developer APIs & Webhooks
          </h1>
          <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
            Programmatic access keys, HMAC-signed webhook dispatches, delivery telemetry, and interactive sandbox explorer.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCreateKeyOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold shadow-md shadow-amber-500/20 transition"
          >
            <Plus className="w-4 h-4" />
            Generate New Key
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
        <button
          onClick={() => setActiveTab("keys")}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition ${
            activeTab === "keys" ? "bg-neutral-800 text-white shadow" : "text-neutral-400 hover:text-white"
          }`}
        >
          API Keys ({apiKeys.length})
        </button>
        <button
          onClick={() => setActiveTab("webhooks")}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition ${
            activeTab === "webhooks" ? "bg-neutral-800 text-white shadow" : "text-neutral-400 hover:text-white"
          }`}
        >
          Webhooks & Endpoints ({webhooks.length})
        </button>
        <button
          onClick={() => setActiveTab("explorer")}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition ${
            activeTab === "explorer" ? "bg-neutral-800 text-white shadow" : "text-neutral-400 hover:text-white"
          }`}
        >
          Interactive API Sandbox Explorer
        </button>
      </div>

      {/* TAB 1: API KEYS */}
      {activeTab === "keys" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur space-y-4">
            <h2 className="text-base font-medium text-neutral-100">Production & Sandbox Credentials</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-800 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                    <th className="py-3 px-3">Label / Description</th>
                    <th className="py-3 px-3">Environment</th>
                    <th className="py-3 px-3">Token Mask</th>
                    <th className="py-3 px-3">Permission Scope</th>
                    <th className="py-3 px-3">Created</th>
                    <th className="py-3 px-3">Last Active</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 text-xs">
                  {apiKeys.map((k) => (
                    <tr key={k.id} className="hover:bg-neutral-800/30 transition">
                      <td className="py-3 px-3 font-medium text-neutral-200">{k.name}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold border ${
                            k.type === "Live"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          }`}
                        >
                          {k.type}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-neutral-400">{k.keyMasked}</td>
                      <td className="py-3 px-3 text-neutral-300">{k.scope}</td>
                      <td className="py-3 px-3 text-neutral-400">{k.createdAt}</td>
                      <td className="py-3 px-3 text-neutral-400">{k.lastUsed}</td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => copyToClipboard(k.id, k.secretFull)}
                          className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white transition"
                        >
                          {copiedId === k.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
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

      {/* TAB 2: WEBHOOKS */}
      {activeTab === "webhooks" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-medium text-neutral-100">Registered Webhook Endpoints</h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Signed with HMAC SHA-256 signatures via <code className="text-amber-400">X-Forge-Signature</code> header.
                </p>
              </div>

              <button
                onClick={handleFireTestWebhook}
                disabled={testWebhookFiring}
                className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium flex items-center gap-2"
              >
                {testWebhookFiring ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                Trigger Test Ping
              </button>
            </div>

            {testWebhookSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Test payload dispatched successfully. Recipient responded with HTTP 200 OK.
              </div>
            )}

            <div className="space-y-3">
              {webhooks.map((wh) => (
                <div key={wh.id} className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-neutral-200 font-medium">{wh.url}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {wh.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 text-[10px] text-neutral-400">
                      <span>Subscribed:</span>
                      {wh.events.map((e) => (
                        <span key={e} className="font-mono bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800">
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-neutral-400 font-mono text-right">
                    <div>{wh.lastDelivered}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Logs */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur space-y-4">
            <h3 className="text-sm font-medium text-neutral-200">Recent Dispatch & Delivery Telemetry</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-neutral-800 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                    <th className="py-2.5 px-3">Event Type</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Latency</th>
                    <th className="py-2.5 px-3">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 font-mono text-[11px]">
                  {deliveryLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-neutral-800/20">
                      <td className="py-2.5 px-3 text-neutral-300">{log.event}</td>
                      <td className="py-2.5 px-3 text-emerald-400">{log.code} OK</td>
                      <td className="py-2.5 px-3 text-neutral-400">{log.latency}</td>
                      <td className="py-2.5 px-3 text-neutral-500">{log.time}</td>
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
        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur space-y-6">
          <div>
            <h2 className="text-base font-medium text-neutral-100">REST API Playground</h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Execute live schema queries against {activeOrg.name}&apos;s isolated tenant datastore.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 font-mono text-xs font-bold text-emerald-400">
              {explorerMethod}
            </span>
            <select
              value={explorerEndpoint}
              onChange={(e) => {
                setExplorerEndpoint(e.target.value);
                setExplorerResponse(null);
              }}
              className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs font-mono text-neutral-200 focus:outline-none"
            >
              <option value="/v1/audits">/v1/audits (List Audit Engagements & Findings)</option>
              <option value="/v1/projects">/v1/projects (List Program Initiatives)</option>
              <option value="/v1/campaigns">/v1/campaigns (List Active Fundraising Campaigns)</option>
              <option value="/v1/ledger">/v1/ledger (List Recent Treasury Transactions)</option>
            </select>
            <button
              onClick={handleRunExplorer}
              disabled={explorerLoading}
              className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black text-xs font-semibold shadow flex items-center gap-1.5 transition"
            >
              {explorerLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              Send Request
            </button>
          </div>

          {explorerResponse && (
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs overflow-x-auto max-h-96">
              <div className="flex items-center justify-between text-neutral-500 pb-2 mb-2 border-b border-neutral-800 text-[11px]">
                <span>HTTP 200 OK • Content-Type: application/json</span>
                <button
                  onClick={() => copyToClipboard("exp_resp", explorerResponse)}
                  className="hover:text-white flex items-center gap-1"
                >
                  {copiedId === "exp_resp" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />} Copy JSON
                </button>
              </div>
              <pre className="text-neutral-300">{explorerResponse}</pre>
            </div>
          )}
        </div>
      )}

      {/* MODAL: CREATE API KEY */}
      {isCreateKeyOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-base font-medium text-neutral-100">Generate API Key</h3>
              <button
                onClick={() => {
                  setIsCreateKeyOpen(false);
                  setCreatedSecret(null);
                }}
                className="p-1 rounded text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!createdSecret ? (
              <form onSubmit={handleCreateKey} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Key Label *</label>
                  <input
                    type="text"
                    required
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="e.g. CI/CD Deployment Integration"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">Environment</label>
                    <select
                      value={newKeyType}
                      onChange={(e) => setNewKeyType(e.target.value as any)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none"
                    >
                      <option value="Test">Sandbox / Test</option>
                      <option value="Live">Live / Production</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">Permission Scope</label>
                    <select
                      value={newKeyScope}
                      onChange={(e) => setNewKeyScope(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none"
                    >
                      <option value="Full Access">Full Access</option>
                      <option value="Read-Only">Read-Only</option>
                      <option value="Write-Only">Write-Only</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setIsCreateKeyOpen(false)}
                    className="px-4 py-2 rounded-lg bg-neutral-800 text-neutral-300 text-xs font-medium hover:bg-neutral-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold shadow"
                  >
                    Generate Secret
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                  Make sure to copy your key now. You will not be able to see this secret again!
                </div>

                <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl font-mono text-xs text-neutral-200 flex items-center justify-between">
                  <span className="truncate mr-2">{createdSecret}</span>
                  <button
                    onClick={() => copyToClipboard("new_key", createdSecret)}
                    className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                  >
                    {copiedId === "new_key" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <button
                  onClick={() => {
                    setIsCreateKeyOpen(false);
                    setCreatedSecret(null);
                  }}
                  className="w-full py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold"
                >
                  I have copied my secret key
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
