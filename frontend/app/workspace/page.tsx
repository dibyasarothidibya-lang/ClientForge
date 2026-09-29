"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
import { ThreeDCard } from "@/components/motion/ThreeDCard";
import SquishSwitch from "@/components/motion/SquishSwitch";
import FluidButton from "@/components/motion/FluidButton";
import {
  Users,
  UserCheck,
  UserPlus,
  Briefcase,
  Calendar,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  TrendingUp,
  Sparkles,
  Check,
  Eye,
  MapPin,
  Globe2,
  Star,
  Undo2,
} from "lucide-react";

// --------------------------------------------------------------------------
// 12-MONTH HISTORICAL WORKFORCE DATASET (INTERNALLY COHERENT FOR HOPE FOUNDATION)
// Total Workforce = 248 (214 FTE, 34 Field Contractors)
// --------------------------------------------------------------------------
interface MonthRecord {
  id: string;
  month: string;
  fullMonth: string;
  headcount: number;
  hires: number;
  exits: number;
  net: number;
  retentionRate: number; // percentage
  payrollMonthly: number; // USD
  remotePct: number;
  topGrowthDept: string;
}

const HISTORICAL_WORKFORCE: MonthRecord[] = [
  { id: "m1", month: "Oct 25", fullMonth: "October 2025", headcount: 218, hires: 5, exits: 1, net: 4, retentionRate: 99.5, payrollMonthly: 1820000, remotePct: 29, topGrowthDept: "Global Operations" },
  { id: "m2", month: "Nov 25", fullMonth: "November 2025", headcount: 221, hires: 4, exits: 1, net: 3, retentionRate: 99.5, payrollMonthly: 1845000, remotePct: 30, topGrowthDept: "Medical & Health" },
  { id: "m3", month: "Dec 25", fullMonth: "December 2025", headcount: 223, hires: 3, exits: 1, net: 2, retentionRate: 99.5, payrollMonthly: 1860000, remotePct: 31, topGrowthDept: "Technology & Systems" },
  { id: "m4", month: "Jan 26", fullMonth: "January 2026", headcount: 228, hires: 6, exits: 1, net: 5, retentionRate: 99.6, payrollMonthly: 1910000, remotePct: 32, topGrowthDept: "Global Operations" },
  { id: "m5", month: "Feb 26", fullMonth: "February 2026", headcount: 231, hires: 4, exits: 1, net: 3, retentionRate: 99.6, payrollMonthly: 1935000, remotePct: 33, topGrowthDept: "Finance & Compliance" },
  { id: "m6", month: "Mar 26", fullMonth: "March 2026", headcount: 234, hires: 5, exits: 2, net: 3, retentionRate: 99.1, payrollMonthly: 1960000, remotePct: 32, topGrowthDept: "Medical & Health" },
  { id: "m7", month: "Apr 26", fullMonth: "April 2026", headcount: 236, hires: 3, exits: 1, net: 2, retentionRate: 99.6, payrollMonthly: 1980000, remotePct: 31, topGrowthDept: "Technology & Systems" },
  { id: "m8", month: "May 26", fullMonth: "May 2026", headcount: 239, hires: 4, exits: 1, net: 3, retentionRate: 99.6, payrollMonthly: 2005000, remotePct: 30, topGrowthDept: "Global Operations" },
  { id: "m9", month: "Jun 26", fullMonth: "June 2026", headcount: 242, hires: 5, exits: 2, net: 3, retentionRate: 99.2, payrollMonthly: 2035000, remotePct: 31, topGrowthDept: "People & Talent" },
  { id: "m10", month: "Jul 26", fullMonth: "July 2026", headcount: 244, hires: 4, exits: 2, net: 2, retentionRate: 99.2, payrollMonthly: 2055000, remotePct: 31, topGrowthDept: "Medical & Health" },
  { id: "m11", month: "Aug 26", fullMonth: "August 2026", headcount: 246, hires: 3, exits: 1, net: 2, retentionRate: 99.6, payrollMonthly: 2070000, remotePct: 31, topGrowthDept: "Technology & Systems" },
  { id: "m12", month: "Sep 26", fullMonth: "September 2026 (Audited)", headcount: 248, hires: 4, exits: 2, net: 2, retentionRate: 99.2, payrollMonthly: 2095000, remotePct: 31, topGrowthDept: "Global Operations" },
];

// Department Breakdown (exact sum = 248)
interface DepartmentStat {
  id: string;
  name: string;
  headcount: number;
  pct: number;
  monthlySpend: number;
  lead: string;
  leadRole: string;
  openRoles: string[];
  color: string;
  fteRatio: string;
  healthScore: number;
}

const DEPARTMENTS: DepartmentStat[] = [
  {
    id: "dept_ops",
    name: "Global Operations & Field",
    headcount: 78,
    pct: 31.5,
    monthlySpend: 624000,
    lead: "Marcus Thorne",
    leadRole: "Chief Operations Officer",
    openRoles: ["Senior Field Logistician", "Emergency Response Lead", "Station Supply Specialist"],
    color: "#6366f1",
    fteRatio: "62 FTE / 16 Contractors",
    healthScore: 98,
  },
  {
    id: "dept_med",
    name: "Medical & Humanitarian Aid",
    headcount: 52,
    pct: 21.0,
    monthlySpend: 442000,
    lead: "Dr. Tariq Vance",
    leadRole: "Medical Operations Director",
    openRoles: ["Field Surgeon Lead", "Epidemiology Coordinator"],
    color: "#06b6d4",
    fteRatio: "44 FTE / 8 Contractors",
    healthScore: 99,
  },
  {
    id: "dept_tech",
    name: "Technology & Systems",
    headcount: 44,
    pct: 17.7,
    monthlySpend: 396000,
    lead: "Liam O'Connor",
    leadRole: "VP of Enterprise Infrastructure",
    openRoles: ["Distributed Systems Architect", "Healthcare Data Security Analyst"],
    color: "#10b981",
    fteRatio: "38 FTE / 6 Contractors",
    healthScore: 96,
  },
  {
    id: "dept_fin",
    name: "Finance & Compliance",
    headcount: 36,
    pct: 14.5,
    monthlySpend: 306000,
    lead: "Elena Rostova",
    leadRole: "Lead Governance & Audit Officer",
    openRoles: ["Global Grant Controller"],
    color: "#f59e0b",
    fteRatio: "34 FTE / 2 Contractors",
    healthScore: 97,
  },
  {
    id: "dept_people",
    name: "People Operations & Talent",
    headcount: 22,
    pct: 8.9,
    monthlySpend: 187000,
    lead: "Amina Al-Mansoor",
    leadRole: "Head of Global People & Culture",
    openRoles: ["International Mobility Specialist"],
    color: "#ec4899",
    fteRatio: "21 FTE / 1 Contractor",
    healthScore: 100,
  },
  {
    id: "dept_exec",
    name: "Executive & Strategy",
    headcount: 16,
    pct: 6.5,
    monthlySpend: 140000,
    lead: "Dr. Sarah Lin",
    leadRole: "Executive Board President",
    openRoles: [],
    color: "#8b5cf6",
    fteRatio: "15 FTE / 1 Senior Advisor",
    healthScore: 99,
  },
];

// ATS Funnel Stages with Live Candidate Details
interface CandidateDetail {
  id: string;
  name: string;
  role: string;
  rating: number;
  experience: string;
  expectedSalary: string;
  location: string;
  avatar: string;
  skills: string[];
}

interface FunnelStage {
  id: string;
  label: string;
  candidatesCount: number;
  conversionRate: string;
  avgDurationDays: number;
  color: string;
  candidates: CandidateDetail[];
}

const ATS_STAGES_DATA: FunnelStage[] = [
  {
    id: "applied",
    label: "Applied",
    candidatesCount: 21,
    conversionRate: "66.7% pass",
    avgDurationDays: 4.2,
    color: "#94a3b8",
    candidates: [
      {
        id: "c_app_1",
        name: "Maya Lin",
        role: "Global Mobility & Comp Analyst",
        rating: 4.8,
        experience: "5 yrs",
        expectedSalary: "$125,000",
        location: "Geneva (Remote)",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
        skills: ["EOR Management", "Tax Equalization", "Workday"],
      },
      {
        id: "c_app_2",
        name: "Marcus Bell",
        role: "Field Operations Logistics Specialist",
        rating: 4.6,
        experience: "6 yrs",
        expectedSalary: "$110,000",
        location: "Nairobi Hub",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
        skills: ["Supply Chain", "Air Freight", "Emergency Protocols"],
      },
    ],
  },
  {
    id: "screening",
    label: "Screening",
    candidatesCount: 14,
    conversionRate: "50.0% pass",
    avgDurationDays: 5.6,
    color: "#38bdf8",
    candidates: [
      {
        id: "c_scr_1",
        name: "Sofia Rossi",
        role: "International HR Compliance Lead",
        rating: 4.9,
        experience: "7 yrs",
        expectedSalary: "$138,000",
        location: "Rome / Hybrid",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80",
        skills: ["GDPR", "UN Employment Guidelines", "Labor Law"],
      },
      {
        id: "c_scr_2",
        name: "Dr. Amara Osei",
        role: "Field Medical Operations Officer",
        rating: 5.0,
        experience: "9 yrs",
        expectedSalary: "$165,000",
        location: "Accra / Field Deployment",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80",
        skills: ["Trauma Medicine", "Triage Protocols", "WHO Standards"],
      },
    ],
  },
  {
    id: "interview",
    label: "Panel Interview",
    candidatesCount: 7,
    conversionRate: "42.9% pass",
    avgDurationDays: 8.4,
    color: "#818cf8",
    candidates: [
      {
        id: "c_int_1",
        name: "Devon Chen",
        role: "Staff Systems & Product Designer",
        rating: 4.9,
        experience: "8 yrs",
        expectedSalary: "$158,000",
        location: "San Francisco / Remote",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80",
        skills: ["Design Systems", "Figma Token Architecture", "Accessibility"],
      },
      {
        id: "c_int_2",
        name: "Kenji Sato",
        role: "Distributed Infrastructure Architect",
        rating: 4.7,
        experience: "10 yrs",
        expectedSalary: "$180,000",
        location: "Tokyo Hub",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&auto=format&fit=crop&q=80",
        skills: ["Kubernetes", "PostgreSQL High Availability", "Zero-Trust"],
      },
    ],
  },
  {
    id: "offer",
    label: "Offer Extended",
    candidatesCount: 3,
    conversionRate: "66.7% accept",
    avgDurationDays: 3.1,
    color: "#fbbf24",
    candidates: [
      {
        id: "c_off_1",
        name: "Dr. Tariq Vance",
        role: "Senior Humanitarian Medical Director",
        rating: 5.0,
        experience: "12 yrs",
        expectedSalary: "$195,000",
        location: "Amman / Geneva",
        avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=160&auto=format&fit=crop&q=80",
        skills: ["Clinical Governance", "Disaster Response", "Budget Oversight"],
      },
      {
        id: "c_off_2",
        name: "Fatima Al-Zahra",
        role: "Medical Supply Chain Coordinator",
        rating: 4.8,
        experience: "6 yrs",
        expectedSalary: "$130,000",
        location: "Amman Hub",
        avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=160&auto=format&fit=crop&q=80",
        skills: ["Cold Chain Logistics", "Vaccine Distribution", "ERP Systems"],
      },
    ],
  },
  {
    id: "hired",
    label: "Hired (Q3)",
    candidatesCount: 2,
    conversionRate: "100% joined",
    avgDurationDays: 1.0,
    color: "#34d399",
    candidates: [
      {
        id: "c_hir_1",
        name: "Klaus Weber",
        role: "Principal Cloud & Security Architect",
        rating: 5.0,
        experience: "11 yrs",
        expectedSalary: "$185,000",
        location: "Berlin / Remote",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&auto=format&fit=crop&q=80",
        skills: ["AWS GovCloud", "SOC-2 HR Compliance", "Terraform"],
      },
    ],
  },
];

// Global Duty Stations for Hope Foundation (Sum = 248)
interface DutyStation {
  id: string;
  city: string;
  country: string;
  region: string;
  personnelCount: number;
  activePct: number;
  timezone: string;
  utcOffset: string;
  leadCoordinator: string;
  status: "Full Capacity" | "High Deployment" | "Normal";
}

const DUTY_STATIONS: DutyStation[] = [
  { id: "gva", city: "Geneva", country: "Switzerland", region: "Global HQ & EOR", personnelCount: 42, activePct: 98.2, timezone: "CEST (Geneva)", utcOffset: "UTC+2", leadCoordinator: "Dr. Sarah Lin", status: "Normal" },
  { id: "nbo", city: "Nairobi", country: "Kenya", region: "East Africa Field Command", personnelCount: 78, activePct: 97.4, timezone: "EAT (Nairobi)", utcOffset: "UTC+3", leadCoordinator: "Marcus Thorne", status: "High Deployment" },
  { id: "amm", city: "Amman", country: "Jordan", region: "Middle East Logistics", personnelCount: 54, activePct: 96.8, timezone: "AST (Amman)", utcOffset: "UTC+3", leadCoordinator: "Fatima Al-Zahra", status: "High Deployment" },
  { id: "nyc", city: "New York", country: "USA", region: "UN & Compliance Office", personnelCount: 38, activePct: 97.1, timezone: "EDT (New York)", utcOffset: "UTC-4", leadCoordinator: "Elena Rostova", status: "Normal" },
  { id: "tyo", city: "Tokyo", country: "Japan", region: "Asia-Pacific Health Hub", personnelCount: 36, activePct: 98.0, timezone: "JST (Tokyo)", utcOffset: "UTC+9", leadCoordinator: "Kenji Sato", status: "Full Capacity" },
];

// Interactive Action Item
interface ActionItem {
  id: string;
  title: string;
  category: "Compliance" | "Leave" | "Onboarding" | "Talent" | "Payroll";
  severity: "Critical" | "High" | "Medium";
  assignee: string;
  dueDate: string;
  actionText: string;
  resolved: boolean;
}

const INITIAL_ACTIONS: ActionItem[] = [
  {
    id: "act-1",
    title: "4 Field Personnel Visas & Medical Clearances Expiring in 14 Days",
    category: "Compliance",
    severity: "Critical",
    assignee: "Marcus Thorne",
    dueDate: "Oct 12, 2026",
    actionText: "Initiate Renewal",
    resolved: false,
  },
  {
    id: "act-2",
    title: "3 Leave Requests Awaiting Senior HR Director Sign-off",
    category: "Leave",
    severity: "High",
    assignee: "Dr. Sarah Lin",
    dueDate: "Today (17:00)",
    actionText: "Review & Sign",
    resolved: false,
  },
  {
    id: "act-3",
    title: "2 New Joiner Provisioning Checklists Overdue (Laptops & SSO)",
    category: "Onboarding",
    severity: "High",
    assignee: "Liam O'Connor",
    dueDate: "Today",
    actionText: "Verify Provisioning",
    resolved: false,
  },
  {
    id: "act-4",
    title: "5 Candidate Evaluation Scorecards Pending Post-Panel Debrief",
    category: "Talent",
    severity: "Medium",
    assignee: "Amina Al-Mansoor",
    dueDate: "Tomorrow",
    actionText: "Complete Debrief",
    resolved: false,
  },
  {
    id: "act-5",
    title: "Q3 Payroll Pre-Execution Reconciliation Audit Verification",
    category: "Payroll",
    severity: "Critical",
    assignee: "Elena Rostova",
    dueDate: "Oct 02, 2026",
    actionText: "Run Audit",
    resolved: false,
  },
];

export default function WorkspaceDashboard() {
  const { currentRole } = useWorkspace();

  // --------------------------------------------------------------------------
  // LUXURY INTERACTIVE CONTROLS STATE
  // --------------------------------------------------------------------------
  const [zenMode, setZenMode] = useState<boolean>(false);
  const [timeframe, setTimeframe] = useState<"12M" | "6M" | "Q3">("12M");
  const [chartMetric, setChartMetric] = useState<"headcount" | "velocity" | "retention">("headcount");
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);
  const [showForecast, setShowForecast] = useState<boolean>(true);
  const [showTargetLine, setShowTargetLine] = useState<boolean>(true);
  
  // Interactive Stage & Department Drilldowns
  const [selectedStageId, setSelectedStageId] = useState<string>("interview");
  const [selectedDeptId, setSelectedDeptId] = useState<string | null>(null);
  const [deptViewMode, setDeptViewMode] = useState<"headcount" | "payroll">("headcount");
  const [selectedStationId, setSelectedStationId] = useState<string>("gva");
  const [presenceFilter, setPresenceFilter] = useState<"all" | "onsite" | "remote" | "leave">("all");

  // Action Center with Undo & Audit Trail
  const [actions, setActions] = useState<ActionItem[]>(INITIAL_ACTIONS);
  const [lastResolvedAction, setLastResolvedAction] = useState<ActionItem | null>(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  // Candidate Advancement State
  const [activeCandidatesData, setActiveCandidatesData] = useState<FunnelStage[]>(ATS_STAGES_DATA);
  const [advancingCandidateMsg, setAdvancingCandidateMsg] = useState<string | null>(null);

  // Filter dataset by timeframe
  const filteredWorkforce = useMemo(() => {
    if (timeframe === "Q3") return HISTORICAL_WORKFORCE.slice(9);
    if (timeframe === "6M") return HISTORICAL_WORKFORCE.slice(6);
    return HISTORICAL_WORKFORCE;
  }, [timeframe]);

  // Selected or hovered point
  const activeRecord = useMemo(() => {
    if (hoveredPointIndex !== null && hoveredPointIndex < filteredWorkforce.length) {
      return filteredWorkforce[hoveredPointIndex];
    }
    return filteredWorkforce[filteredWorkforce.length - 1];
  }, [hoveredPointIndex, filteredWorkforce]);

  // Active ATS Stage Data
  const currentStage = useMemo(() => {
    return activeCandidatesData.find((s) => s.id === selectedStageId) || activeCandidatesData[2];
  }, [selectedStageId, activeCandidatesData]);

  // Active Duty Station Data
  const activeStation = useMemo(() => {
    return DUTY_STATIONS.find((s) => s.id === selectedStationId) || DUTY_STATIONS[0];
  }, [selectedStationId]);

  // Handle Action Item Resolution with Undo support
  const handleResolveAction = (id: string, text: string) => {
    const itemToResolve = actions.find((a) => a.id === id);
    if (!itemToResolve) return;

    setLastResolvedAction(itemToResolve);
    setActions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, resolved: true } : item))
    );
    setActionSuccessMsg(`Completed: "${text}". Audit entry logged.`);

    setTimeout(() => {
      setActionSuccessMsg(null);
    }, 4500);
  };

  const handleUndoAction = () => {
    if (!lastResolvedAction) return;
    setActions((prev) =>
      prev.map((item) => (item.id === lastResolvedAction.id ? { ...item, resolved: false } : item))
    );
    setActionSuccessMsg(`Reverted action: "${lastResolvedAction.title}".`);
    setLastResolvedAction(null);
    setTimeout(() => setActionSuccessMsg(null), 3000);
  };

  // Handle Candidate Stage Advancement
  const handleAdvanceCandidate = (candidate: CandidateDetail, currentStageId: string) => {
    const stageOrder = ["applied", "screening", "interview", "offer", "hired"];
    const currentIdx = stageOrder.indexOf(currentStageId);
    if (currentIdx === -1 || currentIdx >= stageOrder.length - 1) return;
    const nextStageId = stageOrder[currentIdx + 1];

    setActiveCandidatesData((prev) =>
      prev.map((stage) => {
        if (stage.id === currentStageId) {
          return {
            ...stage,
            candidatesCount: stage.candidatesCount - 1,
            candidates: stage.candidates.filter((c) => c.id !== candidate.id),
          };
        }
        if (stage.id === nextStageId) {
          return {
            ...stage,
            candidatesCount: stage.candidatesCount + 1,
            candidates: [candidate, ...stage.candidates],
          };
        }
        return stage;
      })
    );

    setAdvancingCandidateMsg(`Advanced ${candidate.name} to ${nextStageId.toUpperCase()} stage.`);
    setTimeout(() => setAdvancingCandidateMsg(null), 3500);
  };

  // --------------------------------------------------------------------------
  // SVG RESPONSIVE CHART COORDINATES
  // --------------------------------------------------------------------------
  const svgWidth = 740;
  const svgHeight = 230;
  const padding = { top: 30, right: 35, bottom: 40, left: 45 };
  const innerWidth = svgWidth - padding.left - padding.right;
  const innerHeight = svgHeight - padding.top - padding.bottom;

  const { getY, points } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;

    filteredWorkforce.forEach((d) => {
      let v = d.headcount;
      if (chartMetric === "velocity") v = d.net;
      if (chartMetric === "retention") v = d.retentionRate;
      if (v < min) min = v;
      if (v > max) max = v;
    });

    if (chartMetric === "headcount") {
      min = Math.floor(min / 10) * 10 - 5;
      max = Math.ceil(max / 10) * 10 + 5;
    } else if (chartMetric === "velocity") {
      min = 0;
      max = 8;
    } else {
      min = 97.5;
      max = 100;
    }

    const calcY = (val: number) => {
      const pct = (val - min) / (max - min);
      return padding.top + innerHeight - pct * innerHeight;
    };

    const pts = filteredWorkforce.map((d, i) => {
      const x = padding.left + (i / (filteredWorkforce.length - 1)) * innerWidth;
      let val = d.headcount;
      if (chartMetric === "velocity") val = d.net;
      if (chartMetric === "retention") val = d.retentionRate;
      const y = calcY(val);
      return { x, y, val, d, i };
    });

    return { getY: calcY, points: pts };
  }, [filteredWorkforce, chartMetric, innerWidth, innerHeight, padding.left, padding.top]);

  const linePath = useMemo(() => {
    if (points.length === 0) return "";
    return points.reduce((acc, pt, i) => {
      if (i === 0) return `M ${pt.x} ${pt.y}`;
      const prev = points[i - 1];
      const cpX1 = prev.x + (pt.x - prev.x) / 2;
      const cpY1 = prev.y;
      const cpX2 = prev.x + (pt.x - prev.x) / 2;
      const cpY2 = pt.y;
      return `${acc} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${pt.x} ${pt.y}`;
    }, "");
  }, [points]);

  const areaPath = useMemo(() => {
    if (points.length === 0) return "";
    const bottomY = padding.top + innerHeight;
    const firstX = points[0].x;
    const lastX = points[points.length - 1].x;
    return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }, [linePath, points, padding.top, innerHeight]);

  return (
    <div className={`space-y-8 font-sans pb-20 transition-colors duration-500 ${zenMode ? "relative" : ""}`}>
      {/* Serene Ambient Atmosphere (when in Zen Calm Focus mode) */}
      {zenMode && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-indigo-500/[0.04] dark:bg-indigo-500/[0.08] blur-[140px] animate-pulse" />
          <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full bg-teal-500/[0.03] dark:bg-teal-500/[0.06] blur-[120px]" />
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* 1. TOP EXECUTIVE COMMAND HEADER WITH FLUID BUTTONS & ZEN FOCUS       */}
      {/* -------------------------------------------------------------------- */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-slate-200/80 dark:border-white/[0.06]">
        <div>
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-xs font-sans text-slate-700 dark:text-neutral-300 mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-semibold text-slate-900 dark:text-white">Hope Foundation</span>
            <span className="text-slate-300 dark:text-neutral-600">•</span>
            <span>Enterprise Global HR OS</span>
            <span className="text-slate-300 dark:text-neutral-600">•</span>
            <span className="text-slate-500 dark:text-neutral-400">Viewing as {currentRole}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950 dark:text-[#f5f5f3]">
            Workforce Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 mt-1">
            Real-time human capital telemetry, recruitment velocity, and international operational compliance.
          </p>
        </div>

        {/* Global Operational Quick Controls & Luxury Date Range */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {/* Zen Calm Focus Mode Toggle */}
          <FluidButton
            variant={zenMode ? "primary" : "secondary"}
            size="sm"
            onClick={() => setZenMode(!zenMode)}
            icon={<Sparkles className="w-3.5 h-3.5" />}
          >
            <span>{zenMode ? "Calm Focus: On" : "Calm Focus Mode"}</span>
          </FluidButton>

          {/* Luxury Timeframe Segment Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-xs font-medium">
            {(["12M", "6M", "Q3"] as const).map((t) => {
              const active = timeframe === t;
              return (
                <button
                  key={t}
                  onClick={() => {
                    setTimeframe(t);
                    setHoveredPointIndex(null);
                  }}
                  className={`relative px-3 py-1.5 rounded-lg transition-colors cursor-pointer select-none ${
                    active
                      ? "text-slate-950 dark:text-white font-semibold"
                      : "text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="workspaceTimeframePill"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      className="absolute inset-0 bg-white dark:bg-white/[0.12] rounded-lg shadow-xs border border-slate-200/60 dark:border-white/10"
                    />
                  )}
                  <span className="relative z-10">{t}</span>
                </button>
              );
            })}
          </div>

          {/* Fluid + Add Employee Action */}
          <FluidButton
            href="/workspace/people/new"
            variant="primary"
            size="sm"
            icon={<UserPlus className="w-3.5 h-3.5" />}
          >
            <span>+ Add Employee</span>
          </FluidButton>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* 2. EXECUTIVE HR OVERVIEW: 6 COMPACT 3D CARDS (REAL DATA ONLY)        */}
      {/* -------------------------------------------------------------------- */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Metric 1: Total Workforce */}
        <ThreeDCard maxTilt={5} elevationZ={14} glareColor="#6366f1" glareOpacity={0.08} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0c0c0e] border border-slate-200/90 dark:border-white/[0.08] shadow-xs flex flex-col justify-between h-full group hover:border-indigo-500/40 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
              <span className="font-medium">Total Personnel</span>
              <Users className="w-3.5 h-3.5 text-indigo-500" />
            </div>
            <div className="my-2">
              <div className="text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-white tracking-tight tabular-nums">
                248
              </div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                <ArrowUpRight className="w-3 h-3" />
                <span>+13.7% YoY</span>
              </div>
            </div>
            <div className="text-[10px] text-slate-400 dark:text-neutral-500 flex items-center justify-between pt-1 border-t border-slate-100 dark:border-white/[0.04]">
              <span>214 FTE</span>
              <span>34 Contractors</span>
            </div>
          </div>
        </ThreeDCard>

        {/* Metric 2: Active Presence */}
        <ThreeDCard maxTilt={5} elevationZ={14} glareColor="#10b981" glareOpacity={0.08} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0c0c0e] border border-slate-200/90 dark:border-white/[0.08] shadow-xs flex flex-col justify-between h-full group hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
              <span className="font-medium">Active Today</span>
              <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className="my-2">
              <div className="text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-white tracking-tight tabular-nums">
                241
              </div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>97.2% presence</span>
              </div>
            </div>
            <div className="text-[10px] text-slate-400 dark:text-neutral-500 flex items-center justify-between pt-1 border-t border-slate-100 dark:border-white/[0.04]">
              <span>164 On-site</span>
              <span>77 Remote</span>
            </div>
          </div>
        </ThreeDCard>

        {/* Metric 3: On Leave Today */}
        <ThreeDCard maxTilt={5} elevationZ={14} glareColor="#f59e0b" glareOpacity={0.08} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0c0c0e] border border-slate-200/90 dark:border-white/[0.08] shadow-xs flex flex-col justify-between h-full group hover:border-amber-500/40 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
              <span className="font-medium">On Leave</span>
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <div className="my-2">
              <div className="text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-white tracking-tight tabular-nums">
                7
              </div>
              <div className="text-[11px] text-slate-500 dark:text-neutral-400 mt-0.5 font-medium">
                2.8% of workforce
              </div>
            </div>
            <div className="text-[10px] text-slate-400 dark:text-neutral-500 flex items-center justify-between pt-1 border-t border-slate-100 dark:border-white/[0.04]">
              <span>3 Sick</span>
              <span>4 Scheduled</span>
            </div>
          </div>
        </ThreeDCard>

        {/* Metric 4: New Hires (Q3) */}
        <ThreeDCard maxTilt={5} elevationZ={14} glareColor="#06b6d4" glareOpacity={0.08} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0c0c0e] border border-slate-200/90 dark:border-white/[0.08] shadow-xs flex flex-col justify-between h-full group hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
              <span className="font-medium">Q3 Net Additions</span>
              <TrendingUp className="w-3.5 h-3.5 text-cyan-500" />
            </div>
            <div className="my-2">
              <div className="text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-white tracking-tight tabular-nums">
                +14
              </div>
              <div className="flex items-center gap-1 text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold mt-0.5">
                <span>18 Hires • 4 Exits</span>
              </div>
            </div>
            <div className="text-[10px] text-slate-400 dark:text-neutral-500 flex items-center justify-between pt-1 border-t border-slate-100 dark:border-white/[0.04]">
              <span>100% onboarded</span>
              <span>4.2% attrition</span>
            </div>
          </div>
        </ThreeDCard>

        {/* Metric 5: Open Positions */}
        <ThreeDCard maxTilt={5} elevationZ={14} glareColor="#8b5cf6" glareOpacity={0.08} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0c0c0e] border border-slate-200/90 dark:border-white/[0.08] shadow-xs flex flex-col justify-between h-full group hover:border-purple-500/40 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
              <span className="font-medium">Open Positions</span>
              <Briefcase className="w-3.5 h-3.5 text-purple-500" />
            </div>
            <div className="my-2">
              <div className="text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-white tracking-tight tabular-nums">
                9
              </div>
              <div className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold mt-0.5">
                47 active candidates
              </div>
            </div>
            <div className="text-[10px] text-slate-400 dark:text-neutral-500 flex items-center justify-between pt-1 border-t border-slate-100 dark:border-white/[0.04]">
              <span>3 in Offer stage</span>
              <span>18d avg to fill</span>
            </div>
          </div>
        </ThreeDCard>

        {/* Metric 6: Pending Actions */}
        <ThreeDCard maxTilt={5} elevationZ={14} glareColor="#ef4444" glareOpacity={0.08} className="h-full">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0c0c0e] border border-slate-200/90 dark:border-white/[0.08] shadow-xs flex flex-col justify-between h-full group hover:border-red-500/40 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
              <span className="font-medium">Action Center</span>
              <AlertCircle className="w-3.5 h-3.5 text-red-500" />
            </div>
            <div className="my-2">
              <div className="text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-white tracking-tight tabular-nums">
                {actions.filter((a) => !a.resolved).length}
              </div>
              <div className="text-[11px] text-red-600 dark:text-red-400 font-semibold mt-0.5">
                Action required today
              </div>
            </div>
            <div className="text-[10px] text-slate-400 dark:text-neutral-500 flex items-center justify-between pt-1 border-t border-slate-100 dark:border-white/[0.04]">
              <span>2 Compliance</span>
              <span>1 Payroll</span>
            </div>
          </div>
        </ThreeDCard>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* 3. DYNAMIC INTERACTIVE WORKFORCE TRAJECTORY & ANALYTICS              */}
      {/* -------------------------------------------------------------------- */}
      <div className="relative z-10 p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#0c0c0e] border border-slate-200/90 dark:border-white/[0.08] shadow-xs space-y-6">
        {/* Chart Header with Interactive Toggles */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-slate-950 dark:text-white tracking-tight">
                Workforce Trajectory & Headcount Velocity
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-500/20">
                12-Month Audited Telemetry
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
              Net headcount progression reconciled against hires, departures, and retention ratios.
            </p>
          </div>

          {/* Interactive Metric View Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-xs font-medium">
              {[
                { key: "headcount", label: "Net Headcount" },
                { key: "velocity", label: "Monthly Net Addition" },
                { key: "retention", label: "Retention Rate (%)" },
              ].map((m) => {
                const isSelected = chartMetric === m.key;
                return (
                  <button
                    key={m.key}
                    onClick={() => setChartMetric(m.key as "headcount" | "velocity" | "retention")}
                    className={`relative px-3 py-1.5 rounded-lg transition-colors cursor-pointer select-none ${
                      isSelected
                        ? "text-slate-950 dark:text-white font-semibold"
                        : "text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeChartMetricPill"
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                        className="absolute inset-0 bg-white dark:bg-white/[0.12] rounded-lg shadow-xs border border-slate-200/60 dark:border-white/10"
                      />
                    )}
                    <span className="relative z-10">{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Luxury SquishSwitch Overlays */}
            <div className="hidden xl:flex items-center gap-4 pl-3 border-l border-slate-200 dark:border-white/[0.08]">
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-neutral-300">
                <span>Target Line</span>
                <SquishSwitch
                  checked={showTargetLine}
                  onChange={setShowTargetLine}
                  width={42}
                  height={22}
                  radius={11}
                  trackOnColor="#6366f1"
                />
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-neutral-300">
                <span>Forecast</span>
                <SquishSwitch
                  checked={showForecast}
                  onChange={setShowForecast}
                  width={42}
                  height={22}
                  radius={11}
                  trackOnColor="#10b981"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Active Scrubber Metric Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.04] text-xs">
          <div>
            <div className="text-[10px] uppercase font-semibold text-slate-400 dark:text-neutral-500">Selected Point</div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">
              {activeRecord.fullMonth}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-semibold text-slate-400 dark:text-neutral-500">Headcount At Period</div>
            <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5 tabular-nums">
              {activeRecord.headcount} personnel
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-semibold text-slate-400 dark:text-neutral-500">Movement Breakdown</div>
            <div className="text-sm font-medium text-slate-700 dark:text-neutral-300 mt-0.5 tabular-nums">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">+{activeRecord.hires} hires</span>
              {" • "}
              <span className="text-red-500 font-semibold">-{activeRecord.exits} exits</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-semibold text-slate-400 dark:text-neutral-500">Fastest Growth Sector</div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5 truncate">
              {activeRecord.topGrowthDept}
            </div>
          </div>
        </div>

        {/* Interactive Responsive SVG Graph with 3D Depth Pointer */}
        <div className="relative w-full overflow-hidden">
          <svg
            className="w-full h-56 sm:h-64 overflow-visible select-none"
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="headcountAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid Lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
              const y = padding.top + innerHeight * ratio;
              return (
                <line
                  key={ratio}
                  x1={padding.left}
                  y1={y}
                  x2={svgWidth - padding.right}
                  y2={y}
                  stroke="currentColor"
                  className="text-slate-200/80 dark:text-white/[0.06]"
                  strokeDasharray="4 4"
                />
              );
            })}

            {/* Target Line (Optional Luxury Overlay) */}
            {showTargetLine && (
              <g>
                <line
                  x1={padding.left}
                  y1={getY(chartMetric === "retention" ? 99.0 : chartMetric === "velocity" ? 3 : 240)}
                  x2={svgWidth - padding.right}
                  y2={getY(chartMetric === "retention" ? 99.0 : chartMetric === "velocity" ? 3 : 240)}
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  opacity={0.85}
                />
                <text
                  x={svgWidth - padding.right - 6}
                  y={getY(chartMetric === "retention" ? 99.0 : chartMetric === "velocity" ? 3 : 240) - 6}
                  textAnchor="end"
                  className="text-[9px] fill-amber-500 font-sans font-medium"
                >
                  Target Benchmark ({chartMetric === "retention" ? "99.0%" : chartMetric === "velocity" ? "+3/mo" : "240 FTE"})
                </text>
              </g>
            )}

            {/* Area Fill */}
            <motion.path
              d={areaPath}
              fill="url(#headcountAreaGrad)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            />

            {/* Main Smooth Spline Line */}
            <motion.path
              d={linePath}
              fill="none"
              stroke="#6366f1"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />

            {/* Forecast Projection Segment */}
            {showForecast && points.length > 0 && (
              <g>
                <line
                  x1={points[points.length - 1].x}
                  y1={points[points.length - 1].y}
                  x2={points[points.length - 1].x + 40}
                  y2={points[points.length - 1].y - 12}
                  stroke="#10b981"
                  strokeWidth="2.2"
                  strokeDasharray="4 3"
                />
                <circle
                  cx={points[points.length - 1].x + 40}
                  cy={points[points.length - 1].y - 12}
                  r="3.5"
                  fill="#10b981"
                />
                <text
                  x={points[points.length - 1].x + 46}
                  y={points[points.length - 1].y - 14}
                  className="text-[9px] fill-emerald-600 dark:fill-emerald-400 font-sans font-medium"
                >
                  Q4 Forecast (252)
                </text>
              </g>
            )}

            {/* Interactive Vertical Scrubber Line */}
            {hoveredPointIndex !== null && points[hoveredPointIndex] && (
              <g>
                <line
                  x1={points[hoveredPointIndex].x}
                  y1={padding.top}
                  x2={points[hoveredPointIndex].x}
                  y2={padding.top + innerHeight}
                  stroke="#6366f1"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
                <circle
                  cx={points[hoveredPointIndex].x}
                  cy={points[hoveredPointIndex].y}
                  r="7"
                  fill="#6366f1"
                  fillOpacity="0.25"
                />
                <circle
                  cx={points[hoveredPointIndex].x}
                  cy={points[hoveredPointIndex].y}
                  r="4.5"
                  fill="#ffffff"
                  stroke="#6366f1"
                  strokeWidth="2.5"
                />
              </g>
            )}

            {/* Interactive Data Point Touch Targets */}
            {points.map((pt, i) => (
              <g key={pt.d.id}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={hoveredPointIndex === i ? 4.5 : 3}
                  className={`${
                    hoveredPointIndex === i
                      ? "fill-white stroke-indigo-600 stroke-[2.5]"
                      : "fill-indigo-600 dark:fill-indigo-400"
                  } transition-all duration-150`}
                />
                <rect
                  x={pt.x - 20}
                  y={padding.top}
                  width={40}
                  height={innerHeight}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPointIndex(i)}
                  onClick={() => setHoveredPointIndex(i)}
                />
              </g>
            ))}
          </svg>

          {/* Month Axis Labels */}
          <div className="flex justify-between text-[11px] font-sans font-medium text-slate-400 dark:text-neutral-500 pt-1 px-4">
            {points.map((pt, i) => (
              <button
                key={pt.d.id}
                onClick={() => setHoveredPointIndex(i)}
                className={`transition-colors cursor-pointer ${
                  hoveredPointIndex === i
                    ? "text-indigo-600 dark:text-indigo-400 font-bold scale-105"
                    : "hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {pt.d.month}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* 4. 3D GLOBAL DUTY STATIONS & REGIONAL OPERATIONS MATRIX             */}
      {/* -------------------------------------------------------------------- */}
      <div className="relative z-10 p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#0c0c0e] border border-slate-200/90 dark:border-white/[0.08] shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-indigo-500" />
              <h2 className="text-base sm:text-lg font-semibold text-slate-950 dark:text-white tracking-tight">
                Global Operations Hubs & Duty Stations
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                5 Stations Active
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
              Hope Foundation personnel distribution across regional headquarters and emergency response stations.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-neutral-400">
            <Clock className="w-3.5 h-3.5" />
            <span>UTC Synchronized</span>
          </div>
        </div>

        {/* 5 Duty Station Cards with 3D Depth Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {DUTY_STATIONS.map((station) => {
            const isSelected = selectedStationId === station.id;
            return (
              <motion.div
                key={station.id}
                whileHover={{ y: -2, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedStationId(station.id)}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? "bg-indigo-50/70 dark:bg-indigo-950/20 border-indigo-400 dark:border-indigo-500 shadow-md shadow-indigo-500/10"
                    : "bg-slate-50/70 dark:bg-white/[0.02] border-slate-200/80 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/10"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <MapPin className={`w-3 h-3 ${isSelected ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"}`} />
                      {station.city}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-neutral-500 font-mono font-medium">
                      {station.utcOffset}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-neutral-400 mt-0.5 truncate">
                    {station.region}
                  </div>
                </div>

                <div className="pt-3 mt-2 border-t border-slate-200/60 dark:border-white/[0.04] flex items-center justify-between">
                  <div className="text-sm font-bold text-slate-900 dark:text-white tabular-nums">
                    {station.personnelCount}{" "}
                    <span className="text-[10px] font-normal text-slate-500 dark:text-neutral-400">staff</span>
                  </div>
                  <span
                    className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${
                      station.status === "High Deployment"
                        ? "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                        : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                    }`}
                  >
                    {station.activePct}% ready
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Duty Station Spotlight Drawer */}
        <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.05] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm shrink-0">
              {activeStation.city.slice(0, 3).toUpperCase()}
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <span>{activeStation.city}, {activeStation.country}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-neutral-300">
                  {activeStation.timezone}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-neutral-400 mt-0.5">
                Lead Field Director: <strong className="text-slate-800 dark:text-neutral-200">{activeStation.leadCoordinator}</strong> • Readiness Rate: {activeStation.activePct}%
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <FluidButton
              href="/workspace/attendance"
              variant="outline"
              size="xs"
              icon={<UserCheck className="w-3 h-3" />}
            >
              <span>View Roster</span>
            </FluidButton>
            <FluidButton
              href="/workspace/people"
              variant="primary"
              size="xs"
              icon={<Users className="w-3 h-3" />}
            >
              <span>Station Directory</span>
            </FluidButton>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* 5. ATTENTION / ACTION CENTER: HIGH-PRIORITY ACTIONABLE ROWS          */}
      {/* -------------------------------------------------------------------- */}
      <div className="relative z-10 p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#0c0c0e] border border-slate-200/90 dark:border-white/[0.08] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-slate-950 dark:text-white tracking-tight">
                Attention & Action Center
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                {actions.filter((a) => !a.resolved).length} Pending
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
              Time-sensitive HR operations, legal compliance, and pending workflow authorizations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/workspace/audits"
              className="text-xs font-sans font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>View Compliance Matrix</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Success Toast Banner with Undo */}
        <AnimatePresence>
          {actionSuccessMsg && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 font-medium flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{actionSuccessMsg}</span>
              </div>
              {lastResolvedAction && (
                <button
                  onClick={handleUndoAction}
                  className="px-2 py-1 rounded-md bg-emerald-600/15 hover:bg-emerald-600/25 text-emerald-900 dark:text-emerald-200 font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Undo2 className="w-3 h-3" />
                  <span>Undo</span>
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actionable Rows */}
        <div className="space-y-2.5">
          {actions.map((act) => {
            return (
              <motion.div
                key={act.id}
                layout
                className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  act.resolved
                    ? "bg-slate-50/60 dark:bg-white/[0.01] border-slate-200/50 dark:border-white/[0.03] opacity-60"
                    : act.severity === "Critical"
                    ? "bg-red-50/30 dark:bg-red-500/[0.03] border-red-200/60 dark:border-red-500/20 hover:border-red-400/60"
                    : "bg-slate-50 dark:bg-white/[0.02] border-slate-200/80 dark:border-white/[0.04] hover:border-slate-300 dark:hover:border-white/10"
                }`}
              >
                <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                      act.resolved
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
                        : act.severity === "Critical"
                        ? "bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20"
                        : "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    {act.resolved ? "Resolved" : act.severity}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div
                      className={`text-xs font-semibold truncate ${
                        act.resolved
                          ? "line-through text-slate-500 dark:text-neutral-500"
                          : "text-slate-900 dark:text-white"
                      }`}
                    >
                      {act.title}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-neutral-400 mt-0.5">
                      <span>Owner: {act.assignee}</span>
                      <span className="text-slate-300 dark:text-neutral-600">•</span>
                      <span>Category: {act.category}</span>
                      <span className="text-slate-300 dark:text-neutral-600">•</span>
                      <span className="font-medium text-slate-700 dark:text-neutral-300">{act.dueDate}</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2 self-end sm:self-center">
                  {!act.resolved ? (
                    <FluidButton
                      variant="primary"
                      size="xs"
                      onClick={() => handleResolveAction(act.id, act.title)}
                      icon={<Check className="w-3.5 h-3.5" />}
                    >
                      <span>{act.actionText}</span>
                    </FluidButton>
                  ) : (
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Completed</span>
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* 6. ATS RECRUITMENT PIPELINE WITH DYNAMIC CANDIDATE DRAWER            */}
      {/* -------------------------------------------------------------------- */}
      <div className="relative z-10 grid lg:grid-cols-12 gap-6">
        {/* Recruitment Pipeline Funnel (7 Cols) */}
        <div className="lg:col-span-7 p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#0c0c0e] border border-slate-200/90 dark:border-white/[0.08] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-slate-950 dark:text-white tracking-tight">
                    Recruitment Pipeline Funnel
                  </h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-200/50 dark:border-purple-500/20">
                    47 Candidates
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                  Click any stage to inspect and advance candidates directly.
                </p>
              </div>

              <FluidButton
                href="/workspace/recruitment"
                variant="outline"
                size="xs"
                iconRight={<ChevronRight className="w-3.5 h-3.5" />}
              >
                <span>ATS Kanban</span>
              </FluidButton>
            </div>

            {/* Funnel Stage Horizontal Progression */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 my-4">
              {activeCandidatesData.map((stg) => {
                const isSelected = selectedStageId === stg.id;
                return (
                  <motion.div
                    key={stg.id}
                    onClick={() => setSelectedStageId(stg.id)}
                    whileHover={{ scale: 1.02 }}
                    className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                      isSelected
                        ? "bg-indigo-50/70 dark:bg-indigo-600/15 border-indigo-400/80 shadow-xs"
                        : "bg-slate-50 dark:bg-white/[0.02] border-slate-200/80 dark:border-white/[0.05] hover:border-slate-300 dark:hover:border-white/10"
                    }`}
                  >
                    <div className="text-[10px] uppercase font-semibold text-slate-500 dark:text-neutral-400 truncate">
                      {stg.label}
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tabular-nums my-1">
                      {stg.candidatesCount}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-neutral-400 font-medium">
                      {stg.conversionRate}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Candidate Advancement Toast */}
            <AnimatePresence>
              {advancingCandidateMsg && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-3 p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-700 dark:text-indigo-300 font-medium flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{advancingCandidateMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* DYNAMIC CANDIDATE DRAWER FOR SELECTED STAGE */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
                <span className="font-semibold text-slate-900 dark:text-white">
                  Active Candidates in {currentStage.label} ({currentStage.candidates.length})
                </span>
                <span>Avg. {currentStage.avgDurationDays} days in stage</span>
              </div>

              {currentStage.candidates.length > 0 ? (
                <div className="space-y-2">
                  {currentStage.candidates.map((cand) => (
                    <motion.div
                      key={cand.id}
                      layout
                      className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={cand.avatar}
                          alt={cand.name}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-white/10 shrink-0"
                        />
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <span>{cand.name}</span>
                            <span className="flex items-center text-[10px] text-amber-500 font-bold">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              {cand.rating}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-neutral-400 mt-0.5">
                            {cand.role} • {cand.location} • Exp: {cand.experience}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {cand.skills.map((sk) => (
                              <span
                                key={sk}
                                className="px-1.5 py-0.2 rounded text-[9px] bg-slate-200/80 dark:bg-white/[0.06] text-slate-600 dark:text-neutral-300"
                              >
                                {sk}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        {currentStage.id !== "hired" && (
                          <FluidButton
                            variant="primary"
                            size="xs"
                            onClick={() => handleAdvanceCandidate(cand, currentStage.id)}
                            iconRight={<ChevronRight className="w-3 h-3" />}
                          >
                            <span>Advance Stage</span>
                          </FluidButton>
                        )}
                        <FluidButton
                          href="/workspace/recruitment"
                          variant="secondary"
                          size="xs"
                          icon={<Eye className="w-3 h-3" />}
                        >
                          <span>Review</span>
                        </FluidButton>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-dashed border-slate-200 dark:border-white/10 text-center text-xs text-slate-400 dark:text-neutral-500">
                  No candidates currently queued in this stage.
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 mt-3 border-t border-slate-100 dark:border-white/[0.04] flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
            <span>9 Open Requisitions</span>
            <Link href="/workspace/recruitment" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
              Manage Candidates &rarr;
            </Link>
          </div>
        </div>

        {/* Department Distribution (5 Cols) */}
        <div className="lg:col-span-5 p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#0c0c0e] border border-slate-200/90 dark:border-white/[0.08] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-slate-950 dark:text-white tracking-tight">
                  Department Distribution
                </h3>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                  Click any department to inspect team health & open roles.
                </p>
              </div>

              {/* View Toggle */}
              <div className="flex items-center p-0.5 rounded-lg bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-[11px]">
                <button
                  onClick={() => setDeptViewMode("headcount")}
                  className={`px-2 py-1 rounded-md transition-colors ${
                    deptViewMode === "headcount"
                      ? "bg-white dark:bg-white/10 text-slate-950 dark:text-white font-semibold shadow-xs"
                      : "text-slate-500 hover:text-slate-900 dark:text-neutral-400"
                  }`}
                >
                  Headcount
                </button>
                <button
                  onClick={() => setDeptViewMode("payroll")}
                  className={`px-2 py-1 rounded-md transition-colors ${
                    deptViewMode === "payroll"
                      ? "bg-white dark:bg-white/10 text-slate-950 dark:text-white font-semibold shadow-xs"
                      : "text-slate-500 hover:text-slate-900 dark:text-neutral-400"
                  }`}
                >
                  Payroll
                </button>
              </div>
            </div>

            {/* Department Horizontal Bars with Expandable Drilldown */}
            <div className="space-y-3 font-sans text-xs">
              {DEPARTMENTS.map((dept) => {
                const totalSpend = 2095000;
                const spendPct = ((dept.monthlySpend / totalSpend) * 100).toFixed(1);
                const displayVal =
                  deptViewMode === "headcount"
                    ? `${dept.headcount} FTE (${dept.pct}%)`
                    : `$${(dept.monthlySpend / 1000).toFixed(0)}k/mo (${spendPct}%)`;
                const barWidth = deptViewMode === "headcount" ? dept.pct : Number(spendPct);
                const isExpanded = selectedDeptId === dept.id;

                return (
                  <div
                    key={dept.id}
                    onClick={() => setSelectedDeptId(isExpanded ? null : dept.id)}
                    className="p-2 rounded-xl transition-colors cursor-pointer hover:bg-slate-50 dark:hover:bg-white/[0.02]"
                  >
                    <div className="flex items-center justify-between text-slate-700 dark:text-neutral-300">
                      <span className="font-medium truncate max-w-[200px] flex items-center gap-1.5">
                        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isExpanded ? "rotate-180 text-indigo-500" : ""}`} />
                        {dept.name}
                      </span>
                      <span className="font-semibold text-slate-950 dark:text-white tabular-nums">{displayVal}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden my-1">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: dept.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${barWidth}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </div>

                    {/* Expandable Department Drilldown */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-2 text-[11px] text-slate-500 dark:text-neutral-400 space-y-1.5 border-t border-slate-100 dark:border-white/[0.04] mt-2"
                        >
                          <div className="flex items-center justify-between">
                            <span>Lead: <strong className="text-slate-800 dark:text-neutral-200">{dept.lead}</strong></span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{dept.healthScore}% health score</span>
                          </div>
                          <div>Staffing: {dept.fteRatio}</div>
                          {dept.openRoles.length > 0 && (
                            <div className="flex items-center gap-1.5 pt-1">
                              <span className="font-semibold text-slate-700 dark:text-neutral-300">Hiring:</span>
                              <span className="truncate text-indigo-600 dark:text-indigo-400">{dept.openRoles.join(", ")}</span>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/[0.04] flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
            <span>Total Monthly Payroll: $2.095M</span>
            <Link href="/workspace/payroll" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
              Payroll Matrix &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* 7. TODAY'S ATTENDANCE, UPCOMING MILESTONES & LIVE OPERATIONS STREAM   */}
      {/* -------------------------------------------------------------------- */}
      <div className="relative z-10 grid lg:grid-cols-12 gap-6">
        {/* Attendance Breakdown (4 Cols) */}
        <div className="lg:col-span-4 p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#0c0c0e] border border-slate-200/90 dark:border-white/[0.08] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-sans uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
                  Today&apos;s Presence
                </span>
                <h3 className="font-sans text-base font-semibold text-slate-950 dark:text-white tracking-tight mt-0.5">
                  Attendance & Leave Status
                </h3>
              </div>
              <Link href="/workspace/attendance" className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                Live &rarr;
              </Link>
            </div>

            <div className="space-y-2.5 font-sans">
              <button
                type="button"
                onClick={() => setPresenceFilter(presenceFilter === "onsite" ? "all" : "onsite")}
                className={`w-full text-left flex items-center justify-between p-3 rounded-xl border text-xs transition-colors cursor-pointer ${
                  presenceFilter === "onsite"
                    ? "bg-emerald-500/20 border-emerald-500/40"
                    : "bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/15"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-emerald-900 dark:text-emerald-300 font-medium">On-Site Field Stations</span>
                </div>
                <span className="font-bold text-emerald-950 dark:text-emerald-200 tabular-nums">164 (66.1%)</span>
              </button>

              <button
                type="button"
                onClick={() => setPresenceFilter(presenceFilter === "remote" ? "all" : "remote")}
                className={`w-full text-left flex items-center justify-between p-3 rounded-xl border text-xs transition-colors cursor-pointer ${
                  presenceFilter === "remote"
                    ? "bg-blue-500/20 border-blue-500/40"
                    : "bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/15"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-blue-900 dark:text-blue-300 font-medium">Remote & Hybrid</span>
                </div>
                <span className="font-bold text-blue-950 dark:text-blue-200 tabular-nums">77 (31.0%)</span>
              </button>

              <button
                type="button"
                onClick={() => setPresenceFilter(presenceFilter === "leave" ? "all" : "leave")}
                className={`w-full text-left flex items-center justify-between p-3 rounded-xl border text-xs transition-colors cursor-pointer ${
                  presenceFilter === "leave"
                    ? "bg-amber-500/20 border-amber-500/40"
                    : "bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/15"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-amber-900 dark:text-amber-300 font-medium">On Approved Leave</span>
                </div>
                <span className="font-bold text-amber-950 dark:text-amber-200 tabular-nums">7 (2.8%)</span>
              </button>
            </div>

            {/* Who is on leave snippet */}
            <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.04] text-[11px] space-y-1">
              <div className="font-semibold text-slate-800 dark:text-neutral-200">On Leave Today:</div>
              <div className="text-slate-600 dark:text-neutral-400">
                • Elena Rostova (Annual Leave • Returns Monday)
              </div>
              <div className="text-slate-600 dark:text-neutral-400">
                • David Mwangi (Medical Field Rest • Returns Oct 4)
              </div>
            </div>
          </div>

          <FluidButton
            href="/workspace/leave"
            variant="secondary"
            size="sm"
            className="w-full mt-4"
            iconRight={<ChevronRight className="w-3.5 h-3.5" />}
          >
            <span>Open Leave Management</span>
          </FluidButton>
        </div>

        {/* Upcoming Milestones & Events (4 Cols) */}
        <div className="lg:col-span-4 p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#0c0c0e] border border-slate-200/90 dark:border-white/[0.08] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-sans uppercase tracking-wider text-pink-600 dark:text-pink-400 font-semibold">
                  Culture & Milestones
                </span>
                <h3 className="font-sans text-base font-semibold text-slate-950 dark:text-white tracking-tight mt-0.5">
                  Upcoming Events
                </h3>
              </div>
              <Calendar className="w-4 h-4 text-slate-400" />
            </div>

            <div className="space-y-3 font-sans text-xs">
              <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center gap-3">
                <span className="text-lg">🎂</span>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-slate-900 dark:text-white truncate">Elena Rostova&apos;s Birthday</div>
                  <div className="text-[11px] text-pink-700 dark:text-pink-300 font-medium">Tomorrow • Oct 1</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-3">
                <span className="text-lg">🎖️</span>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-slate-900 dark:text-white truncate">Marcus Thorne • 3-Year Service Milestone</div>
                  <div className="text-[11px] text-indigo-700 dark:text-indigo-300 font-medium">Thursday • Oct 3</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center gap-3">
                <span className="text-lg">🚀</span>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-slate-900 dark:text-white truncate">Dr. Tariq Vance • Onboarding Day 1</div>
                  <div className="text-[11px] text-cyan-700 dark:text-cyan-300 font-medium">Oct 5 • Field Medical</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center gap-3">
                <span className="text-lg">🌐</span>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-slate-900 dark:text-white truncate">Hope Foundation Global Q4 Town Hall</div>
                  <div className="text-[11px] text-purple-700 dark:text-purple-300 font-medium">Oct 6 • 14:00 UTC</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 dark:border-white/[0.04] text-[11px] text-slate-500 dark:text-neutral-400 text-center">
            Synchronized with Hope Foundation Google Workspace Calendar
          </div>
        </div>

        {/* Live HR Operations Activity Stream (4 Cols) */}
        <div className="lg:col-span-4 p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#0c0c0e] border border-slate-200/90 dark:border-white/[0.08] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-sans uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
                  Audit Telemetry
                </span>
                <h3 className="font-sans text-base font-semibold text-slate-950 dark:text-white tracking-tight mt-0.5">
                  Live Operations Stream
                </h3>
              </div>
              <Link href="/workspace/activity" className="text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white">
                Full Log &rarr;
              </Link>
            </div>

            <div className="space-y-3 font-sans text-xs">
              {[
                {
                  actor: "Elena Rostova",
                  role: "Auditor",
                  action: "reconciled and verified",
                  target: "Q3 Field Staff Expense Batch ($48,200)",
                  time: "12m ago",
                  avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80",
                },
                {
                  actor: "Marcus Thorne",
                  role: "Admin",
                  action: "provisioned IT security tokens for",
                  target: "2 incoming medical coordinators",
                  time: "42m ago",
                  avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&auto=format&fit=crop&q=80",
                },
                {
                  actor: "Amina Al-Mansoor",
                  role: "People Ops",
                  action: "advanced candidate Devon Chen to",
                  target: "Staff Systems Designer Offer",
                  time: "2h ago",
                  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80",
                },
                {
                  actor: "Dr. Sarah Lin",
                  role: "Owner",
                  action: "signed off on",
                  target: "2026 Global EOR Compliance Policy",
                  time: "4h ago",
                  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
                },
              ].map((ev, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 pb-2.5 border-b border-slate-100 dark:border-white/[0.04] last:border-0 last:pb-0"
                >
                  <img
                    src={ev.avatar}
                    alt={ev.actor}
                    className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 border border-slate-200 dark:border-white/10"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-slate-900 dark:text-white font-medium text-xs leading-snug">
                      <span className="font-semibold">{ev.actor.split(" ")[0]}</span>{" "}
                      <span className="text-slate-500 dark:text-neutral-400 font-normal">{ev.action}</span>{" "}
                      <span className="font-medium text-slate-800 dark:text-neutral-200">{ev.target}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-neutral-500 mt-0.5">{ev.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <FluidButton
            href="/workspace/activity"
            variant="secondary"
            size="sm"
            className="w-full mt-4"
            iconRight={<ChevronRight className="w-3.5 h-3.5" />}
          >
            <span>View Full Audit Trail</span>
          </FluidButton>
        </div>
      </div>
    </div>
  );
}
