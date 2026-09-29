"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspace } from "@/context/WorkspaceContext";
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
  DollarSign,
  ArrowRight,
  Building2,
  ShieldCheck,
  CreditCard,
  Layers,
  Activity,
  FileText
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
  retentionRate: number;
  payrollMonthly: number;
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
    openRoles: ["Senior Field Logistician", "Emergency Response Lead"],
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
    fteRatio: "38 FTE / 6 Contractors",
    healthScore: 96,
  },
  {
    id: "dept_fin",
    name: "Finance, Risk & Grants",
    headcount: 38,
    pct: 15.3,
    monthlySpend: 342000,
    lead: "Elena Rostova",
    leadRole: "Chief Financial Officer",
    openRoles: ["International Grant Controller"],
    fteRatio: "35 FTE / 3 Contractors",
    healthScore: 100,
  },
  {
    id: "dept_hr",
    name: "People & Global Mobility",
    headcount: 24,
    pct: 9.7,
    monthlySpend: 192000,
    lead: "Amina Al-Mansoor",
    leadRole: "Chief People Officer",
    openRoles: ["Global Mobility & Tax Lead", "Staff Care Psychologist"],
    fteRatio: "23 FTE / 1 Contractor",
    healthScore: 98,
  },
  {
    id: "dept_exec",
    name: "Executive & Governance",
    headcount: 12,
    pct: 4.8,
    monthlySpend: 99000,
    lead: "Julian Vance",
    leadRole: "Chief Executive Officer",
    openRoles: ["Board Governance Liaison"],
    fteRatio: "12 FTE / 0 Contractors",
    healthScore: 100,
  },
];

// Duty Stations (exact sum = 248)
interface DutyStation {
  id: string;
  city: string;
  country: string;
  region: string;
  personnelCount: number;
  leadCoordinator: string;
  activePct: number;
  timezone: string;
  utcOffset: string;
  status: "Normal" | "High Deployment" | "Monitoring";
}

const DUTY_STATIONS: DutyStation[] = [
  {
    id: "gva",
    city: "Geneva",
    country: "Switzerland",
    region: "Global HQ & Strategic Direction",
    personnelCount: 86,
    leadCoordinator: "Julian Vance",
    activePct: 98.8,
    timezone: "Europe/Zurich",
    utcOffset: "UTC+2",
    status: "Normal",
  },
  {
    id: "cxb",
    city: "Cox's Bazar",
    country: "Bangladesh",
    region: "Displaced Persons Field Hub",
    personnelCount: 64,
    leadCoordinator: "Rashid Ahmed",
    activePct: 96.9,
    timezone: "Asia/Dhaka",
    utcOffset: "UTC+6",
    status: "Normal",
  },
  {
    id: "kbl",
    city: "Kabul",
    country: "Afghanistan",
    region: "Healthcare & Water Infrastructure Hub",
    personnelCount: 54,
    leadCoordinator: "Zahra Hashimi",
    activePct: 94.4,
    timezone: "Asia/Kabul",
    utcOffset: "UTC+4:30",
    status: "Monitoring",
  },
  {
    id: "kyv",
    city: "Kyiv",
    country: "Ukraine",
    region: "Emergency Response & Logistics Unit",
    personnelCount: 44,
    leadCoordinator: "Oksana Petrenko",
    activePct: 97.7,
    timezone: "Europe/Kyiv",
    utcOffset: "UTC+3",
    status: "High Deployment",
  },
];

// ATS Stages Data
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
  candidates: CandidateDetail[];
}

const ATS_STAGES_DATA: FunnelStage[] = [
  {
    id: "applied",
    label: "Applied",
    candidatesCount: 23,
    conversionRate: "60.9% pass",
    avgDurationDays: 4.2,
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
        skills: ["Kubernetes", "PostgreSQL HA", "Zero-Trust"],
      },
    ],
  },
  {
    id: "offer",
    label: "Offer Extended",
    candidatesCount: 3,
    conversionRate: "66.7% accept",
    avgDurationDays: 3.1,
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
        name: "Nadia Benali",
        role: "Senior Humanitarian Grants Controller",
        rating: 4.8,
        experience: "9 yrs",
        expectedSalary: "$142,000",
        location: "Tunis Hub",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80",
        skills: ["USAID Compliance", "ECHO Audits", "Multi-Currency"],
      },
    ],
  },
  {
    id: "hired",
    label: "Hired (Q3)",
    candidatesCount: 18,
    conversionRate: "100% onboarded",
    avgDurationDays: 14.2,
    candidates: [
      {
        id: "c_hir_1",
        name: "Liam O'Connor",
        role: "VP of Enterprise Infrastructure",
        rating: 4.9,
        experience: "11 yrs",
        expectedSalary: "$175,000",
        location: "London / Remote",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&auto=format&fit=crop&q=80",
        skills: ["Data Architecture", "Enterprise Security", "Team Leadership"],
      },
    ],
  },
];

// Operational Action Items
interface ActionItem {
  id: string;
  title: string;
  category: "Compliance" | "Payroll" | "Talent" | "Operations";
  severity: "Critical" | "Medium" | "Low";
  assignee: string;
  dueDate: string;
  actionText: string;
  resolved: boolean;
}

const INITIAL_ACTIONS: ActionItem[] = [
  {
    id: "act-1",
    title: "Dual-Authorization Signoff for Cox's Bazar Medical Supply Transfer ($42,500)",
    category: "Compliance",
    severity: "Critical",
    assignee: "Elena Rostova",
    dueDate: "Today, 17:00 UTC",
    actionText: "Review & Authorize",
    resolved: false,
  },
  {
    id: "act-2",
    title: "Kabul Field Station Hazardous Duty Allowance Q4 Recalibration",
    category: "Payroll",
    severity: "Critical",
    assignee: "Amina Al-Mansoor",
    dueDate: "Tomorrow",
    actionText: "Approve Rates",
    resolved: false,
  },
  {
    id: "act-3",
    title: "14 Expiring UN Diplomatic Visa Credentials in Kyiv Mission",
    category: "Operations",
    severity: "Medium",
    assignee: "Oksana Petrenko",
    dueDate: "In 3 days",
    actionText: "Initiate Renewal",
    resolved: false,
  },
  {
    id: "act-4",
    title: "Candidate Scorecard Review for Senior Medical Director",
    category: "Talent",
    severity: "Medium",
    assignee: "Julian Vance",
    dueDate: "In 4 days",
    actionText: "Complete Debrief",
    resolved: false,
  },
  {
    id: "act-5",
    title: "Q3 Statutory Payroll Withholding Reconciliation Audit",
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

  // Control State
  const [timeframe, setTimeframe] = useState<"12M" | "6M" | "Q3">("12M");
  const [chartMetric, setChartMetric] = useState<"headcount" | "velocity" | "retention">("headcount");
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  // ATS Stage & Department State
  const [selectedStageId, setSelectedStageId] = useState<string>("interview");
  const [selectedDeptId, setSelectedDeptId] = useState<string | null>(null);
  const [deptViewMode, setDeptViewMode] = useState<"headcount" | "payroll">("headcount");
  const [selectedStationId, setSelectedStationId] = useState<string>("gva");

  // Actions & Audit
  const [actions, setActions] = useState<ActionItem[]>(INITIAL_ACTIONS);
  const [lastResolvedAction, setLastResolvedAction] = useState<ActionItem | null>(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  // Candidates Data
  const [activeCandidatesData, setActiveCandidatesData] = useState<FunnelStage[]>(ATS_STAGES_DATA);
  const [advancingCandidateMsg, setAdvancingCandidateMsg] = useState<string | null>(null);

  // Filter dataset by timeframe
  const filteredWorkforce = useMemo(() => {
    if (timeframe === "Q3") return HISTORICAL_WORKFORCE.slice(9);
    if (timeframe === "6M") return HISTORICAL_WORKFORCE.slice(6);
    return HISTORICAL_WORKFORCE;
  }, [timeframe]);

  // Selected point data
  const activeRecord = useMemo(() => {
    if (hoveredPointIndex !== null && hoveredPointIndex < filteredWorkforce.length) {
      return filteredWorkforce[hoveredPointIndex];
    }
    return filteredWorkforce[filteredWorkforce.length - 1];
  }, [hoveredPointIndex, filteredWorkforce]);

  // Active ATS Stage
  const currentStage = useMemo(() => {
    return activeCandidatesData.find((s) => s.id === selectedStageId) || activeCandidatesData[2];
  }, [selectedStageId, activeCandidatesData]);

  // Active Station
  const activeStation = useMemo(() => {
    return DUTY_STATIONS.find((s) => s.id === selectedStationId) || DUTY_STATIONS[0];
  }, [selectedStationId]);

  // Action item handlers
  const handleResolveAction = (id: string, text: string) => {
    const itemToResolve = actions.find((a) => a.id === id);
    if (!itemToResolve) return;

    setLastResolvedAction(itemToResolve);
    setActions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, resolved: true } : item))
    );
    setActionSuccessMsg(`Completed: "${text}". Audit entry registered.`);
    setTimeout(() => setActionSuccessMsg(null), 4000);
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

  // Candidate stage advancement
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
    setTimeout(() => setAdvancingCandidateMsg(null), 3000);
  };

  // --------------------------------------------------------------------------
  // SVG CHART CALCULATIONS
  // --------------------------------------------------------------------------
  const svgWidth = 840;
  const svgHeight = 220;
  const padding = { top: 25, right: 30, bottom: 35, left: 45 };
  const innerWidth = svgWidth - padding.left - padding.right;
  const innerHeight = svgHeight - padding.top - padding.bottom;

  const { points, yAxisLabels } = useMemo(() => {
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
      min = 210;
      max = 255;
    } else if (chartMetric === "velocity") {
      min = 0;
      max = 7;
    } else {
      min = 98.5;
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

    const labels = [
      { y: calcY(max), text: chartMetric === "retention" ? `${max}%` : `${max}` },
      { y: calcY((min + max) / 2), text: chartMetric === "retention" ? `${((min + max) / 2).toFixed(1)}%` : `${Math.round((min + max) / 2)}` },
      { y: calcY(min), text: chartMetric === "retention" ? `${min}%` : `${min}` },
    ];

    return { points: pts, yAxisLabels: labels };
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

  const pendingActionsCount = actions.filter((a) => !a.resolved).length;

  return (
    <div className="space-y-6 font-sans antialiased text-slate-900 dark:text-neutral-100">
      
      {/* -------------------------------------------------------------------- */}
      {/* 1. EXECUTIVE OPERATIONAL HEADER                                      */}
      {/* -------------------------------------------------------------------- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-white/[0.07]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-neutral-400 border border-slate-200/80 dark:border-white/[0.06]">
              Operational Intelligence
            </span>
            <span className="text-xs text-slate-400 dark:text-neutral-500 font-mono">
              Live Reconciled · Sep 2026
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Executive Workforce Operations
          </h1>
          <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
            Hope Foundation International · 248 active personnel across Geneva, Cox's Bazar, Kabul, and Kyiv.
          </p>
        </div>

        {/* Global Toolbar Controls */}
        <div className="flex items-center gap-2.5">
          {/* Timeframe Segment Selector */}
          <div className="flex items-center p-0.5 rounded-lg bg-slate-100 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/[0.07] text-xs">
            {(["12M", "6M", "Q3"] as const).map((t) => {
              const active = timeframe === t;
              return (
                <button
                  key={t}
                  onClick={() => {
                    setTimeframe(t);
                    setHoveredPointIndex(null);
                  }}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    active
                      ? "bg-white dark:bg-white/[0.12] text-slate-950 dark:text-white shadow-2xs font-semibold"
                      : "text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>

          {/* Direct Operational Actions */}
          <Link
            href="/workspace/people/new"
            className="h-8 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-medium inline-flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add Personnel</span>
          </Link>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* 2. EXECUTIVE METRIC RIBBON (THE NUMBERS ARE THE DESIGN)              */}
      {/* Single continuous operational ledger with hairline vertical dividers */}
      {/* -------------------------------------------------------------------- */}
      <div className="bg-white dark:bg-[#111215] border border-slate-200/90 dark:border-white/[0.07] rounded-xl overflow-hidden shadow-2xs">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 divide-y md:divide-y-0 divide-slate-100 dark:divide-white/[0.05] md:divide-x md:divide-slate-200/80 md:dark:divide-white/[0.07]">
          
          {/* 1. Total Personnel */}
          <div className="p-4 sm:p-5 flex flex-col justify-between">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              Total Personnel
            </div>
            <div className="my-1.5">
              <div className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-950 dark:text-white tabular-nums">
                248
              </div>
              <div className="text-[11px] font-mono text-slate-600 dark:text-neutral-400 flex items-center gap-1 mt-0.5">
                <span className="font-semibold text-slate-900 dark:text-white">+13.7%</span>
                <span>vs prev year</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 pt-2 border-t border-slate-100 dark:border-white/[0.04]">
              214 FTE · 34 Contractors
            </div>
          </div>

          {/* 2. Active Today */}
          <div className="p-4 sm:p-5 flex flex-col justify-between">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              Active Today
            </div>
            <div className="my-1.5">
              <div className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-950 dark:text-white tabular-nums">
                241
              </div>
              <div className="text-[11px] font-mono text-slate-600 dark:text-neutral-400 flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 dark:bg-neutral-400" />
                <span className="font-semibold text-slate-900 dark:text-white">97.2%</span>
                <span>presence rate</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 pt-2 border-t border-slate-100 dark:border-white/[0.04]">
              164 On-site · 77 Remote
            </div>
          </div>

          {/* 3. On Leave */}
          <div className="p-4 sm:p-5 flex flex-col justify-between">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              Scheduled Leave
            </div>
            <div className="my-1.5">
              <div className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-950 dark:text-white tabular-nums">
                7
              </div>
              <div className="text-[11px] font-mono text-slate-600 dark:text-neutral-400 mt-0.5">
                2.8% of total workforce
              </div>
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 pt-2 border-t border-slate-100 dark:border-white/[0.04]">
              3 Medical · 4 Mission Leave
            </div>
          </div>

          {/* 4. Monthly Disbursement */}
          <div className="p-4 sm:p-5 flex flex-col justify-between">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              Monthly Run Rate
            </div>
            <div className="my-1.5">
              <div className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-950 dark:text-white tabular-nums">
                $2.09M
              </div>
              <div className="text-[11px] font-mono text-slate-600 dark:text-neutral-400 mt-0.5">
                Reconciled Sep 2026
              </div>
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 pt-2 border-t border-slate-100 dark:border-white/[0.04]">
              USD, EUR, BDT, UAH
            </div>
          </div>

          {/* 5. Open Requisitions */}
          <div className="p-4 sm:p-5 flex flex-col justify-between">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              Open Positions
            </div>
            <div className="my-1.5">
              <div className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-950 dark:text-white tabular-nums">
                9
              </div>
              <div className="text-[11px] font-mono text-slate-600 dark:text-neutral-400 mt-0.5">
                47 active candidates
              </div>
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 pt-2 border-t border-slate-100 dark:border-white/[0.04]">
              18d avg time to fill
            </div>
          </div>

          {/* 6. Action Exceptions */}
          <div className="p-4 sm:p-5 flex flex-col justify-between">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              Pending Actions
            </div>
            <div className="my-1.5">
              <div className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-950 dark:text-white tabular-nums">
                {pendingActionsCount}
              </div>
              <div className="text-[11px] font-mono text-amber-600 dark:text-amber-400 mt-0.5 font-medium">
                Action required today
              </div>
            </div>
            <div className="text-[11px] text-slate-400 dark:text-neutral-500 pt-2 border-t border-slate-100 dark:border-white/[0.04]">
              2 Approvals · 1 Audit
            </div>
          </div>

        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* 3. DOMINANT ANALYTICAL VISUALIZATION (ANALYTICAL & DECISION GRADE)   */}
      {/* -------------------------------------------------------------------- */}
      <div className="bg-white dark:bg-[#111215] border border-slate-200/90 dark:border-white/[0.07] rounded-xl p-5 space-y-4 shadow-2xs">
        
        {/* Chart Header & Metric Selectors */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
              Workforce Trajectory & Headcount Velocity
            </h2>
            <p className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              Audited headcount expansion correlated with net hires, attrition, and statutory compensation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex p-0.5 rounded-lg bg-slate-100 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/[0.07] text-xs">
              {[
                { key: "headcount", label: "Net Headcount" },
                { key: "velocity", label: "Monthly Additions" },
                { key: "retention", label: "Retention %" },
              ].map((m) => {
                const isSelected = chartMetric === m.key;
                return (
                  <button
                    key={m.key}
                    onClick={() => setChartMetric(m.key as any)}
                    className={`px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-white dark:bg-white/[0.12] text-slate-950 dark:text-white font-medium shadow-2xs"
                        : "text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Hover Scrubber Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 px-3 py-2 rounded-lg bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/[0.04] text-xs font-mono">
          <div>
            <span className="text-[10px] uppercase text-slate-400 dark:text-neutral-500 block">Period</span>
            <span className="font-semibold text-slate-900 dark:text-white">{activeRecord.fullMonth}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase text-slate-400 dark:text-neutral-500 block">Active Headcount</span>
            <span className="font-semibold text-slate-900 dark:text-white tabular-nums">{activeRecord.headcount} FTE/Contractors</span>
          </div>
          <div>
            <span className="text-[10px] uppercase text-slate-400 dark:text-neutral-500 block">Net Flow</span>
            <span className="font-semibold text-slate-900 dark:text-white tabular-nums">+{activeRecord.hires} hires / -{activeRecord.exits} exits</span>
          </div>
          <div>
            <span className="text-[10px] uppercase text-slate-400 dark:text-neutral-500 block">Retention Rate</span>
            <span className="font-semibold text-slate-900 dark:text-white tabular-nums">{activeRecord.retentionRate}%</span>
          </div>
        </div>

        {/* Analytical Responsive SVG Line Chart */}
        <div className="relative w-full select-none pt-2">
          <svg
            className="w-full h-48 sm:h-56 overflow-visible"
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="restrainedAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Restrained Horizontal Gridlines */}
            {yAxisLabels.map((lbl, idx) => (
              <g key={idx}>
                <line
                  x1={padding.left}
                  y1={lbl.y}
                  x2={svgWidth - padding.right}
                  y2={lbl.y}
                  stroke="currentColor"
                  className="text-slate-200 dark:text-white/[0.06]"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <text
                  x={padding.left - 8}
                  y={lbl.y + 3}
                  textAnchor="end"
                  className="fill-slate-400 dark:fill-neutral-500 text-[10px] font-mono"
                >
                  {lbl.text}
                </text>
              </g>
            ))}

            {/* Shaded Area Fill */}
            <path d={areaPath} fill="url(#restrainedAreaGrad)" />

            {/* Primary Trend Line */}
            <path
              d={linePath}
              fill="none"
              stroke="#6366f1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Interactive Data Nodes */}
            {points.map((pt, i) => {
              const isHovered = hoveredPointIndex === i;
              return (
                <g key={pt.d.id} className="cursor-pointer" onClick={() => setHoveredPointIndex(i)}>
                  {/* Vertical Guide on Hover */}
                  {isHovered && (
                    <line
                      x1={pt.x}
                      y1={padding.top}
                      x2={pt.x}
                      y2={padding.top + innerHeight}
                      stroke="currentColor"
                      className="text-indigo-400/50 dark:text-indigo-400/40"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                  )}

                  {/* Invisible Hit Target */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={12}
                    fill="transparent"
                    onMouseEnter={() => setHoveredPointIndex(i)}
                  />

                  {/* Visible Data Dot */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isHovered ? 4.5 : 2.5}
                    fill="#ffffff"
                    stroke="#6366f1"
                    strokeWidth={isHovered ? 2.5 : 1.5}
                    className="transition-all"
                  />
                </g>
              );
            })}
          </svg>

          {/* Month Axis Labels */}
          <div className="flex justify-between text-[11px] font-mono text-slate-400 dark:text-neutral-500 pt-2 px-3">
            {points.map((pt, i) => (
              <button
                key={pt.d.id}
                onClick={() => setHoveredPointIndex(i)}
                className={`transition-colors cursor-pointer ${
                  hoveredPointIndex === i
                    ? "text-indigo-600 dark:text-indigo-400 font-bold"
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
      {/* 4. TWO-COLUMN OPERATIONAL CENTER: DEPARTMENTS & DUTY STATIONS        */}
      {/* -------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Department Allocation Table & Duty Stations (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Department Structure Table */}
          <div className="bg-white dark:bg-[#111215] border border-slate-200/90 dark:border-white/[0.07] rounded-xl overflow-hidden shadow-2xs">
            <div className="p-4 border-b border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
              <div>
                <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                  Departmental Allocation & Staffing
                </h3>
                <p className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
                  6 operational directorates with headcount, run rates, and active requisitions.
                </p>
              </div>
              <Link
                href="/workspace/people"
                className="text-xs font-medium text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Directory</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/70 dark:bg-white/[0.02] border-b border-slate-100 dark:border-white/[0.06] text-slate-400 dark:text-neutral-500 font-mono text-[10px] uppercase">
                  <tr>
                    <th className="py-2.5 px-4">Department</th>
                    <th className="py-2.5 px-3">Lead</th>
                    <th className="py-2.5 px-3 text-right">Headcount</th>
                    <th className="py-2.5 px-3 text-right">Run Rate</th>
                    <th className="py-2.5 px-4 text-right">Open Reqs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
                  {DEPARTMENTS.map((dept) => (
                    <tr
                      key={dept.id}
                      className="hover:bg-slate-50/60 dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                        <div className="truncate">{dept.name}</div>
                        <div className="text-[11px] text-slate-400 dark:text-neutral-500 font-normal">
                          {dept.fteRatio}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-slate-600 dark:text-neutral-300">
                        <div className="truncate">{dept.lead}</div>
                        <div className="text-[10px] text-slate-400 dark:text-neutral-500 truncate">{dept.leadRole}</div>
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-medium text-slate-900 dark:text-white tabular-nums">
                        {dept.headcount}{" "}
                        <span className="text-[10px] text-slate-400 font-normal">({dept.pct}%)</span>
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-slate-700 dark:text-neutral-300 tabular-nums">
                        ${(dept.monthlySpend / 1000).toFixed(0)}k/mo
                      </td>
                      <td className="py-3 px-4 text-right font-mono">
                        {dept.openRoles.length > 0 ? (
                          <span className="text-slate-900 dark:text-white font-semibold">
                            {dept.openRoles.length}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Field Duty Stations Matrix */}
          <div className="bg-white dark:bg-[#111215] border border-slate-200/90 dark:border-white/[0.07] rounded-xl p-4 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/[0.06]">
              <div>
                <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                  Field Stations & Duty Hubs
                </h3>
                <p className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
                  Synchronized personnel distribution across global operational missions.
                </p>
              </div>
              <Link
                href="/workspace/attendance"
                className="text-xs font-medium text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Attendance Grid</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {DUTY_STATIONS.map((station) => (
                <div
                  key={station.id}
                  className="p-3 rounded-lg border border-slate-200/70 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.015] flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {station.city}, {station.country}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-neutral-500">
                      {station.utcOffset}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-neutral-400 mt-1 truncate">
                    Lead: {station.leadCoordinator}
                  </div>
                  <div className="pt-2 mt-2 border-t border-slate-100 dark:border-white/[0.04] flex items-center justify-between text-xs">
                    <span className="font-mono font-medium text-slate-900 dark:text-white">
                      {station.personnelCount} staff
                    </span>
                    <span className="text-[10px] font-mono text-slate-600 dark:text-neutral-400">
                      {station.activePct}% ready
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Attention Center & Operational Timeline (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Action Center ("What do I need to act on?") */}
          <div className="bg-white dark:bg-[#111215] border border-slate-200/90 dark:border-white/[0.07] rounded-xl p-4 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/[0.06]">
              <div>
                <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                  Action Center
                </h3>
                <p className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
                  {pendingActionsCount} items requiring executive attention or signoff today.
                </p>
              </div>
            </div>

            {/* Toast Undo Notice */}
            <AnimatePresence>
              {actionSuccessMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="p-2.5 rounded-lg bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/[0.08] text-xs flex items-center justify-between gap-2"
                >
                  <span className="text-slate-800 dark:text-neutral-200">{actionSuccessMsg}</span>
                  {lastResolvedAction && (
                    <button
                      onClick={handleUndoAction}
                      className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <Undo2 className="w-3 h-3" />
                      Undo
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Items List */}
            <div className="space-y-2">
              {actions.map((act) => (
                <div
                  key={act.id}
                  className={`p-3 rounded-lg border transition-colors ${
                    act.resolved
                      ? "opacity-50 bg-slate-50 dark:bg-white/[0.01] border-slate-100 dark:border-white/[0.03]"
                      : "bg-slate-50/60 dark:bg-white/[0.02] border-slate-200/80 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/10"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-medium text-slate-900 dark:text-white leading-snug">
                      {act.title}
                    </span>
                    <span
                      className={`text-[9px] font-mono uppercase px-1.5 py-0.2 rounded shrink-0 ${
                        act.severity === "Critical"
                          ? "bg-red-500/10 text-red-700 dark:text-red-400 font-semibold"
                          : "bg-slate-100 dark:bg-white/[0.08] text-slate-600 dark:text-neutral-400"
                      }`}
                    >
                      {act.severity}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-slate-200/50 dark:border-white/[0.04] text-[11px] text-slate-400 dark:text-neutral-500">
                    <span>
                      {act.assignee} · Due {act.dueDate}
                    </span>
                    {!act.resolved ? (
                      <button
                        onClick={() => handleResolveAction(act.id, act.title)}
                        className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 cursor-pointer"
                      >
                        {act.actionText} →
                      </button>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1 font-mono">
                        <Check className="w-3 h-3" /> Resolved
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Operational Timeline Feed */}
          <div className="bg-white dark:bg-[#111215] border border-slate-200/90 dark:border-white/[0.07] rounded-xl p-4 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/[0.06]">
              <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                Recent Audit & Operational Log
              </h3>
              <Link
                href="/workspace/activity"
                className="text-xs font-medium text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Full Log</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5 pb-2 border-b border-slate-100 dark:border-white/[0.04]">
                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-white/[0.08] flex items-center justify-center font-medium text-[10px] text-slate-700 dark:text-neutral-300 shrink-0">
                  JV
                </div>
                <div className="min-w-0">
                  <div className="text-slate-800 dark:text-neutral-200">
                    <strong>Julian Vance</strong> signed off on Kabul Emergency Water dispatch.
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 dark:text-neutral-500 mt-0.5">
                    12 minutes ago · Geneva HQ
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pb-2 border-b border-slate-100 dark:border-white/[0.04]">
                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-white/[0.08] flex items-center justify-center font-medium text-[10px] text-slate-700 dark:text-neutral-300 shrink-0">
                  ER
                </div>
                <div className="min-w-0">
                  <div className="text-slate-800 dark:text-neutral-200">
                    <strong>Elena Rostova</strong> reconciled September multi-currency payroll batch.
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 dark:text-neutral-500 mt-0.5">
                    1 hour ago · Finance & Treasury
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-white/[0.08] flex items-center justify-center font-medium text-[10px] text-slate-700 dark:text-neutral-300 shrink-0">
                  OP
                </div>
                <div className="min-w-0">
                  <div className="text-slate-800 dark:text-neutral-200">
                    <strong>Oksana Petrenko</strong> verified 44/44 Kyiv Station personnel presence.
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 dark:text-neutral-500 mt-0.5">
                    2 hours ago · Kyiv Logistics Hub
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* -------------------------------------------------------------------- */}
      {/* 5. TALENT ACQUISITION FUNNEL LEDGER (ATS PIPELINE)                   */}
      {/* -------------------------------------------------------------------- */}
      <div className="bg-white dark:bg-[#111215] border border-slate-200/90 dark:border-white/[0.07] rounded-xl p-5 space-y-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
          <div>
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
              Talent Acquisition & Candidate Pipeline
            </h3>
            <p className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
              47 vetted candidates across 5 pipeline stages with stage-gate advancement.
            </p>
          </div>
          <Link
            href="/workspace/recruitment"
            className="text-xs font-medium text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>Open ATS Pipeline</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Funnel Stage Tab Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {activeCandidatesData.map((stage) => {
            const isSelected = selectedStageId === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStageId(stage.id)}
                className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-slate-100 dark:bg-white/[0.08] border-slate-300 dark:border-white/15"
                    : "bg-slate-50/60 dark:bg-white/[0.02] border-slate-200/70 dark:border-white/[0.05] hover:border-slate-300 dark:hover:border-white/10"
                }`}
              >
                <div className="text-[11px] font-mono text-slate-400 dark:text-neutral-500 uppercase">
                  {stage.label}
                </div>
                <div className="text-lg font-semibold text-slate-900 dark:text-white mt-1 tabular-nums">
                  {stage.candidatesCount}
                </div>
                <div className="text-[10px] text-slate-400 dark:text-neutral-500 mt-0.5">
                  {stage.conversionRate}
                </div>
              </button>
            );
          })}
        </div>

        {/* Candidates in Selected Stage */}
        <div className="pt-2">
          <div className="text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-2">
            Candidates currently in {currentStage.label} ({currentStage.candidates.length} active scorecards):
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentStage.candidates.map((cand) => (
              <div
                key={cand.id}
                className="p-3.5 rounded-lg border border-slate-200/80 dark:border-white/[0.06] bg-slate-50/40 dark:bg-white/[0.015] flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={cand.avatar}
                      alt={cand.name}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-white/10 shrink-0"
                    />
                    <div>
                      <div className="text-xs font-semibold text-slate-900 dark:text-white">
                        {cand.name}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-neutral-400">
                        {cand.role}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-medium text-slate-700 dark:text-neutral-300">
                    ★ {cand.rating}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 my-2.5">
                  {cand.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-white dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/[0.08] text-slate-600 dark:text-neutral-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="pt-2.5 border-t border-slate-200/50 dark:border-white/[0.04] flex items-center justify-between text-xs">
                  <span className="text-slate-400 dark:text-neutral-500 font-mono text-[11px]">
                    {cand.location} · {cand.expectedSalary}
                  </span>
                  <button
                    onClick={() => handleAdvanceCandidate(cand, currentStage.id)}
                    className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 cursor-pointer"
                  >
                    Advance Stage →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
