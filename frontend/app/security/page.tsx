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
  X
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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";
      const res = await fetch(`${apiUrl}/notifications/request-compliance-pack/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: packEmail }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPackRequested(true);
        setTimeout(() => {
          setIsPackModalOpen(false);
          setPackRequested(false);
          setPackEmail("");
        }, 3000);
      } else {
        setSubmitError(data.message || "Failed to dispatch email. Please try again.");
      }
    } catch (err: any) {
      setSubmitError(err.message || "Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const certifications = [
    {
      name: "SOC-2 Type II",
      status: "Certified & Audited",
      desc: "Annual rigorous audit covering Security, Confidentiality, and Processing Integrity by independent CPA auditors.",
      badge: "Annual Report"
    },
    {
      name: "ISO/IEC 27001",
      status: "Certified",
      desc: "International gold standard for Information Security Management Systems (ISMS) across all infrastructure.",
      badge: "Global Standard"
    },
    {
      name: "GDPR & CCPA Compliant",
      status: "Fully Compliant",
      desc: "Full support for Data Subject Access Requests (DSAR), right-to-be-forgotten workflows, and standard contractual clauses.",
      badge: "Data Privacy"
    },
    {
      name: "HIPAA Ready",
      status: "BAA Available",
      desc: "Engineered to safeguard Protected Health Information (PHI) within medical leave and insurance document vaulting.",
      badge: "Healthcare"
    }
  ];

  const securityPillars = [
    {
      icon: Lock,
      title: "Cryptographic Protection",
      desc: "All databases, backups, and document attachments are sealed with customer-isolated AES-256 keys. TLS 1.3 with HSTS enforced for all traffic.",
      glare: "#3b82f6"
    },
    {
      icon: KeyRound,
      title: "Strict Identity & Access (RBAC)",
      desc: "Enforce mandatory WebAuthn/TOTP two-factor authentication, SAML 2.0 Single Sign-On (Okta, Azure AD), and field-level permission masks.",
      glare: "#10b981"
    },
    {
      icon: Eye,
      title: "Immutable Audit Trails",
      desc: "Every record creation, modification, export, or document download produces a cryptographically chained, immutable audit event with actor, timestamp, and IP.",
      glare: "#8b5cf6"
    },
    {
      icon: Server,
      title: "Isolated Multi-Tenant Architecture",
      desc: "Logical and physical separation of tenant data prevents cross-contamination. Dedicated single-tenant VPC options available for Enterprise tier.",
      glare: "#f59e0b"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070709] text-slate-900 dark:text-neutral-100 font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200 relative overflow-x-hidden">
      <SpatialMeshBackground />
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Security & Trust Center</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-950 dark:text-white max-w-4xl mx-auto">
          Enterprise security engineered into <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-500 to-indigo-500">every layer.</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto mt-4 leading-relaxed">
          Employee personal information, compensation benchmarks, and bank details require uncompromising security. We treat your workforce data with zero trust.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
          <button
            onClick={() => setIsPackModalOpen(true)}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-600/20 flex items-center gap-2 transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Request Security & Compliance Pack</span>
          </button>
          <Link
            href="/workspace/settings"
            className="px-6 py-3 rounded-xl bg-white dark:bg-[#121216] hover:bg-slate-100 dark:hover:bg-neutral-800 text-slate-900 dark:text-white font-semibold text-xs border border-slate-200 dark:border-white/[0.08] shadow-xs transition cursor-pointer"
          >
            <span>View Workspace Security Controls</span>
          </Link>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    {cert.status}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{cert.badge}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">{cert.name}</h3>
                <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">{cert.desc}</p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/[0.04] flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Audited 2026</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4 Deep Security Pillars */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            Architecture Fundamentals
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white">
            Built on a Zero-Trust Foundation.
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 text-sm">
            Continuous verification, strict least privilege, and hardware-level isolation.
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

      {/* Global Data Residency */}
      <section className="py-16 bg-slate-100/60 dark:bg-[#09090d] border-y border-slate-200 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                Data Sovereignty
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">
                Store your employee records where you do business.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
                Meet statutory data residency mandates across North America, the European Union, the United Kingdom, and Asia-Pacific with isolated regional database pinning.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                <div className="p-3 rounded-xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.06]">
                  <div className="font-bold text-slate-900 dark:text-white">US Region (Virginia / Oregon)</div>
                  <div className="text-[11px] text-slate-500">FedRAMP Ready Data Centers</div>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.06]">
                  <div className="font-bold text-slate-900 dark:text-white">EU Region (Frankfurt / Dublin)</div>
                  <div className="text-[11px] text-slate-500">Strict GDPR Sovereignty</div>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.06]">
                  <div className="font-bold text-slate-900 dark:text-white">UK Region (London)</div>
                  <div className="text-[11px] text-slate-500">UK-GDPR & DPA Compliant</div>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.06]">
                  <div className="font-bold text-slate-900 dark:text-white">APAC Region (Singapore / Sydney)</div>
                  <div className="text-[11px] text-slate-500">APEC Privacy Framework</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900 dark:text-white">Live Security Posture Telemetry</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600">
                  100% Posture Score
                </span>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  { check: "Mandatory Two-Factor Authentication Enforced", ok: true },
                  { check: "Zero Unpatched CVE Vulnerabilities", ok: true },
                  { check: "Automated Daily Disaster Recovery Snapshots", ok: true },
                  { check: "Annual External Third-Party Penetration Test", ok: true },
                  { check: "99.99% Core API Uptime Over Last 12 Months", ok: true }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-neutral-900/50">
                    <span className="text-slate-700 dark:text-neutral-300">{item.check}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Pack Request Modal */}
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
                <h3 className="text-lg font-bold text-slate-950 dark:text-white">Security & Compliance Pack</h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-neutral-400">
                Includes SOC-2 Type II audit report, ISO 27001 certificate, penetration testing summary, and DPA template.
              </p>

              {packRequested ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Security Pack Dispatched!</h4>
                  <p className="text-xs text-slate-600 dark:text-neutral-300">
                    A secure download link and NDA verification email has been sent to your inbox.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRequestPack} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">Company Work Email *</label>
                    <input
                      type="email"
                      required
                      value={packEmail}
                      onChange={(e) => setPackEmail(e.target.value)}
                      placeholder="compliance@enterprise.com"
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
                      {isSubmitting ? "Dispatching Compliance Pack..." : "Receive Compliance Pack"}
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
