"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThreeDCard from "@/components/motion/ThreeDCard";
import ThemeToggle from "@/components/ThemeToggle";
import {
  Heart,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Building2,
  Sparkles,
  ArrowRight,
  Lock,
  Globe2,
  Check
} from "lucide-react";

export default function SupportPeopleCorePage() {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [donorName, setDonorName] = useState("Julian Vance");
  const [donorEmail, setDonorEmail] = useState("julian.vance@example.com");

  const presets = [25, 50, 100, 250, 500];

  const handleSupport = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1200);
  };

  const finalAmount = customAmount ? Number(customAmount) : selectedAmount;

  return (
    <div className="min-h-screen bg-white dark:bg-[#070709] text-slate-900 dark:text-zinc-100 flex flex-col justify-between font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-slate-200 dark:border-white/[0.08] bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group" title="Return to Client Forge Home">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden border border-slate-200 dark:border-white/15 bg-black shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-[1.02]">
              <img 
                src="/logo.jpg" 
                alt="Client Forge Logo" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex flex-col">
              <span className="font-victorian text-xl font-normal tracking-wide text-slate-900 dark:text-white select-none group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Client Forge
              </span>
              <span className="text-[9px] uppercase tracking-widest font-sans font-medium text-slate-500 dark:text-zinc-400 -mt-0.5">
                PeopleCore Project Support
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle compact />
            <Link
              href="/workspace"
              className="text-xs text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white font-medium"
            >
              Back to Workspace &rarr;
            </Link>
          </div>
        </div>
      </header>

      {/* Main Support Container */}
      <main className="max-w-3xl mx-auto w-full px-4 py-12 sm:py-16 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-xs font-medium text-rose-700 dark:text-rose-300">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Optional Project Backing</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white tracking-tight">
            Support PeopleCore Open Architecture
          </h1>
          <p className="text-sm text-slate-600 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">
            PeopleCore is developed to advance open, transparent B2B workforce tooling. Contributions help maintain public compliance templates, privacy audits, and accessible developer SDKs.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl p-6 sm:p-10 bg-slate-50/70 dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm">
          {!isSuccess ? (
            <form onSubmit={handleSupport} className="space-y-6">
              {/* Presets */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-neutral-300 block mb-2.5">
                  Select Contribution Amount (USD)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                  {presets.map((amt) => {
                    const isSelected = selectedAmount === amt && !customAmount;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(amt);
                          setCustomAmount("");
                        }}
                        className={`py-3 rounded-2xl text-sm font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-slate-950 dark:bg-white text-white dark:text-neutral-950 border-transparent shadow-sm"
                            : "bg-white dark:bg-white/[0.03] border-slate-200 dark:border-white/[0.08] text-slate-800 dark:text-white hover:border-slate-400"
                        }`}
                      >
                        ${amt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom amount */}
              <div>
                <label className="text-xs font-medium text-slate-500 block mb-1">Or enter custom amount</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-slate-400 font-semibold">$</span>
                  <input
                    type="number"
                    placeholder="Other amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(0);
                    }}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-xs font-sans outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Donor info */}
              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-slate-500 block mb-1 font-medium">Contributor / Organization Name</label>
                  <input
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-500 block mb-1 font-medium">Receipt Email Address</label>
                  <input
                    type="email"
                    required
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] outline-none"
                  />
                </div>
              </div>

              {/* Mock Stripe Elements Container */}
              <div className="p-4 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100 dark:border-white/[0.04]">
                  <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-indigo-500" />
                    Stripe Payment Gateway
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-500" />
                    256-bit Encrypted
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <div className="col-span-2 sm:col-span-2">
                    <input
                      type="text"
                      readOnly
                      value="•••• •••• •••• 4242 (Test Card)"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-neutral-300 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      readOnly
                      value="12/28 • CVC 123"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-neutral-300 font-mono text-xs text-center"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-semibold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
              >
                {isProcessing ? (
                  <span>Processing with Stripe...</span>
                ) : (
                  <span>Contribute ${finalAmount || 100} to PeopleCore</span>
                )}
              </button>

              <p className="text-center text-[11px] text-slate-400">
                This optional contribution supports open infrastructure and does not modify core subscription entitlements.
              </p>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/15 text-emerald-500 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Thank You for Supporting PeopleCore!</h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Your contribution of <strong>${finalAmount || 100}</strong> from <strong>{donorName}</strong> has been credited. A formal statutory receipt was dispatched to <strong>{donorEmail}</strong>.
              </p>
              <div className="pt-2">
                <Link
                  href="/workspace"
                  className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-neutral-950 font-semibold text-xs inline-block"
                >
                  Return to Dashboard
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400 py-6 border-t border-slate-200 dark:border-white/[0.08]">
        © {new Date().getFullYear()} PeopleCore Technologies Inc. • Built for Independent Principals & Growing Enterprises
      </footer>
    </div>
  );
}
