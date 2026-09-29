"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import { Member } from "@/lib/demoData";
import {
  Search,
  Download,
  UserPlus,
  X,
  Users,
  Filter,
  ArrowUpDown,
  Mail,
  MapPin,
  Shield,
  Briefcase,
  ExternalLink,
  ChevronRight,
  Check
} from "lucide-react";

export default function PeoplePage() {
  const { members } = useWorkspace();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [sortField, setSortField] = useState<"name" | "role" | "department">("name");
  const [sortAsc, setSortAsc] = useState(true);

  // Quick filter view
  const [savedView, setSavedView] = useState("All Personnel");

  const filteredMembers = useMemo(() => {
    return members
      .filter((m) => {
        const matchesSearch =
          m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.role.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDept = selectedDept === "All" || m.department === selectedDept;
        const matchesType = selectedType === "All" || m.type === selectedType;
        return matchesSearch && matchesDept && matchesType;
      })
      .sort((a, b) => {
        let valA = a[sortField].toLowerCase();
        let valB = b[sortField].toLowerCase();
        if (valA < valB) return sortAsc ? -1 : 1;
        if (valA > valB) return sortAsc ? 1 : -1;
        return 0;
      });
  }, [members, searchQuery, selectedDept, selectedType, sortField, sortAsc]);

  const handleSort = (field: "name" | "role" | "department") => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const totalPersonnel = members.length;
  const fteCount = members.filter((m) => m.type !== "Volunteer" && m.type !== "Contractor").length;
  const contractorCount = members.filter((m) => m.type === "Contractor" || m.type === "Volunteer").length;

  return (
    <div className="space-y-5 font-sans antialiased text-slate-900 dark:text-neutral-100">
      
      {/* 1. Page Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-white/[0.07]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-neutral-400 border border-slate-200/80 dark:border-white/[0.06]">
              Workforce Registry
            </span>
            <span className="text-xs text-slate-400 dark:text-neutral-500 font-mono">
              Hope Foundation Personnel
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            People & Teams Directory
          </h1>
          <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
            Centralized registry for staff, field directors, medical personnel, and RBAC delegations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => alert("CSV export generated for filtered records.")}
            className="h-8 px-3 rounded-lg bg-slate-100 hover:bg-slate-200/70 dark:bg-white/[0.05] dark:hover:bg-white/[0.08] border border-slate-200/80 dark:border-white/[0.07] text-xs font-medium text-slate-700 dark:text-neutral-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <Link
            href="/workspace/people/new"
            className="h-8 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-medium inline-flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add Personnel</span>
          </Link>
        </div>
      </div>

      {/* 2. Compact Numerical Ledger Ribbon (Numbers are the design) */}
      <div className="bg-white dark:bg-[#111215] border border-slate-200/90 dark:border-white/[0.07] rounded-xl overflow-hidden shadow-2xs">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-slate-100 dark:divide-white/[0.05] md:divide-x md:divide-slate-200/80 md:dark:divide-white/[0.07]">
          
          <div className="p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              Total Roster
            </div>
            <div className="text-2xl font-medium text-slate-950 dark:text-white tabular-nums mt-1">
              {totalPersonnel}
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              Verified active identities
            </div>
          </div>

          <div className="p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              Permanent Staff (FTE)
            </div>
            <div className="text-2xl font-medium text-slate-950 dark:text-white tabular-nums mt-1">
              {fteCount}
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              Salaried operations & leadership
            </div>
          </div>

          <div className="p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              Field Contractors
            </div>
            <div className="text-2xl font-medium text-slate-950 dark:text-white tabular-nums mt-1">
              {contractorCount}
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              Specialized mission deployees
            </div>
          </div>

          <div className="p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              Compliance Readiness
            </div>
            <div className="text-2xl font-medium text-slate-950 dark:text-white tabular-nums mt-1">
              100%
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              Security & background cleared
            </div>
          </div>

        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 dark:text-neutral-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by name, role, email, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-8 pl-9 pr-3 rounded-lg bg-white dark:bg-[#111215] border border-slate-200/80 dark:border-white/[0.08] text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="h-8 px-2.5 rounded-lg bg-white dark:bg-[#111215] border border-slate-200/80 dark:border-white/[0.08] text-xs text-slate-700 dark:text-neutral-300 focus:outline-none cursor-pointer"
          >
            <option value="All">All Departments</option>
            <option value="Executive & Governance">Executive & Governance</option>
            <option value="Operations & Field Services">Operations & Field Services</option>
            <option value="Finance & Compliance">Finance & Compliance</option>
            <option value="Programs & Outreach">Programs & Outreach</option>
            <option value="Technology & Systems">Technology & Systems</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="h-8 px-2.5 rounded-lg bg-white dark:bg-[#111215] border border-slate-200/80 dark:border-white/[0.08] text-xs text-slate-700 dark:text-neutral-300 focus:outline-none cursor-pointer"
          >
            <option value="All">All Classifications</option>
            <option value="Full-time">Full-time Staff</option>
            <option value="Volunteer">Volunteer</option>
            <option value="Contractor">Contractor</option>
          </select>
        </div>
      </div>

      {/* 4. Enterprise Personnel Table (The Star Component) */}
      <div className="bg-white dark:bg-[#111215] border border-slate-200/90 dark:border-white/[0.07] rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 dark:bg-white/[0.02] border-b border-slate-200/80 dark:border-white/[0.06] text-slate-400 dark:text-neutral-500 font-mono text-[10px] uppercase">
              <tr>
                <th className="py-2.5 px-4 cursor-pointer" onClick={() => handleSort("name")}>
                  <div className="flex items-center gap-1.5">
                    <span>Personnel</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-2.5 px-3 cursor-pointer" onClick={() => handleSort("role")}>
                  <div className="flex items-center gap-1.5">
                    <span>Role & Access</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-2.5 px-3 cursor-pointer" onClick={() => handleSort("department")}>
                  <div className="flex items-center gap-1.5">
                    <span>Department</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-2.5 px-3">Classification</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className="hover:bg-slate-50/70 dark:hover:bg-white/[0.02] transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-white/10 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-medium text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {member.name}
                        </div>
                        <div className="text-[11px] text-slate-400 dark:text-neutral-500 truncate">
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <span className="font-medium text-slate-800 dark:text-neutral-200">
                      {member.role}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-slate-600 dark:text-neutral-300">
                    <div>{member.department}</div>
                    <div className="text-[10px] text-slate-400 dark:text-neutral-500">{member.team}</div>
                  </td>

                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-neutral-400 border border-slate-200/60 dark:border-white/[0.04]">
                      {member.type}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-700 dark:text-neutral-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-neutral-500" />
                      {member.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedMember(member)}
                        className="px-2 py-1 rounded text-xs text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
                      >
                        Inspect
                      </button>
                      <Link
                        href={`/workspace/people/${member.id}`}
                        className="px-2 py-1 rounded text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition-colors"
                      >
                        Profile →
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Slide-Over Personnel Detail Drawer (Professional, Non-bloated) */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex justify-end font-sans">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              onClick={() => setSelectedMember(null)}
              className="fixed inset-0 bg-black/50 dark:bg-black/75 backdrop-blur-xs cursor-pointer"
            />

            {/* Drawer Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md bg-white dark:bg-[#111215] border-l border-slate-200 dark:border-white/[0.1] h-full p-6 overflow-y-auto space-y-5 text-xs shadow-2xl z-10"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.06]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
                  Personnel Record Dossier
                </span>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Profile Overview */}
              <div className="flex items-center gap-3">
                <img
                  src={selectedMember.avatar}
                  alt={selectedMember.name}
                  className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-white/10"
                />
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                    {selectedMember.name}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-neutral-400">
                    {selectedMember.role}
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
                    {selectedMember.email}
                  </div>
                </div>
              </div>

              {/* Operational Metadata Grid */}
              <div className="space-y-2 p-3.5 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/[0.05]">
                <div className="flex justify-between py-1 border-b border-slate-200/50 dark:border-white/[0.04]">
                  <span className="text-slate-400 dark:text-neutral-500">Department</span>
                  <span className="font-medium text-slate-900 dark:text-white">{selectedMember.department}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/50 dark:border-white/[0.04]">
                  <span className="text-slate-400 dark:text-neutral-500">Sub-Team</span>
                  <span className="font-medium text-slate-900 dark:text-white">{selectedMember.team}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/50 dark:border-white/[0.04]">
                  <span className="text-slate-400 dark:text-neutral-500">Classification</span>
                  <span className="font-mono text-slate-900 dark:text-white">{selectedMember.type}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/50 dark:border-white/[0.04]">
                  <span className="text-slate-400 dark:text-neutral-500">Assigned Projects</span>
                  <span className="font-mono text-slate-900 dark:text-white">{selectedMember.assignedProjects || 2} projects</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400 dark:text-neutral-500">Operational Status</span>
                  <span className="text-slate-900 dark:text-white">{selectedMember.status}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center gap-2">
                <Link
                  href={`/workspace/people/${selectedMember.id}`}
                  className="flex-1 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-center font-medium transition-colors"
                >
                  View Full Profile & History
                </Link>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedMember.email);
                    alert("Email copied to clipboard.");
                  }}
                  className="px-3 py-2 rounded-lg border border-slate-200 dark:border-white/[0.1] text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-colors cursor-pointer"
                >
                  Copy Email
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
