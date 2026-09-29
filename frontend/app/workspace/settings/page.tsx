"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import { UserRole, Member } from "@/lib/demoData";
import ThreeDCard from "@/components/motion/ThreeDCard";
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
  Sun,
  Moon,
  Laptop,
  Building2,
  Sparkles,
  Zap,
  Globe
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
  const [payrollTaxEngine, setPayrollTaxEngine] = useState("Automated Multi-State (Vertex/Symmetry)");
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
  const [inviteTeam, setInviteTeam] = useState("Operations");

  // Security Toggles
  const [twoFactorEnforced, setTwoFactorEnforced] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("1h");
  const [ipAllowlist, setIpAllowlist] = useState("198.51.100.0/24");

  // Integrations state
  const [integrations, setIntegrations] = useState([
    { id: "stripe", name: "Stripe Connect", desc: "PCI-compliant recurring donations and gateway dispatches", connected: true, glare: "#6366f1" },
    { id: "slack", name: "Slack Alerts", desc: "Instant notifications for approvals and high-risk audit findings", connected: true, glare: "#10b981" },
    { id: "google", name: "Google Workspace SAML", desc: "Enterprise Single Sign-On and employee directory sync", connected: true, glare: "#3b82f6" },
    { id: "quickbooks", name: "QuickBooks Online", desc: "Bi-directional ledger export for tax and CPA filing", connected: false, glare: "#f59e0b" },
    { id: "s3", name: "AWS S3 WORM Storage", desc: "Cryptographically sealed 7-year statutory document archive", connected: true, glare: "#8b5cf6" },
  ]);

  const kpis = [
    {
      title: "Organization Plan",
      value: activeOrg.plan,
      subtext: "Enterprise multi-tenant core",
      icon: Building2,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-500/10",
      glare: "#6366f1",
      badge: "Annual Tier",
    },
    {
      title: "Active Seat Usage",
      value: "14 / 25",
      subtext: "11 seats available to invite",
      icon: Users,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
      glare: "#10b981",
      badge: "56% Utilized",
    },
    {
      title: "Security Protocols",
      value: "2FA + IP",
      subtext: "SOC-2 Type II controls active",
      icon: Shield,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10",
      glare: "#3b82f6",
      badge: "Enforced",
    },
    {
      title: "Connected APIs",
      value: `${integrations.filter((i) => i.connected).length} / ${integrations.length}`,
      subtext: "Automated webhook webhooks",
      icon: Zap,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10",
      glare: "#f59e0b",
      badge: "Live Webhooks",
    },
  ];

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
    <div className="space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-neutral-700">
              <Settings className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" /> Platform Administration
            </span>
            <span className="text-xs text-slate-500 dark:text-neutral-400 font-sans font-medium whitespace-nowrap">Tenant: {activeOrg.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-sans font-semibold tracking-tight text-slate-950 dark:text-neutral-100">
            Workspace Settings & Access Controls
          </h1>
          <p className="text-sm text-slate-500 dark:text-neutral-400 mt-1 max-w-2xl">
            Manage organization identity, team roles, subscription limits, SOC-2 security protocols, and third-party integrations.
          </p>
        </div>

        {isSaved && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-medium text-emerald-600 dark:text-emerald-400 shadow-xs"
          >
            <Check className="w-4 h-4" /> Changes saved successfully
          </motion.div>
        )}
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
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-white/[0.08] pb-3 text-xs font-sans font-medium">
        {[
          { key: "general", label: "General Identity" },
          { key: "members", label: `Members & RBAC (${memberList.length})` },
          { key: "leave", label: "Leave Policies" },
          { key: "payroll", label: "Payroll Configuration" },
          { key: "billing", label: "Plans & Subscriptions" },
          { key: "security", label: "Security & Compliance" },
          { key: "integrations", label: "Connected Integrations" },
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
                  layoutId="settingsTabIndicator"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  className="absolute inset-0 rounded-xl bg-slate-200/80 dark:bg-white/10 border border-slate-300 dark:border-white/10 shadow-xs z-0"
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* TAB 1: GENERAL IDENTITY */}
      {activeTab === "general" && (
        <form onSubmit={handleSaveGeneral} className="max-w-2xl p-6 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-4">
          <h2 className="text-base font-medium text-slate-950 dark:text-neutral-100">Organization Identity</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1">Organization Name</label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-neutral-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1">Workspace Slug</label>
              <input
                type="text"
                value={orgSlug}
                onChange={(e) => setOrgSlug(e.target.value)}
                className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl px-3 py-2 text-xs font-sans font-medium text-slate-700 dark:text-neutral-300 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1">Entity Classification</label>
            <input
              type="text"
              value={orgType}
              onChange={(e) => setOrgType(e.target.value)}
              className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-neutral-200 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1">Base Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-neutral-200 focus:outline-none cursor-pointer"
              >
                <option value="USD ($)">USD ($)</option>
                <option value="EUR (€)">EUR (€)</option>
                <option value="GBP (£)">GBP (£)</option>
                <option value="CAD ($)">CAD ($)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1">Primary Timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-neutral-200 focus:outline-none cursor-pointer"
              >
                <option value="UTC-5 (Eastern Time)">UTC-5 (Eastern Time)</option>
                <option value="UTC-8 (Pacific Time)">UTC-8 (Pacific Time)</option>
                <option value="UTC+0 (London)">UTC+0 (London)</option>
                <option value="UTC+1 (Central Europe)">UTC+1 (Central Europe)</option>
              </select>
            </div>
          </div>

          {/* Theme & Interface Appearance with Spring Sliding Pills */}
          <div className="pt-4 border-t border-slate-200 dark:border-neutral-800">
            <h3 className="text-sm font-medium text-slate-900 dark:text-neutral-200 mb-1">Global Theme & Interface Appearance</h3>
            <p className="text-xs text-slate-500 dark:text-neutral-400 mb-3">
              Configure your preferred visual experience across the platform. Persists across sessions.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { key: "light", label: "Light Mode", icon: Sun, color: "text-amber-500" },
                { key: "dark", label: "Dark Mode", icon: Moon, color: "text-indigo-400" },
                { key: "system", label: "System Sync", icon: Laptop, color: "text-emerald-500" },
              ].map((t) => {
                const isSelected = theme === t.key;
                const Icon = t.icon;
                return (
                  <motion.button
                    key={t.key}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setTheme(t.key)}
                    className={`relative flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? "bg-slate-100 dark:bg-white/10 border-slate-300 dark:border-white/20 text-slate-950 dark:text-white shadow-xs"
                        : "bg-slate-50 dark:bg-neutral-950/60 border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-neutral-200"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${t.color}`} />
                    <span>{t.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-neutral-800 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-400 text-white dark:text-black text-xs font-semibold shadow-md flex items-center gap-1.5 transition cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save Identity Settings
            </motion.button>
          </div>
        </form>
      )}

      {/* TAB: LEAVE POLICIES CONFIGURATION */}
      {activeTab === "leave" && (
        <div className="max-w-3xl p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-semibold text-slate-950 dark:text-white">Statutory Leave Policies & Accruals</h2>
            <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
              Set standard PTO accrual rates, maximum rollover days, and management sign-off gates.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-500 block mb-1 font-medium">Standard Annual Leave (Days / Year)</label>
              <input
                type="number"
                value={defaultAnnualDays}
                onChange={(e) => setDefaultAnnualDays(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
              />
            </div>
            <div>
              <label className="text-slate-500 block mb-1 font-medium">Standard Sick Leave (Days / Year)</label>
              <input
                type="number"
                value={defaultSickDays}
                onChange={(e) => setDefaultSickDays(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
              />
            </div>
            <div>
              <label className="text-slate-500 block mb-1 font-medium">Annual Carryover Limit (Days)</label>
              <input
                type="number"
                value={carryoverLimit}
                onChange={(e) => setCarryoverLimit(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
              />
            </div>
            <div>
              <label className="text-slate-500 block mb-1 font-medium">Probationary Waiting Period</label>
              <select className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] outline-none">
                <option value="90">90 Days Standard</option>
                <option value="30">30 Days Accelerated</option>
                <option value="0">Immediate from Day 1</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
            <div>
              <div className="font-semibold text-xs text-slate-900 dark:text-white">Require Direct Manager Sign-Off</div>
              <div className="text-[11px] text-slate-500">Auto-routes leave requests to team supervisor before HR confirmation.</div>
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
              className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-neutral-950 text-xs font-semibold cursor-pointer shadow-md"
            >
              Save Leave Policies
            </button>
          </div>
        </div>
      )}

      {/* TAB: PAYROLL CONFIGURATION */}
      {activeTab === "payroll" && (
        <div className="max-w-3xl p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-semibold text-slate-950 dark:text-white">Payroll & Tax Engine Bindings</h2>
            <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
              Manage disbursement schedules, NACHA corporate bank routing, and automated tax calculations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-500 block mb-1 font-medium">Standard Pay Cycle</label>
              <select
                value={payPeriodCycle}
                onChange={(e) => setPayPeriodCycle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] outline-none"
              >
                <option value="Semi-Monthly">Semi-Monthly (15th & Last Business Day)</option>
                <option value="Bi-Weekly">Bi-Weekly (Every other Friday)</option>
                <option value="Monthly">Monthly (Last Day)</option>
              </select>
            </div>
            <div>
              <label className="text-slate-500 block mb-1 font-medium">Tax Calculation Engine</label>
              <input
                type="text"
                readOnly
                value={payrollTaxEngine}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none font-medium"
              />
            </div>
            <div>
              <label className="text-slate-500 block mb-1 font-medium">NACHA Originator Company ID</label>
              <input
                type="text"
                value={nachaCompanyId}
                onChange={(e) => setNachaCompanyId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
              />
            </div>
            <div>
              <label className="text-slate-500 block mb-1 font-medium">Direct Deposit Release Cutoff</label>
              <input
                type="text"
                readOnly
                value="2 Business Days Prior (17:00 EST)"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
            <div>
              <div className="font-semibold text-xs text-slate-900 dark:text-white">Automatic Direct Deposit (ACH)</div>
              <div className="text-[11px] text-slate-500">Transmits NACHA files automatically upon CFO authorization.</div>
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
              className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-neutral-950 text-xs font-semibold cursor-pointer shadow-md"
            >
              Save Payroll Settings
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: MEMBERS & RBAC */}
      {activeTab === "members" && (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-medium text-slate-950 dark:text-neutral-100">Team Members & Access Levels</h2>
              <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                Current active impersonation role: <strong className="text-indigo-600 dark:text-indigo-400">{currentRole}</strong>
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsInviteOpen(true)}
              className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-400 text-white dark:text-black text-xs font-semibold shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Invite Member
            </motion.button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-neutral-800 text-[11px] font-sans font-semibold text-slate-500 dark:text-neutral-400 uppercase tracking-wider">
                  <th className="py-3 px-3">Member</th>
                  <th className="py-3 px-3">Department</th>
                  <th className="py-3 px-3">Assigned Role</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-neutral-800/60 font-sans">
                {memberList.map((m) => (
                  <motion.tr
                    key={m.id}
                    whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.03)" }}
                    className="transition-colors"
                  >
                    <td className="py-3 px-3">
                      <div className="font-medium text-slate-900 dark:text-neutral-200 whitespace-nowrap">{m.name}</div>
                      <div className="text-[11px] text-slate-500 dark:text-neutral-400 font-sans font-medium whitespace-nowrap">{m.email}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-700 dark:text-neutral-300 whitespace-nowrap">{m.department}</td>
                    <td className="py-3 px-3">
                      <select
                        value={m.role}
                        onChange={(e) => {
                          const updated = memberList.map((item) =>
                            item.id === m.id ? { ...item, role: e.target.value as UserRole } : item
                          );
                          setMemberList(updated);
                        }}
                        className="bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-2.5 py-1 text-xs text-slate-800 dark:text-neutral-200 focus:outline-none cursor-pointer"
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
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border whitespace-nowrap ${
                          m.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20"
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-500 dark:text-neutral-400 font-sans font-medium whitespace-nowrap">{m.joinDate}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: BILLING & SUBSCRIPTIONS */}
      {activeTab === "billing" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider font-sans">Current Plan</span>
                <h3 className="text-2xl font-sans font-semibold text-slate-950 dark:text-neutral-100 mt-1">
                  {activeOrg.plan} Operations Tier
                </h3>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                  Billed annually at $2,990 / year • Renews on November 15, 2026
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 w-fit font-sans whitespace-nowrap">
                Active & Paid
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-200 dark:border-neutral-800/80 text-xs">
              <ThreeDCard glareColor="#6366f1" maxTilt={5} elevationZ={10}>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800">
                  <div className="text-slate-500 dark:text-neutral-500 font-sans font-semibold uppercase text-[10px] tracking-wider">Active Seat Usage</div>
                  <div className="font-sans text-2xl font-normal sm:font-medium tracking-tight text-slate-950 dark:text-neutral-200 tabular-nums mt-1">
                    14 / 25 Seats
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-neutral-400 mt-0.5">11 seats available</div>
                </div>
              </ThreeDCard>

              <ThreeDCard glareColor="#10b981" maxTilt={5} elevationZ={10}>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800">
                  <div className="text-slate-500 dark:text-neutral-500 font-sans font-semibold uppercase text-[10px] tracking-wider">Evidence Storage</div>
                  <div className="font-sans text-2xl font-normal sm:font-medium tracking-tight text-slate-950 dark:text-neutral-200 tabular-nums mt-1">
                    24.8 GB / 100 GB
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-neutral-400 mt-0.5">WORM Compliant</div>
                </div>
              </ThreeDCard>

              <ThreeDCard glareColor="#3b82f6" maxTilt={5} elevationZ={10}>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800">
                  <div className="text-slate-500 dark:text-neutral-500 font-sans font-semibold uppercase text-[10px] tracking-wider">Default Payment Method</div>
                  <div className="font-sans text-2xl font-normal sm:font-medium tracking-tight text-slate-950 dark:text-neutral-200 tabular-nums mt-1">
                    Visa •••• 4242
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-neutral-400 mt-0.5">Expires 08/28</div>
                </div>
              </ThreeDCard>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-neutral-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <a
                  href="/workspace/billing"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <CreditCard className="w-3.5 h-3.5" /> Open Dedicated Billing Dashboard
                </a>
                <a
                  href="/pricing"
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 text-slate-800 dark:text-neutral-200 font-semibold"
                >
                  View Plan Tiers
                </a>
              </div>
              <span className="text-[11px] text-slate-500">Stripe Customer ID: cus_N9x2kL80q</span>
            </div>
          </div>

          {/* Recent Invoices in Settings */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-slate-900 dark:text-white">Recent Tax Invoices & Receipts</h4>
              <a href="/workspace/billing" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                View all in Billing →
              </a>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-neutral-800/60">
              {[
                { id: "INV-2026-004", date: "Sep 15, 2026", amount: "$3,300.00", status: "Paid" },
                { id: "INV-2026-003", date: "Aug 15, 2026", amount: "$3,300.00", status: "Paid" },
                { id: "INV-2026-002", date: "Jul 15, 2026", amount: "$3,300.00", status: "Paid" },
              ].map((inv) => (
                <div key={inv.id} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="font-semibold text-slate-900 dark:text-white">{inv.id}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 font-sans">{inv.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900 dark:text-white">{inv.amount}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600">
                      {inv.status}
                    </span>
                    <button
                      onClick={() => alert(`Downloading PDF invoice for ${inv.id}`)}
                      className="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SECURITY & COMPLIANCE */}
      {activeTab === "security" && (
        <div className="max-w-2xl p-6 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-6">
          <h2 className="text-base font-medium text-slate-950 dark:text-neutral-100">Enterprise Security Controls</h2>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800">
              <div>
                <div className="font-medium text-slate-900 dark:text-neutral-200">Enforce Mandatory Two-Factor Authentication (2FA)</div>
                <div className="text-slate-500 dark:text-neutral-400 mt-0.5">All administrators and auditors must verify with TOTP</div>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setTwoFactorEnforced(!twoFactorEnforced)}
                className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer ${
                  twoFactorEnforced ? "bg-emerald-500" : "bg-slate-300 dark:bg-neutral-800"
                }`}
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-1 ${
                    twoFactorEnforced ? "right-1" : "left-1"
                  }`}
                />
              </motion.button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 space-y-2">
              <label className="block font-medium text-slate-900 dark:text-neutral-200">Inactivity Session Timeout</label>
              <select
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className="w-full bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl px-3 py-2 text-slate-800 dark:text-neutral-300 focus:outline-none cursor-pointer"
              >
                <option value="15m">15 Minutes (Strict Banking)</option>
                <option value="1h">1 Hour (Recommended)</option>
                <option value="8h">8 Hours (Full Shift)</option>
                <option value="24h">24 Hours</option>
              </select>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 space-y-2">
              <label className="block font-medium text-slate-900 dark:text-neutral-200">IP CIDR Allowlist</label>
              <input
                type="text"
                value={ipAllowlist}
                onChange={(e) => setIpAllowlist(e.target.value)}
                className="w-full bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl px-3 py-2 font-sans text-slate-800 dark:text-neutral-300 focus:outline-none"
              />
              <p className="text-[11px] text-slate-400 dark:text-neutral-500 font-sans">Only incoming connections matching this subnet can access admin endpoints.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: CONNECTED INTEGRATIONS */}
      {activeTab === "integrations" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map((item) => (
            <ThreeDCard key={item.id} glareColor={item.glare} maxTilt={5} elevationZ={10}>
              <div className="p-5 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-4 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-slate-900 dark:text-neutral-100">{item.name}</h3>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                        item.connected
                          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
                          : "bg-slate-100 dark:bg-neutral-800 text-slate-500 dark:text-neutral-400 border-slate-200 dark:border-neutral-700"
                      }`}
                    >
                      {item.connected ? "Connected" : "Disconnected"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-neutral-400">{item.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-neutral-800 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => toggleIntegration(item.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition ${
                      item.connected
                        ? "bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-700 dark:text-neutral-300"
                        : "bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-400 text-white dark:text-black font-semibold shadow-xs"
                    }`}
                  >
                    {item.connected ? "Configure Settings" : "Connect Integration"}
                  </motion.button>
                </div>
              </div>
            </ThreeDCard>
          ))}
        </div>
      )}

      {/* MODAL: INVITE MEMBER WITH ANIMATEPRESENCE */}
      <AnimatePresence>
        {isInviteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsInviteOpen(false)}
              className="fixed inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-xs cursor-pointer"
            />

            {/* Dialog */}
            <motion.form
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
              onSubmit={handleInviteSubmit}
              className="relative bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-neutral-800 pb-3">
                <h3 className="text-base font-medium text-slate-950 dark:text-neutral-100">Invite Workspace Member</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setIsInviteOpen(false)}
                  className="p-1 rounded-lg text-slate-400 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1">Corporate Email Address *</label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@hopefoundation.org"
                  className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-neutral-200 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1">Initial RBAC Role</label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-neutral-200 focus:outline-none"
                  >
                    <option value="Administrator">Administrator</option>
                    <option value="Manager">Manager</option>
                    <option value="Finance">Finance</option>
                    <option value="Auditor">Auditor</option>
                    <option value="Member">Member</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1">Department</label>
                  <input
                    type="text"
                    value={inviteTeam}
                    onChange={(e) => setInviteTeam(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-neutral-200 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-neutral-800">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setIsInviteOpen(false)}
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
                  Send Invitation
                </motion.button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
