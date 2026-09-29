"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpatialMeshBackground from "@/components/ui/SpatialMeshBackground";
import ThreeDCard from "@/components/motion/ThreeDCard";
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
  Award,
  Users,
  Briefcase,
  Calendar,
  CreditCard,
  Sparkles,
  X,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PricingPage() {
  const [productSuite, setProductSuite] = useState<"peoplecore" | "clientforge">("peoplecore");
  const [billingCycle, setBillingCycle] = useState("Annual (Save 20%)");
  const isAnnual = billingCycle.includes("Annual");
  const isQuarterly = billingCycle.includes("Quarterly");

  // Headcount calculator for PeopleCore
  const [headcount, setHeadcount] = useState(35);

  // Stripe Checkout Modal state
  const [isStripeModalOpen, setIsStripeModalOpen] = useState(false);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<{
    name: string;
    price: number | string;
    period: string;
  } | null>(null);
  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvc, setCardCvc] = useState("888");
  const [billingPostal, setBillingPostal] = useState("94103");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // ---------------- PEOPLECORE HR TIERS ----------------
  const peopleCoreTiers = [
    {
      name: "Free",
      tagline: "For early-stage startups and lean teams getting started with HR.",
      monthlyPerEmp: 0,
      annualPerEmp: 0,
      maxEmployees: "Up to 10 employees",
      popular: false,
      accent: "from-slate-600 to-slate-800",
      features: [
        "Up to 10 Active Employees",
        "Basic HR Directory & Org Chart",
        "Employee Self-Service Profile",
        "Simple Leave & PTO Requests",
        "Standard Document Storage",
        "Community & Email Support"
      ],
      ctaText: "Start Free",
      planKey: "free"
    },
    {
      name: "Professional",
      tagline: "For growing teams needing structured attendance, recruitment, and approvals.",
      monthlyPerEmp: 8,
      annualPerEmp: 6,
      maxEmployees: "Up to 50 employees",
      popular: true,
      accent: "from-indigo-600 to-sky-600",
      features: [
        "Up to 50 Active Employees",
        "Full Recruitment & ATS Kanban",
        "Biometric & Browser Attendance",
        "Multi-Tier Approval Chains (Emp → Mgr → HR)",
        "Automated Timesheet Export",
        "10 Event-Driven Workflows",
        "Priority 8h Business SLA"
      ],
      ctaText: "Start 14-Day Pro Trial",
      planKey: "professional"
    },
    {
      name: "Business",
      tagline: "For scaling companies demanding automated payroll, performance, and compliance.",
      monthlyPerEmp: 14,
      annualPerEmp: 11,
      maxEmployees: "Up to 250 employees",
      popular: false,
      accent: "from-violet-600 to-purple-600",
      features: [
        "Up to 250 Active Employees",
        "Automated Multi-State Payroll Engine",
        "NACHA Direct Deposit & Tax Calculations",
        "360-Degree Performance & OKRs",
        "Receipt OCR Expense Processing",
        "Unlimited Custom Workflows",
        "Granular Role-Based Permissions (RBAC)",
        "Dedicated Account Specialist"
      ],
      ctaText: "Deploy Business Tier",
      planKey: "business"
    },
    {
      name: "Enterprise",
      tagline: "For global enterprises requiring custom integrations, dedicated tenancy, and 99.99% SLA.",
      monthlyPerEmp: "Custom",
      annualPerEmp: "Custom",
      maxEmployees: "Unlimited headcount",
      popular: false,
      accent: "from-amber-600 to-rose-600",
      features: [
        "Unlimited Global Headcount",
        "Custom Payroll Rules & Union Policies",
        "SAML SSO & SCIM Provisioning",
        "Dedicated Single-Tenant VPC / Residency",
        "99.99% Uptime Guarantee SLA",
        "Custom ERP Two-Way Sync (Workday/SAP)",
        "24/7 Named Technical Lead"
      ],
      ctaText: "Contact Enterprise Sales",
      planKey: "enterprise"
    }
  ];

  // ---------------- CLIENT FORGE TIERS (Preserved) ----------------
  const clientForgeTiers = [
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

  const handleOpenCheckout = (tierName: string, price: number | string, period: string) => {
    setSelectedPlanForCheckout({ name: tierName, price, period });
    setSubscribeSuccess(false);
    setIsStripeModalOpen(true);
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    setTimeout(() => {
      setIsSubscribing(false);
      setSubscribeSuccess(true);
      setTimeout(() => {
        setIsStripeModalOpen(false);
      }, 2000);
    }, 1500);
  };

  const getClientForgePrice = (tier: typeof clientForgeTiers[0]) => {
    if (isAnnual) return tier.annualPrice;
    if (isQuarterly) return tier.quarterlyPrice;
    return tier.monthlyPrice;
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#070709] text-slate-900 dark:text-neutral-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white transition-colors duration-200 relative font-sans">
      <SpatialMeshBackground />
      <Navbar />

      <section className="relative z-10 pt-32 sm:pt-40 pb-16 sm:pb-24 overflow-hidden">
        <div 
          aria-hidden="true"
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[380px] bg-gradient-to-b from-indigo-500/10 dark:from-indigo-500/15 via-sky-500/5 to-transparent blur-[130px] pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* High-level product toggle */}
            <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-slate-200/80 dark:bg-white/[0.06] border border-slate-300 dark:border-white/[0.08] mb-6 shadow-sm">
              <button
                onClick={() => setProductSuite("peoplecore")}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  productSuite === "peoplecore"
                    ? "bg-white dark:bg-neutral-900 text-indigo-600 dark:text-indigo-400 shadow-md"
                    : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>PeopleCore HR Platform</span>
              </button>
              <button
                onClick={() => setProductSuite("clientforge")}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  productSuite === "clientforge"
                    ? "bg-white dark:bg-neutral-900 text-indigo-600 dark:text-indigo-400 shadow-md"
                    : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Client Forge Advisory Suites</span>
              </button>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-950 dark:text-white leading-[1.08] mb-4"
            >
              {productSuite === "peoplecore" ? (
                <>Predictable Pricing That Scales With <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-sky-500 to-indigo-400">Your Headcount.</span></>
              ) : (
                <>Transparent Investment. <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-600">Immediate Leverage.</span></>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-8"
            >
              {productSuite === "peoplecore"
                ? "Every PeopleCore tier includes access to our unified workforce database. Upgrade as your team expands."
                : "Invest in autonomous opportunity intelligence and high-conviction pipeline architecture that pays for itself with a single closed engagement."}
            </motion.p>

            {/* Billing Frequency Switcher */}
            <div className="flex justify-center">
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
            </div>

            {/* Headcount Interactive Slider for PeopleCore */}
            {productSuite === "peoplecore" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-10 p-6 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-md max-w-xl mx-auto text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-700 dark:text-neutral-300">
                    Calculate by company headcount:
                  </span>
                  <span className="text-base font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
                    {headcount} Employees
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="300"
                  step="5"
                  value={headcount}
                  onChange={(e) => setHeadcount(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>5 employees</span>
                  <span>100 employees</span>
                  <span>300+ employees</span>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-xs">
                  <span className="text-slate-500">Estimated Business Plan Total:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    ${(headcount * (isAnnual ? 11 : 14)).toLocaleString()} / month
                    <span className="text-[10px] text-slate-400 font-normal ml-1">({isAnnual ? "billed annually" : "billed monthly"})</span>
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          {/* ----------------- PEOPLECORE TIERS ----------------- */}
          {productSuite === "peoplecore" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mt-12">
              {peopleCoreTiers.map((tier, idx) => {
                const perEmpPrice = isAnnual ? tier.annualPerEmp : tier.monthlyPerEmp;
                return (
                  <ThreeDCard
                    key={idx}
                    glareColor={tier.popular ? "#6366f1" : "#38bdf8"}
                    maxTilt={tier.popular ? 8 : 6}
                    elevationZ={tier.popular ? 20 : 12}
                    className="h-full"
                  >
                    <div
                      className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all relative h-full backdrop-blur-xl ${
                        tier.popular
                          ? "bg-white/95 dark:bg-[#121217]/95 border-2 border-indigo-600 dark:border-indigo-500 shadow-xl shadow-indigo-600/15"
                          : "bg-white/90 dark:bg-[#0f0f13]/90 border border-slate-200/90 dark:border-neutral-800 shadow-sm"
                      }`}
                    >
                      {tier.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-semibold uppercase tracking-wider shadow-md">
                          Recommended
                        </div>
                      )}

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            {tier.name}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-neutral-400 min-h-[36px] leading-relaxed">
                          {tier.tagline}
                        </p>

                        <div className="my-6">
                          {typeof perEmpPrice === "number" ? (
                            <div>
                              <span className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white">
                                ${perEmpPrice}
                              </span>
                              <span className="text-xs text-slate-500 ml-1.5 font-medium">
                                / emp / month
                              </span>
                              <div className="text-[11px] text-slate-400 mt-0.5">
                                {tier.maxEmployees}
                              </div>
                            </div>
                          ) : (
                            <div>
                              <span className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white">
                                Custom
                              </span>
                              <div className="text-[11px] text-slate-400 mt-0.5">
                                {tier.maxEmployees}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2.5 text-xs text-slate-700 dark:text-neutral-300">
                          {tier.features.map((feat, fi) => (
                            <div key={fi} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/[0.06]">
                        <button
                          onClick={() => handleOpenCheckout(tier.name, perEmpPrice, isAnnual ? "Annual" : "Monthly")}
                          className={`w-full py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1.5 ${
                            tier.popular
                              ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25"
                              : "bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-900 dark:text-white"
                          }`}
                        >
                          <span>{tier.ctaText}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </ThreeDCard>
                );
              })}
            </div>
          )}

          {/* ----------------- CLIENT FORGE TIERS ----------------- */}
          {productSuite === "clientforge" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mt-12">
              {clientForgeTiers.map((tier, idx) => (
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
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-semibold uppercase tracking-wider shadow-md">
                        Most Popular
                      </div>
                    )}

                    <div>
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

                      <div className="my-6">
                        <div className="flex items-baseline gap-1">
                          <span className="font-sans text-4xl sm:text-5xl font-medium tracking-tight text-slate-950 dark:text-white tabular-nums">
                            ${getClientForgePrice(tier)}
                          </span>
                          <span className="text-xs text-slate-500 dark:text-neutral-400 font-sans">
                            / month
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-neutral-400 mt-1 font-sans">
                          {isAnnual ? "Billed annually" : isQuarterly ? "Billed quarterly" : "Billed monthly"}
                        </div>
                      </div>

                      <div className="space-y-3 pt-2">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-neutral-400">
                          Included Operating Scope:
                        </span>
                        {tier.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-neutral-300">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-8 mt-8 border-t border-slate-100 dark:border-neutral-800">
                      <a
                        href={tier.ctaLink}
                        className={`w-full py-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all ${
                          tier.popular
                            ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30"
                            : "bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100"
                        }`}
                      >
                        <span>{tier.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </ThreeDCard>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* STRIPE CHECKOUT SIMULATOR MODAL */}
      <AnimatePresence>
        {isStripeModalOpen && selectedPlanForCheckout && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.1] rounded-2xl p-6 shadow-2xl space-y-4 text-left relative"
            >
              <button
                onClick={() => setIsStripeModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <CreditCard className="w-5 h-5" />
                <h3 className="text-lg font-bold text-slate-950 dark:text-white">Stripe Checkout Simulation</h3>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Plan: {selectedPlanForCheckout.name}</div>
                  <div className="text-slate-500">{selectedPlanForCheckout.period} subscription</div>
                </div>
                <div className="text-right">
                  <div className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">
                    {typeof selectedPlanForCheckout.price === "number" ? `$${selectedPlanForCheckout.price}/mo` : "Custom"}
                  </div>
                  <div className="text-[10px] text-emerald-500 font-semibold">14-Day Free Access</div>
                </div>
              </div>

              {subscribeSuccess ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Subscription Confirmed!</h4>
                  <p className="text-xs text-slate-600 dark:text-neutral-300">
                    Your {selectedPlanForCheckout.name} workspace has been provisioned with 14-day trial credentials.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/workspace"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-semibold text-xs shadow-md hover:opacity-90 transition-opacity"
                    >
                      <span>Enter Workspace</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSimulatePayment} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-mono"
                      />
                      <CreditCard className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">Expires</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">CVC</label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">Postal</label>
                      <input
                        type="text"
                        value={billingPostal}
                        onChange={(e) => setBillingPostal(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
                    <Lock className="w-3 h-3 text-emerald-500" />
                    <span>256-bit encrypted via Stripe Test Gateway. Cancel anytime.</span>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubscribing}
                      className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition cursor-pointer shadow-md shadow-indigo-600/25 flex items-center justify-center gap-2"
                    >
                      {isSubscribing ? (
                        <span>Validating with Stripe...</span>
                      ) : (
                        <>
                          <span>Activate 14-Day Free Access</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
