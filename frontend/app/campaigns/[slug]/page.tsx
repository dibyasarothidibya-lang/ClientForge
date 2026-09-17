"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { demoCampaigns } from "@/lib/demoData";
import {
  Heart,
  Share2,
  ShieldCheck,
  CheckCircle2,
  CreditCard,
  Building2,
  Receipt,
  Printer
} from "lucide-react";

export default function CampaignPublicPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const campaign =
    demoCampaigns.find((c) => c.slug === slug) || demoCampaigns[0];

  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [donorName, setDonorName] = useState("Rachel Sterling");
  const [donorEmail, setDonorEmail] = useState("rachel.sterling@example.com");

  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState("");

  const effectiveAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;
  const progressPercent = Math.min(100, Math.round((campaign.raised / campaign.goal) * 100));

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    setReceiptNumber(`REC-2026-${Math.floor(100000 + Math.random() * 900000)}`);
    setShowReceipt(true);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Banner */}
      <header className="border-b border-white/[0.08] bg-[#0c0c0e]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/20 bg-black">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-serif text-xl tracking-tight text-[#f5f5f3]">ℭ𝔩𝔦𝔢𝔫𝔱 𝔉𝔬𝔯𝔤𝔢</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/workspace"
              className="text-xs font-mono text-neutral-400 hover:text-white transition-colors"
            >
              Go to Workspace &rarr;
            </Link>
          </div>
        </div>
      </header>

      {/* Main Campaign Hero */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-16 grid lg:grid-cols-12 gap-10">
        {/* Left Story Column */}
        <div className="lg:col-span-7 space-y-8">
          <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl h-80 sm:h-96">
            <img
              src={campaign.coverImage}
              alt={campaign.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <span className="px-3.5 py-1 rounded-full text-xs font-mono bg-indigo-500/30 border border-indigo-400/40 text-indigo-200">
                Verified Hope Foundation Campaign
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/20 text-emerald-300">
                Active Campaign
              </span>
            </div>
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-serif text-[#f5f5f3] tracking-tight mb-4">
              {campaign.title}
            </h1>
            <p className="text-neutral-300 text-base leading-relaxed font-normal">
              {campaign.description} Every contribution is tracked directly through Hope Foundation’s transparent ledger with verified audit evidence.
            </p>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/[0.08]">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-xs font-mono text-neutral-400 uppercase">Donors</div>
              <div className="text-2xl font-serif text-white font-medium mt-1">{campaign.donorCount}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-xs font-mono text-neutral-400 uppercase">Goal</div>
              <div className="text-2xl font-serif text-white font-medium mt-1">${campaign.goal.toLocaleString()}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-xs font-mono text-neutral-400 uppercase">Funded</div>
              <div className="text-2xl font-serif text-emerald-400 font-medium mt-1">{progressPercent}%</div>
            </div>
          </div>
        </div>

        {/* Right Checkout Column */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl bg-[#0e0e12] border border-white/[0.1] p-6 sm:p-8 shadow-2xl sticky top-24">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-2xl font-serif text-[#f5f5f3] font-medium">
                  ${campaign.raised.toLocaleString()}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  of ${campaign.goal.toLocaleString()}
                </span>
              </div>
              <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Donation Form */}
            <form onSubmit={handleDonate} className="space-y-5">
              {/* Frequency Toggle */}
              <div className="grid grid-cols-2 p-1 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setFrequency("one-time")}
                  className={`py-2 rounded-lg transition-colors ${
                    frequency === "one-time" ? "bg-white text-neutral-950 font-semibold" : "text-neutral-400"
                  }`}
                >
                  One-time Donation
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency("monthly")}
                  className={`py-2 rounded-lg transition-colors ${
                    frequency === "monthly" ? "bg-white text-neutral-950 font-semibold" : "text-neutral-400"
                  }`}
                >
                  Monthly Sustainer
                </button>
              </div>

              {/* Amount Pills */}
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-2">Select Donation Amount</label>
                <div className="grid grid-cols-3 gap-2">
                  {[25, 50, 100, 250, 500].map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmount("");
                      }}
                      className={`py-2.5 rounded-xl border text-sm font-mono transition-all ${
                        selectedAmount === amt && !customAmount
                          ? "border-indigo-500 bg-indigo-600/20 text-white font-bold"
                          : "border-white/[0.08] bg-white/[0.02] text-neutral-300 hover:border-white/20"
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-neutral-500 font-mono text-sm">$</span>
                    <input
                      type="number"
                      placeholder="Custom"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full pl-7 pr-3 py-2.5 bg-white/[0.02] border border-white/[0.08] rounded-xl text-sm font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-400"
                    />
                  </div>
                </div>
              </div>

              {/* Donor Contact */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">Donor Name</label>
                  <input
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-indigo-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">Email (for Tax Receipt)</label>
                  <input
                    type="email"
                    required
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-indigo-400"
                  />
                </div>
              </div>

              {/* Stripe Test Simulation Card */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono text-neutral-400 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-indigo-400" />
                  <span>Stripe Test Mode (•••• 4242)</span>
                </div>
                <span className="text-emerald-400">Sandbox Ready</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#f5f5f3] hover:bg-white text-neutral-950 font-semibold text-sm transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                Complete Donation of ${effectiveAmount.toLocaleString()}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-neutral-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>501(c)(3) tax-deductible contribution</span>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* RECEIPT MODAL */}
      {showReceipt && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#101014] border border-white/[0.12] rounded-3xl max-w-md w-full p-8 shadow-2xl relative text-left">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-5">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-1 block">Donation Succeeded</span>
            <h3 className="text-2xl font-serif text-white font-normal mb-1">Official Donation Receipt</h3>
            <p className="text-xs font-mono text-neutral-400 mb-6">{receiptNumber}</p>

            <div className="space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono mb-6">
              <div className="flex justify-between">
                <span className="text-neutral-500">Beneficiary:</span>
                <span className="text-white">Hope Foundation Inc.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Campaign:</span>
                <span className="text-white">{campaign.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Donor Name:</span>
                <span className="text-white">{donorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Amount:</span>
                <span className="text-emerald-400 font-bold">${effectiveAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Status:</span>
                <span className="text-emerald-400">Settled (Stripe Test)</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl border border-white/10 text-white hover:bg-white/5 text-xs font-medium flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                Print PDF Receipt
              </button>
              <button
                onClick={() => setShowReceipt(false)}
                className="flex-1 py-2.5 rounded-xl bg-white text-neutral-950 text-xs font-semibold hover:bg-neutral-200"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
