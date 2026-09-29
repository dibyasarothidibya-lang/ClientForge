"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import { UserRole, Member } from "@/lib/demoData";
import {
  Settings,
  Users,
  CreditCard,
  Shield,
  Save,
  Check,
  Plus,
  Mail,
  X,
  Lock,
  Download,
  Sun,
  Moon,
  Laptop,
  Building2,
  Zap,
  Globe,
  ChevronRight
} from "lucide-react";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const { activeOrg, members, currentRole, setActiveOrg } = useWorkspace();
  const { theme, setTheme } = useTheme();

  const [activeTab, setActiveTab] = useState<"general" | "members" | "billing" | "security" | "integrations" | "leave" | "payroll">("general");

  // Leave policies state
  const [defaultAnnualDays, setDefaultAnnualDays] = useState(20);
  const [defaultSickDays, setDefaultSickDays] = useState(10);
  const [carryoverLimit, setCarryoverLimit] = useState(5);
  const [managerApprovalRequired, setManagerApprovalRequired] = useState(true);

  // Payroll settings state
  const [payPeriodCycle, setPayPeriodCycle] = useState("Semi-Monthly");
  const [payrollTaxEngine] = useState("Automated Multi-State (Vertex/Symmetry)");
  const [autoDirectDeposit, setAutoDirectDeposit] = useState(true);
  const [nachaCompanyId, setNachaCompanyId] = useState("9841203948");

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
  const [inviteTeam, setInviteTeam] = useState("Global Operations");

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
      status: "Active",
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

  const tabs = [
    { key: "general", label: "General Identity" },
    { key: "members", label: `Members & RBAC (${memberList.length})` },
    { key: "leave", label: "Leave Policies" },
    { key: "payroll", label: "Payroll Config" },
    { key: "billing", label: "Plans & Subscriptions" },
    { key: "security", label: "Security & Compliance" },
    { key: "integrations", label: "Connected Integrations" },
  ];

  return (
    <div className="space-y-6 font-sans antialiased text-slate-900 dark:text-neutral-100">
      
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-white/[0.07]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-neutral-400 border border-slate-200/80 dark:border-white/[0.06]">
              Platform Administration
            </span>
            <span className="text-xs text-slate-400 dark:text-neutral-500 font-mono">
              Tenant: {activeOrg.name}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Workspace Settings & Access Controls
          </h1>
          <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
            Manage organization identity, team roles, statutory compliance policies, and third-party API connections.
          </p>
        </div>

        {isSaved && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/[0.08] text-xs font-medium text-slate-900 dark:text-white">
            <Check className="w-3.5 h-3.5 text-indigo-500" />
            <span>Settings saved successfully</span>
          </div>
        )}
      </div>

      {/* 2. Compact Numerical Metric Ribbon (Numbers are the design, no overflowing cards) */}
      <div className="bg-white dark:bg-[#111215] border border-slate-200/90 dark:border-white/[0.07] rounded-xl overflow-hidden shadow-2xs">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-slate-100 dark:divide-white/[0.05] md:divide-x md:divide-slate-200/80 md:dark:divide-white/[0.07]">
          
          <div className="p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              Organization Tier
            </div>
            <div className="text-xl sm:text-2xl font-medium text-slate-950 dark:text-white tabular-nums mt-1">
              Enterprise Tier
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              Multi-tenant isolated core
            </div>
          </div>

          <div className="p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              Seat Utilization
            </div>
            <div className="text-xl sm:text-2xl font-medium text-slate-950 dark:text-white tabular-nums mt-1">
              14 / 25 Seats
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              11 seats available to invite
            </div>
          </div>

          <div className="p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              Security Protocols
            </div>
            <div className="text-xl sm:text-2xl font-medium text-slate-950 dark:text-white mt-1">
              2FA + IP Allowlist
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              SOC-2 Type II controls enforced
            </div>
          </div>

          <div className="p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              Connected Integrations
            </div>
            <div className="text-xl sm:text-2xl font-medium text-slate-950 dark:text-white tabular-nums mt-1">
              4 / 5 Active
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              Stripe, Slack, GSuite, S3
            </div>
          </div>

        </div>
      </div>

      {/* 3. Streamlined Tabs Navigation (Single horizontal bar with clean spacing) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar border-b border-slate-200/80 dark:border-white/[0.07] pb-2 text-xs font-medium">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                isSelected
                  ? "bg-slate-100 dark:bg-white/[0.08] text-slate-950 dark:text-white font-semibold shadow-2xs"
                  : "text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/[0.03]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 4. Tab Contents */}

      {/* TAB 1: GENERAL IDENTITY */}
      {activeTab === "general" && (
        <form onSubmit={handleSaveGeneral} className="bg-white dark:bg-[#111215] border border-slate-200/90 dark:border-white/[0.07] rounded-xl p-5 sm:p-6 space-y-6 shadow-2xs max-w-4xl">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Organization Identity</h2>
            <p className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              Primary entity metadata, workspace URL slug, and fiscal operating currency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-600 dark:text-neutral-400 mb-1 font-medium">Organization Legal Name</label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-600 dark:text-neutral-400 mb-1 font-medium">Workspace URL Slug</label>
              <input
                type="text"
                value={orgSlug}
                onChange={(e) => setOrgSlug(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-600 dark:text-neutral-400 mb-1 font-medium">Entity Classification</label>
              <input
                type="text"
                value={orgType}
                onChange={(e) => setOrgType(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-600 dark:text-neutral-400 mb-1 font-medium">Base Accounting Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-slate-50/70 dark:bg-[#111215] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white focus:outline-none cursor-pointer"
              >
                <option value="USD ($)">USD ($)</option>
                <option value="EUR (€)">EUR (€)</option>
                <option value="GBP (£)">GBP (£)</option>
                <option value="CHF (Fr)">CHF (Fr)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-600 dark:text-neutral-400 mb-1 font-medium">HQ Synchronized Timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-slate-50/70 dark:bg-[#111215] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white focus:outline-none cursor-pointer"
              >
                <option value="UTC+2 (Europe/Zurich - Geneva HQ)">UTC+2 (Europe/Zurich - Geneva HQ)</option>
                <option value="UTC-5 (Eastern Time - New York)">UTC-5 (Eastern Time - New York)</option>
                <option value="UTC+0 (Europe/London)">UTC+0 (Europe/London)</option>
                <option value="UTC+6 (Asia/Dhaka - Field Hub)">UTC+6 (Asia/Dhaka - Field Hub)</option>
              </select>
            </div>
          </div>

          {/* Theme & Visual Appearance */}
          <div className="pt-4 border-t border-slate-100 dark:border-white/[0.06] space-y-2">
            <div>
              <h3 className="text-xs font-semibold text-slate-900 dark:text-white">Workspace Interface Theme</h3>
              <p className="text-[11px] text-slate-400 dark:text-neutral-500">
                Choose your visual theme across workspace dashboards and tables.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-1">
              {[
                { key: "light", label: "Light Mode", icon: Sun },
                { key: "dark", label: "Dark Mode", icon: Moon },
                { key: "system", label: "System Sync", icon: Laptop },
              ].map((t) => {
                const isSelected = theme === t.key;
                const Icon = t.icon;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setTheme(t.key)}
                    className={`flex items-center justify-center gap-2 h-9 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-slate-100 dark:bg-white/[0.08] border-slate-300 dark:border-white/15 text-slate-950 dark:text-white shadow-2xs font-semibold"
                        : "bg-slate-50/50 dark:bg-white/[0.02] border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-white/[0.06] flex justify-end">
            <button
              type="submit"
              className="h-8 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Identity Changes</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: MEMBERS & RBAC */}
      {activeTab === "members" && (
        <div className="bg-white dark:bg-[#111215] border border-slate-200/90 dark:border-white/[0.07] rounded-xl overflow-hidden shadow-2xs">
          <div className="p-4 border-b border-slate-100 dark:border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                Team Access & RBAC Roles
              </h2>
              <p className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
                Current active persona: <strong className="text-slate-800 dark:text-neutral-200">{currentRole}</strong>
              </p>
            </div>
            <button
              onClick={() => setIsInviteOpen(true)}
              className="h-8 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Invite Member</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 dark:bg-white/[0.02] border-b border-slate-200/80 dark:border-white/[0.06] text-slate-400 dark:text-neutral-500 font-mono text-[10px] uppercase">
                <tr>
                  <th className="py-2.5 px-4">Member</th>
                  <th className="py-2.5 px-3">Department</th>
                  <th className="py-2.5 px-3">Role Authority</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-4 text-right">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
                {memberList.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/70 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-900 dark:text-white">{m.name}</div>
                      <div className="text-[11px] text-slate-400 dark:text-neutral-500">{m.email}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-neutral-300">
                      {m.department}
                    </td>
                    <td className="py-3 px-3">
                      <select
                        value={m.role}
                        onChange={(e) => {
                          const updated = memberList.map((item) =>
                            item.id === m.id ? { ...item, role: e.target.value as UserRole } : item
                          );
                          setMemberList(updated);
                        }}
                        className="h-7 px-2 rounded-md bg-slate-50 dark:bg-[#111215] border border-slate-200 dark:border-white/[0.1] text-xs font-medium cursor-pointer"
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
                      <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-700 dark:text-neutral-300 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-neutral-500" />
                        {m.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-slate-500 text-[11px]">
                      {m.joinDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: LEAVE POLICIES */}
      {activeTab === "leave" && (
        <div className="bg-white dark:bg-[#111215] border border-slate-200/90 dark:border-white/[0.07] rounded-xl p-5 sm:p-6 space-y-5 shadow-2xs max-w-4xl">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Statutory Leave Policies & Accruals</h2>
            <p className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              Standard PTO allocation schedules, maximum carryover limits, and manager sign-off workflows.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-600 dark:text-neutral-400 block mb-1 font-medium">Standard Annual Leave (Days/Year)</label>
              <input
                type="number"
                value={defaultAnnualDays}
                onChange={(e) => setDefaultAnnualDays(Number(e.target.value))}
                className="w-full h-9 px-3 rounded-lg bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white font-mono"
              />
            </div>
            <div>
              <label className="text-slate-600 dark:text-neutral-400 block mb-1 font-medium">Standard Sick Leave (Days/Year)</label>
              <input
                type="number"
                value={defaultSickDays}
                onChange={(e) => setDefaultSickDays(Number(e.target.value))}
                className="w-full h-9 px-3 rounded-lg bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white font-mono"
              />
            </div>
            <div>
              <label className="text-slate-600 dark:text-neutral-400 block mb-1 font-medium">Annual Carryover Limit (Days)</label>
              <input
                type="number"
                value={carryoverLimit}
                onChange={(e) => setCarryoverLimit(Number(e.target.value))}
                className="w-full h-9 px-3 rounded-lg bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white font-mono"
              />
            </div>
            <div>
              <label className="text-slate-600 dark:text-neutral-400 block mb-1 font-medium">Probationary Waiting Period</label>
              <select className="w-full h-9 px-3 rounded-lg bg-slate-50/70 dark:bg-[#111215] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white cursor-pointer">
                <option value="90">90 Days Standard</option>
                <option value="30">30 Days Accelerated</option>
                <option value="0">Immediate from Day 1</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-xs">
            <div>
              <div className="font-medium text-slate-900 dark:text-white">Require Direct Manager Sign-Off</div>
              <div className="text-[11px] text-slate-400">Routes absence requests to team director before HR confirmation.</div>
            </div>
            <input
              type="checkbox"
              checked={managerApprovalRequired}
              onChange={(e) => setManagerApprovalRequired(e.target.checked)}
              className="rounded border-slate-300 w-4 h-4 cursor-pointer"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-white/[0.06] flex justify-end">
            <button
              onClick={() => alert("Leave policies successfully updated.")}
              className="h-8 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-medium cursor-pointer"
            >
              Save Leave Policies
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: PAYROLL CONFIG */}
      {activeTab === "payroll" && (
        <div className="bg-white dark:bg-[#111215] border border-slate-200/90 dark:border-white/[0.07] rounded-xl p-5 sm:p-6 space-y-5 shadow-2xs max-w-4xl">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Payroll & Tax Engine Bindings</h2>
            <p className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              Disbursement frequencies, NACHA company bank routing, and automated tax calculations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-600 dark:text-neutral-400 block mb-1 font-medium">Standard Pay Cycle</label>
              <select
                value={payPeriodCycle}
                onChange={(e) => setPayPeriodCycle(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-slate-50/70 dark:bg-[#111215] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white cursor-pointer"
              >
                <option value="Semi-Monthly">Semi-Monthly (15th & Last Business Day)</option>
                <option value="Bi-Weekly">Bi-Weekly (Every other Friday)</option>
                <option value="Monthly">Monthly (Last Day)</option>
              </select>
            </div>
            <div>
              <label className="text-slate-600 dark:text-neutral-400 block mb-1 font-medium">Tax Calculation Engine</label>
              <input
                type="text"
                readOnly
                value={payrollTaxEngine}
                className="w-full h-9 px-3 rounded-lg bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-neutral-300 font-mono"
              />
            </div>
            <div>
              <label className="text-slate-600 dark:text-neutral-400 block mb-1 font-medium">NACHA Originator Company ID</label>
              <input
                type="text"
                value={nachaCompanyId}
                onChange={(e) => setNachaCompanyId(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white font-mono"
              />
            </div>
            <div>
              <label className="text-slate-600 dark:text-neutral-400 block mb-1 font-medium">Direct Deposit Release Cutoff</label>
              <input
                type="text"
                readOnly
                value="2 Business Days Prior (17:00 UTC)"
                className="w-full h-9 px-3 rounded-lg bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-neutral-300"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-xs">
            <div>
              <div className="font-medium text-slate-900 dark:text-white">Automatic Direct Deposit (ACH)</div>
              <div className="text-[11px] text-slate-400">Transmits NACHA clearing files automatically upon CFO authorization.</div>
            </div>
            <input
              type="checkbox"
              checked={autoDirectDeposit}
              onChange={(e) => setAutoDirectDeposit(e.target.checked)}
              className="rounded border-slate-300 w-4 h-4 cursor-pointer"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-white/[0.06] flex justify-end">
            <button
              onClick={() => alert("Payroll configuration saved.")}
              className="h-8 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-medium cursor-pointer"
            >
              Save Payroll Settings
            </button>
          </div>
        </div>
      )}

      {/* TAB 5: BILLING & PLANS */}
      {activeTab === "billing" && (
        <div className="space-y-4 max-w-4xl">
          <div className="p-5 sm:p-6 rounded-xl bg-white dark:bg-[#111215] border border-slate-200/90 dark:border-white/[0.07] space-y-4 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Current Plan</span>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mt-0.5">
                  {activeOrg.plan} Operations Tier
                </h3>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                  Billed annually at $2,990 / year · Renews on November 15, 2026
                </p>
              </div>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-white/[0.08]">
                Active & Paid
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 dark:border-white/[0.06] text-xs">
              <div className="p-3 rounded-lg border border-slate-200/70 dark:border-white/[0.05] bg-slate-50/50 dark:bg-white/[0.015]">
                <div className="text-[10px] font-mono uppercase text-slate-400">Active Seat Usage</div>
                <div className="text-lg font-semibold text-slate-900 dark:text-white tabular-nums mt-0.5">
                  14 / 25 Seats
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">11 seats available</div>
              </div>

              <div className="p-3 rounded-lg border border-slate-200/70 dark:border-white/[0.05] bg-slate-50/50 dark:bg-white/[0.015]">
                <div className="text-[10px] font-mono uppercase text-slate-400">Statutory Storage</div>
                <div className="text-lg font-semibold text-slate-900 dark:text-white tabular-nums mt-0.5">
                  24.8 GB / 100 GB
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">WORM compliant</div>
              </div>

              <div className="p-3 rounded-lg border border-slate-200/70 dark:border-white/[0.05] bg-slate-50/50 dark:bg-white/[0.015]">
                <div className="text-[10px] font-mono uppercase text-slate-400">Card on File</div>
                <div className="text-lg font-semibold text-slate-900 dark:text-white font-mono mt-0.5">
                  Visa •••• 4242
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Expires 08/28</div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400 text-[11px]">Stripe ID: cus_N9x2kL80q</span>
              <a
                href="/workspace/billing"
                className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline flex items-center gap-1"
              >
                <span>Full Billing Ledger</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: SECURITY & COMPLIANCE */}
      {activeTab === "security" && (
        <div className="bg-white dark:bg-[#111215] border border-slate-200/90 dark:border-white/[0.07] rounded-xl p-5 sm:p-6 space-y-5 shadow-2xs max-w-4xl">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Enterprise Security & Access Subnets</h2>
            <p className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              Enforce multi-factor verification, session inactivity policies, and static IP CIDR controls.
            </p>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-center justify-between p-3.5 rounded-lg border border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.02]">
              <div>
                <div className="font-medium text-slate-900 dark:text-white">Mandatory Two-Factor Authentication (2FA)</div>
                <div className="text-slate-500 dark:text-neutral-400 mt-0.5">Enforce hardware key or TOTP for all administrator accounts.</div>
              </div>
              <input
                type="checkbox"
                checked={twoFactorEnforced}
                onChange={(e) => setTwoFactorEnforced(e.target.checked)}
                className="rounded border-slate-300 w-4 h-4 cursor-pointer"
              />
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.02] space-y-1.5">
              <label className="block font-medium text-slate-900 dark:text-white">Inactivity Session Timeout</label>
              <select
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-white dark:bg-[#111215] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white cursor-pointer"
              >
                <option value="15m">15 Minutes (Strict Banking Standard)</option>
                <option value="1h">1 Hour (Recommended)</option>
                <option value="8h">8 Hours (Full Shift)</option>
              </select>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.02] space-y-1.5">
              <label className="block font-medium text-slate-900 dark:text-white">IP Subnet Allowlist (CIDR)</label>
              <input
                type="text"
                value={ipAllowlist}
                onChange={(e) => setIpAllowlist(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-white dark:bg-[#111215] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white font-mono"
              />
              <p className="text-[11px] text-slate-400">Only connections from this subnet can access admin credentials.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: CONNECTED INTEGRATIONS */}
      {activeTab === "integrations" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-w-4xl">
          {integrations.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-white dark:bg-[#111215] border border-slate-200/90 dark:border-white/[0.07] shadow-2xs flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-xs font-semibold text-slate-900 dark:text-white">{item.name}</h3>
                  <span
                    className={`px-2 py-0.2 rounded text-[10px] font-mono ${
                      item.connected
                        ? "bg-slate-100 dark:bg-white/[0.08] text-slate-900 dark:text-white"
                        : "text-slate-400"
                    }`}
                  >
                    {item.connected ? "Connected" : "Disconnected"}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-neutral-400">{item.desc}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-white/[0.04] flex justify-end">
                <button
                  onClick={() => toggleIntegration(item.id)}
                  className="px-3 py-1 rounded-lg text-xs font-medium border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-white/[0.04] cursor-pointer"
                >
                  {item.connected ? "Configure Webhook" : "Connect"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL: INVITE MEMBER */}
      <AnimatePresence>
        {isInviteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              onClick={() => setIsInviteOpen(false)}
              className="fixed inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-xs cursor-pointer"
            />
            <motion.form
              initial={{ opacity: 0, scale: 0.98, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -6 }}
              transition={{ duration: 0.12 }}
              onSubmit={handleInviteSubmit}
              className="relative bg-white dark:bg-[#111215] border border-slate-200 dark:border-white/[0.1] rounded-xl w-full max-w-md p-6 space-y-4 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.06]">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Invite Workspace Member</h3>
                <button
                  type="button"
                  onClick={() => setIsInviteOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-600 dark:text-neutral-400 mb-1 font-medium">Work Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="colleague@hopefoundation.org"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 dark:text-neutral-400 mb-1 font-medium">Role Authority</label>
                    <select
                      value={inviteRole}
                      onChange={(e) => setInviteRole(e.target.value as UserRole)}
                      className="w-full h-9 px-2 rounded-lg bg-slate-50 dark:bg-[#111215] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white cursor-pointer"
                    >
                      <option value="Administrator">Administrator</option>
                      <option value="Manager">Manager</option>
                      <option value="Finance">Finance</option>
                      <option value="Auditor">Auditor</option>
                      <option value="Member">Member</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-neutral-400 mb-1 font-medium">Department</label>
                    <select
                      value={inviteTeam}
                      onChange={(e) => setInviteTeam(e.target.value)}
                      className="w-full h-9 px-2 rounded-lg bg-slate-50 dark:bg-[#111215] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white cursor-pointer"
                    >
                      <option value="Global Operations">Global Operations</option>
                      <option value="Medical & Health">Medical & Health</option>
                      <option value="Technology & Systems">Technology</option>
                      <option value="Finance & Compliance">Finance</option>
                      <option value="People & Talent">People & Talent</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-white/[0.06] flex justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setIsInviteOpen(false)}
                  className="px-3 py-1.5 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-medium cursor-pointer"
                >
                  Send Invitation
                </button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
