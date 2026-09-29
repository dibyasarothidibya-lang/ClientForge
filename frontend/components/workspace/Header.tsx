"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import { UserRole } from "@/lib/demoData";
import {
  Search,
  Command,
  Bell,
  CheckCircle2,
  Plus,
  Moon,
  Sun,
  Shield,
  HelpCircle,
  Clock,
  Sparkles,
  ExternalLink
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

  const dropdownMotion = {
    initial: { opacity: 0, y: -8, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -6, scale: 0.96 },
    transition: { type: "spring" as const, stiffness: 450, damping: 32 }
  };

  return (
    <header
      className={`sticky top-0 z-30 h-16 bg-white/90 dark:bg-[#09090b]/90 backdrop-blur-md border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between px-4 sm:px-8 transition-all duration-300 ${
        isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
      }`}
    >
      {/* Left: Global Search Launcher & Quick Home */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          title="Return to Client Forge Home"
          className="lg:hidden flex items-center gap-2 group mr-2 shrink-0"
        >
          <div className="w-8 h-8 rounded-lg overflow-hidden bg-black border border-slate-200 dark:border-white/15 shrink-0">
            <img src="/logo.jpg" alt="Client Forge Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-victorian text-[21px] font-normal tracking-wide text-slate-900 dark:text-white select-none transition-colors whitespace-nowrap leading-none">
              Client Forge
            </span>
            <span className="text-[9px] uppercase tracking-widest font-sans font-medium text-slate-500 dark:text-zinc-400 -mt-0.5 hidden sm:inline-block whitespace-nowrap">
              Client Intelligence OS
            </span>
          </div>
        </Link>

        <motion.button
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          onClick={() => setIsCommandPaletteOpen(true)}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-white/[0.04] dark:hover:bg-white/[0.07] border border-slate-200 dark:border-white/[0.08] text-xs font-sans text-slate-500 dark:text-neutral-400 transition-colors w-44 sm:w-72 cursor-pointer shadow-xs"
        >
          <Search className="w-3.5 h-3.5 text-slate-400 dark:text-neutral-400" />
          <span className="truncate">Search or jump to...</span>
          <kbd className="ml-auto hidden sm:inline-block px-1.5 py-0.5 rounded bg-white dark:bg-white/[0.06] border border-slate-200 dark:border-white/[0.08] text-[10px] font-sans font-medium text-slate-500 dark:text-neutral-400">
            ⌘K
          </kbd>
        </motion.button>

        {/* Employee Directory Portal Link */}
        <Link
          href="/workspace/people"
          className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-sans font-medium text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          title="Open Employee Directory"
        >
          <span>People Directory</span>
          <ExternalLink className="w-3 h-3 text-slate-400 dark:text-neutral-500" />
        </Link>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Aesthetic Theme Switcher for Workspace */}
        <ThemeToggle compact />

        {/* ROLE IMPERSONATION SWITCHER (DEMO SUPERPOWER) */}
        <div className="relative" ref={roleRef}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 text-xs font-sans font-medium text-indigo-700 dark:text-indigo-300 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors cursor-pointer shadow-xs"
            title="Switch demo persona to test RBAC permissions"
          >
            <Shield className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Role:{" "}<strong className="text-indigo-950 dark:text-white font-semibold">{currentRole}</strong></span>
          </motion.button>

          <AnimatePresence>
            {roleDropdownOpen && (
              <motion.div
                {...dropdownMotion}
                className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#121215] border border-slate-200 dark:border-white/[0.12] rounded-2xl p-2 shadow-2xl z-50 origin-top-right font-sans"
              >
                <div className="px-3 py-1.5 text-[10px] font-sans font-semibold text-slate-500 dark:text-neutral-400 uppercase tracking-wider border-b border-slate-100 dark:border-white/[0.06]">
                  Simulate User Role:
                </div>
                {roles.map((role) => (
                  <motion.button
                    key={role}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setCurrentRole(role);
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      currentRole === role
                        ? "bg-indigo-600 text-white font-medium shadow-xs"
                        : "text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-white/[0.05]"
                    }`}
                  >
                    <span>{role}</span>
                    {currentRole === role && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Create Action */}
        <div className="relative" ref={createRef}>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setQuickCreateOpen(!quickCreateOpen)}
            className="h-9 px-3 bg-slate-900 hover:bg-slate-800 text-white dark:bg-[#f5f5f3] dark:hover:bg-white dark:text-neutral-950 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Create</span>
          </motion.button>

          <AnimatePresence>
            {quickCreateOpen && (
              <motion.div
                {...dropdownMotion}
                className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#121215] border border-slate-200 dark:border-white/[0.12] rounded-2xl p-2 shadow-2xl z-50 text-xs origin-top-right space-y-0.5"
              >
                <div className="px-2.5 py-1 text-[10px] font-sans font-semibold text-slate-400 dark:text-neutral-500 uppercase tracking-wider">
                  Quick Actions
                </div>
                <Link
                  href="/workspace/people/new"
                  onClick={() => setQuickCreateOpen(false)}
                  className="block px-3 py-2 rounded-xl text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-white/[0.05] hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  + Add Employee
                </Link>
                <Link
                  href="/workspace/recruitment?action=create-job"
                  onClick={() => setQuickCreateOpen(false)}
                  className="block px-3 py-2 rounded-xl text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-white/[0.05] hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  + Create Job Posting
                </Link>
                <Link
                  href="/workspace/leave?action=request"
                  onClick={() => setQuickCreateOpen(false)}
                  className="block px-3 py-2 rounded-xl text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-white/[0.05] hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  + Request Leave
                </Link>
                <Link
                  href="/workspace/expenses?action=submit"
                  onClick={() => setQuickCreateOpen(false)}
                  className="block px-3 py-2 rounded-xl text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-white/[0.05] hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  + Submit Expense
                </Link>
                <Link
                  href="/workspace/performance?action=create-goal"
                  onClick={() => setQuickCreateOpen(false)}
                  className="block px-3 py-2 rounded-xl text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-white/[0.05] hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  + Create Performance Goal
                </Link>
                <Link
                  href="/workspace/documents?action=upload"
                  onClick={() => setQuickCreateOpen(false)}
                  className="block px-3 py-2 rounded-xl text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-white/[0.05] hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  + Upload Document
                </Link>
                <Link
                  href="/workspace/projects"
                  onClick={() => setQuickCreateOpen(false)}
                  className="block px-3 py-2 rounded-xl text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-white/[0.05] hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  + New Project Task
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications Center */}
        <div className="relative" ref={notifRef}>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              if (!notificationsOpen) markNotificationsRead();
            }}
            className="relative p-2 rounded-xl text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            )}
          </motion.button>

          <AnimatePresence>
            {notificationsOpen && (
              <motion.div
                {...dropdownMotion}
                className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#121215] border border-slate-200 dark:border-white/[0.12] rounded-2xl p-4 shadow-2xl z-50 text-xs origin-top-right"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.06] mb-3">
                  <span className="font-sans uppercase tracking-wider text-slate-900 dark:text-white text-xs font-semibold">Notifications</span>
                  <span className="text-[11px] text-slate-500 dark:text-neutral-400">All caught up</span>
                </div>
                <div className="space-y-2.5">
                  <Link
                    href="/workspace/approvals"
                    onClick={() => setNotificationsOpen(false)}
                    className="block p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.02] dark:hover:bg-white/[0.06] border border-slate-200/80 dark:border-white/[0.04] transition-all cursor-pointer group"
                  >
                    <div className="text-slate-900 dark:text-white font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Approval Pending: Submersible Pump</div>
                    <div className="text-[11px] text-slate-600 dark:text-neutral-400 mt-0.5 leading-relaxed">Julian Vance assigned you to review $14,200 disbursement.</div>
                    <div className="text-[10px] font-sans text-slate-400 dark:text-neutral-500 mt-1">15 mins ago • View in Approvals &rarr;</div>
                  </Link>
                  <Link
                    href="/workspace/audits"
                    onClick={() => setNotificationsOpen(false)}
                    className="block p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.02] dark:hover:bg-white/[0.06] border border-slate-200/80 dark:border-white/[0.04] transition-all cursor-pointer group"
                  >
                    <div className="text-slate-900 dark:text-white font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Critical Finding: Dual-authorization</div>
                    <div className="text-[11px] text-slate-600 dark:text-neutral-400 mt-0.5 leading-relaxed">Assigned to Finance for remediation by Sep 24.</div>
                    <div className="text-[10px] font-sans text-slate-400 dark:text-neutral-500 mt-1">1 hour ago • View Audit Registry &rarr;</div>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Return to Public Site */}
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link
            href="/"
            className="text-xs font-sans font-medium text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-white/[0.06] hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors inline-block"
            title="Exit to Landing Page"
          >
            Exit Demo
          </Link>
        </motion.div>
      </div>
    </header>
  );
}
