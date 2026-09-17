"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWorkspace } from "@/context/WorkspaceContext";
import {
  Search,
  LayoutDashboard,
  Users,
  FolderKanban,
  ShieldAlert,
  CreditCard,
  FileText,
  Settings,
  ArrowRight,
  X
} from "lucide-react";

export default function CommandPalette() {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen, projects, members, audits } = useWorkspace();
  const [query, setQuery] = useState("");
  const router = useRouter();

  if (!isCommandPaletteOpen) return null;

  const quickNav = [
    { title: "Executive Dashboard", path: "/workspace", icon: LayoutDashboard },
    { title: "People & Directory", path: "/workspace/people", icon: Users },
    { title: "Projects & Tasks (Kanban)", path: "/workspace/projects", icon: FolderKanban },
    { title: "Internal Audits & Risk Matrix", path: "/workspace/audits", icon: ShieldAlert },
    { title: "Donations & Finance", path: "/workspace/finance", icon: CreditCard },
    { title: "Documents & Versions", path: "/workspace/documents", icon: FileText },
    { title: "Developer Center (APIs & Webhooks)", path: "/workspace/developer", icon: Settings },
  ];

  const filteredNav = quickNav.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    setIsCommandPaletteOpen(false);
    router.push(path);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/75 backdrop-blur-sm flex items-start justify-center pt-24 p-4">
      <div className="bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.14] rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
        {/* Input Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-white/[0.08] flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 dark:text-neutral-400" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or search people, projects, audits..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none font-sans"
          />
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            className="p-1 text-slate-400 dark:text-neutral-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-80 overflow-y-auto space-y-4 text-xs font-sans">
          {/* Navigation */}
          <div>
            <div className="px-3 py-1 text-[10px] font-mono text-slate-400 dark:text-neutral-500 uppercase tracking-widest">
              Navigation
            </div>
            <div className="space-y-1 mt-1">
              {filteredNav.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.path}
                    onClick={() => handleSelect(item.path)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-700 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span className="font-medium">{item.title}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-neutral-500" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Projects */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[10px] font-mono text-slate-400 dark:text-neutral-500 uppercase tracking-widest">
                Projects
              </div>
              <div className="space-y-1 mt-1">
                {filteredProjects.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelect("/workspace/projects")}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-700 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">{p.name}</div>
                      <div className="text-[11px] text-slate-500 dark:text-neutral-500">{p.code} • {p.department}</div>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">{p.progress}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Keyboard Footer */}
        <div className="p-3 border-t border-slate-100 dark:border-white/[0.06] bg-slate-50/70 dark:bg-white/[0.01] flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-neutral-500 px-4">
          <span>Use arrows to navigate</span>
          <span>Esc to close</span>
        </div>
      </div>
    </div>
  );
}
