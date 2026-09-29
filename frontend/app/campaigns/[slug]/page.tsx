"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { demoCampaigns } from "@/lib/demoData";
import {
  Share2,
  ShieldCheck,
  CheckCircle2,
  CreditCard,
  Building2,
  Receipt,
  Printer,
  Sparkles,
  Droplets,
  Sun,
  Users,
  Check,
  Copy,
  ArrowRight,
  ExternalLink,
  Lock,
  Calendar,
  Layers,
  Activity,
  Award,
  BookOpen,
  Globe2,
  Compass,
  ArrowUpRight,
  Zap,
  Shield
} from "lucide-react";

interface CampaignMeta {
  category: string;
  categoryIcon: React.ElementType;
  sdgGoal: string;
  sdgBadge: string;
  auditId: string;
  auditCode: string;
  auditTitle: string;
  wikiPrimary: {
    title: string;
    url: string;
    desc: string;
  };
  wikiSecondary: {
    title: string;
    url: string;
    desc: string;
  };
  unWorkExplanation: string;
  evidencePhotos: {
    url: string;
    caption: string;
    tag: string;
    logId: string;
  }[];
  impactTiers: {
    tier500: string;
    tier250: string;
    tier100: string;
    tier50: string;
    tier25: string;
  };
  recentDonors: {
    name: string;
    amount: number;
    time: string;
    type: string;
  }[];
}

const CAMPAIGN_EXTRA: Record<string, CampaignMeta> = {
  "clean-water-50-villages": {
    category: "Clean Water & Hygiene Infrastructure",
    categoryIcon: Droplets,
    sdgGoal: "UN SDG 6: Clean Water & Sanitation",
    sdgBadge: "UN SDG 6.1 Priority",
    auditId: "aud_un_water",
    auditCode: "UN-SDG6-2026",
    auditTitle: "UN SDG 6 Clean Water & Sanitation Compliance Audit",
    wikiPrimary: {
      title: "Sustainable Development Goal 6",
      url: "https://en.wikipedia.org/wiki/Sustainable_Development_Goal_6",
      desc: "Mandates universal, equitable access to safe and affordable drinking water for all by 2030."
    },
    wikiSecondary: {
      title: "WASH (Water, Sanitation and Hygiene)",
      url: "https://en.wikipedia.org/wiki/WASH",
      desc: "United Nations global framework targeting waterborne pathogens, rural health, and maternal hygiene."
    },
    unWorkExplanation:
      "According to UN-Water and WHO reports, over 2.2 billion people globally lack reliably managed drinking water. Donations through Client Forge eliminate bureaucratic waste by matching each dollar directly against GPS-verified borehole drilling, flowmeter calibration, and community water committee governance.",
    evidencePhotos: [
      {
        url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80",
        caption: "Deep Aquifer Borehole Drilling & Rural Source",
        tag: "Civil Infrastructure",
        logId: "Inspection Log #104"
      },
      {
        url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80",
        caption: "Rural Village Beneficiaries & Primary School Outreach",
        tag: "Social Impact",
        logId: "Inspection Log #105"
      },
      {
        url: "https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=800&auto=format&fit=crop&q=80",
        caption: "WHO Standard Mineral & Purity Lab Screening",
        tag: "Quality Audit",
        logId: "Inspection Log #106"
      },
      {
        url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=80",
        caption: "Village Water Governance & Maintenance Council",
        tag: "Field Operations",
        logId: "Inspection Log #107"
      }
    ],
    impactTiers: {
      tier500: "Subsidizes deep solar pump hardware & high-volume inverter storage for a whole village.",
      tier250: "Funds full geochemical laboratory testing, WHO certification, and bacterial filter membranes.",
      tier100: "Constructs 15 meters of sub-surface pipeline connections directly to community taps.",
      tier50: "Equips 2 rural households with high-capacity bio-sand filtration kits and sanitary storage.",
      tier25: "Provides safe, filtered drinking water for 1 village resident for over 5 continuous years."
    },
    recentDonors: [
      { name: "Sarah M.", amount: 250, time: "4 minutes ago", type: "Monthly" },
      { name: "Julian Vance", amount: 100, time: "18 minutes ago", type: "One-time" },
      { name: "MacArthur Global Impact Fund", amount: 5000, time: "1 hour ago", type: "Grant" },
      { name: "Elena Rostova", amount: 50, time: "3 hours ago", type: "One-time" }
    ]
  },

  "youth-tech-literacy": {
    category: "Digital Literacy & STEM Education",
    categoryIcon: BookOpen,
    sdgGoal: "UN SDG 4: Quality Education",
    sdgBadge: "UN SDG 4.4 Priority",
    auditId: "aud_un_edu",
    auditCode: "UN-SDG4-2026",
    auditTitle: "UN SDG 4 Digital Education & IT Lab Quality Compliance Audit",
    wikiPrimary: {
      title: "Sustainable Development Goal 4",
      url: "https://en.wikipedia.org/wiki/Sustainable_Development_Goal_4",
      desc: "Ensures inclusive and equitable quality education and promotes lifelong learning opportunities for all."
    },
    wikiSecondary: {
      title: "Global Digital Divide",
      url: "https://en.wikipedia.org/wiki/Digital_divide",
      desc: "United Nations and ITU economic research on the disparity in access to modern information and computer technology."
    },
    unWorkExplanation:
      "UNESCO estimates that over 250 million children and youth worldwide lack access to basic computer technology. Donations directly accelerate UN SDG Target 4.4 by supplying certified refurbished laptops, offline Wikipedia libraries (Kiwix), and interactive coding curricula to high-need classrooms.",
    evidencePhotos: [
      {
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
        caption: "Refurbished Laptop Deployments & Student Workstations",
        tag: "Hardware Audit",
        logId: "Inspection Log #201"
      },
      {
        url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
        caption: "Interactive Digital Literacy & Python Coding Classes",
        tag: "Curriculum Delivery",
        logId: "Inspection Log #202"
      },
      {
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80",
        caption: "Collaborative Peer Problem-Solving & Innovation Pods",
        tag: "Youth Engagement",
        logId: "Inspection Log #203"
      },
      {
        url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
        caption: "STEM Robotics Lab & Hands-on Electronics Assembly",
        tag: "Technical Training",
        logId: "Inspection Log #204"
      }
    ],
    impactTiers: {
      tier500: "Equips an entire 5-student pod with refurbished Linux laptops and coding accessories.",
      tier250: "Installs enterprise local networking, offline Wikipedia/Kiwix caches, and battery backups.",
      tier100: "Provides 1 certified refurbished laptop workstation with preloaded STEM learning software.",
      tier50: "Funds 1 year of high-speed educational connectivity and software licenses for a student.",
      tier25: "Provides comprehensive coding textbooks, project kits, and digital literacy workbooks."
    },
    recentDonors: [
      { name: "David Chen", amount: 500, time: "12 minutes ago", type: "Monthly" },
      { name: "Maya Lin", amount: 100, time: "35 minutes ago", type: "One-time" },
      { name: "Open Education Alliance", amount: 3500, time: "2 hours ago", type: "Grant" },
      { name: "Marcus Thorne", amount: 50, time: "5 hours ago", type: "One-time" }
    ]
  },

  "medical-clinic-solar": {
    category: "Renewable Energy & Rural Healthcare",
    categoryIcon: Sun,
    sdgGoal: "UN SDG 7: Clean Energy & SDG 3: Good Health",
    sdgBadge: "UN SDG 7.1 & 3.8 Priority",
    auditId: "aud_un_solar",
    auditCode: "UN-SDG7-2026",
    auditTitle: "UN SDG 7 Clean Energy & Clinic Cold-Chain Electrification Audit",
    wikiPrimary: {
      title: "Sustainable Development Goal 7",
      url: "https://en.wikipedia.org/wiki/Sustainable_Development_Goal_7",
      desc: "Ensures access to affordable, reliable, sustainable, and modern energy for all."
    },
    wikiSecondary: {
      title: "Cold Chain (Vaccine & Medical Logistics)",
      url: "https://en.wikipedia.org/wiki/Cold_chain",
      desc: "Vital temperature-controlled pharmaceutical supply chain safeguarding vaccines, blood, and medical serums."
    },
    unWorkExplanation:
      "World Health Organization (WHO) field audits indicate that 1 in 4 rural clinics in developing economies lack reliable electric power, destroying temperature-sensitive vaccines and plunging emergency rooms into darkness. Donations fund off-grid solar micro-grids with battery backups to keep life-saving wards operational 24/7.",
    evidencePhotos: [
      {
        url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&auto=format&fit=crop&q=80",
        caption: "Clean Photovoltaic Rooftop Solar Array Commissioning",
        tag: "Renewable Energy",
        logId: "Inspection Log #301"
      },
      {
        url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80",
        caption: "Emergency Room & Maternity Ward 24/7 Power Distribution",
        tag: "Clinical Care",
        logId: "Inspection Log #302"
      },
      {
        url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80",
        caption: "Vaccine Cold-Chain Storage & Continuous Temperature Sensor",
        tag: "WHO Cold-Chain",
        logId: "Inspection Log #303"
      },
      {
        url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80",
        caption: "Lithium-Iron Battery Storage & Inverter Synchronization",
        tag: "Grid Resilience",
        logId: "Inspection Log #304"
      }
    ],
    impactTiers: {
      tier500: "Funds smart micro-grid inverter synchronization hardware for continuous critical power.",
      tier250: "Installs medical-grade deep-cycle battery backup for vaccine cold-storage refrigerators.",
      tier100: "Mounts 1 high-efficiency monocrystalline solar photovoltaic panel on the clinic roof.",
      tier50: "Provides surgical room LED emergency lighting battery backup and circuit breaker kit.",
      tier25: "Powers 1 continuous month of cold-chain vaccine temperature monitoring telemetry."
    },
    recentDonors: [
      { name: "Dr. Aris Thorne", amount: 1000, time: "15 minutes ago", type: "One-time" },
      { name: "Solar Health Initiative", amount: 10000, time: "45 minutes ago", type: "Grant" },
      { name: "Fatima Al-Sayed", amount: 250, time: "1 hour ago", type: "Monthly" },
      { name: "James O'Connor", amount: 100, time: "4 hours ago", type: "One-time" }
    ]
  }
};

export default function CampaignPublicPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "clean-water-50-villages";

  const campaign =
    demoCampaigns.find((c) => c.slug === slug) || demoCampaigns[0];

  const meta: CampaignMeta =
    CAMPAIGN_EXTRA[slug] || CAMPAIGN_EXTRA["clean-water-50-villages"];
  const CategoryIcon = meta.categoryIcon;

  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [donorName, setDonorName] = useState("Rachel Sterling");
  const [donorEmail, setDonorEmail] = useState("rachel.sterling@example.com");

  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isCustomActive = customAmount !== "" || selectedAmount === 0;
  const effectiveAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;
  const progressPercent = Math.min(100, Math.round((campaign.raised / campaign.goal) * 100));

  const getImpactDescription = (amount: number) => {
    if (amount >= 500) return meta.impactTiers.tier500;
    if (amount >= 250) return meta.impactTiers.tier250;
    if (amount >= 100) return meta.impactTiers.tier100;
    if (amount >= 50) return meta.impactTiers.tier50;
    return meta.impactTiers.tier25;
  };

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setReceiptNumber(`REC-2026-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsSubmitting(false);
      setShowReceipt(true);
    }, 600);
  };

  const copyShareLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="campaign-shell min-h-screen bg-[#09090b] text-white font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="border-b border-white/[0.08] bg-[#0c0c10]/85 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group" title="Return to Client Forge Home">
            <div className="w-8 h-8 rounded-xl overflow-hidden border border-white/20 bg-black flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <img src="/logo.jpg" alt="Client Forge Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-victorian font-normal text-xl tracking-wide text-white">Client Forge</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-sans font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Verified 501(c)(3) Campaign
            </div>
            <Link
              href="/workspace"
              className="text-xs font-sans font-medium text-neutral-300 hover:text-white px-3.5 py-1.5 rounded-xl border border-white/10 hover:bg-white/[0.06] transition-all"
            >
              Go to Workspace &rarr;
            </Link>
          </div>
        </div>
      </header>

      {/* Campaign Switcher Navigation Bar */}
      <div className="border-b border-white/[0.06] bg-[#0e0e12]/60 backdrop-blur-xs py-2.5 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 overflow-x-auto text-xs font-sans font-medium">
          <div className="flex items-center gap-2 shrink-0 text-neutral-400">
            <Compass className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="font-semibold text-white">Explore Campaigns:</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {demoCampaigns.map((c) => {
              const isCurrent = c.slug === slug;
              return (
                <Link
                  key={c.id}
                  href={`/campaigns/${c.slug}`}
                  className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                    isCurrent
                      ? "bg-white text-neutral-950 font-bold shadow-xs"
                      : "bg-white/[0.03] hover:bg-white/[0.08] text-neutral-300 hover:text-white border border-white/[0.06]"
                  }`}
                >
                  {c.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Campaign Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 lg:py-14 grid lg:grid-cols-12 gap-10">
        {/* Left Column: Story, Milestones, and Field Evidence */}
        <div className="lg:col-span-7 space-y-10">
          {/* Hero Cover Card with Animation */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative rounded-3xl overflow-hidden border border-white/[0.1] shadow-2xl h-80 sm:h-[420px] group"
          >
            <img
              src={campaign.coverImage}
              alt={campaign.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-black/30 to-black/10" />

            {/* Badges on Hero */}
            <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-sans font-medium bg-black/60 backdrop-blur-md border border-white/15 text-indigo-300 flex items-center gap-1.5 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Hope Foundation Global Initiative
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-emerald-300 flex items-center gap-1.5 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {campaign.status === "Completed" ? "100% Fully Funded" : "Active Campaign"}
              </span>
            </div>

            {/* Quick Share action button on image */}
            <div className="absolute bottom-5 right-5">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={copyShareLink}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 text-xs font-sans font-medium text-white transition-all shadow-xl cursor-pointer"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{isCopied ? "Link Copied!" : "Share Project"}</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Campaign Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="space-y-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-wider text-indigo-400">
                <CategoryIcon className="w-4 h-4" />
                <span>{meta.category}</span>
              </div>
              <span className="text-neutral-600 text-xs">•</span>
              <Link
                href={`/workspace/audits?tab=findings&search=${encodeURIComponent(meta.auditCode)}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-sans font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 border border-amber-500/20 transition cursor-pointer"
                title="View linked UN Audit in Workspace"
              >
                <Shield className="w-3 h-3 text-amber-400" />
                <span>UN Audit: {meta.auditCode}</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-semibold text-white tracking-tight leading-tight">
              {campaign.title}
            </h1>
            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-sans font-normal pt-1">
              {campaign.description} Every contribution is tracked directly through Hope Foundation’s transparent treasury ledger, matching every dollar against verified on-site engineering deliverables and water purity audits.
            </p>
          </motion.div>

          {/* Impact Headline Numbers */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="grid grid-cols-3 gap-4 p-5 rounded-2xl bg-[#121216] border border-white/[0.08] shadow-md"
          >
            <div className="space-y-1">
              <div className="text-xs font-sans font-semibold text-neutral-400 uppercase tracking-wider">Verified Donors</div>
              <div className="font-sans text-2xl sm:text-3xl font-medium tracking-tight text-white tabular-nums">
                {campaign.donorCount}
              </div>
              <div className="text-[11px] font-sans text-emerald-400 font-medium">+14 this week</div>
            </div>
            <div className="space-y-1 border-x border-white/[0.06] px-4">
              <div className="text-xs font-sans font-semibold text-neutral-400 uppercase tracking-wider">Project Goal</div>
              <div className="font-sans text-2xl sm:text-3xl font-medium tracking-tight text-white tabular-nums">
                ${campaign.goal.toLocaleString()}
              </div>
              <div className="text-[11px] font-sans text-neutral-400">Target Budget</div>
            </div>
            <div className="space-y-1 pl-2">
              <div className="text-xs font-sans font-semibold text-neutral-400 uppercase tracking-wider">Progress</div>
              <div className="font-sans text-2xl sm:text-3xl font-medium tracking-tight text-emerald-400 tabular-nums">
                {progressPercent}%
              </div>
              <div className="text-[11px] font-sans text-neutral-400">Targeting {campaign.endDate}</div>
            </div>
          </motion.div>

          {/* UNITED NATIONS 2030 AGENDA & WIKIPEDIA KNOWLEDGE SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: "easeOut" }}
            className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/30 via-[#121218] to-[#121216] border border-indigo-500/20 shadow-xl space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Globe2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-sans font-semibold text-white tracking-tight">
                    United Nations 2030 Agenda Alignment
                  </h3>
                  <p className="text-xs font-sans text-neutral-400">
                    How your contribution empowers verified UN Sustainable Development Goals.
                  </p>
                </div>
              </div>
              <Link
                href={`/workspace/audits?tab=findings&search=${encodeURIComponent(meta.auditCode)}`}
                className="px-3 py-1 rounded-full text-xs font-sans font-semibold bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 hover:text-white border border-indigo-500/30 w-fit whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer"
                title="Inspect UN SDG Audits in Workspace"
              >
                <span>{meta.sdgBadge}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-indigo-400" />
              </Link>
            </div>

            <p className="text-xs sm:text-sm font-sans text-neutral-300 leading-relaxed">
              {meta.unWorkExplanation}
            </p>

            {/* Live UN Audit & Compliance Access Strip */}
            <div className="p-3.5 rounded-2xl bg-black/40 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30 shrink-0">
                  <Shield className="w-4 h-4" />
                </span>
                <div className="text-xs font-sans">
                  <div className="font-semibold text-neutral-200 flex items-center gap-1.5">
                    <span>Active UN Fieldwork Audit:</span>
                    <span className="text-amber-400 font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">{meta.auditCode}</span>
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">
                    Continuous third-party compliance, sensor calibration & corrective action ledger.
                  </div>
                </div>
              </div>
              <Link
                href={`/workspace/audits?tab=findings&search=${encodeURIComponent(meta.auditCode)}`}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-sans font-semibold transition shadow-md shadow-amber-500/20 shrink-0 cursor-pointer"
              >
                <span>Inspect UN Audit Ledger</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="pt-2">
              <div className="text-xs font-sans font-semibold text-neutral-400 mb-2 uppercase tracking-wider">
                Official Wikipedia Research & Background Context:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={meta.wikiPrimary.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-indigo-400/40 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-sans font-semibold text-white group-hover:text-indigo-300 transition-colors">
                      <span className="line-clamp-1">{meta.wikiPrimary.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-indigo-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <p className="text-[11px] font-sans text-neutral-400 mt-1 leading-relaxed">
                      {meta.wikiPrimary.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-sans font-semibold text-indigo-400 mt-2.5">
                    <span>Read on Wikipedia</span>
                    <span>&rarr;</span>
                  </div>
                </a>

                <a
                  href={meta.wikiSecondary.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-indigo-400/40 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-sans font-semibold text-white group-hover:text-indigo-300 transition-colors">
                      <span className="line-clamp-1">{meta.wikiSecondary.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-indigo-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <p className="text-[11px] font-sans text-neutral-400 mt-1 leading-relaxed">
                      {meta.wikiSecondary.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-sans font-semibold text-indigo-400 mt-2.5">
                    <span>Read on Wikipedia</span>
                    <span>&rarr;</span>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Field Evidence & Project Photographic Gallery (Accurate & Unique to this Campaign) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="space-y-4 pt-2"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-sans font-semibold text-white tracking-tight">
                  Field Evidence & Site Documentation
                </h3>
                <p className="text-xs font-sans text-neutral-400 mt-0.5">
                  Verified photographs uploaded from on-site technical teams and independent inspectors. Click any log to inspect audit findings.
                </p>
              </div>
              <Link
                href={`/workspace/audits?tab=findings&search=${encodeURIComponent(meta.auditCode)}`}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans font-medium bg-white/[0.04] hover:bg-amber-500/10 border border-white/[0.08] hover:border-amber-500/30 text-neutral-300 hover:text-amber-300 transition group"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>4 Audited Photos</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {meta.evidencePhotos.map((photo, idx) => (
                <Link
                  key={idx}
                  href={`/workspace/audits?tab=findings&search=${encodeURIComponent(photo.logId)}`}
                  className="block"
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="rounded-2xl overflow-hidden border border-white/[0.08] hover:border-amber-500/40 bg-[#121216] shadow-md group relative cursor-pointer transition-colors"
                  >
                    <div className="h-44 overflow-hidden relative">
                      <img
                        src={photo.url}
                        alt={photo.caption}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold bg-black/60 backdrop-blur-md text-white border border-white/10 uppercase tracking-wider">
                        {photo.tag}
                      </span>
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-sans font-medium bg-amber-500/20 backdrop-blur-md text-amber-300 border border-amber-500/30 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Shield className="w-3 h-3" /> Audit Log &rarr;
                      </span>
                    </div>
                    <div className="p-3.5">
                      <p className="text-xs font-sans font-medium text-neutral-200 group-hover:text-white line-clamp-1 transition-colors">
                        {photo.caption}
                      </p>
                      <div className="flex items-center justify-between text-[11px] font-sans text-neutral-400 mt-1.5">
                        <span className="font-semibold text-amber-400/90 group-hover:text-amber-300 flex items-center gap-1">
                          <span>{photo.logId}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </span>
                        <span className="text-emerald-400 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Verified
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Recent Live Donors Feed */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-sans font-semibold text-white tracking-tight flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Recent Contributions</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {meta.recentDonors.map((d, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs font-sans">
                  <div>
                    <div className="font-semibold text-white">{d.name}</div>
                    <div className="text-[11px] text-neutral-400">{d.time} • {d.type}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-emerald-400 tabular-nums text-sm">+${d.amount.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Checkout Card */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="rounded-3xl bg-[#111116] border border-white/[0.12] p-6 sm:p-8 shadow-2xl sticky top-24 space-y-6"
          >
            {/* Funding Progress Meter */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-baseline">
                <div className="font-sans text-3xl font-medium tracking-tight text-white tabular-nums">
                  ${campaign.raised.toLocaleString()}
                </div>
                <span className="text-xs font-sans font-medium text-neutral-400">
                  of ${campaign.goal.toLocaleString()} goal
                </span>
              </div>

              <div className="w-full h-3 bg-neutral-900 rounded-full overflow-hidden p-0.5 border border-white/[0.06]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 rounded-full"
                />
              </div>

              <div className="flex justify-between text-[11px] font-sans text-neutral-400">
                <span>{progressPercent}% Funded</span>
                <span>
                  {campaign.raised >= campaign.goal
                    ? "Goal Fully Achieved!"
                    : `$${(campaign.goal - campaign.raised).toLocaleString()} Remaining`}
                </span>
              </div>
            </div>

            {/* Donation Form */}
            <form onSubmit={handleDonate} className="space-y-5">
              {/* Frequency Toggle with Spring Sliding Pill */}
              <div className="grid grid-cols-2 p-1 bg-white/[0.04] border border-white/[0.08] rounded-2xl text-xs font-sans font-medium relative">
                {(["one-time", "monthly"] as const).map((freq) => {
                  const isActive = frequency === freq;
                  return (
                    <motion.button
                      key={freq}
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setFrequency(freq)}
                      className={`relative py-2.5 rounded-xl transition-colors cursor-pointer text-center ${
                        isActive ? "text-neutral-950 font-semibold" : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="donationFrequencyPill"
                          className="absolute inset-0 bg-white rounded-xl shadow-md"
                          transition={{ type: "spring", stiffness: 450, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10 capitalize">
                        {freq === "one-time" ? "One-Time Donation" : "Monthly Sustainer"}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Amount Selection Grid with Smooth Sliding White Toggle */}
              <div className="space-y-2">
                <label className="block text-xs font-sans font-semibold text-neutral-300">
                  Select Donation Amount
                </label>
                <div className="grid grid-cols-3 gap-2 p-1.5 bg-white/[0.04] border border-white/[0.08] rounded-2xl relative">
                  {[25, 50, 100, 250, 500].map((amt) => {
                    const isSelected = selectedAmount === amt && !customAmount;
                    return (
                      <motion.button
                        type="button"
                        key={amt}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => {
                          setSelectedAmount(amt);
                          setCustomAmount("");
                        }}
                        className={`relative py-3 rounded-xl text-sm font-sans transition-colors cursor-pointer flex items-center justify-center ${
                          isSelected
                            ? "text-neutral-950 font-bold"
                            : "text-neutral-400 hover:text-white font-medium"
                        }`}
                      >
                        {isSelected && (
                          <motion.div
                            layoutId="donationAmountPill"
                            className="absolute inset-0 bg-white rounded-xl shadow-md"
                            transition={{ type: "spring", stiffness: 450, damping: 32 }}
                          />
                        )}
                        <span className="relative z-10">${amt}</span>
                      </motion.button>
                    );
                  })}

                  {/* Custom Amount with Smooth White Toggle Slide */}
                  <div
                    onClick={() => {
                      if (!customAmount) {
                        setSelectedAmount(0);
                      }
                    }}
                    className={`relative py-3 rounded-xl transition-colors cursor-pointer flex items-center justify-center ${
                      customAmount || selectedAmount === 0
                        ? "text-neutral-950 font-bold"
                        : "text-neutral-400 hover:text-white font-medium"
                    }`}
                  >
                    {(customAmount !== "" || selectedAmount === 0) && (
                      <motion.div
                        layoutId="donationAmountPill"
                        className="absolute inset-0 bg-white rounded-xl shadow-md"
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      />
                    )}
                    <div className="relative z-10 flex items-center justify-center w-full px-2">
                      <span
                        className={`text-sm font-semibold mr-0.5 ${
                          customAmount || selectedAmount === 0 ? "text-neutral-950" : "text-neutral-400"
                        }`}
                      >
                        $
                      </span>
                      <input
                        type="number"
                        placeholder="Custom"
                        value={customAmount}
                        onFocus={() => setSelectedAmount(0)}
                        onChange={(e) => {
                          setSelectedAmount(0);
                          setCustomAmount(e.target.value);
                        }}
                        className={`w-full max-w-[65px] bg-transparent text-sm font-sans font-semibold focus:outline-none text-center ${
                          customAmount || selectedAmount === 0
                            ? "text-neutral-950 placeholder-neutral-500 font-bold"
                            : "text-neutral-300 placeholder-neutral-400"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Real-Time Impact Calculator */}
              <motion.div
                key={effectiveAmount}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-sans text-indigo-200 flex items-start gap-2.5 shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-semibold text-white">${effectiveAmount || 0} Impact:</span>{" "}
                  {getImpactDescription(effectiveAmount)}
                </div>
              </motion.div>

              {/* Donor Contact Inputs */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-sans font-medium text-neutral-300 mb-1">
                    Your Full Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm font-sans text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans font-medium text-neutral-300 mb-1">
                    Email Address (for Instant 501(c)(3) Receipt)
                  </label>
                  <input
                    type="email"
                    required
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm font-sans text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              {/* Stripe Test Sandbox Card */}
              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs font-sans text-neutral-400 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-4 h-4 text-indigo-400" />
                  <span className="font-medium text-neutral-300">Stripe Card: •••• 4242</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium text-[10px]">
                  Sandbox Ready
                </span>
              </div>

              {/* Submit CTA Button - Clean "Donate" with 0 emoji */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting || effectiveAmount <= 0}
                className="w-full py-4 rounded-2xl bg-white hover:bg-neutral-100 disabled:opacity-50 text-neutral-950 font-sans font-semibold text-sm transition-all shadow-xl shadow-white/10 flex items-center justify-center cursor-pointer"
              >
                <span>{isSubmitting ? "Donating..." : "Donate"}</span>
              </motion.button>

              {/* Security Footnote */}
              <div className="flex items-center justify-center gap-2 text-[11px] font-sans text-neutral-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>256-bit encrypted • Official 501(c)(3) tax deduction</span>
              </div>
            </form>
          </motion.div>
        </div>
      </main>

      {/* Animated Official Tax Receipt Modal */}
      <AnimatePresence>
        {showReceipt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReceipt(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ type: "spring", stiffness: 450, damping: 32 }}
              className="relative bg-[#111116] border border-white/[0.14] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl z-10 text-left font-sans"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-5 shadow-xs">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-emerald-400 mb-1 block">
                Payment Succeeded & Reconciled
              </span>
              <h3 className="text-2xl font-sans font-semibold text-white tracking-tight mb-1">
                Official Donation Receipt
              </h3>
              <p className="text-xs font-sans text-neutral-400 mb-6">
                Receipt Number: <span className="font-medium text-neutral-300">{receiptNumber}</span>
              </p>

              <div className="space-y-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-xs font-sans mb-6">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Beneficiary Organization:</span>
                  <span className="text-white font-medium">Hope Foundation Inc.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Initiative / Campaign:</span>
                  <span className="text-white font-medium truncate max-w-[200px]">{campaign.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Donor Name:</span>
                  <span className="text-white font-medium">{donorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Payment Frequency:</span>
                  <span className="text-indigo-300 font-medium capitalize">{frequency}</span>
                </div>
                <div className="flex justify-between border-t border-white/[0.06] pt-2 mt-2">
                  <span className="text-neutral-400 font-medium">Net Amount:</span>
                  <span className="text-emerald-400 font-bold text-sm">${effectiveAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Tax Deductibility:</span>
                  <span className="text-emerald-400 font-medium">100% (501(c)(3) Eligible)</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.print()}
                  className="flex-1 py-3 rounded-xl border border-white/15 text-white hover:bg-white/[0.06] text-xs font-sans font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  Print PDF Receipt
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowReceipt(false)}
                  className="flex-1 py-3 rounded-xl bg-white text-neutral-950 text-xs font-sans font-semibold hover:bg-neutral-200 cursor-pointer transition-colors shadow-md"
                >
                  Done
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
