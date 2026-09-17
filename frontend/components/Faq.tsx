"use client";

import React, { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does Client Forge identify opportunity signals before public RFPs or job boards appear?",
      answer: "Client Forge monitors primary operational triggers across companies—including executive transitions, tech stack migrations, infrastructure expansions, and capital reallocations. By detecting these shifts as they occur, Client Forge surfaces high-conviction opportunities when organizations urgently need senior expertise, weeks or months before they publish generic RFPs."
    },
    {
      question: "How is an Opportunity Pipeline fundamentally different from a traditional sales CRM?",
      answer: "Traditional CRMs are administrative contact warehouses designed for junior SDRs blasting hundreds of generic emails a day. Client Forge is engineered for independent principals and boutique studios who win high-value engagements through authority and context. It structures your pipeline around opportunity momentum, research depth, and calibrated advisory angles rather than arbitrary task counts."
    },
    {
      question: "What distinguishes Client Forge's outreach preparation from generic cold email tools?",
      answer: "Client Forge explicitly rejects spray-and-pray mass messaging. Our briefing synthesizer builds exhaustive, context-dense dossiers on each target prospect—mapping their current architectural friction, past technology investments, and leadership priorities. This equips you to initiate genuine, high-leverage peer conversations that respect the prospect's time and position you as a credible strategic advisor."
    },
    {
      question: "Can we import existing client archives, lead spreadsheets, and pipeline history?",
      answer: "Yes. You can import historical prospect records, active opportunities, and client ledgers via structured CSV or bi-directional sync with Notion, Airtable, and Google Sheets. Once imported, Client Forge continuously scans and enriches those entities with real-time signal intelligence."
    },
    {
      question: "How does Client Forge safeguard confidential studio research and client intelligence?",
      answer: "Your dossiers, proprietary notes, opportunity values, and outreach drafts are protected in isolated, single-tenant data partitions with TLS 1.3 in-transit and AES-256 at-rest encryption. Client Forge never cross-contaminates or trains shared models on your private deal telemetry."
    },
    {
      question: "How quickly does a solo consultant or boutique studio see measurable pipeline results?",
      answer: "Most operators identify their first high-conviction opportunity within 48 hours of configuring signal filters. Because outreach is triggered by real company catalysts rather than cold outreach cadences, studios routinely see proposal acceptance rates double within their first 60 days."
    }
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-slate-50/70 dark:bg-[#080808] border-t border-slate-200/80 dark:border-white/[0.06] transition-colors duration-200 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] text-slate-600 dark:text-neutral-400 text-xs tracking-wider uppercase mb-5 font-mono shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
            <span>Clarifications & Mechanics</span>
          </div>
          <h2 className="section-title text-slate-950 dark:text-[#f5f5f3] tracking-tight">
            Frequently Considered. <span className="editorial-italic gradient-text">Clear Answers.</span>
          </h2>
          <p className="body-lg text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto mt-4 font-normal">
            How Client Forge replaces speculative pitch guesswork with high-conviction opportunity intelligence.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? "border-indigo-200 dark:border-white/[0.16] bg-white dark:bg-white/[0.03] shadow-md dark:shadow-lg" 
                    : "border-slate-200 dark:border-white/[0.06] bg-white/80 dark:bg-[#0c0c0e] hover:border-slate-300 dark:hover:border-white/[0.10] shadow-xs dark:shadow-none"
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base sm:text-lg font-medium pr-6 transition-colors ${
                    isOpen ? "text-indigo-950 dark:text-[#f5f5f3]" : "text-slate-700 dark:text-neutral-300 group-hover:text-indigo-600 dark:group-hover:text-white"
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-xl shrink-0 transition-transform duration-300 border ${
                    isOpen 
                      ? "rotate-180 bg-indigo-50 dark:bg-white/[0.08] border-indigo-200 dark:border-white/20 text-indigo-600 dark:text-white" 
                      : "bg-slate-100 dark:bg-white/[0.02] border-slate-200 dark:border-white/[0.06] text-slate-500 dark:text-neutral-400 group-hover:text-slate-900 dark:group-hover:text-white"
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-slate-600 dark:text-neutral-300 leading-relaxed border-t border-slate-100 dark:border-white/[0.04] font-normal animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
