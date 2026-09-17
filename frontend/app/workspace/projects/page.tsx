"use client";

import { useState } from "react";
import { useWorkspace } from "@/context/WorkspaceContext";
import { Task, Project } from "@/lib/demoData";
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
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 block mb-1">
            Program Delivery
          </span>
          <h1 className="text-3xl font-serif text-[#f5f5f3] font-normal">Projects & Program Management</h1>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-1 text-xs font-mono flex">
            <button
              onClick={() => setViewMode("kanban")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                viewMode === "kanban" ? "bg-white text-neutral-950 font-semibold" : "text-neutral-400"
              }`}
            >
              Kanban Board
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                viewMode === "table" ? "bg-white text-neutral-950 font-semibold" : "text-neutral-400"
              }`}
            >
              Tasks Table
            </button>
          </div>

          <button
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
            className="px-3.5 py-2 rounded-xl bg-[#f5f5f3] hover:bg-white text-neutral-950 text-xs font-semibold flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Project Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/[0.08] text-xs font-mono">
        <span className="text-neutral-500 mr-1">Project:</span>
        {projects.map((proj) => (
          <button
            key={proj.id}
            onClick={() => setSelectedProjectId(proj.id)}
            className={`px-3.5 py-1.5 rounded-xl border whitespace-nowrap transition-colors ${
              selectedProjectId === proj.id
                ? "border-indigo-500 bg-indigo-950/30 text-white font-medium shadow-md"
                : "border-white/[0.06] bg-white/[0.02] text-neutral-400 hover:text-white"
            }`}
          >
            {proj.name} ({proj.progress}%)
          </button>
        ))}
      </div>

      {/* Project Overview Card */}
      <div className="p-6 rounded-3xl bg-[#0e0e12] border border-white/[0.08] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
              {activeProject.code}
            </span>
            <span className="text-xs font-mono text-emerald-400">Status: {activeProject.status}</span>
          </div>
          <h2 className="text-2xl font-serif text-white font-normal">{activeProject.name}</h2>
          <p className="text-xs text-neutral-400 max-w-xl mt-1">{activeProject.description}</p>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono">
          <div>
            <span className="text-neutral-500 block">Lead:</span>
            <span className="text-white font-medium">{activeProject.lead.name}</span>
          </div>
          <div>
            <span className="text-neutral-500 block">Budget Burn:</span>
            <span className="text-emerald-400 font-medium">
              ${(activeProject.spent / 1000).toFixed(0)}k / ${(activeProject.budget / 1000).toFixed(0)}k
            </span>
          </div>
          <div>
            <span className="text-neutral-500 block">Due Date:</span>
            <span className="text-white font-medium">{activeProject.targetDate.split(",")[0]}</span>
          </div>
        </div>
      </div>

      {/* KANBAN BOARD VIEW */}
      {viewMode === "kanban" && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {kanbanColumns.map((col) => {
            const colTasks = projectTasks.filter((t) => t.status === col);
            return (
              <div key={col} className="rounded-2xl p-4 bg-[#0a0a0d] border border-white/[0.06] flex flex-col min-h-[500px]">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06] text-xs font-mono">
                  <span className="font-semibold text-neutral-300">{col}</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/[0.04] text-neutral-400 text-[10px]">
                    {colTasks.length}
                  </span>
                </div>

                {/* Cards Column */}
                <div className="space-y-3 flex-1">
                  {colTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className="p-4 rounded-xl bg-[#121216] border border-white/[0.08] hover:border-indigo-500/50 cursor-pointer transition-all shadow-md group"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 mb-2">
                        <span className={`px-1.5 py-0.5 rounded ${
                          task.priority === "Critical" ? "bg-red-500/20 text-red-300" : "bg-white/[0.04] text-neutral-400"
                        }`}>
                          {task.priority}
                        </span>
                        <span>{task.dueDate}</span>
                      </div>

                      <h4 className="text-xs font-medium text-white group-hover:text-indigo-300 transition-colors mb-2">
                        {task.title}
                      </h4>

                      <div className="flex items-center justify-between pt-2 border-t border-white/[0.04] text-[11px] text-neutral-500 font-mono">
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
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TASK DETAIL & COMMENTS MODAL */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121216] border border-white/[0.12] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 text-xs font-sans text-left">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest">
                Task • {selectedTask.priority} Priority
              </span>
              <button onClick={() => setSelectedTask(null)} className="text-neutral-400 hover:text-white">✕</button>
            </div>

            <div>
              <h3 className="text-xl font-serif text-white font-normal mb-2">{selectedTask.title}</h3>
              <p className="text-xs text-neutral-400">{selectedTask.description}</p>
            </div>

            {/* Change Status Fast */}
            <div>
              <label className="block text-[10px] font-mono text-neutral-500 uppercase mb-1.5">Move Status:</label>
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {kanbanColumns.map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      updateTaskStatus(selectedTask.id, st);
                      setSelectedTask({ ...selectedTask, status: st });
                    }}
                    className={`px-2.5 py-1 rounded-lg border transition-colors ${
                      selectedTask.status === st
                        ? "border-indigo-500 bg-indigo-600/30 text-white font-medium"
                        : "border-white/[0.06] text-neutral-400 hover:text-white"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Subtasks Checklist */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-2">
              <div className="text-[10px] font-mono text-neutral-500 uppercase mb-1">Subtasks:</div>
              {selectedTask.subtasks.map((st) => (
                <div key={st.id} className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked={st.completed} className="accent-indigo-500 rounded" />
                  <span className={st.completed ? "line-through text-neutral-500" : "text-neutral-300"}>
                    {st.title}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedTask(null)}
                className="px-5 py-2.5 rounded-xl bg-white text-neutral-950 font-semibold text-xs"
              >
                Close & Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
