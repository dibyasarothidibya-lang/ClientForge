"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpatialMeshBackground from "@/components/ui/SpatialMeshBackground";
import ThreeDCard from "@/components/motion/ThreeDCard";
import GlareHover from "@/components/motion/GlareHover";
import RubberSegment from "@/components/motion/RubberSegment";
import { 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  HelpCircle, 
  Zap, 
  Lock, 
  Globe, 
  ChevronDown,
  Clock,
  Layers,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("Annual (Save 20%)");
  const isAnnual = billingCycle.includes("Annual");
  const isQuarterly = billingCycle.includes("Quarterly");

  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const tiers = [
    {
      name: "Independent Operator",
      tagline: "For solo consultants, fractional leads, and senior specialists winning high-value work.",
      monthlyPrice: 59,
      quarterlyPrice: 54,
      annualPrice: 49,
      popular: false,
      accent: "from-slate-600 to-slate-800",
      features: [
        "Up to 25 Active Opportunity Pipelines",
        "Unlimited Prospect Dossier Syntheses",
        "High-Context Opening Angle Generator",
        "Stage Velocity & Deal Value Tracking",
        "Client Notes & Milestone Delivery Ledger",
        "Direct LinkedIn & Web Intelligence Importer",
        "Standard Email & Chat Support (24h SLA)",
        "Single-Tenant Data Encryption"
      ],
      ctaText: "Start Free 14-Day Trial",
      ctaLink: "/signup?plan=independent"
    },
    {
      name: "Boutique Studio",
      tagline: "For design studios, engineering consultancies, and growth advisory teams.",
      monthlyPrice: 149,
      quarterlyPrice: 135,
      annualPrice: 119,
      popular: true,
      accent: "from-indigo-600 to-sky-600",
      features: [
        "Everything in Independent Operator, plus:",
        "Unlimited Active Opportunity Pipelines",
        "Multi-Seat Shared Dossiers & Team Collaboration",
        "Real-Time Public Signal Feeds & Trigger Alerts",
        "Executive Relationship OS & Client Portal",
        "Historical Win/Loss Intelligence & Velocity Metrics",
        "Custom Export to Notion, Linear & Google Workspace",
        "Priority 4h Strategy Support",
        "Full API & Webhook Access"
      ],
      ctaText: "Deploy Boutique Studio",
      ctaLink: "/signup?plan=boutique"
    },
    {
      name: "Growth Practice",
      tagline: "For established agencies, multi-partner practices, and enterprise advisory.",
      monthlyPrice: 349,
      quarterlyPrice: 319,
      annualPrice: 289,
      popular: false,
      accent: "from-violet-600 to-purple-600",
      features: [
        "Everything in Boutique Studio, plus:",
        "Dedicated Custom Signal Radar & Competitive Alerts",
        "Multi-Workspace Entity Management & Partner Accounts",
        "Custom CRM & ERP Two-Way Sync (Salesforce, HubSpot)",
        "Automated Pipeline Inactivity & Deal Slippage Prevention",
        "Dedicated Account Director & Onboarding Workshop",
        "Custom Data Residency & Enterprise Confidentiality SLA",
        "Private Shared Slack Connect Channel",
        "Custom Workflow Engineering Support"
      ],
      ctaText: "Start Growth Practice",
      ctaLink: "/signup?plan=growth"
    }
  ];

  const comparisonCategories = [
    {
      name: "Pipeline & Opportunity Intelligence",
      items: [
        { feature: "Active Opportunity Pipelines", independent: "25 Pipelines", boutique: "Unlimited", enterprise: "Unlimited" },
        { feature: "Prospect Dossier Syntheses", independent: "Unlimited", boutique: "Unlimited", enterprise: "Unlimited" },
        { feature: "Live Signal Feeds & Triggers", independent: "Standard Daily", boutique: "Real-Time 15m", enterprise: "Instant Sub-Second" },
        { feature: "Context-Aware Angle Generator", independent: "Standard", boutique: "Advanced Multilingual", enterprise: "Custom Domain Model" },
      ]
    },
    {
      name: "Collaboration & Workspaces",
      items: [
        { feature: "Included Team Seats", independent: "1 Seat", boutique: "Up to 5 Seats", enterprise: "Custom Enterprise Seats" },
        { feature: "Multi-Workspace Entity Control", independent: "—", boutique: "Up to 3", enterprise: "Unlimited Multi-Org" },
        { feature: "Role-Based Access Controls", independent: "Basic", boutique: "Granular", enterprise: "SSO / SAML 2.0 & Okta" },
        { feature: "Shared Client Portals", independent: "—", boutique: "Included", enterprise: "Custom Domain White-Label" },
      ]
    },
    {
      name: "Integrations & Security",
      items: [
        { feature: "CRM & ATS Synchronization", independent: "CSV / Webhook", boutique: "Native Hubspot/Linear", enterprise: "Salesforce/Workday Two-Way" },
        { feature: "Data Encryption & Residency", independent: "AES-256", boutique: "AES-256 + US/EU", enterprise: "Dedicated Single-Tenant VPC" },
        { feature: "Audit Logs & Compliance", independent: "30 Days", boutique: "1 Year", enterprise: "Immutable Real-Time SIEM" },
        { feature: "Support SLA Guarantee", independent: "24h Standard", boutique: "4h Priority", enterprise: "1h 24/7 Dedicated Lead" },
      ]
    }
  ];

  const faqs = [
    {
      q: "Can I switch billing frequencies or plans at any time?",
      a: "Yes. You can upgrade, downgrade, or switch between Monthly, Quarterly, and Annual billing whenever you choose directly in your workspace settings. Prorated credits are automatically calculated and applied to your account."
    },
    {
      q: "What happens when my 14-day free trial concludes?",
      a: "No credit card is required to begin. During your 14-day trial, you receive complete access to all platform capabilities. If you decide not to select a plan, your account transitions to read-only mode with zero surprise charges."
    },
    {
      q: "Is my proprietary client data isolated and confidential?",
      a: "Absolutely. Every client dossier, angle, and pipeline is encrypted with customer-specific AES-256 keys. We enforce strict zero-retention policies on third-party AI models and never train public models on your confidential deal data."
    },
    {
      q: "Do you offer tailored migration support from legacy CRMs?",
      a: "Yes. Boutique Studio and Growth Practice tiers receive assisted white-glove data imports from Salesforce, HubSpot, Notion, Pipedrive, and custom CSV databases with full relationship history preserved."
    },
    {
      q: "What payment methods are supported for enterprise invoices?",
      a: "We support all major credit cards, automated ACH debits, SEPA transfers, and custom net-30 invoicing with PO processing for enterprise contracts."
    }
  ];

  const getPrice = (tier: typeof tiers[0]) => {
    if (isAnnual) return tier.annualPrice;
    if (isQuarterly) return tier.quarterlyPrice;
    return tier.monthlyPrice;
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#070709] text-slate-900 dark:text-neutral-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white transition-colors duration-200 relative">
      {/* 3D Spatial Mesh Canvas (Ambient particle depth, strictly ZERO 3D geometric objects) */}
      <SpatialMeshBackground />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 sm:pt-40 pb-16 sm:pb-24 overflow-hidden">
        {/* Soft Radial Ambient Glow */}
        <div 
          aria-hidden="true"
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[380px] bg-gradient-to-b from-indigo-500/10 dark:from-indigo-500/15 via-sky-500/5 to-transparent blur-[130px] pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-slate-950 dark:text-white leading-[1.04] mb-4"
            >
              Transparent Investment. <br />
              <span className="font-serif italic bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-600 dark:from-indigo-400 dark:via-purple-300 dark:to-sky-400 bg-clip-text text-transparent">
                Immediate Leverage
              </span>
              .
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-10 font-normal"
            >
              Invest in autonomous opportunity intelligence and high-conviction pipeline architecture that pays for itself with a single closed engagement.
            </motion.p>

            {/* Billing Cycle Switcher with Spring Physics */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center"
            >
              <RubberSegment
                items={['Monthly', 'Quarterly', 'Annual (Save 20%)']}
                defaultValue="Annual (Save 20%)"
                onChange={(val) => setBillingCycle(val)}
                size="md"
                radius={12}
                inset={3}
                equalSlots
                stretch={100}
                squash={3}
                speed={1}
                glide={75}
                draggable
              />
            </motion.div>
          </div>

          {/* 3D Interactive Tier Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mt-16">
            {tiers.map((tier, idx) => (
              <ThreeDCard
                key={idx}
                glareColor={tier.popular ? "#6366f1" : "#38bdf8"}
                maxTilt={tier.popular ? 8 : 6}
                elevationZ={tier.popular ? 24 : 16}
                scaleHover={tier.popular ? 1.025 : 1.015}
                className="h-full"
              >
                <div
                  className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative h-full backdrop-blur-xl ${
                    tier.popular
                      ? "bg-white/95 dark:bg-[#121217]/95 border-2 border-indigo-600 dark:border-indigo-500 shadow-2xl shadow-indigo-600/15 lg:-translate-y-2.5"
                      : "bg-white/90 dark:bg-[#0f0f13]/90 border border-slate-200/90 dark:border-neutral-800 shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-neutral-700"
                  }`}
                >
                  {/* Popular Badge */}
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-semibold uppercase tracking-wider shadow-md font-mono">
                      Most Popular
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-serif text-2xl sm:text-3xl text-slate-900 dark:text-white font-normal">
                        {tier.name}
                      </h3>
                      {tier.popular && (
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
                      )}
                    </div>
                    
                    <p className="text-xs text-slate-500 dark:text-neutral-400 min-h-[36px] leading-relaxed">
                      {tier.tagline}
                    </p>

                    {/* Price Block */}
                    <div className="my-6 pb-6 border-b border-slate-100 dark:border-neutral-800/80">
                      <div className="flex items-baseline gap-1">
                        <span className="font-sans text-4xl sm:text-5xl font-medium tracking-tight text-slate-950 dark:text-white tabular-nums">
                          ${getPrice(tier)}
                        </span>
                        <span className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 font-medium">
                          / month
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 dark:text-neutral-500 mt-1 font-mono">
                        {isAnnual
                          ? "Billed annually (Includes 2 months free)"
                          : isQuarterly
                          ? "Billed quarterly with 10% savings"
                          : "Billed month-to-month, cancel anytime"}
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                      <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
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

                  {/* CTA Button */}
                  <div>
                    <a
                      href={tier.ctaLink}
                      className={`w-full inline-flex items-center justify-center px-4 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-sm cursor-pointer group ${
                        tier.popular
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/25 hover:scale-[1.02] active:scale-[0.98]"
                          : "bg-slate-100 dark:bg-neutral-800/80 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-900 dark:text-white"
                      }`}
                    >
                      <span>{tier.ctaText}</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </ThreeDCard>
            ))}
          </div>

          {/* Scale Unlimited Enterprise Banner with GlareHover */}
          <div className="mt-12">
            <GlareHover
              className="rounded-3xl border border-slate-200/90 dark:border-neutral-800 bg-white/90 dark:bg-[#111116]/90 p-8 sm:p-10 shadow-xl backdrop-blur-xl"
              glareColor="#818cf8"
              glareOpacity={0.12}
              glareSize={320}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8">
                  <h3 className="font-serif text-3xl sm:text-4xl font-normal text-slate-950 dark:text-white">
                    Need Custom Sovereign Deployment or Dedicated GPUs?
                  </h3>
                  <p className="text-slate-600 dark:text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed font-normal">
                    For national advisory practices, enterprise consultancies, and holding groups requiring custom SSO, private VPC data isolation, and dedicated model fine-tuning.
                  </p>
                  <div className="flex flex-wrap items-center gap-6 mt-6 text-xs text-slate-700 dark:text-neutral-300 font-medium">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span>SOC-2 Type II Certified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-sky-500" />
                      <span>Single-Tenant Data Isolation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-indigo-500" />
                      <span>EU/US Sovereign Hosting</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                  <a
                    href="/signup?plan=enterprise"
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-slate-950 hover:bg-slate-800 dark:text-slate-950 dark:bg-white dark:hover:bg-zinc-100 transition-all shadow-md cursor-pointer group text-center"
                  >
                    <span>Talk to Enterprise Lead</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="#faq"
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold border border-slate-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-800 dark:text-neutral-200 transition-all cursor-pointer text-center"
                  >
                    <span>Review Security Specs</span>
                  </a>
                </div>
              </div>
            </GlareHover>
          </div>
        </div>
      </section>

      {/* Feature Comparison Matrix Section */}
      <section className="py-20 bg-slate-100/60 dark:bg-[#0a0a0e]/60 border-t border-slate-200/80 dark:border-neutral-900 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl text-slate-950 dark:text-white font-normal">
              Compare Platform Capabilities Side-by-Side
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 mt-2">
              Every tier includes fundamental access to the Client Forge signal ontology and continuous radar.
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[760px] rounded-3xl border border-slate-200/90 dark:border-neutral-800 bg-white/95 dark:bg-[#0d0d12]/95 backdrop-blur-xl p-6 sm:p-8 shadow-sm">
              <div className="grid grid-cols-4 pb-4 border-b border-slate-200 dark:border-neutral-800 text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                <div>Capability Matrix</div>
                <div className="text-center text-slate-600 dark:text-neutral-400">Independent</div>
                <div className="text-center text-indigo-600 dark:text-indigo-400">Boutique Studio</div>
                <div className="text-center text-slate-600 dark:text-neutral-400">Enterprise</div>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-neutral-900">
                {comparisonCategories.map((cat, cIdx) => (
                  <div key={cIdx} className="pt-6 pb-2">
                    <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono mb-4">
                      {cat.name}
                    </div>
                    {cat.items.map((item, iIdx) => (
                      <div 
                        key={iIdx} 
                        className="grid grid-cols-4 py-3 text-xs sm:text-sm text-slate-700 dark:text-neutral-300 hover:bg-slate-50/70 dark:hover:bg-neutral-800/40 rounded-lg px-2 transition-colors"
                      >
                        <div className="font-medium text-slate-900 dark:text-white">{item.feature}</div>
                        <div className="text-center text-slate-600 dark:text-neutral-400">{item.independent}</div>
                        <div className="text-center font-semibold text-indigo-600 dark:text-indigo-400">{item.boutique}</div>
                        <div className="text-center text-slate-600 dark:text-neutral-400">{item.enterprise}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing FAQs Accordion */}
      <section id="faq" className="py-20 sm:py-28 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl text-slate-950 dark:text-white font-normal">
              Everything You Need to Know About Billing
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = faqOpen === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/90 dark:border-neutral-800 bg-white/90 dark:bg-[#111116]/90 backdrop-blur-md overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setFaqOpen(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-medium text-sm sm:text-base text-slate-900 dark:text-white">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-indigo-600 dark:text-indigo-400" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed border-t border-slate-100 dark:border-neutral-800/80 pt-4"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Guarantee Strip */}
          <div className="mt-16 p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-900/40 text-center flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-indigo-900 dark:text-indigo-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>14-Day Full-Featured Free Trial</span>
            </div>
            <div>•</div>
            <div>Zero Credit Card Required Upfront</div>
            <div>•</div>
            <div>Single-Click Online Cancellation</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
