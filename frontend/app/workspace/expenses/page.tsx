"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import { ExpenseRecord } from "@/lib/peopleCoreData";
import ThreeDCard from "@/components/motion/ThreeDCard";
import {
  CreditCard,
  DollarSign,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  FileText,
  Upload,
  Calendar,
  Building2,
  X,
  Receipt
} from "lucide-react";

export default function ExpensesPage() {
  const { expenses, addExpense, approveExpense, rejectExpense } = useWorkspace();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedExpense, setSelectedExpense] = useState<ExpenseRecord | null>(null);

  // New expense modal
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [category, setCategory] = useState<ExpenseRecord["category"]>("Software & Tools");
  const [amount, setAmount] = useState(150.0);
  const [merchant, setMerchant] = useState("");
  const [description, setDescription] = useState("");

  const filteredExpenses = expenses.filter((e) => {
    const matchesSearch =
      e.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = filterCategory === "All" || e.category === filterCategory;
    const matchesStat = filterStatus === "All" || e.status === filterStatus;
    return matchesSearch && matchesCat && matchesStat;
  });

  const totalExpenseVal = expenses.reduce((acc, e) => acc + e.amount, 0);
  const pendingCount = expenses.filter((e) => e.status === "Pending").length;
  const approvedCount = expenses.filter((e) => e.status === "Approved").length;
  const reimbursedCount = expenses.filter((e) => e.status === "Reimbursed").length;

  const handleSubmitExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!merchant || !amount) return;
    addExpense({
      employeeId: "usr_curr",
      employeeName: "Dr. Sarah Lin",
      employeeAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80",
      department: "Executive & Governance",
      category,
      amount: Number(amount),
      currency: "USD",
      merchant,
      description: description || "Corporate operational expense.",
      approver: "Julian Vance (CFO)",
    });
    setSubmitModalOpen(false);
    setMerchant("");
    setDescription("");
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
            Corporate Cards & Reimbursements
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-white tracking-tight">
            Expenses & Receipts
          </h1>
          <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
            Employee corporate spend reconciliations, receipt OCR validation, category limits, and direct reimbursement payouts.
          </p>
        </div>

        <button
          onClick={() => setSubmitModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-semibold flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Submit Expense</span>
        </button>
      </div>

      {/* 4 Expense KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <ThreeDCard glareColor="#f59e0b" maxTilt={6} elevationZ={10} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Pending Review</span>
              <span className="text-[10px] text-amber-600 font-semibold">{pendingCount} claims</span>
            </div>
            <div className="text-2xl font-bold text-slate-950 dark:text-white tabular-nums">
              ${expenses.filter((e) => e.status === "Pending").reduce((acc, e) => acc + e.amount, 0).toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Receipts attached</div>
          </div>
        </ThreeDCard>

        <ThreeDCard glareColor="#10b981" maxTilt={6} elevationZ={10} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Approved (Unpaid)</span>
              <span className="text-[10px] text-emerald-600 font-semibold">{approvedCount} claims</span>
            </div>
            <div className="text-2xl font-bold text-slate-950 dark:text-white tabular-nums">
              ${expenses.filter((e) => e.status === "Approved").reduce((acc, e) => acc + e.amount, 0).toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Queued for Friday batch</div>
          </div>
        </ThreeDCard>

        <ThreeDCard glareColor="#3b82f6" maxTilt={6} elevationZ={10} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Reimbursed (Month)</span>
              <span className="text-[10px] text-blue-600 font-semibold">{reimbursedCount} claims</span>
            </div>
            <div className="text-2xl font-bold text-slate-950 dark:text-white tabular-nums">
              ${expenses.filter((e) => e.status === "Reimbursed").reduce((acc, e) => acc + e.amount, 0).toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Direct deposit credited</div>
          </div>
        </ThreeDCard>

        <ThreeDCard glareColor="#6366f1" maxTilt={6} elevationZ={10} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Total Spend Claims</span>
              <span className="text-[10px] text-indigo-600 font-semibold">YTD</span>
            </div>
            <div className="text-2xl font-bold text-slate-950 dark:text-white tabular-nums">
              ${totalExpenseVal.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Within budget policy limits</div>
          </div>
        </ThreeDCard>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search employee, merchant, or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-sans"
          />
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] rounded-xl text-xs text-slate-800 dark:text-white outline-none font-sans font-medium cursor-pointer"
        >
          <option value="All">All Categories</option>
          <option value="Travel & Flights">Travel & Flights</option>
          <option value="Software & Tools">Software & Tools</option>
          <option value="Client Entertainment">Client Entertainment</option>
          <option value="Home Office">Home Office</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] rounded-xl text-xs text-slate-800 dark:text-white outline-none font-sans font-medium cursor-pointer"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Reimbursed">Reimbursed</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* EXPENSE TABLE */}
      <div className="rounded-3xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0c0c0e] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 dark:border-white/[0.08] bg-slate-50/70 dark:bg-white/[0.02] text-slate-500 dark:text-neutral-400 font-sans font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Employee</th>
                <th className="py-3.5 px-4">Merchant / Description</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {filteredExpenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-slate-50/60 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={exp.employeeAvatar}
                        alt={exp.employeeName}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-white/10"
                      />
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">{exp.employeeName}</div>
                        <div className="text-[11px] text-slate-500">{exp.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900 dark:text-white">{exp.merchant}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">{exp.description}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-neutral-300">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.04] text-[10px]">
                      {exp.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">{exp.date}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-950 dark:text-white tabular-nums text-sm">
                    ${exp.amount.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        exp.status === "Reimbursed"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                          : exp.status === "Approved"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          : exp.status === "Pending"
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                          : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
                      }`}
                    >
                      {exp.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedExpense(exp)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-xs font-medium text-slate-800 dark:text-white transition-colors cursor-pointer"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EXPENSE DETAIL / RECEIPT REVIEW MODAL */}
      <AnimatePresence>
        {selectedExpense && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExpense(null)}
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
                  <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Expense Reimbursement Claim</h3>
                  <div className="text-xs text-slate-500">Submitted by {selectedExpense.employeeName}</div>
                </div>
                <button
                  onClick={() => setSelectedExpense(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Amount badge */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                <span className="text-xs text-amber-800 dark:text-amber-300 font-medium">Claim Amount</span>
                <div className="text-3xl font-bold text-amber-950 dark:text-amber-200 tabular-nums my-0.5">
                  ${selectedExpense.amount.toFixed(2)} USD
                </div>
                <span className="text-[10px] text-slate-400">Assigned Approver: {selectedExpense.approver}</span>
              </div>

              {/* Receipt Preview Mock */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <Receipt className="w-5 h-5 text-indigo-500" />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">receipt_itemized.pdf</div>
                    <div className="text-[10px] text-slate-400">Verified OCR metadata matched</div>
                  </div>
                </div>
                <button
                  onClick={() => alert("Previewing verified receipt document.")}
                  className="px-2.5 py-1 rounded-lg bg-slate-200/70 dark:bg-white/10 text-slate-700 dark:text-neutral-300 text-xs font-medium"
                >
                  Preview
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between border-b border-slate-100 dark:border-white/[0.04] pb-2">
                  <span className="text-slate-400">Merchant:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{selectedExpense.merchant}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-white/[0.04] pb-2">
                  <span className="text-slate-400">Category:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{selectedExpense.category}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-white/[0.04] pb-2">
                  <span className="text-slate-400">Business Justification:</span>
                  <span className="text-slate-800 dark:text-neutral-200 max-w-xs text-right">{selectedExpense.description}</span>
                </div>
              </div>

              {selectedExpense.status === "Pending" && (
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      approveExpense(selectedExpense.id);
                      setSelectedExpense(null);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs cursor-pointer shadow-md"
                  >
                    Approve for Reimbursement
                  </button>
                  <button
                    onClick={() => {
                      rejectExpense(selectedExpense.id);
                      setSelectedExpense(null);
                    }}
                    className="px-4 py-2.5 rounded-xl border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-50 text-xs font-semibold cursor-pointer"
                  >
                    Reject Claim
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SUBMIT EXPENSE MODAL */}
      <AnimatePresence>
        {submitModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSubmitModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white dark:bg-[#121215] border border-slate-200 dark:border-white/[0.12] rounded-3xl max-w-md w-full p-6 shadow-2xl z-10 space-y-4"
            >
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Submit Expense Claim</h3>
              <form onSubmit={handleSubmitExpense} className="space-y-4 text-xs font-sans">
                <div>
                  <label className="text-slate-500 block mb-1 font-medium">Merchant / Vendor *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AWS Cloud Services"
                    value={merchant}
                    onChange={(e) => setMerchant(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-500 block mb-1 font-medium">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] outline-none"
                    >
                      <option value="Software & Tools">Software & Tools</option>
                      <option value="Travel & Flights">Travel & Flights</option>
                      <option value="Client Entertainment">Client Entertainment</option>
                      <option value="Home Office">Home Office</option>
                      <option value="Wellness">Wellness</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-500 block mb-1 font-medium">Amount (USD) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-slate-500 block mb-1 font-medium">Business Purpose</label>
                  <textarea
                    rows={3}
                    placeholder="Describe how this expenditure relates to client operations..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-500 block mb-1 font-medium">Attach Receipt (PDF/PNG)</label>
                  <div className="p-4 border-2 border-dashed border-slate-200 dark:border-white/[0.08] rounded-xl text-center text-slate-400 cursor-pointer hover:border-indigo-500 transition-colors">
                    <Upload className="w-5 h-5 mx-auto mb-1 text-slate-400" />
                    <span>Click or drag receipt file to upload</span>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-semibold text-xs cursor-pointer shadow-md"
                  >
                    Submit for Approval
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubmitModalOpen(false)}
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
