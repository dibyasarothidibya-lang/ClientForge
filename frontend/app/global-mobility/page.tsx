"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpatialMeshBackground from "@/components/ui/SpatialMeshBackground";
import ThreeDCard from "@/components/motion/ThreeDCard";
import GlareHover from "@/components/motion/GlareHover";
import { 
  Globe2, 
  Coins, 
  ShieldCheck, 
  ArrowRight, 
  FileText, 
  Building, 
  CheckCircle2, 
  Banknote, 
  Clock, 
  Scale, 
  Layers,
  MapPin
} from "lucide-react";
import { motion } from "framer-motion";

export default function GlobalMobilityPage() {
  const [selectedCountry, setSelectedCountry] = useState(0);

  const pillars = [
    {
      title: "140+ Country Statutory Compliance",
      desc: "Instant automated generation of localized employment contracts, IP assignment deeds, and statutory benefits compliant with labor laws in 140+ jurisdictions.",
      icon: Scale,
      stat: "140+",
      statLabel: "Covered Jurisdictions",
      color: "#2dd4bf"
    },
    {
      title: "Same-Day Multi-Currency Clearing",
      desc: "Clear contractor and employee payroll in local currencies (USD, EUR, GBP, SGD, JPY) without intermediate banking fees or FX exposure.",
      icon: Coins,
      stat: "0% FX Fee",
      statLabel: "Mid-Market Exchange Clearing",
      color: "#38bdf8"
    },
    {
      title: "Autonomous Entity & Tax Withholding",
      desc: "Automate statutory filings, localized health benefits, social security contributions, and cross-border tax withholdings without setting up foreign entities.",
      icon: Building,
      stat: "100%",
      statLabel: "Audit & Tax Protection Guarantee",
      color: "#818cf8"
    },
    {
      title: "Unified Cross-Border People OS",
      desc: "Single dashboard for managing international contractor invoices, milestone sign-offs, performance reviews, and visa mobility workflows.",
      icon: Layers,
      stat: "1 Click",
      statLabel: "Global Batch Payroll Execution",
      color: "#f59e0b"
    }
  ];

  const countryCalculations = [
    {
      country: "Germany (GmbH / EOR)",
      flag: "🇩🇪",
      currency: "EUR (€)",
      statutoryTax: "Social Security: 19.8% • Pension: 9.3%",
      standardBenefit: "30 Days Statutory PTO • Statutory Health Insurance",
      complianceTime: "48 Hours Onboarding SLA",
      riskRating: "Zero Legal Friction"
    },
    {
      country: "United Kingdom (Ltd / EOR)",
      flag: "🇬🇧",
      currency: "GBP (£)",
      statutoryTax: "Employer NIC: 13.8% • Workplace Pension: 3.0%",
      standardBenefit: "28 Days Statutory Leave • NHS Supplementary Cover",
      complianceTime: "24 Hours Onboarding SLA",
      riskRating: "Fully Automated"
    },
    {
      country: "Singapore (Pte Ltd / EOR)",
      flag: "🇸🇬",
      currency: "SGD ($)",
      statutoryTax: "CPF Employer Contribution: 17% • Skills Dev Levy",
      standardBenefit: "14-21 Days Leave • Comprehensive Medical Mesh",
      complianceTime: "24 Hours Onboarding SLA",
      riskRating: "Instant Clearing"
    },
    {
      country: "Japan (KK / EOR)",
      flag: "🇯🇵",
      currency: "JPY (¥)",
      statutoryTax: "Health & Welfare Pension: 15.6% • Labor Insurance",
      standardBenefit: "Golden Week Observance • Shakai Hoken Health",
      complianceTime: "72 Hours Onboarding SLA",
      riskRating: "Zero Legal Friction"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#070709] text-slate-900 dark:text-neutral-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white transition-colors duration-200 relative">
      {/* 3D Spatial Canvas (Calm particle depth, strictly ZERO 3D geometric objects) */}
      <SpatialMeshBackground />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden">
        {/* Soft Radial Ambient Glow */}
        <div 
          aria-hidden="true"
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[380px] bg-gradient-to-b from-teal-500/10 dark:from-teal-500/15 via-sky-500/5 to-transparent blur-[130px] pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Editorial Headline & Copy */}
            <div className="lg:col-span-7">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-slate-950 dark:text-white leading-[1.04] mb-6"
              >
                Unified Cross-Border{" "}
                <span className="font-serif italic bg-gradient-to-r from-teal-600 via-sky-600 to-indigo-600 dark:from-teal-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
                  Payroll & Compliance
                </span>
                .
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-base sm:text-lg text-slate-600 dark:text-neutral-400 max-w-xl leading-relaxed mb-8 font-normal"
              >
                Automate statutory filings, localized benefits packages, and instant multi-currency clearing across 140+ countries without establishing expensive foreign corporate entities.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center gap-4"
              >
                <a
                  href="/signup"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-white bg-slate-950 hover:bg-slate-800 dark:text-slate-950 dark:bg-white dark:hover:bg-zinc-100 rounded-xl transition-all shadow-md group cursor-pointer"
                >
                  <span>Deploy Global Payroll</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="/pricing"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold border border-slate-200/90 bg-white/90 hover:bg-slate-50 text-slate-800 dark:border-neutral-800 dark:bg-neutral-900/80 dark:hover:bg-neutral-800 dark:text-neutral-200 rounded-xl transition-all shadow-xs backdrop-blur-md cursor-pointer"
                >
                  <span>Explore Pricing Tiers</span>
                </a>
              </motion.div>

              {/* Mini Highlights */}
              <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-slate-200/80 dark:border-neutral-800/80">
                <div>
                  <div className="font-serif text-2xl sm:text-3xl text-slate-950 dark:text-white font-normal">140+</div>
                  <div className="text-[11px] text-slate-500 dark:text-neutral-400 font-mono mt-0.5">Countries Supported</div>
                </div>
                <div>
                  <div className="font-serif text-2xl sm:text-3xl text-slate-950 dark:text-white font-normal">0% FX</div>
                  <div className="text-[11px] text-slate-500 dark:text-neutral-400 font-mono mt-0.5">Mid-Market Multi-Currency</div>
                </div>
                <div>
                  <div className="font-serif text-2xl sm:text-3xl text-slate-950 dark:text-white font-normal">100%</div>
                  <div className="text-[11px] text-slate-500 dark:text-neutral-400 font-mono mt-0.5">Statutory Audit Protection</div>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Interactive Hero Showcase with Preserved Image */}
            <div className="lg:col-span-5">
              <ThreeDCard
                glareColor="#2dd4bf"
                glareOpacity={0.16}
                maxTilt={8}
                elevationZ={28}
                className="w-full"
              >
                <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 dark:border-neutral-800 shadow-2xl bg-white dark:bg-[#121217] p-2.5">
                  <div className="relative h-96 sm:h-[460px] rounded-2xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
                      alt="Unified Cross-Border Payroll & Compliance"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                  </div>
                </div>
              </ThreeDCard>
            </div>

          </div>
        </div>
      </section>

      {/* 4 Core Pillars Grid with 3D Tilt */}
      <section className="py-20 bg-slate-100/50 dark:bg-[#09090d]/50 border-t border-slate-200/80 dark:border-neutral-900 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-950 dark:text-white font-normal">
              Enterprise Global Mobility Infrastructure
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 mt-3 max-w-xl mx-auto leading-relaxed font-normal">
              Execute cross-border payroll, contract generation, and tax compliance with guaranteed legal integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <ThreeDCard
                  key={idx}
                  glareColor={pillar.color}
                  maxTilt={6}
                  elevationZ={18}
                  className="h-full"
                >
                  <div className="rounded-3xl border border-slate-200/90 dark:border-neutral-800 bg-white/95 dark:bg-[#0f0f14]/95 p-8 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between backdrop-blur-xl">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/70 border border-teal-200/60 dark:border-teal-800/60 flex items-center justify-center text-teal-600 dark:text-teal-400">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="text-right">
                          <div className="font-serif text-2xl sm:text-3xl text-slate-950 dark:text-white font-normal">
                            {pillar.stat}
                          </div>
                          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                            {pillar.statLabel}
                          </div>
                        </div>
                      </div>

                      <h3 className="font-serif text-2xl text-slate-950 dark:text-white font-normal mb-3">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed font-normal">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </ThreeDCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive 3D Country Compliance Console */}
      <section className="py-20 sm:py-28 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl text-slate-950 dark:text-white font-normal">
              Autonomous Cross-Border Compliance Calculator
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 mt-2 font-normal">
              Select countries to inspect instant statutory tax rates, localized perks, and rapid hiring SLAs.
            </p>
          </div>

          <GlareHover
            className="rounded-3xl border border-slate-200/90 dark:border-neutral-800 bg-white/95 dark:bg-[#111116]/95 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl"
            glareColor="#2dd4bf"
            glareOpacity={0.12}
            glareSize={340}
          >
            <div className="space-y-8">
              {/* Country Tabs */}
              <div className="flex flex-wrap gap-2 pb-6 border-b border-slate-100 dark:border-neutral-800">
                {countryCalculations.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedCountry(idx)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-2 ${
                      selectedCountry === idx
                        ? "bg-teal-600 text-white shadow-md shadow-teal-600/20"
                        : "bg-slate-100 dark:bg-neutral-800/70 text-slate-700 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-800"
                    }`}
                  >
                    <span>{c.flag}</span>
                    <span>{c.country}</span>
                  </button>
                ))}
              </div>

              {/* Selected Country Details */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-neutral-400">
                    <span>{countryCalculations[selectedCountry].country}</span>
                    <span>•</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{countryCalculations[selectedCountry].riskRating}</span>
                  </div>

                  <h3 className="font-serif text-3xl text-slate-950 dark:text-white">
                    {countryCalculations[selectedCountry].flag} {countryCalculations[selectedCountry].country}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-neutral-900/60 border border-slate-200/80 dark:border-neutral-800 space-y-1">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 font-bold">
                        STATUTORY TAX WITHHOLDING:
                      </div>
                      <p className="text-xs text-slate-800 dark:text-neutral-200 font-mono">
                        {countryCalculations[selectedCountry].statutoryTax}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-neutral-900/60 border border-slate-200/80 dark:border-neutral-800 space-y-1">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 font-bold">
                        MANDATED LEAVE & HEALTH:
                      </div>
                      <p className="text-xs text-slate-800 dark:text-neutral-200 font-mono">
                        {countryCalculations[selectedCountry].standardBenefit}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-teal-50/60 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-900/60 space-y-1">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-teal-700 dark:text-teal-300 font-bold flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      <span>ONBOARDING VELOCITY:</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-neutral-300 font-sans leading-relaxed">
                      {countryCalculations[selectedCountry].complianceTime} with localized employment contract generation, IP assignment, and direct statutory filing.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-50 dark:bg-neutral-900/80 border border-slate-200 dark:border-neutral-800 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto">
                    <Globe2 className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="font-serif text-2xl text-slate-950 dark:text-white">
                      Instant Clearing
                    </div>
                    <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
                      Settles in {countryCalculations[selectedCountry].currency} with zero cross-border bank friction.
                    </p>
                  </div>
                  <a
                    href="/signup"
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-zinc-100 transition-colors shadow-sm"
                  >
                    <span>Execute Global Contract</span>
                  </a>
                </div>
              </div>

            </div>
          </GlareHover>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-slate-200/80 dark:border-neutral-900 bg-slate-100/50 dark:bg-[#070709] relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-950 dark:text-white font-normal mb-4">
            Build a Borderless Team with Zero Legal Overhead
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 max-w-xl mx-auto mb-8 leading-relaxed font-normal">
            Hire, onboard, and pay talent anywhere in the world in minutes. 100% compliant, 0% foreign entity headache.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-white bg-slate-950 hover:bg-slate-800 dark:text-slate-950 dark:bg-white dark:hover:bg-zinc-100 rounded-xl transition-all shadow-md group cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold border border-slate-200 dark:border-neutral-800 bg-white hover:bg-slate-50 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-800 dark:text-neutral-200 rounded-xl transition-all cursor-pointer"
            >
              <span>View Pricing Plans</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
