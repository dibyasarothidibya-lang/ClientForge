"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  Calculator, 
  ArrowRight, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Sparkles,
  CheckCircle2,
  Zap,
  User,
  Building2,
  Maximize2,
  X,
  Target,
  BarChart3
} from "lucide-react";

// Practice Archetypes for Bespoke 1-Click Simulation (Curated Editorial Tiers)
const PERSONAS = [
  {
    id: "solo",
    label: "Solo Advisory",
    tag: "Boutique",
    opportunities: 4,
    dealValue: 10000,
    icon: User,
  },
  {
    id: "studio",
    label: "Growth Practice",
    tag: "Mid-Market",
    opportunities: 14,
    dealValue: 25000,
    icon: Sparkles,
  },
  {
    id: "agency",
    label: "Institutional Firm",
    tag: "Enterprise",
    opportunities: 32,
    dealValue: 60000,
    icon: Building2,
  },
];

// Spring-animated number ticker with critically-damped smooth physics in Cormorant Garamond
function AnimatedNumber({ value }: { value: number }) {
  const springValue = useSpring(value, {
    stiffness: 280,
    damping: 32,
    mass: 0.5
  });
  const [display, setDisplay] = useState(value.toLocaleString());

  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplay(Math.round(latest).toLocaleString());
    });
    return () => unsubscribe();
  }, [springValue]);

  return <span className="tabular-nums font-sans tracking-normal">{display}</span>;
}

// In-Depth Executive Audit Memo Modal (Bespoke Typographic Print Aesthetic)
function GraphDetailsModal({
  isOpen,
  onClose,
  opportunities,
  avgDealValue,
  estimatedRevenueLift,
  annualHoursReclaimed,
  leverageMultiplier
}: {
  isOpen: boolean;
  onClose: () => void;
  opportunities: number;
  avgDealValue: number;
  estimatedRevenueLift: number;
  annualHoursReclaimed: number;
  leverageMultiplier: string;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalAnnualPipeline = estimatedRevenueLift * 12;
  const projectedDeals = Math.max(1, Math.round(opportunities * 0.18 * 12));
  const hoursReclaimedPerMonth = Math.round(annualHoursReclaimed / 12);

  // Architectural hairline SVG geometry for modal chart
  const normalizedLift = Math.min(1, Math.max(0.12, estimatedRevenueLift / 95000));
  const baseY = 150;
  const amplitude = 110;
  const my0 = Math.round(baseY - amplitude * 0.12 * normalizedLift);
  const my1 = Math.round(baseY - amplitude * 0.28 * normalizedLift);
  const my2 = Math.round(baseY - amplitude * 0.52 * normalizedLift);
  const my3 = Math.round(baseY - amplitude * 0.78 * normalizedLift);
  const my4 = Math.round(baseY - amplitude * 1.0 * normalizedLift);

  const modalAreaPath = `M 20 ${my0} C 110 ${my0}, 170 ${my1 + 6}, 220 ${my1} C 300 ${my1 - 6}, 360 ${my2 + 6}, 400 ${my2} C 480 ${my2 - 8}, 540 ${my3 + 4}, 580 ${my3} C 630 ${my3 - 6}, 670 ${my4 + 3}, 700 ${my4} L 700 160 L 20 160 Z`;
  const modalLinePath = `M 20 ${my0} C 110 ${my0}, 170 ${my1 + 6}, 220 ${my1} C 300 ${my1 - 6}, 360 ${my2 + 6}, 400 ${my2} C 480 ${my2 - 8}, 540 ${my3 + 4}, 580 ${my3} C 630 ${my3 - 6}, 670 ${my4 + 3}, 700 ${my4}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto roi-calculator-scope font-sans">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm"
      />

      {/* Modal Dialog Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="relative w-full max-w-3xl rounded-3xl bg-[#0c0c0e] border border-stone-800 shadow-2xl p-6 sm:p-9 text-[#f5f5f3] z-10 overflow-hidden my-auto max-h-[92vh] overflow-y-auto"
      >
        {/* Subtle Atmospheric Warmth */}
        <div 
          aria-hidden="true" 
          className="absolute -top-32 -right-32 w-80 h-80 bg-radial from-indigo-500/10 via-sky-500/5 to-transparent blur-3xl pointer-events-none" 
        />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-5 border-b border-stone-800 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-sans font-medium text-stone-400 mb-1.5">
              <span>Bespoke Advisory Projection</span>
              <span>—</span>
              <span className="text-sky-300">Executive Audit</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-normal tracking-tight text-white font-sans">
              Pipeline Velocity & Compounding Value Model
            </h3>
            <p className="text-sm text-stone-400 mt-1 font-sans font-normal leading-relaxed">
              Model calibrated for <span className="text-white font-normal">{opportunities} prospective engagements</span> evaluated monthly at an average <span className="text-white font-normal">${avgDealValue.toLocaleString()}</span> contract value.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800/80 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Key Metric High-Water Marks Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div className="p-4 rounded-2xl bg-[#121215] border border-stone-800/80">
            <div className="text-xs text-stone-400 font-sans font-medium">12-Month Runway</div>
            <div className="text-2xl sm:text-3xl font-light tabular-nums text-sky-400 mt-1 font-sans">
              ${totalAnnualPipeline.toLocaleString()}
            </div>
            <div className="text-xs text-stone-400 mt-1 font-sans">+22% pipeline acceleration</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#121215] border border-stone-800/80">
            <div className="text-xs text-stone-400 font-sans font-medium">Hours Reclaimed</div>
            <div className="text-2xl sm:text-3xl font-light tabular-nums text-white mt-1 font-sans">
              {annualHoursReclaimed} hrs
            </div>
            <div className="text-xs text-stone-400 mt-1 font-sans">{hoursReclaimedPerMonth} hrs/mo analyst labor saved</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#121215] border border-stone-800/80">
            <div className="text-xs text-stone-400 font-sans font-medium">Projected Closings</div>
            <div className="text-2xl sm:text-3xl font-light tabular-nums text-indigo-300 mt-1 font-sans">
              {projectedDeals} Deals
            </div>
            <div className="text-xs text-stone-400 mt-1 font-sans">+18% win-rate lift from context</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#121215] border border-stone-800/80">
            <div className="text-xs text-stone-400 font-sans font-medium">Value Multiple</div>
            <div className="text-2xl sm:text-3xl font-light tabular-nums text-emerald-400 mt-1 font-sans">
              {leverageMultiplier}×
            </div>
            <div className="text-xs text-stone-400 mt-1 font-sans">Contract value to tooling ratio</div>
          </div>
        </div>

        {/* Expanded Architectural Waveform & Quarterly Trajectory */}
        <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-[#121215] border border-stone-800/80 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs mb-3 font-sans">
            <span className="text-stone-300 font-normal flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
              12-Month Compounding Revenue Trajectory
            </span>
            <span className="text-stone-400 italic">
              Compounded Realized Yield
            </span>
          </div>

          <div className="relative w-full h-36 sm:h-44">
            <svg 
              viewBox="0 0 720 180" 
              preserveAspectRatio="none" 
              className="w-full h-full overflow-visible"
            >
              <defs>
                <linearGradient id="modalCurveLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="60%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
                <linearGradient id="modalCurveAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
                  <stop offset="60%" stopColor="#818cf8" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Architectural Hairline Dashed Grid Lines */}
              <line x1="20" y1="40" x2="700" y2="40" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
              <line x1="20" y1="85" x2="700" y2="85" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
              <line x1="20" y1="130" x2="700" y2="130" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
              <line x1="20" y1="160" x2="700" y2="160" stroke="rgba(255,255,255,0.08)" />

              {/* Dynamic Area Fill */}
              <path d={modalAreaPath} fill="url(#modalCurveAreaGrad)" />

              {/* Dynamic Stroke Path */}
              <path
                d={modalLinePath}
                fill="none"
                stroke="url(#modalCurveLineGrad)"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Milestone Dots */}
              <circle cx="220" cy={my1} r="3.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" />
              <circle cx="400" cy={my2} r="3.5" fill="#60a5fa" stroke="#ffffff" strokeWidth="1" />
              <circle cx="580" cy={my3} r="3.5" fill="#818cf8" stroke="#ffffff" strokeWidth="1" />

              {/* Peak Waypoint */}
              <circle cx="700" cy={my4} r="8" fill="rgba(56,189,248,0.2)" />
              <circle cx="700" cy={my4} r="4" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
            </svg>
          </div>

          {/* 4 Detailed Quarterly Milestone Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 pt-3 border-t border-stone-800/80">
            <div className="p-3 rounded-xl bg-neutral-900/60 border border-stone-800/80">
              <div className="font-sans text-xs text-stone-300">Q1: Initiation</div>
              <div className="text-sky-300 font-sans font-normal text-base mt-0.5">${Math.round(totalAnnualPipeline * 0.14).toLocaleString()}</div>
              <div className="text-[11px] text-stone-400 mt-0.5 font-sans font-medium">Signals calibrated, initial proposals active</div>
            </div>
            <div className="p-3 rounded-xl bg-neutral-900/60 border border-stone-800/80">
              <div className="font-sans text-xs text-stone-300">Q2: Acceleration</div>
              <div className="text-sky-300 font-sans font-normal text-base mt-0.5">${Math.round(totalAnnualPipeline * 0.24).toLocaleString()}</div>
              <div className="text-[11px] text-stone-400 mt-0.5 font-sans font-medium">First cohorts close at 2.4-day velocity</div>
            </div>
            <div className="p-3 rounded-xl bg-neutral-900/60 border border-stone-800/80">
              <div className="font-sans text-xs text-stone-300">Q3: Cadence</div>
              <div className="text-sky-300 font-sans font-normal text-base mt-0.5">${Math.round(totalAnnualPipeline * 0.29).toLocaleString()}</div>
              <div className="text-[11px] text-stone-400 mt-0.5 font-sans font-medium">Predictable deal flow across tier-1 targets</div>
            </div>
            <div className="p-3 rounded-xl bg-neutral-900/60 border border-stone-800/80">
              <div className="font-sans text-xs text-sky-400 font-medium">Q4: Peak Run-Rate</div>
              <div className="text-sky-300 font-sans font-medium text-base mt-0.5">${Math.round(totalAnnualPipeline * 0.33).toLocaleString()}</div>
              <div className="text-[11px] text-stone-400 mt-0.5 font-sans font-medium">Compounding expansion & retainers</div>
            </div>
          </div>
        </div>

        {/* 3 Core Attribution Pillars Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-5">
          <div className="p-4 rounded-xl bg-[#121215] border border-stone-800/80">
            <div className="flex items-center gap-2 font-sans text-sm text-white mb-1.5">
              <Target className="w-3.5 h-3.5 text-sky-400" />
              Verified Context Hooks
            </div>
            <p className="text-stone-400 leading-relaxed text-xs font-sans font-normal">
              Replaces generic outbound with real-time operational triggers (executive moves, hiring surges, funding rounds) to earn trusted senior replies.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#121215] border border-stone-800/80">
            <div className="flex items-center gap-2 font-sans text-sm text-white mb-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-300" />
              4.5h Reclaimed Per Account
            </div>
            <p className="text-stone-400 leading-relaxed text-xs font-sans font-normal">
              Eliminates manual scraping, news synthesis, and fragmented spreadsheets into one unified 1-page pre-call intelligence briefing.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#121215] border border-stone-800/80">
            <div className="flex items-center gap-2 font-sans text-sm text-white mb-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              2.4-Day Pitch Velocity
            </div>
            <p className="text-stone-400 leading-relaxed text-xs font-sans font-normal">
              Compresses outreach latency from 18 days down to 48 hours, engaging decision-makers while their intent is active and uncontested.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between mt-6 pt-5 border-t border-stone-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-sans text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            Close Memo
          </button>
          <Link
            href="/pricing"
            onClick={onClose}
            className="inline-flex items-center px-5 py-2.5 rounded-xl text-xs font-sans font-medium bg-white text-neutral-950 hover:bg-stone-100 transition-all shadow-md group cursor-pointer"
          >
            <span>Start Forging With This Model</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </motion.div>
    </div>
  );
}

// Interactive 3D Card with cursor parallax depth, architectural waveform, and compounding glass toggle
function Interactive3DRoiCard({ 
  estimatedRevenueLift,
  hoursReclaimedPerMonth,
  annualHoursReclaimed,
  opportunities,
  avgDealValue
}: {
  estimatedRevenueLift: number;
  hoursReclaimedPerMonth: number;
  annualHoursReclaimed: number;
  opportunities: number;
  avgDealValue: number;
}) {
  const [timeframe, setTimeframe] = useState<"monthly" | "annual">("monthly");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 260 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Calculations for chosen timeframe
  const displayRevenue = timeframe === "annual" ? estimatedRevenueLift * 12 : estimatedRevenueLift;
  const displayHours = timeframe === "annual" ? annualHoursReclaimed : hoursReclaimedPerMonth;
  const hoursUnit = timeframe === "annual" ? "hrs/yr" : "hrs/mo";
  const hoursSubtitle = timeframe === "annual" 
    ? `${hoursReclaimedPerMonth} hrs/mo equivalent` 
    : `${annualHoursReclaimed} hrs/year annualized`;

  // Dynamically calibrated leverage multiplier
  const leverageMultiplier = (
    Math.round((5.2 + (opportunities / 40) * 18 + (avgDealValue / 100000) * 19.5) * 10) / 10
  ).toFixed(1);

  // Responsive font scaling for large revenue numbers in Cormorant Garamond
  const isMillions = displayRevenue >= 1000000;
  const isMultiHundredThousands = displayRevenue >= 100000;
  const revenueFontSize = isMillions
    ? "text-4xl sm:text-5xl lg:text-[3.25rem]"
    : isMultiHundredThousands
      ? "text-4xl sm:text-5xl lg:text-[3.5rem]"
      : "text-5xl sm:text-6xl lg:text-[4rem]";

  // SVG Trajectory Curve Geometry (Hairline Architectural Style)
  const normalizedLift = Math.min(1, Math.max(0.12, estimatedRevenueLift / 95000));
  const baseY = 70;
  const amplitude = 52;
  const y0 = Math.round(baseY - amplitude * 0.12 * normalizedLift);
  const y1 = Math.round(baseY - amplitude * 0.28 * normalizedLift);
  const y2 = Math.round(baseY - amplitude * 0.52 * normalizedLift);
  const y3 = Math.round(baseY - amplitude * 0.78 * normalizedLift);
  const y4 = Math.round(baseY - amplitude * 1.0 * normalizedLift);

  const areaPath = `M 10 ${y0} C 55 ${y0}, 85 ${y1 + 4}, 110 ${y1} C 150 ${y1 - 4}, 180 ${y2 + 4}, 200 ${y2} C 240 ${y2 - 6}, 270 ${y3 + 3}, 290 ${y3} C 315 ${y3 - 5}, 335 ${y4 + 2}, 350 ${y4} L 350 72 L 10 72 Z`;
  const linePath = `M 10 ${y0} C 55 ${y0}, 85 ${y1 + 4}, 110 ${y1} C 150 ${y1 - 4}, 180 ${y2 + 4}, 200 ${y2} C 240 ${y2 - 6}, 270 ${y3 + 3}, 290 ${y3} C 315 ${y3 - 5}, 335 ${y4 + 2}, 350 ${y4}`;

  return (
    <>
      <div 
        className="perspective-1000 w-full font-sans"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          ref={cardRef}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="rounded-3xl bg-[#0c0c0e] backdrop-blur-xl text-white p-6 sm:p-7 lg:p-8 shadow-2xl border border-stone-800/90 relative overflow-hidden transition-all duration-300 hover:border-stone-700"
        >
          {/* Subtle Atmospheric Warmth */}
          <div 
            aria-hidden="true" 
            className="absolute -top-24 -right-24 w-64 h-64 bg-radial from-indigo-500/10 via-sky-500/5 to-transparent blur-3xl pointer-events-none" 
          />

          {/* Card Header with Modern Glass Timeframe Toggle */}
          <div 
            style={{ transform: "translateZ(25px)" }}
            className="flex items-center justify-between pb-4 border-b border-stone-800/80 gap-2"
          >
            <div>
              <span className="font-serif uppercase tracking-widest text-stone-300 text-xs block">
                Projected Pipeline Lift
              </span>
              <span className="text-xs text-stone-400 font-serif italic mt-0.5 block">
                {timeframe === "annual" ? "12-Month Cumulative Runway" : "Monthly Recurring Trajectory"}
              </span>
            </div>

            {/* Segmented Glass Timeframe Switch in Cormorant Garamond */}
            <div className="relative flex items-center p-1 rounded-xl bg-[#141418] border border-stone-800 shrink-0 font-sans">
              <button
                type="button"
                onClick={() => setTimeframe("monthly")}
                className={`relative z-10 px-3 py-1 rounded-lg text-xs font-sans transition-colors cursor-pointer ${
                  timeframe === "monthly" 
                    ? "text-white font-medium" 
                    : "text-stone-400 hover:text-white"
                }`}
              >
                {timeframe === "monthly" && (
                  <motion.div
                    layoutId="timeframeGlassHighlight"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    className="absolute inset-0 rounded-lg bg-sky-500/20 border border-sky-400/30 shadow-[0_2px_10px_rgba(56,189,248,0.2)] -z-10"
                  />
                )}
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setTimeframe("annual")}
                className={`relative z-10 px-3 py-1 rounded-lg text-xs font-sans transition-colors cursor-pointer ${
                  timeframe === "annual" 
                    ? "text-white font-medium" 
                    : "text-stone-400 hover:text-white"
                }`}
              >
                {timeframe === "annual" && (
                  <motion.div
                    layoutId="timeframeGlassHighlight"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    className="absolute inset-0 rounded-lg bg-sky-500/20 border border-sky-400/30 shadow-[0_2px_10px_rgba(56,189,248,0.2)] -z-10"
                  />
                )}
                Annual
              </button>
            </div>
          </div>

          {/* Primary Metric: Revenue Unlocked in Cormorant Garamond */}
          <div 
            style={{ transform: "translateZ(35px)" }}
            className="mt-6 font-sans"
          >
            <div className="flex items-center justify-between">
              <div className="text-xs text-stone-400 font-sans font-medium">
                {timeframe === "annual" ? "Annualized Additional Contract Revenue" : "Estimated Monthly Additional Pipeline"}
              </div>
              <span className="text-xs text-stone-400 font-sans font-medium">
                {leverageMultiplier}× Value Multiple
              </span>
            </div>
            
            <div className={`font-sans ${revenueFontSize} font-light tracking-tight tabular-nums text-sky-400 mt-1 flex flex-wrap items-baseline gap-x-2 leading-none`}>
              <div className="flex items-baseline font-sans">
                <span className="text-sky-400/90 font-light mr-0.5">$</span>
                <AnimatedNumber value={displayRevenue} />
              </div>
              <span className="text-base font-sans font-medium text-stone-400 font-normal shrink-0">
                {timeframe === "annual" ? "/ year" : "/ month"}
              </span>
            </div>

            <div className="text-xs text-stone-400 mt-2.5 font-sans font-normal leading-relaxed">
              {timeframe === "annual" 
                ? "12-month compounded contract pipeline unlocked through systematic signal harvesting." 
                : "Generated through higher reply rates and accelerated deal cycles."}
            </div>
          </div>

          {/* Dynamic Pipeline Growth Trajectory Waveform - Clickable to Open Detailed Memo */}
          <div 
            style={{ transform: "translateZ(30px)" }}
            role="button"
            tabIndex={0}
            onClick={() => setIsModalOpen(true)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsModalOpen(true); }}
            className="mt-6 p-4 rounded-2xl bg-[#121215] border border-stone-800/80 relative overflow-hidden shadow-inner cursor-pointer group hover:border-stone-700 transition-all font-sans"
          >
            <div className="flex items-center justify-between text-xs mb-2.5 font-sans">
              <span className="text-stone-300 font-normal flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
                12-Month Compounding Trajectory
              </span>
              <span className="text-sky-300 group-hover:text-white font-sans font-medium flex items-center gap-1 transition-colors text-xs">
                <span>View Breakdown</span>
                <Maximize2 className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>

            {/* SVG Hairline Area & Stroke Curve */}
            <div className="relative w-full h-20">
              <svg 
                viewBox="0 0 360 80" 
                preserveAspectRatio="none" 
                className="w-full h-full overflow-visible"
              >
                <defs>
                  <linearGradient id="pipelineLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="60%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#c084fc" />
                  </linearGradient>
                  <linearGradient id="pipelineAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.22" />
                    <stop offset="60%" stopColor="#818cf8" stopOpacity="0.06" />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Subtle dashed horizontal grid lines */}
                <line x1="10" y1="18" x2="350" y2="18" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
                <line x1="10" y1="44" x2="350" y2="44" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
                <line x1="10" y1="72" x2="350" y2="72" stroke="rgba(255,255,255,0.06)" />

                {/* Dynamic Area Fill */}
                <path
                  d={areaPath}
                  fill="url(#pipelineAreaGrad)"
                  className="transition-all duration-300 ease-out"
                />

                {/* Dynamic Stroke Path */}
                <path
                  d={linePath}
                  fill="none"
                  stroke="url(#pipelineLineGrad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="transition-all duration-300 ease-out"
                />

                {/* Target Marker Dot at Peak */}
                <circle cx="350" cy={y4} r="7" fill="rgba(56,189,248,0.2)" className="transition-all duration-300 ease-out" />
                <circle cx="350" cy={y4} r="3.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" className="transition-all duration-300 ease-out" />
              </svg>
            </div>

            {/* Milestone Axis Markers */}
            <div className="flex justify-between items-center text-xs text-stone-400 font-sans font-medium mt-1.5 pt-1.5 border-t border-stone-800/60">
              <span>M1: Initiation</span>
              <span>M4: Conversions</span>
              <span>M8: Scale</span>
              <span className="text-sky-400 font-normal">M12 Peak ↗</span>
            </div>
          </div>

          {/* Secondary Metrics Strip in Cormorant Garamond */}
          <div 
            style={{ transform: "translateZ(25px)" }}
            className="grid grid-cols-2 gap-4 mt-6 pt-5 border-t border-stone-800/80 font-sans"
          >
            <div>
              <div className="text-xs text-stone-400 font-sans font-medium">
                Research Hours Reclaimed
              </div>
              <div className="font-sans text-2xl sm:text-3xl font-light tracking-tight tabular-nums text-white mt-1">
                <AnimatedNumber value={displayHours} /> {hoursUnit}
              </div>
              <div className="text-xs text-stone-400 mt-0.5 font-sans font-medium">
                {hoursSubtitle}
              </div>
            </div>

            <div>
              <div className="text-xs text-stone-400 font-sans font-medium">
                Time to High-Context Pitch
              </div>
              <div className="font-sans text-2xl sm:text-3xl font-light tracking-tight tabular-nums text-indigo-300 mt-1">
                2.4 Days
              </div>
              <div className="text-xs text-stone-400 mt-0.5 font-sans font-medium">
                Down from 18 days manual
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div 
            style={{ transform: "translateZ(20px)" }}
            className="mt-7 font-sans"
          >
            <Link
              href="/pricing"
              className="w-full inline-flex items-center justify-center px-4 py-3.5 text-sm font-medium text-neutral-950 bg-white hover:bg-stone-100 rounded-xl transition-all shadow-md group cursor-pointer font-sans hover:scale-[1.01] active:scale-[0.99]"
            >
              <span>Start Forging Today</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </motion.div>
      </div>

      {/* Pop-Up Modal with In-Depth 12-Month Audit Memo */}
      <AnimatePresence>
        {isModalOpen && (
          <GraphDetailsModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            opportunities={opportunities}
            avgDealValue={avgDealValue}
            estimatedRevenueLift={estimatedRevenueLift}
            annualHoursReclaimed={annualHoursReclaimed}
            leverageMultiplier={leverageMultiplier}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default function RoiCalculator() {
  const [opportunities, setOpportunities] = useState(12);
  const [avgDealValue, setAvgDealValue] = useState(25000);

  // Dynamic calculations:
  // - 4.5 hours reclaimed per prospect dossier (eliminates manual LinkedIn/Google/news tracking)
  // - +18% win-rate lift from verified signals & personalized context hooks
  const hoursReclaimedPerMonth = Math.round(opportunities * 4.5);
  const annualHoursReclaimed = hoursReclaimedPerMonth * 12;
  const additionalDealsPerYear = Math.max(1, Math.round(opportunities * 0.18 * 12));
  const estimatedRevenueLift = Math.round(opportunities * avgDealValue * 0.22);

  // Track fill percentages for modern custom range bars
  const oppPercent = Math.min(100, Math.max(0, ((opportunities - 3) / (40 - 3)) * 100));
  const dealPercent = Math.min(100, Math.max(0, ((avgDealValue - 5000) / (100000 - 5000)) * 100));

  // Determine if a persona preset is currently active
  const activePersona = PERSONAS.find(
    (p) => p.opportunities === opportunities && p.dealValue === avgDealValue
  )?.id;

  return (
    <section id="calculator" className="py-20 md:py-28 bg-white dark:bg-[#080808] border-t border-slate-200/60 dark:border-neutral-900 transition-colors relative overflow-hidden font-sans">
      
      {/* Background Soft Atmospheric Warmth */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-radial from-indigo-500/5 via-sky-500/5 to-transparent blur-[140px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3 block font-serif font-medium">
            Value & Velocity Audit
          </span>
          <h2 className="section-title text-slate-950 dark:text-[#f5f5f3] tracking-tight mb-3">
            Calculate the Return <br className="hidden sm:inline" />
            on Focused Client Acquisition.
          </h2>
          <div className="editorial-italic text-2xl sm:text-3xl text-slate-600 dark:text-neutral-400 mb-6">
            <span className="gradient-text font-serif italic">See What Clarity Is Worth.</span>
          </div>
          <p className="text-base sm:text-lg text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed font-serif font-light">
            Estimate the monthly hours reclaimed from manual prospect research and the additional contract revenue unlocked by moving on qualified signals faster.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="max-w-5xl mx-auto rounded-3xl border border-slate-200/90 dark:border-stone-800 bg-gradient-to-br from-stone-50 via-white to-sky-50/20 dark:from-[#0d0d10] dark:via-[#0c0c0e] dark:to-[#0d0d10] p-6 sm:p-8 lg:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Controls: Bespoke Editorial Sliders */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              
              {/* Practice Archetype Switcher with Compact Editorial Glass Switch */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans uppercase tracking-widest text-stone-600 dark:text-stone-300">
                    Practice Archetypes
                  </span>
                  <span className="text-xs text-sky-600 dark:text-sky-400 font-sans font-medium">
                    {activePersona ? "Active Profile Preset" : "Bespoke Configuration"}
                  </span>
                </div>

                <div className="relative grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-stone-200/60 dark:bg-stone-900/60 backdrop-blur-xl border border-stone-300/70 dark:border-stone-800 shadow-inner">
                  {PERSONAS.map((persona) => {
                    const isSelected = activePersona === persona.id;
                    const IconComponent = persona.icon;
                    return (
                      <button
                        key={persona.id}
                        type="button"
                        onClick={() => {
                          setOpportunities(persona.opportunities);
                          setAvgDealValue(persona.dealValue);
                        }}
                        className={`relative flex items-center justify-center gap-2 py-2.5 px-2 rounded-xl transition-colors cursor-pointer text-center z-10 ${
                          isSelected
                            ? "text-stone-950 dark:text-white font-medium"
                            : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
                        }`}
                      >
                        {isSelected && (
                          <motion.div
                            layoutId="archetypeGlassHighlight"
                            transition={{ type: "spring", stiffness: 450, damping: 35 }}
                            className="absolute inset-0 rounded-xl bg-white/95 dark:bg-stone-800/90 backdrop-blur-xl border border-white/80 dark:border-stone-700 shadow-[0_2px_12px_rgba(0,0,0,0.08)] -z-10"
                          />
                        )}
                        <div className={`p-1 rounded-md shrink-0 transition-colors ${
                          isSelected 
                            ? "text-sky-600 dark:text-sky-300 bg-sky-500/10" 
                            : "text-stone-400 dark:text-stone-500"
                        }`}>
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                        <div className="text-left min-w-0">
                          <div className="text-xs font-sans font-medium tracking-tight truncate leading-tight">
                            {persona.label}
                          </div>
                          <div className={`text-[10px] font-sans font-medium leading-none mt-0.5 ${
                            isSelected 
                              ? "text-sky-600 dark:text-sky-300" 
                              : "text-stone-400 dark:text-stone-500"
                          }`}>
                            {persona.tag}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slider 1: Opportunities Handled per Month */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#121215] border border-stone-200/90 dark:border-stone-800/90 shadow-xs hover:border-stone-300 dark:hover:border-stone-700 transition-all font-sans">
                <div className="flex justify-between items-center mb-3.5">
                  <label htmlFor="opportunities" className="text-sm font-sans font-normal text-stone-900 dark:text-white">
                    Monthly Potential Opportunities Evaluated
                  </label>
                  
                  {/* Refined Pill Badge in Cormorant Garamond */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 font-sans text-xs sm:text-sm tabular-nums shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                    {opportunities} Opportunities
                  </span>
                </div>

                {/* Custom Gradient-Filled Range Slider Bar */}
                <div className="relative flex items-center w-full h-8">
                  {/* Underlay Track with Inner Glass Groove */}
                  <div className="absolute inset-x-0 h-2.5 rounded-full bg-stone-200 dark:bg-stone-800/90 border border-stone-300/40 dark:border-stone-700/60 shadow-inner overflow-hidden pointer-events-none">
                    {/* Active Gradient Fill with Real-time 1:1 Tracking */}
                    <div 
                      className="h-full bg-gradient-to-r from-stone-400 via-sky-500 to-sky-400 dark:from-stone-600 dark:via-sky-400 dark:to-sky-300 rounded-full shadow-xs"
                      style={{ width: `${oppPercent}%` }}
                    />
                  </div>

                  {/* Range Input (Custom Transparent Rail + Smooth Grab Thumb) */}
                  <input
                    id="opportunities"
                    type="range"
                    min="3"
                    max="40"
                    step="1"
                    value={opportunities}
                    onChange={(e) => setOpportunities(Number(e.target.value))}
                    className="w-full appearance-none bg-transparent cursor-grab active:cursor-grabbing z-10 roi-slider-input relative"
                  />
                </div>

                {/* Interactive Preset Steppers */}
                <div className="flex justify-between items-center text-xs text-stone-500 dark:text-stone-400 mt-3 font-sans tabular-nums font-normal gap-1">
                  <button
                    type="button"
                    onClick={() => setOpportunities(3)}
                    className={`px-2.5 py-1 rounded-lg hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer ${opportunities === 3 ? "text-stone-950 dark:text-white font-medium bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700" : "hover:bg-stone-100/60 dark:hover:bg-stone-800/60"}`}
                  >
                    3 (Boutique)
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpportunities(20)}
                    className={`px-2.5 py-1 rounded-lg hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer ${opportunities === 20 ? "text-stone-950 dark:text-white font-medium bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700" : "hover:bg-stone-100/60 dark:hover:bg-stone-800/60"}`}
                  >
                    20 (Mid-Market)
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpportunities(40)}
                    className={`px-2.5 py-1 rounded-lg hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer ${opportunities === 40 ? "text-stone-950 dark:text-white font-medium bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700" : "hover:bg-stone-100/60 dark:hover:bg-stone-800/60"}`}
                  >
                    40+ (Institutional)
                  </button>
                </div>
              </div>

              {/* Slider 2: Average Client Value */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#121215] border border-stone-200/90 dark:border-stone-800/90 shadow-xs hover:border-stone-300 dark:hover:border-stone-700 transition-all font-sans">
                <div className="flex justify-between items-center mb-3.5">
                  <label htmlFor="dealValue" className="text-sm font-sans font-normal text-stone-900 dark:text-white">
                    Average Client Engagement Value
                  </label>
                  
                  {/* Refined Pill Badge in Cormorant Garamond */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 font-sans text-xs sm:text-sm tabular-nums shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                    ${avgDealValue.toLocaleString()}
                  </span>
                </div>

                {/* Custom Gradient-Filled Range Slider Bar */}
                <div className="relative flex items-center w-full h-8">
                  {/* Underlay Track with Inner Glass Groove */}
                  <div className="absolute inset-x-0 h-2.5 rounded-full bg-stone-200 dark:bg-stone-800/90 border border-stone-300/40 dark:border-stone-700/60 shadow-inner overflow-hidden pointer-events-none">
                    {/* Active Gradient Fill with Real-time 1:1 Tracking */}
                    <div 
                      className="h-full bg-gradient-to-r from-stone-400 via-sky-500 to-sky-400 dark:from-stone-600 dark:via-sky-400 dark:to-sky-300 rounded-full shadow-xs"
                      style={{ width: `${dealPercent}%` }}
                    />
                  </div>

                  {/* Range Input (Custom Transparent Rail + Smooth Grab Thumb) */}
                  <input
                    id="dealValue"
                    type="range"
                    min="5000"
                    max="100000"
                    step="1000"
                    value={avgDealValue}
                    onChange={(e) => setAvgDealValue(Number(e.target.value))}
                    className="w-full appearance-none bg-transparent cursor-grab active:cursor-grabbing z-10 roi-slider-input relative"
                  />
                </div>

                {/* Interactive Preset Steppers */}
                <div className="flex justify-between items-center text-xs text-stone-500 dark:text-stone-400 mt-3 font-sans tabular-nums font-normal gap-1">
                  <button
                    type="button"
                    onClick={() => setAvgDealValue(5000)}
                    className={`px-2.5 py-1 rounded-lg hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer ${avgDealValue === 5000 ? "text-stone-950 dark:text-white font-medium bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700" : "hover:bg-stone-100/60 dark:hover:bg-stone-800/60"}`}
                  >
                    $5,000 (Advisory)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAvgDealValue(50000)}
                    className={`px-2.5 py-1 rounded-lg hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer ${avgDealValue === 50000 ? "text-stone-950 dark:text-white font-medium bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700" : "hover:bg-stone-100/60 dark:hover:bg-stone-800/60"}`}
                  >
                    $50,000 (Retainer)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAvgDealValue(100000)}
                    className={`px-2.5 py-1 rounded-lg hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer ${avgDealValue === 100000 ? "text-stone-950 dark:text-white font-medium bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700" : "hover:bg-stone-100/60 dark:hover:bg-stone-800/60"}`}
                  >
                    $100,000+ (Institutional)
                  </button>
                </div>
              </div>

              {/* Verified Impact Points */}
              <div className="space-y-3 pt-5 border-t border-slate-200/80 dark:border-stone-800 font-sans">
                <div className="flex items-center gap-2.5 text-sm text-stone-600 dark:text-stone-400 font-light">
                  <div className="w-5 h-5 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-stone-700 dark:text-stone-300" />
                  </div>
                  <span>Replaces fragmented notes, manual scraping, and scattered spreadsheets with unified intelligence</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-stone-600 dark:text-stone-400 font-light">
                  <div className="w-5 h-5 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-stone-700 dark:text-stone-300" />
                  </div>
                  <span>Eliminates generic outbound by equipping every touchpoint with verified operational context</span>
                </div>
              </div>

            </div>

            {/* Right Output: Interactive 3D Editorial Impact Card */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <Interactive3DRoiCard
                estimatedRevenueLift={estimatedRevenueLift}
                hoursReclaimedPerMonth={hoursReclaimedPerMonth}
                annualHoursReclaimed={annualHoursReclaimed}
                opportunities={opportunities}
                avgDealValue={avgDealValue}
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
