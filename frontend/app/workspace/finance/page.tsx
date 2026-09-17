"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useWorkspace } from "@/context/WorkspaceContext";
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
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <DollarSign className="w-3.5 h-3.5" /> Fiscal Engine & Donor Portal
            </span>
            <span className="text-xs text-neutral-400">Multi-Currency Ledger</span>
          </div>
          <h1 className="text-3xl font-serif font-light tracking-tight text-neutral-100">
            Financials, Campaigns & Grants
          </h1>
          <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
            Live campaign performance, transparent donor ledgers, budget burn tracking, and integrated Stripe payments simulation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("stripe")}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-medium text-amber-400 hover:bg-neutral-800 transition"
          >
            <CreditCard className="w-4 h-4" />
            Stripe Test Console
          </button>
          <button
            onClick={() => setIsAddTxOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold shadow-md shadow-emerald-500/20 transition"
          >
            <Plus className="w-4 h-4" />
            Add Transaction
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider">Gross Capital Raised</span>
            <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-serif font-light text-neutral-100 mt-2">
            ${totalRaised.toLocaleString()}
          </div>
          <div className="text-xs text-emerald-400 mt-1">+18.4% vs previous quarter</div>
        </div>

        <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider">Operational Disbursements</span>
            <span className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-serif font-light text-neutral-100 mt-2">
            ${totalExpenses.toLocaleString()}
          </div>
          <div className="text-xs text-neutral-400 mt-1">Direct program expenses & grants</div>
        </div>

        <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider">Net Operating Reserve</span>
            <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <CreditCard className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-serif font-light text-neutral-100 mt-2">
            ${netOperatingFunds.toLocaleString()}
          </div>
          <div className="text-xs text-neutral-400 mt-1">Available across unrestricted funds</div>
        </div>

        <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider">Active Campaigns</span>
            <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Sparkles className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-serif font-light text-neutral-100 mt-2">
            {campaigns.length}
          </div>
          <div className="text-xs text-amber-400 mt-1">Public donation portals live</div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
        <button
          onClick={() => setActiveTab("campaigns")}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition ${
            activeTab === "campaigns"
              ? "bg-neutral-800 text-white shadow"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          Public Campaigns ({campaigns.length})
        </button>
        <button
          onClick={() => setActiveTab("transactions")}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition ${
            activeTab === "transactions"
              ? "bg-neutral-800 text-white shadow"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          Transactions Ledger ({transactions.length})
        </button>
        <button
          onClick={() => setActiveTab("budgets")}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition ${
            activeTab === "budgets"
              ? "bg-neutral-800 text-white shadow"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          Departmental Budgets
        </button>
        <button
          onClick={() => setActiveTab("stripe")}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
            activeTab === "stripe"
              ? "bg-neutral-800 text-amber-400 shadow"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" /> Stripe Sandbox
        </button>
      </div>

      {/* TAB 1: PUBLIC CAMPAIGNS */}
      {activeTab === "campaigns" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((camp) => {
            const percent = Math.min(100, Math.round((camp.raised / camp.goal) * 100));
            return (
              <div
                key={camp.id}
                className="rounded-2xl bg-neutral-900/60 border border-neutral-800 overflow-hidden flex flex-col justify-between hover:border-neutral-700 transition"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {camp.status}
                    </span>
                    <span className="text-xs text-neutral-400">Ends {camp.endDate}</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-serif font-light text-neutral-100">{camp.title}</h3>
                    <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{camp.description}</p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-white">${camp.raised.toLocaleString()} raised</span>
                      <span className="text-neutral-400">${camp.goal.toLocaleString()} goal ({percent}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-800/80">
                    <span>{camp.donorCount} Community Backers</span>
                    <span>Avg Gift: ${Math.round(camp.raised / (camp.donorCount || 1))}</span>
                  </div>
                </div>

                <div className="px-6 py-3 bg-neutral-950/60 border-t border-neutral-800/80 flex items-center justify-between">
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
                    className="text-xs font-medium text-neutral-400 hover:text-white"
                  >
                    Simulate Donation
                  </button>
                </div>
              </div>
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
                    <td className="py-3 px-3 font-mono text-[11px] text-neutral-400">{tx.reference}</td>
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
                <span className="flex items-center gap-1 text-emerald-400 font-mono">
                  <Lock className="w-3 h-3" /> Stripe PCI-DSS Compliant Test Mode
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-900 border border-neutral-800 font-mono text-xs text-neutral-200">
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
      {viewReceipt && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-md p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-serif font-bold">
                  CF
                </div>
                <span className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Official Receipt</span>
              </div>
              <button
                onClick={() => setViewReceipt(null)}
                className="p-1 rounded text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center py-2 space-y-1">
              <div className="text-3xl font-serif font-light text-neutral-100">
                ${viewReceipt.amount.toLocaleString()}
              </div>
              <div className="text-xs text-emerald-400 font-medium">Payment Completed & Verified</div>
            </div>

            <div className="space-y-2 text-xs bg-neutral-950 p-4 rounded-xl border border-neutral-800 font-mono">
              <div className="flex justify-between text-neutral-400">
                <span>Receipt Ref:</span>
                <span className="text-neutral-200">{viewReceipt.reference}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Entity:</span>
                <span className="text-neutral-200">{activeOrg.name}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Payer / Donor:</span>
                <span className="text-neutral-200">{viewReceipt.donorOrVendor}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Payment Method:</span>
                <span className="text-neutral-200">{viewReceipt.method}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Tax Exemption:</span>
                <span className="text-neutral-200">501(c)(3) Eligible</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" /> Print Receipt
              </button>
              <button
                onClick={() => setViewReceipt(null)}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD TRANSACTION */}
      {isAddTxOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleAddTransactionSubmit}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-base font-medium text-neutral-100">Add Manual Ledger Entry</h3>
              <button
                type="button"
                onClick={() => setIsAddTxOpen(false)}
                className="p-1 rounded text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Entry Type</label>
              <select
                value={txType}
                onChange={(e) => setTxType(e.target.value as any)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none"
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
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none"
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
                className="px-4 py-2 rounded-lg bg-neutral-800 text-neutral-300 text-xs font-medium hover:bg-neutral-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold shadow"
              >
                Record Entry
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
