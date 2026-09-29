"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  FileCheck2,
  ShieldAlert,
  CreditCard,
  FileText,
  BarChart3,
  Bot,
  Activity,
  Code2,
  HeartPulse,
  Settings,
  ChevronDown,
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  Plus
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const {
    activeOrg,
    setActiveOrg,
    allOrgs,
    currentRole,
    currentUser,
    isSidebarOpen,
    setIsSidebarOpen,
    approvals,
    findings
  } = useWorkspace();

  const pendingApprovalsCount = approvals.filter((a) => a.status === "Pending").length;
  const openFindingsCount = findings.filter((f) => f.status === "Open" || f.status === "In Progress").length;

  const mainNav = [
    { name: "Dashboard", href: "/workspace", icon: LayoutDashboard },
    { name: "People", href: "/workspace/people", icon: Users },
    { name: "Recruitment", href: "/workspace/recruitment", icon: FolderKanban, badge: "ATS" },
    { name: "Attendance", href: "/workspace/attendance", icon: Activity },
    { name: "Leave", href: "/workspace/leave", icon: FileCheck2, badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : undefined },
    { name: "Payroll", href: "/workspace/payroll", icon: CreditCard },
    { name: "Expenses", href: "/workspace/expenses", icon: CreditCard },
    { name: "Performance", href: "/workspace/performance", icon: Sparkles },
    { name: "Documents", href: "/workspace/documents", icon: FileText },
    { name: "Reports", href: "/workspace/reports", icon: BarChart3 },
    { name: "Automation", href: "/workspace/automation", icon: Bot, isNew: true },
    { name: "Projects & Tasks", href: "/workspace/projects", icon: Layers },
    { name: "Internal Audits", href: "/workspace/audits", icon: ShieldAlert, badge: openFindingsCount > 0 ? openFindingsCount : undefined },
  ];

  const platformNav = [
    { name: "Billing & Plans", href: "/workspace/billing", icon: CreditCard },
    { name: "Help & Support", href: "/workspace/support", icon: HeartPulse },
    { name: "Audit & Activity Log", href: "/workspace/activity", icon: Activity },
    { name: "Developer & APIs", href: "/workspace/developer", icon: Code2 },
    { name: "Settings", href: "/workspace/settings", icon: Settings },
  ];

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-40 bg-white dark:bg-[#0c0c0e] border-r border-slate-200 dark:border-white/[0.08] flex flex-col justify-between overflow-x-hidden transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Top Workspace Switcher */}
      <div>
        <div
          className={`border-b border-slate-200 dark:border-white/[0.08] transition-all duration-300 ${
            isSidebarOpen
              ? "p-4 flex items-center justify-between gap-3 h-16"
              : "h-16 flex items-center justify-center p-2"
          }`}
        >
          {isSidebarOpen ? (
            <>
              <Link
                href="/"
                title="Return to Client Forge Home"
                className="flex items-center gap-3 overflow-hidden min-w-0 flex-1 group hover:opacity-90 transition-opacity"
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-black border border-slate-200 dark:border-white/15 flex-shrink-0 group-hover:border-slate-400 dark:group-hover:border-white/30 transition-colors">
                  <img src="/logo.jpg" alt="Client Forge Logo" className="w-full h-full object-cover" />
                </div>
                <div className="overflow-hidden min-w-0 flex-1">
                  <div className="font-victorian text-lg sm:text-xl font-normal tracking-wide text-slate-900 dark:text-white truncate leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    Client Forge
                  </div>
                  <div className="text-[10px] font-sans font-medium text-slate-500 dark:text-neutral-400 uppercase tracking-wider truncate mt-0.5">
                    {activeOrg.name}
                  </div>
                </div>
              </Link>

              <motion.button
                onClick={() => setIsSidebarOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 rounded-lg text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors cursor-pointer shrink-0"
                title="Collapse sidebar"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
            </>
          ) : (
            <div className="flex items-center justify-center gap-1.5">
              <Link
                href="/"
                title="Return to Client Forge Home"
                className="w-9 h-9 rounded-xl overflow-hidden bg-black border border-slate-200 dark:border-white/15 flex items-center justify-center hover:opacity-85 transition-opacity shrink-0"
              >
                <img src="/logo.jpg" alt="Client Forge Logo" className="w-full h-full object-cover" />
              </Link>
              <motion.button
                onClick={() => setIsSidebarOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
                title="Expand sidebar"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          )}
        </div>

        {/* Workspace Quick Toggle */}
        {isSidebarOpen && (
          <div className="px-4 py-2.5 border-b border-slate-100 dark:border-white/[0.04] bg-slate-50/70 dark:bg-white/[0.01]">
            <div className="flex items-center justify-between text-[11px] font-sans font-medium text-slate-500 dark:text-neutral-400 mb-1.5">
              <span>Switch Workspace:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {allOrgs.map((org) => {
                const isSelected = activeOrg.id === org.id;
                return (
                  <motion.button
                    key={org.id}
                    onClick={() => setActiveOrg(org)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    className={`relative px-3 py-1.5 rounded-lg text-xs truncate transition-colors cursor-pointer font-medium ${
                      isSelected
                        ? "text-slate-950 dark:text-white"
                        : "text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeOrgIndicator"
                        transition={{ type: "spring", stiffness: 420, damping: 32 }}
                        className="absolute inset-0 rounded-lg bg-slate-200 dark:bg-white/10 shadow-xs border border-slate-300/60 dark:border-white/10 z-0"
                      />
                    )}
                    <span className="relative z-10">{org.name.split(" ")[0]}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* Navigation Groups */}
        <div className="py-4 px-3 space-y-6 overflow-y-auto max-h-[calc(100vh-220px)] custom-scrollbar">
          {/* Main Core Modules */}
          <div>
            {isSidebarOpen && (
              <div className="px-3 text-[10px] font-sans font-semibold uppercase tracking-wider text-slate-400 dark:text-neutral-500 mb-2">
                Core Operations
              </div>
            )}
            <nav className="space-y-1">
              {mainNav.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors group relative ${
                      isActive
                        ? "text-indigo-700 dark:text-white font-medium"
                        : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-neutral-200 hover:bg-slate-100/80 dark:hover:bg-white/[0.03]"
                    }`}
                    title={!isSidebarOpen ? item.name : undefined}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeSidebarNav"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        className="absolute inset-0 rounded-xl bg-indigo-50 dark:bg-indigo-600/20 border border-indigo-200 dark:border-indigo-500/30 z-0"
                      />
                    )}
                    <div className="flex items-center gap-3 relative z-10 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-neutral-400 group-hover:text-slate-700 dark:group-hover:text-white"}`} />
                      {isSidebarOpen && <span className="truncate">{item.name}</span>}
                    </div>

                    {isSidebarOpen && item.badge && (
                      <span className="relative z-10 px-1.5 py-0.5 rounded-full text-[10px] font-sans font-semibold bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 border border-red-500/20 dark:border-red-500/30">
                        {item.badge}
                      </span>
                    )}

                    {isSidebarOpen && item.isNew && (
                      <span className="relative z-10 px-1.5 py-0.5 rounded-full text-[9px] font-sans bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 font-bold animate-pulse">
                        AI
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Platform & Governance */}
          <div>
            {isSidebarOpen && (
              <div className="px-3 text-[10px] font-sans font-semibold uppercase tracking-wider text-slate-400 dark:text-neutral-500 mb-2">
                Platform & Auditing
              </div>
            )}
            <nav className="space-y-1">
              {platformNav.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors group relative ${
                      isActive
                        ? "text-indigo-700 dark:text-white font-medium"
                        : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-neutral-200 hover:bg-slate-100/80 dark:hover:bg-white/[0.03]"
                    }`}
                    title={!isSidebarOpen ? item.name : undefined}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeSidebarNav"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        className="absolute inset-0 rounded-xl bg-indigo-50 dark:bg-indigo-600/20 border border-indigo-200 dark:border-indigo-500/30 z-0"
                      />
                    )}
                    <div className="flex items-center gap-3 relative z-10 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-neutral-400 group-hover:text-slate-700 dark:group-hover:text-white"}`} />
                      {isSidebarOpen && <span className="truncate">{item.name}</span>}
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Footer / User Profile Row */}
      <div className="p-3 border-t border-slate-200 dark:border-white/[0.08] bg-slate-50/70 dark:bg-white/[0.01]">
        <div
          className={`rounded-xl min-w-0 transition-all ${
            isSidebarOpen
              ? "flex items-center gap-3 px-2 py-1.5"
              : "flex items-center justify-center py-1.5"
          }`}
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-white/20 shrink-0"
          />
          {isSidebarOpen && (
            <div className="overflow-hidden min-w-0 flex-1">
              <div className="text-xs font-medium text-slate-900 dark:text-white truncate">{currentUser.name}</div>
              <div className="text-[10px] font-sans text-indigo-600 dark:text-indigo-400 truncate font-semibold mt-0.5">
                Role:{" "}{currentRole}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
