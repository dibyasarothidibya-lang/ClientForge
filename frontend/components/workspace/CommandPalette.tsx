"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import {
  Search,
  LayoutDashboard,
  Users,
  FolderKanban,
  FileCheck2,
  ShieldAlert,
  CreditCard,
  FileText,
  Settings,
  Activity,
  Bot,
  HeartPulse,
  UserPlus,
  ArrowRight,
  Sparkles,
  Building2,
  X
} from "lucide-react";

export default function CommandPalette() {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen, members, projects } = useWorkspace();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const navigationCommands = [
    { title: "Executive Dashboard", section: "Navigation", path: "/workspace", icon: LayoutDashboard },
    { title: "People Directory", section: "Navigation", path: "/workspace/people", icon: Users },
    { title: "Attendance & Shifts", section: "Navigation", path: "/workspace/attendance", icon: Activity },
    { title: "Leave & Time Off", section: "Navigation", path: "/workspace/leave", icon: FileCheck2 },
    { title: "Recruitment ATS", section: "Navigation", path: "/workspace/recruitment", icon: FolderKanban },
    { title: "New Hire Onboarding", section: "Navigation", path: "/onboarding/peoplecore", icon: Sparkles },
    { title: "Payroll Operations", section: "Navigation", path: "/workspace/payroll", icon: CreditCard },
    { title: "Expenses & Claims", section: "Navigation", path: "/workspace/expenses", icon: CreditCard },
    { title: "HR Documents", section: "Navigation", path: "/workspace/documents", icon: FileText },
    { title: "Reviews & OKRs", section: "Navigation", path: "/workspace/performance", icon: Sparkles },
    { title: "Projects & Tasks", section: "Navigation", path: "/workspace/projects", icon: FolderKanban },
    { title: "Workforce Analytics", section: "Navigation", path: "/workspace/reports", icon: LayoutDashboard },
    { title: "Compliance & Audits", section: "Navigation", path: "/workspace/audits", icon: ShieldAlert },
    { title: "Workflow Automation", section: "Navigation", path: "/workspace/automation", icon: Bot },
    { title: "Settings & Access", section: "Navigation", path: "/workspace/settings", icon: Settings },
  ];

  const quickActionCommands = [
    { title: "Add New Employee", section: "Quick Action", path: "/workspace/people/new", icon: UserPlus },
    { title: "Create Job Requisition", section: "Quick Action", path: "/workspace/recruitment?action=create-job", icon: FolderKanban },
    { title: "Request Leave / Absence", section: "Quick Action", path: "/workspace/leave?action=request", icon: FileCheck2 },
    { title: "Review Payroll Exceptions", section: "Quick Action", path: "/workspace/payroll", icon: CreditCard },
  ];

  const memberCommands = members.slice(0, 8).map((m) => ({
    title: `${m.name} — ${m.role} (${m.department})`,
    section: "Personnel",
    path: `/workspace/people?search=${encodeURIComponent(m.name)}`,
    icon: Users,
  }));

  const allItems = [...navigationCommands, ...quickActionCommands, ...memberCommands];

  const filteredItems = allItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.section.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandPaletteOpen]);

  const handleSelect = (path: string) => {
    setIsCommandPaletteOpen(false);
    setQuery("");
    router.push(path);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredItems[selectedIndex].path);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsCommandPaletteOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 font-sans">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            onClick={() => setIsCommandPaletteOpen(false)}
            className="fixed inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-xs cursor-pointer"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -6 }}
            transition={{ duration: 0.12 }}
            className="relative bg-white dark:bg-[#111215] border border-slate-200 dark:border-white/[0.1] rounded-xl max-w-xl w-full shadow-2xl overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="px-3.5 py-3 border-b border-slate-200/80 dark:border-white/[0.07] flex items-center gap-2.5">
              <Search className="w-4 h-4 text-slate-400 dark:text-neutral-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or jump to screen, person, or action..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none"
              />
              <button
                onClick={() => setIsCommandPaletteOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-neutral-300 rounded cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Results List */}
            <div className="p-1.5 max-h-84 overflow-y-auto custom-scrollbar">
              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400 dark:text-neutral-500">
                  No matching workspace commands or records found.
                </div>
              ) : (
                <div className="space-y-0.5">
                  {filteredItems.map((item, idx) => {
                    const Icon = item.icon;
                    const isSelected = idx === selectedIndex;
                    return (
                      <button
                        key={`${item.section}-${item.title}`}
                        onClick={() => handleSelect(item.path)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-slate-100 dark:bg-white/[0.08] text-slate-950 dark:text-white font-medium"
                            : "text-slate-600 dark:text-neutral-400 hover:bg-slate-50 dark:hover:bg-white/[0.03]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-neutral-500"}`} />
                          <span className="truncate">{item.title}</span>
                        </div>
                        <span className="text-[10px] uppercase font-mono text-slate-400 dark:text-neutral-500 shrink-0 ml-2">
                          {item.section}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Keyboard Footer Hint */}
            <div className="px-3 py-2 border-t border-slate-200/80 dark:border-white/[0.07] bg-slate-50/60 dark:bg-white/[0.015] flex items-center justify-between text-[11px] text-slate-400 dark:text-neutral-500 font-mono">
              <div className="flex items-center gap-3">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span>esc close</span>
              </div>
              <span>Hope Foundation OS</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
