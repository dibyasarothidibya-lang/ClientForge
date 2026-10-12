"use client";

import React, { useState } from "react";
import { Send, MessageCircle, Mail, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { engineer } from "@/lib/portfolio";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState("Custom Internal Tool");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent, via: "whatsapp" | "email" = "whatsapp") => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const summary = [
      `*New Project Inquiry*`,
      `*Name:* ${name}`,
      `*Email:* ${email || "Not provided"}`,
      company ? `*Company:* ${company}` : null,
      `*Project Type:* ${projectType}`,
      `*Problem & Requirements:*`,
      message,
    ]
      .filter(Boolean)
      .join("\n\n");

    if (via === "whatsapp") {
      const url = `https://wa.me/8801704909232?text=${encodeURIComponent(summary)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      const mailSubject = encodeURIComponent(`Project Inquiry: ${projectType} (${name})`);
      const mailBody = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nProject Type: ${projectType}\n\nProblem & Requirements:\n${message}`
      );
      window.location.href = `mailto:${engineer.email}?subject=${mailSubject}&body=${mailBody}`;
    }

    setSubmitted(true);
  };

  return (
    <div className="w-full rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-white/[0.08] shadow-xl">
      <form onSubmit={(e) => handleSubmit(e, "whatsapp")} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-neutral-400 mb-1.5 font-sans">
              Your Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Mercer"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.03] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-neutral-400 mb-1.5 font-sans">
              Work Email <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@company.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.03] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-neutral-400 mb-1.5 font-sans">
              Company / Organization <span className="text-xs text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Acme Operations Ltd."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.03] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-neutral-400 mb-1.5 font-sans">
              Project Type
            </label>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-[#121216] text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
            >
              <option value="Custom Internal Tool">Custom Internal Tool (Portal / Dashboard / Admin)</option>
              <option value="Workflow Automation & Integrations">Workflow Automation & Integrations (Approvals / APIs)</option>
              <option value="Backend Development & SaaS Systems">Backend Development & SaaS Systems (Django / Node)</option>
              <option value="Architecture Consultation & Audit">Architecture Consultation & Audit</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-neutral-400 mb-1.5 font-sans">
            What is slowing your business down? <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your current process, the spreadsheets or tools involved, where bottlenecks happen, and what outcome you want to achieve..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.03] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all resize-y"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold hover:opacity-90 transition-opacity active:scale-[0.98] shadow-sm cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Send Inquiry via WhatsApp</span>
            <ArrowUpRight className="w-4 h-4 opacity-70 shrink-0" />
          </button>

          <button
            type="button"
            onClick={(e) => handleSubmit(e, "email")}
            className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] text-slate-700 dark:text-neutral-200 text-sm font-medium hover:border-slate-400 dark:hover:border-white/25 transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Send via Email</span>
          </button>
        </div>

        {submitted && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300 text-xs font-sans mt-3">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
            <span>Thank you! Your message was prepared. If the window didn&apos;t open, email dibyasarothidibya@gmail.com directly.</span>
          </div>
        )}

        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-neutral-400 pt-1 border-t border-slate-100 dark:border-white/[0.05]">
          <span>Direct response from Dibya within 24 hours</span>
          <span>Zero spam · Direct engineer contact</span>
        </div>
      </form>
    </div>
  );
}
