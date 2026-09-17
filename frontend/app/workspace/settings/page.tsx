"use client";

import React, { useState } from "react";
import { useWorkspace } from "@/context/WorkspaceContext";
import { UserRole, Member } from "@/lib/demoData";
import {
  Settings,
  Users,
  CreditCard,
  Shield,
  Layers,
  Save,
  Check,
  Plus,
  Mail,
  X,
  ExternalLink,
  Lock,
  Download,
  CheckCircle2,
} from "lucide-react";

export default function SettingsPage() {
  const { activeOrg, members, currentRole, setActiveOrg } = useWorkspace();

  const [activeTab, setActiveTab] = useState<"general" | "members" | "billing" | "security" | "integrations">("general");

  // General Form
  const [orgName, setOrgName] = useState(activeOrg.name);
  const [orgSlug, setOrgSlug] = useState(activeOrg.slug);
  const [orgType, setOrgType] = useState(activeOrg.type);
  const [currency, setCurrency] = useState(activeOrg.currency);
  const [timezone, setTimezone] = useState(activeOrg.timezone);
  const [isSaved, setIsSaved] = useState(false);

  // Members Management
  const [memberList, setMemberList] = useState<Member[]>(members);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<UserRole>("Member");
  const [inviteTeam, setInviteTeam] = useState("Operations");

  // Security Toggles
  const [twoFactorEnforced, setTwoFactorEnforced] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("1h");
  const [ipAllowlist, setIpAllowlist] = useState("198.51.100.0/24");

  // Integrations state
  const [integrations, setIntegrations] = useState([
    { id: "stripe", name: "Stripe Connect", desc: "PCI-compliant recurring donations and gateway dispatches", connected: true },
    { id: "slack", name: "Slack Alerts", desc: "Instant notifications for approvals and high-risk audit findings", connected: true },
    { id: "google", name: "Google Workspace SAML", desc: "Enterprise Single Sign-On and employee directory sync", connected: true },
    { id: "quickbooks", name: "QuickBooks Online", desc: "Bi-directional ledger export for tax and CPA filing", connected: false },
    { id: "s3", name: "AWS S3 WORM Storage", desc: "Cryptographically sealed 7-year statutory document archive", connected: true },
  ]);

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveOrg({
      ...activeOrg,
      name: orgName,
      slug: orgSlug,
      type: orgType,
      currency,
      timezone,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    const newMem: Member = {
      id: `mem_${Date.now()}`,
      name: inviteEmail.split("@")[0].replace(".", " "),
      email: inviteEmail,
      role: inviteRole,
      department: inviteTeam,
      team: inviteTeam,
      type: "Full-time",
      status: "Invited",
      avatar: "/logo.jpg",
      joinDate: new Date().toISOString().slice(0, 10),
      skills: ["Operations", "Coordination"],
      assignedProjects: 1,
    };

    setMemberList((prev) => [newMem, ...prev]);
    setInviteEmail("");
    setIsInviteOpen(false);
  };

  const toggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, connected: !item.connected } : item))
    );
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-800 text-neutral-300 border border-neutral-700">
              <Settings className="w-3.5 h-3.5 text-amber-400" /> Platform Administration
            </span>
            <span className="text-xs text-neutral-400">Tenant: {activeOrg.name}</span>
          </div>
          <h1 className="text-3xl font-serif font-light tracking-tight text-neutral-100">
            Workspace Settings & Access Controls
          </h1>
          <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
            Manage organization identity, team roles, subscription limits, SOC-2 security protocols, and third-party integrations.
          </p>
        </div>

        {isSaved && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-medium text-emerald-400">
            <Check className="w-4 h-4" /> Changes saved successfully
          </div>
        )}
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-neutral-800 pb-2">
        <button
          onClick={() => setActiveTab("general")}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition ${
            activeTab === "general" ? "bg-neutral-800 text-white shadow" : "text-neutral-400 hover:text-white"
          }`}
        >
          General Identity
        </button>
        <button
          onClick={() => setActiveTab("members")}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition ${
            activeTab === "members" ? "bg-neutral-800 text-white shadow" : "text-neutral-400 hover:text-white"
          }`}
        >
          Members & RBAC Roles ({memberList.length})
        </button>
        <button
          onClick={() => setActiveTab("billing")}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition ${
            activeTab === "billing" ? "bg-neutral-800 text-white shadow" : "text-neutral-400 hover:text-white"
          }`}
        >
          Plans & Subscriptions
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition ${
            activeTab === "security" ? "bg-neutral-800 text-white shadow" : "text-neutral-400 hover:text-white"
          }`}
        >
          Security & Compliance
        </button>
        <button
          onClick={() => setActiveTab("integrations")}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition ${
            activeTab === "integrations" ? "bg-neutral-800 text-white shadow" : "text-neutral-400 hover:text-white"
          }`}
        >
          Connected Integrations
        </button>
      </div>

      {/* TAB 1: GENERAL IDENTITY */}
      {activeTab === "general" && (
        <form onSubmit={handleSaveGeneral} className="max-w-2xl p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur space-y-4">
          <h2 className="text-base font-medium text-neutral-100">Organization Identity</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Organization Name</label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Workspace Slug</label>
              <input
                type="text"
                value={orgSlug}
                onChange={(e) => setOrgSlug(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs font-mono text-neutral-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">Entity Classification</label>
            <input
              type="text"
              value={orgType}
              onChange={(e) => setOrgType(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Base Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none"
              >
                <option value="USD ($)">USD ($)</option>
                <option value="EUR (€)">EUR (€)</option>
                <option value="GBP (£)">GBP (£)</option>
                <option value="CAD ($)">CAD ($)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Primary Timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none"
              >
                <option value="UTC-5 (Eastern Time)">UTC-5 (Eastern Time)</option>
                <option value="UTC-8 (Pacific Time)">UTC-8 (Pacific Time)</option>
                <option value="UTC+0 (London)">UTC+0 (London)</option>
                <option value="UTC+1 (Central Europe)">UTC+1 (Central Europe)</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-800 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold shadow flex items-center gap-1.5 transition"
            >
              <Save className="w-4 h-4" /> Save Identity Settings
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: MEMBERS & RBAC */}
      {activeTab === "members" && (
        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-medium text-neutral-100">Team Members & Access Levels</h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Current live impersonation role in header: <strong>{currentRole}</strong>
              </p>
            </div>
            <button
              onClick={() => setIsInviteOpen(true)}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold shadow flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Invite Member
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-800 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                  <th className="py-3 px-3">Member</th>
                  <th className="py-3 px-3">Department</th>
                  <th className="py-3 px-3">Assigned Role</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {memberList.map((m) => (
                  <tr key={m.id} className="hover:bg-neutral-800/30">
                    <td className="py-3 px-3">
                      <div className="font-medium text-neutral-200">{m.name}</div>
                      <div className="text-[11px] text-neutral-400">{m.email}</div>
                    </td>
                    <td className="py-3 px-3 text-neutral-300">{m.department}</td>
                    <td className="py-3 px-3">
                      <select
                        value={m.role}
                        onChange={(e) => {
                          const updated = memberList.map((item) =>
                            item.id === m.id ? { ...item, role: e.target.value as UserRole } : item
                          );
                          setMemberList(updated);
                        }}
                        className="bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-200 focus:outline-none"
                      >
                        <option value="Owner">Owner</option>
                        <option value="Administrator">Administrator</option>
                        <option value="Manager">Manager</option>
                        <option value="Finance">Finance</option>
                        <option value="Auditor">Auditor</option>
                        <option value="Member">Member</option>
                      </select>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold border ${
                          m.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-neutral-400">{m.joinDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: BILLING & SUBSCRIPTIONS */}
      {activeTab === "billing" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Current Plan</span>
                <h3 className="text-2xl font-serif font-light text-neutral-100 mt-1">
                  {activeOrg.plan} Operations Tier
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Billed annually at $2,990 / year • Renews on November 15, 2026
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Active & Paid
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-neutral-800/80 text-xs">
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-neutral-500">Active Seat Usage</div>
                <div className="text-lg font-medium text-neutral-200 mt-1">14 / 25 Seats</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">11 seats available</div>
              </div>
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-neutral-500">Evidence Storage</div>
                <div className="text-lg font-medium text-neutral-200 mt-1">24.8 GB / 100 GB</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">WORM Compliant</div>
              </div>
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-neutral-500">Default Payment Method</div>
                <div className="text-lg font-medium text-neutral-200 mt-1">Visa •••• 4242</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">Expires 08/28</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SECURITY & COMPLIANCE */}
      {activeTab === "security" && (
        <div className="max-w-2xl p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur space-y-6">
          <h2 className="text-base font-medium text-neutral-100">Enterprise Security Controls</h2>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-950 border border-neutral-800">
              <div>
                <div className="font-medium text-neutral-200">Enforce Mandatory Two-Factor Authentication (2FA)</div>
                <div className="text-neutral-400 mt-0.5">All administrators and auditors must verify with TOTP</div>
              </div>
              <button
                type="button"
                onClick={() => setTwoFactorEnforced(!twoFactorEnforced)}
                className={`w-11 h-6 rounded-full transition relative ${
                  twoFactorEnforced ? "bg-emerald-500" : "bg-neutral-800"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition absolute top-1 ${
                    twoFactorEnforced ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
              <label className="block font-medium text-neutral-200">Inactivity Session Timeout</label>
              <select
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-neutral-300 focus:outline-none"
              >
                <option value="15m">15 Minutes (Strict Banking)</option>
                <option value="1h">1 Hour (Recommended)</option>
                <option value="8h">8 Hours (Full Shift)</option>
                <option value="24h">24 Hours</option>
              </select>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
              <label className="block font-medium text-neutral-200">IP CIDR Allowlist</label>
              <input
                type="text"
                value={ipAllowlist}
                onChange={(e) => setIpAllowlist(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 font-mono text-neutral-300 focus:outline-none"
              />
              <p className="text-[11px] text-neutral-500">Only incoming connections matching this subnet can access admin endpoints.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: CONNECTED INTEGRATIONS */}
      {activeTab === "integrations" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-neutral-100">{item.name}</h3>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                      item.connected
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-neutral-800 text-neutral-400 border-neutral-700"
                    }`}
                  >
                    {item.connected ? "Connected" : "Disconnected"}
                  </span>
                </div>
                <p className="text-xs text-neutral-400">{item.desc}</p>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex justify-end">
                <button
                  onClick={() => toggleIntegration(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    item.connected
                      ? "bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                      : "bg-amber-500 hover:bg-amber-400 text-black font-semibold"
                  }`}
                >
                  {item.connected ? "Configure Settings" : "Connect Integration"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL: INVITE MEMBER */}
      {isInviteOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleInviteSubmit}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-base font-medium text-neutral-100">Invite Workspace Member</h3>
              <button
                type="button"
                onClick={() => setIsInviteOpen(false)}
                className="p-1 rounded text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Corporate Email Address *</label>
              <input
                type="email"
                required
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="colleague@hopefoundation.org"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Initial RBAC Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none"
                >
                  <option value="Administrator">Administrator</option>
                  <option value="Manager">Manager</option>
                  <option value="Finance">Finance</option>
                  <option value="Auditor">Auditor</option>
                  <option value="Member">Member</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Department</label>
                <input
                  type="text"
                  value={inviteTeam}
                  onChange={(e) => setInviteTeam(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setIsInviteOpen(false)}
                className="px-4 py-2 rounded-lg bg-neutral-800 text-neutral-300 text-xs font-medium hover:bg-neutral-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold shadow"
              >
                Send Invitation
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
