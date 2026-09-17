"use client";

import React, { useState } from "react";
import { 
  Globe2, 
  Zap, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Laptop, 
  FileText, 
  MessageSquare,
  BarChart3,
  HeartHandshake,
  Radar,
  LineChart,
  Layers
} from "lucide-react";

export default function CoreModulesTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const modules = [
    {
      id: "intelligence",
      title: "Prospect Intelligence",
      icon: Radar,
      tag: "Deep Research",
      heading: "Know Who You’re Talking To Before You Reach Out",
      description: "Eliminate shallow research. Client Forge gathers corporate milestones, leadership shifts, technology stack evolution, and strategic pressure points into one clear executive dossier.",
      stats: [
        { label: "Research Velocity", value: "90 Secs" },
        { label: "Signal Accuracy", value: "98.4%" },
        { label: "Cold Pitch Avoidance", value: "100%" },
      ],
      features: [
        "Financial rounds, leadership promotions, and open requisition triggers",
        "Direct organizational mapping of key budget holders and sponsors",
        "Public pain point synthesis from earnings, podcasts, and articles",
        "Automated executive dossier export for call preparation"
      ],
      previewContent: {
        badge: "VERIFIED PROSPECT DOSSIER",
        mainTitle: "High-Intent Signal Stream",
        items: [
          { country: "Apex Global HQ", status: "Series B Trigger", code: "Design Infrastructure", amount: "$65,000" },
          { country: "NovaScale Labs", status: "VP Hire Trigger", code: "Token Re-Architecture", amount: "$42,000" },
          { country: "Kroma Systems", status: "Migration Trigger", code: "Cloud Audit & Systems", amount: "$50,000" },
          { country: "CloudFleet Global", status: "Expansion Trigger", code: "APAC Localization", amount: "$38,000" },
        ]
      }
    },
    {
      id: "pipeline",
      title: "Opportunity Pipeline",
      icon: LineChart,
      tag: "Stage Conviction",
      heading: "Your Client Pipeline. Finally Under Control.",
      description: "Move potential work through clear stages of certainty. From first exploratory conversation to signed scope, maintain full momentum and never let high-value opportunities go cold.",
      stats: [
        { label: "Pipeline Clarity", value: "100%" },
        { label: "Stage Velocity", value: "+45%" },
        { label: "Stalled Opportunity Alerts", value: "Automated" },
      ],
      features: [
        "Visual stage progression based on verified prospect interest",
        "Weighted value forecasting based on historical win probabilities",
        "Intelligent inactivity alerts when warm opportunities stall",
        "Custom engagement scopes and proposal tracking"
      ],
      previewContent: {
        badge: "OPPORTUNITY VELOCITY",
        mainTitle: "Active Stage Tracking",
        items: [
          { country: "Discovered Opportunities", status: "5 Signals", code: "Early Intelligence", amount: "$145,000" },
          { country: "Dossier & Pitch Ready", status: "4 Deals", code: "Executive Hooks", amount: "$118,000" },
          { country: "In Conversation", status: "3 Deals", code: "High Context", amount: "$84,000" },
          { country: "Negotiating & Won", status: "2 Deals", code: "Contracting", amount: "$38,000" },
        ]
      }
    },
    {
      id: "outreach",
      title: "Outreach Calibration",
      icon: Zap,
      tag: "High-Context Hooks",
      heading: "Start Conversations Grounded in Real Context",
      description: "Stop blasting generic boilerplate. Calibrate personalized opening angles, reference verified company challenges, and walk into every pitch with undeniable relevance.",
      stats: [
        { label: "Reply Rate Lift", value: "+62%" },
        { label: "Prep Time Saved", value: "4 hrs/deal" },
        { label: "Message Standard", value: "Executive" },
      ],
      features: [
        "Angle generator calibrated to specific executive titles and dilemmas",
        "Reference relevant past case studies matching prospect industry",
        "Conversational tone calibration: concise, senior, and confident",
        "Objection anticipation and strategic talking points"
      ],
      previewContent: {
        badge: "HOOK CALIBRATION",
        mainTitle: "Opening Angle Synthesizer",
        items: [
          { country: "Angle 1: Fragmented Design Debt", status: "Recommended", code: "VP Design Context", amount: "94% Fit" },
          { country: "Angle 2: Multi-Squad Token Friction", status: "Secondary", code: "Head of Product", amount: "88% Fit" },
          { country: "Angle 3: Post-Series B Acceleration", status: "Alternative", code: "Founder Angle", amount: "82% Fit" },
          { country: "Angle 4: Hiring Delay Mitigation", status: "Benchmarked", code: "CTO Angle", amount: "78% Fit" },
        ]
      }
    },
    {
      id: "operations",
      title: "Client Operations",
      icon: Layers,
      tag: "Relationship OS",
      heading: "Every Relationship. Every Milestone. One Workspace.",
      description: "Once the engagement is won, seamlessly shift to project delivery. Track client milestones, touchpoint cadence, deliverable sign-offs, and relationship health without switching apps.",
      stats: [
        { label: "Client Retention", value: "94.6%" },
        { label: "Milestone Tracking", value: "On-Schedule" },
        { label: "Context Loss", value: "Zero" },
      ],
      features: [
        "Clean shared client portal for deliverables and milestone reviews",
        "Relationship health monitoring and automatic check-in cadence",
        "Scope expansion alerts when client needs outgrow the initial brief",
        "Historical conversation archive and decision log"
      ],
      previewContent: {
        badge: "RELATIONSHIP HEALTH",
        mainTitle: "Active Engagements Ledger",
        items: [
          { country: "Apex Global (Design System)", status: "Milestone 2/4", code: "Retainer Active", amount: "$15k/mo" },
          { country: "Vanguard HQ (Advisory)", status: "Milestone 3/3", code: "Renewal Due", amount: "$22k/mo" },
          { country: "NovaScale (Architecture)", status: "Milestone 1/3", code: "Kickoff Done", amount: "$18k/mo" },
          { country: "Forma Interactive (Design)", status: "Milestone 4/4", code: "Completed", amount: "$30k Scope" },
        ]
      }
    }
  ];

  const current = modules[activeTab];

  return (
    <section id="features" className="py-20 md:py-28 bg-white dark:bg-[#080808] transition-colors relative border-t border-slate-200/60 dark:border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="ui-label text-indigo-600 dark:text-indigo-400 mb-3 block">
            Integrated Disciplines
          </span>
          <h2 className="section-title text-slate-950 dark:text-[#f5f5f3] tracking-tight mb-3">
            Four Disciplines. <br className="hidden sm:inline" />
            One Working System.
          </h2>
          <div className="editorial-italic text-2xl sm:text-3xl text-slate-600 dark:text-neutral-400 mb-6">
            <span className="gradient-text font-serif italic">From First Signal to Long-Term Client.</span>
          </div>
          <p className="body-lg text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Client Forge connects the dots between discovery, opportunity tracking, tailored outreach, and ongoing client operations.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex items-center justify-start md:justify-center overflow-x-auto pb-4 mb-12 gap-2 sm:gap-3 no-scrollbar">
          {modules.map((mod, idx) => {
            const Icon = mod.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-slate-950 dark:bg-white text-white dark:text-neutral-950 shadow-lg shadow-slate-950/10 scale-100"
                    : "bg-slate-100 dark:bg-neutral-900 text-slate-600 dark:text-neutral-400 hover:bg-slate-200 dark:hover:bg-neutral-800 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400 dark:text-indigo-600' : 'text-slate-400'}`} />
                <span>{mod.title}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                  isActive ? 'bg-slate-800 dark:bg-neutral-200 text-indigo-300 dark:text-indigo-800' : 'bg-slate-200/80 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400'
                }`}>
                  {mod.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Module Showcase Card */}
        <div className="rounded-3xl border border-slate-200 dark:border-neutral-800 bg-gradient-to-b from-slate-50/70 to-white dark:from-neutral-900/60 dark:to-[#0c0c0e] p-6 sm:p-10 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Details & Features */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" />
                {current.tag}
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-slate-950 dark:text-white leading-tight">
                {current.heading}
              </h3>

              <p className="body-lg text-slate-600 dark:text-neutral-400 leading-relaxed">
                {current.description}
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 pt-2 border-y border-slate-200/80 dark:border-neutral-800 py-4">
                {current.stats.map((s, i) => (
                  <div key={i}>
                    <div className="metric text-slate-900 dark:text-white">{s.value}</div>
                    <div className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Bullet Features */}
              <div className="space-y-2.5 pt-2">
                {current.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <a 
                  href="#pricing" 
                  className="inline-flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 group"
                >
                  Explore {current.title} in detail
                  <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right Column: Visual Mockup Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-4 mb-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded">
                      {current.previewContent.badge}
                    </span>
                    <h4 className="font-serif text-base text-slate-900 dark:text-white mt-1">
                      {current.previewContent.mainTitle}
                    </h4>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                <div className="space-y-3">
                  {current.previewContent.items.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-neutral-850 border border-slate-100/80 dark:border-neutral-750 hover:border-indigo-500/30 transition-colors">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-neutral-200">
                        <span className="font-serif text-sm">{item.country}</span>
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold">{item.amount}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-neutral-400 mt-1">
                        <span>{item.code}</span>
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                          <CheckCircle2 className="w-3 h-3" /> {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-neutral-800 flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
                  <span>Continuous signal indexing</span>
                  <span className="font-semibold text-slate-700 dark:text-neutral-300">100% Verified Context</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
