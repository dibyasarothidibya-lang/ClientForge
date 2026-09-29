"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import { PerformanceGoal, PerformanceReviewCycle } from "@/lib/peopleCoreData";
import ThreeDCard from "@/components/motion/ThreeDCard";
import {
  Award,
  Sparkles,
  Target,
  Users,
  Plus,
  CheckCircle2,
  Clock,
  MessageSquare,
  TrendingUp,
  ChevronRight,
  X
} from "lucide-react";

export default function PerformancePage() {
  const { goals, reviewCycles, addGoal, updateGoalProgress, members } = useWorkspace();

  const [activeCycle, setActiveCycle] = useState("Q3 2026");
  const [selectedGoal, setSelectedGoal] = useState<PerformanceGoal | null>(null);

  // New goal modal
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<PerformanceGoal["category"]>("OKRs");
  const [targetDate, setTargetDate] = useState("2026-11-30");

  const completedGoals = goals.filter((g) => g.status === "Completed").length;
  const onTrackGoals = goals.filter((g) => g.status === "On Track").length;
  const atRiskGoals = goals.filter((g) => g.status === "At Risk" || g.status === "Behind").length;

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    addGoal({
      employeeId: "usr_curr",
      employeeName: "Dr. Sarah Lin",
      employeeAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80",
      department: "Executive & Governance",
      title: newTitle,
      category: newCategory,
      progress: 10,
      targetDate,
      status: "On Track",
      cycle: "Q3 2026",
      managerFeedback: "Goal aligned with executive OKRs.",
    });
    setGoalModalOpen(false);
    setNewTitle("");
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 block mb-1">
            Talent Growth & Alignment
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-white tracking-tight">
            Performance, OKRs & Reviews
          </h1>
          <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
            Quarterly 360 review cycles, key performance results, manager calibrations, and employee self-evaluations.
          </p>
        </div>

        <button
          onClick={() => setGoalModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-semibold flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New OKR / Goal</span>
        </button>
      </div>

      {/* 4 Performance KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <ThreeDCard glareColor="#8b5cf6" maxTilt={6} elevationZ={10} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Active Cycle</span>
              <span className="text-[10px] text-purple-600 font-semibold">In Progress</span>
            </div>
            <div className="text-2xl font-bold text-slate-950 dark:text-white">Q3 2026</div>
            <div className="text-[10px] text-slate-400 mt-1">88% peer submission rate</div>
          </div>
        </ThreeDCard>

        <ThreeDCard glareColor="#10b981" maxTilt={6} elevationZ={10} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>On-Track Goals</span>
              <span className="text-[10px] text-emerald-600 font-semibold">High Velocity</span>
            </div>
            <div className="text-2xl font-bold text-slate-950 dark:text-white tabular-nums">{onTrackGoals}</div>
            <div className="text-[10px] text-slate-400 mt-1">Pacing toward Q3 deliverables</div>
          </div>
        </ThreeDCard>

        <ThreeDCard glareColor="#f59e0b" maxTilt={6} elevationZ={10} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Needs Support</span>
              <span className="text-[10px] text-amber-600 font-semibold">Action Needed</span>
            </div>
            <div className="text-2xl font-bold text-slate-950 dark:text-white tabular-nums">{atRiskGoals}</div>
            <div className="text-[10px] text-slate-400 mt-1">Manager 1-on-1 recommended</div>
          </div>
        </ThreeDCard>

        <ThreeDCard glareColor="#3b82f6" maxTilt={6} elevationZ={10} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Completed Deliverables</span>
              <span className="text-[10px] text-blue-600 font-semibold">Exemplary</span>
            </div>
            <div className="text-2xl font-bold text-slate-950 dark:text-white tabular-nums">{completedGoals}</div>
            <div className="text-[10px] text-slate-400 mt-1">Verified against key metrics</div>
          </div>
        </ThreeDCard>
      </div>

      {/* REVIEW CYCLES & GOALS GRID */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Active Performance Review Cycles */}
        <div className="lg:col-span-5 rounded-3xl p-6 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-950 dark:text-white">Active Review Cycles</h3>
            <span className="text-xs text-purple-600 font-medium">360 Feedback</span>
          </div>

          <div className="space-y-3">
            {reviewCycles.map((cycle) => (
              <div
                key={cycle.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900 dark:text-white">{cycle.name}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    {cycle.status}
                  </span>
                </div>
                <div className="text-slate-500 text-[11px]">{cycle.period} • Deadline: {cycle.deadline}</div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-neutral-800 rounded-full overflow-hidden mt-1">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${cycle.completionRate}%` }} />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 pt-0.5">
                  <span>{cycle.participantsCount} participants</span>
                  <span>{cycle.completionRate}% completed</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Individual OKRs & Goals List */}
        <div className="lg:col-span-7 rounded-3xl p-6 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-950 dark:text-white">Active Team Key Results & Goals</h3>
            <span className="text-xs text-slate-400">Pacing Tracker</span>
          </div>

          <div className="space-y-3.5">
            {goals.map((goal) => (
              <div
                key={goal.id}
                onClick={() => setSelectedGoal(goal)}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] hover:border-purple-500/40 transition-colors cursor-pointer space-y-2.5 text-xs"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={goal.employeeAvatar}
                      alt={goal.employeeName}
                      className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-white/10 shrink-0"
                    />
                    <div className="truncate">
                      <span className="font-semibold text-slate-900 dark:text-white block truncate">{goal.title}</span>
                      <span className="text-[11px] text-slate-500">{goal.employeeName} • {goal.category}</span>
                    </div>
                  </div>
                  <span className="font-bold text-slate-950 dark:text-white tabular-nums text-sm shrink-0">
                    {goal.progress}%
                  </span>
                </div>

                <div className="w-full h-1.5 bg-slate-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      goal.progress >= 100
                        ? "bg-emerald-500"
                        : goal.status === "At Risk"
                        ? "bg-amber-500"
                        : "bg-indigo-600"
                    }`}
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Target Due: {goal.targetDate}</span>
                  <span className="italic truncate max-w-xs">{goal.managerFeedback}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GOAL PROGRESS SLIDER & FEEDBACK MODAL */}
      <AnimatePresence>
        {selectedGoal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGoal(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white dark:bg-[#121215] border border-slate-200 dark:border-white/[0.12] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 space-y-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Goal Progress Calibration</h3>
                  <div className="text-xs text-slate-500">{selectedGoal.employeeName} • {selectedGoal.category}</div>
                </div>
                <button
                  onClick={() => setSelectedGoal(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] text-xs">
                <span className="font-semibold text-slate-900 dark:text-white">{selectedGoal.title}</span>
                <p className="text-[11px] text-slate-500 mt-1">Due {selectedGoal.targetDate} for {selectedGoal.cycle}</p>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-900 dark:text-white block mb-2">
                  Update Completion Progress: {selectedGoal.progress}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={selectedGoal.progress}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    updateGoalProgress(selectedGoal.id, val);
                    setSelectedGoal({ ...selectedGoal, progress: val });
                  }}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 text-xs">
                <span className="text-[10px] uppercase font-semibold text-purple-700 dark:text-purple-300 block mb-1">
                  Manager Calibration Note
                </span>
                <p className="text-slate-700 dark:text-neutral-300">{selectedGoal.managerFeedback}</p>
              </div>

              <button
                onClick={() => setSelectedGoal(null)}
                className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-neutral-950 font-semibold text-xs cursor-pointer shadow-md"
              >
                Save & Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CREATE GOAL MODAL */}
      <AnimatePresence>
        {goalModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setGoalModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white dark:bg-[#121215] border border-slate-200 dark:border-white/[0.12] rounded-3xl max-w-md w-full p-6 shadow-2xl z-10 space-y-4"
            >
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Create Performance Goal</h3>
              <form onSubmit={handleCreateGoal} className="space-y-4 text-xs font-sans">
                <div>
                  <label className="text-slate-500 block mb-1 font-medium">Goal / Key Result Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Implement SOC-2 automated evidence collection"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-500 block mb-1 font-medium">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] outline-none"
                    >
                      <option value="OKRs">OKRs</option>
                      <option value="Technical Execution">Technical Execution</option>
                      <option value="Productivity">Productivity</option>
                      <option value="Leadership">Leadership</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-500 block mb-1 font-medium">Target Due Date</label>
                    <input
                      type="date"
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-semibold text-xs cursor-pointer shadow-md"
                  >
                    Create Goal
                  </button>
                  <button
                    type="button"
                    onClick={() => setGoalModalOpen(false)}
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
