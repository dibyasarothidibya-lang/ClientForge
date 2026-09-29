"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import ThreeDCard from "@/components/motion/ThreeDCard";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Plus,
  Search,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowUpRight,
  Filter,
  Download,
  X,
  Printer,
  Sparkles,
  Lock,
} from "lucide-react";

export default function FinancePage() {
  const { campaigns, transactions, addTransaction, activeOrg } = useWorkspace();

  const [activeTab, setActiveTab] = useState<"campaigns" | "transactions" | "budgets" | "stripe">("campaigns");
  const [searchTx, setSearchTx] = useState("");
  const [txTypeFilter, setTxTypeFilter] = useState<string>("ALL");

  // Add Transaction Modal
  const [isAddTxOpen, setIsAddTxOpen] = useState(false);
  const [txType, setTxType] = useState<"Donation" | "Expense" | "Grant">("Donation");
  const [txAmount, setTxAmount] = useState(250);
  const [txDonor, setTxDonor] = useState("");
  const [txMethod, setTxMethod] = useState("Credit Card (Stripe)");

  // Selected Transaction Receipt Modal
  const [viewReceipt, setViewReceipt] = useState<any | null>(null);

  // Stripe Test Simulator
  const [stripeAmount, setStripeAmount] = useState(150);
  const [stripeDonor, setStripeDonor] = useState("Eleanor Vance");
  const [stripeCampaignId, setStripeCampaignId] = useState(campaigns[0]?.id || "");
  const [stripeProcessing, setStripeProcessing] = useState(false);
  const [stripeSuccessTx, setStripeSuccessTx] = useState<any | null>(null);

  // Aggregated totals
  const totalRaised = transactions
    .filter((t) => t.type === "Donation" || t.type === "Grant")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const netOperatingFunds = totalRaised - totalExpenses;

  // Filtered transactions
  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.donorOrVendor.toLowerCase().includes(searchTx.toLowerCase()) ||
      t.reference.toLowerCase().includes(searchTx.toLowerCase());
    const matchesType = txTypeFilter === "ALL" || t.type === txTypeFilter;
    return matchesSearch && matchesType;
  });

  const handleAddTransactionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txDonor.trim() || txAmount <= 0) return;

    addTransaction({
      type: txType,
      amount: Number(txAmount),
      status: "Succeeded",
      donorOrVendor: txDonor,
      method: txMethod,
      reference: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
    });

    setTxDonor("");
    setTxAmount(250);
    setIsAddTxOpen(false);
  };

  const handleStripeSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    setStripeProcessing(true);

    setTimeout(() => {
      const ref = `ch_test_${Math.random().toString(36).substring(2, 10)}`;
      const newTx = {
        id: `tx_${Date.now()}`,
        campaignId: stripeCampaignId,
        type: "Donation" as const,
        amount: Number(stripeAmount),
        status: "Succeeded" as const,
        donorOrVendor: stripeDonor,
        method: "Stripe Test Card (Visa •••• 4242)",
        date: "Just now",
        reference: ref,
      };

      addTransaction({
        campaignId: stripeCampaignId,
        type: "Donation",
        amount: Number(stripeAmount),
        status: "Succeeded",
        donorOrVendor: stripeDonor,
        method: "Stripe Test Card (Visa •••• 4242)",
        reference: ref,
      });

      setStripeProcessing(false);
      setStripeSuccessTx(newTx);
    }, 1200);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <DollarSign className="w-3.5 h-3.5" /> Fiscal Engine & Donor Portal
            </span>
            <span className="text-xs text-neutral-400">Multi-Currency Ledger</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-sans font-semibold tracking-tight text-neutral-100">
            Financials, Campaigns & Grants
          </h1>
          <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
            Live campaign performance, transparent donor ledgers, budget burn tracking, and integrated Stripe payments simulation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab("stripe")}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-medium text-amber-400 hover:bg-neutral-800 transition cursor-pointer"
          >
            <CreditCard className="w-4 h-4" />
            Stripe Test Console
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsAddTxOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold shadow-md shadow-emerald-500/20 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Transaction
          </motion.button>
        </div>
      </div>

      {/* 4 PRIMARY KPI CARDS WITH 3D TILT & LANDING PAGE NUMERIC TYPOGRAPHY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gross Capital Raised */}
        <ThreeDCard glareColor="#10b981" maxTilt={8} elevationZ={15} className="h-full">
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur hover:border-emerald-500/40 transition-colors flex flex-col justify-between h-full group">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider font-sans">Gross Capital Raised</span>
                <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-4 h-4" />
                </span>
              </div>
              <div className="font-sans text-3xl sm:text-4xl lg:text-5xl font-normal sm:font-medium tracking-tight text-white tabular-nums my-2">
                ${totalRaised.toLocaleString()}
              </div>
            </div>
          </div>
        </ThreeDCard>

        {/* Operational Disbursements */}
        <ThreeDCard glareColor="#ef4444" maxTilt={8} elevationZ={15} className="h-full">
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur hover:border-rose-500/40 transition-colors flex flex-col justify-between h-full group">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider font-sans">Operational Disbursements</span>
                <span className="p-2 rounded-lg bg-rose-500/10 text-rose-400 group-hover:scale-110 transition-transform">
                  <DollarSign className="w-4 h-4" />
                </span>
              </div>
              <div className="font-sans text-3xl sm:text-4xl lg:text-5xl font-normal sm:font-medium tracking-tight text-white tabular-nums my-2">
                ${totalExpenses.toLocaleString()}
              </div>
            </div>
          </div>
        </ThreeDCard>

        {/* Net Operating Reserve */}
        <ThreeDCard glareColor="#3b82f6" maxTilt={8} elevationZ={15} className="h-full">
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur hover:border-blue-500/40 transition-colors flex flex-col justify-between h-full group">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider font-sans">Net Operating Reserve</span>
                <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                  <CreditCard className="w-4 h-4" />
                </span>
              </div>
              <div className="font-sans text-3xl sm:text-4xl lg:text-5xl font-normal sm:font-medium tracking-tight text-white tabular-nums my-2">
                ${netOperatingFunds.toLocaleString()}
              </div>
            </div>
          </div>
        </ThreeDCard>

        {/* Active Campaigns */}
        <ThreeDCard glareColor="#f59e0b" maxTilt={8} elevationZ={15} className="h-full">
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur hover:border-amber-500/40 transition-colors flex flex-col justify-between h-full group">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider font-sans">Active Campaigns</span>
                <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-4 h-4" />
                </span>
              </div>
              <div className="font-sans text-3xl sm:text-4xl lg:text-5xl font-normal sm:font-medium tracking-tight text-white tabular-nums my-2">
                {campaigns.length}
              </div>
            </div>
          </div>
        </ThreeDCard>
      </div>

      {/* Tabs Navigation with Spring Sliding Pill */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-2 relative font-sans text-xs font-medium">
        {[
          { id: "campaigns", label: `Public Campaigns (${campaigns.length})` },
          { id: "transactions", label: `Transactions Ledger (${transactions.length})` },
          { id: "budgets", label: "Departmental Budgets" },
          { id: "stripe", label: "Stripe Sandbox", icon: CreditCard },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          const TabIcon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative px-4 py-2 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? tab.id === "stripe" ? "text-amber-400 font-semibold" : "text-white font-semibold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="financeTabIndicator"
                  className="absolute inset-0 bg-neutral-800 rounded-lg shadow-sm"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              {TabIcon && <TabIcon className="w-3.5 h-3.5 relative z-10" />}
              <span className="relative z-10">{tab.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* TAB 1: PUBLIC CAMPAIGNS */}
      {activeTab === "campaigns" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((camp) => {
            const percent = Math.min(100, Math.round((camp.raised / camp.goal) * 100));
            return (
              <motion.div
                key={camp.id}
                whileHover={{ y: -4, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="rounded-2xl bg-neutral-900/60 border border-neutral-800 overflow-hidden flex flex-col justify-between hover:border-emerald-500/40 transition shadow-lg"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-sans font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {camp.status}
                    </span>
                    <span className="text-xs text-neutral-400 font-sans">Ends {camp.endDate}</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-sans font-semibold text-neutral-100">{camp.title}</h3>
                    <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">{camp.description}</p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-sans">
                      <span className="font-sans font-medium text-white tabular-nums">${camp.raised.toLocaleString()} raised</span>
                      <span className="text-neutral-400 tabular-nums">${camp.goal.toLocaleString()} goal ({percent}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-800/80 font-sans">
                    <span>{camp.donorCount} Community Backers</span>
                    <span>Avg Gift: ${Math.round(camp.raised / (camp.donorCount || 1))}</span>
                  </div>
                </div>

                <div className="px-6 py-3 bg-neutral-950/60 border-t border-neutral-800/80 flex items-center justify-between font-sans">
                  <Link
                    href={`/campaigns/${camp.slug}`}
                    target="_blank"
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1"
                  >
                    Open Public Portal <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => {
                      setStripeCampaignId(camp.id);
                      setActiveTab("stripe");
                    }}
                    className="text-xs font-medium text-neutral-400 hover:text-white cursor-pointer"
                  >
                    Simulate Donation
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* TAB 2: TRANSACTIONS LEDGER */}
      {activeTab === "transactions" && (
        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTx}
                onChange={(e) => setSearchTx(e.target.value)}
                placeholder="Search donors, vendors, refs..."
                className="w-full bg-neutral-950/70 border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={txTypeFilter}
                onChange={(e) => setTxTypeFilter(e.target.value)}
                className="bg-neutral-950/70 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-300 focus:outline-none"
              >
                <option value="ALL">All Transaction Types</option>
                <option value="Donation">Donations</option>
                <option value="Expense">Disbursements</option>
                <option value="Grant">Grants</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                  <th className="py-3 px-3">Reference</th>
                  <th className="py-3 px-3">Counterparty</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">Payment Method</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3 text-right">Amount</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 text-xs">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-neutral-800/30 transition">
                    <td className="py-3 px-3 font-sans text-xs text-neutral-400 whitespace-nowrap">{tx.reference}</td>
                    <td className="py-3 px-3 font-medium text-neutral-200">{tx.donorOrVendor}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                          tx.type === "Donation"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : tx.type === "Grant"
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        }`}
                      >
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-neutral-400">{tx.method}</td>
                    <td className="py-3 px-3 text-neutral-400 whitespace-nowrap">{tx.date}</td>
                    <td
                      className={`py-3 px-3 text-right font-medium whitespace-nowrap ${
                        tx.type === "Expense" ? "text-rose-400" : "text-emerald-400"
                      }`}
                    >
                      {tx.type === "Expense" ? "-" : "+"}${tx.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setViewReceipt(tx)}
                        className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium"
                      >
                        Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: BUDGETS & ALLOCATIONS */}
      {activeTab === "budgets" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { dept: "Clean Water Field Operations", budget: 350000, spent: 280000, color: "from-blue-500 to-cyan-400" },
            { dept: "Disaster Emergency Relocation", budget: 200000, spent: 145000, color: "from-amber-500 to-yellow-400" },
            { dept: "Community Solar & Energy", budget: 150000, spent: 65000, color: "from-emerald-500 to-teal-400" },
            { dept: "Administrative & Compliance", budget: 75000, spent: 52000, color: "from-purple-500 to-pink-400" },
          ].map((b) => {
            const pct = Math.round((b.spent / b.budget) * 100);
            return (
              <div
                key={b.dept}
                className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-medium text-neutral-100">{b.dept}</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">Annual Operating Envelope 2026</p>
                  </div>
                  <span className="text-xs font-semibold text-neutral-300 px-2.5 py-1 rounded bg-neutral-800">
                    {pct}% Spent
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Spent: ${b.spent.toLocaleString()}</span>
                    <span className="text-neutral-200 font-medium">Budget: ${b.budget.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-neutral-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${b.color}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-neutral-800/80">
                  <span className="text-neutral-400">Remaining Variance:</span>
                  <span className="text-emerald-400 font-medium">${(b.budget - b.spent).toLocaleString()} available</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 4: STRIPE SANDBOX SIMULATOR */}
      {activeTab === "stripe" && (
        <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 backdrop-blur shadow-2xl space-y-6">
          <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-medium text-neutral-100">Live Stripe Payment Gateway Sandbox</h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Test transactions instantly trigger webhook dispatches, update ledger accounts, and issue 501(c)(3) receipts.
              </p>
            </div>
          </div>

          <form onSubmit={handleStripeSimulate} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Target Campaign</label>
              <select
                value={stripeCampaignId}
                onChange={(e) => setStripeCampaignId(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
              >
                {campaigns.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} (Goal: ${c.goal.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Donor Full Name</label>
                <input
                  type="text"
                  required
                  value={stripeDonor}
                  onChange={(e) => setStripeDonor(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Donation Amount ($ USD)</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={stripeAmount}
                  onChange={(e) => setStripeAmount(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Payment Method</span>
                <span className="flex items-center gap-1 text-emerald-400 font-sans font-medium">
                  <Lock className="w-3 h-3" /> Stripe PCI-DSS Compliant Test Mode
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-900 border border-neutral-800 font-sans font-medium text-xs text-neutral-200">
                <span>4242 •••• •••• 4242</span>
                <span>08/28 • CVC 123</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={stripeProcessing}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black text-sm font-semibold shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-2"
            >
              {stripeProcessing ? (
                <>Processing Test Card Authorization...</>
              ) : (
                <>Charge ${stripeAmount} via Stripe Sandbox</>
              )}
            </button>
          </form>

          {stripeSuccessTx && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm">
                  <CheckCircle2 className="w-5 h-5" /> Payment Successful & Logged!
                </div>
                <button
                  onClick={() => setViewReceipt(stripeSuccessTx)}
                  className="text-xs font-semibold text-emerald-300 underline"
                >
                  View Official Receipt
                </button>
              </div>
              <p className="text-xs text-neutral-300">
                Transaction reference <strong>{stripeSuccessTx.reference}</strong> for ${stripeSuccessTx.amount} from {stripeSuccessTx.donorOrVendor} was written to the immutable ledger.
              </p>
            </div>
          )}
        </div>
      )}

      {/* MODAL: OFFICIAL RECEIPT */}
      <AnimatePresence>
        {viewReceipt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
              className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-md p-6 space-y-6 shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-sans font-bold text-xs">
                    CF
                  </div>
                  <span className="text-xs text-neutral-400 uppercase tracking-wider font-semibold font-sans">Official Receipt</span>
                </div>
                <button
                  onClick={() => setViewReceipt(null)}
                  className="p-1 rounded text-neutral-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center py-2 space-y-1">
                <div className="font-sans text-3xl sm:text-4xl font-normal sm:font-medium tracking-tight text-white tabular-nums">
                  ${viewReceipt.amount.toLocaleString()}
                </div>
                <div className="text-xs text-emerald-400 font-medium font-sans">Payment Completed & Verified</div>
              </div>

              <div className="space-y-2 text-xs bg-neutral-950 p-4 rounded-xl border border-neutral-800 font-sans">
                <div className="flex justify-between text-neutral-400">
                  <span>Receipt Ref:</span>
                  <span className="text-neutral-200 font-medium">{viewReceipt.reference}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Entity:</span>
                  <span className="text-neutral-200 font-medium">{activeOrg.name}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Payer / Donor:</span>
                  <span className="text-neutral-200 font-medium">{viewReceipt.donorOrVendor}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Payment Method:</span>
                  <span className="text-neutral-200 font-medium">{viewReceipt.method}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Tax Exemption:</span>
                  <span className="text-neutral-200 font-medium">501(c)(3) Eligible</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 font-sans font-medium">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" /> Print Receipt
                </button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setViewReceipt(null)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold cursor-pointer shadow-sm"
                >
                  Done
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL: ADD TRANSACTION */}
      <AnimatePresence>
        {isAddTxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.form
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
              onSubmit={handleAddTransactionSubmit}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <h3 className="text-base font-medium text-neutral-100">Add Manual Ledger Entry</h3>
                <button
                  type="button"
                  onClick={() => setIsAddTxOpen(false)}
                  className="p-1 rounded text-neutral-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Entry Type</label>
                <select
                  value={txType}
                  onChange={(e) => setTxType(e.target.value as any)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none cursor-pointer"
                >
                  <option value="Donation">Donation</option>
                  <option value="Grant">Grant</option>
                  <option value="Expense">Disbursement / Expense</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Donor, Grantor or Vendor Name *
                </label>
                <input
                  type="text"
                  required
                  value={txDonor}
                  onChange={(e) => setTxDonor(e.target.value)}
                  placeholder="e.g. Global Water Alliance Foundation"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Amount ($ USD) *</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={txAmount}
                  onChange={(e) => setTxAmount(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Payment Method</label>
                <select
                  value={txMethod}
                  onChange={(e) => setTxMethod(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none cursor-pointer"
                >
                  <option value="Credit Card (Stripe)">Credit Card (Stripe)</option>
                  <option value="Wire Transfer / ACH">Wire Transfer / ACH</option>
                  <option value="Institutional Grant Check">Institutional Grant Check</option>
                  <option value="Direct Debit">Direct Debit</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsAddTxOpen(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-medium hover:bg-neutral-700 cursor-pointer"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold shadow transition cursor-pointer"
                >
                  Record Entry
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
