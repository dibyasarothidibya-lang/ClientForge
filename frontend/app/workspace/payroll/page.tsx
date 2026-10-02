"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import { PayrollRecord } from "@/lib/peopleCoreData";
import {
  CreditCard,
  Download,
  Check,
  Building2,
  FileText,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  X,
  Lock,
  ArrowUpRight
} from "lucide-react";

export default function PayrollPage() {
  const { payrolls } = useWorkspace();

  const [selectedPeriod, setSelectedPeriod] = useState("September 2026");
  const [selectedPayroll, setSelectedPayroll] = useState<PayrollRecord | null>(null);

  // Print-Ready Payslip Generator
  const handlePrintPayslip = (p: PayrollRecord) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Payslip - ${p.employeeName} - ${p.period}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px; color: #0f172a; max-width: 700px; margin: 0 auto; }
          .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0f172a; padding-bottom: 20px; margin-bottom: 24px; }
          .logo { font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
          .badge { font-size: 11px; font-weight: 700; color: #4f46e5; text-transform: uppercase; letter-spacing: 1px; }
          .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 13px; margin-bottom: 30px; background: #f8fafc; padding: 16px; border-radius: 8px; }
          .meta-item { display: flex; flex-direction: column; }
          .meta-label { color: #64748b; font-size: 11px; text-transform: uppercase; margin-bottom: 2px; }
          .meta-val { font-weight: 600; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 13px; }
          th { text-align: left; padding: 10px; border-bottom: 2px solid #e2e8f0; font-size: 11px; text-transform: uppercase; color: #64748b; }
          td { padding: 12px 10px; border-bottom: 1px solid #f1f5f9; }
          .text-right { text-align: right; }
          .total-box { background: #0f172a; color: #fff; padding: 20px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
          .total-label { font-size: 14px; font-weight: 500; }
          .total-val { font-size: 26px; font-weight: 800; }
          .footer { font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px; line-height: 1.6; }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="logo">ClientForge</div>
            <div class="badge">PeopleCore Compensation Ledger</div>
          </div>
          <div style="text-align: right;">
            <div style="font-weight: 700; font-size: 14px;">Official Earnings Statement</div>
            <div style="color: #64748b; font-size: 12px;">Disbursement Ref: CF-${Math.random().toString(36).substring(2, 9).toUpperCase()}</div>
          </div>
        </div>

        <div class="meta-grid">
          <div class="meta-item"><span class="meta-label">Employee Name</span><span class="meta-val">${p.employeeName}</span></div>
          <div class="meta-item"><span class="meta-label">Designation / Role</span><span class="meta-val">${p.jobTitle || "Staff Member"}</span></div>
          <div class="meta-item"><span class="meta-label">Pay Period</span><span class="meta-val">${p.period}</span></div>
          <div class="meta-item"><span class="meta-label">Payment Rail</span><span class="meta-val">ACH Direct Deposit (Reconciled)</span></div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Earnings & Statutory Components</th>
              <th class="text-right">Rate / Basis</th>
              <th class="text-right">Amount (USD)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Base Salary</strong> (Standard Contractual)</td>
              <td class="text-right">Monthly</td>
              <td class="text-right">$${p.baseSalary.toLocaleString()}</td>
            </tr>
            <tr>
              <td><strong>Duty Allowances & Per Diem</strong></td>
              <td class="text-right">Disbursed</td>
              <td class="text-right" style="color: #16a34a;">+$${p.allowances.toLocaleString()}</td>
            </tr>
            <tr>
              <td><strong>Pre-Tax Withholdings</strong> (Pension / HSA)</td>
              <td class="text-right">Statutory</td>
              <td class="text-right" style="color: #dc2626;">-$${p.deductions.toLocaleString()}</td>
            </tr>
            <tr>
              <td><strong>Income Tax Withholding</strong> (Federal & State)</td>
              <td class="text-right">Statutory</td>
              <td class="text-right" style="color: #dc2626;">-$${p.taxes.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>

        <div class="total-box">
          <div class="total-label">NET DIRECT DEPOSIT AMOUNT</div>
          <div class="total-val">$${p.netSalary.toLocaleString()}</div>
        </div>

        <div class="footer">
          Digitally certified and generated via ClientForge PeopleCore Treasury & Payroll Engine.<br>
          Protected by SOC-2 Type II financial security controls and ISO 27001 data isolation standards.
        </div>

        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

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
    { num: 2, title: "Review Roster" },
    { num: 3, title: "Detect Exceptions" },
    { num: 4, title: "Tax Withholdings" },
    { num: 5, title: "Dual Authorization" },
    { num: 6, title: "Disbursed" },
  ];

  return (
    <div className="space-y-5 font-sans antialiased text-slate-900 dark:text-neutral-100">
      
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-white/[0.07]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-neutral-400 border border-slate-200/80 dark:border-white/[0.06]">
              Compensation & Treasury
            </span>
            <span className="text-xs text-slate-400 dark:text-neutral-500 font-mono">
              Reconciled · Period {selectedPeriod}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Payroll Operations & Compensation Ledger
          </h1>
          <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
            Automated statutory tax filings, multi-currency direct deposit batches, and payslip distribution.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => alert("NACHA direct deposit batch & CSV summary exported.")}
            className="h-8 px-3 rounded-lg bg-slate-100 hover:bg-slate-200/70 dark:bg-white/[0.05] dark:hover:bg-white/[0.08] border border-slate-200/80 dark:border-white/[0.07] text-xs font-medium text-slate-700 dark:text-neutral-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export NACHA / CSV</span>
          </button>

          <button
            onClick={() => {
              setRunStep(1);
              setRunFlowOpen(true);
            }}
            className="h-8 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-medium inline-flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Run Payroll Cycle</span>
          </button>
        </div>
      </div>

      {/* 2. Financial Ledger Ribbon (Restrained, Precise, High Readability) */}
      <div className="bg-white dark:bg-[#111215] border border-slate-200/90 dark:border-white/[0.07] rounded-xl overflow-hidden shadow-2xs">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-slate-100 dark:divide-white/[0.05] md:divide-x md:divide-slate-200/80 md:dark:divide-white/[0.07]">
          
          <div className="p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500 flex items-center justify-between">
              <span>Total Net Disbursement</span>
              <span className="text-slate-500">ACH Ready</span>
            </div>
            <div className="text-2xl font-medium text-slate-950 dark:text-white tabular-nums mt-1">
              ${totalNet.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              {payrolls.length} verified personnel disbursements
            </div>
          </div>

          <div className="p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500 flex items-center justify-between">
              <span>Statutory Taxes (Withheld)</span>
              <span className="text-slate-500">Remitted</span>
            </div>
            <div className="text-2xl font-medium text-slate-950 dark:text-white tabular-nums mt-1">
              ${totalTaxes.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              Federal, Cantonal & Regional Tax SDI
            </div>
          </div>

          <div className="p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500 flex items-center justify-between">
              <span>Pre-Tax Deductions</span>
              <span className="text-slate-500">401(k) / Pension</span>
            </div>
            <div className="text-2xl font-medium text-slate-950 dark:text-white tabular-nums mt-1">
              ${totalDeductions.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              Pension & International Medical Plan
            </div>
          </div>

          <div className="p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500 flex items-center justify-between">
              <span>Active Pay Period</span>
              <span className="text-slate-500">Closing</span>
            </div>
            <div className="text-2xl font-medium text-slate-950 dark:text-white mt-1 truncate">
              {selectedPeriod}
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              Cut-off: Today, 17:00 UTC
            </div>
          </div>

        </div>
      </div>

      {/* 3. Compensation Register Table */}
      <div className="bg-white dark:bg-[#111215] border border-slate-200/90 dark:border-white/[0.07] rounded-xl overflow-hidden shadow-2xs">
        <div className="p-3.5 border-b border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider font-mono text-slate-900 dark:text-white">
            Employee Compensation Register
          </span>
          <span className="text-[11px] text-slate-400 dark:text-neutral-500 font-mono">
            Values denominated in USD equivalent
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 dark:bg-white/[0.02] border-b border-slate-200/80 dark:border-white/[0.06] text-slate-400 dark:text-neutral-500 font-mono text-[10px] uppercase">
              <tr>
                <th className="py-2.5 px-4">Employee</th>
                <th className="py-2.5 px-3 text-right">Base Salary</th>
                <th className="py-2.5 px-3 text-right">Allowances</th>
                <th className="py-2.5 px-3 text-right">Deductions</th>
                <th className="py-2.5 px-3 text-right">Withholdings</th>
                <th className="py-2.5 px-3 text-right">Net Disbursement</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-4 text-right">Statement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {payrolls.map((rec) => (
                <tr
                  key={rec.id}
                  className="hover:bg-slate-50/70 dark:hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={rec.employeeAvatar}
                        alt={rec.employeeName}
                        className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-white/10 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-medium text-slate-900 dark:text-white truncate">
                          {rec.employeeName}
                        </div>
                        <div className="text-[10px] text-slate-400 dark:text-neutral-500 truncate">
                          {rec.jobTitle}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-right font-mono text-slate-900 dark:text-white tabular-nums">
                    ${rec.baseSalary.toLocaleString()}
                  </td>

                  <td className="py-3 px-3 text-right font-mono text-slate-600 dark:text-neutral-300 tabular-nums">
                    +${rec.allowances.toLocaleString()}
                  </td>

                  <td className="py-3 px-3 text-right font-mono text-slate-500 dark:text-neutral-400 tabular-nums">
                    -${rec.deductions.toLocaleString()}
                  </td>

                  <td className="py-3 px-3 text-right font-mono text-slate-500 dark:text-neutral-400 tabular-nums">
                    -${rec.taxes.toLocaleString()}
                  </td>

                  <td className="py-3 px-3 text-right font-mono font-medium text-slate-950 dark:text-white tabular-nums">
                    ${rec.netSalary.toLocaleString()}
                  </td>

                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-700 dark:text-neutral-300 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-neutral-500" />
                      {rec.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedPayroll(rec)}
                      className="px-2.5 py-1 rounded text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition-colors cursor-pointer"
                    >
                      View Payslip →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Detailed Payslip Breakdown Dialog (Clean, Financial Grade) */}
      <AnimatePresence>
        {selectedPayroll && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              onClick={() => setSelectedPayroll(null)}
              className="fixed inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -6 }}
              transition={{ duration: 0.12 }}
              className="relative bg-white dark:bg-[#111215] border border-slate-200 dark:border-white/[0.1] rounded-xl max-w-md w-full p-6 shadow-2xl z-10 space-y-4"
            >
              <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-white/[0.06]">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Earnings Statement & Payslip
                  </h3>
                  <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
                    {selectedPayroll.employeeName} · {selectedPayroll.period}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPayroll(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Net Pay Box */}
              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] text-center">
                <div className="text-[10px] font-mono uppercase text-slate-400 dark:text-neutral-500">
                  Net Deposited Amount
                </div>
                <div className="text-2xl font-medium text-slate-950 dark:text-white tabular-nums mt-0.5">
                  ${selectedPayroll.netSalary.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  ACH Direct Deposit · Reconciled
                </div>
              </div>

              {/* Breakdown Line Items */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/[0.04]">
                  <span className="text-slate-500 dark:text-neutral-400">Base Salary</span>
                  <span className="font-mono text-slate-900 dark:text-white">${selectedPayroll.baseSalary.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/[0.04]">
                  <span className="text-slate-500 dark:text-neutral-400">Duty Allowances & Per Diem</span>
                  <span className="font-mono text-slate-900 dark:text-white">+${selectedPayroll.allowances.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/[0.04]">
                  <span className="text-slate-500 dark:text-neutral-400">Pre-Tax Deductions (Pension/HSA)</span>
                  <span className="font-mono text-slate-900 dark:text-white">-${selectedPayroll.deductions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 dark:text-neutral-400">Statutory Tax Withholdings</span>
                  <span className="font-mono text-slate-900 dark:text-white">-${selectedPayroll.taxes.toLocaleString()}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100 dark:border-white/[0.06]">
                <button
                  onClick={() => handlePrintPayslip(selectedPayroll)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-medium cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download / Print Official PDF</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. 6-Step Payroll Run Modal (Audit & Release Flow) */}
      <AnimatePresence>
        {runFlowOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              onClick={() => setRunFlowOpen(false)}
              className="fixed inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -6 }}
              transition={{ duration: 0.12 }}
              className="relative bg-white dark:bg-[#111215] border border-slate-200 dark:border-white/[0.1] rounded-xl max-w-xl w-full p-6 shadow-2xl z-10 space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.06]">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Execute Payroll Run Cycle
                  </h3>
                  <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
                    Step {runStep} of 6: {runSteps[runStep - 1]?.title}
                  </div>
                </div>
                <button
                  onClick={() => setRunFlowOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Stepper */}
              <div className="flex items-center gap-1">
                {runSteps.map((s) => (
                  <div
                    key={s.num}
                    className={`flex-1 h-1 rounded-full transition-colors ${
                      s.num <= runStep
                        ? "bg-slate-900 dark:bg-white"
                        : "bg-slate-200 dark:bg-white/[0.08]"
                    }`}
                  />
                ))}
              </div>

              {/* Step Content */}
              {runStep === 1 && (
                <div className="space-y-3 text-xs">
                  <p className="text-slate-600 dark:text-neutral-400">
                    Confirm target pay period and banking clearing rails:
                  </p>
                  <div className="p-3.5 rounded-lg border border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.02] space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Pay Period</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{selectedPeriod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Total Personnel Included</span>
                      <span className="font-mono text-slate-900 dark:text-white">248 FTE & Contractors</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Clearing Rails</span>
                      <span className="text-slate-900 dark:text-white">ACH / SEPA / SWIFT Wire</span>
                    </div>
                  </div>
                </div>
              )}

              {runStep === 2 && (
                <div className="space-y-3 text-xs">
                  <p className="text-slate-600 dark:text-neutral-400">
                    Personnel roster verification across 4 operational stations:
                  </p>
                  <div className="p-3.5 rounded-lg border border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.02] space-y-1.5">
                    <div className="flex justify-between text-slate-700 dark:text-neutral-300">
                      <span>Geneva HQ (86 staff)</span>
                      <span className="font-mono">$724,000 USD equiv</span>
                    </div>
                    <div className="flex justify-between text-slate-700 dark:text-neutral-300">
                      <span>Cox's Bazar Field Station (64 staff)</span>
                      <span className="font-mono">$480,000 USD equiv</span>
                    </div>
                    <div className="flex justify-between text-slate-700 dark:text-neutral-300">
                      <span>Kabul Mission Hub (54 staff)</span>
                      <span className="font-mono">$510,000 USD equiv</span>
                    </div>
                    <div className="flex justify-between text-slate-700 dark:text-neutral-300">
                      <span>Kyiv Emergency Logistics (44 staff)</span>
                      <span className="font-mono">$381,000 USD equiv</span>
                    </div>
                  </div>
                </div>
              )}

              {runStep === 3 && (
                <div className="space-y-3 text-xs">
                  <p className="text-slate-600 dark:text-neutral-400">
                    Automated anomaly detection results:
                  </p>
                  <div className="p-3.5 rounded-lg border border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.02]">
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium">
                      <Check className="w-4 h-4 text-indigo-500" />
                      <span>Zero unapproved overtime anomalies detected.</span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-neutral-400 mt-1">
                      All per diem allowances match signed duty mission authorizations.
                    </div>
                  </div>
                </div>
              )}

              {runStep === 4 && (
                <div className="space-y-3 text-xs">
                  <p className="text-slate-600 dark:text-neutral-400">
                    Statutory multi-jurisdiction tax withholding confirmation:
                  </p>
                  <div className="p-3.5 rounded-lg border border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.02] space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Statutory Tax Pool</span>
                      <span className="font-mono font-medium text-slate-900 dark:text-white">${totalTaxes.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Pre-Tax Withholdings</span>
                      <span className="font-mono font-medium text-slate-900 dark:text-white">${totalDeductions.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}

              {runStep === 5 && (
                <div className="space-y-3 text-xs">
                  <p className="text-slate-600 dark:text-neutral-400">
                    Dual authorization verification required for batch release:
                  </p>
                  <div className="p-3.5 rounded-lg border border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.02] space-y-2">
                    <div className="flex items-center gap-2 text-slate-800 dark:text-neutral-200">
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Signoff 1: Elena Rostova (CFO) — Approved</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-800 dark:text-neutral-200">
                      <Lock className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Signoff 2: Julian Vance (Executive Director) — Authorized</span>
                    </div>
                  </div>
                </div>
              )}

              {runStep === 6 && (
                <div className="py-6 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/[0.08] text-slate-900 dark:text-white flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5 text-indigo-500" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Disbursement Transmitted
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 max-w-sm mx-auto">
                    ${totalNet.toLocaleString()} USD equivalent released across SWIFT, SEPA, and local clearing rails.
                  </p>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="pt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
                {runStep > 1 && runStep < 6 ? (
                  <button
                    onClick={() => setRunStep((s) => s - 1)}
                    className="px-3 py-1.5 text-xs text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                  >
                    ← Previous
                  </button>
                ) : (
                  <div />
                )}

                {runStep < 6 ? (
                  <button
                    onClick={() => setRunStep((s) => s + 1)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-medium cursor-pointer"
                  >
                    {runStep === 5 ? "Authorize & Release Batch →" : "Continue →"}
                  </button>
                ) : (
                  <button
                    onClick={() => setRunFlowOpen(false)}
                    className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-medium cursor-pointer"
                  >
                    Close
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
