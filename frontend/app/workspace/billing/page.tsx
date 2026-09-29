"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import ThreeDCard from "@/components/motion/ThreeDCard";
import {
  CreditCard,
  Building2,
  Users,
  ShieldCheck,
  Download,
  AlertTriangle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  X,
  Lock,
  Plus,
  ArrowRight,
  RefreshCw,
  FileText,
  Sparkles
} from "lucide-react";

export default function WorkspaceBillingPage() {
  const { activeOrg, members } = useWorkspace();

  const [currentPlan, setCurrentPlan] = useState<"Professional" | "Business" | "Enterprise">("Business");
  const [billingCycle, setBillingCycle] = useState<"Annual" | "Monthly">("Annual");
  const [seatsAllowed, setSeatsAllowed] = useState(25);
  const seatsUsed = members.length; // 14
  const monthlyRatePerSeat = billingCycle === "Annual" ? 11 : 14;
  const currentTotalPerMonth = seatsAllowed * monthlyRatePerSeat;

  // Modals
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [isDowngradeOpen, setIsDowngradeOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isPaymentMethodOpen, setIsPaymentMethodOpen] = useState(false);

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState({
    brand: "Visa",
    last4: "4242",
    exp: "08/28",
    name: "Eleanor Vance"
  });

  // Modal actions
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  // Invoices list
  const [invoices, setInvoices] = useState([
    { id: "INV-2026-004", date: "Sep 15, 2026", amount: "$3,300.00", status: "Paid", pdfUrl: "#" },
    { id: "INV-2026-003", date: "Aug 15, 2026", amount: "$3,300.00", status: "Paid", pdfUrl: "#" },
    { id: "INV-2026-002", date: "Jul 15, 2026", amount: "$3,300.00", status: "Paid", pdfUrl: "#" },
    { id: "INV-2026-001", date: "Jun 15, 2026", amount: "$3,300.00", status: "Paid", pdfUrl: "#" },
  ]);

  const triggerSuccessAlert = (msg: string) => {
    setActionSuccessMessage(msg);
    setTimeout(() => setActionSuccessMessage(null), 3000);
  };

  const handleDownloadInvoice = (inv: typeof invoices[0]) => {
    alert(`Downloading receipt for invoice ${inv.id} (${inv.amount}) in statutory PDF format.`);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-neutral-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              <CreditCard className="w-3.5 h-3.5" /> Subscription & Financial Ledger
            </span>
            <span className="text-xs text-slate-500 dark:text-neutral-400">Stripe Customer ID: cus_N9x2kL80q</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-neutral-100">
            Billing & Enterprise Plan Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 mt-1">
            Manage your PeopleCore subscription tier, seat capacity allocation, payment methods, and tax invoice history.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsUpgradeOpen(true)}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" /> Change Plan or Seats
          </button>
        </div>
      </div>

      {/* Action Notification Banner */}
      <AnimatePresence>
        {actionSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 text-xs text-emerald-800 dark:text-emerald-300 font-semibold"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{actionSuccessMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4 Summary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ThreeDCard glareColor="#6366f1" maxTilt={6} elevationZ={10}>
          <div className="p-5 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Current Plan</span>
            <div className="text-2xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
              <span>PeopleCore {currentPlan}</span>
            </div>
            <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
              ${monthlyRatePerSeat} / emp / mo ({billingCycle})
            </div>
          </div>
        </ThreeDCard>

        <ThreeDCard glareColor="#10b981" maxTilt={6} elevationZ={10}>
          <div className="p-5 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Seat Utilization</span>
            <div className="text-2xl font-bold text-slate-950 dark:text-white">
              {seatsUsed} / {seatsAllowed} Seats
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-neutral-800 overflow-hidden mt-1">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${(seatsUsed / seatsAllowed) * 100}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-400 mt-1">{seatsAllowed - seatsUsed} available seats</div>
          </div>
        </ThreeDCard>

        <ThreeDCard glareColor="#3b82f6" maxTilt={6} elevationZ={10}>
          <div className="p-5 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Next Billing Renewal</span>
            <div className="text-2xl font-bold text-slate-950 dark:text-white">Nov 15, 2026</div>
            <div className="text-xs text-slate-500">Auto-renews on Visa •••• {paymentMethod.last4}</div>
          </div>
        </ThreeDCard>

        <ThreeDCard glareColor="#f59e0b" maxTilt={6} elevationZ={10}>
          <div className="p-5 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Monthly Burn Rate</span>
            <div className="text-2xl font-bold text-slate-950 dark:text-white">${currentTotalPerMonth}.00</div>
            <div className="text-xs text-emerald-600 font-medium">Billed ${currentTotalPerMonth * 12}/year (20% saved)</div>
          </div>
        </ThreeDCard>
      </div>

      {/* Subscription Details & Payment Method Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Subscription Overview & Management Actions */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-white/[0.06]">
            <div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">Active Plan Privileges</h3>
              <p className="text-xs text-slate-500">What is enabled on your {currentPlan} subscription</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 w-fit">
              Active & Paid
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-white/[0.04]">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-slate-800 dark:text-neutral-200">Automated Multi-State Payroll & Tax Calculation</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-white/[0.04]">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-slate-800 dark:text-neutral-200">NACHA Direct Deposit Transmission</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-white/[0.04]">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-slate-800 dark:text-neutral-200">Full ATS Recruitment Pipeline & Scorecards</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-white/[0.04]">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-slate-800 dark:text-neutral-200">Unlimited Event-Driven HR Automations</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-white/[0.04]">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-slate-800 dark:text-neutral-200">360 Review Cycles & Interactive OKR Calibration</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-white/[0.04]">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-slate-800 dark:text-neutral-200">7-Year WORM Storage & SOC-2 Audit Logging</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsUpgradeOpen(true)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-xs cursor-pointer"
              >
                Upgrade to Enterprise
              </button>
              <button
                onClick={() => setIsDowngradeOpen(true)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 text-slate-800 dark:text-neutral-200 text-xs font-semibold cursor-pointer"
              >
                Downgrade Plan
              </button>
            </div>

            <button
              onClick={() => setIsCancelOpen(true)}
              className="text-xs text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
            >
              Cancel Subscription
            </button>
          </div>
        </div>

        {/* Right 1 Col: Payment Method Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-950 dark:text-white">Default Payment Method</h3>
              <span className="p-1 rounded bg-slate-100 dark:bg-neutral-800 text-slate-500">
                <Lock className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white space-y-3 shadow-md">
              <div className="flex justify-between items-center text-xs opacity-75">
                <span>Corporate Credit Card</span>
                <span className="font-mono font-bold tracking-widest">{paymentMethod.brand}</span>
              </div>
              <div className="font-mono text-lg tracking-wider">
                •••• •••• •••• {paymentMethod.last4}
              </div>
              <div className="flex justify-between items-center text-[10px] opacity-75">
                <span>{paymentMethod.name}</span>
                <span>EXP: {paymentMethod.exp}</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 mt-3">
              Payments processed securely via Stripe. Invoices automatically sent to billing contact.
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-white/[0.06]">
            <button
              onClick={() => setIsPaymentMethodOpen(true)}
              className="w-full py-2 rounded-xl bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 text-slate-900 dark:text-white text-xs font-semibold transition cursor-pointer"
            >
              Update Payment Method
            </button>
          </div>
        </div>
      </div>

      {/* Invoice History Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-950 dark:text-white">Invoice & Payment History</h3>
            <p className="text-xs text-slate-500">Download itemized statutory tax invoices and payment receipts.</p>
          </div>
          <span className="text-xs font-mono text-slate-400">All amounts in USD ($)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-neutral-800 text-slate-500 font-semibold">
                <th className="py-2.5 px-3">Invoice Number</th>
                <th className="py-2.5 px-3">Billing Date</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-neutral-800/60">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-neutral-900/40 transition">
                  <td className="py-3 px-3 font-mono font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{inv.id}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-neutral-400">{inv.date}</td>
                  <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">{inv.amount}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => handleDownloadInvoice(inv)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 hover:text-indigo-600 text-[11px] font-medium inline-flex items-center gap-1 cursor-pointer transition"
                    >
                      <Download className="w-3 h-3" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* UPGRADE MODAL */}
      <AnimatePresence>
        {isUpgradeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.1] rounded-2xl p-6 shadow-2xl space-y-4 text-left relative"
            >
              <button
                onClick={() => setIsUpgradeOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-5 h-5" />
                <h3 className="text-lg font-bold text-slate-950 dark:text-white">Upgrade or Adjust Capacity</h3>
              </div>
              <p className="text-xs text-slate-500">
                Scale your seat capacity or transition to Enterprise single-tenant security.
              </p>

              <div className="space-y-3 text-xs pt-1">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                    Select Target Plan
                  </label>
                  <select
                    value={currentPlan}
                    onChange={(e) => setCurrentPlan(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white cursor-pointer"
                  >
                    <option value="Professional">PeopleCore Professional ($8/emp/mo)</option>
                    <option value="Business">PeopleCore Business ($14/emp/mo - Current)</option>
                    <option value="Enterprise">PeopleCore Enterprise (Custom Pricing / SLA)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                    Employee Seat Allocation ({seatsAllowed} Seats Currently)
                  </label>
                  <input
                    type="range"
                    min="15"
                    max="100"
                    step="5"
                    value={seatsAllowed}
                    onChange={(e) => setSeatsAllowed(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                    <span>15 seats (min)</span>
                    <span className="font-bold text-indigo-600">{seatsAllowed} active licenses</span>
                    <span>100 seats</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-white/[0.04] text-[11px] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">New Monthly Total:</span>
                    <span className="font-bold text-slate-900 dark:text-white">${seatsAllowed * monthlyRatePerSeat}.00 / mo</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Prorated credit applied today:</span>
                    <span className="text-emerald-600">-$42.50 USD</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => setIsUpgradeOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsUpgradeOpen(false);
                    triggerSuccessAlert(`Plan updated successfully! Your account now has ${seatsAllowed} active employee seats.`);
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md"
                >
                  Confirm Plan Upgrade
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* UPDATE PAYMENT METHOD MODAL */}
      <AnimatePresence>
        {isPaymentMethodOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.1] rounded-2xl p-6 shadow-2xl space-y-4 text-left relative"
            >
              <button
                onClick={() => setIsPaymentMethodOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <CreditCard className="w-5 h-5" />
                <h3 className="text-lg font-bold text-slate-950 dark:text-white">Update Card Information</h3>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsPaymentMethodOpen(false);
                  triggerSuccessAlert("Payment card updated and verified with Stripe Elements.");
                }}
                className="space-y-3 text-xs"
              >
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    defaultValue={paymentMethod.name}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">Card Number</label>
                  <input
                    type="text"
                    defaultValue="•••• •••• •••• 9921"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">Expiration</label>
                    <input
                      type="text"
                      defaultValue="04/29"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">CVC</label>
                    <input
                      type="text"
                      defaultValue="771"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPaymentMethodOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md"
                  >
                    Save New Card
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CANCEL MODAL */}
      <AnimatePresence>
        {isCancelOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white dark:bg-[#121216] border border-rose-500/30 rounded-2xl p-6 shadow-2xl space-y-4 text-left relative"
            >
              <div className="flex items-center gap-2 text-rose-600">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="text-lg font-bold">Cancel Subscription?</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed">
                If you cancel, your PeopleCore organization will transition to the Free plan at the end of your billing cycle (Nov 15, 2026).
              </p>
              <ul className="text-xs text-slate-500 list-disc list-inside space-y-1">
                <li>Automated payroll runs will be paused</li>
                <li>ATS candidate pipelines will be locked</li>
                <li>Your employee records remain securely archived</li>
              </ul>

              <div className="pt-2 flex justify-end gap-2 text-xs font-semibold">
                <button
                  onClick={() => setIsCancelOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300"
                >
                  Keep Subscription
                </button>
                <button
                  onClick={() => {
                    setIsCancelOpen(false);
                    triggerSuccessAlert("Cancellation scheduled for the end of the billing cycle (Nov 15, 2026).");
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white shadow-md"
                >
                  Confirm Cancellation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
