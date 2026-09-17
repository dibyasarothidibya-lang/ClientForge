export type UserRole = "Owner" | "Administrator" | "Manager" | "Finance" | "Auditor" | "Member";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  type: string;
  logo: string;
  plan: "Starter" | "Growth" | "Business" | "Enterprise";
  memberCount: number;
  currency: string;
  timezone: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  team: string;
  type: "Full-time" | "Contractor" | "Volunteer";
  status: "Active" | "On Leave" | "Invited";
  avatar: string;
  joinDate: string;
  skills: string[];
  assignedProjects: number;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: "Backlog" | "To Do" | "In Progress" | "In Review" | "Done";
  priority: "Low" | "Medium" | "High" | "Critical";
  assignee: Member;
  dueDate: string;
  labels: string[];
  subtasks: { id: string; title: string; completed: boolean }[];
  commentsCount: number;
}

export interface Project {
  id: string;
  name: string;
  code: string;
  description: string;
  status: "Active" | "Planning" | "At Risk" | "Completed";
  lead: Member;
  department: string;
  startDate: string;
  targetDate: string;
  budget: number;
  spent: number;
  progress: number;
  taskCount: number;
  membersCount: number;
}

export interface AuditFinding {
  id: string;
  auditId: string;
  title: string;
  description: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  likelihood: "Low" | "Medium" | "High";
  impact: "Low" | "Medium" | "High";
  status: "Open" | "In Progress" | "Resolved" | "Verified";
  owner: string;
  department: string;
  dueDate: string;
  correctiveAction: string;
  evidenceNotes: string;
}

export interface Audit {
  id: string;
  title: string;
  code: string;
  leadAuditor: Member;
  department: string;
  status: "Planning" | "Fieldwork" | "Review" | "Closed";
  progress: number;
  startDate: string;
  dueDate: string;
  findingsCount: number;
  criticalCount: number;
}

export interface Campaign {
  id: string;
  title: string;
  slug: string;
  goal: number;
  raised: number;
  donorCount: number;
  startDate: string;
  endDate: string;
  status: "Active" | "Completed" | "Draft";
  description: string;
  coverImage: string;
}

export interface Transaction {
  id: string;
  campaignId?: string;
  type: "Donation" | "Expense" | "Grant";
  amount: number;
  status: "Succeeded" | "Processing" | "Refunded";
  donorOrVendor: string;
  method: string;
  date: string;
  reference: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  type: "PDF" | "Spreadsheet" | "Doc" | "Image";
  size: string;
  category: "Governance" | "Financials" | "Audits" | "Projects";
  owner: string;
  version: string;
  updatedAt: string;
  tags: string[];
}

export interface ApprovalRequest {
  id: string;
  title: string;
  type: "Expense Request" | "Budget Allocation" | "Leave Request" | "Scope Sign-off" | "Audit Closure";
  requester: Member;
  amount?: number;
  status: "Pending" | "Approved" | "Rejected";
  submittedAt: string;
  currentStep: string;
  justification: string;
}

export interface ActivityEvent {
  id: string;
  actor: string;
  actorAvatar: string;
  action: string;
  target: string;
  resourceType: string;
  timestamp: string;
  metadata?: string;
}

// -------------------------------------------------------------
// PRIMARY SEEDED ORGANIZATIONS
// -------------------------------------------------------------
export const primaryOrg: Organization = {
  id: "org_hope",
  name: "Hope Foundation",
  slug: "hope-foundation",
  type: "Nonprofit & Humanitarian Aid",
  logo: "/logo.jpg",
  plan: "Business",
  memberCount: 142,
  currency: "USD ($)",
  timezone: "UTC-5 (Eastern Time)",
};

export const alternateOrg: Organization = {
  id: "org_forgeworks",
  name: "ForgeWorks Global",
  slug: "forgeworks",
  type: "Social Impact Consulting Agency",
  logo: "/logo.jpg",
  plan: "Enterprise",
  memberCount: 88,
  currency: "USD ($)",
  timezone: "UTC+0 (London)",
};

// -------------------------------------------------------------
// SEEDED MEMBERS
// -------------------------------------------------------------
export const demoMembers: Member[] = [
  {
    id: "mem_1",
    name: "Dr. Sarah Lin",
    email: "s.lin@hopefoundation.org",
    role: "Owner",
    department: "Executive & Governance",
    team: "Executive Board",
    type: "Full-time",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
    joinDate: "Jan 12, 2023",
    skills: ["Strategic Governance", "Operations", "Donor Relations"],
    assignedProjects: 4,
  },
  {
    id: "mem_2",
    name: "Marcus Thorne",
    email: "m.thorne@hopefoundation.org",
    role: "Administrator",
    department: "Technology & Systems",
    team: "Security & IT",
    type: "Full-time",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80",
    joinDate: "Mar 05, 2023",
    skills: ["Cloud Architecture", "RBAC", "Data Security", "Next.js"],
    assignedProjects: 5,
  },
  {
    id: "mem_3",
    name: "Elena Rostova",
    email: "e.rostova@hopefoundation.org",
    role: "Auditor",
    department: "Finance & Compliance",
    team: "Internal Audit Team",
    type: "Full-time",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80",
    joinDate: "Jun 18, 2023",
    skills: ["Risk Assessment", "Internal Audits", "GDPR", "Financial Controls"],
    assignedProjects: 3,
  },
  {
    id: "mem_4",
    name: "Julian Vance",
    email: "j.vance@hopefoundation.org",
    role: "Finance",
    department: "Finance & Compliance",
    team: "Treasury & Budgets",
    type: "Full-time",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    joinDate: "Feb 01, 2024",
    skills: ["Stripe Integration", "Budget Modeling", "Grant Tracking"],
    assignedProjects: 4,
  },
  {
    id: "mem_5",
    name: "Amara Patel",
    email: "a.patel@hopefoundation.org",
    role: "Manager",
    department: "Operations & Field Services",
    team: "Clean Water Taskforce",
    type: "Full-time",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200&auto=format&fit=crop&q=80",
    joinDate: "Aug 14, 2023",
    skills: ["Field Operations", "Program Logistics", "Vendor Management"],
    assignedProjects: 3,
  },
  {
    id: "mem_6",
    name: "David Chen",
    email: "d.chen@hopefoundation.org",
    role: "Member",
    department: "Programs & Outreach",
    team: "Digital Literacy",
    type: "Volunteer",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    joinDate: "Nov 10, 2024",
    skills: ["Curriculum Design", "Mentorship", "Community Engagement"],
    assignedProjects: 2,
  },
  {
    id: "mem_7",
    name: "Sophia Martinez",
    email: "s.martinez@hopefoundation.org",
    role: "Member",
    department: "Fundraising & Partnerships",
    team: "Donor Relations",
    type: "Full-time",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    joinDate: "Apr 22, 2024",
    skills: ["Major Gifts", "Campaign Storytelling", "Stripe Checkout"],
    assignedProjects: 3,
  },
  {
    id: "mem_8",
    name: "Kofi Mensah",
    email: "k.mensah@hopefoundation.org",
    role: "Member",
    department: "Operations & Field Services",
    team: "Clean Water Taskforce",
    type: "Contractor",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    joinDate: "Jan 15, 2025",
    skills: ["Civil Engineering", "Water Testing", "Procurement"],
    assignedProjects: 2,
  }
];

// -------------------------------------------------------------
// SEEDED PROJECTS & TASKS
// -------------------------------------------------------------
export const demoProjects: Project[] = [
  {
    id: "proj_1",
    name: "Clean Water Pipeline 2026",
    code: "CWP-26",
    description: "Constructing gravity-fed freshwater distribution networks serving 18 rural health posts.",
    status: "Active",
    lead: demoMembers[4],
    department: "Operations & Field Services",
    startDate: "Jan 15, 2026",
    targetDate: "Nov 30, 2026",
    budget: 280000,
    spent: 142500,
    progress: 58,
    taskCount: 34,
    membersCount: 8,
  },
  {
    id: "proj_2",
    name: "Digital Skills & Youth Tech Labs",
    code: "DSY-26",
    description: "Equipping community centers with refurbished laptops and verified coding curricula.",
    status: "Active",
    lead: demoMembers[5],
    department: "Programs & Outreach",
    startDate: "Feb 01, 2026",
    targetDate: "Aug 15, 2026",
    budget: 95000,
    spent: 68400,
    progress: 72,
    taskCount: 22,
    membersCount: 6,
  },
  {
    id: "proj_3",
    name: "Q2 Financial & Procurement Audit",
    code: "AUD-Q2",
    description: "Full internal review of vendor contracts exceeding $10,000 and statutory tax filings.",
    status: "At Risk",
    lead: demoMembers[2],
    department: "Finance & Compliance",
    startDate: "Apr 01, 2026",
    targetDate: "Jun 30, 2026",
    budget: 35000,
    spent: 24000,
    progress: 40,
    taskCount: 16,
    membersCount: 4,
  },
  {
    id: "proj_4",
    name: "Global Clean Energy Grant Rollout",
    code: "NRG-26",
    description: "Installing rooftop solar and battery storage in four regional humanitarian logistics hubs.",
    status: "Planning",
    lead: demoMembers[0],
    department: "Executive & Governance",
    startDate: "Jul 01, 2026",
    targetDate: "Dec 15, 2026",
    budget: 450000,
    spent: 12000,
    progress: 12,
    taskCount: 18,
    membersCount: 5,
  }
];

export const demoTasks: Task[] = [
  {
    id: "task_1",
    projectId: "proj_1",
    title: "Verify borehole filtration pressure telemetry",
    description: "Inspect IoT sensor logs for pressure loss in Sector 4 feeder pipeline.",
    status: "In Progress",
    priority: "High",
    assignee: demoMembers[7],
    dueDate: "2026-09-22",
    labels: ["Engineering", "Telemetry", "Fieldwork"],
    subtasks: [
      { id: "st_1", title: "Review sensor raw packets", completed: true },
      { id: "st_2", title: "Conduct on-site valve calibration", completed: false },
      { id: "st_3", title: "Upload verification report to Documents", completed: false },
    ],
    commentsCount: 3,
  },
  {
    id: "task_2",
    projectId: "proj_1",
    title: "Submit Q3 pipe procurement expense receipt",
    description: "Reconcile vendor invoice #INV-8832 from Apex Pipeworks with budget allocation.",
    status: "To Do",
    priority: "Medium",
    assignee: demoMembers[4],
    dueDate: "2026-09-25",
    labels: ["Finance", "Procurement"],
    subtasks: [
      { id: "st_4", title: "Attach PDF invoice", completed: true },
      { id: "st_5", title: "Route to Julian Vance for approval", completed: false },
    ],
    commentsCount: 1,
  },
  {
    id: "task_3",
    projectId: "proj_2",
    title: "Deploy 25 refurbished laptops to Highland Center",
    description: "Install Linux OS, offline educational packages, and device management tokens.",
    status: "Done",
    priority: "High",
    assignee: demoMembers[5],
    dueDate: "2026-09-14",
    labels: ["Hardware", "Education"],
    subtasks: [
      { id: "st_6", title: "Image all machines", completed: true },
      { id: "st_7", title: "Asset tagging & serial logging", completed: true },
      { id: "st_8", title: "Signed handover document received", completed: true },
    ],
    commentsCount: 4,
  },
  {
    id: "task_4",
    projectId: "proj_3",
    title: "Corrective Action: Reconcile missing vendor W-9 files",
    description: "High-priority audit finding resolution: collect missing tax forms from 4 contractors.",
    status: "In Review",
    priority: "Critical",
    assignee: demoMembers[3],
    dueDate: "2026-09-20",
    labels: ["Compliance", "Audit-Finding"],
    subtasks: [
      { id: "st_9", title: "Contact contractors via secure link", completed: true },
      { id: "st_10", title: "Store encrypted files in Documents / Governance", completed: true },
      { id: "st_11", title: "Auditor Elena Rostova verification", completed: false },
    ],
    commentsCount: 5,
  },
  {
    id: "task_5",
    projectId: "proj_1",
    title: "Schedule community water committee training",
    description: "Train 12 local volunteers on valve maintenance and chlorine sanitation monitoring.",
    status: "Backlog",
    priority: "Medium",
    assignee: demoMembers[4],
    dueDate: "2026-10-05",
    labels: ["Community", "Training"],
    subtasks: [
      { id: "st_12", title: "Translate manual to regional dialect", completed: false },
      { id: "st_13", title: "Print laminated emergency protocols", completed: false },
    ],
    commentsCount: 0,
  }
];

// -------------------------------------------------------------
// SEEDED AUDITS & FINDINGS (STANDOUT MODULE)
// -------------------------------------------------------------
export const demoAudits: Audit[] = [
  {
    id: "aud_1",
    title: "Q1 Financial Controls & Cash Handling",
    code: "AUD-2026-01",
    leadAuditor: demoMembers[2],
    department: "Finance & Compliance",
    status: "Review",
    progress: 88,
    startDate: "Jan 10, 2026",
    dueDate: "Sep 28, 2026",
    findingsCount: 4,
    criticalCount: 1,
  },
  {
    id: "aud_2",
    title: "Field Asset & Safety Compliance Audit",
    code: "AUD-2026-02",
    leadAuditor: demoMembers[2],
    department: "Operations & Field Services",
    status: "Fieldwork",
    progress: 55,
    startDate: "Feb 15, 2026",
    dueDate: "Oct 15, 2026",
    findingsCount: 6,
    criticalCount: 2,
  },
  {
    id: "aud_3",
    title: "Data Protection & Donor Privacy Review",
    code: "AUD-2026-03",
    leadAuditor: demoMembers[1],
    department: "Technology & Systems",
    status: "Closed",
    progress: 100,
    startDate: "Mar 01, 2026",
    dueDate: "Jun 30, 2026",
    findingsCount: 2,
    criticalCount: 0,
  }
];

export const demoFindings: AuditFinding[] = [
  {
    id: "fnd_1",
    auditId: "aud_1",
    title: "Dual-authorization threshold bypassed on 2 vendor transfers",
    description: "Two electronic disbursements over $25,000 processed without second executive sign-off.",
    severity: "Critical",
    likelihood: "Medium",
    impact: "High",
    status: "In Progress",
    owner: "Julian Vance (Finance)",
    department: "Finance & Compliance",
    dueDate: "2026-09-24",
    correctiveAction: "Enforce programmatic hard-lock in approval engine for any disbursement > $10,000.",
    evidenceNotes: "Bank statement reconciliation and ledger audit log attached.",
  },
  {
    id: "fnd_2",
    auditId: "aud_2",
    title: "Uncalibrated water safety test reagents in Sector 4",
    description: "Water testing kits expired 45 days prior to field sample analysis.",
    severity: "High",
    likelihood: "High",
    impact: "Medium",
    status: "Open",
    owner: "Amara Patel (Operations)",
    department: "Operations & Field Services",
    dueDate: "2026-09-30",
    correctiveAction: "Immediate batch recall and distribution of certified digital spectrophotometers.",
    evidenceNotes: "Field inspector inspection checklist log attached.",
  },
  {
    id: "fnd_3",
    auditId: "aud_1",
    title: "Missing vendor W-9 and entity verification files",
    description: "Four subcontracted drilling firms missing verified EIN documentation.",
    severity: "Medium",
    likelihood: "Medium",
    impact: "Medium",
    status: "Resolved",
    owner: "Julian Vance (Finance)",
    department: "Finance & Compliance",
    dueDate: "2026-09-18",
    correctiveAction: "Collected certified tax forms from all 4 entities and archived in encrypted storage.",
    evidenceNotes: "W-9 forms verified by Elena Rostova.",
  },
  {
    id: "fnd_4",
    auditId: "aud_2",
    title: "Inconsistent PPE check-in log during warehouse shift handover",
    description: "Paper logbook missing supervisor sign-offs on 6 shifts.",
    severity: "Low",
    likelihood: "Low",
    impact: "Low",
    status: "Verified",
    owner: "Kofi Mensah (Field Services)",
    department: "Operations & Field Services",
    dueDate: "2026-09-10",
    correctiveAction: "Migrated paper log to Client Forge mobile QR check-in protocol.",
    evidenceNotes: "Digital kiosk access logs verified.",
  }
];

// -------------------------------------------------------------
// SEEDED CAMPAIGNS & FINANCE
// -------------------------------------------------------------
export const demoCampaigns: Campaign[] = [
  {
    id: "cmp_1",
    title: "Clean Water for 50 Rural Villages",
    slug: "clean-water-50-villages",
    goal: 150000,
    raised: 118400,
    donorCount: 412,
    startDate: "Jan 01, 2026",
    endDate: "Oct 31, 2026",
    status: "Active",
    description: "Funding borehole construction, solar-powered pumps, and community sanitary monitoring networks.",
    coverImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "cmp_2",
    title: "Youth Tech Literacy & Refurbished Labs",
    slug: "youth-tech-literacy",
    goal: 85000,
    raised: 62750,
    donorCount: 220,
    startDate: "Feb 15, 2026",
    endDate: "Nov 15, 2026",
    status: "Active",
    description: "Putting verified coding curricula and modern laptop workstations into high-need learning centers.",
    coverImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "cmp_3",
    title: "Emergency Medical Clinic Solar Retrofit",
    slug: "medical-clinic-solar",
    goal: 120000,
    raised: 120000,
    donorCount: 310,
    startDate: "Mar 01, 2026",
    endDate: "Aug 31, 2026",
    status: "Completed",
    description: "24/7 uninterrupted solar micro-grid powering vaccine cold-storage and emergency delivery wards.",
    coverImage: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80",
  }
];

export const demoTransactions: Transaction[] = [
  {
    id: "tx_101",
    campaignId: "cmp_1",
    type: "Donation",
    amount: 5000,
    status: "Succeeded",
    donorOrVendor: "MacArthur Global Impact Fund",
    method: "Stripe ACH (Test)",
    date: "Sep 16, 2026 14:32",
    reference: "ch_test_99214A",
  },
  {
    id: "tx_102",
    campaignId: "cmp_1",
    type: "Donation",
    amount: 250,
    status: "Succeeded",
    donorOrVendor: "Rachel Sterling",
    method: "Visa •••• 4242",
    date: "Sep 16, 2026 11:15",
    reference: "ch_test_44812B",
  },
  {
    id: "tx_103",
    type: "Expense",
    amount: 14200,
    status: "Succeeded",
    donorOrVendor: "Apex Pipe & Hydro Systems",
    method: "Wire Transfer",
    date: "Sep 15, 2026 09:40",
    reference: "exp_8832_pipe",
  },
  {
    id: "tx_104",
    campaignId: "cmp_2",
    type: "Donation",
    amount: 1200,
    status: "Succeeded",
    donorOrVendor: "Hyperline Tech Collective",
    method: "Mastercard •••• 5555",
    date: "Sep 14, 2026 18:22",
    reference: "ch_test_77190C",
  },
  {
    id: "tx_105",
    type: "Expense",
    amount: 3450,
    status: "Processing",
    donorOrVendor: "CloudFleet Logistics Services",
    method: "Corporate Card",
    date: "Sep 14, 2026 13:05",
    reference: "exp_9011_freight",
  }
];

// -------------------------------------------------------------
// SEEDED DOCUMENTS
// -------------------------------------------------------------
export const demoDocuments: DocumentItem[] = [
  {
    id: "doc_1",
    name: "Hope_Foundation_Charter_2026_v2.pdf",
    type: "PDF",
    size: "2.4 MB",
    category: "Governance",
    owner: "Dr. Sarah Lin",
    version: "v2.1",
    updatedAt: "Sep 02, 2026",
    tags: ["Board", "Charter", "Legal"],
  },
  {
    id: "doc_2",
    name: "Clean_Water_Engineering_Blueprints.pdf",
    type: "PDF",
    size: "18.8 MB",
    category: "Projects",
    owner: "Kofi Mensah",
    version: "v3.0",
    updatedAt: "Sep 11, 2026",
    tags: ["CWP-26", "Hydrology", "Blueprints"],
  },
  {
    id: "doc_3",
    name: "Q2_Financial_Ledger_Reconciliation.xlsx",
    type: "Spreadsheet",
    size: "840 KB",
    category: "Financials",
    owner: "Julian Vance",
    version: "v1.4",
    updatedAt: "Sep 14, 2026",
    tags: ["Ledger", "Quarterly", "Audit-Ready"],
  },
  {
    id: "doc_4",
    name: "Internal_Audit_Checklist_Standard.docx",
    type: "Doc",
    size: "420 KB",
    category: "Audits",
    owner: "Elena Rostova",
    version: "v2.0",
    updatedAt: "Aug 29, 2026",
    tags: ["Checklist", "Compliance", "Template"],
  }
];

// -------------------------------------------------------------
// SEEDED APPROVAL REQUESTS
// -------------------------------------------------------------
export const demoApprovals: ApprovalRequest[] = [
  {
    id: "appr_1",
    title: "Submersible Pump Procurement ($14,200)",
    type: "Expense Request",
    requester: demoMembers[4],
    amount: 14200,
    status: "Pending",
    submittedAt: "Sep 15, 2026",
    currentStep: "Finance Director Sign-off (Julian Vance)",
    justification: "Urgent replacement for Sector 4 deep well pump failure impacting 450 residents.",
  },
  {
    id: "appr_2",
    title: "Digital Lab Refurbishment Grant Expansion ($12,000)",
    type: "Budget Allocation",
    requester: demoMembers[5],
    amount: 12000,
    status: "Pending",
    submittedAt: "Sep 16, 2026",
    currentStep: "Executive Approval (Dr. Sarah Lin)",
    justification: "Expanding student capacity by 40 seats for Q4 bootcamp cohorts.",
  },
  {
    id: "appr_3",
    title: "Close Audit: Data Protection & GDPR Review",
    type: "Audit Closure",
    requester: demoMembers[2],
    status: "Pending",
    submittedAt: "Sep 16, 2026",
    currentStep: "Administrator Verification (Marcus Thorne)",
    justification: "All 2 findings verified and resolved; external penetration test passed.",
  },
  {
    id: "appr_4",
    title: "Annual Leave Request - 5 Days",
    type: "Leave Request",
    requester: demoMembers[7],
    status: "Approved",
    submittedAt: "Sep 10, 2026",
    currentStep: "Completed",
    justification: "Scheduled post-fieldwork recuperation leave.",
  }
];

// -------------------------------------------------------------
// SEEDED ACTIVITY LOG
// -------------------------------------------------------------
export const demoActivities: ActivityEvent[] = [
  {
    id: "act_1",
    actor: "Dr. Sarah Lin",
    actorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
    action: "approved",
    target: "Annual Leave Request (Kofi Mensah)",
    resourceType: "Approval",
    timestamp: "10 mins ago",
    metadata: "Role: Owner | Status: Approved",
  },
  {
    id: "act_2",
    actor: "Julian Vance",
    actorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    action: "recorded transaction",
    target: "$5,000 Donation from MacArthur Global",
    resourceType: "Finance",
    timestamp: "42 mins ago",
    metadata: "Campaign: Clean Water 50 Villages",
  },
  {
    id: "act_3",
    actor: "Elena Rostova",
    actorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80",
    action: "updated finding status",
    target: "FND-03: Missing W-9 documentation (Resolved)",
    resourceType: "Audit",
    timestamp: "2 hours ago",
    metadata: "Severity: Medium | Due: 2026-09-18",
  },
  {
    id: "act_4",
    actor: "Marcus Thorne",
    actorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80",
    action: "created API key",
    target: "prod_live_mobile_sync",
    resourceType: "Developer",
    timestamp: "4 hours ago",
    metadata: "Scopes: read:projects, write:tasks",
  },
  {
    id: "act_5",
    actor: "Amara Patel",
    actorAvatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200&auto=format&fit=crop&q=80",
    action: "moved task to In Progress",
    target: "Verify borehole filtration pressure telemetry",
    resourceType: "Project",
    timestamp: "6 hours ago",
    metadata: "Project: Clean Water Pipeline 2026",
  }
];
