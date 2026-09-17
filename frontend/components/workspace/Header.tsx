"use client";

import { useState } from "react";
import Link from "next/link";
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

  const roles: UserRole[] = ["Owner", "Administrator", "Manager", "Finance", "Auditor", "Member"];

  return (
    <header
      className={`sticky top-0 z-30 h-16 bg-white/90 dark:bg-[#09090b]/90 backdrop-blur-md border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between px-4 sm:px-8 transition-all duration-300 ${
        isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
      }`}
    >
      {/* Left: Global Search Launcher */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-white/[0.04] dark:hover:bg-white/[0.07] border border-slate-200 dark:border-white/[0.08] text-xs font-mono text-slate-500 dark:text-neutral-400 transition-colors w-48 sm:w-72"
        >
          <Search className="w-3.5 h-3.5 text-slate-400 dark:text-neutral-400" />
          <span className="truncate">Search or jump to...</span>
          <kbd className="ml-auto hidden sm:inline-block px-1.5 py-0.5 rounded bg-white dark:bg-white/[0.06] border border-slate-200 dark:border-white/[0.08] text-[10px] text-slate-500 dark:text-neutral-400">
            ⌘K
          </kbd>
        </button>

        {/* Public Campaign Link Preview */}
        <Link
          href="/campaigns/clean-water-50-villages"
          target="_blank"
          className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          title="View public donation portal"
        >
          <span>Public Portal</span>
          <ExternalLink className="w-3 h-3 text-slate-400 dark:text-neutral-500" />
        </Link>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Aesthetic Theme Switcher for Workspace */}
        <ThemeToggle compact />

        {/* ROLE IMPERSONATION SWITCHER (DEMO SUPERPOWER) */}
        <div className="relative">
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 text-xs font-mono text-indigo-700 dark:text-indigo-300 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
            title="Switch demo persona to test RBAC permissions"
          >
            <Shield className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Role: <strong className="text-indigo-950 dark:text-white">{currentRole}</strong></span>
          </button>

          {roleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#121215] border border-slate-200 dark:border-white/[0.12] rounded-2xl p-2 shadow-2xl z-50">
              <div className="px-3 py-1.5 text-[10px] font-mono text-slate-500 dark:text-neutral-400 uppercase tracking-widest border-b border-slate-100 dark:border-white/[0.06]">
                Simulate User Role:
              </div>
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setCurrentRole(role);
                    setRoleDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                    currentRole === role
                      ? "bg-indigo-600 text-white font-medium"
                      : "text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-white/[0.05]"
                  }`}
                >
                  <span>{role}</span>
                  {currentRole === role && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Create Action */}
        <div className="relative">
          <button
            onClick={() => setQuickCreateOpen(!quickCreateOpen)}
            className="h-9 px-3 bg-slate-900 hover:bg-slate-800 text-white dark:bg-[#f5f5f3] dark:hover:bg-white dark:text-neutral-950 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Create</span>
          </button>

          {quickCreateOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#121215] border border-slate-200 dark:border-white/[0.12] rounded-2xl p-2 shadow-2xl z-50 text-xs">
              <Link
                href="/workspace/projects"
                onClick={() => setQuickCreateOpen(false)}
                className="block px-3 py-2 rounded-xl text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-white/[0.05] hover:text-slate-900 dark:hover:text-white"
              >
                + New Task
              </Link>
              <Link
                href="/workspace/audits"
                onClick={() => setQuickCreateOpen(false)}
                className="block px-3 py-2 rounded-xl text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-white/[0.05] hover:text-slate-900 dark:hover:text-white"
              >
                + New Audit Finding
              </Link>
              <Link
                href="/workspace/approvals"
                onClick={() => setQuickCreateOpen(false)}
                className="block px-3 py-2 rounded-xl text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-white/[0.05] hover:text-slate-900 dark:hover:text-white"
              >
                + Submit Approval Request
              </Link>
              <Link
                href="/workspace/documents"
                onClick={() => setQuickCreateOpen(false)}
                className="block px-3 py-2 rounded-xl text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-white/[0.05] hover:text-slate-900 dark:hover:text-white"
              >
                + Upload Document
              </Link>
            </div>
          )}
        </div>

        {/* Notifications Center */}
        <div className="relative">
          <button
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
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#121215] border border-slate-200 dark:border-white/[0.12] rounded-2xl p-4 shadow-2xl z-50 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.06] mb-3">
                <span className="font-mono uppercase tracking-wider text-slate-900 dark:text-white text-xs font-semibold">Notifications</span>
                <span className="text-[11px] text-slate-500 dark:text-neutral-400">All caught up</span>
              </div>
              <div className="space-y-2.5">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.04]">
                  <div className="text-slate-900 dark:text-white font-medium">Approval Pending: Submersible Pump</div>
                  <div className="text-[11px] text-slate-600 dark:text-neutral-400 mt-0.5">Julian Vance assigned you to review $14,200 disbursement.</div>
                  <div className="text-[10px] font-mono text-slate-400 dark:text-neutral-500 mt-1">15 mins ago</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.04]">
                  <div className="text-slate-900 dark:text-white font-medium">Critical Finding: Dual-authorization</div>
                  <div className="text-[11px] text-slate-600 dark:text-neutral-400 mt-0.5">Assigned to Finance for remediation by Sep 24.</div>
                  <div className="text-[10px] font-mono text-slate-400 dark:text-neutral-500 mt-1">1 hour ago</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Return to Public Site */}
        <Link
          href="/"
          className="text-xs font-mono text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-white/[0.06] hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors"
          title="Exit to Landing Page"
        >
          Exit Demo
        </Link>
      </div>
    </header>
  );
}
