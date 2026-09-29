"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Globe3D, GlobeMarker } from "@/components/ui/3d-globe";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Globe2, X, Sparkles } from "lucide-react";

const sampleMarkers: GlobeMarker[] = [
  // 0. United States (Americas)
  {
    lat: 40.7128,
    lng: -74.006,
    src: "https://assets.aceternity.com/avatars/1.webp",
    label: "New York • 42 Hires",
    region: "Americas",
    country: "United States",
    hires: 42,
    currency: "USD ($)",
    compliance: "W-2 & 1099 Automated Withholding",
    avgPayout: "< 1 Hour",
  },
  // 1. Canada (Americas)
  {
    lat: 43.6532,
    lng: -79.3832,
    src: "https://assets.aceternity.com/avatars/7.webp",
    label: "Toronto • 24 Hires",
    region: "Americas",
    country: "Canada",
    hires: 24,
    currency: "CAD ($)",
    compliance: "CRA, CPP, EI & Provincial Employment Standards",
    avgPayout: "< 1 Hour",
  },
  // 2. Mexico (Americas)
  {
    lat: 19.4326,
    lng: -99.1332,
    src: "https://assets.aceternity.com/avatars/11.webp",
    label: "Mexico City • 18 Hires",
    region: "Americas",
    country: "Mexico",
    hires: 18,
    currency: "MXN ($)",
    compliance: "IMSS, INFONAVIT & Federal Labor Law (LFT)",
    avgPayout: "Same-Day",
  },
  // 3. Colombia (Americas)
  {
    lat: 4.7110,
    lng: -74.0721,
    src: "https://assets.aceternity.com/avatars/12.webp",
    label: "Bogotá • 14 Hires",
    region: "Americas",
    country: "Colombia",
    hires: 14,
    currency: "COP ($)",
    compliance: "PILA, Colpensiones & EPS Statutory Filing",
    avgPayout: "Same-Day",
  },
  // 4. Brazil (Americas)
  {
    lat: -22.9068,
    lng: -43.1729,
    src: "https://assets.aceternity.com/avatars/8.webp",
    label: "Rio de Janeiro • 19 Hires",
    region: "Americas",
    country: "Brazil",
    hires: 19,
    currency: "BRL (R$)",
    compliance: "CLT Labor Code & eSocial Registered",
    avgPayout: "Same-Day",
  },
  // 5. Argentina (Americas)
  {
    lat: -34.6037,
    lng: -58.3816,
    src: "https://assets.aceternity.com/avatars/9.webp",
    label: "Buenos Aires • 16 Hires",
    region: "Americas",
    country: "Argentina",
    hires: 16,
    currency: "ARS ($)",
    compliance: "AFIP, Monotributo & Ley de Contrato Laboral",
    avgPayout: "< 2 Hours",
  },
  // 6. Nigeria (Africa)
  {
    lat: 6.5244,
    lng: 3.3792,
    src: "https://assets.aceternity.com/avatars/14.webp",
    label: "Lagos • 21 Hires",
    region: "Africa",
    country: "Nigeria",
    hires: 21,
    currency: "NGN (₦)",
    compliance: "FIRS, PAYE, PENCOM & NSITF Statutory Shield",
    avgPayout: "Instant",
  },
  // 7. Kenya (Africa)
  {
    lat: -1.2921,
    lng: 36.8219,
    src: "https://assets.aceternity.com/avatars/15.webp",
    label: "Nairobi • 15 Hires",
    region: "Africa",
    country: "Kenya",
    hires: 15,
    currency: "KES (KSh)",
    compliance: "KRA, NSSF, NHIF & Employment Act 2007",
    avgPayout: "Instant",
  },
  // 8. South Africa (Africa)
  {
    lat: -33.9249,
    lng: 18.4241,
    src: "https://assets.aceternity.com/avatars/3.webp",
    label: "Cape Town • 22 Hires",
    region: "Africa",
    country: "South Africa",
    hires: 22,
    currency: "ZAR (R)",
    compliance: "SARS, PAYE, UIF & Basic Conditions of Employment",
    avgPayout: "< 2 Hours",
  },
  // 9. Egypt (Africa)
  {
    lat: 30.0444,
    lng: 31.2357,
    src: "https://assets.aceternity.com/avatars/4.webp",
    label: "Cairo • 13 Hires",
    region: "Africa",
    country: "Egypt",
    hires: 13,
    currency: "EGP (E£)",
    compliance: "ETA & Statutory Social Insurance Law No. 148",
    avgPayout: "Same-Day",
  },
  // 10. United Kingdom (Europe)
  {
    lat: 51.5074,
    lng: -0.1278,
    src: "https://assets.aceternity.com/avatars/2.webp",
    label: "London • 29 Hires",
    region: "Europe",
    country: "United Kingdom",
    hires: 29,
    currency: "GBP (£)",
    compliance: "PAYE, HMRC & Workplace Pension Compliant",
    avgPayout: "< 2 Hours",
  },
  // 11. France (Europe - spaced south/west)
  {
    lat: 46.8000,
    lng: 1.8000,
    src: "https://assets.aceternity.com/avatars/5.webp",
    label: "Paris • 18 Hires",
    region: "Europe",
    country: "France",
    hires: 18,
    currency: "EUR (€)",
    compliance: "URSSAF, Mutuelle & CDI/CDD Legal Framework",
    avgPayout: "< 2 Hours",
  },
  // 12. Germany (Europe)
  {
    lat: 52.5200,
    lng: 13.4050,
    src: "https://assets.aceternity.com/avatars/7.webp",
    label: "Berlin • 34 Hires",
    region: "Europe",
    country: "Germany",
    hires: 34,
    currency: "EUR (€)",
    compliance: "GmbH Social Security & Betriebsrat Alignment",
    avgPayout: "Same-Day",
  },
  // 13. Sweden (Europe)
  {
    lat: 59.3293,
    lng: 18.0686,
    src: "https://assets.aceternity.com/avatars/11.webp",
    label: "Stockholm • 15 Hires",
    region: "Europe",
    country: "Sweden",
    hires: 15,
    currency: "SEK (kr)",
    compliance: "Skatteverket, ITP Pension & Collective Agreement",
    avgPayout: "< 2 Hours",
  },
  // 14. Norway (Europe - spaced north/west)
  {
    lat: 61.2000,
    lng: 7.2000,
    src: "https://assets.aceternity.com/avatars/4.webp",
    label: "Oslo • 11 Hires",
    region: "Europe",
    country: "Norway",
    hires: 11,
    currency: "NOK (kr)",
    compliance: "NAV National Insurance, OTP Pension & A-meldingen",
    avgPayout: "Same-Day",
  },
  // 15. Netherlands (Europe)
  {
    lat: 53.0000,
    lng: 5.5000,
    src: "https://assets.aceternity.com/avatars/15.webp",
    label: "Amsterdam • 22 Hires",
    region: "Europe",
    country: "Netherlands",
    hires: 22,
    currency: "EUR (€)",
    compliance: "30% Ruling, Belastingdienst & UWV Statutory Shield",
    avgPayout: "Instant",
  },
  // 16. Switzerland (Europe)
  {
    lat: 46.8000,
    lng: 8.2000,
    src: "https://assets.aceternity.com/avatars/1.webp",
    label: "Zurich • 16 Hires",
    region: "Europe",
    country: "Switzerland",
    hires: 16,
    currency: "CHF (Fr.)",
    compliance: "BVG/LPP Pillar 2, AHV/AVS & Cantonal Withholding",
    avgPayout: "Same-Day",
  },
  // 17. Italy (Europe - shifted south to Rome for spacious clearance)
  {
    lat: 41.9028,
    lng: 12.4964,
    src: "https://assets.aceternity.com/avatars/2.webp",
    label: "Rome • 19 Hires",
    region: "Europe",
    country: "Italy",
    hires: 19,
    currency: "EUR (€)",
    compliance: "INPS, INAIL, TFR Accrual & CCNL National Contract",
    avgPayout: "< 2 Hours",
  },
  // 18. Belgium (Europe)
  {
    lat: 50.8503,
    lng: 4.3517,
    src: "https://assets.aceternity.com/avatars/3.webp",
    label: "Brussels • 12 Hires",
    region: "Europe",
    country: "Belgium",
    hires: 12,
    currency: "EUR (€)",
    compliance: "ONSS/RSZ Social Security & Joint Committee Indexation",
    avgPayout: "< 3 Hours",
  },
  // 19. Poland (Europe)
  {
    lat: 52.2297,
    lng: 21.0122,
    src: "https://assets.aceternity.com/avatars/6.webp",
    label: "Warsaw • 27 Hires",
    region: "Europe",
    country: "Poland",
    hires: 27,
    currency: "PLN (zł)",
    compliance: "ZUS Social Insurance, B2B IP Box & UoP Registry",
    avgPayout: "Instant",
  },
  // 20. Japan (Asia-Pacific)
  {
    lat: 35.6762,
    lng: 139.6503,
    src: "https://assets.aceternity.com/avatars/3.webp",
    label: "Tokyo • 14 Hires",
    region: "Asia-Pacific",
    country: "Japan",
    hires: 14,
    currency: "JPY (¥)",
    compliance: "Labor Standards Inspection Office Aligned",
    avgPayout: "< 3 Hours",
  },
  // 21. Australia (Asia-Pacific)
  {
    lat: -33.8688,
    lng: 151.2093,
    src: "https://assets.aceternity.com/avatars/4.webp",
    label: "Sydney • 18 Hires",
    region: "Asia-Pacific",
    country: "Australia",
    hires: 18,
    currency: "AUD ($)",
    compliance: "Superannuation & Fair Work Act Guarantee",
    avgPayout: "< 2 Hours",
  },
  // 22. New Zealand (Asia-Pacific)
  {
    lat: -36.8485,
    lng: 174.7633,
    src: "https://assets.aceternity.com/avatars/14.webp",
    label: "Auckland • 9 Hires",
    region: "Asia-Pacific",
    country: "New Zealand",
    hires: 9,
    currency: "NZD ($)",
    compliance: "PAYE, KiwiSaver & Employment Relations Act",
    avgPayout: "Instant",
  },
  // 23. India (South Asia)
  {
    lat: 28.6139,
    lng: 77.209,
    src: "https://assets.aceternity.com/avatars/6.webp",
    label: "New Delhi • 56 Hires",
    region: "South Asia",
    country: "India",
    hires: 56,
    currency: "INR (₹)",
    compliance: "TDS, EPF, ESI & Professional Tax Automated",
    avgPayout: "Same-Day",
  },
  // 24. China (Asia-Pacific)
  {
    lat: 31.2304,
    lng: 121.4737,
    src: "https://assets.aceternity.com/avatars/9.webp",
    label: "Shanghai • 23 Hires",
    region: "Asia-Pacific",
    country: "China",
    hires: 23,
    currency: "CNY (¥)",
    compliance: "Mandatory Social Insurance & Housing Fund",
    avgPayout: "< 4 Hours",
  },
  // 25. UAE (Middle East)
  {
    lat: 25.2048,
    lng: 55.2708,
    src: "https://assets.aceternity.com/avatars/10.webp",
    label: "Dubai • 16 Hires",
    region: "Middle East",
    country: "United Arab Emirates",
    hires: 16,
    currency: "AED (د.إ)",
    compliance: "WPS Wage Protection & MOHRE Freezone Entity",
    avgPayout: "Instant",
  },
  // 26. Singapore (Asia-Pacific)
  {
    lat: 1.3521,
    lng: 103.8198,
    src: "https://assets.aceternity.com/avatars/12.webp",
    label: "Singapore • 31 Hires",
    region: "Asia-Pacific",
    country: "Singapore",
    hires: 31,
    currency: "SGD ($)",
    compliance: "CPF Board & MOM Employment Pass Compliant",
    avgPayout: "Instant",
  },
  // 27. South Korea (Asia-Pacific)
  {
    lat: 37.5665,
    lng: 126.978,
    src: "https://assets.aceternity.com/avatars/13.webp",
    label: "Seoul • 12 Hires",
    region: "Asia-Pacific",
    country: "South Korea",
    hires: 12,
    currency: "KRW (₩)",
    compliance: "Four National Social Insurances Registered",
    avgPayout: "< 3 Hours",
  },
];

// Region camera focus coordinates
const REGIONS: Array<{ id: string; name: string; icon: string; lat: number; lng: number }> = [
  { id: "global", name: "Global Mesh", icon: "🌐", lat: 20, lng: 10 },
  { id: "americas", name: "Americas", icon: "🌎", lat: 12, lng: -75 },
  { id: "europe", name: "Europe & UK", icon: "🇪🇺", lat: 50, lng: 12 },
  { id: "africa", name: "Africa", icon: "🌍", lat: 4, lng: 22 },
  { id: "middle-east", name: "Middle East", icon: "🇦🇪", lat: 25, lng: 52 },
  { id: "south-asia", name: "South Asia", icon: "🇮🇳", lat: 22, lng: 78 },
  { id: "apac", name: "Asia-Pacific", icon: "🇯🇵", lat: 25, lng: 128 },
];

export function GlobalWorkforceBanner() {
  const [selectedRegion, setSelectedRegion] = useState<string>("global");
  const [targetFocus, setTargetFocus] = useState<{ lat: number; lng: number } | null>(null);
  const [activeMarket, setActiveMarket] = useState<GlobeMarker | null>(sampleMarkers[1]); // default to London
  const [dossierOpen, setDossierOpen] = useState(false);

  const handleRegionSelect = (region: (typeof REGIONS)[0]) => {
    setSelectedRegion(region.id);
    setTargetFocus({ lat: region.lat, lng: region.lng });
  };

  const handleMarkerSelect = (marker: GlobeMarker) => {
    setActiveMarket(marker);
    setDossierOpen(true);
    setTargetFocus({ lat: marker.lat, lng: marker.lng });
  };

  return (
    <section id="global-payroll" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 scroll-mt-20 relative z-10">
      
      {/* ============================================================ */}
      {/* 1. STARTING SECTION: Writing Placed OUTSIDE the 3D Globe Box */}
      {/* ============================================================ */}
      <div className="mb-12 sm:mb-16">
        
        {/* Top Eyebrow Tag */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200/80 dark:text-indigo-400 dark:bg-indigo-950/60 dark:border-indigo-800/60 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            Global Mobility & Compliance
          </span>
        </div>

        {/* Display Heading & Subtitle Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-8">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.05]">
              Hire, pay, and retain anywhere on Earth with zero friction.
            </h2>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end">
            <p className="text-base sm:text-lg text-slate-600 dark:text-neutral-400 leading-relaxed mb-6">
              Eliminate cross-border compliance barriers. Automate multi-currency payroll, statutory benefits, and local labor law alignment across 140+ jurisdictions.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/global-mobility"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity active:scale-[0.98] shadow-sm cursor-pointer"
              >
                <span>Scale Globally</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
              <button
                onClick={() => handleRegionSelect(REGIONS[0])}
                className="inline-flex items-center justify-center rounded-xl bg-white text-slate-800 border border-slate-300 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-800 px-6 py-3 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors active:scale-[0.98] cursor-pointer"
              >
                Explore Coverage Map
              </button>
            </div>
          </div>
        </div>

        {/* Key Operational Telemetry Metric Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-slate-200/80 dark:border-white/[0.08]">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06]">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-neutral-400 text-[11px] font-sans font-semibold uppercase tracking-wider mb-1">
              <Globe2 className="w-3.5 h-3.5" />
              <span>MARKET REACH</span>
            </div>
            <div className="font-sans text-2xl sm:text-3xl font-normal sm:font-medium text-slate-950 dark:text-white tabular-nums">
              140+
            </div>
            <div className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5 font-sans">
              Direct EOR & statutory jurisdictions
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06]">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-neutral-400 text-[11px] font-sans font-semibold uppercase tracking-wider mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>PAYOUT VELOCITY</span>
            </div>
            <div className="font-sans text-2xl sm:text-3xl font-normal sm:font-medium text-slate-950 dark:text-white tabular-nums">
              Same-Day
            </div>
            <div className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5 font-sans">
              Local currency banking clearing
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06]">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-neutral-400 text-[11px] font-sans font-semibold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>LEGAL GUARANTEE</span>
            </div>
            <div className="font-sans text-2xl sm:text-3xl font-normal sm:font-medium text-slate-950 dark:text-white tabular-nums">
              100%
            </div>
            <div className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5 font-sans">
              Total statutory labor indemnity
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06]">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-neutral-400 text-[11px] font-sans font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TIME TO HIRE</span>
            </div>
            <div className="font-sans text-2xl sm:text-3xl font-normal sm:font-medium text-slate-950 dark:text-white tabular-nums">
              48 Hours
            </div>
            <div className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5 font-sans">
              Contract to live compliant onboarding
            </div>
          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* 2. THE 3D GLOBE BOX: High-Contrast Map Graphics & Full Interactivity */}
      {/* ============================================================ */}
      <div className="relative w-full h-[620px] sm:h-[700px] md:h-[780px] lg:h-[840px] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800/80 shadow-2xl transition-colors">
        
        {/* Top Control Bar: Region Quick-Jump Tabs & Node Telemetry */}
        <div className="absolute top-5 left-5 right-5 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
          
          {/* Quick-Jump Region Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/60 shadow-lg">
            {REGIONS.map((region) => {
              const isActive = selectedRegion === region.id;
              return (
                <button
                  key={region.id}
                  onClick={() => handleRegionSelect(region)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer ${
                    isActive
                      ? "bg-white text-slate-950 font-semibold shadow-xs"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span>{region.icon}</span>
                  <span>{region.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Interactive Talent Globe with High-Contrast Map Graphics (Clean Silhouette without Outer Blue Ring) */}
        <Globe3D
          autoRotateSpeed={18}
          bumpScale={8}
          className="w-full h-full"
          config={{
            showAtmosphere: false,
            bumpScale: 8,
            textureVariant: "atmos", // High-contrast NASA Earth map with bright continents
          }}
          markers={sampleMarkers}
          selectedMarker={activeMarket}
          targetFocus={targetFocus}
          onMarkerClick={handleMarkerSelect}
          onMarkerHover={(marker) => {
            if (marker) setActiveMarket(marker);
          }}
        />

        {/* ============================================================ */}
        {/* Market Intelligence Dossier Drawer (Interactive Detail Card) */}
        {/* ============================================================ */}
        {activeMarket && (
          <div
            className={`absolute bottom-6 left-6 z-20 max-w-sm w-full p-5 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 shadow-2xl text-white transition-all duration-300 ${
              dossierOpen ? "scale-100 opacity-100" : "scale-95 opacity-90 hover:opacity-100"
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 shrink-0">
                  <img src={activeMarket.src} alt={activeMarket.country || "Market"} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-white">
                    {activeMarket.country} ({activeMarket.label.split("•")[0].trim()})
                  </h4>
                  <span className="text-[11px] font-sans font-medium text-slate-300 flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                    Autonomous Node Live
                  </span>
                </div>
              </div>

              <button
                onClick={() => setDossierOpen((prev) => !prev)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                title="Toggle Market Details"
              >
                {dossierOpen ? <X className="w-4 h-4" /> : <Sparkles className="w-4 h-4 text-indigo-400" />}
              </button>
            </div>

            {/* Market Metadata Specs */}
            <div className="grid grid-cols-2 gap-2 text-xs py-2.5 border-y border-slate-800">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-sans font-medium">Headcount</span>
                <span className="font-bold text-white text-sm">{activeMarket.hires || 12} Deployed</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-sans font-medium">Local Currency</span>
                <span className="font-bold text-white text-sm">{activeMarket.currency || "USD"}</span>
              </div>
              <div className="col-span-2 mt-1">
                <span className="text-slate-400 block text-[10px] uppercase font-sans font-medium">Statutory Framework</span>
                <span className="text-slate-200 text-xs flex items-center gap-1.5 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span className="truncate">{activeMarket.compliance || "Fully Compliant"}</span>
                </span>
              </div>
            </div>

            <div className="mt-3.5 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Avg Settlement: <strong className="text-slate-200">{activeMarket.avgPayout || "Same-Day"}</strong>
              </span>
              <Link
                href="/workspace/recruitment"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-neutral-100 text-slate-950 text-xs font-semibold transition-colors shadow-xs"
              >
                <span>Deploy Hires</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}

      </div>

    </section>
  );
}

export default GlobalWorkforceBanner;
