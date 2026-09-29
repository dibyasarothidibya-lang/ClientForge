"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Layers,
  Calendar,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Check
} from "lucide-react";

export default function PeopleCoreOnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [companyInfo, setCompanyInfo] = useState({
    name: "Acme Global Technologies",
    legalName: "Acme Global Technologies Inc.",
    industry: "B2B SaaS / Financial Technology",
    headquarters: "San Francisco, CA",
    employeeBand: "50-250 Employees",
  });

  const [structure, setStructure] = useState({
    departments: ["Engineering", "Product & Design", "Finance & Operations", "People Operations", "Revenue & Sales"],
    locations: ["San Francisco (HQ)", "New York Office", "Austin Remote Hub", "London International"],
  });

  const [inviteEmails, setInviteEmails] = useState("cto@acme.io, hr@acme.io, cfo@acme.io");

  const [leaveConfig, setLeaveConfig] = useState({
    annualDays: 20,
    sickDays: 10,
    unlimitedPTO: false,
    requireApproval: true,
  });

  const [payrollConfig, setPayrollConfig] = useState({
    frequency: "Semi-Monthly",
    currency: "USD",
    taxAutoWithhold: true,
    nachaCompanyId: "9841203948",
  });

  const steps = [
    { num: 1, title: "Company Information", icon: Building2 },
    { num: 2, title: "Organizational Structure", icon: Layers },
    { num: 3, title: "Invite Core Team", icon: Users },
    { num: 4, title: "Leave Policies", icon: Calendar },
    { num: 5, title: "Payroll & Compensation", icon: CreditCard },
    { num: 6, title: "Launch PeopleCore", icon: CheckCircle2 },
  ];

  const handleNext = () => {
    if (step < 6) setStep(step + 1);
    else {
      router.push("/workspace");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#070709] text-slate-900 dark:text-zinc-100 flex flex-col justify-between p-4 sm:p-8 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between py-4 border-b border-slate-200 dark:border-white/[0.08]">
        <Link
          href="/"
          title="Return to Client Forge Home"
          className="flex items-center gap-3 group transition-opacity hover:opacity-90"
        >
          <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-slate-200 dark:border-white/15 bg-black shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-[1.02]">
            <img 
              src="/logo.jpg" 
              alt="Client Forge Logo" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-victorian text-xl font-normal tracking-wide text-slate-900 dark:text-white select-none group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Client Forge
              </span>
              <span className="text-[11px] font-sans font-semibold text-slate-400 dark:text-neutral-500">/</span>
              <span className="text-xs font-semibold text-slate-700 dark:text-neutral-200">PeopleCore</span>
            </div>
            <div className="text-[10px] text-slate-400">Enterprise Setup • Return to Home</div>
          </div>
        </Link>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-400">Step {step} of 6</span>
          <button
            onClick={() => router.push("/workspace")}
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium cursor-pointer"
          >
            Skip to Dashboard &rarr;
          </button>
        </div>
      </header>

      {/* Stepper Progress */}
      <div className="max-w-3xl mx-auto w-full my-6">
        <div className="flex items-center justify-between overflow-x-auto gap-2 pb-1 custom-scrollbar">
          {steps.map((s) => {
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
                      : "bg-slate-200 dark:bg-white/[0.06] text-slate-400"
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span className={`text-xs ${isCurrent ? "font-semibold text-slate-900 dark:text-white" : "text-slate-400"}`}>
                  {s.title}
                </span>
                {s.num < 6 && <div className="w-4 sm:w-8 h-[1px] bg-slate-200 dark:bg-white/[0.08] hidden sm:block" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Container Card */}
      <div className="max-w-2xl mx-auto w-full rounded-3xl p-6 sm:p-10 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm">
        {/* STEP 1: COMPANY INFO */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Step 1: Company Profile</h2>
            <p className="text-xs text-slate-500">Provide legal identification for compliance and payroll bindings.</p>
            <div className="space-y-3 text-xs pt-2">
              <div>
                <label className="text-slate-500 block mb-1 font-medium">Company Brand Name</label>
                <input
                  type="text"
                  value={companyInfo.name}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
                />
              </div>
              <div>
                <label className="text-slate-500 block mb-1 font-medium">Full Legal Entity Name</label>
                <input
                  type="text"
                  value={companyInfo.legalName}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, legalName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-500 block mb-1 font-medium">Industry Classification</label>
                  <input
                    type="text"
                    value={companyInfo.industry}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, industry: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-500 block mb-1 font-medium">Global Headquarter</label>
                  <input
                    type="text"
                    value={companyInfo.headquarters}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, headquarters: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: COMPANY STRUCTURE */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Step 2: Departments & Locations</h2>
            <p className="text-xs text-slate-500">Configure organizational boundaries for RBAC access and approval routing.</p>
            <div className="space-y-4 text-xs pt-2">
              <div>
                <label className="text-slate-500 block mb-1 font-medium">Default Departments</label>
                <div className="flex flex-wrap gap-2">
                  {structure.departments.map((d) => (
                    <span key={d} className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-medium">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-slate-500 block mb-1 font-medium">Active Locations & Remote Hubs</label>
                <div className="flex flex-wrap gap-2">
                  {structure.locations.map((loc) => (
                    <span key={loc} className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.06] text-slate-800 dark:text-neutral-200 font-medium">
                      {loc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: INVITE EMPLOYEES */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Step 3: Invite Core Team Leads</h2>
            <p className="text-xs text-slate-500">Enter work email addresses to dispatch secure cryptographic sign-in links.</p>
            <div className="space-y-3 text-xs pt-2">
              <div>
                <label className="text-slate-500 block mb-1 font-medium">Email Addresses (comma separated)</label>
                <textarea
                  rows={4}
                  value={inviteEmails}
                  onChange={(e) => setInviteEmails(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: LEAVE POLICIES */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Step 4: Configure Leave Policies</h2>
            <p className="text-xs text-slate-500">Establish base paid vacation and sick time entitlements.</p>
            <div className="grid sm:grid-cols-2 gap-4 text-xs pt-2">
              <div>
                <label className="text-slate-500 block mb-1 font-medium">Annual Vacation Days</label>
                <input
                  type="number"
                  value={leaveConfig.annualDays}
                  onChange={(e) => setLeaveConfig({ ...leaveConfig, annualDays: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
                />
              </div>
              <div>
                <label className="text-slate-500 block mb-1 font-medium">Protected Sick Leave</label>
                <input
                  type="number"
                  value={leaveConfig.sickDays}
                  onChange={(e) => setLeaveConfig({ ...leaveConfig, sickDays: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: PAYROLL SETTINGS */}
        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Step 5: Configure Payroll Settings</h2>
            <p className="text-xs text-slate-500">Select standard disbursement schedules and multi-state tax withholding engine.</p>
            <div className="grid sm:grid-cols-2 gap-4 text-xs pt-2">
              <div>
                <label className="text-slate-500 block mb-1 font-medium">Pay Frequency</label>
                <select
                  value={payrollConfig.frequency}
                  onChange={(e) => setPayrollConfig({ ...payrollConfig, frequency: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] outline-none"
                >
                  <option value="Semi-Monthly">Semi-Monthly (15th and Last Day)</option>
                  <option value="Bi-Weekly">Bi-Weekly (Every 2 Weeks)</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
              <div>
                <label className="text-slate-500 block mb-1 font-medium">Operating Currency</label>
                <input
                  type="text"
                  readOnly
                  value="USD ($ United States Dollar)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: COMPLETE SETUP */}
        {step === 6 && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/15 text-emerald-500 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white">All-In-One HR Tenant Initialized!</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              Your organization <strong>{companyInfo.name}</strong> is now live on PeopleCore. Access your command dashboard to start tracking employees, recruitment, attendance, and payroll.
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-white/[0.06] mt-6">
          {step > 1 && step < 6 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-medium cursor-pointer"
            >
              Back
            </button>
          ) : <div />}

          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-semibold flex items-center gap-1.5 shadow-md cursor-pointer transition-all ml-auto"
          >
            <span>{step === 6 ? "Enter Dashboard" : "Continue"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400 py-4">
        © {new Date().getFullYear()} PeopleCore Technologies Inc. • Enterprise Workforce Operating System
      </footer>
    </main>
  );
}
