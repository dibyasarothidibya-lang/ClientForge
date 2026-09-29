"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import { Task, Project } from "@/lib/demoData";
import ThreeDCard from "@/components/motion/ThreeDCard";
import {
  FolderKanban,
  Plus,
  Clock,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Paperclip,
  CheckSquare,
  ArrowRight,
  Filter,
  Layers
} from "lucide-react";

export default function ProjectsPage() {
  const { projects, tasks, addTask, updateTaskStatus, members } = useWorkspace();

  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0].id);
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];
  const projectTasks = tasks.filter((t) => t.projectId === selectedProjectId);

  const kanbanColumns: Task["status"][] = ["Backlog", "To Do", "In Progress", "In Review", "Done"];

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-sans font-semibold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 block mb-1">
            Program Delivery
          </span>
          <h1 className="text-2xl sm:text-3xl font-sans font-semibold text-slate-950 dark:text-[#f5f5f3] tracking-tight">Projects & Program Management</h1>
        </div>

        {/* View Toggle with Spring Sliding Pill */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-xl p-1 text-xs font-sans font-medium flex relative">
            {(["kanban", "table"] as const).map((mode) => {
              const isActive = viewMode === mode;
              const label = mode === "kanban" ? "Kanban Board" : "Tasks Table";
              return (
                <motion.button
                  key={mode}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode(mode)}
                  className={`relative px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    isActive ? "text-neutral-950 font-semibold" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="projectsViewToggle"
                      className="absolute inset-0 bg-white rounded-lg shadow-xs"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </motion.button>
              );
            })}
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              addTask({
                projectId: selectedProjectId,
                title: "New Program Task",
                description: "Describe scope and milestones...",
                status: "To Do",
                priority: "Medium",
                assignee: members[0],
                dueDate: "2026-10-15",
                labels: ["Operations"],
                subtasks: [{ id: "st_new", title: "Complete initial draft", completed: false }],
              });
            }}
            className="px-3.5 py-2 rounded-xl bg-[#f5f5f3] hover:bg-white text-neutral-950 text-xs font-semibold flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Task</span>
          </motion.button>
        </div>
      </div>

      {/* Project Selector Pills with Spring Indicator */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/[0.08] text-xs font-sans font-medium">
        <span className="text-neutral-500 mr-1 shrink-0">Project:</span>
        {projects.map((proj) => {
          const isSelected = selectedProjectId === proj.id;
          return (
            <motion.button
              key={proj.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedProjectId(proj.id)}
              className={`relative px-3.5 py-1.5 rounded-xl border whitespace-nowrap transition-colors cursor-pointer ${
                isSelected
                  ? "border-indigo-500/80 text-white font-medium shadow-md shadow-indigo-500/10"
                  : "border-white/[0.06] bg-white/[0.02] text-neutral-400 hover:text-white"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeProjectSelectorPill"
                  className="absolute inset-0 bg-indigo-950/50 rounded-xl"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative z-10">{proj.name} ({proj.progress}%)</span>
            </motion.button>
          );
        })}
      </div>

      {/* Project Overview Card with 3D Tilt */}
      <ThreeDCard glareColor="#6366f1" maxTilt={6} elevationZ={12} className="w-full">
        <div className="p-6 rounded-3xl bg-[#0e0e12] border border-white/[0.08] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 w-full">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xs font-sans font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                {activeProject.code}
              </span>
              <span className="text-xs font-sans text-emerald-400">Status: {activeProject.status}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-sans font-semibold text-white tracking-tight">{activeProject.name}</h2>
            <p className="text-xs text-neutral-400 max-w-xl mt-1 leading-relaxed">{activeProject.description}</p>
          </div>

          <div className="flex items-center gap-6 text-xs font-sans shrink-0">
            <div>
              <span className="text-neutral-500 block">Lead:</span>
              <span className="text-white font-medium">{activeProject.lead.name}</span>
            </div>
            <div>
              <span className="text-neutral-500 block">Budget Burn:</span>
              <span className="font-sans text-base sm:text-lg font-medium text-emerald-400 tabular-nums">
                ${(activeProject.spent / 1000).toFixed(0)}k <span className="text-xs text-neutral-500 font-sans">/ ${(activeProject.budget / 1000).toFixed(0)}k</span>
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block">Due Date:</span>
              <span className="text-white font-medium">{activeProject.targetDate.split(",")[0]}</span>
            </div>
          </div>
        </div>
      </ThreeDCard>

      {/* KANBAN BOARD VIEW */}
      {viewMode === "kanban" && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {kanbanColumns.map((col) => {
            const colTasks = projectTasks.filter((t) => t.status === col);
            return (
              <div key={col} className="rounded-2xl p-4 bg-[#0a0a0d] border border-white/[0.06] flex flex-col min-h-[500px]">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06] text-xs font-sans">
                  <span className="font-semibold text-neutral-300">{col}</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/[0.04] text-neutral-400 text-[10px] font-sans">
                    {colTasks.length}
                  </span>
                </div>

                {/* Cards Column */}
                <div className="space-y-3 flex-1">
                  {colTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      whileHover={{ y: -3, scale: 1.015 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      onClick={() => setSelectedTask(task)}
                      className="p-4 rounded-xl bg-[#121216] border border-white/[0.08] hover:border-indigo-500/50 cursor-pointer transition-all shadow-md group"
                    >
                      <div className="flex items-center justify-between text-[11px] font-sans text-neutral-400 mb-2 whitespace-nowrap">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                          task.priority === "Critical" ? "bg-red-500/20 text-red-300" : "bg-white/[0.04] text-neutral-400"
                        }`}>
                          {task.priority}
                        </span>
                        <span className="shrink-0">Due {task.dueDate}</span>
                      </div>

                      <h4 className="text-xs font-medium text-white group-hover:text-indigo-300 transition-colors mb-2">
                        {task.title}
                      </h4>

                      <div className="flex items-center justify-between pt-2 border-t border-white/[0.04] text-[11px] text-neutral-400 font-sans">
                        <div className="flex items-center gap-1.5">
                          <img
                            src={task.assignee.avatar}
                            alt={task.assignee.name}
                            className="w-4 h-4 rounded-full object-cover"
                          />
                          <span>{task.assignee.name.split(" ")[0]}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckSquare className="w-3 h-3 text-neutral-500" />
                          <span>{task.subtasks.filter((s) => s.completed).length}/{task.subtasks.length}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === "table" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/[0.08] bg-[#0c0c0e] overflow-hidden shadow-xl"
        >
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/[0.08] bg-white/[0.02] text-neutral-400 font-sans font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Task Name</th>
                <th className="py-3.5 px-4">Priority</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Assignee</th>
                <th className="py-3.5 px-4">Due Date</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-neutral-300">
              {projectTasks.map((task) => (
                <tr key={task.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-sans font-medium text-white">{task.title}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-sans font-medium whitespace-nowrap ${
                      task.priority === "Critical" ? "bg-red-500/20 text-red-300" : "bg-white/[0.04] text-neutral-400"
                    }`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-sans font-medium text-indigo-400 text-xs whitespace-nowrap">{task.status}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <img src={task.assignee.avatar} alt={task.assignee.name} className="w-5 h-5 rounded-full object-cover" />
                      <span className="font-sans text-xs whitespace-nowrap">{task.assignee.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-sans text-xs text-neutral-400 whitespace-nowrap">{task.dueDate}</td>
                  <td className="py-3.5 px-4 text-right">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedTask(task)}
                      className="px-3 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white font-sans font-medium text-xs cursor-pointer transition-colors"
                    >
                      Inspect
                    </motion.button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* TASK DETAIL & COMMENTS MODAL WITH SPRING ANIMATION */}
      <AnimatePresence>
        {selectedTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
              className="bg-[#121216] border border-white/[0.12] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 text-xs font-sans text-left"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <span className="text-xs font-sans font-semibold text-indigo-400 uppercase tracking-wider">
                  Task • {selectedTask.priority} Priority
                </span>
                <button onClick={() => setSelectedTask(null)} className="text-neutral-400 hover:text-white cursor-pointer">✕</button>
              </div>

              <div>
                <h3 className="text-xl font-sans font-semibold text-white tracking-tight mb-2">{selectedTask.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{selectedTask.description}</p>
              </div>

              {/* Change Status Fast */}
              <div>
                <label className="block text-[10px] font-sans font-medium text-neutral-500 uppercase mb-1.5">Move Status:</label>
                <div className="flex flex-wrap gap-1.5 font-sans text-xs">
                  {kanbanColumns.map((st) => (
                    <motion.button
                      key={st}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        updateTaskStatus(selectedTask.id, st);
                        setSelectedTask({ ...selectedTask, status: st });
                      }}
                      className={`px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                        selectedTask.status === st
                          ? "border-indigo-500 bg-indigo-600/30 text-white font-medium"
                          : "border-white/[0.06] text-neutral-400 hover:text-white"
                      }`}
                    >
                      {st}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Subtasks Checklist */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-2">
                <div className="text-[10px] font-sans font-medium text-neutral-500 uppercase mb-1">Subtasks:</div>
                {selectedTask.subtasks.map((st) => (
                  <div key={st.id} className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked={st.completed} className="accent-indigo-500 rounded cursor-pointer" />
                    <span className={st.completed ? "line-through text-neutral-500" : "text-neutral-300"}>
                      {st.title}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedTask(null)}
                  className="px-5 py-2.5 rounded-xl bg-white text-neutral-950 font-semibold text-xs cursor-pointer shadow-sm"
                >
                  Close & Save
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
