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

  const navSections = [
    {
      title: "Overview",
      items: [
        { name: "Executive Dashboard", href: "/workspace", icon: LayoutDashboard },
      ],
    },
    {
      title: "People & Staffing",
      items: [
        { name: "People Directory", href: "/workspace/people", icon: Users },
        { name: "Leave & Time Off", href: "/workspace/leave", icon: FileCheck2, badge: pendingApprovalsCount > 0 ? `${pendingApprovalsCount}` : undefined },
        { name: "Attendance & Shifts", href: "/workspace/attendance", icon: Activity },
      ],
    },
    {
      title: "Talent Acquisition",
      items: [
        { name: "Recruitment ATS", href: "/workspace/recruitment", icon: FolderKanban, badge: "47" },
        { name: "New Hire Onboarding", href: "/onboarding/peoplecore", icon: Sparkles },
      ],
    },
    {
      title: "Compensation & Ops",
      items: [
        { name: "Payroll Operations", href: "/workspace/payroll", icon: CreditCard },
        { name: "Expenses & Claims", href: "/workspace/expenses", icon: CreditCard },
        { name: "HR Documents", href: "/workspace/documents", icon: FileText },
      ],
    },
    {
      title: "Performance & Strategy",
      items: [
        { name: "Reviews & OKRs", href: "/workspace/performance", icon: Sparkles },
        { name: "Projects & Tasks", href: "/workspace/projects", icon: Layers },
      ],
    },
    {
      title: "Governance & Reports",
      items: [
        { name: "Workforce Analytics", href: "/workspace/reports", icon: BarChart3 },
        { name: "Compliance & Audits", href: "/workspace/audits", icon: ShieldAlert, badge: openFindingsCount > 0 ? `${openFindingsCount}` : undefined },
        { name: "Live Activity Log", href: "/workspace/activity", icon: Activity },
      ],
    },
    {
      title: "Administration",
      items: [
        { name: "Settings", href: "/workspace/settings", icon: Settings },
        { name: "Billing & Plans", href: "/workspace/billing", icon: CreditCard },
        { name: "Workflow Automation", href: "/workspace/automation", icon: Bot },
        { name: "Help & Support", href: "/workspace/support", icon: HeartPulse },
      ],
    },
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
              ? "px-4 py-3 flex items-center justify-between gap-2.5 min-h-[4.25rem]"
              : "h-16 flex items-center justify-center p-2"
          }`}
        >
          {isSidebarOpen ? (
            <>
              <Link
                href="/"
                title="Return to Client Forge Home"
                className="flex items-center gap-2.5 overflow-hidden min-w-0 flex-1 group hover:opacity-90 transition-opacity"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg overflow-hidden bg-black border border-slate-200 dark:border-white/15 flex-shrink-0 group-hover:border-slate-400 dark:group-hover:border-white/30 transition-colors">
                  <img src="/logo.jpg" alt="Client Forge Logo" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col min-w-0 flex-1 justify-center">
                  <span className="font-victorian text-[21px] sm:text-[23px] font-normal tracking-wide text-slate-900 dark:text-white select-none transition-colors whitespace-nowrap leading-none">
                    Client Forge
                  </span>
                  <span className="text-[9px] uppercase tracking-widest font-sans font-medium text-slate-500 dark:text-zinc-400 -mt-0.5 truncate whitespace-nowrap">
                    Client Intelligence OS
                  </span>
                </div>
              </Link>

              <motion.button
                onClick={() => setIsSidebarOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors cursor-pointer shrink-0"
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

        {/* Dedicated Hope Foundation Enterprise Indicator */}
        {isSidebarOpen && (
          <div className="px-4 py-2.5 border-b border-slate-100 dark:border-white/[0.04] bg-slate-50/70 dark:bg-white/[0.01]">
            <div className="flex items-center justify-between text-[11px] font-sans font-medium text-slate-500 dark:text-neutral-400">
              <span className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-neutral-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Hope Foundation
              </span>
              <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-200/50 dark:border-indigo-500/20">
                Enterprise
              </span>
            </div>
          </div>
        )}

        {/* Navigation Groups */}
        <div className="py-3 px-3 space-y-4 overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar">
          {navSections.map((sec) => (
            <div key={sec.title} className="space-y-1">
              {isSidebarOpen && (
                <div className="px-3 pt-2 pb-1 text-[10px] font-sans font-semibold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
                  {sec.title}
                </div>
              )}
              <nav className="space-y-0.5">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-colors group relative ${
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
                      <div className="flex items-center gap-2.5 relative z-10 min-w-0">
                        <Icon
                          className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                            isActive
                              ? "text-indigo-600 dark:text-indigo-400"
                              : "text-slate-400 dark:text-neutral-400 group-hover:text-slate-700 dark:group-hover:text-white"
                          }`}
                        />
                        {isSidebarOpen && <span className="truncate">{item.name}</span>}
                      </div>

                      {isSidebarOpen && item.badge && (
                        <span className="relative z-10 px-1.5 py-0.2 rounded-full text-[10px] font-sans font-semibold bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
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
