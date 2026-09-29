"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import { SupportTicket } from "@/lib/peopleCoreData";
import ThreeDCard from "@/components/motion/ThreeDCard";
import {
  HelpCircle,
  MessageSquare,
  Search,
  Plus,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  LifeBuoy,
  FileQuestion,
  ExternalLink,
  ChevronDown,
  X
} from "lucide-react";

export default function SupportCenterPage() {
  const { supportTickets, addSupportTicket, currentUser } = useWorkspace();

  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState<SupportTicket["category"]>("Payroll & Compensation");
  const [priority, setPriority] = useState<SupportTicket["priority"]>("Medium");
  const [description, setDescription] = useState("");

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How does PeopleCore handle multi-state and international remote payroll taxes?",
      a: "PeopleCore automatically parses employee resident and work jurisdiction addresses, calculating state, county, and local tax withholdings dynamically while validating statutory compliance across all 50 US states and international EOR partners."
    },
    {
      q: "Can managers approve leave requests directly from Slack or email?",
      a: "Yes. Through the Slack & Email integration nodes, managers receive an interactive notification card with one-click 'Approve' and 'Reject' actions without having to log in separately."
    },
    {
      q: "How are confidential employee documents and tax forms safeguarded?",
      a: "All uploaded files, contracts, and SSN records are encrypted using AES-256 at rest and TLS 1.3 in transit with isolated single-tenant partition boundaries, meeting SOC 2 Type II and HIPAA requirements."
    },
    {
      q: "What is the procedure for offboarding an employee?",
      a: "Initiating offboarding from an employee's profile prompts a confirmation modal that automatically revokes Google Workspace and SSO sessions, calculates final prorated pay with accrued PTO, and schedules statutory exit paperwork."
    }
  ];

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !description) return;
    addSupportTicket({
      subject,
      category,
      priority,
      submittedBy: currentUser.name,
      description,
    });
    setTicketModalOpen(false);
    setSubject("");
    setDescription("");
  };

  return (
    <div className="space-y-8 font-sans">
      {/* 1. Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-white/[0.07]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-neutral-400 border border-slate-200/80 dark:border-white/[0.06]">
              Support & SLA Desk
            </span>
            <span className="text-xs text-slate-400 dark:text-neutral-500 font-mono">
              Tier-3 Enterprise Support
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Help Center & Technical Support
          </h1>
          <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
            Operational documentation, statutory compliance advisories, system telemetry status, and ticket resolution.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setTicketModalOpen(true)}
            className="h-8 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-medium inline-flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Open Support Ticket</span>
          </button>
        </div>
      </div>

      {/* 2. Compact Numerical Metric Ribbon */}
      <div className="bg-white dark:bg-[#111215] border border-slate-200/90 dark:border-white/[0.07] rounded-xl overflow-hidden shadow-2xs">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-slate-100 dark:divide-white/[0.05] md:divide-x md:divide-slate-200/80 md:dark:divide-white/[0.07]">
          
          <div className="p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              System Telemetry Status
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="text-xl sm:text-2xl font-medium text-slate-950 dark:text-white tabular-nums">
                99.99% Uptime
              </span>
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              All 4 clusters operational
            </div>
          </div>

          <div className="p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              Active Support Inquiries
            </div>
            <div className="text-xl sm:text-2xl font-medium text-slate-950 dark:text-white tabular-nums mt-1">
              {supportTickets.filter((t) => t.status !== "Resolved").length} Open
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              {supportTickets.length} total logged tickets
            </div>
          </div>

          <div className="p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              Mean First Response SLA
            </div>
            <div className="text-xl sm:text-2xl font-medium text-slate-950 dark:text-white tabular-nums mt-1">
              &lt; 15 Minutes
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              Enterprise dedicated queue
            </div>
          </div>

          <div className="p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              Compliance Clearances
            </div>
            <div className="text-xl sm:text-2xl font-medium text-slate-950 dark:text-white tabular-nums mt-1">
              SOC 2 Type II
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              ISO 27001 & HIPAA verified
            </div>
          </div>

        </div>
      </div>

      {/* 3. Quick Reference Documentation Tiles */}
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-white dark:bg-[#111215] border border-slate-200/80 dark:border-white/[0.07] shadow-2xs space-y-1.5">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-500 shrink-0" />
            <h4 className="font-semibold text-xs text-slate-900 dark:text-white">Admin Guides & Setup</h4>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-neutral-400 leading-relaxed">
            Step-by-step walkthroughs on configuring department hierarchies, custom comp bands, and SSO policies.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-[#111215] border border-slate-200/80 dark:border-white/[0.07] shadow-2xs space-y-1.5">
          <div className="flex items-center gap-2">
            <LifeBuoy className="w-4 h-4 text-emerald-500 shrink-0" />
            <h4 className="font-semibold text-xs text-slate-900 dark:text-white">Statutory Tax & Compliance</h4>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-neutral-400 leading-relaxed">
            Federal W-2, 1099 contractor classifications, state disability funds, and health care reporting references.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-[#111215] border border-slate-200/80 dark:border-white/[0.07] shadow-2xs space-y-1.5">
          <div className="flex items-center gap-2">
            <FileQuestion className="w-4 h-4 text-purple-500 shrink-0" />
            <h4 className="font-semibold text-xs text-slate-900 dark:text-white">API & Webhooks Reference</h4>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-neutral-400 leading-relaxed">
            REST API endpoints for syncing employee directories with custom internal tools or applicant tracking pipelines.
          </p>
        </div>
      </div>

      {/* 4. Support Tickets Queue & FAQ Split */}
      <div className="grid lg:grid-cols-12 gap-5">
        {/* Support Tickets Queue */}
        <div className="lg:col-span-7 bg-white dark:bg-[#111215] border border-slate-200/90 dark:border-white/[0.07] rounded-xl overflow-hidden shadow-2xs flex flex-col">
          <div className="p-4 border-b border-slate-200/80 dark:border-white/[0.06] flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-slate-950 dark:text-white">Support Inquiries</h3>
              <p className="text-[11px] text-slate-500 dark:text-neutral-400 mt-0.5">
                Track inquiries with our tier-3 response team
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-500 dark:text-neutral-400">
              {supportTickets.length} total
            </span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-white/[0.04]">
            {supportTickets.map((tkt) => (
              <div
                key={tkt.id}
                className="p-4 hover:bg-slate-50/70 dark:hover:bg-white/[0.02] transition-colors space-y-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium whitespace-nowrap shrink-0 bg-slate-100 dark:bg-white/[0.07] text-slate-700 dark:text-neutral-300 border border-slate-200/70 dark:border-white/[0.08]">
                      {tkt.ticketNumber}
                    </span>
                    <span className="font-medium text-xs text-slate-900 dark:text-white truncate">
                      {tkt.subject}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold whitespace-nowrap shrink-0 ${
                      tkt.status === "Resolved"
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40"
                        : tkt.status === "In Progress"
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/40"
                        : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/40"
                    }`}
                  >
                    {tkt.status}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
                  {tkt.description}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-neutral-500 pt-0.5 font-mono">
                  <span>Priority: {tkt.priority} • {tkt.category}</span>
                  <span>Updated: {tkt.lastUpdated}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive FAQ Accordion */}
        <div className="lg:col-span-5 bg-white dark:bg-[#111215] border border-slate-200/90 dark:border-white/[0.07] rounded-xl overflow-hidden shadow-2xs p-4 space-y-3.5">
          <div>
            <h3 className="font-semibold text-sm text-slate-950 dark:text-white">Frequently Asked Questions</h3>
            <p className="text-[11px] text-slate-500 dark:text-neutral-400 mt-0.5">
              Common solutions for platform configuration
            </p>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-lg border border-slate-200/80 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.015] overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-3 text-left font-medium text-xs text-slate-900 dark:text-white flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <span className="leading-snug">{faq.q}</span>
                    <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-3 pb-3 text-slate-600 dark:text-neutral-400 text-xs leading-relaxed border-t border-slate-100 dark:border-white/[0.04] pt-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CREATE TICKET MODAL */}
      <AnimatePresence>
        {ticketModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setTicketModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white dark:bg-[#121215] border border-slate-200 dark:border-white/[0.12] rounded-3xl max-w-md w-full p-6 shadow-2xl z-10 space-y-4"
            >
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Open Enterprise Support Ticket</h3>
              <form onSubmit={handleCreateTicket} className="space-y-4 text-xs font-sans">
                <div>
                  <label className="text-slate-500 block mb-1 font-medium">Subject / Inquiry Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Question regarding California local payroll tax"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
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
                      <option value="Payroll & Compensation">Payroll & Compensation</option>
                      <option value="Permissions & Roles">Permissions & Roles</option>
                      <option value="Integrations & API">Integrations & API</option>
                      <option value="Feature Request">Feature Request</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-500 block mb-1 font-medium">Priority Level</label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] outline-none"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-slate-500 block mb-1 font-medium">Detailed Description *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide relevant details or steps to reproduce..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-semibold text-xs cursor-pointer shadow-md"
                  >
                    Submit Ticket
                  </button>
                  <button
                    type="button"
                    onClick={() => setTicketModalOpen(false)}
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
