"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpatialMeshBackground from "@/components/ui/SpatialMeshBackground";
import ThreeDCard from "@/components/motion/ThreeDCard";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  FileCheck,
  Server,
  Eye,
  KeyRound,
  Download,
  CheckCircle2,
  AlertTriangle,
  Globe2,
  HardDrive,
  Cpu,
  ArrowRight,
  Sparkles,
  X,
  Code2,
  Terminal,
  Layers
} from "lucide-react";

export default function SecurityPage() {
  const [isPackModalOpen, setIsPackModalOpen] = useState(false);
  const [packRequested, setPackRequested] = useState(false);
  const [packEmail, setPackEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleRequestPack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!packEmail) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const { ApiClient } = await import("@/lib/api");
      const res = await ApiClient.post("/notifications/request-compliance-pack/", {
        email: packEmail,
      });

      if (res.success) {
        setPackRequested(true);
        setTimeout(() => {
          setIsPackModalOpen(false);
          setPackRequested(false);
          setPackEmail("");
        }, 3000);
      } else {
        setSubmitError(res.error?.message || res.message || "Failed to dispatch specification memo. Please try again.");
      }
    } catch (err: any) {
      setSubmitError(err.message || "Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const architecturalControls = [
    {
      name: "SOC 2-Style Architecture",
      status: "Control-Mapped Design",
      desc: "System design informed by SOC 2 Trust Services Criteria covering access authorization, state auditability, and data confidentiality.",
      badge: "Design Pattern"
    },
    {
      name: "ISO/IEC 27001 Principles",
      status: "Informed by Standard",
      desc: "Information security management principles applied across environment secret isolation, role separation, and database access boundaries.",
      badge: "Security Standard"
    },
    {
      name: "GDPR-Aware Data Handling",
      status: "Data Privacy Architecture",
      desc: "Tenant-scoped database modeling facilitating data isolation, exportability, and deterministic record deletion workflows.",
      badge: "Privacy Model"
    },
    {
      name: "Role-Based Access Control",
      status: "Implemented & Tested",
      desc: "6 distinct privilege roles (Owner, Admin, Manager, Finance, Auditor, Member) enforced across all Django REST Framework endpoints.",
      badge: "Active in Code"
    }
  ];

  const securityPillars = [
    {
      icon: Lock,
      title: "Transport & Database Protection",
      desc: "Production deployment enforces TLS termination with modern cipher suites via Nginx. Database connections use parameter binding and ORM abstraction against SQL injection.",
      glare: "#3b82f6"
    },
    {
      icon: KeyRound,
      title: "Organization-Scoped RBAC",
      desc: "Explicit permission boundary checks guard every sensitive action. Managers, auditors, and members cannot mutate or view records outside their authorized organization.",
      glare: "#10b981"
    },
    {
      icon: Eye,
      title: "Tamper-Evident Audit Logging",
      desc: "State mutations across organizations, employees, and payroll generate immutable audit log records tracking the acting user, timestamp, and action payload.",
      glare: "#8b5cf6"
    },
    {
      icon: Server,
      title: "Multi-Tenant Isolation Architecture",
      desc: "Every database model query filters strictly by tenant foreign keys at the service and manager layers, preventing cross-tenant leakage before response serialization.",
      glare: "#f59e0b"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070709] text-slate-900 dark:text-neutral-100 font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200 relative overflow-x-hidden">
      <SpatialMeshBackground />
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Security & Compliance Architecture</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-950 dark:text-white max-w-4xl mx-auto">
          Security architecture engineered into <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-500 to-indigo-500">every layer.</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-neutral-400 max-w-3xl mx-auto mt-4 leading-relaxed font-sans">
          Workforce data, payroll calculations, and organization records demand defensive engineering. Client Forge enforces least privilege, tenant-scoped database boundaries, and automated regression verification.
        </p>

        {/* Independent Project Notice */}
        <div className="mt-6 max-w-2xl mx-auto p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-mono">
          <strong>Notice:</strong> Client Forge is an independent engineering project and is not currently represented as SOC 2, ISO 27001, HIPAA, FedRAMP, or otherwise independently certified unless explicitly stated.
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
          <button
            onClick={() => setIsPackModalOpen(true)}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-600/20 flex items-center gap-2 transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Request Architecture Security Memo</span>
          </button>
          <Link
            href="/workspace/audits"
            className="px-6 py-3 rounded-xl bg-white dark:bg-[#121216] hover:bg-slate-100 dark:hover:bg-neutral-800 text-slate-900 dark:text-white font-semibold text-xs border border-slate-200 dark:border-white/[0.08] shadow-xs transition cursor-pointer"
          >
            <span>Inspect Live Audit Trail Module</span>
          </Link>
        </div>
      </section>

      {/* Architectural Standards Alignment Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {architecturalControls.map((cert, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono">
                    {cert.status}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{cert.badge}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">{cert.name}</h3>
                <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">{cert.desc}</p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/[0.04] flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified in Repository</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4 Deep Security Pillars */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono">
            Defensive Implementation
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white">
            Architecture Designed for Isolation.
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 text-sm font-sans">
            Continuous permission verification, organization-scoped queries, and automated testing across edge cases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {securityPillars.map((pil, idx) => {
            const Icon = pil.icon;
            return (
              <ThreeDCard key={idx} glareColor={pil.glare} maxTilt={6} elevationZ={10}>
                <div className="p-7 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-3 h-full">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-neutral-800 text-slate-900 dark:text-white flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-950 dark:text-white">{pil.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">{pil.desc}</p>
                </div>
              </ThreeDCard>
            );
          })}
        </div>
      </section>

      {/* Verified Security Telemetry Section */}
      <section className="py-16 bg-slate-100/60 dark:bg-[#09090d] border-y border-slate-200 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-mono">
                Technical Verification
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">
                Defensive testing built into CI/CD.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed font-sans">
                Security in Client Forge is backed by concrete test cases asserting that unauthorized users are denied access to privileged domain endpoints, and queries never leak data across organization IDs.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                <div className="p-3 rounded-xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.06]">
                  <div className="font-bold text-slate-900 dark:text-white font-mono">71 Automated Tests</div>
                  <div className="text-[11px] text-slate-500">Unit & Integration suites</div>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.06]">
                  <div className="font-bold text-slate-900 dark:text-white font-mono">RBAC Permission Classes</div>
                  <div className="text-[11px] text-slate-500">Custom DRF guards</div>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.06]">
                  <div className="font-bold text-slate-900 dark:text-white font-mono">Audit Trails</div>
                  <div className="text-[11px] text-slate-500">State mutation logs</div>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.06]">
                  <div className="font-bold text-slate-900 dark:text-white font-mono">TLS + Reverse Proxy</div>
                  <div className="text-[11px] text-slate-500">Nginx container config</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900 dark:text-white font-mono">Repository Security Controls</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 font-mono">
                  Verified in Code
                </span>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  { check: "Organization-scoped querysets in DRF ViewSets", ok: true },
                  { check: "JWT authentication with secure token expiration", ok: true },
                  { check: "Environment variable secret isolation (.env.production)", ok: true },
                  { check: "71 automated regression test methods passing", ok: true },
                  { check: "Nginx reverse proxy with HTTPS/TLS encryption", ok: true }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-neutral-900/50">
                    <span className="text-slate-700 dark:text-neutral-300 font-sans">{item.check}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Architecture Memo Modal */}
      <AnimatePresence>
        {isPackModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.1] rounded-2xl p-6 shadow-2xl space-y-4 text-left relative"
            >
              <button
                onClick={() => setIsPackModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <FileCheck className="w-5 h-5" />
                <h3 className="text-lg font-bold text-slate-950 dark:text-white">Architecture Security Memo</h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-neutral-400">
                Receive the technical summary detailing Client Forge's multi-tenant ORM isolation patterns, RBAC permission matrix, and automated test suite coverage.
              </p>

              {packRequested ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Memo Request Received!</h4>
                  <p className="text-xs text-slate-600 dark:text-neutral-300">
                    A copy of the architectural specifications will be sent to your email.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRequestPack} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={packEmail}
                      onChange={(e) => setPackEmail(e.target.value)}
                      placeholder="engineer@company.com"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {submitError && (
                    <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 text-xs">
                      {submitError}
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white font-semibold text-xs transition cursor-pointer shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? "Dispatching Architecture Memo..." : "Receive Architecture Memo"}
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
