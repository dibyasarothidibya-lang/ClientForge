"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import { PayrollRecord } from "@/lib/peopleCoreData";
import ThreeDCard from "@/components/motion/ThreeDCard";
import {
  CreditCard,
  DollarSign,
  Download,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Building2,
  FileText,
  ChevronRight,
  ArrowRight,
  X
} from "lucide-react";

export default function PayrollPage() {
  const { payrolls } = useWorkspace();

  const [selectedPeriod, setSelectedPeriod] = useState("September 2026");
  const [selectedPayroll, setSelectedPayroll] = useState<PayrollRecord | null>(null);

  // 6-step Payroll Run Flow Modal
  const [runFlowOpen, setRunFlowOpen] = useState(false);
  const [runStep, setRunStep] = useState(1);

  const totalBase = payrolls.reduce((acc, p) => acc + p.baseSalary, 0);
  const totalAllowances = payrolls.reduce((acc, p) => acc + p.allowances, 0);
  const totalDeductions = payrolls.reduce((acc, p) => acc + p.deductions, 0);
  const totalTaxes = payrolls.reduce((acc, p) => acc + p.taxes, 0);
  const totalNet = payrolls.reduce((acc, p) => acc + p.netSalary, 0);

  const runSteps = [
    { num: 1, title: "Select Period" },
    { num: 2, title: "Review Employees" },
    { num: 3, title: "Detect Exceptions" },
    { num: 4, title: "Tax & Compliance" },
    { num: 5, title: "Confirm & Release" },
    { num: 6, title: "Disbursed" },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
            Compensation & Financial Ledger
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-white tracking-tight">
            Payroll & Total Compensation
          </h1>
          <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
            Automated multi-state tax withholdings, statutory filings, direct deposit batches, and payslip distribution.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("Payroll batch summary CSV exported.")}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] hover:bg-slate-200/70 dark:hover:bg-white/[0.08] text-xs font-medium text-slate-700 dark:text-neutral-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export NACHA / CSV</span>
          </button>

          <button
            onClick={() => {
              setRunStep(1);
              setRunFlowOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-semibold flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Run Payroll Cycle</span>
          </button>
        </div>
      </div>

      {/* 4 Financial KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ThreeDCard glareColor="#10b981" maxTilt={6} elevationZ={10} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Total Net Disbursement</span>
              <span className="text-[10px] text-emerald-600 font-semibold">ACH Ready</span>
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-slate-950 dark:text-white tabular-nums">
              ${totalNet.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">{payrolls.length} verified employee deposits</div>
          </div>
        </ThreeDCard>

        <ThreeDCard glareColor="#3b82f6" maxTilt={6} elevationZ={10} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Statutory Taxes (Withheld)</span>
              <span className="text-[10px] text-blue-600 font-semibold">IRS & State</span>
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-slate-950 dark:text-white tabular-nums">
              ${totalTaxes.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">FICA, Medicare & State SDI</div>
          </div>
        </ThreeDCard>

        <ThreeDCard glareColor="#f59e0b" maxTilt={6} elevationZ={10} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Benefits & Pre-Tax Deductions</span>
              <span className="text-[10px] text-amber-600 font-semibold">401(k) / HSA</span>
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-slate-950 dark:text-white tabular-nums">
              ${totalDeductions.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Automatic match credited</div>
          </div>
        </ThreeDCard>

        <ThreeDCard glareColor="#6366f1" maxTilt={6} elevationZ={10} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Current Pay Cycle</span>
              <span className="text-[10px] text-indigo-600 font-semibold">Active</span>
            </div>
            <div className="text-xl font-bold text-slate-950 dark:text-white mt-1">
              {selectedPeriod}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Direct deposit cut-off: 5:00 PM EST</div>
          </div>
        </ThreeDCard>
      </div>

      {/* PAYROLL TABLE */}
      <div className="rounded-3xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0c0c0e] overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between">
          <span className="font-semibold text-xs text-slate-900 dark:text-white">Employee Compensation Register</span>
          <span className="text-xs text-slate-400">All numbers formatted in USD</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 dark:border-white/[0.08] bg-slate-50/70 dark:bg-white/[0.02] text-slate-500 dark:text-neutral-400 font-sans font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Employee</th>
                <th className="py-3.5 px-4">Base Salary</th>
                <th className="py-3.5 px-4">Allowances</th>
                <th className="py-3.5 px-4">Deductions</th>
                <th className="py-3.5 px-4">Taxes</th>
                <th className="py-3.5 px-4">Net Salary</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {payrolls.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/60 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={rec.employeeAvatar}
                        alt={rec.employeeName}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-white/10"
                      />
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">{rec.employeeName}</div>
                        <div className="text-[11px] text-slate-500">{rec.jobTitle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-white tabular-nums">
                    ${rec.baseSalary.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 tabular-nums">
                    +${rec.allowances.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-amber-600 dark:text-amber-400 tabular-nums">
                    -${rec.deductions.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-red-500 tabular-nums">
                    -${rec.taxes.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-950 dark:text-white text-sm tabular-nums">
                    ${rec.netSalary.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        rec.status === "Paid"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                      }`}
                    >
                      {rec.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedPayroll(rec)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-xs font-medium text-slate-800 dark:text-white transition-colors cursor-pointer"
                    >
                      View Breakdown
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAILED PAYSLIP BREAKDOWN MODAL */}
      <AnimatePresence>
        {selectedPayroll && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPayroll(null)}
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
                  <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Earnings Statement & Payslip</h3>
                  <div className="text-xs text-slate-500">{selectedPayroll.employeeName} • {selectedPayroll.period}</div>
                </div>
                <button
                  onClick={() => setSelectedPayroll(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Net pay banner */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                <span className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">Net Deposited Amount</span>
                <div className="text-3xl font-bold text-emerald-950 dark:text-emerald-200 tabular-nums my-0.5">
                  ${selectedPayroll.netSalary.toLocaleString()}
                </div>
                <span className="text-[10px] text-slate-400">{selectedPayroll.bankAccount}</span>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between border-b border-slate-100 dark:border-white/[0.04] pb-2">
                  <span className="text-slate-400">Gross Base Salary:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">${selectedPayroll.baseSalary.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-white/[0.04] pb-2">
                  <span className="text-slate-400">Total Allowances:</span>
                  <span className="font-semibold text-emerald-600">+${selectedPayroll.allowances.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-white/[0.04] pb-2">
                  <span className="text-slate-400">Pre-Tax Deductions (HSA/401k):</span>
                  <span className="font-semibold text-amber-600">-${selectedPayroll.deductions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-white/[0.04] pb-2">
                  <span className="text-slate-400">Tax Withholdings (Federal + State):</span>
                  <span className="font-semibold text-red-500">-${selectedPayroll.taxes.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => alert(`Official Payslip PDF downloaded for ${selectedPayroll.employeeName}.`)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Payslip PDF</span>
                </button>
                <button
                  onClick={() => setSelectedPayroll(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-medium cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6-STEP PAYROLL RUN WIZARD MODAL */}
      <AnimatePresence>
        {runFlowOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setRunFlowOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white dark:bg-[#121215] border border-slate-200 dark:border-white/[0.12] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl z-10 space-y-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Run Enterprise Payroll</h3>
                  <div className="text-xs text-slate-500">Step {runStep} of 6: {runSteps[runStep - 1].title}</div>
                </div>
                <button
                  onClick={() => setRunFlowOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="flex gap-1.5">
                {runSteps.map((s) => (
                  <div
                    key={s.num}
                    className={`h-1.5 flex-1 rounded-full ${
                      s.num <= runStep ? "bg-emerald-500" : "bg-slate-200 dark:bg-white/10"
                    }`}
                  />
                ))}
              </div>

              {/* Step details */}
              <div className="py-4 text-xs font-sans space-y-3">
                {runStep === 1 && (
                  <div className="space-y-3">
                    <p className="text-slate-600 dark:text-neutral-300">
                      Select target cycle for direct deposit batch release:
                    </p>
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08]">
                      <div className="font-semibold text-slate-900 dark:text-white">September 1 – September 30, 2026</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Semi-monthly scheduled pay cycle</div>
                    </div>
                  </div>
                )}
                {runStep === 2 && (
                  <div className="space-y-2">
                    <p className="text-slate-600 dark:text-neutral-300">Verified {payrolls.length} employee accounts with valid ACH routing.</p>
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                      Zero invalid bank accounts detected.
                    </div>
                  </div>
                )}
                {runStep === 3 && (
                  <div className="space-y-2">
                    <p className="text-slate-600 dark:text-neutral-300">Scanning for overtime threshold variances and tax changes...</p>
                    <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-500/20 text-amber-700 dark:text-amber-300">
                      Notice: 1 employee has approved overtime (+1.5 hrs). Calculated into total.
                    </div>
                  </div>
                )}
                {runStep === 4 && (
                  <div className="space-y-2">
                    <p className="text-slate-600 dark:text-neutral-300">Statutory Tax Calculation: ${totalTaxes.toLocaleString()} total withheld.</p>
                    <p className="text-[11px] text-slate-400">Automated 941 quarterly balance binding active.</p>
                  </div>
                )}
                {runStep === 5 && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-500/30 text-red-700 dark:text-red-400">
                      <strong>Irreversible Action Warning:</strong> Confirming this step will authorize an ACH debit of <strong>${totalNet.toLocaleString()}</strong> from JPMorgan Chase operating account.
                    </div>
                  </div>
                )}
                {runStep === 6 && (
                  <div className="text-center py-4 space-y-2">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div className="font-bold text-base text-slate-900 dark:text-white">Payroll Cycle Successfully Disbursed!</div>
                    <p className="text-slate-500 text-xs">Direct deposit batch transmitted to Federal Reserve ACH network.</p>
                  </div>
                )}
              </div>

              {/* Flow controls */}
              <div className="flex justify-between pt-3 border-t border-slate-100 dark:border-white/[0.06]">
                {runStep > 1 && runStep < 6 && (
                  <button
                    onClick={() => setRunStep(runStep - 1)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-medium cursor-pointer"
                  >
                    Back
                  </button>
                )}
                {runStep < 5 && (
                  <button
                    onClick={() => setRunStep(runStep + 1)}
                    className="ml-auto px-5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-neutral-950 text-xs font-semibold cursor-pointer shadow-md"
                  >
                    Continue &rarr;
                  </button>
                )}
                {runStep === 5 && (
                  <button
                    onClick={() => setRunStep(6)}
                    className="ml-auto px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer shadow-md"
                  >
                    Authorize ACH Disbursement
                  </button>
                )}
                {runStep === 6 && (
                  <button
                    onClick={() => setRunFlowOpen(false)}
                    className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-neutral-950 text-xs font-semibold cursor-pointer"
                  >
                    Done
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
