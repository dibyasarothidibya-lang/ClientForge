"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import { Candidate, JobPosting, JobStage } from "@/lib/peopleCoreData";
import ThreeDCard from "@/components/motion/ThreeDCard";
import {
  Briefcase,
  Users,
  Search,
  Filter,
  Plus,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  UserCheck,
  Star,
  FileText,
  Mail,
  Phone,
  MessageSquare,
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
  const [newJobDept, setNewJobDept] = useState("Engineering");
  const [newJobLocation, setNewJobLocation] = useState("San Francisco, CA / Remote");
  const [newJobSalary, setNewJobSalary] = useState("$160,000 – $185,000");
  const [newJobOpenings, setNewJobOpenings] = useState(1);
  const [newJobDesc, setNewJobDesc] = useState("");

  const stages: JobStage[] = [
    "Applied",
    "Screening",
    "Interview",
    "Technical Interview",
    "Offer",
    "Hired",
    "Rejected",
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
      hiringManager: "Dr. Sarah Lin",
      deadline: "2026-11-30",
      description: newJobDesc || "High-leverage engineering contribution to PeopleCore architecture.",
      requirements: ["5+ years relevant experience", "Proven enterprise track record"],
      benefits: ["Comprehensive health coverage", "Flexible remote work", "Learning stipend"],
    });
    setJobModalOpen(false);
    setNewJobTitle("");
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 block mb-1">
            Talent Acquisition & ATS
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-white tracking-tight">
            Recruitment & Applicant Pipeline
          </h1>
          <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
            Track candidates through multi-stage vetting, scheduling, candidate scorecards, and offer releases.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 dark:bg-white/[0.04] p-1 rounded-xl border border-slate-200 dark:border-white/[0.08] text-xs">
            <button
              onClick={() => setActiveTab("pipeline")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === "pipeline"
                  ? "bg-white dark:bg-white text-slate-950 dark:text-neutral-950 shadow-xs font-semibold"
                  : "text-slate-600 dark:text-neutral-400"
              }`}
            >
              Candidate Pipeline
            </button>
            <button
              onClick={() => setActiveTab("jobs")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === "jobs"
                  ? "bg-white dark:bg-white text-slate-950 dark:text-neutral-950 shadow-xs font-semibold"
                  : "text-slate-600 dark:text-neutral-400"
              }`}
            >
              Job Postings ({jobs.length})
            </button>
          </div>

          <button
            onClick={() => setJobModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-semibold flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Job</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ThreeDCard glareColor="#8b5cf6" maxTilt={6} elevationZ={10} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Open Roles</span>
              <span className="text-[10px] text-purple-600 font-semibold">Active</span>
            </div>
            <div className="text-2xl font-bold text-slate-950 dark:text-white tabular-nums">
              {jobs.filter((j) => j.status === "Open").length}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Across 4 departments</div>
          </div>
        </ThreeDCard>

        <ThreeDCard glareColor="#3b82f6" maxTilt={6} elevationZ={10} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Active Pipeline</span>
              <span className="text-[10px] text-blue-600 font-semibold">+8 this week</span>
            </div>
            <div className="text-2xl font-bold text-slate-950 dark:text-white tabular-nums">
              {candidates.length}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Screened & qualified</div>
          </div>
        </ThreeDCard>

        <ThreeDCard glareColor="#10b981" maxTilt={6} elevationZ={10} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Offers Extended</span>
              <span className="text-[10px] text-emerald-600 font-semibold">Pending response</span>
            </div>
            <div className="text-2xl font-bold text-slate-950 dark:text-white tabular-nums">
              {candidates.filter((c) => c.stage === "Offer").length}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">100% acceptance benchmark</div>
          </div>
        </ThreeDCard>

        <ThreeDCard glareColor="#f59e0b" maxTilt={6} elevationZ={10} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Time-to-Hire</span>
              <span className="text-[10px] text-amber-600 font-semibold">Velocity</span>
            </div>
            <div className="text-2xl font-bold text-slate-950 dark:text-white tabular-nums">
              21 Days
            </div>
            <div className="text-[10px] text-slate-400 mt-1">5 days faster than benchmark</div>
          </div>
        </ThreeDCard>
      </div>

      {/* MAIN CONTENT AREA */}
      {activeTab === "pipeline" ? (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search candidates by name, role, or technical skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-sans"
              />
            </div>
            <select
              value={selectedJobFilter}
              onChange={(e) => setSelectedJobFilter(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] rounded-xl text-xs text-slate-800 dark:text-white outline-none font-sans font-medium cursor-pointer"
            >
              <option value="All">All Job Positions</option>
              {jobs.map((j) => (
                <option key={j.id} value={j.title}>
                  {j.title}
                </option>
              ))}
            </select>
          </div>

          {/* KANBAN BOARD */}
          <div className="overflow-x-auto pb-4 custom-scrollbar">
            <div className="flex gap-4 min-w-[1300px]">
              {stages.map((stage) => {
                const stageCandidates = filteredCandidates.filter((c) => c.stage === stage);
                return (
                  <div
                    key={stage}
                    className="flex-1 bg-slate-100/70 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] rounded-2xl p-3 min-w-[220px]"
                  >
                    {/* Column Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/[0.06] mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-slate-900 dark:text-white">{stage}</span>
                        <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-white/10 text-[10px] font-bold flex items-center justify-center text-slate-700 dark:text-neutral-300">
                          {stageCandidates.length}
                        </span>
                      </div>
                    </div>

                    {/* Column Cards */}
                    <div className="space-y-3">
                      {stageCandidates.map((cand) => (
                        <motion.div
                          key={cand.id}
                          whileHover={{ scale: 1.02, y: -2 }}
                          onClick={() => setSelectedCandidate(cand)}
                          className="p-3.5 rounded-xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs cursor-pointer space-y-2.5 transition-all hover:border-purple-500/40"
                        >
                          <div className="flex items-center gap-2.5">
                            <img
                              src={cand.avatar}
                              alt={cand.name}
                              className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-white/10"
                            />
                            <div className="min-w-0 flex-1">
                              <div className="font-semibold text-xs text-slate-900 dark:text-white truncate">
                                {cand.name}
                              </div>
                              <div className="text-[10px] text-slate-500 dark:text-neutral-400 truncate">
                                {cand.role}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-neutral-400">
                            <span>{cand.experienceYears}y exp</span>
                            <span className="font-semibold text-slate-900 dark:text-neutral-200">{cand.expectedSalary}</span>
                          </div>

                          {cand.interviewStatus && (
                            <div className="p-1.5 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-800/40 text-[10px] text-indigo-700 dark:text-indigo-300 line-clamp-1">
                              {cand.interviewStatus}
                            </div>
                          )}

                          <div className="flex flex-wrap gap-1">
                            {cand.skills.slice(0, 2).map((s) => (
                              <span
                                key={s}
                                className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/[0.04] text-[9px] text-slate-600 dark:text-neutral-400"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ))}

                      {stageCandidates.length === 0 && (
                        <div className="py-8 text-center text-[11px] text-slate-400 dark:text-neutral-600 border border-dashed border-slate-200 dark:border-white/[0.06] rounded-xl">
                          No candidates in {stage}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* JOB POSTINGS VIEW */
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="rounded-3xl p-6 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {job.status}
                    </span>
                    <span className="text-[11px] text-slate-400">Deadline: {job.deadline}</span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-950 dark:text-white">{job.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <span>{job.department}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-neutral-400 mt-2.5 leading-relaxed line-clamp-2">
                    {job.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Salary Range</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{job.salaryRange}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px]">Candidates</span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">{job.applicantsCount} active</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CANDIDATE PROFILE MODAL / DRAWER */}
      <AnimatePresence>
        {selectedCandidate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCandidate(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white dark:bg-[#121215] border border-slate-200 dark:border-white/[0.12] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl z-10 space-y-5 max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedCandidate.avatar}
                    alt={selectedCandidate.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-500/40 shadow-md"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{selectedCandidate.name}</h3>
                    <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">{selectedCandidate.role}</div>
                    <div className="text-[11px] text-slate-500">{selectedCandidate.location} • {selectedCandidate.experienceYears}y exp</div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Summary */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] text-xs">
                <span className="text-[10px] font-semibold uppercase text-slate-400 block mb-1">Executive Summary</span>
                <p className="text-slate-700 dark:text-neutral-300 leading-relaxed">{selectedCandidate.summary}</p>
              </div>

              {/* Skills */}
              <div>
                <span className="text-xs font-semibold text-slate-900 dark:text-white block mb-2">Technical Skills</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCandidate.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stage Transition Control */}
              <div className="pt-3 border-t border-slate-100 dark:border-white/[0.06] space-y-2">
                <span className="text-xs font-semibold text-slate-900 dark:text-white block">Promote Stage</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {stages.map((st) => (
                    <button
                      key={st}
                      onClick={() => {
                        updateCandidateStage(selectedCandidate.id, st);
                        setSelectedCandidate({ ...selectedCandidate, stage: st });
                      }}
                      className={`px-2 py-1.5 rounded-lg text-[11px] font-medium transition-colors cursor-pointer text-center ${
                        selectedCandidate.stage === st
                          ? "bg-purple-600 text-white font-semibold"
                          : "bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-neutral-300 hover:bg-slate-200"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  onClick={() => alert(`Interview scheduled with ${selectedCandidate.name}. Calendar invite sent.`)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-semibold text-xs cursor-pointer shadow-md"
                >
                  Schedule Interview
                </button>
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-medium cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CREATE JOB POSTING MODAL */}
      <AnimatePresence>
        {jobModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setJobModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white dark:bg-[#121215] border border-slate-200 dark:border-white/[0.12] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 space-y-4"
            >
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Create New Job Posting</h3>
              <form onSubmit={handleCreateJob} className="space-y-4 text-xs font-sans">
                <div>
                  <label className="text-slate-500 block mb-1 font-medium">Job Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lead Security Architect"
                    value={newJobTitle}
                    onChange={(e) => setNewJobTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-500 block mb-1 font-medium">Department</label>
                    <select
                      value={newJobDept}
                      onChange={(e) => setNewJobDept(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] outline-none"
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Product">Product</option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Finance">Finance</option>
                      <option value="Security">Security</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-500 block mb-1 font-medium">Location</label>
                    <input
                      type="text"
                      value={newJobLocation}
                      onChange={(e) => setNewJobLocation(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-slate-500 block mb-1 font-medium">Salary Range</label>
                  <input
                    type="text"
                    value={newJobSalary}
                    onChange={(e) => setNewJobSalary(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-500 block mb-1 font-medium">Job Summary</label>
                  <textarea
                    rows={3}
                    placeholder="Brief description of responsibilities and scope..."
                    value={newJobDesc}
                    onChange={(e) => setNewJobDesc(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-semibold text-xs cursor-pointer shadow-md"
                  >
                    Publish Job Posting
                  </button>
                  <button
                    type="button"
                    onClick={() => setJobModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
