"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
    { name: "Executive Dashboard", href: "/workspace", icon: LayoutDashboard },
    { name: "People & Teams", href: "/workspace/people", icon: Users },
    { name: "Projects & Tasks", href: "/workspace/projects", icon: FolderKanban },
    {
      name: "Approvals Engine",
      href: "/workspace/approvals",
      icon: FileCheck2,
      badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : undefined,
    },
    {
      name: "Internal Audits",
      href: "/workspace/audits",
      icon: ShieldAlert,
      badge: openFindingsCount > 0 ? openFindingsCount : undefined,
      highlight: true,
    },
    { name: "Donations & Finance", href: "/workspace/finance", icon: CreditCard },
    { name: "Document Storage", href: "/workspace/documents", icon: FileText },
    { name: "Report Builder Lite", href: "/workspace/reports", icon: BarChart3 },
    { name: "Grounded AI", href: "/workspace/ai", icon: Bot, isNew: true },
  ];

  const platformNav = [
    { name: "Activity & Audit Log", href: "/workspace/activity", icon: Activity },
    { name: "Developer Center", href: "/workspace/developer", icon: Code2 },
    { name: "System Observability", href: "/workspace/health", icon: HeartPulse },
    { name: "Settings & RBAC", href: "/workspace/settings", icon: Settings },
  ];

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-40 bg-white dark:bg-[#0c0c0e] border-r border-slate-200 dark:border-white/[0.08] flex flex-col justify-between transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Top Workspace Switcher */}
      <div>
        <div className="p-4 border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-black border border-slate-200 dark:border-white/15 flex-shrink-0">
              <img src="/logo.jpg" alt="Org Logo" className="w-full h-full object-cover" />
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden">
                <div className="font-serif text-base text-slate-900 dark:text-[#f5f5f3] truncate font-medium">
                  {activeOrg.name}
                </div>
                <div className="text-[10px] font-mono text-slate-500 dark:text-neutral-400 uppercase tracking-wider truncate">
                  {activeOrg.plan} Tier • Multi-Tenant
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-lg text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors cursor-pointer"
            title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Workspace Quick Toggle */}
        {isSidebarOpen && (
          <div className="px-4 py-2 border-b border-slate-100 dark:border-white/[0.04] bg-slate-50/70 dark:bg-white/[0.01]">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-neutral-400 mb-1">
              <span>Switch Workspace:</span>
            </div>
            <div className="flex gap-1">
              {allOrgs.map((org) => (
                <button
                  key={org.id}
                  onClick={() => setActiveOrg(org)}
                  className={`px-2.5 py-1 rounded-md text-xs truncate transition-colors cursor-pointer ${
                    activeOrg.id === org.id
                      ? "bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white font-medium"
                      : "text-slate-500 dark:text-neutral-500 hover:text-slate-800 dark:hover:text-neutral-300"
                  }`}
                >
                  {org.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Groups */}
        <div className="py-4 px-3 space-y-6 overflow-y-auto max-h-[calc(100vh-220px)] custom-scrollbar">
          {/* Main Core Modules */}
          <div>
            {isSidebarOpen && (
              <div className="px-3 text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-neutral-500 mb-2">
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
                        ? "bg-indigo-50 dark:bg-indigo-600/20 text-indigo-700 dark:text-white font-medium border border-indigo-200 dark:border-indigo-500/30"
                        : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-neutral-200 hover:bg-slate-100 dark:hover:bg-white/[0.03]"
                    }`}
                    title={!isSidebarOpen ? item.name : undefined}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-neutral-400 group-hover:text-slate-700 dark:group-hover:text-white"}`} />
                      {isSidebarOpen && <span>{item.name}</span>}
                    </div>

                    {isSidebarOpen && item.badge && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 border border-red-500/20 dark:border-red-500/30">
                        {item.badge}
                      </span>
                    )}

                    {isSidebarOpen && item.isNew && (
                      <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 font-semibold">
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
              <div className="px-3 text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-neutral-500 mb-2">
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
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors group ${
                      isActive
                        ? "bg-indigo-50 dark:bg-indigo-600/20 text-indigo-700 dark:text-white font-medium border border-indigo-200 dark:border-indigo-500/30"
                        : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-neutral-200 hover:bg-slate-100 dark:hover:bg-white/[0.03]"
                    }`}
                    title={!isSidebarOpen ? item.name : undefined}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-neutral-400 group-hover:text-slate-700 dark:group-hover:text-white"}`} />
                      {isSidebarOpen && <span>{item.name}</span>}
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
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-white/20 shrink-0"
          />
          {isSidebarOpen && (
            <div className="overflow-hidden">
              <div className="text-xs font-medium text-slate-900 dark:text-white truncate">{currentUser.name}</div>
              <div className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 truncate font-semibold">
                Role: {currentRole}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
