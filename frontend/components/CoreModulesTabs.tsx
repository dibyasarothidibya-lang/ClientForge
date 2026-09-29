"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { 
  Radar, 
  LineChart, 
  Zap, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  TrendingUp,
  FileText,
  Clock,
  ExternalLink,
  ChevronRight,
  Filter
} from "lucide-react";

interface SignalItem {
  country: string;
  status: string;
  code: string;
  amount: string;
  source?: string;
  dilemma?: string;
  confidence?: string;
}

interface ModuleData {
  id: string;
  title: string;
  icon: React.ElementType;
  tag: string;
  heading: string;
  description: string;
  stats: Array<{ label: string; value: string }>;
  features: string[];
  previewContent: {
    badge: string;
    mainTitle: string;
    items: SignalItem[];
  };
}

const modules: ModuleData[] = [
  {
    id: "intelligence",
    title: "Prospect Intelligence",
    icon: Radar,
    tag: "Deep Research",
    heading: "Know Who You’re Talking To Before You Reach Out",
    description: "Eliminate shallow research. Client Forge gathers corporate milestones, leadership shifts, technology stack evolution, and strategic pressure points into one clear executive dossier.",
    stats: [
      { label: "Research Velocity", value: "90s" },
      { label: "Signal Accuracy", value: "98.4%" },
      { label: "Pitch Relevance", value: "100%" },
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
        { 
          country: "Apex Global HQ", 
          status: "Series B Trigger", 
          code: "Design Infrastructure", 
          amount: "$65,000",
          source: "SEC 8-K Filing & Board Transition",
          dilemma: "Fragmented multi-squad token friction delaying Q3 enterprise launch.",
          confidence: "98.4% Match"
        },
        { 
          country: "NovaScale Labs", 
          status: "VP Hire Trigger", 
          code: "Token Re-Architecture", 
          amount: "$42,000",
          source: "Executive LinkedIn Signal & Open Req",
          dilemma: "Legacy backend latency impacting institutional tier client retention.",
          confidence: "96.1% Match"
        },
        { 
          country: "Kroma Systems", 
          status: "Migration Trigger", 
          code: "Cloud Audit & Systems", 
          amount: "$50,000",
          source: "AWS Infrastructure Transition Signal",
          dilemma: "Multi-cloud compliance gap requiring senior principal advisory.",
          confidence: "94.8% Match"
        },
        { 
          country: "CloudFleet Global", 
          status: "Expansion Trigger", 
          code: "APAC Localization", 
          amount: "$38,000",
          source: "Singapore Legal Entity Incorporation",
          dilemma: "Cross-border compliance & localized payment rails required.",
          confidence: "92.5% Match"
        },
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
      { label: "Stalled Deal Alerts", value: "Automated" },
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
        { 
          country: "Discovered Opportunities", 
          status: "5 Signals", 
          code: "Early Intelligence", 
          amount: "$145,000",
          source: "Automated Web Catalysts Indexing",
          dilemma: "Uncontacted accounts with verified budget releases.",
          confidence: "Stage 1"
        },
        { 
          country: "Dossier & Pitch Ready", 
          status: "4 Deals", 
          code: "Executive Hooks", 
          amount: "$118,000",
          source: "Dossier Synthesized with Custom Talking Points",
          dilemma: "Opening message generated and calibrated.",
          confidence: "Stage 2"
        },
        { 
          country: "In Conversation", 
          status: "3 Deals", 
          code: "High Context", 
          amount: "$84,000",
          source: "Executive Introductory Call Completed",
          dilemma: "Scope alignment document shared with stakeholders.",
          confidence: "Stage 3"
        },
        { 
          country: "Negotiating & Won", 
          status: "2 Deals", 
          code: "Contracting", 
          amount: "$38,000",
          source: "MSA & SOW in Legal Review",
          dilemma: "Target start date confirmed within 14 days.",
          confidence: "Stage 4"
        },
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
      { label: "Prep Time Saved", value: "4h / deal" },
      { label: "Tone Standard", value: "Executive" },
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
        { 
          country: "Angle 1: Design Debt", 
          status: "Recommended", 
          code: "VP Design Context", 
          amount: "94% Fit",
          source: "Calibrated to Apex Global Design Bottleneck",
          dilemma: "Opens by auditing multi-squad component reusability.",
          confidence: "High Conviction"
        },
        { 
          country: "Angle 2: Token Friction", 
          status: "Secondary", 
          code: "Head of Product", 
          amount: "88% Fit",
          source: "Calibrated to Product Velocity Drop",
          dilemma: "Addresses developer handoff delays and rework cycles.",
          confidence: "Medium Conviction"
        },
        { 
          country: "Angle 3: Series B Push", 
          status: "Alternative", 
          code: "Founder Angle", 
          amount: "82% Fit",
          source: "Calibrated to Investor Milestone Delivery",
          dilemma: "Connects design speed directly to runway expansion.",
          confidence: "Alternative Angle"
        },
        { 
          country: "Angle 4: Hiring Bridge", 
          status: "Benchmarked", 
          code: "CTO Angle", 
          amount: "78% Fit",
          source: "Calibrated to Engineering Headcount Shortfall",
          dilemma: "Positions boutique studio as rapid deployment bridge.",
          confidence: "Tactical Angle"
        },
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
      { label: "Milestones", value: "On-Track" },
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
        { 
          country: "Apex Global (Design System)", 
          status: "Milestone 2/4", 
          code: "Retainer Active", 
          amount: "$15k/mo",
          source: "Sprint Cycle 3 in Review",
          dilemma: "Token foundation delivered; documentation underway.",
          confidence: "98% Health"
        },
        { 
          country: "Vanguard HQ (Advisory)", 
          status: "Milestone 3/3", 
          code: "Renewal Due", 
          amount: "$22k/mo",
          source: "Quarterly Review Scheduled",
          dilemma: "Retainer expansion proposal drafted for next quarter.",
          confidence: "95% Health"
        },
        { 
          country: "NovaScale (Architecture)", 
          status: "Milestone 1/3", 
          code: "Kickoff Done", 
          amount: "$18k/mo",
          source: "Systems Audit Phase",
          dilemma: "Database benchmarking and cloud cost audit active.",
          confidence: "92% Health"
        },
        { 
          country: "Forma Interactive (Design)", 
          status: "Milestone 4/4", 
          code: "Completed", 
          amount: "$30k Scope",
          source: "Final Deliverable Approved",
          dilemma: "Case study sign-off requested from client stakeholders.",
          confidence: "100% Complete"
        },
      ]
    }
  }
];

// Interactive 3D Mockup Card with Dynamic Specular Glare & Multi-layer Parallax
function Interactive3DPreviewCard({ 
  current, 
  activeItemIdx, 
  setActiveItemIdx 
}: { 
  current: ModuleData; 
  activeItemIdx: number; 
  setActiveItemIdx: (idx: number) => void; 
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 260 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const glareX = useTransform(mouseX, [-0.5, 0.5], ["15%", "85%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["15%", "85%"]);
  const glareBg = useMotionTemplate`radial-gradient(400px circle at ${glareX} ${glareY}, rgba(56, 189, 248, 0.14), transparent 75%)`;

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

  const selectedItem = current.previewContent.items[activeItemIdx] || current.previewContent.items[0];

  return (
    <div 
      className="w-full max-w-lg font-sans"
      style={{ perspective: 1200 }}
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
        className="rounded-3xl border border-slate-200/90 dark:border-neutral-800 bg-white/95 dark:bg-[#111115]/95 backdrop-blur-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden transition-all duration-300 hover:shadow-sky-500/10 dark:hover:shadow-sky-500/10 hover:border-sky-500/30 will-change-transform"
      >
        {/* Dynamic Specular Light Glare that tracks cursor */}
        <motion.div 
          style={{ background: glareBg }}
          className="absolute inset-0 pointer-events-none rounded-3xl z-30 transition-opacity" 
        />

        {/* Ambient Top Flare */}
        <div 
          aria-hidden="true" 
          className="absolute -top-24 -right-24 w-64 h-64 bg-radial from-sky-500/15 via-indigo-500/10 to-transparent blur-2xl pointer-events-none" 
        />

        {/* Card Header (Elevated in 3D Space) */}
        <div 
          style={{ transform: "translateZ(32px)" }}
          className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-3 mb-3.5 relative z-10"
        >
          <div>
            <span className="text-[10px] font-sans font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/70 border border-sky-200/60 dark:border-sky-800/60 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {current.previewContent.badge}
            </span>
            <h4 className="font-serif font-medium text-lg sm:text-xl text-slate-900 dark:text-white mt-1 tracking-tight">
              {current.previewContent.mainTitle}
            </h4>
          </div>

          {/* Modern Cyan/Sky Live Index (No Green) */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-sans font-medium text-sky-500 dark:text-sky-400">
              Live Index
            </span>
            <div className="relative flex items-center justify-center w-2.5 h-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
            </div>
          </div>
        </div>

        {/* Interactive Signal Items List (Elevated in 3D Space) */}
        <div 
          style={{ transform: "translateZ(24px)" }}
          className="space-y-2 relative z-10"
        >
          {current.previewContent.items.map((item, idx) => {
            const isSelected = activeItemIdx === idx;
            return (
              <motion.div
                key={idx}
                onClick={() => setActiveItemIdx(idx)}
                whileHover={{ scale: 1.015, x: 3 }}
                whileTap={{ scale: 0.99 }}
                className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                  isSelected
                    ? "bg-sky-50/80 dark:bg-sky-950/40 border-sky-300 dark:border-sky-800/80 shadow-xs ring-1 ring-sky-500/20"
                    : "bg-slate-50/80 dark:bg-zinc-800/50 border-slate-100/90 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-slate-100/70 dark:hover:bg-zinc-800/80"
                }`}
              >
                <div className="flex items-center justify-between gap-2.5 text-xs">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className="font-sans font-semibold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                      {item.country}
                    </span>
                    {isSelected && (
                      <span className="shrink-0 px-1.5 py-0.5 rounded text-[9px] font-sans font-bold bg-sky-600 text-white shadow-xs">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <span className="shrink-0 text-sky-600 dark:text-sky-400 font-medium text-xs sm:text-sm tabular-nums font-sans">
                    {item.amount}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-neutral-400 mt-1.5">
                  <span className="font-medium text-slate-600 dark:text-neutral-300 truncate min-w-0 flex-1 font-sans">{item.code}</span>
                  {/* Modern Cyan/Blue Status (Replaced Green Text & Check) */}
                  <span className="shrink-0 inline-flex items-center gap-1.5 text-sky-600 dark:text-sky-400 font-medium font-sans">
                    <CheckCircle2 className="w-3 h-3 text-sky-500 dark:text-sky-400 shrink-0" />
                    <span>{item.status}</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Live Detail Inspector Box (Floating Surface in 3D Space) */}
        <AnimatePresence mode="wait">
          {selectedItem && (
            <motion.div
              key={selectedItem.country}
              initial={{ opacity: 0, y: 6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              style={{ transform: "translateZ(36px)" }}
              className="mt-3 p-3.5 rounded-xl bg-slate-100/90 dark:bg-zinc-800/70 border border-slate-200/80 dark:border-zinc-700/80 text-xs shadow-md relative z-10"
            >
              <div className="flex items-center justify-between gap-2 text-[10px] font-sans text-slate-500 dark:text-zinc-400 mb-1.5">
                <span className="truncate min-w-0 flex-1">SOURCE:{" "}{selectedItem.source}</span>
                {/* Modern Indigo/Sky Confidence Match (Replaced Green) */}
                <span className="shrink-0 text-indigo-600 dark:text-indigo-400 font-bold font-sans">{selectedItem.confidence}</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-zinc-200 leading-relaxed font-sans">
                {selectedItem.dilemma}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Meta */}
        <div 
          style={{ transform: "translateZ(18px)" }}
          className="mt-3 pt-2.5 border-t border-slate-100 dark:border-neutral-800 flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400 relative z-10"
        >
          <span className="flex items-center gap-1.5 font-sans text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>Autonomous signal indexing</span>
          </span>
          <span className="font-semibold text-slate-700 dark:text-neutral-300 font-sans text-[10.5px]">
            100% Contextual Verification
          </span>
        </div>

      </motion.div>
    </div>
  );
}

// Drastic 3D Animated Perspective Variants for Tab Switching
const drastic3DVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    rotateY: direction > 0 ? 38 : -38,
    rotateX: 12,
    z: -280,
    scale: 0.84,
    filter: "blur(14px)",
  }),
  center: {
    opacity: 1,
    rotateY: 0,
    rotateX: 0,
    z: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.58,
      ease: [0.16, 1, 0.3, 1] as const, // Smooth dramatic spring curve
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    rotateY: direction > 0 ? -38 : 38,
    rotateX: -12,
    z: -280,
    scale: 0.84,
    filter: "blur(14px)",
    transition: {
      duration: 0.38,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function CoreModulesTabs() {
  const [[activeTab, direction], setActiveTabState] = useState([0, 0]);
  const [activeItemIdx, setActiveItemIdx] = useState(0);

  const current = modules[activeTab];

  const handleTabChange = (idx: number) => {
    if (idx === activeTab) return;
    const dir = idx > activeTab ? 1 : -1;
    setActiveTabState([idx, dir]);
    setActiveItemIdx(0);
  };

  return (
    <section 
      id="recruitment-pipeline" 
      className="py-20 sm:py-28 bg-white/20 dark:bg-[#080808]/20 backdrop-blur-[1px] transition-colors relative border-t border-slate-200/60 dark:border-neutral-900 scroll-mt-20 overflow-hidden"
    >
      <div id="workflows" className="scroll-mt-24" />
      
      {/* Background Soft Glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-radial from-indigo-500/5 via-violet-500/5 to-transparent blur-[140px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ============================================================ */}
        {/* SECTION HEADER: Editorial, Clean & Authoritative (Cormorant) */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200/80 dark:text-indigo-400 dark:bg-indigo-950/60 dark:border-indigo-800/60 mb-3 shadow-xs font-sans">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            Integrated Disciplines
          </span>

          <h2 className="section-title text-slate-950 dark:text-white leading-[1.06] mb-3">
            Four Disciplines. <br className="hidden sm:inline" />
            One Working System.
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed font-sans">
            Client Forge connects the dots between discovery, opportunity tracking, tailored outreach, and ongoing client operations.
          </p>
        </div>

        {/* ============================================================ */}
        {/* UNIFIED OPTIONS SELECTOR: Zero Clipping, Perfect Spacing     */}
        {/* ============================================================ */}
        <div className="flex justify-center mb-8 sm:mb-12 px-2">
          <div className="inline-flex items-center p-1 sm:p-1.5 rounded-2xl bg-slate-100/90 dark:bg-zinc-900/90 backdrop-blur-md border border-slate-200/80 dark:border-zinc-800/80 shadow-xs max-w-full overflow-x-auto scrollbar-none">
            {modules.map((mod, idx) => {
              const Icon = mod.icon;
              const isActive = activeTab === idx;

              return (
                <button
                  key={mod.id}
                  onClick={() => handleTabChange(idx)}
                  className={`relative flex items-center gap-2 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap cursor-pointer z-10 font-sans active:scale-95 ${
                    isActive
                      ? "text-slate-950 dark:text-white"
                      : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {/* Relaxing Smooth Spring Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeModuleTabIndicator"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-xl bg-white dark:bg-zinc-800 shadow-md border border-slate-200/70 dark:border-zinc-700/80 z-[-1]"
                    />
                  )}

                  <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-zinc-500"
                  }`} />
                  
                  <span className="tracking-tight">{mod.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* ACTIVE MODULE SHOWCASE: Drastic 3D Perspective Card Flip     */}
        {/* ============================================================ */}
        <div className="w-full relative" style={{ perspective: 1400 }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              variants={drastic3DVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ transformStyle: "preserve-3d" }}
              className="rounded-3xl border border-slate-200/90 dark:border-neutral-800 bg-gradient-to-b from-slate-50/80 to-white dark:from-neutral-900/70 dark:to-[#0c0c0e] p-6 sm:p-8 lg:p-10 xl:p-12 shadow-2xl shadow-slate-200/50 dark:shadow-black/60 will-change-transform"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
                
                {/* Left Column: Premium Content & Details (Inter font, Balanced Spacing) */}
                <div className="lg:col-span-7 space-y-5">
                  
                  {/* Eyebrow Pill */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-xs font-sans font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{current.tag}</span>
                  </div>

                  {/* Display Headline (Cormorant Garamond, Clean & Balanced) */}
                  <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950 dark:text-white leading-[1.08]">
                    {current.heading}
                  </h3>

                  {/* Description Copy */}
                  <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed font-normal font-sans">
                    {current.description}
                  </p>

                  {/* Outcome Stats Strip (No Overflows, No Clipping, Auto-Sized) */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 py-4 my-1 border-y border-slate-200/80 dark:border-neutral-800">
                    {current.stats.map((s, i) => (
                      <div key={i} className="min-w-0 pr-1">
                        <div className="font-sans text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-slate-950 dark:text-white tabular-nums truncate">
                          {s.value}
                        </div>
                        <div className="text-[11px] sm:text-xs font-sans uppercase tracking-wider text-slate-500 dark:text-zinc-400 mt-1 font-medium truncate">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Feature Value Proof Bullets (Clean Blue/Cyan Checkmarks, No Green) */}
                  <div className="space-y-3 pt-1">
                    {current.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-zinc-300 font-sans">
                        <div className="w-4 h-4 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200/80 dark:border-sky-800/80 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                        </div>
                        <span className="leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Link */}
                  <div className="pt-2">
                    <Link 
                      href={
                        current.id === "intelligence"
                          ? "/talent-intelligence"
                          : current.id === "pipeline"
                          ? "/workspace/projects"
                          : current.id === "outreach"
                          ? "/features"
                          : "/people-operations"
                      } 
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-semibold text-xs sm:text-sm hover:opacity-90 transition-all shadow-sm active:scale-[0.98] group font-sans"
                    >
                      <span>Explore {current.title} in detail</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Right Column: 3D Interactive Parallax Mockup (Centered, Compact, Balanced) */}
                <div className="lg:col-span-5 flex justify-center lg:justify-end">
                  <Interactive3DPreviewCard
                    current={current}
                    activeItemIdx={activeItemIdx}
                    setActiveItemIdx={setActiveItemIdx}
                  />
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
