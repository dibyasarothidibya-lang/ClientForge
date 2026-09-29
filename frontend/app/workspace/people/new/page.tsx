"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  User,
  Briefcase,
  DollarSign,
  Calendar,
  FileText,
  Check,
  AlertTriangle
} from "lucide-react";

export default function AddEmployeeWizardPage() {
  const router = useRouter();
  const { members, activeOrg } = useWorkspace();

  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    nationality: "United States",
    jobTitle: "",
    department: "Engineering",
    team: "Core Platform",
    employmentType: "Full-Time",
    startDate: new Date().toISOString().split("T")[0],
    manager: "Dr. Sarah Lin",
    location: "San Francisco, CA (HQ)",
    baseSalary: 140000,
    currency: "USD",
    payFrequency: "Semi-Monthly",
    bonusTarget: "15%",
    annualLeaveDays: 20,
    sickLeaveDays: 10,
    probationMonths: 3,
    ndaSigned: true,
    backgroundCheckConsent: true,
  });

  const steps = [
    { num: 1, title: "Basic Info", icon: User },
    { num: 2, title: "Employment", icon: Briefcase },
    { num: 3, title: "Compensation", icon: DollarSign },
    { num: 4, title: "Leave & Policies", icon: Calendar },
    { num: 5, title: "Compliance", icon: FileText },
    { num: 6, title: "Review & Sign", icon: CheckCircle2 },
  ];

  const handleNext = () => {
    if (step < 6) setStep(step + 1);
    else {
      alert(`Employee ${formData.firstName} ${formData.lastName} provisioned successfully! Onboarding packet dispatched.`);
      router.push("/workspace/people");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans">
      {/* Top back */}
      <Link
        href="/workspace/people"
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Exit Employee Setup</span>
      </Link>

      {/* Wizard Header */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 block mb-1">
          Workforce Provisioning
        </span>
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-white tracking-tight">
          Add New Employee
        </h1>
        <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
          Complete the multi-step verification to provision corporate access, payroll bindings, and legal compliance.
        </p>
      </div>

      {/* Progress Stepper */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs">
        <div className="flex items-center justify-between overflow-x-auto gap-3 custom-scrollbar pb-1">
          {steps.map((s) => {
            const Icon = s.icon;
            const isCompleted = step > s.num;
            const isCurrent = step === s.num;
            return (
              <div key={s.num} className="flex items-center gap-2 shrink-0">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                    isCurrent
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                      : isCompleted
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                      : "bg-slate-100 dark:bg-white/[0.04] text-slate-400 dark:text-neutral-500"
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span className={`text-xs font-medium ${isCurrent ? "text-slate-900 dark:text-white font-semibold" : "text-slate-400 dark:text-neutral-500"}`}>
                  {s.title}
                </span>
                {s.num < 6 && <div className="w-4 sm:w-8 h-[1px] bg-slate-200 dark:bg-white/[0.06] hidden md:block" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Form Body */}
      <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm">
        {/* STEP 1: BASIC INFORMATION */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-slate-950 dark:text-white">Step 1: Personal Identification</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-500 block mb-1 font-medium">First Legal Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Liam"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] outline-none focus:border-indigo-500 font-sans"
                />
              </div>
              <div>
                <label className="text-slate-500 block mb-1 font-medium">Last Legal Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Vance"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] outline-none focus:border-indigo-500 font-sans"
                />
              </div>
              <div>
                <label className="text-slate-500 block mb-1 font-medium">Corporate Work Email *</label>
                <input
                  type="email"
                  placeholder="liam.vance@peoplecore.io"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] outline-none focus:border-indigo-500 font-sans"
                />
              </div>
              <div>
                <label className="text-slate-500 block mb-1 font-medium">Contact Phone *</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 234-5678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] outline-none focus:border-indigo-500 font-sans"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: EMPLOYMENT INFORMATION */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-slate-950 dark:text-white">Step 2: Role & Organizational Alignment</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-500 block mb-1 font-medium">Job Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Security Engineer"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] outline-none focus:border-indigo-500 font-sans"
                />
              </div>
              <div>
                <label className="text-slate-500 block mb-1 font-medium">Department *</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] outline-none font-sans cursor-pointer"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Product & Design">Product & Design</option>
                  <option value="Operations & Field Services">Operations & Field Services</option>
                  <option value="Finance & Compliance">Finance & Compliance</option>
                  <option value="Human Resources">Human Resources</option>
                </select>
              </div>
              <div>
                <label className="text-slate-500 block mb-1 font-medium">Employment Classification *</label>
                <select
                  value={formData.employmentType}
                  onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] outline-none font-sans cursor-pointer"
                >
                  <option value="Full-Time">Full-Time (W-2 Exempt)</option>
                  <option value="Part-Time">Part-Time (Hourly)</option>
                  <option value="Contractor">Independent Contractor (1099)</option>
                  <option value="Volunteer">Volunteer Personnel</option>
                </select>
              </div>
              <div>
                <label className="text-slate-500 block mb-1 font-medium">Reporting Line (Manager) *</label>
                <input
                  type="text"
                  value={formData.manager}
                  onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] outline-none focus:border-indigo-500 font-sans"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: COMPENSATION */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-slate-950 dark:text-white">Step 3: Total Rewards & Payroll Banding</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-500 block mb-1 font-medium">Annual Base Salary (USD) *</label>
                <input
                  type="number"
                  value={formData.baseSalary}
                  onChange={(e) => setFormData({ ...formData, baseSalary: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] outline-none font-sans"
                />
              </div>
              <div>
                <label className="text-slate-500 block mb-1 font-medium">Disbursement Frequency</label>
                <select
                  value={formData.payFrequency}
                  onChange={(e) => setFormData({ ...formData, payFrequency: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] outline-none font-sans cursor-pointer"
                >
                  <option value="Semi-Monthly">Semi-Monthly (15th and Last Day)</option>
                  <option value="Bi-Weekly">Bi-Weekly (Every 2 Weeks)</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
              <div>
                <label className="text-slate-500 block mb-1 font-medium">Incentive Target / Bonus</label>
                <input
                  type="text"
                  value={formData.bonusTarget}
                  onChange={(e) => setFormData({ ...formData, bonusTarget: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] outline-none font-sans"
                />
              </div>
              <div>
                <label className="text-slate-500 block mb-1 font-medium">Probationary Period</label>
                <select
                  value={formData.probationMonths}
                  onChange={(e) => setFormData({ ...formData, probationMonths: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] outline-none font-sans cursor-pointer"
                >
                  <option value={3}>3 Months standard review</option>
                  <option value={6}>6 Months leadership review</option>
                  <option value={0}>Waived (Direct Hire)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: LEAVE POLICIES */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-slate-950 dark:text-white">Step 4: Paid Time Off & Leave Allocations</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-500 block mb-1 font-medium">Annual Vacation Days</label>
                <input
                  type="number"
                  value={formData.annualLeaveDays}
                  onChange={(e) => setFormData({ ...formData, annualLeaveDays: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] outline-none font-sans"
                />
              </div>
              <div>
                <label className="text-slate-500 block mb-1 font-medium">Protected Sick Leave Days</label>
                <input
                  type="number"
                  value={formData.sickLeaveDays}
                  onChange={(e) => setFormData({ ...formData, sickLeaveDays: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] outline-none font-sans"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: COMPLIANCE */}
        {step === 5 && (
          <div className="space-y-4 text-xs font-sans">
            <h3 className="text-base font-semibold text-slate-950 dark:text-white">Step 5: Statutory & Compliance Requirements</h3>
            <div className="space-y-3">
              <label className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.04] flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.ndaSigned}
                  onChange={(e) => setFormData({ ...formData, ndaSigned: e.target.checked })}
                  className="rounded border-slate-300 dark:border-zinc-700"
                />
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Proprietary IP Assignment & Confidentiality Agreement</div>
                  <div className="text-[11px] text-slate-500">Auto-dispatches electronic signature via PeopleCore Sign.</div>
                </div>
              </label>

              <label className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.04] flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.backgroundCheckConsent}
                  onChange={(e) => setFormData({ ...formData, backgroundCheckConsent: e.target.checked })}
                  className="rounded border-slate-300 dark:border-zinc-700"
                />
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">FCRA-Compliant Criminal & Identity Verification</div>
                  <div className="text-[11px] text-slate-500">Initiates automated background check via Checkr integration.</div>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* STEP 6: REVIEW */}
        {step === 6 && (
          <div className="space-y-4 text-xs font-sans">
            <h3 className="text-base font-semibold text-slate-950 dark:text-white">Step 6: Review & Finalize Record</h3>
            <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 space-y-3">
              <div className="flex justify-between border-b border-indigo-200/60 pb-2">
                <span className="text-slate-500">Employee:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formData.firstName || "Liam"} {formData.lastName || "Vance"}</span>
              </div>
              <div className="flex justify-between border-b border-indigo-200/60 pb-2">
                <span className="text-slate-500">Title & Dept:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formData.jobTitle || "Principal Engineer"} • {formData.department}</span>
              </div>
              <div className="flex justify-between border-b border-indigo-200/60 pb-2">
                <span className="text-slate-500">Compensation:</span>
                <span className="font-semibold text-slate-900 dark:text-white">${formData.baseSalary.toLocaleString()} USD / yr ({formData.payFrequency})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Compliance Verification:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">All checks confirmed</span>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-white/[0.08] mt-6">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className={`px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-medium cursor-pointer transition-colors ${
              step === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-slate-100 dark:hover:bg-white/[0.04]"
            }`}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-semibold flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
          >
            <span>{step === 6 ? "Confirm & Provision" : "Continue"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
