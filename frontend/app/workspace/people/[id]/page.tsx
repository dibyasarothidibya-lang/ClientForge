"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  Briefcase,
  ShieldCheck,
  FileText,
  Clock,
  Activity,
  CheckCircle2,
  AlertCircle,
  Download,
  Edit3,
  Trash2,
  Plus,
  Send,
  Award,
  CreditCard
} from "lucide-react";

export default function EmployeeProfilePage() {
  const params = useParams();
  const router = useRouter();
  const employeeId = params?.id as string;
  const { members, attendanceRecords, leaveRequests, payrolls, goals, hrDocuments, activities } = useWorkspace();

  const [activeTab, setActiveTab] = useState<
    "overview" | "personal" | "employment" | "attendance" | "leave" | "payroll" | "documents" | "performance" | "activity"
  >("overview");

  // Find member or fallback to first member
  const member = members.find((m) => m.id === employeeId) || members[0];
  const memberAttendance = attendanceRecords.filter((a) => a.employeeId === member.id || a.employeeName === member.name);
  const memberLeaves = leaveRequests.filter((l) => l.employeeId === member.id || l.employeeName === member.name);
  const memberPayrolls = payrolls.filter((p) => p.employeeId === member.id || p.employeeName === member.name);
  const memberGoals = goals.filter((g) => g.employeeId === member.id || g.employeeName === member.name);
  const memberActivities = activities.filter((a) => a.actor.includes(member.name.split(" ")[0]));

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <div className="space-y-6 font-sans">
      {/* Back button */}
      <Link
        href="/workspace/people"
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to People Directory</span>
      </Link>

      {/* Header Profile Card */}
      <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative">
            <img
              src={member.avatar}
              alt={member.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-indigo-500/30 shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white shadow-xs">
              {member.status}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-white tracking-tight">
                {member.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                {member.role}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-neutral-400 mt-1.5 flex-wrap">
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" />
                {member.department}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5" />
                ID: EMP-{member.id.toUpperCase()}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                San Francisco, CA (HQ)
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => alert(`Email composition initiated for ${member.email}`)}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-xs font-medium text-slate-700 dark:text-neutral-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Send Message</span>
          </button>
          <button
            onClick={() => setDeleteModalOpen(true)}
            className="p-2 rounded-xl border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
            title="Terminate / Offboard Employee"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 dark:border-white/[0.08] custom-scrollbar">
        {[
          { key: "overview", label: "Overview" },
          { key: "personal", label: "Personal Information" },
          { key: "employment", label: "Employment & History" },
          { key: "attendance", label: "Attendance" },
          { key: "leave", label: "Leave & Balances" },
          { key: "payroll", label: "Payroll & Compensation" },
          { key: "documents", label: "Documents" },
          { key: "performance", label: "Performance & Goals" },
          { key: "activity", label: "Audit Timeline" },
        ].map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? "bg-slate-950 text-white dark:bg-white dark:text-neutral-950 shadow-xs"
                  : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="space-y-6">
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
              <div className="rounded-3xl p-6 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm space-y-4">
                <h3 className="text-base font-semibold text-slate-950 dark:text-white">Core Position Overview</h3>
                <div className="grid sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/[0.04]">
                    <span className="text-slate-400 block mb-0.5">Manager</span>
                    <span className="font-semibold text-slate-900 dark:text-white">Dr. Sarah Lin (CEO)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/[0.04]">
                    <span className="text-slate-400 block mb-0.5">Department</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{member.department}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/[0.04]">
                    <span className="text-slate-400 block mb-0.5">Employment Type</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{member.type} (Full-time Exempt)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/[0.04]">
                    <span className="text-slate-400 block mb-0.5">Start Date</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{member.joinDate} (2.4 years tenure)</span>
                  </div>
                </div>
              </div>

              {/* Skills and Certifications */}
              <div className="rounded-3xl p-6 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm">
                <h3 className="text-base font-semibold text-slate-950 dark:text-white mb-3">Skills & Accreditations</h3>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              {/* Emergency Contact */}
              <div className="rounded-3xl p-6 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm">
                <h3 className="text-base font-semibold text-slate-950 dark:text-white mb-3">Emergency Contact</h3>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 block">Contact Name</span>
                    <span className="font-medium text-slate-900 dark:text-white">Clara Lin (Spouse)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Phone</span>
                    <span className="font-medium text-slate-900 dark:text-white">+1 (555) 890-2144</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Relationship</span>
                    <span className="font-medium text-slate-900 dark:text-white">Primary Beneficiary</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PERSONAL INFORMATION TAB */}
        {activeTab === "personal" && (
          <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm max-w-4xl space-y-6">
            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Personal & Identification Records</h3>
            <div className="grid sm:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Full Legal Name</label>
                <input
                  type="text"
                  readOnly
                  value={member.name}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-xl font-medium"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Work Email</label>
                <input
                  type="text"
                  readOnly
                  value={member.email}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-xl font-medium"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Primary Phone</label>
                <input
                  type="text"
                  readOnly
                  value="+1 (555) 234-8900"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-xl font-medium"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Date of Birth</label>
                <input
                  type="text"
                  readOnly
                  value="1988-04-12 (Age 38)"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-xl font-medium"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Tax ID / SSN</label>
                <input
                  type="text"
                  readOnly
                  value="•••-••-8492 (Verified with SSA)"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-xl font-medium"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Citizenship / Work Authorization</label>
                <input
                  type="text"
                  readOnly
                  value="US Citizen (W-4 on file)"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-xl font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {/* EMPLOYMENT & HISTORY TAB */}
        {activeTab === "employment" && (
          <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm max-w-4xl space-y-6">
            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Employment History & Internal Progression</h3>
            <div className="relative pl-6 border-l-2 border-indigo-500/40 space-y-6 text-xs">
              <div className="relative">
                <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-indigo-600 ring-4 ring-indigo-100 dark:ring-indigo-950" />
                <div className="font-semibold text-slate-950 dark:text-white text-sm">Promoted to {member.role}</div>
                <div className="text-slate-400 mt-0.5">January 15, 2026 • Performance calibration cycle</div>
                <p className="text-slate-600 dark:text-neutral-400 mt-1 leading-relaxed">
                  Elevated to executive operational tier following exceptional governance leadership.
                </p>
              </div>
              <div className="relative">
                <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-slate-400 ring-4 ring-slate-100 dark:ring-zinc-800" />
                <div className="font-semibold text-slate-950 dark:text-white text-sm">Transferred to {member.department}</div>
                <div className="text-slate-400 mt-0.5">March 1, 2025 • Organizational realignment</div>
              </div>
              <div className="relative">
                <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100 dark:ring-emerald-950" />
                <div className="font-semibold text-slate-950 dark:text-white text-sm">Joined Organization</div>
                <div className="text-slate-400 mt-0.5">{member.joinDate} • Initial contract execution</div>
              </div>
            </div>
          </div>
        )}

        {/* ATTENDANCE TAB */}
        {activeTab === "attendance" && (
          <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm space-y-4">
            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Recent Attendance Logs</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-200 dark:border-white/[0.08] text-slate-400 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Check-In</th>
                    <th className="py-2.5 px-3">Check-Out</th>
                    <th className="py-2.5 px-3">Hours Logged</th>
                    <th className="py-2.5 px-3">Mode</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
                  {memberAttendance.length > 0 ? (
                    memberAttendance.map((rec) => (
                      <tr key={rec.id}>
                        <td className="py-3 px-3 font-medium text-slate-900 dark:text-white">{rec.date}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            {rec.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-600 dark:text-neutral-300">{rec.checkIn}</td>
                        <td className="py-3 px-3 text-slate-600 dark:text-neutral-300">{rec.checkOut}</td>
                        <td className="py-3 px-3 text-slate-900 dark:text-white font-semibold">{rec.totalHours} hrs</td>
                        <td className="py-3 px-3 text-slate-500">{rec.workMode}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400">
                        Zero attendance discrepancies for the active period. 100% compliant.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* LEAVE TAB */}
        {activeTab === "leave" && (
          <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Leave Balance & Requests</h3>
              <Link
                href="/workspace/leave?action=request"
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-neutral-950 text-xs font-semibold cursor-pointer"
              >
                + Request Time Off
              </Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 text-xs font-sans">
              <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800">
                <span className="text-slate-500 dark:text-neutral-400">Annual Paid Vacation</span>
                <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mt-1">14 Days Remaining</div>
                <span className="text-[10px] text-slate-400">Accrues 1.75 days/mo</span>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
                <span className="text-slate-500 dark:text-neutral-400">Sick & Medical Leave</span>
                <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 mt-1">10 Days Available</div>
                <span className="text-[10px] text-slate-400">Full salary protected</span>
              </div>
              <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
                <span className="text-slate-500 dark:text-neutral-400">Parental / Family Care</span>
                <div className="text-2xl font-bold text-purple-700 dark:text-purple-300 mt-1">30 Days Unused</div>
                <span className="text-[10px] text-slate-400">Policy tier A</span>
              </div>
            </div>
          </div>
        )}

        {/* PAYROLL TAB */}
        {activeTab === "payroll" && (
          <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm space-y-6">
            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Compensation & Payslip Records</h3>
            {memberPayrolls.length > 0 ? (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] space-y-4">
                <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-200 dark:border-white/[0.06]">
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white text-sm">Monthly Compensation</span>
                    <div className="text-slate-400 text-[11px]">{memberPayrolls[0].period} • {memberPayrolls[0].paymentMethod}</div>
                  </div>
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                    ${memberPayrolls[0].netSalary.toLocaleString()} Net / mo
                  </span>
                </div>
                <div className="grid sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">Base Salary</span>
                    <span className="font-semibold text-slate-900 dark:text-white">${memberPayrolls[0].baseSalary.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Allowances</span>
                    <span className="font-semibold text-slate-900 dark:text-white">+${memberPayrolls[0].allowances.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Tax Withholding</span>
                    <span className="font-semibold text-red-500">-${memberPayrolls[0].taxes.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Direct Deposit</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{memberPayrolls[0].bankAccount}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-slate-400">
                No archived payslips for this profile.
              </div>
            )}
          </div>
        )}

        {/* DOCUMENTS TAB */}
        {activeTab === "documents" && (
          <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm space-y-4">
            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Signed Personnel Documents</h3>
            <div className="space-y-3">
              {hrDocuments.slice(0, 3).map((doc) => (
                <div key={doc.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-indigo-500" />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">{doc.title}</div>
                      <div className="text-[11px] text-slate-400">{doc.category} • {doc.fileSize} • {doc.version}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Downloading ${doc.title}`)}
                    className="p-2 rounded-xl bg-slate-200/70 dark:bg-white/10 text-slate-700 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PERFORMANCE TAB */}
        {activeTab === "performance" && (
          <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm space-y-4">
            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Active Performance Goals & OKRs</h3>
            <div className="space-y-3">
              {memberGoals.length > 0 ? (
                memberGoals.map((goal) => (
                  <div key={goal.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900 dark:text-white">{goal.title}</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">{goal.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${goal.progress}%` }} />
                    </div>
                    <div className="text-[11px] text-slate-500">{goal.managerFeedback}</div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-xs text-slate-400">
                  Zero pending goals flagged for this employee.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ACTIVITY TAB */}
        {activeTab === "activity" && (
          <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm space-y-4">
            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Chronological Audit Timeline</h3>
            <div className="space-y-3 text-xs">
              {memberActivities.map((act) => (
                <div key={act.id} className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/[0.04] flex items-center justify-between gap-3">
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">{act.actor}</span>
                    <span className="text-slate-500 mx-1">{act.action}</span>
                    <span className="text-slate-900 dark:text-neutral-200">{act.target}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">{act.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sensitive Action Modal (Offboard Employee) */}
      <AnimatePresence>
        {deleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white dark:bg-[#121215] border border-red-500/30 rounded-3xl max-w-md w-full p-6 shadow-2xl z-10 space-y-4 font-sans"
            >
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Confirm Employee Offboarding</h3>
              <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
                You are about to initiate formal offboarding for <strong>{member.name}</strong>. This will revoke corporate SSO tokens, freeze payroll distributions, and initiate statutory exit documentation workflows.
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setDeleteModalOpen(false);
                    alert(`Offboarding sequence initiated for ${member.name}. Confirmation dispatch sent.`);
                    router.push("/workspace/people");
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs cursor-pointer shadow-md"
                >
                  Initiate Offboarding
                </button>
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-neutral-300 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
