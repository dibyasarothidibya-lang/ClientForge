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
  HeartPulse,
  Settings,
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  Shield
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const {
    currentRole,
    currentUser,
    isSidebarOpen,
    setIsSidebarOpen,
    approvals,
    findings,
    candidates
  } = useWorkspace();

  const pendingApprovalsCount = approvals.filter((a) => a.status === "Pending").length;
  const openFindingsCount = findings.filter((f) => f.status === "Open" || f.status === "In Progress").length;
  const activeCandidatesCount = candidates.length;

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
        { name: "Attendance & Shifts", href: "/workspace/attendance", icon: Activity },
        { name: "Leave & Time Off", href: "/workspace/leave", icon: FileCheck2, badge: pendingApprovalsCount > 0 ? `${pendingApprovalsCount}` : undefined },
      ],
    },
    {
      title: "Talent Acquisition",
      items: [
        { name: "Recruitment ATS", href: "/workspace/recruitment", icon: FolderKanban, badge: `${activeCandidatesCount}` },
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
      title: "Governance & Reporting",
      items: [
        { name: "Workforce Analytics", href: "/workspace/reports", icon: BarChart3 },
        { name: "Compliance & Audits", href: "/workspace/audits", icon: ShieldAlert, badge: openFindingsCount > 0 ? `${openFindingsCount}` : undefined },
        { name: "Live Activity Log", href: "/workspace/activity", icon: Activity },
      ],
    },
    {
      title: "Administration",
      items: [
        { name: "Settings & Access", href: "/workspace/settings", icon: Settings },
        { name: "Billing & Plans", href: "/workspace/billing", icon: CreditCard },
        { name: "Workflow Automation", href: "/workspace/automation", icon: Bot },
        { name: "Help & Support", href: "/workspace/support", icon: HeartPulse },
      ],
    },
  ];

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-40 bg-[#ffffff] dark:bg-[#0c0d10] border-r border-slate-200/90 dark:border-white/[0.07] flex flex-col justify-between overflow-x-hidden transition-all duration-200 select-none ${
        isSidebarOpen ? "w-64" : "w-[68px]"
      }`}
    >
      {/* Top Workspace & Org Header */}
      <div className="flex flex-col min-h-0 flex-1">
        {/* Brand Bar */}
        <div
          className={`border-b border-slate-200/80 dark:border-white/[0.07] transition-all ${
            isSidebarOpen
              ? "h-14 px-3.5 flex items-center justify-between gap-2"
              : "h-14 flex items-center justify-center p-2"
          }`}
        >
          {isSidebarOpen ? (
            <>
              <Link
                href="/"
                title="Return to Client Forge Home"
                className="flex items-center gap-2.5 overflow-hidden min-w-0 flex-1 group"
              >
                <div className="w-7 h-7 rounded-md overflow-hidden bg-black border border-slate-200 dark:border-white/15 shrink-0 group-hover:border-slate-400 dark:group-hover:border-white/30 transition-colors">
                  <img src="/logo.jpg" alt="Client Forge Logo" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col min-w-0 flex-1 justify-center leading-tight">
                  <span className="font-victorian text-[20px] font-normal tracking-wide text-slate-900 dark:text-white truncate">
                    Client Forge
                  </span>
                  <span className="text-[9px] uppercase tracking-wider font-sans font-medium text-slate-400 dark:text-neutral-500 -mt-0.5 truncate">
                    Enterprise HR OS
                  </span>
                </div>
              </Link>

              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-neutral-200 hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-colors cursor-pointer shrink-0"
                title="Collapse sidebar"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Link
                href="/"
                title="Return to Client Forge Home"
                className="w-8 h-8 rounded-md overflow-hidden bg-black border border-slate-200 dark:border-white/15 flex items-center justify-center hover:opacity-85 transition-opacity shrink-0"
              >
                <img src="/logo.jpg" alt="Client Forge Logo" className="w-full h-full object-cover" />
              </Link>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-neutral-200 hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-colors cursor-pointer"
                title="Expand sidebar"
                aria-label="Expand sidebar"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Dedicated Hope Foundation Enterprise Context */}
        {isSidebarOpen && (
          <div className="px-3.5 py-2 border-b border-slate-200/60 dark:border-white/[0.05] bg-slate-50/50 dark:bg-white/[0.015]">
            <div className="flex items-center justify-between text-[11px] font-sans">
              <span className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-neutral-300 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-neutral-500" />
                <span className="truncate">Hope Foundation</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-neutral-400 shrink-0 font-medium">
                248 FTE
              </span>
            </div>
          </div>
        )}

        {/* Navigation Groups with Even, Symmetrical Spacing */}
        <div className="flex-1 py-3 px-3 space-y-4 overflow-y-auto custom-scrollbar">
          {navSections.map((sec) => (
            <div key={sec.title} className="space-y-1">
              {isSidebarOpen && (
                <div className="px-2.5 pt-2 pb-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500 font-semibold select-none">
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
                      className={`flex items-center justify-between h-8.5 px-2.5 rounded-lg text-xs font-sans transition-colors group ${
                        isSidebarOpen ? "w-full" : "w-10 mx-auto justify-center px-0"
                      } ${
                        isActive
                          ? "bg-slate-100 dark:bg-white/[0.08] text-slate-950 dark:text-white font-medium shadow-2xs"
                          : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-neutral-100 hover:bg-slate-100/60 dark:hover:bg-white/[0.03]"
                      }`}
                      title={!isSidebarOpen ? item.name : undefined}
                    >
                      <div className={`flex items-center gap-2.5 min-w-0 ${!isSidebarOpen ? "justify-center" : ""}`}>
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            isActive
                              ? "text-indigo-600 dark:text-indigo-400"
                              : "text-slate-400 dark:text-neutral-500 group-hover:text-slate-700 dark:group-hover:text-neutral-300"
                          }`}
                        />
                        {isSidebarOpen && (
                          <span className="truncate leading-normal">{item.name}</span>
                        )}
                      </div>

                      {isSidebarOpen && item.badge && (
                        <span className="ml-2 px-1.5 py-0.2 rounded text-[10px] font-mono font-medium bg-slate-200/70 dark:bg-white/[0.08] text-slate-700 dark:text-neutral-300 shrink-0">
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

      {/* Integrated User Identity Footer */}
      <div className="p-3 border-t border-slate-200/80 dark:border-white/[0.07] bg-slate-50/40 dark:bg-white/[0.01]">
        <div
          className={`flex items-center gap-2.5 min-w-0 rounded-lg p-0.5 transition-colors ${
            isSidebarOpen ? "justify-start" : "justify-center"
          }`}
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-white/10 shrink-0"
          />
          {isSidebarOpen && (
            <div className="overflow-hidden min-w-0 flex-1 leading-tight">
              <div className="text-xs font-medium text-slate-900 dark:text-neutral-200 truncate">
                {currentUser.name}
              </div>
              <div className="text-[11px] font-sans text-slate-400 dark:text-neutral-500 truncate flex items-center gap-1 mt-0.5">
                <Shield className="w-3 h-3 text-indigo-500 dark:text-indigo-400 shrink-0" />
                <span className="truncate">{currentRole}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
