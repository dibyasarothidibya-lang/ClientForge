"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import { Member } from "@/lib/demoData";
import ThreeDCard from "@/components/motion/ThreeDCard";
import {
  Search,
  Download,
  UserPlus,
  X,
  Users,
  HeartHandshake,
  FolderKanban,
  ShieldCheck,
} from "lucide-react";

export default function PeoplePage() {
  const { members } = useWorkspace();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // Saved views
  const [savedView, setSavedView] = useState("All Members");

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === "All" || m.department === selectedDept;
    const matchesType = selectedType === "All" || m.type === selectedType;
    return matchesSearch && matchesDept && matchesType;
  });

  const totalVolunteers = members.filter((m) => m.type === "Volunteer").length;
  const totalCommitments = members.reduce((sum, m) => sum + (m.assignedProjects || 0), 0);

  const kpis = [
    {
      title: "Registered Personnel",
      value: members.length.toString(),
      subtext: "Verified identities & roles",
      icon: Users,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-500/10",
      glare: "#6366f1",
      badge: "+2 this month",
    },
    {
      title: "Active Volunteers",
      value: totalVolunteers.toString(),
      subtext: "Field & outreach workers",
      icon: HeartHandshake,
      color: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-500/10",
      glare: "#0ea5e9",
      badge: "100% active",
    },
    {
      title: "Project Assignments",
      value: totalCommitments.toString(),
      subtext: "Active workload allocations",
      icon: FolderKanban,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10",
      glare: "#3b82f6",
      badge: "Balanced load",
    },
    {
      title: "Compliance Readiness",
      value: "100%",
      subtext: "Background checks cleared",
      icon: ShieldCheck,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10",
      glare: "#f59e0b",
      badge: "SOC-2 Certified",
    },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-sans font-semibold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 block mb-1">
            Workforce & Volunteers
          </span>
          <h1 className="text-2xl sm:text-3xl font-sans font-semibold text-slate-950 dark:text-[#f5f5f3] tracking-tight">
            People & Teams Directory
          </h1>
          <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
            Centralized registry for staff, volunteers, contract specialists, and RBAC delegations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => alert("CSV exported successfully for all visible records.")}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] hover:bg-slate-200/70 dark:hover:bg-white/[0.08] text-xs font-sans font-medium text-slate-700 dark:text-neutral-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </motion.button>
          <Link
            href="/workspace/people/new"
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-[#f5f5f3] hover:bg-slate-800 dark:hover:bg-white text-white dark:text-neutral-950 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add Employee</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <ThreeDCard key={idx} glareColor={kpi.glare} maxTilt={6} elevationZ={12} className="h-full">
              <div className="p-5 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] flex flex-col justify-between h-full shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[11px] font-sans font-semibold text-slate-500 dark:text-neutral-400 uppercase tracking-wider">
                    {kpi.title}
                  </div>
                  <div className={`p-2 rounded-xl ${kpi.bg} ${kpi.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <div className="font-sans text-3xl sm:text-4xl lg:text-5xl font-normal sm:font-medium tracking-tight text-slate-950 dark:text-white tabular-nums my-1.5">
                    {kpi.value}
                  </div>
                </div>
              </div>
            </ThreeDCard>
          );
        })}
      </div>

      {/* Saved Views Bar with Spring Animated Sliding Pill */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/[0.08] pb-3 text-xs font-sans font-medium">
        <span className="text-slate-400 dark:text-neutral-500 mr-2 text-[11px]">Saved Views:</span>
        <div className="flex flex-wrap gap-1.5">
          {["All Members", "Active Volunteers", "Leadership & Exec", "Compliance & Audit"].map((view) => {
            const isSelected = savedView === view;
            return (
              <motion.button
                key={view}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setSavedView(view);
                  if (view === "Active Volunteers") setSelectedType("Volunteer");
                  else if (view === "Compliance & Audit") setSelectedDept("Finance & Compliance");
                  else {
                    setSelectedDept("All");
                    setSelectedType("All");
                  }
                }}
                className={`relative px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer text-xs font-medium ${
                  isSelected
                    ? "text-slate-950 dark:text-white"
                    : "text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="peopleSavedViewIndicator"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-xl bg-slate-200/80 dark:bg-white/10 border border-slate-300 dark:border-white/10 shadow-xs z-0"
                  />
                )}
                <span className="relative z-10">{view}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Advanced Data-Grid Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 dark:text-neutral-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by name, email, role, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-indigo-500 font-sans shadow-xs"
          />
        </div>

        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="px-3 py-2.5 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none font-sans font-medium shadow-xs cursor-pointer"
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
          className="px-3 py-2.5 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none font-sans font-medium shadow-xs cursor-pointer"
        >
          <option value="All">All Classifications</option>
          <option value="Full-time">Full-time Staff</option>
          <option value="Volunteer">Volunteer</option>
          <option value="Contractor">Contractor</option>
        </select>
      </div>

      {/* ADVANCED DATA-GRID TABLE */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0c0c0e] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 dark:border-white/[0.08] bg-slate-50/70 dark:bg-white/[0.02] text-slate-500 dark:text-neutral-400 font-sans font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4 whitespace-nowrap">Member</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Role & Access</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Department / Team</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Classification</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Status</th>
                <th className="py-3.5 px-4 text-right whitespace-nowrap min-w-[200px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04] text-slate-700 dark:text-neutral-300">
              {filteredMembers.map((member) => (
                <motion.tr
                  key={member.id}
                  whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.03)" }}
                  className="transition-colors group"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-white/10"
                      />
                      <div>
                        <div className="font-sans font-medium text-slate-900 dark:text-white">{member.name}</div>
                        <div className="text-[11px] text-slate-500 dark:text-neutral-500 font-sans">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-sans">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 dark:border-indigo-500/30 text-[11px] font-medium whitespace-nowrap">
                      {member.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-slate-900 dark:text-white font-sans font-medium">{member.department}</div>
                    <div className="text-[11px] text-slate-500 dark:text-neutral-500 font-sans">{member.team}</div>
                  </td>
                  <td className="py-3.5 px-4 font-sans text-xs whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-lg font-sans font-medium whitespace-nowrap inline-block ${
                        member.type === "Volunteer"
                          ? "bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20"
                          : "text-slate-600 dark:text-neutral-400 bg-slate-100 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/5"
                      }`}
                    >
                      {member.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-sans font-medium whitespace-nowrap bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-neutral-300 border border-slate-200/80 dark:border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                      {member.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2.5 shrink-0">
                      <Link
                        href={`/workspace/people/${member.id}`}
                        className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-sans font-medium transition-colors border border-indigo-200 dark:border-indigo-800/80 whitespace-nowrap select-none shrink-0"
                      >
                        Full Profile
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedMember(member)}
                        className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200/80 dark:hover:bg-white/[0.1] text-slate-800 dark:text-neutral-200 text-xs font-sans font-medium transition-colors cursor-pointer border border-slate-200/80 dark:border-white/10 whitespace-nowrap select-none shrink-0"
                      >
                        Preview
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MEMBER PROFILE DRAWER MODAL WITH ANIMATEPRESENCE */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-xs cursor-pointer"
            />

            {/* Sliding Drawer */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 440, damping: 36 }}
              className="relative w-full max-w-md bg-white dark:bg-[#101014] border-l border-slate-200 dark:border-white/[0.1] h-full p-6 sm:p-8 overflow-y-auto space-y-6 text-xs font-sans shadow-2xl z-10"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/[0.08]">
                <span className="font-sans font-semibold text-xs text-slate-500 dark:text-neutral-400 uppercase tracking-wider">
                  Profile Dossier
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedMember(null)}
                  className="p-1.5 rounded-lg text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={selectedMember.avatar}
                  alt={selectedMember.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500/40 shadow-md"
                />
                <div>
                  <h3 className="text-xl font-sans font-semibold text-slate-950 dark:text-white tracking-tight">{selectedMember.name}</h3>
                  <div className="text-indigo-600 dark:text-indigo-400 font-sans text-xs mt-0.5">{selectedMember.role} • {selectedMember.type}</div>
                  <div className="text-slate-500 dark:text-neutral-500 text-[11px] font-sans mt-0.5">{selectedMember.email}</div>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.04]">
                  <div className="text-[10px] font-sans font-medium text-slate-500 dark:text-neutral-500 uppercase">Department & Team</div>
                  <div className="text-sm text-slate-900 dark:text-white font-medium mt-0.5">{selectedMember.department}</div>
                  <div className="text-xs text-slate-600 dark:text-neutral-400">{selectedMember.team}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.04]">
                  <div className="text-[10px] font-sans font-medium text-slate-500 dark:text-neutral-500 uppercase mb-2">Verified Skills & Certifications</div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedMember.skills.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 rounded-lg bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06] text-slate-700 dark:text-neutral-300 text-[11px] font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.04]">
                  <div className="text-[10px] font-sans font-medium text-slate-500 dark:text-neutral-500 uppercase">Tenure & Project Load</div>
                  <div className="text-xs text-slate-700 dark:text-neutral-300 mt-1">Joined: {selectedMember.joinDate}</div>
                  <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">{selectedMember.assignedProjects} active project commitments</div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-white/[0.08] flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => alert(`Assigned new project to ${selectedMember.name}`)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-semibold text-xs text-center cursor-pointer shadow-md"
                >
                  Assign Initiative
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedMember(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
