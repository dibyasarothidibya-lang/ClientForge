"use client";

import React, { useState } from "react";
import { Check, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers = [
    {
      name: "Independent Operator",
      tagline: "For solo consultants, fractional leads, and senior specialists winning high-value work.",
      monthlyPrice: 59,
      annualPrice: 49,
      popular: false,
      features: [
        "Up to 25 Active Opportunity Pipelines",
        "Unlimited Prospect Dossier Syntheses",
        "High-Context Opening Angle Generator",
        "Stage Velocity & Deal Value Tracking",
        "Client Notes & Milestone Delivery Ledger",
        "Direct LinkedIn & Web Intelligence Importer",
        "Standard Email & Chat Support (24h SLA)"
      ],
      ctaText: "Start Forging",
      ctaLink: "#pricing"
    },
    {
      name: "Boutique Studio",
      tagline: "For design studios, engineering consultancies, and growth advisory teams.",
      monthlyPrice: 149,
      annualPrice: 119,
      popular: true,
      features: [
        "Everything in Independent Operator, plus:",
        "Unlimited Active Opportunity Pipelines",
        "Multi-Seat Shared Dossiers & Team Collaboration",
        "Real-Time Public Signal Feeds & Trigger Alerts",
        "Executive Relationship OS & Client Portal",
        "Historical Win/Loss Intelligence & Velocity Metrics",
        "Custom Export to Notion, Linear & Google Workspace",
        "Priority 4h Strategy Support"
      ],
      ctaText: "Start Forging",
      ctaLink: "#pricing"
    },
    {
      name: "Growth Practice",
      tagline: "For established agencies, multi-partner practices, and enterprise advisory.",
      monthlyPrice: 349,
      annualPrice: 289,
      popular: false,
      features: [
        "Everything in Boutique Studio, plus:",
        "Dedicated Custom Signal Radar & Competitive Alerts",
        "Multi-Workspace Entity Management & Partner Accounts",
        "Custom CRM & ERP Two-Way Sync (Salesforce, HubSpot)",
        "Automated Pipeline Inactivity & Deal Slippage Prevention",
        "Dedicated Account Director & Onboarding Workshop",
        "Custom Data Residency & Enterprise Confidentiality SLA",
        "Private Shared Slack Connect Channel"
      ],
      ctaText: "Contact Advisory Team",
      ctaLink: "#demo"
    }
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 bg-slate-50/60 dark:bg-[#080808] border-t border-slate-200/60 dark:border-neutral-900 transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="ui-label text-indigo-600 dark:text-indigo-400 mb-3 block">
            Transparent Investment
          </span>
          <h2 className="section-title text-slate-950 dark:text-[#f5f5f3] tracking-tight mb-3">
            Transparent Investment. <br className="hidden sm:inline" />
            Immediate Leverage.
          </h2>
          <div className="editorial-italic text-2xl sm:text-3xl text-slate-600 dark:text-neutral-400 mb-6">
            <span className="gradient-text font-serif italic">Choose the Velocity That Fits Your Business.</span>
          </div>
          <p className="body-lg text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Invest in client acquisition infrastructure that pays for itself with a single closed engagement.
          </p>

          {/* Billing Switch Toggle */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-sm">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                !isAnnual
                  ? "bg-slate-950 dark:bg-white text-white dark:text-neutral-950 shadow-sm"
                  : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                isAnnual
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/20"
                  : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span>Annual Billing</span>
              <span className={`text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-full ${
                isAnnual ? 'bg-white/20 text-white' : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
              }`}>
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-200 relative ${
                tier.popular
                  ? "bg-white dark:bg-neutral-900 border-2 border-indigo-600 dark:border-indigo-500 shadow-2xl shadow-indigo-600/10 lg:-translate-y-2"
                  : "bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-sm hover:shadow-md"
              }`}
            >
              {/* Most Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-emerald-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                {/* Tier Name & Tagline */}
                <h3 className="font-serif text-2xl text-slate-900 dark:text-white">{tier.name}</h3>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1 min-h-[32px] leading-relaxed">{tier.tagline}</p>

                {/* Pricing Display */}
                <div className="my-6 pb-6 border-b border-slate-100 dark:border-neutral-800">
                  <div className="flex items-baseline gap-1">
                    <span className="metric text-slate-900 dark:text-white tracking-tight">
                      ${isAnnual ? tier.annualPrice : tier.monthlyPrice}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 font-medium">
                      / month
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 dark:text-neutral-500 mt-1">
                    {isAnnual ? "Billed annually (Includes 2 months free)" : "Billed month-to-month, cancel anytime"}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Included Capabilities:
                  </div>
                  {tier.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-neutral-300">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Action Button */}
              <div>
                <a
                  href={tier.ctaLink}
                  className={`w-full inline-flex items-center justify-center px-4 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-sm ${
                    tier.popular
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/25 hover:scale-[1.02] active:scale-[0.98]"
                      : "bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-900 dark:text-white"
                  }`}
                >
                  {tier.ctaText}
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Security Reassurance Footer */}
        <div className="mt-14 pt-8 border-t border-slate-200/80 dark:border-neutral-800 text-center flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-neutral-400 font-medium">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>14-day free trial on all plans</span>
          </div>
          <div>•</div>
          <div>No credit card required upfront</div>
          <div>•</div>
          <div>Cancel anytime in 1 click</div>
        </div>

      </div>
    </section>
  );
}
