"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpatialMeshBackground from "@/components/ui/SpatialMeshBackground";
import ThreeDCard from "@/components/motion/ThreeDCard";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Check,
  ExternalLink,
  Code2,
  Sparkles,
  Zap,
  ArrowRight,
  Shield,
  Layers,
  CheckCircle2,
  X,
  Plus
} from "lucide-react";

export default function IntegrationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeModalApp, setActiveModalApp] = useState<any | null>(null);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [configSuccess, setConfigSuccess] = useState(false);

  const categories = [
    "ALL",
    "Identity & SSO",
    "Communication",
    "Payroll & Accounting",
    "Cloud & Storage",
    "HR & Migration",
    "Developer & API"
  ];

  const apps = [
    {
      id: "slack",
      name: "Slack",
      category: "Communication",
      desc: "Send instant notifications for leave approvals, interview feedback reminders, and anniversary celebrations directly to team channels.",
      tags: ["Real-time", "Two-way", "Popular"],
      connected: true,
      glare: "#10b981",
      setupTime: "2 mins"
    },
    {
      id: "google",
      name: "Google Workspace",
      category: "Identity & SSO",
      desc: "Synchronize company directory, automate email provisioning on hire, and enforce Google SAML Single Sign-On.",
      tags: ["SSO", "Directory", "Enterprise"],
      connected: true,
      glare: "#3b82f6",
      setupTime: "3 mins"
    },
    {
      id: "microsoft",
      name: "Microsoft 365 / Azure AD",
      category: "Identity & SSO",
      desc: "Automated user lifecycle provisioning via SCIM and Entra ID (Azure AD). Calendar out-of-office synchronization for approved PTO.",
      tags: ["SCIM", "Azure AD", "Calendar"],
      connected: true,
      glare: "#0ea5e9",
      setupTime: "5 mins"
    },
    {
      id: "stripe",
      name: "Stripe Connect",
      category: "Payroll & Accounting",
      desc: "Process international contractor disbursements, subscription billing, and corporate card expense transaction feeds.",
      tags: ["Payments", "ACH", "Cards"],
      connected: true,
      glare: "#6366f1",
      setupTime: "1 min"
    },
    {
      id: "quickbooks",
      name: "QuickBooks Online",
      category: "Payroll & Accounting",
      desc: "Automated two-way ledger sync for gross wages, payroll taxes, benefits liabilities, and expense reimbursements.",
      tags: ["Ledger", "Accounting", "Taxes"],
      connected: false,
      glare: "#22c55e",
      setupTime: "4 mins"
    },
    {
      id: "xero",
      name: "Xero",
      category: "Payroll & Accounting",
      desc: "Sync payroll journal entries and reimbursable claims into Xero accounting chart of accounts with custom department tracking codes.",
      tags: ["Accounting", "Global", "Journals"],
      connected: false,
      glare: "#06b6d4",
      setupTime: "4 mins"
    },
    {
      id: "aws-s3",
      name: "AWS S3 WORM Storage",
      category: "Cloud & Storage",
      desc: "Cryptographically seal confidential personnel files, W-4 tax forms, and NDAs into immutable 7-year statutory compliance buckets.",
      tags: ["WORM", "Compliance", "Security"],
      connected: true,
      glare: "#f59e0b",
      setupTime: "5 mins"
    },
    {
      id: "bamboohr",
      name: "BambooHR Migrator",
      category: "HR & Migration",
      desc: "One-click automated employee directory, compensation history, and leave balance migration tool from BambooHR.",
      tags: ["Migration", "One-click", "HRIS"],
      connected: false,
      glare: "#84cc16",
      setupTime: "10 mins"
    },
    {
      id: "github",
      name: "GitHub Enterprise",
      category: "Developer & API",
      desc: "Auto-provision engineer organization access and repository teams based on department and role in PeopleCore.",
      tags: ["DevOps", "RBAC", "Engineering"],
      connected: false,
      glare: "#a855f7",
      setupTime: "3 mins"
    },
    {
      id: "webhooks",
      name: "Custom Webhooks & REST API",
      category: "Developer & API",
      desc: "Subscribe to 30+ webhook events (hire, terminate, leave_approved, payroll_run) and connect to custom Django/DRF or internal backends.",
      tags: ["API", "Django/DRF", "Webhooks"],
      connected: true,
      glare: "#ec4899",
      setupTime: "Instant"
    }
  ];

  const filteredApps = apps.filter((app) => {
    const matchesCategory = selectedCategory === "ALL" || app.category === selectedCategory;
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleSimulateConnect = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfiguring(true);
    setTimeout(() => {
      setIsConfiguring(false);
      setConfigSuccess(true);
      setTimeout(() => {
        setActiveModalApp(null);
        setConfigSuccess(false);
      }, 1800);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070709] text-slate-900 dark:text-neutral-100 font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200 relative overflow-x-hidden">
      <SpatialMeshBackground />
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-14 sm:pt-40 sm:pb-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Layers className="w-3.5 h-3.5" />
          <span>Ecosystem Directory</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-950 dark:text-white max-w-4xl mx-auto">
          Connect PeopleCore to your <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-sky-500 to-indigo-400">entire tech stack.</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto mt-4 leading-relaxed">
          Bi-directional synchronizations with identity providers, communication suites, accounting ledgers, and developer pipelines.
        </p>

        {/* Search */}
        <div className="mt-8 max-w-lg mx-auto flex items-center bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-2 shadow-sm">
          <Search className="w-4 h-4 text-slate-400 ml-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search integrations (e.g. Slack, Okta, QuickBooks)..."
            className="w-full bg-transparent px-3 py-1 text-xs text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white mr-2">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs transition cursor-pointer ${
                selectedCategory === cat
                  ? "bg-slate-900 dark:bg-white text-white dark:text-neutral-950 font-semibold"
                  : "bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app) => (
            <ThreeDCard key={app.id} glareColor={app.glare} maxTilt={6} elevationZ={10}>
              <div className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs flex flex-col justify-between h-full group hover:shadow-md transition">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center text-sm">
                        {app.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-slate-950 dark:text-white">{app.name}</h3>
                        <span className="text-[10px] text-slate-400">{app.category}</span>
                      </div>
                    </div>
                    {app.connected ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600">
                        Live Sync
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-neutral-800 text-slate-500">
                        {app.setupTime}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed mb-4">
                    {app.desc}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {app.tags.map((t, ti) => (
                      <span key={ti} className="px-2 py-0.5 rounded bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-white/[0.04] text-[10px] text-slate-500">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/[0.04] flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalApp(app)}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 flex items-center gap-1 cursor-pointer"
                  >
                    <span>{app.connected ? "View Sync Settings" : "Connect Integration"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <Link href="/workspace/settings" className="text-slate-400 hover:text-slate-600 text-xs">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </ThreeDCard>
          ))}
        </div>
      </section>

      {/* REST API & Webhooks banner */}
      <section className="py-20 bg-slate-100/60 dark:bg-[#09090d] border-y border-slate-200 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 text-white border border-neutral-800 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-semibold">
                <Code2 className="w-3.5 h-3.5" />
                <span>REST API & Webhooks</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">
                Build custom integrations with our OpenAPI 3.1 specification.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Connect your in-house Django/DRF backend, custom ERP, or internal scripts using authenticated API keys and event-driven webhooks.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/workspace/developer"
                className="px-6 py-3 rounded-xl bg-white text-slate-950 hover:bg-slate-100 text-xs font-semibold transition cursor-pointer text-center"
              >
                Developer API Console
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition cursor-pointer text-center"
              >
                Request Custom Webhook Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Configuration Modal */}
      <AnimatePresence>
        {activeModalApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.1] rounded-2xl p-6 shadow-2xl space-y-4 text-left relative"
            >
              <button
                onClick={() => setActiveModalApp(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center">
                  {activeModalApp.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-950 dark:text-white">Configure {activeModalApp.name}</h3>
                  <span className="text-xs text-slate-500">{activeModalApp.category}</span>
                </div>
              </div>

              {configSuccess ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Connection Verified!</h4>
                  <p className="text-xs text-slate-600 dark:text-neutral-300">
                    Two-way OAuth token synchronized. Events will stream automatically.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSimulateConnect} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">API Endpoint / OAuth Realm</label>
                    <input
                      type="text"
                      defaultValue={`https://api.${activeModalApp.id}.com/v2/tenant-connect`}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white font-mono text-[11px]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">Webhook Secret Token</label>
                    <input
                      type="password"
                      defaultValue="whsec_98a7sd8f7a9sd8f7a9sd8f7"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white font-mono text-[11px]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isConfiguring}
                      className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition cursor-pointer shadow-md shadow-indigo-600/25"
                    >
                      {isConfiguring ? "Validating OAuth Handshake..." : "Authorize Integration"}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
