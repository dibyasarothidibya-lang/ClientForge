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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
            Documentation & Assistance
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-white tracking-tight">
            Help Center & Support Desk
          </h1>
          <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
            Access enterprise documentation, submit compliance support tickets, check system status, and resolve HR questions.
          </p>
        </div>

        <button
          onClick={() => setTicketModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-semibold flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Open Support Ticket</span>
        </button>
      </div>

      {/* SYSTEM STATUS BANNER */}
      <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-emerald-950 dark:text-emerald-200">
            All Systems Operational: Core API, Biometrics, Payroll ACH Engine (99.99% Uptime)
          </span>
        </div>
        <span className="text-[11px] text-emerald-800 dark:text-emerald-300">
          Last health verification: 3 minutes ago
        </span>
      </div>

      {/* QUICK DOCUMENTATION TILES */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-2">
          <BookOpen className="w-5 h-5 text-indigo-500" />
          <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Admin Guides & Setup</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Step-by-step walkthroughs on configuring department hierarchies, custom comp bands, and SSO policies.
          </p>
        </div>
        <div className="p-5 rounded-3xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-2">
          <LifeBuoy className="w-5 h-5 text-emerald-500" />
          <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Statutory Tax & Compliance</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Federal W-2, 1099 contractor classifications, state disability funds, and health care reporting references.
          </p>
        </div>
        <div className="p-5 rounded-3xl bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-2">
          <FileQuestion className="w-5 h-5 text-purple-500" />
          <h4 className="font-semibold text-sm text-slate-900 dark:text-white">API & Webhooks Reference</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            REST API endpoints for syncing employee directories with custom internal tools or applicant tracking pipelines.
          </p>
        </div>
      </div>

      {/* TICKETS & FAQ SPLIT */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Support Tickets Queue */}
        <div className="lg:col-span-7 rounded-3xl p-6 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.06]">
            <div>
              <h3 className="font-semibold text-base text-slate-950 dark:text-white">Your Support Tickets</h3>
              <p className="text-xs text-slate-500">Track inquiries with our dedicated tier-3 support engineers</p>
            </div>
            <span className="text-xs font-semibold text-indigo-600">{supportTickets.length} tickets</span>
          </div>

          <div className="space-y-3">
            {supportTickets.map((tkt) => (
              <div
                key={tkt.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 dark:text-white">{tkt.subject}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-neutral-300">
                      {tkt.ticketNumber}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      tkt.status === "Resolved"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : tkt.status === "In Progress"
                        ? "bg-blue-500/10 text-blue-600"
                        : "bg-amber-500/10 text-amber-600"
                    }`}
                  >
                    {tkt.status}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                  {tkt.description}
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>Priority: {tkt.priority} • {tkt.category}</span>
                  <span>Updated: {tkt.lastUpdated}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive FAQ Accordion */}
        <div className="lg:col-span-5 rounded-3xl p-6 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm space-y-4">
          <h3 className="font-semibold text-base text-slate-950 dark:text-white">Frequently Asked Questions</h3>
          <div className="space-y-2.5 text-xs">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.01] overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-medium text-slate-900 dark:text-white flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-slate-600 dark:text-neutral-400 text-xs leading-relaxed border-t border-slate-100 dark:border-white/[0.04] pt-2">
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
