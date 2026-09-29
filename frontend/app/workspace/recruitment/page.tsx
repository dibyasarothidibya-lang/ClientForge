"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import { Candidate, JobPosting, JobStage } from "@/lib/peopleCoreData";
import {
  Briefcase,
  Users,
  Search,
  Plus,
  MapPin,
  Calendar,
  Check,
  ChevronRight,
  UserCheck,
  Star,
  FileText,
  Mail,
  Phone,
  ArrowRight,
  X
} from "lucide-react";

export default function RecruitmentPage() {
  const { candidates, jobs, addCandidate, updateCandidateStage, addJob } = useWorkspace();

  const [activeTab, setActiveTab] = useState<"pipeline" | "jobs">("pipeline");
  const [selectedJobFilter, setSelectedJobFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  // Job creation modal state
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newJobDept, setNewJobDept] = useState("Global Operations & Field");
  const [newJobLocation, setNewJobLocation] = useState("Geneva / Remote");
  const [newJobSalary, setNewJobSalary] = useState("$140,000 – $165,000");
  const [newJobOpenings, setNewJobOpenings] = useState(1);
  const [newJobDesc, setNewJobDesc] = useState("");

  const stages: JobStage[] = [
    "Applied",
    "Screening",
    "Interview",
    "Technical Interview",
    "Offer",
    "Hired",
  ];

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesJob = selectedJobFilter === "All" || c.role === selectedJobFilter;
    return matchesSearch && matchesJob;
  });

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobTitle) return;
    addJob({
      title: newJobTitle,
      department: newJobDept,
      location: newJobLocation,
      type: "Full-Time",
      status: "Open",
      openings: newJobOpenings,
      salaryRange: newJobSalary,
      hiringManager: "Amina Al-Mansoor",
      deadline: "2026-11-30",
      description: newJobDesc || "Mission-critical contribution to Hope Foundation global operations.",
      requirements: ["5+ years relevant experience", "Field deployment familiarity"],
      benefits: ["Comprehensive global medical coverage", "Hazardous duty allowance"],
    });
    setJobModalOpen(false);
    setNewJobTitle("");
  };

  const openRolesCount = jobs.filter((j) => j.status === "Open").length;
  const activePipelineCount = candidates.length;
  const offersCount = candidates.filter((c) => c.stage === "Offer").length;

  return (
    <div className="space-y-5 font-sans antialiased text-slate-900 dark:text-neutral-100">
      
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-white/[0.07]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-neutral-400 border border-slate-200/80 dark:border-white/[0.06]">
              Talent Acquisition
            </span>
            <span className="text-xs text-slate-400 dark:text-neutral-500 font-mono">
              ATS Pipeline & Stage-Gate Ledger
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Recruitment & Candidate Pipeline
          </h1>
          <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
            Applicant tracking, panel scorecards, background compliance, and international requisitions.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex p-0.5 rounded-lg bg-slate-100 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/[0.07] text-xs">
            <button
              onClick={() => setActiveTab("pipeline")}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                activeTab === "pipeline"
                  ? "bg-white dark:bg-white/[0.12] text-slate-950 dark:text-white font-medium shadow-2xs"
                  : "text-slate-500 dark:text-neutral-400"
              }`}
            >
              Candidate Pipeline
            </button>
            <button
              onClick={() => setActiveTab("jobs")}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                activeTab === "jobs"
                  ? "bg-white dark:bg-white/[0.12] text-slate-950 dark:text-white font-medium shadow-2xs"
                  : "text-slate-500 dark:text-neutral-400"
              }`}
            >
              Job Requisitions ({jobs.length})
            </button>
          </div>

          <button
            onClick={() => setJobModalOpen(true)}
            className="h-8 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-medium inline-flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Requisition</span>
          </button>
        </div>
      </div>

      {/* 2. Recruitment KPI Ribbon */}
      <div className="bg-white dark:bg-[#111215] border border-slate-200/90 dark:border-white/[0.07] rounded-xl overflow-hidden shadow-2xs">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-slate-100 dark:divide-white/[0.05] md:divide-x md:divide-slate-200/80 md:dark:divide-white/[0.07]">
          
          <div className="p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              Open Requisitions
            </div>
            <div className="text-2xl font-medium text-slate-950 dark:text-white tabular-nums mt-1">
              {openRolesCount}
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              Across 4 mission stations
            </div>
          </div>

          <div className="p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              Active Candidate Pool
            </div>
            <div className="text-2xl font-medium text-slate-950 dark:text-white tabular-nums mt-1">
              {activePipelineCount}
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              Screened & score-carded
            </div>
          </div>

          <div className="p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              Offers Extended
            </div>
            <div className="text-2xl font-medium text-slate-950 dark:text-white tabular-nums mt-1">
              {offersCount}
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              Pending final signature
            </div>
          </div>

          <div className="p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              Avg Fill Latency
            </div>
            <div className="text-2xl font-medium text-slate-950 dark:text-white tabular-nums mt-1">
              18 Days
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              5 days faster than target
            </div>
          </div>

        </div>
      </div>

      {/* 3. Search & Position Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 dark:text-neutral-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search candidates by name, role, or technical skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-8 pl-9 pr-3 rounded-lg bg-white dark:bg-[#111215] border border-slate-200/80 dark:border-white/[0.08] text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <select
          value={selectedJobFilter}
          onChange={(e) => setSelectedJobFilter(e.target.value)}
          className="h-8 px-2.5 rounded-lg bg-white dark:bg-[#111215] border border-slate-200/80 dark:border-white/[0.08] text-xs text-slate-700 dark:text-neutral-300 focus:outline-none cursor-pointer"
        >
          <option value="All">All Job Requisitions</option>
          {jobs.map((j) => (
            <option key={j.id} value={j.title}>
              {j.title}
            </option>
          ))}
        </select>
      </div>

      {/* 4. Tab Views: Pipeline Board vs Job Requisitions */}
      {activeTab === "pipeline" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3 select-none">
          {stages.map((stage) => {
            const stageCandidates = filteredCandidates.filter((c) => c.stage === stage);
            return (
              <div
                key={stage}
                className="bg-white dark:bg-[#111215] border border-slate-200/80 dark:border-white/[0.06] rounded-xl p-3 flex flex-col justify-between min-h-[360px]"
              >
                <div>
                  {/* Stage Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/[0.05] mb-2.5">
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">
                      {stage}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-neutral-400">
                      {stageCandidates.length}
                    </span>
                  </div>

                  {/* Stage Candidate Cards */}
                  <div className="space-y-2">
                    {stageCandidates.map((cand) => (
                      <div
                        key={cand.id}
                        onClick={() => setSelectedCandidate(cand)}
                        className="p-2.5 rounded-lg border border-slate-200/70 dark:border-white/[0.05] bg-slate-50/50 dark:bg-white/[0.015] hover:border-slate-300 dark:hover:border-white/10 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-slate-900 dark:text-white text-xs truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {cand.name}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            ★ {cand.rating}
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-500 dark:text-neutral-400 mt-0.5 truncate">
                          {cand.role}
                        </div>

                        <div className="flex flex-wrap gap-1 mt-2">
                          {cand.skills.slice(0, 2).map((s) => (
                            <span
                              key={s}
                              className="text-[9px] px-1.5 py-0.2 rounded bg-white dark:bg-white/[0.06] border border-slate-200/60 dark:border-white/[0.06] text-slate-500 dark:text-neutral-400"
                            >
                              {s}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-100 dark:border-white/[0.04] text-[10px] text-slate-400">
                          <span>{cand.experienceYears} yrs exp</span>
                          <span className="font-mono">{cand.location.split("/")[0]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Job Requisitions Table */
        <div className="bg-white dark:bg-[#111215] border border-slate-200/90 dark:border-white/[0.07] rounded-xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 dark:bg-white/[0.02] border-b border-slate-200/80 dark:border-white/[0.06] text-slate-400 dark:text-neutral-500 font-mono text-[10px] uppercase">
                <tr>
                  <th className="py-2.5 px-4">Position Title</th>
                  <th className="py-2.5 px-3">Department</th>
                  <th className="py-2.5 px-3">Duty Station</th>
                  <th className="py-2.5 px-3">Compensation Range</th>
                  <th className="py-2.5 px-3">Openings</th>
                  <th className="py-2.5 px-3">Pipeline</th>
                  <th className="py-2.5 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50/70 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                      {job.title}
                    </td>
                    <td className="py-3 px-3 text-slate-500 dark:text-neutral-400">
                      {job.department}
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-neutral-300">
                      {job.location}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-700 dark:text-neutral-300">
                      {job.salaryRange}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-900 dark:text-white">
                      {job.openings}
                    </td>
                    <td className="py-3 px-3 font-mono text-indigo-600 dark:text-indigo-400">
                      {candidates.filter((c) => c.role === job.title).length} candidates
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-800 dark:text-neutral-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-neutral-500" />
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. Candidate Scorecard Inspection Drawer */}
      <AnimatePresence>
        {selectedCandidate && (
          <div className="fixed inset-0 z-50 flex justify-end font-sans">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              onClick={() => setSelectedCandidate(null)}
              className="fixed inset-0 bg-black/50 dark:bg-black/75 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md bg-white dark:bg-[#111215] border-l border-slate-200 dark:border-white/[0.1] h-full p-6 overflow-y-auto space-y-5 text-xs shadow-2xl z-10"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.06]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
                  Candidate Scorecard
                </span>
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  {selectedCandidate.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-neutral-400">
                  {selectedCandidate.role}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 font-mono">
                  {selectedCandidate.location} · {selectedCandidate.experienceYears} yrs experience
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Stage</span>
                  <span className="font-mono font-medium text-slate-900 dark:text-white">{selectedCandidate.stage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Panel Score</span>
                  <span className="font-mono text-slate-900 dark:text-white">★ {selectedCandidate.rating} / 5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Expected Compensation</span>
                  <span className="font-mono text-slate-900 dark:text-white">{selectedCandidate.expectedSalary}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="text-slate-500 font-medium">Vetted Skills:</div>
                <div className="flex flex-wrap gap-1">
                  {selectedCandidate.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.06] border border-slate-200/70 dark:border-white/[0.08] text-slate-700 dark:text-neutral-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center gap-2">
                <select
                  value={selectedCandidate.stage}
                  onChange={(e) => {
                    updateCandidateStage(selectedCandidate.id, e.target.value as any);
                    setSelectedCandidate({ ...selectedCandidate, stage: e.target.value as any });
                  }}
                  className="flex-1 h-8 px-2 rounded-lg bg-white dark:bg-[#111215] border border-slate-200 dark:border-white/[0.1] text-xs font-medium cursor-pointer"
                >
                  {stages.map((st) => (
                    <option key={st} value={st}>
                      Move to {st}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    alert(`Debrief notes submitted for ${selectedCandidate.name}.`);
                    setSelectedCandidate(null);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-medium cursor-pointer"
                >
                  Save Notes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. Create Job Modal */}
      <AnimatePresence>
        {jobModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              onClick={() => setJobModalOpen(false)}
              className="fixed inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-xs cursor-pointer"
            />
            <motion.form
              onSubmit={handleCreateJob}
              initial={{ opacity: 0, scale: 0.98, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -6 }}
              transition={{ duration: 0.12 }}
              className="relative bg-white dark:bg-[#111215] border border-slate-200 dark:border-white/[0.1] rounded-xl max-w-lg w-full p-6 shadow-2xl z-10 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.06]">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Create Requisition
                </h3>
                <button
                  type="button"
                  onClick={() => setJobModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-500 mb-1 font-medium">Position Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Humanitarian Water Logistician"
                    value={newJobTitle}
                    onChange={(e) => setNewJobTitle(e.target.value)}
                    className="w-full h-8 px-2.5 rounded-lg bg-white dark:bg-[#111215] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-500 mb-1 font-medium">Department</label>
                    <select
                      value={newJobDept}
                      onChange={(e) => setNewJobDept(e.target.value)}
                      className="w-full h-8 px-2 rounded-lg bg-white dark:bg-[#111215] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
                    >
                      <option value="Global Operations & Field">Global Operations</option>
                      <option value="Medical & Humanitarian Aid">Medical & Humanitarian Aid</option>
                      <option value="Technology & Systems">Technology & Systems</option>
                      <option value="Finance & Grants">Finance & Grants</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1 font-medium">Duty Station</label>
                    <input
                      type="text"
                      value={newJobLocation}
                      onChange={(e) => setNewJobLocation(e.target.value)}
                      className="w-full h-8 px-2.5 rounded-lg bg-white dark:bg-[#111215] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-500 mb-1 font-medium">Compensation Range</label>
                    <input
                      type="text"
                      value={newJobSalary}
                      onChange={(e) => setNewJobSalary(e.target.value)}
                      className="w-full h-8 px-2.5 rounded-lg bg-white dark:bg-[#111215] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1 font-medium">Openings Count</label>
                    <input
                      type="number"
                      min={1}
                      value={newJobOpenings}
                      onChange={(e) => setNewJobOpenings(parseInt(e.target.value) || 1)}
                      className="w-full h-8 px-2.5 rounded-lg bg-white dark:bg-[#111215] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-white/[0.06] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setJobModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-medium cursor-pointer"
                >
                  Publish Requisition
                </button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
