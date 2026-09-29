"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpatialMeshBackground from "@/components/ui/SpatialMeshBackground";
import ThreeDCard from "@/components/motion/ThreeDCard";
import GlareHover from "@/components/motion/GlareHover";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Briefcase,
  Clock,
  Calendar,
  CreditCard,
  Receipt,
  Target,
  FileText,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Play,
  X,
  Check,
  Building2,
  Layers,
  BarChart3,
  TrendingUp,
  Cpu,
  Lock,
  Globe2,
  PhoneCall,
  CalendarCheck,
  LayoutDashboard,
  Activity,
  Search,
  Filter,
  CheckCircle,
  ExternalLink,
  Shield,
  MapPin,
  AlertCircle,
  Terminal,
  Radio,
  RefreshCw,
  Award,
  ChevronUp,
  Sliders,
  DollarSign,
  PieChart
} from "lucide-react";

export default function PeopleCoreMarketingPage() {
  const [activePreviewTab, setActivePreviewTab] = useState<"dashboard" | "people" | "ats" | "attendance" | "payroll" | "workflows">("dashboard");
  const [billingCycle, setBillingCycle] = useState<"annual" | "monthly">("annual");
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  
  // Interactive Console Reactive State
  const [consoleTimeRange, setConsoleTimeRange] = useState<"realtime" | "7d" | "30d" | "q3">("realtime");
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [consolePeopleSearch, setConsolePeopleSearch] = useState("");
  const [consoleDeptFilter, setConsoleDeptFilter] = useState("all");
  const [selectedPersonnel, setSelectedPersonnel] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [candidateStageFilter, setCandidateStageFilter] = useState<string>("all");
  const [payrollViewMode, setPayrollViewMode] = useState<"ledger" | "stations" | "compliance" | "currencies">("ledger");
  const [payrollDisbursed, setPayrollDisbursed] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>("wf1");
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationSuccess, setSimulationSuccess] = useState(false);
  const [chartHoverIndex, setChartHoverIndex] = useState<number | null>(null);
  const [enabledWorkflows, setEnabledWorkflows] = useState<Record<string, boolean>>({
    wf1: true,
    wf2: true,
    wf3: true
  });

  // Section 4 Deep Architecture Explorer State
  const [activeArchitectureModule, setActiveArchitectureModule] = useState<"directory" | "payroll" | "ats" | "attendance" | "vault" | "automation">("directory");

  // Section 5 Interactive Workflow Simulator State
  const [workflowPreset, setWorkflowPreset] = useState<"crisis" | "visa" | "recert" | "grant">("crisis");

  // Section 6 Operational ROI & Capacity Calculator State
  const [roiHeadcount, setRoiHeadcount] = useState<number>(248);
  const [roiStations, setRoiStations] = useState<number>(6);

  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoFormSubmitted, setDemoFormSubmitted] = useState(false);
  const [demoFormData, setDemoFormData] = useState({
    name: "",
    email: "",
    company: "",
    teamSize: "25-100",
    message: ""
  });

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoFormSubmitted(true);
    setTimeout(() => {
      setIsDemoModalOpen(false);
      setDemoFormSubmitted(false);
      setDemoFormData({ name: "", email: "", company: "", teamSize: "25-100", message: "" });
    }, 2200);
  };

  const handleRunSimulation = () => {
    setSimulationRunning(true);
    setSimulationSuccess(false);
    setTimeout(() => {
      setSimulationRunning(false);
      setSimulationSuccess(true);
      setTimeout(() => setSimulationSuccess(false), 3500);
    }, 1200);
  };

  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      desc: "Ideal for early-stage startups and small agile teams up to 10 members.",
      popular: false,
      features: [
        "Up to 10 Active Employees",
        "Self-Service Employee Directory",
        "Basic Leave & PTO Requests",
        "Employee Document Storage",
        "Community & Standard Email Support"
      ],
      ctaText: "Start Free",
      ctaHref: "/auth?mode=signup&plan=free"
    },
    {
      name: "Professional",
      price: billingCycle === "annual" ? "$6" : "$8",
      period: "per employee / mo",
      desc: "For scaling companies needing structured time tracking, recruitment, and approvals.",
      popular: true,
      features: [
        "Up to 50 Active Employees",
        "Full Recruitment & ATS Kanban",
        "Biometric & Browser Attendance",
        "Multi-Tier Approval Chains",
        "Automated Timesheet Export",
        "10 Active Workflow Automations",
        "Priority 8h Business Support"
      ],
      ctaText: "Start 14-Day Trial",
      ctaHref: "/auth?mode=signup&plan=pro"
    },
    {
      name: "Business",
      price: billingCycle === "annual" ? "$11" : "$14",
      period: "per employee / mo",
      desc: "For mid-market enterprises demanding automated payroll, performance, and advanced analytics.",
      popular: false,
      features: [
        "Up to 250 Active Employees",
        "Automated Multi-State Payroll Engine",
        "NACHA Direct Deposit & Tax Filing",
        "360-Degree Performance & OKRs",
        "Receipt OCR Expense Processing",
        "Unlimited Custom Workflows",
        "Advanced Role-Based Permissions (RBAC)",
        "Dedicated Account Specialist"
      ],
      ctaText: "Deploy Business",
      ctaHref: "/auth?mode=signup&plan=business"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "tailored billing",
      desc: "For global enterprises requiring custom integrations, dedicated tenancy, and strict compliance.",
      popular: false,
      features: [
        "Unlimited Global Headcount",
        "Custom HRIS & ERP Integrations",
        "SAML SSO & SCIM Provisioning",
        "Dedicated Database / Data Residency",
        "99.99% Uptime Guarantee SLA",
        "Custom Payroll Rules & Union Policies",
        "24/7 Named Technical Lead"
      ],
      ctaText: "Contact Enterprise",
      ctaHref: "/contact"
    }
  ];

  const faqs = [
    {
      q: "Can PeopleCore replace our separate ATS, leave manager, and payroll tools?",
      a: "Yes. PeopleCore is architected as an all-in-one workforce OS. Your employee directory, job candidates, approved leave dates, expense claims, and hours logged flow natively into your payroll calculations without manual CSV export/import."
    },
    {
      q: "How does the payroll and tax engine handle multi-state or global regulations?",
      a: "PeopleCore includes built-in statutory compliance engines for federal, state, and local deductions. For international team members, it supports local currency payouts and EOR ledger mappings."
    },
    {
      q: "Can we connect PeopleCore to an external backend like Django/DRF or custom ERP?",
      a: "Absolutely. PeopleCore is constructed with an API-first headless data architecture. Every entity (Employees, Pay runs, Leave, OKRs) maps cleanly to standard REST/DRF serializers and GraphQL endpoints."
    },
    {
      q: "Is employee and financial data cryptographically secure?",
      a: "All sensitive records (social security numbers, bank routing info, compensation, passport scans) are encrypted using AES-256 at rest and TLS 1.3 in transit. We support SOC-2 Type II audit logging and role-based permissions."
    },
    {
      q: "How long does onboarding and migration take?",
      a: "Our one-click spreadsheet importer and BambooHR/Rippling migration wizards enable most teams to be fully operational within less than 24 hours."
    }
  ];

  // 1. DYNAMIC TIME RANGE DATA
  const timeRangeData = {
    realtime: {
      headcount: "248",
      headcountDelta: "+2 active shifts today",
      headcountSub: "182 Field Specialists · 66 HQ / Ops",
      readiness: "97.2%",
      readinessDelta: "241 on active duty",
      presenceSub: "7 on scheduled R&R leave",
      vacancies: "9",
      vacanciesDelta: "42 candidates in pipeline",
      vacanciesSub: "3 offers pending dispatch",
      disbursement: "$2.095M",
      disbursementDelta: "Cycle ends Oct 1",
      disbursementSub: "NACHA verified · 501(c)(3)",
      chartTitle: "Live Shift Load & Station Telemetry (24-Hour Active Feed)",
      chartSubtitle: "Real-time hourly deployment readiness across Kabul, Cox's Bazar, Juba, Gaziantep, Port-au-Prince, and Kyiv",
      curvePath: "M 50,140 C 120,135 120,125 195,125 C 270,125 270,95 345,95 C 420,95 420,56 500,56 C 580,56 580,56 650,56 C 720,56 720,110 800,110 C 870,110 870,56 940,56",
      areaPath: "M 50,140 C 120,135 120,125 195,125 C 270,125 270,95 345,95 C 420,95 420,56 500,56 C 580,56 580,56 650,56 C 720,56 720,110 800,110 C 870,110 870,56 940,56 L 940,190 L 50,190 Z",
      points: [
        { label: "00:00 UTC", val: 244, sub: "Night Shift Watch", rate: "96.4%", x: 50, y: 140 },
        { label: "04:00 UTC", val: 245, sub: "Asia Shift Handover", rate: "96.8%", x: 195, y: 125 },
        { label: "08:00 UTC", val: 247, sub: "Europe / Mideast Active", rate: "97.0%", x: 345, y: 95 },
        { label: "12:00 UTC", val: 248, sub: "Global Hubs In-Sync", rate: "97.2%", x: 500, y: 56 },
        { label: "16:00 UTC", val: 248, sub: "Americas Peak Operations", rate: "97.2%", x: 650, y: 56 },
        { label: "20:00 UTC", val: 246, sub: "Evening Watch Protocol", rate: "96.9%", x: 800, y: 110 },
        { label: "Now", val: 248, sub: "Live Telemetry Feed", rate: "97.2%", x: 940, y: 56 }
      ],
      events: [
        { time: "14:22 UTC", text: "Cox's Bazar WASH shift handover verified — 54 specialists logged on-post with biometric pass", type: "ops" },
        { time: "12:05 UTC", text: "Juba Emergency Health triage surge activated — 4 emergency pediatric beds deployed with WHO clearance", type: "alert" },
        { time: "09:30 UTC", text: "Kyiv Rapid Recovery power grid repair convoy dispatched under UN Laissez-Passer protection", type: "transit" }
      ]
    },
    "7d": {
      headcount: "246",
      headcountDelta: "+2 net specialists this week",
      headcountSub: "180 Field Specialists avg · 66 Ops",
      readiness: "96.8%",
      readinessDelta: "4 field shifts rotated",
      presenceSub: "0 safety incidents reported",
      vacancies: "11",
      vacanciesDelta: "28 interviews completed",
      vacanciesSub: "5 background checks in review",
      disbursement: "$488.4K",
      disbursementDelta: "Weekly accrued total",
      disbursementSub: "3 emergency hazard vouchers issued",
      chartTitle: "7-Day Rolling Specialist Readiness & Shift Roster",
      chartSubtitle: "Daily deployment presence from Monday to Sunday across all active operational zones",
      curvePath: "M 50,130 C 120,125 120,115 195,115 C 270,115 270,95 345,95 C 420,95 420,80 500,80 C 580,80 580,70 650,70 C 720,70 720,75 800,75 C 870,75 870,56 940,56",
      areaPath: "M 50,130 C 120,125 120,115 195,115 C 270,115 270,95 345,95 C 420,95 420,80 500,80 C 580,80 580,70 650,70 C 720,70 720,75 800,75 C 870,75 870,56 940,56 L 940,190 L 50,190 Z",
      points: [
        { label: "Mon Sep 22", val: 244, sub: "Shift Rotation Alpha", rate: "96.2%", x: 50, y: 130 },
        { label: "Tue Sep 23", val: 245, sub: "Water Filtration Onboarded", rate: "96.5%", x: 195, y: 115 },
        { label: "Wed Sep 24", val: 246, sub: "Trauma Surgical Reinforcement", rate: "96.8%", x: 345, y: 95 },
        { label: "Thu Sep 25", val: 246, sub: "Yellow Fever Vaccine Batch", rate: "97.0%", x: 500, y: 80 },
        { label: "Fri Sep 26", val: 247, sub: "Cross-Border Convoy Ingress", rate: "97.1%", x: 650, y: 70 },
        { label: "Sat Sep 27", val: 247, sub: "Weekend Emergency Standby", rate: "96.9%", x: 800, y: 75 },
        { label: "Sun Sep 28", val: 248, sub: "Full Mission Readiness", rate: "97.2%", x: 940, y: 56 }
      ],
      events: [
        { time: "Sep 27", text: "Rotational R&R approved for 4 logistics officers at Gaziantep Hub after 90-day deployment", type: "ops" },
        { time: "Sep 25", text: "WHO-certified yellow fever vaccine boosters administered to entire Juba clinic team", type: "alert" },
        { time: "Sep 23", text: "Desalination membrane specialist onboarded for Cox's Bazar potable water expansion", type: "transit" }
      ]
    },
    "30d": {
      headcount: "248",
      headcountDelta: "+7 net specialists deployed in Sep",
      headcountSub: "175 start of month → 182 field",
      readiness: "97.0%",
      readinessDelta: "30/30 days mission uptime",
      presenceSub: "Zero operational downtime",
      vacancies: "9",
      vacanciesDelta: "8 specialists placed",
      vacanciesSub: "Avg 14.1 days time-to-deploy",
      disbursement: "$2,095,000",
      disbursementDelta: "Monthly disbursement closed",
      disbursementSub: "100% NGO 501(c)(3) tax deductions clear",
      chartTitle: "30-Day Weekly Headcount Scaling & Deployment Expansion",
      chartSubtitle: "Four-week progression showing steady deployment of 7 mission specialists",
      curvePath: "M 50,154 C 180,150 180,120 345,120 C 500,120 500,80 650,80 C 800,80 800,56 940,56",
      areaPath: "M 50,154 C 180,150 180,120 345,120 C 500,120 500,80 650,80 C 800,80 800,56 940,56 L 940,190 L 50,190 Z",
      points: [
        { label: "Week 1 (Sep 1-7)", val: 241, sub: "Initial Month Base", rate: "96.4%", x: 50, y: 154 },
        { label: "Week 2 (Sep 8-14)", val: 243, sub: "+2 Specialists (Kyiv)", rate: "96.7%", x: 345, y: 120 },
        { label: "Week 3 (Sep 15-21)", val: 246, sub: "+3 Specialists (Juba/Gaziantep)", rate: "97.0%", x: 650, y: 80 },
        { label: "Week 4 (Sep 22-28)", val: 248, sub: "+2 Specialists (Cox's Bazar)", rate: "97.2%", x: 940, y: 56 }
      ],
      events: [
        { time: "Sep 21", text: "Q3 statutory audit documentation cryptographically archived to S3 tamper-evident vault", type: "ops" },
        { time: "Sep 14", text: "Port-au-Prince security perimeter renewed with UN peacekeeper diplomatic liaison", type: "alert" },
        { time: "Sep 07", text: "Mid-month mission operational stipends disbursed via Federal Reserve FedACH", type: "transit" }
      ]
    },
    q3: {
      headcount: "248",
      headcountDelta: "+14 net expansion in Q3",
      headcountSub: "234 end of Q2 → 248 end of Q3",
      readiness: "97.2%",
      readinessDelta: "Quarterly audit score: 100%",
      presenceSub: "Passed UNHCR & ICRC inspection",
      vacancies: "9",
      vacanciesDelta: "38 cumulative hires in Q3",
      vacanciesSub: "Avg 13.8 days time-to-deploy",
      disbursement: "$6.285M",
      disbursementDelta: "Total Q3 payroll disbursed",
      disbursementSub: "3 Cycles executed with 0 errors",
      chartTitle: "Q3 2026 Quarterly Milestone Review (July – September)",
      chartSubtitle: "Quarterly scaling milestones and multi-station capacity growth across 3 fiscal months",
      curvePath: "M 50,120 C 270,120 270,88 500,88 C 720,88 720,56 940,56",
      areaPath: "M 50,120 C 270,120 270,88 500,88 C 720,88 720,56 940,56 L 940,190 L 50,190 Z",
      points: [
        { label: "July 2026", val: 244, sub: "$2.090M Disbursed · 12 Hires", rate: "97.1%", x: 50, y: 120 },
        { label: "August 2026", val: 246, sub: "$2.100M Disbursed · 14 Hires", rate: "97.2%", x: 500, y: 88 },
        { label: "September 2026", val: 248, sub: "$2.095M Disbursed · 12 Hires", rate: "97.2%", x: 940, y: 56 }
      ],
      events: [
        { time: "Sep 28", text: "Full Q3 consolidated financial audit and foreign labor tax clearance certificate issued", type: "ops" },
        { time: "Aug 15", text: "Kabul trauma surgical clinic expanded with 6 additional emergency personnel", type: "alert" },
        { time: "Jul 31", text: "Mid-year humanitarian grant labor allocation approved by independent audit committee", type: "transit" }
      ]
    }
  };

  // 2. DETAILED DUTY STATIONS DOSSIER
  const dutyStations = [
    {
      name: "Kabul Mission Hub",
      personnel: 48,
      status: "Active Ops",
      readiness: "98%",
      focus: "Emergency Medical & Trauma",
      lead: "Dr. Zahir Rahimi, Field Medical Director",
      gps: "34.5553° N, 69.2075° E (Elevation 1,791m)",
      threat: "Level 2 Monitored · Armored Transit Protocol",
      facilities: "Field Clinic, 2 Mobile Surgical Vans, Satellite Ground Terminal",
      runway: "45 Days Trauma Supplies · 60 Days Generator Diesel",
      roster: "22 Emergency Doctors & Nurses, 14 Field Logistics, 8 Comms Engineers, 4 Admin"
    },
    {
      name: "Cox's Bazar Station",
      personnel: 54,
      status: "Active Field",
      readiness: "100%",
      focus: "WASH Potable Infrastructure",
      lead: "Marcus Chen, Principal Water Security Lead",
      gps: "21.4272° N, 92.0058° E (Camp Sector 4)",
      threat: "Level 1 Standard · Monsoon Weather Protocol",
      facilities: "3 Solar Desalination Units, 12 Deep Well Pumps, Water Testing Lab",
      runway: "120,000 Liters Daily Potable Capacity · 90 Days Filter Spare Parts",
      roster: "26 Water Engineers, 16 Sanitarians, 8 Community Health Officers, 4 Ops"
    },
    {
      name: "Juba Emergency Health",
      personnel: 38,
      status: "Surge Ready",
      readiness: "95%",
      focus: "Primary Care & Malnutrition",
      lead: "Dr. Amina Al-Mansoor, Chief Medical Officer",
      gps: "4.8594° N, 31.5713° E (Central Equatorial)",
      threat: "Level 3 Elevated · UN Compound Curfew 21:00",
      facilities: "60-Bed Inpatient Triage, Pediatric Nutrition Unit, Cold-Chain Vaccine Hub",
      runway: "3,000 Doses Yellow Fever / Cholera Vaccines · 40 Days Ready-to-Use Food",
      roster: "18 Pediatric Specialists, 10 Triage Nurses, 6 Logistics Drivers, 4 Security"
    },
    {
      name: "Gaziantep Logistics",
      personnel: 32,
      status: "Active Ops",
      readiness: "97%",
      focus: "Cross-Border Supply Chain",
      lead: "Tariq Vance, Director of Humanitarian Logistics",
      gps: "37.0662° N, 37.3833° E (Regional Depot)",
      threat: "Level 1 Standard · Border Customs Clearing Protocol",
      facilities: "4,500m² Climate-Controlled Warehouse, 8 Freight Trucks, Customs Office",
      runway: "180 Tons Medical Cargo Pre-Positioned · 30 Days Buffer Inventory",
      roster: "14 Freight Coordinators, 10 Customs Handlers, 5 Fleet Mechanics, 3 HQ"
    },
    {
      name: "Port-au-Prince Relief",
      personnel: 42,
      status: "Crisis Alert",
      readiness: "94%",
      focus: "Food Security & Logistics",
      lead: "Sophie Moreau, Crisis Support Coordinator",
      gps: "18.5944° N, 72.3074° W (Ouest Department)",
      threat: "Level 4 High Alert · Armed Convoy Escort Required",
      facilities: "Fortified Distribution Compound, Radio Dispatch Tower, Emergency Helipad",
      runway: "28 Days Grain & Clean Water Rations · Dual Generator Redundancy",
      roster: "18 Distribution Specialists, 12 Security Drivers, 8 Field Medics, 4 Comms"
    },
    {
      name: "Kyiv Rapid Recovery",
      personnel: 34,
      status: "Active Ops",
      readiness: "98%",
      focus: "Winterization & Energy Grid",
      lead: "Elena Rostova, Field Operations Coordinator",
      gps: "50.4501° N, 30.5234° E (Central Hub)",
      threat: "Level 2 Monitored · Air Siren Evacuation Protocol",
      facilities: "Mobile Generator Repair Workshop, Insulated Shelter Logistics Base",
      runway: "85 Heavy Industrial Generators · 450 Cold-Weather Shelter Kits",
      roster: "16 Electrical Technicians, 10 Heavy Equipment Operators, 5 Engineers, 3 Ops"
    }
  ];

  // 3. DETAILED PERSONNEL DOSSIER
  const hopePersonnel = [
    {
      id: "HF-0142",
      name: "Dr. Amina Al-Mansoor",
      dept: "Emergency Health",
      role: "Chief Medical Officer",
      station: "Juba Emergency Health",
      clearance: "Tier 1 UN / WHO Laissez-Passer",
      status: "Active On-Station",
      tour: "Day 42 of 90-day deployment tour (Next R&R: Oct 18, 2026)",
      stipend: "$1,800/mo Field Hazard Stipend (Tax Exempt Sec 911)",
      salary: "$14,200/mo Base",
      comms: "Iridium PTT Satellite #IRID-982-1402",
      pgp: "9B4F 12CD 88E1 49A0",
      recert: "Valid through March 2027 (WHO Clinical Registrar)"
    },
    {
      id: "HF-0189",
      name: "Tariq Vance",
      dept: "Logistics & Supply",
      role: "Director of Humanitarian Logistics",
      station: "Gaziantep Logistics",
      clearance: "Cross-Border Diplomatic Transit",
      status: "Active On-Station",
      tour: "Day 68 of 90-day deployment tour (Next R&R: Oct 28, 2026)",
      stipend: "$1,400/mo Cross-Border Stipend",
      salary: "$12,800/mo Base",
      comms: "Thuraya Satellite Terminal #TH-449-0128",
      pgp: "7A33 41F0 92D3 B882",
      recert: "Valid through June 2027 (IATA Dangerous Goods & WFP)"
    },
    {
      id: "HF-0210",
      name: "Elena Rostova",
      dept: "Field Operations",
      role: "Field Operations Coordinator",
      station: "Kyiv Rapid Recovery",
      clearance: "EU Civil Protection Accreditation",
      status: "Active On-Station",
      tour: "Day 24 of 60-day deployment tour (Next R&R: Nov 05, 2026)",
      stipend: "$1,600/mo Winter Crisis Allowance",
      salary: "$11,900/mo Base",
      comms: "Starlink Field Dish #SL-UA-0842",
      pgp: "2E11 98AA 4410 C109",
      recert: "Valid through Dec 2026 (EU Civil Protection Expert)"
    },
    {
      id: "HF-0155",
      name: "Marcus Chen",
      dept: "Water Security",
      role: "Principal Water Security Lead",
      station: "Cox's Bazar Station",
      clearance: "Global Health Laureate / UN Water",
      status: "Active On-Station",
      tour: "Day 54 of 90-day deployment tour (Next R&R: Oct 12, 2026)",
      stipend: "$1,500/mo Monsoonal Hardship Allowance",
      salary: "$13,500/mo Base",
      comms: "BGAN Explorer 710 #BGAN-882-9912",
      pgp: "F401 883A 12EE 77B4",
      recert: "Valid through August 2027 (Chartered Water Engineer)"
    },
    {
      id: "HF-0101",
      name: "Julian Thorne",
      dept: "People Ops",
      role: "Global Head of People & Safety",
      station: "Geneva HQ (Operations Hub)",
      clearance: "IFRC Accredited & Diplomatic Visa",
      status: "Active On-Station",
      tour: "Continuous HQ Deployment (Travel Readiness: 2h)",
      stipend: "N/A (HQ Stationed)",
      salary: "$15,400/mo Base",
      comms: "Encrypted Signal Enterprise #CH-022-8199",
      pgp: "119A D883 4511 202A",
      recert: "Permanent ICRC Diplomatic Liaison Delegate"
    },
    {
      id: "HF-0224",
      name: "Sophie Moreau",
      dept: "Field Operations",
      role: "Disaster Response Specialist",
      station: "Port-au-Prince Relief",
      clearance: "Tier 2 Humanitarian / UNDSS Level 4",
      status: "Scheduled R&R",
      tour: "On Statutory 14-day Rest & Recuperation (Returns Oct 04)",
      stipend: "$2,000/mo Maximum Hazard Allowance",
      salary: "$11,200/mo Base",
      comms: "Iridium Extreme Satellite Handset #IRID-771-0021",
      pgp: "88BC 3310 F994 0012",
      recert: "Valid through Nov 2026 (Hostile Environment HEAT)"
    }
  ];

  // 4. DEPARTMENT SUMMARY DICTIONARY
  const departmentSummaries: Record<string, { title: string; lead: string; headcount: string; budget: string; hubs: string; vacancies: string }> = {
    all: {
      title: "Consolidated Humanitarian Workforce",
      lead: "Julian Thorne, Head of People & Safety",
      headcount: "248 Active Personnel",
      budget: "$2,095,000 / mo",
      hubs: "Kabul, Cox's Bazar, Juba, Gaziantep, Port-au-Prince, Kyiv",
      vacancies: "9 Open Requisitions"
    },
    health: {
      title: "Emergency Health & Trauma Division",
      lead: "Dr. Amina Al-Mansoor, CMO",
      headcount: "72 Specialists",
      budget: "$624,000 / mo",
      hubs: "Juba, Kabul, Port-au-Prince",
      vacancies: "3 Trauma Requisitions"
    },
    water: {
      title: "Water Security & Potable Sanitation (WASH)",
      lead: "Marcus Chen, Principal Engineer",
      headcount: "54 Specialists",
      budget: "$452,000 / mo",
      hubs: "Cox's Bazar, Juba",
      vacancies: "2 Infrastructure Engineers"
    },
    logistics: {
      title: "Humanitarian Logistics & Cross-Border Supply",
      lead: "Tariq Vance, Logistics Director",
      headcount: "48 Specialists",
      budget: "$398,000 / mo",
      hubs: "Gaziantep, Kabul, Kyiv",
      vacancies: "2 Customs Handlers"
    },
    field: {
      title: "Rapid Field Operations & Disaster Recovery",
      lead: "Elena Rostova, Operations Lead",
      headcount: "44 Specialists",
      budget: "$381,000 / mo",
      hubs: "Kyiv, Port-au-Prince, Kabul",
      vacancies: "1 Recovery Coordinator"
    },
    people: {
      title: "People Operations, Safety & Diplomatic Vault",
      lead: "Julian Thorne, Head of People",
      headcount: "30 Personnel",
      budget: "$240,000 / mo",
      hubs: "Geneva HQ, Regional Bureaus",
      vacancies: "1 Field Welfare Officer"
    }
  };

  // 5. DETAILED CANDIDATES DOSSIER
  const atsCandidates = [
    {
      name: "Sora Tanaka",
      role: "Senior WASH Infrastructure Engineer",
      stage: "vetted",
      stageLabel: "Vetted Applications",
      target: "Cox's Bazar Station",
      match: "98% Fit",
      score: "4.9 / 5.0",
      experience: "8 yrs emergency water purification (Ex-UNICEF Kenya & Bangladesh)",
      languages: "English, Bengali, Japanese (Native), Basic Arabic",
      clearance: "UN Potable Water Certificate & Level 4 Field Physical Passed",
      proposedSalary: "$9,400/mo + $1,400 Hazard Allowance",
      panelNotes: "Outstanding competency during the field simulation. Led desalination filter rebuild under 40 minutes.",
      recommendation: "Unanimously recommended by Panel for expedited offer dispatch."
    },
    {
      name: "Dr. David Kim",
      role: "Trauma Surgical Specialist",
      stage: "simulation",
      stageLabel: "Field Simulation",
      target: "Juba Emergency Hub",
      match: "96% Fit",
      score: "4.8 / 5.0",
      experience: "10 yrs orthopedic surgery & disaster medicine (Ex-ICRC South Sudan)",
      languages: "English, Korean, Arabic (Conversational)",
      clearance: "Board-Certified Trauma Surgeon & WHO Emergency Credential",
      proposedSalary: "$13,200/mo + $1,800 Remote Duty Allowance",
      panelNotes: "Demonstrated remarkable composure in simulated mass-casualty triage exam.",
      recommendation: "Advance to Medical & Security Dossier review."
    },
    {
      name: "Amina Diallo",
      role: "Cross-Border Logistics Lead",
      stage: "review",
      stageLabel: "Medical & Security Review",
      target: "Gaziantep Logistics Hub",
      match: "99% Fit",
      score: "5.0 / 5.0",
      experience: "7 yrs transit convoy coordination across Turkey/Syria corridor",
      languages: "French, Arabic, Turkish, English",
      clearance: "Diplomatic Transit Pass & Dangerous Goods Handler License",
      proposedSalary: "$10,800/mo + $1,200 Logistics Stipend",
      panelNotes: "Flawless knowledge of cross-border customs declarations and UN convoy escort rules.",
      recommendation: "Awaiting final biometric security stamp from Geneva Safety Desk."
    },
    {
      name: "Lucas Meyer",
      role: "Emergency Shelter Architect",
      stage: "offer",
      stageLabel: "Executive Offer",
      target: "Kyiv Rapid Recovery",
      match: "94% Fit",
      score: "4.7 / 5.0",
      experience: "6 yrs modular insulated housing design in post-conflict zones",
      languages: "German, Ukrainian, English",
      clearance: "EU Rapid Response Architectural Safety Certification",
      proposedSalary: "$9,800/mo + $1,600 Winter Hazard Allowance",
      panelNotes: "Drafted blueprint for sub-zero shelter insulation using localized reclaimed timber.",
      recommendation: "Appointment Letter dispatched; awaiting digital signature."
    }
  ];

  // 6. PAYROLL DETAILED BREAKDOWN DATA
  const payrollStationSplit = [
    { station: "Cox's Bazar Station", headcount: 54, gross: "$452,000.00", stipends: "$48,600.00", net: "$423,400.00", focus: "Water Security & Potable Supply" },
    { station: "Kabul Mission Hub", headcount: 48, gross: "$384,000.00", stipends: "$43,200.00", net: "$359,800.00", focus: "Trauma Surgical & Pediatric Care" },
    { station: "Port-au-Prince Relief", headcount: 42, gross: "$348,000.00", stipends: "$42,000.00", net: "$326,000.00", focus: "Crisis Food Security & Convoy" },
    { station: "Juba Emergency Health", headcount: 38, gross: "$318,000.00", stipends: "$34,200.00", net: "$298,800.00", focus: "Malnutrition & Triage Inpatient" },
    { station: "Kyiv Rapid Recovery", headcount: 34, gross: "$313,000.00", stipends: "$27,200.00", net: "$294,800.00", focus: "Energy Grid & Winterization" },
    { station: "Gaziantep Logistics Hub", headcount: 32, gross: "$280,000.00", stipends: "$19,200.00", net: "$264,000.00", focus: "Regional Freight Transit & Depot" }
  ];

  const payrollComplianceChecks = [
    { title: "IRS Form 990 Schedule F (Foreign Activities)", status: "Verified & Filed", code: "IR-990-2026-F", note: "100% compliant overseas humanitarian labor audit" },
    { title: "Foreign Earned Income Exclusion (IRC Sec 911)", status: "Exemption Active", code: "IRC-911-PASS", note: "Zero punitive federal withholding on field specialists" },
    { title: "Defense Base Act (DBA) Insurance Coverage", status: "Active Policy", code: "DBA-2026-HOPE-98", note: "Full medical evacuation and war-hazard insurance active" },
    { title: "FinCEN & FATCA Anti-Money Laundering (AML)", status: "Cleared by Engine", code: "AML-PASS-0928", note: "Automated real-time sanctions screening across all wire dispatches" }
  ];

  const payrollCurrencies = [
    { currency: "USD (Federal Reserve FedACH / SWIFT)", amount: "$1,424,600.00", pct: "68%", note: "Direct deposit into specialists' international master accounts" },
    { currency: "EUR (SEPA Enterprise Corporate Wire)", amount: "$460,900.00", pct: "22%", note: "Disbursed to EU-based emergency surgeons and logistics suppliers" },
    { currency: "Local Mission Currency Vouchers", amount: "$209,500.00", pct: "10%", note: "Disbursed via biometric cashiers for local procurement and field per-diem" }
  ];

  // 7. WORKFLOW EXECUTION TRACE DATA
  const workflowTraceLogs: Record<string, { title: string; trigger: string; latency: string; executions: string; steps: { name: string; status: string; duration: string; detail: string }[] }> = {
    wf1: {
      title: "Emergency Crisis Mobilization Pipeline",
      trigger: "Webhook: UN OCHA Event ID #OCHA-AF-2026-09 (Crisis Red Alert Triggered)",
      latency: "420ms Total Pipeline Latency",
      executions: "4 Executions this month · 0 Errors",
      steps: [
        { name: "Step 1: Satellite Beacon Sync", status: "Success", duration: "118ms", detail: "Polled Iridium & Starlink field dishes; 48 devices locked to high-precision beacon" },
        { name: "Step 2: Hazard Stipend Allocation", status: "Success", duration: "182ms", detail: "Generated $1,200 emergency hazard disbursement batch via FedACH ISO 20022" },
        { name: "Step 3: Geneva Crisis Dispatch", status: "Success", duration: "120ms", detail: "Dispatched encrypted PGP briefings to Security Director & designated emergency contacts" }
      ]
    },
    wf2: {
      title: "Field Medical & Security Recertification",
      trigger: "Cron(0 0 1 * *) — 30-Day Mandatory Expiration Lookahead",
      latency: "340ms Total Pipeline Latency",
      executions: "18 Specialists Recertified · 0 Expired Passports",
      steps: [
        { name: "Step 1: WHO Registrar Verification", status: "Success", duration: "95ms", detail: "Validated medical surgeon licenses against global WHO FHIR clinical registries" },
        { name: "Step 2: Yellow Fever & Polio Immunization Logs", status: "Success", duration: "140ms", detail: "Confirmed biometric proof of immunization on cold-chain database" },
        { name: "Step 3: Station Keycard Re-Keying", status: "Success", duration: "105ms", detail: "Issued cryptographically signed RFID gate credentials to on-post security turnstiles" }
      ]
    },
    wf3: {
      title: "Rapid Specialist Mission Deployment",
      trigger: "DocuSign Webhook: Digital Letter of Appointment Executed",
      latency: "280ms Total Pipeline Latency",
      executions: "9 Specialists Enrolled · 100% Compliance",
      steps: [
        { name: "Step 1: Secure PGP & Proton Key Generation", status: "Success", duration: "78ms", detail: "Generated 4096-bit RSA keys and created isolated zero-knowledge communication vault" },
        { name: "Step 2: Diplomatic Visa Packet Assembly", status: "Success", duration: "112ms", detail: "Generated formal diplomatic visa sponsor letters and dispatched to host Ministry" },
        { name: "Step 3: Hostile Environment (HEAT) Course Enrollment", status: "Success", duration: "90ms", detail: "Enrolled candidate in mandatory 5-day hostile environment survival course" }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070709] text-slate-900 dark:text-neutral-100 font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200 relative overflow-x-hidden">
      <SpatialMeshBackground />
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/25 text-indigo-700 dark:text-indigo-400 text-xs font-semibold tracking-wide uppercase"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Modern All-In-One Workforce Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-slate-950 dark:text-white leading-[1.08]"
          >
            Everything your people team needs, <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-sky-500 to-indigo-400">in one place.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed font-normal"
          >
            Manage employees, hiring, payroll, attendance, leave, documents, performance, and HR workflows from one secure platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              href="/auth?mode=signup"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer group"
            >
              <span>Start free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white dark:bg-[#121216] hover:bg-slate-100 dark:hover:bg-neutral-800 text-slate-900 dark:text-neutral-200 font-semibold text-sm border border-slate-200 dark:border-white/[0.08] shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-indigo-500" />
              <span>Book a demo</span>
            </button>

            <Link
              href="/workspace"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-slate-700 dark:text-neutral-300 font-medium text-sm border border-slate-200 dark:border-white/[0.06] flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4 text-indigo-500" />
              <span>Explore Live Workspace</span>
            </Link>
          </motion.div>

          {/* Micro trust indicators - Modern Enterprise Credibility Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-6 text-xs text-slate-500 dark:text-neutral-400 font-medium">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06]">
              <Shield className="w-3.5 h-3.5 text-indigo-500" />
              <span>SOC-2 Type II & ISO-27001 Certified</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06]">
              <Layers className="w-3.5 h-3.5 text-indigo-500" />
              <span>Single-Tenant Cryptographic Partitioning</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06]">
              <Terminal className="w-3.5 h-3.5 text-indigo-500" />
              <span>Sub-50ms Global Edge Telemetry</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06]">
              <Lock className="w-3.5 h-3.5 text-indigo-500" />
              <span>SAML 2.0 & Okta / Google SSO</span>
            </div>
          </div>
        </div>

        {/* 2. PRODUCT DASHBOARD PREVIEW - Modern High-End B2B SaaS Console */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 relative group text-left"
        >
          {/* Multi-Hue Halo Glow */}
          <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500/15 via-sky-500/10 to-teal-500/15 blur-2xl opacity-60 dark:opacity-30 -z-10" />

          {/* Console Chassis */}
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-white/[0.09] bg-white/95 dark:bg-[#0a0a0f]/95 shadow-[0_20px_70px_-15px_rgba(15,23,42,0.12)] dark:shadow-[0_25px_80px_-20px_rgba(0,0,0,0.85)] backdrop-blur-2xl overflow-hidden transition-all duration-300">
            {/* Top Window Chrome / Omnibar */}
            <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-200/80 dark:border-white/[0.07] bg-slate-50/70 dark:bg-white/[0.02] gap-3">
              {/* Left: Window Controls + Brand / Workspace Identity */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]/80 border border-[#e0443e]/50 shadow-xs" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]/80 border border-[#dea123]/50 shadow-xs" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]/80 border border-[#1aab29]/50 shadow-xs" />
                </div>
                <div className="h-4 w-px bg-slate-200 dark:bg-white/[0.1] hidden sm:block" />
                <div className="flex items-center gap-2">
                  <span className="font-victorian text-[17px] sm:text-[19px] text-slate-900 dark:text-white tracking-normal font-normal select-none">
                    Client Forge
                  </span>
                  <span className="text-slate-300 dark:text-neutral-700 text-xs hidden sm:inline">/</span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-neutral-300 flex items-center gap-1.5 hidden sm:flex">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Hope Foundation
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/40 hidden md:inline-flex">
                    Relief Ops
                  </span>
                </div>
              </div>

              {/* Center: Interactive Omnibar */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100/90 dark:bg-neutral-900/80 border border-slate-200/80 dark:border-white/[0.06] text-xs text-slate-600 dark:text-neutral-400 font-mono max-w-sm w-full sm:w-auto justify-between sm:justify-start">
                <div className="flex items-center gap-2 truncate">
                  <Lock className="w-3 h-3 text-indigo-500 shrink-0" />
                  <span className="text-slate-900 dark:text-white font-medium">app.clientforge.io</span>
                  <span className="text-slate-400 dark:text-neutral-500 truncate">/workspace/telemetry</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-neutral-800 text-slate-500 dark:text-neutral-400 shrink-0 font-sans font-medium hidden sm:inline">
                  ⌘K
                </span>
              </div>

              {/* Right: Telemetry Latency + Direct Workspace Link */}
              <div className="flex items-center gap-3">
                <div className="items-center gap-1.5 text-[11px] text-slate-500 dark:text-neutral-400 font-medium hidden lg:flex">
                  <Radio className="w-3 h-3 text-indigo-500 animate-pulse" />
                  <span className="tabular-nums">18ms</span>
                  <span className="text-slate-300 dark:text-neutral-700">·</span>
                  <span>US-East</span>
                </div>
                <Link
                  href="/workspace"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
                >
                  <span>Launch Workspace</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Secondary Command Bar: Interactive Tab Navigation */}
            <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-2.5 border-b border-slate-200/70 dark:border-white/[0.06] bg-slate-50/40 dark:bg-white/[0.01] gap-3">
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
                {[
                  { id: "dashboard", label: "Executive Console", icon: BarChart3 },
                  { id: "people", label: "Workforce Ledger", icon: Users },
                  { id: "ats", label: "Talent Pipeline", icon: Briefcase },
                  { id: "payroll", label: "Disbursement Run", icon: CreditCard },
                  { id: "workflows", label: "Automations", icon: Zap }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activePreviewTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActivePreviewTab(tab.id as "dashboard" | "people" | "ats" | "attendance" | "payroll" | "workflows")}
                      className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? "text-indigo-600 dark:text-indigo-300 font-semibold"
                          : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-white/[0.03]"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="consoleTabIndicator"
                          className="absolute inset-0 rounded-lg bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-200/80 dark:border-indigo-500/30 shadow-xs"
                          transition={{ type: "spring", stiffness: 450, damping: 32 }}
                        />
                      )}
                      <Icon className={`w-3.5 h-3.5 relative z-10 ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-neutral-500"}`} />
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Range Filters */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-neutral-900 p-1 rounded-lg text-[11px] font-medium border border-slate-200/80 dark:border-white/[0.06]">
                {[
                  { id: "realtime", label: "Realtime" },
                  { id: "7d", label: "7D" },
                  { id: "30d", label: "30D" },
                  { id: "q3", label: "Q3 2026" }
                ].map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setConsoleTimeRange(range.id as "realtime" | "7d" | "30d" | "q3")}
                    className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                      consoleTimeRange === range.id
                        ? "bg-white dark:bg-neutral-800 text-slate-900 dark:text-white font-semibold shadow-xs"
                        : "text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Preview Canvas */}
            <div className="bg-white dark:bg-[#0c0c10] text-left min-h-[460px]">
              {/* TAB 1: EXECUTIVE CONSOLE */}
              {activePreviewTab === "dashboard" && (
                <div className="p-5 sm:p-7 space-y-6">
                  {/* Console Header with Editorial Serif Font */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif text-2xl sm:text-3xl font-normal text-slate-950 dark:text-white tracking-tight">
                          Humanitarian Workforce & Deployment Telemetry
                        </h3>
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-300 border border-slate-200 dark:border-neutral-700">
                          Hope Foundation
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1 font-sans">
                        {timeRangeData[consoleTimeRange].chartSubtitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06] text-xs font-medium text-slate-600 dark:text-neutral-300">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Live Synced ({consoleTimeRange.toUpperCase()})</span>
                      </div>
                    </div>
                  </div>

                  {/* 4 Dynamically Reactive Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Card 1: Total Personnel */}
                    <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-neutral-900/50 border border-slate-200/80 dark:border-white/[0.06] hover:border-indigo-500/30 transition-all">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-neutral-400">
                          Total Personnel
                        </span>
                        <Users className="w-4 h-4 text-indigo-500" />
                      </div>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-3xl font-medium tabular-nums text-slate-950 dark:text-white">
                          {timeRangeData[consoleTimeRange].headcount}
                        </span>
                        <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">FTE Staff</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-white/[0.04] flex items-center justify-between text-[11px] text-slate-500 dark:text-neutral-400">
                        <span>{timeRangeData[consoleTimeRange].headcountSub}</span>
                        <span className="font-mono text-[10px] text-indigo-600 dark:text-indigo-400">
                          {timeRangeData[consoleTimeRange].headcountDelta}
                        </span>
                      </div>
                    </div>

                    {/* Card 2: Duty Station Presence */}
                    <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-neutral-900/50 border border-slate-200/80 dark:border-white/[0.06] hover:border-indigo-500/30 transition-all">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-neutral-400">
                          Station Presence
                        </span>
                        <Activity className="w-4 h-4 text-indigo-500" />
                      </div>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-3xl font-medium tabular-nums text-slate-950 dark:text-white">
                          {timeRangeData[consoleTimeRange].readiness}
                        </span>
                        <span className="text-xs font-medium text-slate-500">Readiness</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-white/[0.04] flex items-center justify-between text-[11px] text-slate-500 dark:text-neutral-400">
                        <span>{timeRangeData[consoleTimeRange].presenceSub}</span>
                        <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                          {timeRangeData[consoleTimeRange].readinessDelta}
                        </span>
                      </div>
                    </div>

                    {/* Card 3: Mission Vacancies */}
                    <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-neutral-900/50 border border-slate-200/80 dark:border-white/[0.06] hover:border-indigo-500/30 transition-all">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-neutral-400">
                          Mission Vacancies
                        </span>
                        <Briefcase className="w-4 h-4 text-indigo-500" />
                      </div>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-3xl font-medium tabular-nums text-slate-950 dark:text-white">
                          {timeRangeData[consoleTimeRange].vacancies}
                        </span>
                        <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">Open Roles</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-white/[0.04] flex items-center justify-between text-[11px] text-slate-500 dark:text-neutral-400">
                        <span>{timeRangeData[consoleTimeRange].vacanciesSub}</span>
                        <span className="font-mono text-[10px] text-indigo-600 dark:text-indigo-400">
                          {timeRangeData[consoleTimeRange].vacanciesDelta}
                        </span>
                      </div>
                    </div>

                    {/* Card 4: Monthly Disbursement */}
                    <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-neutral-900/50 border border-slate-200/80 dark:border-white/[0.06] hover:border-indigo-500/30 transition-all">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-neutral-400">
                          Disbursement Run
                        </span>
                        <CreditCard className="w-4 h-4 text-indigo-500" />
                      </div>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-3xl font-medium tabular-nums text-slate-950 dark:text-white">
                          {timeRangeData[consoleTimeRange].disbursement}
                        </span>
                        <span className="text-xs font-medium text-slate-500">Gross</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-white/[0.04] flex items-center justify-between text-[11px] text-slate-500 dark:text-neutral-400">
                        <span>{timeRangeData[consoleTimeRange].disbursementSub}</span>
                        <span className="font-mono text-[10px] text-slate-600 dark:text-neutral-300">
                          {timeRangeData[consoleTimeRange].disbursementDelta}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Dynamic SVG Trajectory Chart */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/50 dark:bg-neutral-900/40 border border-slate-200/80 dark:border-white/[0.06]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                          <span>{timeRangeData[consoleTimeRange].chartTitle}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-mono">
                            {timeRangeData[consoleTimeRange].headcount} FTE Active
                          </span>
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-neutral-400">
                          Hover over any timeline node below to inspect live duty station deployment coordinates
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-neutral-400">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                          <span>Field Specialists (182)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                          <span>Mission Ops (66)</span>
                        </div>
                      </div>
                    </div>

                    {/* SVG Chart with dynamic path rendering */}
                    <div className="relative h-44 sm:h-52 w-full">
                      <svg
                        className="w-full h-full overflow-visible"
                        viewBox="0 0 1000 200"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <linearGradient id="consoleChartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.32" />
                            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        {/* Horizontal Grid lines */}
                        <line x1="40" y1="40" x2="960" y2="40" stroke="currentColor" strokeOpacity="0.07" strokeDasharray="4 4" className="text-slate-400 dark:text-neutral-600" />
                        <line x1="40" y1="90" x2="960" y2="90" stroke="currentColor" strokeOpacity="0.07" strokeDasharray="4 4" className="text-slate-400 dark:text-neutral-600" />
                        <line x1="40" y1="140" x2="960" y2="140" stroke="currentColor" strokeOpacity="0.07" strokeDasharray="4 4" className="text-slate-400 dark:text-neutral-600" />
                        <line x1="40" y1="190" x2="960" y2="190" stroke="currentColor" strokeOpacity="0.12" className="text-slate-400 dark:text-neutral-600" />

                        {/* Smooth Dynamic Area Fill */}
                        <path
                          d={timeRangeData[consoleTimeRange].areaPath}
                          fill="url(#consoleChartGradient)"
                          className="transition-all duration-500 ease-out"
                        />

                        {/* Primary Trajectory Stroke */}
                        <path
                          d={timeRangeData[consoleTimeRange].curvePath}
                          fill="none"
                          stroke="#6366f1"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          className="transition-all duration-500 ease-out"
                        />

                        {/* Interactive Data Points */}
                        {timeRangeData[consoleTimeRange].points.map((pt, i) => (
                          <g
                            key={pt.label}
                            onMouseEnter={() => setChartHoverIndex(i)}
                            onMouseLeave={() => setChartHoverIndex(null)}
                            className="cursor-pointer group"
                          >
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r={chartHoverIndex === i ? 7 : 4.5}
                              className={`transition-all duration-150 ${
                                chartHoverIndex === i
                                  ? "fill-indigo-600 stroke-white dark:stroke-slate-900 stroke-2"
                                  : "fill-white dark:fill-[#0c0c10] stroke-indigo-500 stroke-2"
                              }`}
                            />
                            <text
                              x={pt.x}
                              y="210"
                              textAnchor="middle"
                              className="text-[10px] fill-slate-400 dark:fill-neutral-500 select-none font-mono"
                            >
                              {pt.label}
                            </text>
                          </g>
                        ))}
                      </svg>

                      {/* Interactive Floating Hover Card */}
                      {chartHoverIndex !== null && timeRangeData[consoleTimeRange].points[chartHoverIndex] && (
                        <div
                          className="absolute z-20 pointer-events-none -translate-x-1/2 -translate-y-full px-3.5 py-2.5 rounded-xl bg-slate-900/95 dark:bg-black/95 text-white border border-slate-700/80 shadow-2xl backdrop-blur-md text-xs space-y-1 transition-all"
                          style={{
                            left: `${(chartHoverIndex / (timeRangeData[consoleTimeRange].points.length - 1)) * 88 + 6}%`,
                            top: "32%"
                          }}
                        >
                          <div className="font-semibold text-indigo-300 flex items-center justify-between gap-4">
                            <span>{timeRangeData[consoleTimeRange].points[chartHoverIndex].label}</span>
                            <span className="font-mono text-[10px] text-slate-400">Hope Telemetry</span>
                          </div>
                          <div className="flex items-center justify-between gap-4 text-slate-300">
                            <span>Headcount:</span>
                            <span className="font-medium tabular-nums text-white">
                              {timeRangeData[consoleTimeRange].points[chartHoverIndex].val} FTE
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-4 text-slate-300 text-[11px]">
                            <span>Readiness Rate:</span>
                            <span className="font-medium tabular-nums text-emerald-400">
                              {timeRangeData[consoleTimeRange].points[chartHoverIndex].rate}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-400 pt-0.5 border-t border-slate-700/50">
                            {timeRangeData[consoleTimeRange].points[chartHoverIndex].sub}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Operational Telemetry Event Stream */}
                  <div className="p-3.5 rounded-xl bg-slate-100/60 dark:bg-neutral-900/40 border border-slate-200/80 dark:border-white/[0.06] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700 dark:text-neutral-300 flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Live Operational Events ({consoleTimeRange.toUpperCase()} Window)</span>
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">Cryptographically Verified Log</span>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      {timeRangeData[consoleTimeRange].events.map((evt, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-neutral-800/60 border border-slate-200/60 dark:border-white/[0.04]">
                          <div className="flex items-center gap-2 truncate">
                            <span className="font-mono text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 shrink-0">
                              {evt.time}
                            </span>
                            <span className="text-slate-700 dark:text-neutral-200 text-xs truncate">
                              {evt.text}
                            </span>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-neutral-700 text-slate-600 dark:text-neutral-300 shrink-0">
                            {evt.type === "ops" ? "Shift Audit" : evt.type === "alert" ? "Medical Surge" : "Convoy Transit"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Active Duty Stations Matrix & Click-to-Inspect Dossier */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                          Active Humanitarian Duty Stations (Click any station to inspect command dossier)
                        </div>
                        <p className="text-[11px] text-slate-400">
                          6 Deployed Multi-Hub Centers · 248 Total Specialists on-post
                        </p>
                      </div>
                      {selectedStation && (
                        <button
                          onClick={() => setSelectedStation(null)}
                          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Clear Selection</span>
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {dutyStations.map((station) => {
                        const isSelected = selectedStation === station.name;
                        return (
                          <div
                            key={station.name}
                            onClick={() => setSelectedStation(isSelected ? null : station.name)}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-500 shadow-md ring-1 ring-indigo-500"
                                : "bg-slate-50/70 dark:bg-neutral-900/40 border-slate-200/80 dark:border-white/[0.06] hover:border-indigo-400/40"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                                <MapPin className={`w-3 h-3 shrink-0 ${isSelected ? "text-indigo-600" : "text-indigo-500"}`} />
                                {station.name}
                              </span>
                              <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                                isSelected ? "bg-indigo-600 text-white" : "bg-slate-200/70 dark:bg-neutral-800 text-slate-600 dark:text-neutral-300"
                              }`}>
                                {isSelected ? "ACTIVE DOSSIER" : station.status}
                              </span>
                            </div>
                            <div className="mt-2 text-[11px] text-slate-500 dark:text-neutral-400">
                              {station.focus}
                            </div>
                            <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-white/[0.04] flex items-center justify-between text-xs">
                              <span className="font-medium tabular-nums text-slate-700 dark:text-neutral-300">
                                {station.personnel} Personnel
                              </span>
                              <span className="text-[11px] font-mono text-slate-500">
                                Readiness: <strong className="text-slate-800 dark:text-neutral-200">{station.readiness}</strong>
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* EXPANDED DUTY STATION COMMAND DOSSIER */}
                    {selectedStation && (() => {
                      const activeStn = dutyStations.find((s) => s.name === selectedStation);
                      if (!activeStn) return null;
                      return (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 p-5 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-500/30 space-y-4"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-indigo-200/60 dark:border-indigo-800/40">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-serif text-lg font-normal text-slate-950 dark:text-white">
                                  Command Dossier: {activeStn.name}
                                </span>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-semibold">
                                  {activeStn.threat}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                                Station Commander: <strong className="text-slate-800 dark:text-neutral-200">{activeStn.lead}</strong>
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs text-slate-600 dark:text-neutral-400 bg-white dark:bg-neutral-800 px-3 py-1 rounded-lg border border-slate-200 dark:border-neutral-700">
                                GPS: {activeStn.gps}
                              </span>
                              <button
                                onClick={() => setSelectedStation(null)}
                                className="p-1.5 rounded-lg bg-slate-200 dark:bg-neutral-800 text-slate-600 dark:text-neutral-300 hover:bg-slate-300 cursor-pointer"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                            <div className="p-3 rounded-xl bg-white dark:bg-neutral-900/80 border border-indigo-200/50 dark:border-indigo-900/30">
                              <div className="font-semibold text-slate-700 dark:text-neutral-300 mb-1">Station Facilities on Site</div>
                              <div className="text-slate-500 text-[11px] leading-relaxed">{activeStn.facilities}</div>
                            </div>
                            <div className="p-3 rounded-xl bg-white dark:bg-neutral-900/80 border border-indigo-200/50 dark:border-indigo-900/30">
                              <div className="font-semibold text-slate-700 dark:text-neutral-300 mb-1">Operational Supply Runway</div>
                              <div className="text-slate-500 text-[11px] leading-relaxed">{activeStn.runway}</div>
                            </div>
                            <div className="p-3 rounded-xl bg-white dark:bg-neutral-900/80 border border-indigo-200/50 dark:border-indigo-900/30">
                              <div className="font-semibold text-slate-700 dark:text-neutral-300 mb-1">On-Post Deployment Roster</div>
                              <div className="text-slate-500 text-[11px] leading-relaxed">{activeStn.roster}</div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })()}
                  </div>
                </div>
              )}

              {/* TAB 2: WORKFORCE LEDGER */}
              {activePreviewTab === "people" && (
                <div className="p-5 sm:p-7 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-serif text-2xl font-normal text-slate-950 dark:text-white tracking-tight">
                        Humanitarian Workforce Directory & Dossier Vault
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                        Click on any personnel row below to inspect their full diplomatic credentials, tour dates, and hazard stipends
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={consolePeopleSearch}
                          onChange={(e) => setConsolePeopleSearch(e.target.value)}
                          placeholder="Search specialist, role, or station..."
                          className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 w-60 focus:outline-hidden focus:border-indigo-500"
                        />
                      </div>
                      <Link
                        href="/workspace/people"
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-xs transition"
                      >
                        All 248 Profiles →
                      </Link>
                    </div>
                  </div>

                  {/* Department Filter Bar */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
                    {[
                      { id: "all", label: "All Personnel (248)" },
                      { id: "health", label: "Emergency Health (72)" },
                      { id: "water", label: "Water & Sanitation (54)" },
                      { id: "logistics", label: "Logistics & Supply (48)" },
                      { id: "field", label: "Field Operations (44)" },
                      { id: "people", label: "People Ops & HQ (30)" }
                    ].map((dept) => (
                      <button
                        key={dept.id}
                        onClick={() => {
                          setConsoleDeptFilter(dept.id);
                          setSelectedPersonnel(null);
                        }}
                        className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                          consoleDeptFilter === dept.id
                            ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-semibold shadow-xs"
                            : "bg-slate-100 dark:bg-neutral-900 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {dept.label}
                      </button>
                    ))}
                  </div>

                  {/* Dynamic Department Intelligence Header */}
                  {departmentSummaries[consoleDeptFilter] && (
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <div className="text-[10px] uppercase font-semibold text-slate-400">Division Lead</div>
                        <div className="font-semibold text-slate-900 dark:text-white mt-0.5">{departmentSummaries[consoleDeptFilter].lead}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-semibold text-slate-400">Active Roster</div>
                        <div className="font-semibold text-slate-900 dark:text-white mt-0.5">{departmentSummaries[consoleDeptFilter].headcount}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-semibold text-slate-400">Monthly Budget</div>
                        <div className="font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">{departmentSummaries[consoleDeptFilter].budget}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-semibold text-slate-400">Open Requisitions</div>
                        <div className="font-semibold text-slate-900 dark:text-white mt-0.5">{departmentSummaries[consoleDeptFilter].vacancies}</div>
                      </div>
                    </div>
                  )}

                  {/* Personnel Table */}
                  <div className="overflow-x-auto rounded-xl border border-slate-200/80 dark:border-white/[0.06]">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-neutral-800 bg-slate-50/70 dark:bg-white/[0.02] text-slate-500 dark:text-neutral-400 font-semibold">
                          <th className="py-3 px-4">Specialist / Leader</th>
                          <th className="py-3 px-4">Mission Division</th>
                          <th className="py-3 px-4">Duty Station</th>
                          <th className="py-3 px-4">Security Clearance</th>
                          <th className="py-3 px-4">Deployment Status</th>
                          <th className="py-3 px-4 text-right">Dossier</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-neutral-800/60">
                        {hopePersonnel
                          .filter((p) => {
                            if (consoleDeptFilter !== "all") {
                              const matchMap: Record<string, string> = {
                                health: "Emergency Health",
                                water: "Water Security",
                                logistics: "Logistics & Supply",
                                field: "Field Operations",
                                people: "People Ops"
                              };
                              if (p.dept !== matchMap[consoleDeptFilter]) return false;
                            }
                            if (!consolePeopleSearch) return true;
                            const q = consolePeopleSearch.toLowerCase();
                            return (
                              p.name.toLowerCase().includes(q) ||
                              p.role.toLowerCase().includes(q) ||
                              p.station.toLowerCase().includes(q) ||
                              p.dept.toLowerCase().includes(q)
                            );
                          })
                          .map((person) => {
                            const isSelected = selectedPersonnel === person.name;
                            return (
                              <React.Fragment key={person.id}>
                                <tr
                                  onClick={() => setSelectedPersonnel(isSelected ? null : person.name)}
                                  className={`transition-colors cursor-pointer ${
                                    isSelected
                                      ? "bg-indigo-50/80 dark:bg-indigo-950/40"
                                      : "hover:bg-slate-50/80 dark:hover:bg-white/[0.02]"
                                  }`}
                                >
                                  <td className="py-3 px-4">
                                    <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                      <span>{person.name}</span>
                                      <span className="font-mono text-[10px] text-slate-400">{person.id}</span>
                                    </div>
                                    <div className="text-[11px] text-slate-500">{person.role}</div>
                                  </td>
                                  <td className="py-3 px-4 text-slate-600 dark:text-neutral-300 font-medium">
                                    {person.dept}
                                  </td>
                                  <td className="py-3 px-4">
                                    <span className="inline-flex items-center gap-1.5 text-slate-700 dark:text-neutral-300 font-medium">
                                      <MapPin className="w-3 h-3 text-indigo-500" />
                                      {person.station}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4">
                                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-300">
                                      {person.clearance}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4">
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold inline-flex items-center gap-1 ${
                                      person.status === "Active On-Station"
                                        ? "bg-slate-100 dark:bg-neutral-800 text-slate-800 dark:text-neutral-200 border border-slate-200 dark:border-neutral-700"
                                        : "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40"
                                    }`}>
                                      <span className={`w-1.5 h-1.5 rounded-full ${person.status === "Active On-Station" ? "bg-indigo-500" : "bg-amber-500"}`} />
                                      {person.status}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4 text-right">
                                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                                      {isSelected ? "Hide Dossier" : "Inspect →"}
                                    </span>
                                  </td>
                                </tr>

                                {/* EXPANDED PERSONNEL MISSION DOSSIER */}
                                {isSelected && (
                                  <tr className="bg-indigo-50/40 dark:bg-indigo-950/20">
                                    <td colSpan={6} className="p-4">
                                      <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-indigo-200 dark:border-indigo-900/40 space-y-3">
                                        <div className="flex items-center justify-between">
                                          <div className="font-semibold text-xs text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                                            <Shield className="w-4 h-4 text-indigo-500" />
                                            <span>Confidential Deployment Dossier: {person.name} ({person.id})</span>
                                          </div>
                                          <span className="text-[10px] font-mono text-slate-400">
                                            PGP: {person.pgp}
                                          </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                                          <div>
                                            <div className="text-[10px] uppercase font-semibold text-slate-400">Mission Tour Schedule</div>
                                            <div className="font-medium text-slate-800 dark:text-neutral-200 mt-0.5">{person.tour}</div>
                                          </div>
                                          <div>
                                            <div className="text-[10px] uppercase font-semibold text-slate-400">Compensation & Field Hazard</div>
                                            <div className="font-medium text-slate-800 dark:text-neutral-200 mt-0.5">
                                              {person.salary} · <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{person.stipend}</span>
                                            </div>
                                          </div>
                                          <div>
                                            <div className="text-[10px] uppercase font-semibold text-slate-400">Emergency Satellite Channel</div>
                                            <div className="font-mono text-slate-800 dark:text-neutral-200 mt-0.5">{person.comms}</div>
                                          </div>
                                        </div>

                                        <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-neutral-800 flex items-center justify-between">
                                          <span>Statutory Certification: <strong className="text-slate-700 dark:text-neutral-300">{person.recert}</strong></span>
                                          <span className="text-emerald-600 font-medium">✓ Cryptographic Biometric Pass Valid</span>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </React.Fragment>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: TALENT PIPELINE */}
              {activePreviewTab === "ats" && (
                <div className="p-5 sm:p-7 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-serif text-2xl font-normal text-slate-950 dark:text-white tracking-tight">
                        Humanitarian Recruitment Kanban Pipeline
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                        Click on any candidate card below to inspect their full scorecard rubric, languages, and panel interview notes
                      </p>
                    </div>
                    <Link
                      href="/workspace/recruitment"
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-xs transition"
                    >
                      Open Full ATS Board →
                    </Link>
                  </div>

                  {/* Candidate Stage Filter Buttons */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
                    {[
                      { id: "all", label: "All Candidates (4)" },
                      { id: "vetted", label: "Vetted Applications (1)" },
                      { id: "simulation", label: "Field Simulation (1)" },
                      { id: "review", label: "Medical & Security (1)" },
                      { id: "offer", label: "Executive Offer (1)" }
                    ].map((stg) => (
                      <button
                        key={stg.id}
                        onClick={() => {
                          setCandidateStageFilter(stg.id);
                          setSelectedCandidate(null);
                        }}
                        className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                          candidateStageFilter === stg.id
                            ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-semibold shadow-xs"
                            : "bg-slate-100 dark:bg-neutral-900 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {stg.label}
                      </button>
                    ))}
                  </div>

                  {/* 4 Pipeline Columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    {atsCandidates
                      .filter((c) => candidateStageFilter === "all" || c.stage === candidateStageFilter)
                      .map((cand) => {
                        const isSelected = selectedCandidate === cand.name;
                        return (
                          <div
                            key={cand.name}
                            onClick={() => setSelectedCandidate(isSelected ? null : cand.name)}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? "bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-500 shadow-md ring-1 ring-indigo-500"
                                : "bg-slate-50/70 dark:bg-neutral-900/50 border border-slate-200/80 dark:border-white/[0.06] hover:border-indigo-400/40"
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200/60 dark:border-neutral-800">
                                <span className="font-semibold text-[11px] uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                                  {cand.stageLabel}
                                </span>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/40">
                                  {cand.match}
                                </span>
                              </div>

                              <div className="p-3 rounded-lg bg-white dark:bg-neutral-800/80 border border-slate-200/80 dark:border-neutral-700/60 shadow-xs space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-slate-900 dark:text-white text-xs">{cand.name}</span>
                                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                                    ★ {cand.score}
                                  </span>
                                </div>
                                <div className="text-[11px] text-slate-600 dark:text-neutral-300 font-medium">{cand.role}</div>
                                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                                  <MapPin className="w-3 h-3 text-indigo-500" />
                                  <span>Station: {cand.target}</span>
                                </div>
                                <div className="text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-100 dark:border-neutral-700/50">
                                  {cand.clearance}
                                </div>
                              </div>
                            </div>

                            <div className="mt-3 pt-2 text-[10px] text-slate-400 flex items-center justify-between">
                              <span>Click to inspect dossier</span>
                              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                                {isSelected ? "Hide Dossier" : "View Dossier →"}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  {/* EXPANDED CANDIDATE EVALUATION DOSSIER */}
                  {selectedCandidate && (() => {
                    const cand = atsCandidates.find((c) => c.name === selectedCandidate);
                    if (!cand) return null;
                    return (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-5 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-500/30 space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-indigo-200/60 dark:border-indigo-800/40">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-serif text-lg font-normal text-slate-950 dark:text-white">
                                Candidate Evaluation Dossier: {cand.name}
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-600 text-white font-semibold">
                                {cand.stageLabel}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                              Target Role: <strong className="text-slate-800 dark:text-neutral-200">{cand.role}</strong> · Assigned Station: <strong className="text-slate-800 dark:text-neutral-200">{cand.target}</strong>
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xs text-emerald-600 dark:text-emerald-400 bg-white dark:bg-neutral-800 px-3 py-1 rounded-lg border border-slate-200 dark:border-neutral-700">
                              Evaluation Score: {cand.score}
                            </span>
                            <button
                              onClick={() => setSelectedCandidate(null)}
                              className="p-1.5 rounded-lg bg-slate-200 dark:bg-neutral-800 text-slate-600 dark:text-neutral-300 hover:bg-slate-300 cursor-pointer"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                          <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900/80 border border-indigo-200/50 dark:border-indigo-900/30 space-y-1">
                            <div className="font-semibold text-slate-700 dark:text-neutral-300">Prior Humanitarian Experience</div>
                            <div className="text-slate-500 text-[11px] leading-relaxed">{cand.experience}</div>
                            <div className="text-[11px] text-slate-400 pt-1">Languages: {cand.languages}</div>
                          </div>
                          <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900/80 border border-indigo-200/50 dark:border-indigo-900/30 space-y-1">
                            <div className="font-semibold text-slate-700 dark:text-neutral-300">Compensation Package</div>
                            <div className="text-indigo-600 dark:text-indigo-400 font-semibold text-[11px]">{cand.proposedSalary}</div>
                            <div className="text-[11px] text-slate-400 pt-1">Clearance: {cand.clearance}</div>
                          </div>
                          <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900/80 border border-indigo-200/50 dark:border-indigo-900/30 space-y-1">
                            <div className="font-semibold text-slate-700 dark:text-neutral-300">Panel Interviewer Notes</div>
                            <div className="text-slate-500 text-[11px] leading-relaxed italic">&quot;{cand.panelNotes}&quot;</div>
                            <div className="text-[11px] text-emerald-600 font-medium pt-1">{cand.recommendation}</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2">
                          <button
                            onClick={() => alert(`Advanced candidate ${cand.name} to the next evaluation stage!`)}
                            className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-xs cursor-pointer"
                          >
                            Advance Candidate Stage →
                          </button>
                        </div>
                      </motion.div>
                    );
                  })()}
                </div>
              )}

              {/* TAB 4: DISBURSEMENT RUN */}
              {activePreviewTab === "payroll" && (
                <div className="p-5 sm:p-7 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-serif text-2xl font-normal text-slate-950 dark:text-white tracking-tight">
                        Semi-Monthly Payroll & Hazard Stipend Disbursement
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                        Consolidated gross-to-net calculation for Hope Foundation (248 Active Personnel)
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-500 dark:text-neutral-400">
                        Batch #NACHA-2026-0928
                      </span>
                    </div>
                  </div>

                  {/* 4 Payroll View Mode Toggle Buttons */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
                    {[
                      { id: "ledger", label: "Gross-to-Net Ledger" },
                      { id: "stations", label: "Duty Station Allocation" },
                      { id: "compliance", label: "501(c)(3) Statutory Audit" },
                      { id: "currencies", label: "Multi-Currency Distribution" }
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => setPayrollViewMode(mode.id as "ledger" | "stations" | "compliance" | "currencies")}
                        className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                          payrollViewMode === mode.id
                            ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-semibold shadow-xs"
                            : "bg-slate-100 dark:bg-neutral-900 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>

                  {/* VIEW 1: GROSS-TO-NET LEDGER */}
                  {payrollViewMode === "ledger" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-neutral-900/50 border border-slate-200/80 dark:border-white/[0.06]">
                          <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-neutral-400">Gross Salary Pool</div>
                          <div className="text-xl sm:text-2xl font-medium tabular-nums text-slate-950 dark:text-white mt-1">$2,095,000.00</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">248 FTE Base Wages</div>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-neutral-900/50 border border-slate-200/80 dark:border-white/[0.06]">
                          <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-neutral-400">Hazard & Remote Duty</div>
                          <div className="text-xl sm:text-2xl font-medium tabular-nums text-slate-950 dark:text-white mt-1">+$184,200.00</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">182 Field Specialists</div>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-neutral-900/50 border border-slate-200/80 dark:border-white/[0.06]">
                          <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-neutral-400">NGO Statutory Offsets</div>
                          <div className="text-xl sm:text-2xl font-medium tabular-nums text-slate-950 dark:text-white mt-1">-$312,400.00</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">501(c)(3) Tax Exempt</div>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-neutral-900/50 border border-slate-200/80 dark:border-white/[0.06]">
                          <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-neutral-400">Net NACHA Deposit</div>
                          <div className="text-xl sm:text-2xl font-medium tabular-nums text-slate-950 dark:text-white mt-1">$1,966,800.00</div>
                          <div className="text-[10px] text-indigo-600 dark:text-indigo-400 mt-0.5">Direct Deposit Verified</div>
                        </div>
                      </div>

                      {/* Cryptographic Clearance & Execution Bar */}
                      <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-neutral-900/50 border border-slate-200/80 dark:border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Lock className="w-3.5 h-3.5 text-indigo-500" />
                            <span className="font-semibold text-xs text-slate-900 dark:text-white">
                              Federal Reserve FedACH / ISO 20022 Transmission Packet
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400">
                              SHA-256: 8f4c2b9a...3e91
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">
                            Authorized by Chief Financial Officer (Elizabeth Vance). Cryptographically sealed for multi-hub international wires.
                          </p>
                        </div>

                        <button
                          onClick={() => setPayrollDisbursed(!payrollDisbursed)}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
                            payrollDisbursed
                              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-xs"
                              : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs"
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{payrollDisbursed ? "Disbursement Settled" : "Authorize & Disburse Run"}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* VIEW 2: DUTY STATION ALLOCATION */}
                  {payrollViewMode === "stations" && (
                    <div className="overflow-x-auto rounded-xl border border-slate-200/80 dark:border-white/[0.06]">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-neutral-800 bg-slate-50/70 dark:bg-white/[0.02] text-slate-500 dark:text-neutral-400 font-semibold">
                            <th className="py-3 px-4">Duty Station Hub</th>
                            <th className="py-3 px-4">Specialists</th>
                            <th className="py-3 px-4">Gross Salaries</th>
                            <th className="py-3 px-4">Field Hazard Stipends</th>
                            <th className="py-3 px-4">Net Disbursement</th>
                            <th className="py-3 px-4">Operational Focus</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-neutral-800/60">
                          {payrollStationSplit.map((stn, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-white/[0.02]">
                              <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                                {stn.station}
                              </td>
                              <td className="py-3 px-4 tabular-nums text-slate-700 dark:text-neutral-300 font-medium">
                                {stn.headcount} FTE
                              </td>
                              <td className="py-3 px-4 tabular-nums text-slate-900 dark:text-white font-medium">
                                {stn.gross}
                              </td>
                              <td className="py-3 px-4 tabular-nums text-indigo-600 dark:text-indigo-400 font-semibold">
                                +{stn.stipends}
                              </td>
                              <td className="py-3 px-4 tabular-nums font-bold text-slate-950 dark:text-white">
                                {stn.net}
                              </td>
                              <td className="py-3 px-4 text-slate-500 text-[11px]">
                                {stn.focus}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* VIEW 3: STATUTORY 501(C)(3) COMPLIANCE AUDIT */}
                  {payrollViewMode === "compliance" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {payrollComplianceChecks.map((chk, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-slate-50/70 dark:bg-neutral-900/50 border border-slate-200/80 dark:border-white/[0.06] space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                              <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                              {chk.title}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40 font-semibold">
                              {chk.status}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500">{chk.note}</div>
                          <div className="text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-200/50 dark:border-neutral-800">
                            Verification Hash: {chk.code}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* VIEW 4: MULTI-CURRENCY DISTRIBUTION */}
                  {payrollViewMode === "currencies" && (
                    <div className="space-y-3">
                      {payrollCurrencies.map((curr, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-slate-50/70 dark:bg-neutral-900/50 border border-slate-200/80 dark:border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-white">{curr.currency}</div>
                            <div className="text-slate-500 text-[11px] mt-0.5">{curr.note}</div>
                          </div>
                          <div className="flex items-center gap-4 shrink-0">
                            <span className="font-bold tabular-nums text-slate-950 dark:text-white text-base">
                              {curr.amount}
                            </span>
                            <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold">
                              {curr.pct}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: AUTOMATIONS */}
              {activePreviewTab === "workflows" && (
                <div className="p-5 sm:p-7 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-serif text-2xl font-normal text-slate-950 dark:text-white tracking-tight">
                        Active Event-Driven HR & Mission Automations
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                        Click on any automated pipeline below to inspect its execution trace, latency logs, and simulate a real-time event
                      </p>
                    </div>

                    <Link
                      href="/workspace/automation"
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-xs transition"
                    >
                      Visual Node Builder →
                    </Link>
                  </div>

                  {/* 3 Active Workflow Cards */}
                  <div className="space-y-3">
                    {[
                      {
                        id: "wf1",
                        title: "Emergency Crisis Mobilization Pipeline",
                        trigger: "When UN OCHA issues Crisis Red Alert in active deployment sector",
                        flow: "Activate satellite comms & GPS beacon tracking → Disburse emergency $1,200 hazard stipend → Alert Geneva Crisis Operations Room",
                        executions: "Executed 4 times this month · 0 errors"
                      },
                      {
                        id: "wf2",
                        title: "Field Medical & Security Recertification",
                        trigger: "30 days prior to UN/WHO field clearance expiration date",
                        flow: "Auto-schedule telehealth clinical exam → Validate Yellow Fever & biometric credentials → Sync RFID gate credentials",
                        executions: "18 specialists successfully recertified"
                      },
                      {
                        id: "wf3",
                        title: "Rapid Specialist Mission Deployment",
                        trigger: "When Specialist executes digital Letter of Appointment",
                        flow: "Provision encrypted PGP email → Generate diplomatic visa support packet → Auto-enroll in mandatory HEAT safety training",
                        executions: "9 recruits actively progressing"
                      }
                    ].map((wf) => {
                      const isEnabled = enabledWorkflows[wf.id];
                      const isSelected = selectedWorkflow === wf.id;
                      return (
                        <div
                          key={wf.id}
                          className={`p-4 rounded-xl border transition-all ${
                            isSelected
                              ? "bg-indigo-50/60 dark:bg-indigo-950/30 border-indigo-500/50 shadow-xs"
                              : "bg-slate-50/70 dark:bg-neutral-900/50 border-slate-200/80 dark:border-white/[0.06]"
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div
                              onClick={() => setSelectedWorkflow(wf.id)}
                              className="space-y-1 cursor-pointer flex-1"
                            >
                              <div className="flex items-center gap-2">
                                <Zap className="w-3.5 h-3.5 text-indigo-500" />
                                <span className="font-semibold text-xs text-slate-900 dark:text-white">{wf.title}</span>
                                <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400">
                                  {wf.executions}
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-500 font-mono">
                                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">TRIGGER:</span> {wf.trigger}
                              </div>
                              <div className="text-xs text-slate-600 dark:text-neutral-300">
                                <span className="font-medium text-slate-700 dark:text-neutral-300">PIPELINE:</span> {wf.flow}
                              </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                              <button
                                onClick={() => setSelectedWorkflow(wf.id)}
                                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                              >
                                {isSelected ? "Viewing Trace" : "Inspect Trace →"}
                              </button>
                              <button
                                onClick={() =>
                                  setEnabledWorkflows((prev) => ({ ...prev, [wf.id]: !prev[wf.id] }))
                                }
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                                  isEnabled
                                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-xs"
                                    : "bg-slate-200 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400"
                                }`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${isEnabled ? "bg-emerald-400" : "bg-slate-400"}`} />
                                <span>{isEnabled ? "Active" : "Paused"}</span>
                              </button>
                            </div>
                          </div>

                          {/* EXPANDED LIVE NODE EXECUTION TRACE */}
                          {isSelected && workflowTraceLogs[wf.id] && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 pt-3 border-t border-slate-200 dark:border-neutral-800 space-y-3"
                            >
                              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                                <span className="font-mono text-[11px] text-slate-500">
                                  Trigger Payload: <strong className="text-indigo-600 dark:text-indigo-400">{workflowTraceLogs[wf.id].trigger}</strong>
                                </span>
                                <div className="flex items-center gap-3">
                                  <span className="font-mono text-[10px] text-slate-400">
                                    {workflowTraceLogs[wf.id].latency}
                                  </span>
                                  <button
                                    onClick={handleRunSimulation}
                                    disabled={simulationRunning}
                                    className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50"
                                  >
                                    <RefreshCw className={`w-3 h-3 ${simulationRunning ? "animate-spin" : ""}`} />
                                    <span>{simulationRunning ? "Simulating..." : "Test Run Simulation"}</span>
                                  </button>
                                </div>
                              </div>

                              {simulationSuccess && (
                                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-medium flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                                  <span>Simulated test event successfully triggered all 3 nodes in 380ms with 0 errors!</span>
                                </div>
                              )}

                              <div className="space-y-2 text-xs">
                                {workflowTraceLogs[wf.id].steps.map((stp, idx) => (
                                  <div key={idx} className="p-2.5 rounded-lg bg-white dark:bg-neutral-800/80 border border-slate-200/60 dark:border-neutral-700/60 flex items-start justify-between gap-3">
                                    <div className="space-y-0.5">
                                      <div className="font-semibold text-slate-800 dark:text-neutral-200">{stp.name}</div>
                                      <div className="text-slate-500 text-[11px]">{stp.detail}</div>
                                    </div>
                                    <div className="text-right shrink-0">
                                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-semibold">
                                        {stp.status} ({stp.duration})
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Console Footer & Direct Live Link */}
            <div className="px-5 sm:px-7 py-3.5 border-t border-slate-200/80 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.01] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-500 dark:text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-indigo-500" />
                <span>
                  Viewing real-time production simulation for <strong className="text-slate-800 dark:text-neutral-200 font-semibold">Hope Foundation</strong> (248 Active Personnel)
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[11px] font-mono text-slate-400 dark:text-neutral-500 hidden md:inline">
                  Client Forge v2.4.8-enterprise
                </span>
                <Link
                  href="/workspace"
                  className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 flex items-center gap-1 group"
                >
                  <span>Open Full Production Console</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. SOCIAL PROOF & METRICS STRIP */}
      <section className="border-y border-slate-200 dark:border-white/[0.06] bg-white/60 dark:bg-black/40 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-neutral-500 mb-8">
            Powering mission-critical people teams from fast-growth startups to enterprise leaders
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tabular-nums">45,000+</div>
              <div className="text-xs text-slate-500 dark:text-neutral-400 mt-1">Global Employees Managed</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tabular-nums">99.99%</div>
              <div className="text-xs text-slate-500 dark:text-neutral-400 mt-1">Payroll Accuracy SLA</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 tabular-nums">85%</div>
              <div className="text-xs text-slate-500 dark:text-neutral-400 mt-1">Faster New Hire Onboarding</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tabular-nums">SOC-2</div>
              <div className="text-xs text-slate-500 dark:text-neutral-400 mt-1">Type II Audited & Compliant</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE SUITE ARCHITECTURE DEEP-DIVE */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            Complete Suite Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-slate-950 dark:text-white tracking-tight">
            Engineered from first principles for global people operations.
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
            Eliminate fragmented logins, brittle Zapier webhooks, and manual spreadsheets. Every module shares a unified real-time data layer with cryptographic audit trails.
          </p>

          {/* Module Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-4">
            {[
              { id: "directory", label: "Core Identity & Directory", icon: Users },
              { id: "payroll", label: "Autonomous Global Payroll", icon: CreditCard },
              { id: "ats", label: "Predictive Talent ATS", icon: Briefcase },
              { id: "attendance", label: "Biometric Time & Presence", icon: Clock },
              { id: "vault", label: "Cryptographic Vault", icon: FileText },
              { id: "automation", label: "Event Automations", icon: Zap }
            ].map((mod) => {
              const Icon = mod.icon;
              const isActive = activeArchitectureModule === mod.id;
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveArchitectureModule(mod.id as "directory" | "payroll" | "ats" | "attendance" | "vault" | "automation")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-md font-semibold"
                      : "bg-slate-100 dark:bg-neutral-900 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-indigo-400 dark:text-indigo-600" : "text-slate-400"}`} />
                  <span>{mod.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Architectural Module Showcase */}
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-100/60 dark:bg-[#0c0c12] border border-slate-200 dark:border-white/[0.08] shadow-xl">
          {activeArchitectureModule === "directory" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-semibold">
                  ENGINE: CORE-IDENTITY-V2.4
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-slate-950 dark:text-white">
                  Unified Global Identity & Multi-Tenant Directory
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
                  Single source of truth for all 248 Hope Foundation humanitarian specialists. Built with granular Role-Based Access Control (RBAC), multi-national legal entity segregation, and SCIM 2.0 auto-provisioning.
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                    <div className="font-semibold text-slate-900 dark:text-white">Multi-Jurisdiction Entities</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">Segregated US, EU, and local field hubs</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                    <div className="font-semibold text-slate-900 dark:text-white">Granular Field RBAC</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">Station Commander vs Clinical Auditor</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                    <div className="font-semibold text-slate-900 dark:text-white">SCIM 2.0 & Okta Sync</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">Instant identity lifecycle de-provisioning</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                    <div className="font-semibold text-slate-900 dark:text-white">Custom Entity Schema</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">Custom diplomatic visa & clearance fields</div>
                  </div>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-md space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-neutral-800">
                  <span className="font-semibold text-slate-900 dark:text-white">Directory Schema Preview (Live Entity)</span>
                  <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">Synced</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-neutral-950 font-mono text-[11px] text-slate-600 dark:text-neutral-300 space-y-1">
                  <div>&#123;</div>
                  <div className="pl-4">&quot;id&quot;: &quot;HF-EMP-0142&quot;,</div>
                  <div className="pl-4">&quot;full_name&quot;: &quot;Dr. Amina Al-Mansoor&quot;,</div>
                  <div className="pl-4">&quot;division&quot;: &quot;Emergency Health&quot;,</div>
                  <div className="pl-4">&quot;duty_station&quot;: &quot;Juba Emergency Health&quot;,</div>
                  <div className="pl-4">&quot;security_tier&quot;: &quot;UN_LAISSEZ_PASSER_TIER_1&quot;,</div>
                  <div className="pl-4">&quot;active_tour_days&quot;: 42,</div>
                  <div className="pl-4">&quot;pgp_fingerprint&quot;: &quot;9B4F 12CD 88E1 49A0&quot;</div>
                  <div>&#125;</div>
                </div>
                <div className="text-[11px] text-slate-500">
                  Direct API Endpoint: <code className="font-mono text-indigo-600 dark:text-indigo-400">GET /api/v1/personnel/HF-EMP-0142</code>
                </div>
              </div>
            </div>
          )}

          {activeArchitectureModule === "payroll" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-semibold">
                  ENGINE: AUTONOMOUS-PAYROLL-V3
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-slate-950 dark:text-white">
                  Autonomous Multi-Currency Gross-to-Net Engine
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
                  Automated gross-to-net calculations across multi-jurisdiction humanitarian teams. Generates NACHA ACH CCD+ and ISO 20022 XML direct deposit batches with automated 501(c)(3) foreign income tax exclusions (IRC Sec 911).
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                    <div className="font-semibold text-slate-900 dark:text-white">Federal Reserve FedACH</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">Automated NACHA CCD+ file generation</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                    <div className="font-semibold text-slate-900 dark:text-white">IRC Sec 911 Compliance</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">Foreign earned income tax exclusions</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                    <div className="font-semibold text-slate-900 dark:text-white">Hazard Allowance Logic</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">Automated station threat stipend rules</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                    <div className="font-semibold text-slate-900 dark:text-white">Dual-Sign Off Cryptography</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">CFO SHA-256 cryptographic authorization</div>
                  </div>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-md space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-neutral-800">
                  <span className="font-semibold text-slate-900 dark:text-white">Gross-to-Net Computation Trace</span>
                  <span className="text-[10px] font-mono text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded">Cycle #0928</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-neutral-950">
                    <span className="text-slate-600 dark:text-neutral-400">Total Base Salary Pool:</span>
                    <span className="font-bold tabular-nums text-slate-900 dark:text-white">$2,095,000.00</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-neutral-950">
                    <span className="text-slate-600 dark:text-neutral-400">Field Hazard Stipends (182 Specialists):</span>
                    <span className="font-bold tabular-nums text-indigo-600 dark:text-indigo-400">+$184,200.00</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-neutral-950">
                    <span className="text-slate-600 dark:text-neutral-400">IRC Sec 911 & NGO Offsets:</span>
                    <span className="font-bold tabular-nums text-slate-500">-$312,400.00</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/40">
                    <span className="font-semibold text-indigo-900 dark:text-indigo-300">Net Direct Deposit Disbursement:</span>
                    <span className="font-bold tabular-nums text-indigo-600 dark:text-indigo-400">$1,966,800.00</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 pt-1">
                  Protocol: <code className="font-mono text-slate-700 dark:text-neutral-300">ISO 20022 pain.001.001.09 Credit Transfer</code>
                </div>
              </div>
            </div>
          )}

          {activeArchitectureModule === "ats" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-semibold">
                  ENGINE: HUMANITARIAN-ATS-V2
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-slate-950 dark:text-white">
                  Predictive Talent ATS & Credential Verification
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
                  Fast-track recruitment for high-urgency duty station vacancies. Automates candidate credential screening against WHO and UN registries, evaluates simulation scorecards, and prepares diplomatic visa support packets.
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                    <div className="font-semibold text-slate-900 dark:text-white">WHO Registry Sync</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">Automated clinical surgeon verification</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                    <div className="font-semibold text-slate-900 dark:text-white">Multi-Stage Rubrics</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">Crisis resilience & language scoring</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                    <div className="font-semibold text-slate-900 dark:text-white">Fast-Track Onboarding</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">Average 13.8 days time-to-deploy</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                    <div className="font-semibold text-slate-900 dark:text-white">HEAT Training Integration</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">Automated safety module enrollment</div>
                  </div>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-md space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-neutral-800">
                  <span className="font-semibold text-slate-900 dark:text-white">Active Recruitment Pipeline Telemetry</span>
                  <span className="text-[10px] font-mono text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded">42 in Pipe</span>
                </div>
                <div className="space-y-2">
                  {[
                    { stage: "Vetted Applications", count: 18, pct: "98% pass rate" },
                    { stage: "Field Simulation & Triage Exam", count: 12, pct: "92% pass rate" },
                    { stage: "Medical & Security Clearance", count: 8, pct: "100% verified" },
                    { stage: "Executive Appointment Offer", count: 4, pct: "3 accepted" }
                  ].map((s, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-slate-50 dark:bg-neutral-950 flex items-center justify-between">
                      <span className="font-medium text-slate-800 dark:text-neutral-200">{s.stage}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold tabular-nums text-slate-900 dark:text-white">{s.count}</span>
                        <span className="text-[10px] text-slate-400">({s.pct})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeArchitectureModule === "attendance" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-semibold">
                  ENGINE: FIELD-PRESENCE-V2
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-slate-950 dark:text-white">
                  Biometric Time, Shift Handover & Rest Accrual
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
                  Real-time station turnstile integration and satellite beacon presence verification. Automatically tracks mandatory Rest & Recuperation (R&R) cycles, rotational shift handovers, and emergency curfew compliance.
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                    <div className="font-semibold text-slate-900 dark:text-white">RFID Turnstile Sync</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">Hardware beacon gate authentication</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                    <div className="font-semibold text-slate-900 dark:text-white">R&R Statutory Accruals</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">Automated 14-day rotational leave rules</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                    <div className="font-semibold text-slate-900 dark:text-white">Satellite Geofencing</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">Iridium & Starlink safe perimeter logs</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                    <div className="font-semibold text-slate-900 dark:text-white">Zero Ghost Workers</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">Biometric proof of life for NGO grants</div>
                  </div>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-md space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-neutral-800">
                  <span className="font-semibold text-slate-900 dark:text-white">Shift Handover & Attendance Verification</span>
                  <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">97.2% On-Duty</span>
                </div>
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-950 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900 dark:text-white">Kabul Mission Hub — Morning Shift Handover</span>
                      <span className="text-[10px] font-mono text-indigo-600">08:00 UTC</span>
                    </div>
                    <p className="text-[11px] text-slate-500">48/48 specialists scanned through security portal. Triage units handed over.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-950 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900 dark:text-white">Cox&apos;s Bazar — Potable Lab Shift Handover</span>
                      <span className="text-[10px] font-mono text-indigo-600">06:30 UTC</span>
                    </div>
                    <p className="text-[11px] text-slate-500">54/54 engineers verified. Desalination telemetry logged to Geneva dashboard.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeArchitectureModule === "vault" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-semibold">
                  ENGINE: CRYPTO-VAULT-V4
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-slate-950 dark:text-white">
                  Tamper-Evident Cryptographic Document Vault
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
                  Cryptographically sealed storage for contracts, diplomatic passports, WHO medical licenses, and IRS Form 990 audit filings. Encrypted with hardware-isolated AES-256-GCM and content-addressable SHA-256 hashes.
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                    <div className="font-semibold text-slate-900 dark:text-white">Hardware AES-256-GCM</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">HSM FIPS 140-2 Level 3 root key</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                    <div className="font-semibold text-slate-900 dark:text-white">7-Year WORM Storage</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">Write-Once-Read-Many statutory audit</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                    <div className="font-semibold text-slate-900 dark:text-white">SHA-256 Checksums</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">Immutable proof against tampering</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                    <div className="font-semibold text-slate-900 dark:text-white">Automated Expiry Audits</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">Proactive 60/30 day credential alarms</div>
                  </div>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-md space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-neutral-800">
                  <span className="font-semibold text-slate-900 dark:text-white">Tamper-Evident Vault Inspector</span>
                  <span className="text-[10px] font-mono text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded">FIPS-140-2</span>
                </div>
                <div className="space-y-2 font-mono text-[11px]">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-neutral-950 border border-slate-200/60 dark:border-neutral-800">
                    <div className="text-slate-400 text-[10px]">RECORD: IRS-990-SCHEDULE-F-2026.PDF</div>
                    <div className="text-indigo-600 dark:text-indigo-400 truncate">SHA256: 8f4c2b9a710e54d3e421c9a63b0198f2</div>
                    <div className="text-emerald-600 text-[10px] mt-0.5">✓ Cryptographic Signature Intact</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-neutral-950 border border-slate-200/60 dark:border-neutral-800">
                    <div className="text-slate-400 text-[10px]">RECORD: WHO-SURGICAL-REGISTRAR-ALMANSOOR.PDF</div>
                    <div className="text-indigo-600 dark:text-indigo-400 truncate">SHA256: e3b0c44298fc1c149afbf4c8996fb924</div>
                    <div className="text-emerald-600 text-[10px] mt-0.5">✓ Cryptographic Signature Intact</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeArchitectureModule === "automation" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-semibold">
                  ENGINE: EVENT-BUS-V3.2
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-slate-950 dark:text-white">
                  Event-Driven Distributed HR Automation Bus
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
                  No-code humanitarian pipeline builder that turns mission milestones into automated multi-step workflows. Dispatches emergency stipends, notifies crisis centers, and provisions satellite communication channels with atomic execution.
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                    <div className="font-semibold text-slate-900 dark:text-white">Zero-Code Node Builder</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">Trigger ➔ Condition ➔ Multi-Action</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                    <div className="font-semibold text-slate-900 dark:text-white">Sub-500ms Latency</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">Distributed execution across global edge</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                    <div className="font-semibold text-slate-900 dark:text-white">Atomic Rollback Guarantee</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">Safe transactional integrity on error</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                    <div className="font-semibold text-slate-900 dark:text-white">Webhook & PTT Triggers</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">Supports satellite radio and UN APIs</div>
                  </div>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-md space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-neutral-800">
                  <span className="font-semibold text-slate-900 dark:text-white">Workflow Execution Performance</span>
                  <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">99.99% Reliability</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-neutral-950 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Crisis Red Alert Pipeline</div>
                      <div className="text-slate-500 text-[10px]">Triggered: UN OCHA Webhook</div>
                    </div>
                    <span className="font-mono text-[10px] text-emerald-600 font-semibold">420ms (0 Errors)</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-neutral-950 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Biometric Pass Renewal Pipeline</div>
                      <div className="text-slate-500 text-[10px]">Triggered: 30-Day Expiry Cron</div>
                    </div>
                    <span className="font-mono text-[10px] text-emerald-600 font-semibold">340ms (0 Errors)</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-neutral-950 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Specialist Appointment Protocol</div>
                      <div className="text-slate-500 text-[10px]">Triggered: Signed Agreement</div>
                    </div>
                    <span className="font-mono text-[10px] text-emerald-600 font-semibold">280ms (0 Errors)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. INTERACTIVE WORKFLOW PRESET SIMULATOR */}
      <section className="py-20 bg-slate-100/70 dark:bg-[#09090d] border-y border-slate-200 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                Interactive Visual Automation Engine
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-slate-950 dark:text-white tracking-tight">
                Put your mission-critical HR workflows on automated autopilot.
              </h2>
              <p className="text-slate-600 dark:text-neutral-400 text-sm leading-relaxed">
                Choose a workflow preset below to watch the event-driven node graph dynamically reconfigure in real time:
              </p>

              {/* 4 Interactive Workflow Preset Buttons */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: "crisis", label: "Crisis Red Alert Evacuation" },
                  { id: "visa", label: "Diplomatic Visa Dispatch" },
                  { id: "recert", label: "Medical Recertification" },
                  { id: "grant", label: "Grant Labor Allocation" }
                ].map((pst) => (
                  <button
                    key={pst.id}
                    onClick={() => setWorkflowPreset(pst.id as "crisis" | "visa" | "recert" | "grant")}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      workflowPreset === pst.id
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md font-semibold"
                        : "bg-white dark:bg-neutral-900 text-slate-700 dark:text-neutral-300 border-slate-200 dark:border-neutral-800 hover:border-indigo-400"
                    }`}
                  >
                    <span>{pst.label}</span>
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/workspace/automation"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
                >
                  <span>Build custom humanitarian DAGs in the workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Dynamically Reactive Visual Workflow Node Preview */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-neutral-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Active DAG Graph ({workflowPreset.toUpperCase()} PROTOCOL)
                </span>
                <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded font-semibold">
                  Valid Node Tree
                </span>
              </div>

              {workflowPreset === "crisis" && (
                <>
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                        <span className="text-xs font-semibold text-rose-700 dark:text-rose-300">TRIGGER: EVENT</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">UN.OCHA.CrisisAlert</span>
                    </div>
                    <div className="text-xs font-medium text-slate-900 dark:text-white mt-1">
                      Threat condition elevated to Level 4 (Emergency Evacuation Order Declared)
                    </div>
                  </div>
                  <div className="flex justify-center -my-1"><div className="w-0.5 h-6 bg-slate-300 dark:bg-neutral-700" /></div>
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">CONDITION RULE</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">Personnel.OnStation == True</span>
                    </div>
                    <div className="text-xs font-medium text-slate-900 dark:text-white mt-1">
                      Filter for all specialists stationed inside affected geographical polygon
                    </div>
                  </div>
                  <div className="flex justify-center -my-1"><div className="w-0.5 h-6 bg-slate-300 dark:bg-neutral-700" /></div>
                  <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">AUTOMATED ACTIONS (3)</span>
                      </div>
                      <span className="text-[10px] font-mono text-indigo-600">Atomic Execution</span>
                    </div>
                    <ul className="text-xs text-slate-700 dark:text-neutral-300 mt-2 space-y-1 list-disc list-inside">
                      <li>Activate emergency satellite transponders & GPS beacons</li>
                      <li>Disburse $1,200 emergency hazard stipend via NACHA FedACH</li>
                      <li>Transmit encrypted PGP crisis telemetry to Geneva Security Desk</li>
                    </ul>
                  </div>
                </>
              )}

              {workflowPreset === "visa" && (
                <>
                  <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">TRIGGER: WEBHOOK</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">DocuSign.AppointmentSigned</span>
                    </div>
                    <div className="text-xs font-medium text-slate-900 dark:text-white mt-1">
                      New Specialist executes digital Letter of Appointment for Foreign Station
                    </div>
                  </div>
                  <div className="flex justify-center -my-1"><div className="w-0.5 h-6 bg-slate-300 dark:bg-neutral-700" /></div>
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">CONDITION RULE</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">DutyStation.RequiresDiplomaticVisa == True</span>
                    </div>
                    <div className="text-xs font-medium text-slate-900 dark:text-white mt-1">
                      Verify candidate holds valid passport with 12+ months remaining validity
                    </div>
                  </div>
                  <div className="flex justify-center -my-1"><div className="w-0.5 h-6 bg-slate-300 dark:bg-neutral-700" /></div>
                  <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">AUTOMATED ACTIONS (3)</span>
                      </div>
                      <span className="text-[10px] font-mono text-indigo-600">Atomic Execution</span>
                    </div>
                    <ul className="text-xs text-slate-700 dark:text-neutral-300 mt-2 space-y-1 list-disc list-inside">
                      <li>Generate official diplomatic sponsor letters with SHA-256 seal</li>
                      <li>Transmit packet to host nation Ministry of Foreign Affairs API</li>
                      <li>Issue itinerary booking authorization & travel insurance binder</li>
                    </ul>
                  </div>
                </>
              )}

              {workflowPreset === "recert" && (
                <>
                  <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">TRIGGER: SCHEDULE</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">Cron(0 0 1 * *) — 30-Day Lookahead</span>
                    </div>
                    <div className="text-xs font-medium text-slate-900 dark:text-white mt-1">
                      System evaluates all clinical credentials expiring within next 30 days
                    </div>
                  </div>
                  <div className="flex justify-center -my-1"><div className="w-0.5 h-6 bg-slate-300 dark:bg-neutral-700" /></div>
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">CONDITION RULE</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">Credential.Category == &quot;Clinical_Medical&quot;</span>
                    </div>
                    <div className="text-xs font-medium text-slate-900 dark:text-white mt-1">
                      Check yellow fever vaccine expiry and WHO surgical registration status
                    </div>
                  </div>
                  <div className="flex justify-center -my-1"><div className="w-0.5 h-6 bg-slate-300 dark:bg-neutral-700" /></div>
                  <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">AUTOMATED ACTIONS (3)</span>
                      </div>
                      <span className="text-[10px] font-mono text-indigo-600">Atomic Execution</span>
                    </div>
                    <ul className="text-xs text-slate-700 dark:text-neutral-300 mt-2 space-y-1 list-disc list-inside">
                      <li>Auto-schedule telehealth clinical verification exam</li>
                      <li>Notify Station Commander and designated Medical Director</li>
                      <li>Sync biometric turnstile RFID pass to prevent field lockout</li>
                    </ul>
                  </div>
                </>
              )}

              {workflowPreset === "grant" && (
                <>
                  <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">TRIGGER: EVENT</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">Timesheet.MonthlyApproved</span>
                    </div>
                    <div className="text-xs font-medium text-slate-900 dark:text-white mt-1">
                      Station Commander approves monthly personnel timesheet ledger
                    </div>
                  </div>
                  <div className="flex justify-center -my-1"><div className="w-0.5 h-6 bg-slate-300 dark:bg-neutral-700" /></div>
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">CONDITION RULE</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">FundingSource == &quot;Restricted_Humanitarian_Grant&quot;</span>
                    </div>
                    <div className="text-xs font-medium text-slate-900 dark:text-white mt-1">
                      Check grant allocation percentage against UNHCR and USAID compliance caps
                    </div>
                  </div>
                  <div className="flex justify-center -my-1"><div className="w-0.5 h-6 bg-slate-300 dark:bg-neutral-700" /></div>
                  <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">AUTOMATED ACTIONS (3)</span>
                      </div>
                      <span className="text-[10px] font-mono text-indigo-600">Atomic Execution</span>
                    </div>
                    <ul className="text-xs text-slate-700 dark:text-neutral-300 mt-2 space-y-1 list-disc list-inside">
                      <li>Map specialist labor hours directly to Grant #UN-2026-WASH general ledger</li>
                      <li>Generate audit-ready labor time certification sheet</li>
                      <li>Archive signed verification PDF to 7-year WORM storage vault</li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. OPERATIONAL CAPACITY & ROI CALCULATOR */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            Operational Capacity & ROI Engine
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-slate-950 dark:text-white tracking-tight">
            Quantify the administrative time and cost savings.
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
            Adjust the sliders below to see real-time impact on administrative hours, statutory compliance risk, and annual cost savings for your humanitarian organization:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Column */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-lg space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-neutral-300">
                  Total Deployed Workforce (Specialists)
                </label>
                <span className="text-xl font-bold tabular-nums text-indigo-600 dark:text-indigo-400">
                  {roiHeadcount} FTE
                </span>
              </div>
              <input
                type="range"
                min="25"
                max="1000"
                step="5"
                value={roiHeadcount}
                onChange={(e) => setRoiHeadcount(Number(e.target.value))}
                className="w-full cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>25 Personnel</span>
                <span>500 Personnel</span>
                <span>1,000 Personnel</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-neutral-300">
                  Active Global Duty Stations / Hubs
                </label>
                <span className="text-xl font-bold tabular-nums text-indigo-600 dark:text-indigo-400">
                  {roiStations} Stations
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={roiStations}
                onChange={(e) => setRoiStations(Number(e.target.value))}
                className="w-full cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>1 Hub</span>
                <span>12 Hubs</span>
                <span>25 Hubs</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-slate-500 space-y-1">
              <div className="font-semibold text-slate-800 dark:text-neutral-200">Formula Methodology:</div>
              <div>Calculated using 3.4 administrative hours saved per specialist/mo (onboarding, timesheet reconciliation, NACHA processing, and visa audits) multiplied by blended operational salary rates.</div>
            </div>
          </div>

          {/* Outputs Column */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-neutral-900/80 border border-slate-200 dark:border-white/[0.08] shadow-sm">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Monthly Admin Hours Saved</div>
              <div className="text-3xl sm:text-4xl font-bold tabular-nums text-indigo-600 dark:text-indigo-400 mt-2">
                {Math.round(roiHeadcount * 3.4)} hrs
              </div>
              <div className="text-xs text-slate-500 mt-1">Replaces manual timesheet calculations</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-neutral-900/80 border border-slate-200 dark:border-white/[0.08] shadow-sm">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Payroll Cycle Time Reduction</div>
              <div className="text-3xl sm:text-4xl font-bold tabular-nums text-slate-950 dark:text-white mt-2">
                98.6%
              </div>
              <div className="text-xs text-slate-500 mt-1">From 6 business days to 14 minutes</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-neutral-900/80 border border-slate-200 dark:border-white/[0.08] shadow-sm">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Audit & Tax Discrepancy Rate</div>
              <div className="text-3xl sm:text-4xl font-bold tabular-nums text-slate-950 dark:text-white mt-2">
                0.00%
              </div>
              <div className="text-xs text-slate-500 mt-1">Full 501(c)(3) & Sec 911 compliance</div>
            </div>

            <div className="p-6 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/40 shadow-sm">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-indigo-600 dark:text-indigo-400">Projected Annual Savings</div>
              <div className="text-3xl sm:text-4xl font-bold tabular-nums text-indigo-700 dark:text-indigo-300 mt-2">
                ${Math.round(roiHeadcount * 1840 + roiStations * 8500).toLocaleString()}
              </div>
              <div className="text-xs text-slate-500 mt-1">Consolidated operational ROI</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. INTEGRATIONS ECOSYSTEM */}
      <section className="py-20 bg-slate-100/60 dark:bg-[#09090d] border-y border-slate-200 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            Connected Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white tracking-tight mt-2 mb-4">
            Connects seamlessly with your existing tools.
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 text-sm max-w-2xl mx-auto mb-12">
            No messy migrations or broken syncs. Direct two-way native integrations with leading enterprise software.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "Slack", category: "Alerts & Approvals", status: "Live" },
              { name: "Google Workspace", category: "SAML SSO & Directory", status: "Live" },
              { name: "Microsoft 365", category: "Azure AD & Calendar", status: "Live" },
              { name: "Stripe Connect", category: "Billing & Payouts", status: "Live" },
              { name: "QuickBooks Online", category: "General Ledger Sync", status: "Live" },
              { name: "AWS S3 Vault", category: "7-Year WORM Storage", status: "Live" }
            ].map((app, i) => (
              <div key={i} className="p-4 rounded-xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs text-left">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center text-xs">
                    {app.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    {app.status}
                  </span>
                </div>
                <div className="font-semibold text-xs text-slate-900 dark:text-white">{app.name}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{app.category}</div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/integrations"
              className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <span>Explore all 40+ supported integrations & REST API specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. PRICING SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            Predictable SaaS Pricing
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-slate-950 dark:text-white tracking-tight">
            Transparent pricing that scales with your headcount.
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 text-sm">
            No surprise implementation fees. All plans include 14-day full access.
          </p>

          {/* Billing cycle toggle */}
          <div className="inline-flex items-center gap-2 p-1 rounded-xl bg-slate-200/80 dark:bg-neutral-800 text-xs font-semibold mt-4">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-1.5 rounded-lg transition cursor-pointer ${
                billingCycle === "monthly" ? "bg-white dark:bg-neutral-900 text-slate-900 dark:text-white shadow-xs" : "text-slate-500"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-4 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                billingCycle === "annual" ? "bg-white dark:bg-neutral-900 text-slate-900 dark:text-white shadow-xs" : "text-slate-500"
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-600">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingTiers.map((tier, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl bg-white dark:bg-[#121216] border transition-all flex flex-col justify-between ${
                tier.popular
                  ? "border-indigo-500 shadow-xl shadow-indigo-500/10 relative"
                  : "border-slate-200 dark:border-white/[0.08] shadow-xs"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-600 text-white uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold text-slate-950 dark:text-white">{tier.name}</h3>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1 min-h-[32px]">{tier.desc}</p>

                <div className="my-6">
                  <span className="text-4xl font-extrabold text-slate-950 dark:text-white">{tier.price}</span>
                  <span className="text-xs text-slate-500 dark:text-neutral-400 ml-1.5">/ {tier.period}</span>
                </div>

                <div className="space-y-2.5 text-xs text-slate-700 dark:text-neutral-300">
                  {tier.features.map((f, fi) => (
                    <div key={fi} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/[0.06]">
                <Link
                  href={tier.ctaHref}
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center transition cursor-pointer ${
                    tier.popular
                      ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20"
                      : "bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-900 dark:text-white"
                  }`}
                >
                  {tier.ctaText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section className="py-20 bg-slate-100/60 dark:bg-[#09090d] border-y border-slate-200 dark:border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white tracking-tight">
              Everything you need to know about PeopleCore.
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs"
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left text-sm font-semibold text-slate-950 dark:text-white cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      faqOpen === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {faqOpen === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed pt-3 mt-3 border-t border-slate-100 dark:border-white/[0.04]">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FINAL HIGH-CONVERSION CTA */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-black text-white p-8 sm:p-14 overflow-hidden border border-indigo-500/30 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" /> Modernize your workforce operations
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Ready to give your people team the tools they deserve?
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Join thousands of forward-thinking organizations using PeopleCore to streamline hiring, payroll, attendance, and team performance.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link
                href="/auth?mode=signup"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-neutral-950 font-semibold text-sm shadow-xl flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <span>Start your 14-day free trial</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-md flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Schedule a 1-on-1 demo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DEMO BOOKING MODAL */}
      <AnimatePresence>
        {isDemoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.1] rounded-2xl p-6 shadow-2xl space-y-4 text-left relative"
            >
              <button
                onClick={() => setIsDemoModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 transition"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <CalendarCheck className="w-5 h-5" />
                <h3 className="text-lg font-bold text-slate-950 dark:text-white">Book an Executive Demo</h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-neutral-400">
                Our HR technology specialists will tailor a 20-minute live tour to your company size and regulatory requirements.
              </p>

              {demoFormSubmitted ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Demo Scheduled!</h4>
                  <p className="text-xs text-slate-600 dark:text-neutral-300">
                    A calendar invitation and pre-meeting questionnaire has been sent to your work email.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleDemoSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={demoFormData.name}
                      onChange={(e) => setDemoFormData({ ...demoFormData, name: e.target.value })}
                      placeholder="Sarah Jenkins"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={demoFormData.email}
                      onChange={(e) => setDemoFormData({ ...demoFormData, email: e.target.value })}
                      placeholder="sarah@acme.com"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">Company Name *</label>
                      <input
                        type="text"
                        required
                        value={demoFormData.company}
                        onChange={(e) => setDemoFormData({ ...demoFormData, company: e.target.value })}
                        placeholder="Acme Corp"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">Team Size</label>
                      <select
                        value={demoFormData.teamSize}
                        onChange={(e) => setDemoFormData({ ...demoFormData, teamSize: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white focus:outline-none cursor-pointer"
                      >
                        <option value="1-25">1-25 employees</option>
                        <option value="25-100">25-100 employees</option>
                        <option value="100-500">100-500 employees</option>
                        <option value="500+">500+ employees</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">Primary Interest / Questions</label>
                    <textarea
                      rows={2}
                      value={demoFormData.message}
                      onChange={(e) => setDemoFormData({ ...demoFormData, message: e.target.value })}
                      placeholder="We want to migrate from BambooHR and consolidate payroll..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition cursor-pointer shadow-md shadow-indigo-600/25"
                    >
                      Confirm Demo Request
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
