"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import { UserRole } from "@/lib/demoData";
import {
  Search,
  Bell,
  Check,
  Plus,
  Shield,
  Building2,
  ExternalLink,
  ChevronDown,
  UserPlus,
  Briefcase,
  Calendar,
  CreditCard,
  Target,
  FileUp,
  ListTodo
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const {
    currentRole,
    setCurrentRole,
    currentUser,
    isSidebarOpen,
    setIsCommandPaletteOpen,
    unreadNotificationCount,
    markNotificationsRead,
    notifications,
  } = useWorkspace();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [quickCreateOpen, setQuickCreateOpen] = useState(false);

  const roleRef = useRef<HTMLDivElement>(null);
  const createRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) {
        setRoleDropdownOpen(false);
      }
      if (createRef.current && !createRef.current.contains(e.target as Node)) {
        setQuickCreateOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const roles: UserRole[] = ["Owner", "Administrator", "Manager", "Finance", "Auditor", "Member"];

  const quickActions = [
    { label: "New Employee", href: "/workspace/people/new", icon: UserPlus, desc: "Add to personnel directory" },
    { label: "Create Job Posting", href: "/workspace/recruitment?action=create-job", icon: Briefcase, desc: "Publish opening in ATS" },
    { label: "Request Leave", href: "/workspace/leave?action=request", icon: Calendar, desc: "Submit PTO or mission leave" },
    { label: "Submit Expense", href: "/workspace/expenses?action=submit", icon: CreditCard, desc: "File field receipt or claim" },
    { label: "Set Goal / OKR", href: "/workspace/performance?action=create-goal", icon: Target, desc: "Quarterly milestone tracking" },
    { label: "Upload Document", href: "/workspace/documents?action=upload", icon: FileUp, desc: "Add policy or contract" },
  ];

  return (
    <header
      className={`sticky top-0 z-30 h-14 bg-white/95 dark:bg-[#0c0d10]/95 backdrop-blur-sm border-b border-slate-200/90 dark:border-white/[0.07] flex items-center justify-between px-4 sm:px-6 transition-all duration-200 ${
        isSidebarOpen ? "lg:ml-64" : "lg:ml-[68px]"
      }`}
    >
      {/* Left: Global Search / Command Bar Launcher & Org Breadcrumb */}
      <div className="flex items-center gap-3">
        {/* Mobile Logo Link */}
        <Link
          href="/"
          title="Return to Client Forge Home"
          className="lg:hidden flex items-center gap-2 mr-1 shrink-0"
        >
          <div className="w-7 h-7 rounded-md overflow-hidden bg-black border border-slate-200 dark:border-white/15 shrink-0">
            <img src="/logo.jpg" alt="Client Forge Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-victorian text-[19px] text-slate-900 dark:text-white leading-none">
            Client Forge
          </span>
        </Link>

        {/* Global Keyboard-First Search Launcher */}
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="flex items-center gap-2.5 h-8 px-2.5 rounded-lg bg-slate-100/80 hover:bg-slate-200/70 dark:bg-white/[0.04] dark:hover:bg-white/[0.07] border border-slate-200/80 dark:border-white/[0.07] text-xs font-sans text-slate-500 dark:text-neutral-400 transition-colors w-48 sm:w-64 cursor-pointer"
        >
          <Search className="w-3.5 h-3.5 text-slate-400 dark:text-neutral-500 shrink-0" />
          <span className="truncate text-[12px]">Search or jump to...</span>
          <kbd className="ml-auto hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-white dark:bg-white/[0.06] border border-slate-200 dark:border-white/[0.08] text-[10px] font-mono text-slate-500 dark:text-neutral-400">
            ⌘K
          </kbd>
        </button>

        {/* Organization / Context Indicator */}
        <div className="hidden md:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-white/[0.07] text-xs font-sans">
          <span className="text-slate-400 dark:text-neutral-500 font-normal">Context:</span>
          <span className="font-medium text-slate-800 dark:text-neutral-200 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-slate-400 dark:text-neutral-500" />
            Hope Foundation
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Compact Theme Switcher */}
        <ThemeToggle compact />

        {/* Role Impersonation Switcher */}
        <div className="relative" ref={roleRef}>
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg bg-slate-100/80 dark:bg-white/[0.04] hover:bg-slate-200/70 dark:hover:bg-white/[0.07] border border-slate-200/80 dark:border-white/[0.07] text-xs font-sans text-slate-700 dark:text-neutral-300 transition-colors cursor-pointer"
            title="Switch demo role to verify permissions"
          >
            <Shield className="w-3 h-3 text-slate-400 dark:text-neutral-500" />
            <span className="hidden sm:inline text-slate-400 dark:text-neutral-500">Role:</span>
            <span className="font-medium text-slate-900 dark:text-neutral-100">{currentRole}</span>
            <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
          </button>

          <AnimatePresence>
            {roleDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: 0.12 }}
                className="absolute right-0 mt-1.5 w-52 bg-white dark:bg-[#111215] border border-slate-200 dark:border-white/[0.1] rounded-xl p-1.5 shadow-xl z-50 font-sans"
              >
                <div className="px-2.5 py-1 text-[10px] font-sans font-semibold uppercase tracking-wider text-slate-400 dark:text-neutral-500 border-b border-slate-100 dark:border-white/[0.06] mb-1">
                  Simulate Role Access
                </div>
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setCurrentRole(role);
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      currentRole === role
                        ? "bg-slate-100 dark:bg-white/[0.08] text-slate-900 dark:text-white font-medium"
                        : "text-slate-600 dark:text-neutral-400 hover:bg-slate-50 dark:hover:bg-white/[0.04]"
                    }`}
                  >
                    <span>{role}</span>
                    {currentRole === role && <Check className="w-3.5 h-3.5 text-indigo-500" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Global Quick Action Menu */}
        <div className="relative" ref={createRef}>
          <button
            onClick={() => setQuickCreateOpen(!quickCreateOpen)}
            className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-medium transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Action</span>
          </button>

          <AnimatePresence>
            {quickCreateOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: 0.12 }}
                className="absolute right-0 mt-1.5 w-60 bg-white dark:bg-[#111215] border border-slate-200 dark:border-white/[0.1] rounded-xl p-1.5 shadow-xl z-50 font-sans"
              >
                <div className="px-2.5 py-1 text-[10px] font-sans font-semibold uppercase tracking-wider text-slate-400 dark:text-neutral-500 border-b border-slate-100 dark:border-white/[0.06] mb-1">
                  Quick Actions
                </div>
                {quickActions.map((act) => {
                  const Icon = act.icon;
                  return (
                    <Link
                      key={act.label}
                      href={act.href}
                      onClick={() => setQuickCreateOpen(false)}
                      className="flex items-start gap-2.5 px-2.5 py-2 rounded-lg text-slate-700 dark:text-neutral-300 hover:bg-slate-100/70 dark:hover:bg-white/[0.05] transition-colors"
                    >
                      <Icon className="w-4 h-4 text-slate-400 dark:text-neutral-500 mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-slate-900 dark:text-white leading-tight">
                          {act.label}
                        </div>
                        <div className="text-[11px] text-slate-400 dark:text-neutral-500 truncate">
                          {act.desc}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications Center */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              if (!notificationsOpen) markNotificationsRead();
            }}
            className="relative p-1.5 rounded-lg text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-colors cursor-pointer"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
            )}
          </button>

          <AnimatePresence>
            {notificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: 0.12 }}
                className="absolute right-0 mt-1.5 w-80 sm:w-88 bg-white dark:bg-[#111215] border border-slate-200 dark:border-white/[0.1] rounded-xl p-3 shadow-xl z-50 font-sans"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/[0.06] mb-2">
                  <span className="text-xs font-semibold text-slate-900 dark:text-white">
                    Operational Notifications
                  </span>
                  <span className="text-[11px] text-slate-400 dark:text-neutral-500">
                    {unreadNotificationCount > 0 ? `${unreadNotificationCount} unread` : "All caught up"}
                  </span>
                </div>
                <div className="space-y-1.5 max-h-72 overflow-y-auto custom-scrollbar">
                  <Link
                    href="/workspace/approvals"
                    onClick={() => setNotificationsOpen(false)}
                    className="block p-2 rounded-lg bg-slate-50 dark:bg-white/[0.02] hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-colors"
                  >
                    <div className="text-xs font-medium text-slate-900 dark:text-white">Disbursement Approval Pending</div>
                    <div className="text-[11px] text-slate-500 dark:text-neutral-400 mt-0.5 leading-snug">
                      Dr. Tariq Vance approved $14,200 Kabul medical shipment.
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 font-mono">15m ago · Approvals</div>
                  </Link>

                  <Link
                    href="/workspace/audits"
                    onClick={() => setNotificationsOpen(false)}
                    className="block p-2 rounded-lg bg-slate-50 dark:bg-white/[0.02] hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-colors"
                  >
                    <div className="text-xs font-medium text-slate-900 dark:text-white">Internal Audit Finding</div>
                    <div className="text-[11px] text-slate-500 dark:text-neutral-400 mt-0.5 leading-snug">
                      Dual-authorization requirement for transfers &gt; $10k due in 4 days.
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 font-mono">1h ago · Compliance</div>
                  </Link>

                  <Link
                    href="/workspace/attendance"
                    onClick={() => setNotificationsOpen(false)}
                    className="block p-2 rounded-lg bg-slate-50 dark:bg-white/[0.02] hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-colors"
                  >
                    <div className="text-xs font-medium text-slate-900 dark:text-white">Duty Station Check-in Reconciled</div>
                    <div className="text-[11px] text-slate-500 dark:text-neutral-400 mt-0.5 leading-snug">
                      Cox's Bazar field office confirmed 64/64 personnel present.
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 font-mono">3h ago · Operations</div>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Exit Demo to Public Site */}
        <Link
          href="/"
          className="text-xs font-sans text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white px-2 py-1 rounded-md transition-colors"
          title="Exit workspace to public site"
        >
          Exit
        </Link>
      </div>
    </header>
  );
}
