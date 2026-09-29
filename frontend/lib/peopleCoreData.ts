// PeopleCore B2B SaaS HR Platform Data Models & Enterprise Datasets

export type JobStage = "Applied" | "Screening" | "Interview" | "Technical Interview" | "Offer" | "Hired" | "Rejected";

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  department: string;
  stage: JobStage;
  appliedDate: string;
  experienceYears: number;
  expectedSalary: string;
  rating: number; // 1-5
  location: string;
  resumeUrl: string;
  notesCount: number;
  interviewStatus?: string;
  summary: string;
  skills: string[];
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-Time" | "Part-Time" | "Contract" | "Remote";
  status: "Open" | "Draft" | "Closed";
  applicantsCount: number;
  openings: number;
  salaryRange: string;
  hiringManager: string;
  deadline: string;
  postedDate: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  department: string;
  date: string;
  checkIn: string;
  checkOut: string;
  totalHours: number;
  status: "Present" | "Absent" | "Late" | "Remote" | "Half Day";
  workMode: "Office" | "Remote" | "Hybrid";
  overtimeHours?: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  department: string;
  leaveType: "Annual Leave" | "Sick Leave" | "Parental Leave" | "Compassionate" | "Unpaid";
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected" | "Cancelled";
  appliedDate: string;
  approver: string;
  workflowStage: "Employee" | "Manager" | "HR" | "Completed";
  balanceRemaining: number;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  jobTitle: string;
  department: string;
  baseSalary: number;
  allowances: number;
  deductions: number;
  taxes: number;
  netSalary: number;
  status: "Paid" | "Pending" | "Processing" | "Flagged";
  period: string; // e.g. "Sep 1 - Sep 30, 2026"
  paymentMethod: string;
  bankAccount: string;
}

export interface ExpenseRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  department: string;
  category: "Travel & Flights" | "Software & Tools" | "Client Entertainment" | "Home Office" | "Wellness";
  amount: number;
  currency: string;
  date: string;
  status: "Pending" | "Approved" | "Rejected" | "Reimbursed";
  merchant: string;
  description: string;
  receiptUrl?: string;
  approver: string;
}

export interface PerformanceGoal {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  department: string;
  title: string;
  category: "OKRs" | "Productivity" | "Leadership" | "Technical Execution";
  progress: number; // 0-100
  targetDate: string;
  status: "On Track" | "At Risk" | "Behind" | "Completed";
  cycle: "Q3 2026" | "Q4 2026" | "Annual 2026";
  managerFeedback?: string;
}

export interface PerformanceReviewCycle {
  id: string;
  name: string;
  cycle: string;
  period: string;
  participantsCount: number;
  completionRate: number;
  status: "Active" | "Calibration" | "Draft" | "Closed";
  deadline: string;
}

export interface HRDocument {
  id: string;
  title: string;
  category: "Contracts" | "Policies" | "Employee Documents" | "Compliance" | "Payroll & Tax";
  fileType: "PDF" | "DOCX" | "XLSX";
  fileSize: string;
  uploadedBy: string;
  uploadDate: string;
  version: string;
  status: "Active" | "Pending Review" | "Archived";
  accessPermission: "All Employees" | "Managers & HR" | "Executives Only";
  downloadCount: number;
}

export interface AutomationWorkflow {
  id: string;
  title: string;
  description: string;
  trigger: string;
  condition: string;
  action: string;
  status: "Active" | "Paused" | "Draft";
  runCount: number;
  lastExecuted: string;
  category: "Onboarding" | "Leave & Time Off" | "Contracts & Legal" | "Payroll";
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  category: "Payroll & Compensation" | "Permissions & Roles" | "Integrations & API" | "Feature Request";
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  submittedBy: string;
  createdDate: string;
  lastUpdated: string;
  description: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: "Approvals" | "HR Alerts" | "Recruitment" | "Payroll" | "System" | "Security";
  timestamp: string;
  read: boolean;
  link?: string;
  severity: "info" | "warning" | "success" | "critical";
}

// -------------------------------------------------------------
// REALISTIC DATASETS
// -------------------------------------------------------------

export const demoCandidates: Candidate[] = [
  {
    id: "cand_1",
    name: "Amina Al-Mansoor",
    email: "amina.mansoor@example.com",
    phone: "+1 (555) 234-8901",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80",
    role: "Senior Distributed Systems Engineer",
    department: "Engineering",
    stage: "Technical Interview",
    appliedDate: "2026-09-18",
    experienceYears: 7,
    expectedSalary: "$175,000",
    rating: 5,
    location: "Austin, TX (Remote)",
    resumeUrl: "#",
    notesCount: 4,
    interviewStatus: "System Design Scheduled (Thursday 2pm)",
    summary: "Ex-Stripe infrastructure engineer with deep experience in Kafka streaming pipelines, distributed lock systems, and high-concurrency Go services.",
    skills: ["Go", "Kafka", "PostgreSQL", "Kubernetes", "Redis", "Distributed Systems"]
  },
  {
    id: "cand_2",
    name: "Liam O'Connor",
    email: "liam.oconnor@example.com",
    phone: "+1 (555) 872-1144",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
    role: "VP of Enterprise People Ops",
    department: "Human Resources",
    stage: "Offer",
    appliedDate: "2026-09-10",
    experienceYears: 12,
    expectedSalary: "$195,000",
    rating: 5,
    location: "New York, NY",
    resumeUrl: "#",
    notesCount: 7,
    interviewStatus: "Offer Letter Sent (Pending Candidate Signature)",
    summary: "Led talent operations at scaling B2B fintech from 120 to 950 employees. Architect of scalable comp leveling bands and global EOR programs.",
    skills: ["Talent Strategy", "Compensation Architecture", "SOC-2 HR Compliance", "Workday", "Executive Coaching"]
  },
  {
    id: "cand_3",
    name: "Devon Chen",
    email: "devon.chen@example.com",
    phone: "+1 (555) 349-9021",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80",
    role: "Staff Product Designer",
    department: "Product",
    stage: "Interview",
    appliedDate: "2026-09-21",
    experienceYears: 6,
    expectedSalary: "$160,000",
    rating: 4,
    location: "San Francisco, CA",
    resumeUrl: "#",
    notesCount: 3,
    interviewStatus: "Portfolio Deep Dive with Design VP",
    summary: "Design systems specialist behind complex data density tables and financial workspace tools. Expert in token-based systems and micro-interactions.",
    skills: ["Figma", "Design Systems", "Prototyping", "Tailwind CSS", "User Research"]
  },
  {
    id: "cand_4",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+1 (555) 761-4498",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
    role: "Lead Total Rewards Analyst",
    department: "Finance",
    stage: "Screening",
    appliedDate: "2026-09-24",
    experienceYears: 5,
    expectedSalary: "$135,000",
    rating: 4,
    location: "Chicago, IL",
    resumeUrl: "#",
    notesCount: 2,
    interviewStatus: "Recruiter Phone Screen Scheduled",
    summary: "Certified Compensation Professional (CCP) specialized in Radford and Mercer benchmarking, equity dilution models, and payroll tax compliance.",
    skills: ["Radford Benchmarking", "Option Pool Modeling", "Excel Modeling", "Payroll Audit"]
  },
  {
    id: "cand_5",
    name: "Mateo Silva",
    email: "mateo.silva@example.com",
    phone: "+1 (555) 682-3920",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&auto=format&fit=crop&q=80",
    role: "Senior Security & Compliance Engineer",
    department: "Security",
    stage: "Applied",
    appliedDate: "2026-09-27",
    experienceYears: 8,
    expectedSalary: "$170,000",
    rating: 4,
    location: "Seattle, WA",
    resumeUrl: "#",
    notesCount: 1,
    interviewStatus: "Application Reviewed by Hiring Manager",
    summary: "Hands-on DevSecOps engineer with experience guiding two B2B SaaS startups through SOC 2 Type II and ISO 27001 certifications.",
    skills: ["AWS IAM", "Terraform", "SOC 2 Type II", "Vanta", "Zero Trust Architecture"]
  },
  {
    id: "cand_6",
    name: "Siddharth Rao",
    email: "sid.rao@example.com",
    phone: "+1 (555) 438-1922",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&auto=format&fit=crop&q=80",
    role: "Frontend Architect",
    department: "Engineering",
    stage: "Hired",
    appliedDate: "2026-08-30",
    experienceYears: 9,
    expectedSalary: "$180,000",
    rating: 5,
    location: "Boston, MA",
    resumeUrl: "#",
    notesCount: 8,
    interviewStatus: "Hired (Starts Oct 1, 2026)",
    summary: "Joined PeopleCore core engineering team to spearhead component architecture and design system acceleration.",
    skills: ["React", "TypeScript", "Next.js", "Web Performance", "Accessibility"]
  }
];

export const demoJobs: JobPosting[] = [
  {
    id: "job_1",
    title: "Senior Distributed Systems Engineer",
    department: "Engineering",
    location: "San Francisco, CA / Remote",
    type: "Full-Time",
    status: "Open",
    applicantsCount: 38,
    openings: 2,
    salaryRange: "$165,000 – $190,000",
    hiringManager: "Dr. Sarah Lin",
    deadline: "2026-10-31",
    postedDate: "2026-09-01",
    description: "Architect high-throughput event processing pipelines and multi-tenant telemetry backends for PeopleCore's enterprise workforce engine.",
    requirements: [
      "5+ years building production distributed systems in Go, Rust, or Python",
      "Hands-on expertise with Kafka, RabbitMQ, or NATS event streaming",
      "Demonstrated experience designing ACID transactional multi-tenant databases"
    ],
    benefits: [
      "Comprehensive medical, dental, and vision (100% paid premiums)",
      "Uncapped PTO with a mandatory 3-week minimum policy",
      "$3,500 annual personal growth and learning stipend"
    ]
  },
  {
    id: "job_2",
    title: "VP of Enterprise People Ops",
    department: "Human Resources",
    location: "New York, NY",
    type: "Full-Time",
    status: "Open",
    applicantsCount: 14,
    openings: 1,
    salaryRange: "$185,000 – $210,000",
    hiringManager: "Julian Vance",
    deadline: "2026-10-15",
    postedDate: "2026-08-25",
    description: "Lead global human capital strategy, compensation leveling, talent pipelines, and regulatory compliance across our distributed organization.",
    requirements: [
      "8+ years of progressive HR leadership in hyper-growth B2B SaaS companies",
      "Deep command of global employer of record (EOR) laws and US employment regulations",
      "Proven track record scaling organizations past 500+ employees"
    ],
    benefits: [
      "Substantial equity ownership package",
      "Executive wellness stipend and concierge care",
      "Annual international executive retreat"
    ]
  },
  {
    id: "job_3",
    title: "Staff Product Designer (Design Systems)",
    department: "Product",
    location: "Remote (US/Canada)",
    type: "Full-Time",
    status: "Open",
    applicantsCount: 45,
    openings: 1,
    salaryRange: "$150,000 – $175,000",
    hiringManager: "Elena Rostova",
    deadline: "2026-11-15",
    postedDate: "2026-09-12",
    description: "Craft pixel-precise, accessible, and intuitive UI patterns for our unified enterprise dashboard and analytics engine.",
    requirements: [
      "6+ years of UX/UI product design experience for complex data-dense SaaS applications",
      "Mastery of Figma, component libraries, and interactive design tokens",
      "Portfolio showcasing end-to-end design systems and micro-interactions"
    ],
    benefits: [
      "Top-tier hardware allowance ($4,000 custom workstation budget)",
      "Quarterly design system hackathons and co-working meetups",
      "Flexible schedule with asynchronous core hours"
    ]
  },
  {
    id: "job_4",
    title: "Payroll & Total Rewards Specialist",
    department: "Finance",
    location: "Chicago, IL / Hybrid",
    type: "Full-Time",
    status: "Open",
    applicantsCount: 22,
    openings: 1,
    salaryRange: "$95,000 – $120,000",
    hiringManager: "Kofi Mensah",
    deadline: "2026-10-20",
    postedDate: "2026-09-15",
    description: "Manage multi-state and multi-currency payroll runs, benefit reconciliations, and tax withholdings with zero tolerance for discrepancies.",
    requirements: [
      "4+ years processing US multi-state and international payroll",
      "Certified Payroll Professional (CPP) preferred",
      "Experience auditing W-2s, 1099s, and 401(k) compliance"
    ],
    benefits: [
      "401(k) matching up to 5%",
      "Commuter and parking benefits",
      "Tuition assistance for professional accreditations"
    ]
  },
  {
    id: "job_5",
    title: "Lead Security & Compliance Architect",
    department: "Security",
    location: "Remote (Global)",
    type: "Contract",
    status: "Draft",
    applicantsCount: 0,
    openings: 1,
    salaryRange: "$120 – $160 / hr",
    hiringManager: "Marcus Thorne",
    deadline: "2026-12-01",
    postedDate: "2026-09-25",
    description: "Oversee ongoing SOC 2 Type II compliance audit controls, annual penetration testing, and enterprise data encryption protocols.",
    requirements: [
      "CISSP or CISM certification",
      "Extensive knowledge of HIPAA, GDPR, and ISO 27001 controls",
      "Demonstrated ability to automate compliance evidence gathering"
    ],
    benefits: [
      "Direct engagement with executive leadership",
      "Flexible contractor retainer structure"
    ]
  }
];

export const demoAttendanceRecords: AttendanceRecord[] = [
  {
    id: "att_1",
    employeeId: "usr_1",
    employeeName: "Dr. Sarah Lin",
    employeeAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80",
    department: "Executive & Governance",
    date: "2026-09-28",
    checkIn: "08:45 AM",
    checkOut: "05:30 PM",
    totalHours: 8.75,
    status: "Present",
    workMode: "Office"
  },
  {
    id: "att_2",
    employeeId: "usr_2",
    employeeName: "Julian Vance",
    employeeAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
    department: "Finance & Operations",
    date: "2026-09-28",
    checkIn: "09:02 AM",
    checkOut: "06:15 PM",
    totalHours: 9.2,
    status: "Present",
    workMode: "Remote"
  },
  {
    id: "att_3",
    employeeId: "usr_3",
    employeeName: "Marcus Thorne",
    employeeAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&auto=format&fit=crop&q=80",
    department: "Technology & Systems",
    date: "2026-09-28",
    checkIn: "09:42 AM",
    checkOut: "06:45 PM",
    totalHours: 9.0,
    status: "Late",
    workMode: "Hybrid"
  },
  {
    id: "att_4",
    employeeId: "usr_4",
    employeeName: "Elena Rostova",
    employeeAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80",
    department: "Internal Audit & Risk",
    date: "2026-09-28",
    checkIn: "08:30 AM",
    checkOut: "05:00 PM",
    totalHours: 8.5,
    status: "Present",
    workMode: "Office"
  },
  {
    id: "att_5",
    employeeId: "usr_5",
    employeeName: "Kofi Mensah",
    employeeAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
    department: "Programs & Outreach",
    date: "2026-09-28",
    checkIn: "—",
    checkOut: "—",
    totalHours: 0,
    status: "Absent",
    workMode: "Remote"
  },
  {
    id: "att_6",
    employeeId: "usr_6",
    employeeName: "Amara Patel",
    employeeAvatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=160&auto=format&fit=crop&q=80",
    department: "Field Engineering",
    date: "2026-09-28",
    checkIn: "08:15 AM",
    checkOut: "05:45 PM",
    totalHours: 9.5,
    status: "Present",
    workMode: "Office",
    overtimeHours: 1.5
  }
];

export const demoLeaveRequests: LeaveRequest[] = [
  {
    id: "lve_1",
    employeeId: "usr_5",
    employeeName: "Kofi Mensah",
    employeeAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
    department: "Programs & Outreach",
    leaveType: "Annual Leave",
    startDate: "2026-10-05",
    endDate: "2026-10-12",
    days: 6,
    reason: "Scheduled annual family vacation after field completion.",
    status: "Pending",
    appliedDate: "2026-09-26",
    approver: "Dr. Sarah Lin",
    workflowStage: "Manager",
    balanceRemaining: 14
  },
  {
    id: "lve_2",
    employeeId: "usr_3",
    employeeName: "Marcus Thorne",
    employeeAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&auto=format&fit=crop&q=80",
    department: "Technology & Systems",
    leaveType: "Sick Leave",
    startDate: "2026-09-22",
    endDate: "2026-09-23",
    days: 2,
    reason: "Recovery following minor outpatient procedure.",
    status: "Approved",
    appliedDate: "2026-09-21",
    approver: "Dr. Sarah Lin",
    workflowStage: "Completed",
    balanceRemaining: 8
  },
  {
    id: "lve_3",
    employeeId: "usr_6",
    employeeName: "Amara Patel",
    employeeAvatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=160&auto=format&fit=crop&q=80",
    department: "Field Engineering",
    leaveType: "Parental Leave",
    startDate: "2026-11-01",
    endDate: "2026-12-15",
    days: 30,
    reason: "Paternal support leave under PeopleCore primary care policy.",
    status: "Approved",
    appliedDate: "2026-09-15",
    approver: "Elena Rostova",
    workflowStage: "Completed",
    balanceRemaining: 30
  },
  {
    id: "lve_4",
    employeeId: "usr_4",
    employeeName: "Elena Rostova",
    employeeAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80",
    department: "Internal Audit & Risk",
    leaveType: "Compassionate",
    startDate: "2026-10-18",
    endDate: "2026-10-21",
    days: 4,
    reason: "Personal family emergency travel.",
    status: "Pending",
    appliedDate: "2026-09-27",
    approver: "Dr. Sarah Lin",
    workflowStage: "HR",
    balanceRemaining: 18
  }
];

export const demoPayrolls: PayrollRecord[] = [
  {
    id: "pay_1",
    employeeId: "usr_1",
    employeeName: "Dr. Sarah Lin",
    employeeAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80",
    jobTitle: "Chief Executive Officer",
    department: "Executive & Governance",
    baseSalary: 18500,
    allowances: 1200,
    deductions: 1850,
    taxes: 4200,
    netSalary: 13650,
    status: "Paid",
    period: "September 2026",
    paymentMethod: "Direct Deposit (ACH)",
    bankAccount: "JPMorgan Chase •••• 4892"
  },
  {
    id: "pay_2",
    employeeId: "usr_2",
    employeeName: "Julian Vance",
    employeeAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
    jobTitle: "Chief Financial Officer",
    department: "Finance & Operations",
    baseSalary: 16500,
    allowances: 900,
    deductions: 1650,
    taxes: 3750,
    netSalary: 12000,
    status: "Paid",
    period: "September 2026",
    paymentMethod: "Direct Deposit (ACH)",
    bankAccount: "Silicon Valley Bank •••• 1104"
  },
  {
    id: "pay_3",
    employeeId: "usr_3",
    employeeName: "Marcus Thorne",
    employeeAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&auto=format&fit=crop&q=80",
    jobTitle: "Chief Technology Officer",
    department: "Technology & Systems",
    baseSalary: 17200,
    allowances: 850,
    deductions: 1720,
    taxes: 3900,
    netSalary: 12430,
    status: "Processing",
    period: "September 2026",
    paymentMethod: "Direct Deposit (ACH)",
    bankAccount: "Bank of America •••• 9821"
  },
  {
    id: "pay_4",
    employeeId: "usr_4",
    employeeName: "Elena Rostova",
    employeeAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80",
    jobTitle: "Director of Internal Audit",
    department: "Internal Audit & Risk",
    baseSalary: 14000,
    allowances: 600,
    deductions: 1400,
    taxes: 3100,
    netSalary: 10100,
    status: "Paid",
    period: "September 2026",
    paymentMethod: "Direct Deposit (ACH)",
    bankAccount: "Citibank N.A. •••• 5530"
  },
  {
    id: "pay_5",
    employeeId: "usr_5",
    employeeName: "Kofi Mensah",
    employeeAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
    jobTitle: "VP of Global Programs",
    department: "Programs & Outreach",
    baseSalary: 13500,
    allowances: 1100,
    deductions: 1350,
    taxes: 2950,
    netSalary: 10300,
    status: "Processing",
    period: "September 2026",
    paymentMethod: "Wire Transfer (SWIFT)",
    bankAccount: "Standard Chartered •••• 7714"
  },
  {
    id: "pay_6",
    employeeId: "usr_6",
    employeeName: "Amara Patel",
    employeeAvatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=160&auto=format&fit=crop&q=80",
    jobTitle: "Principal Systems Engineer",
    department: "Field Engineering",
    baseSalary: 13000,
    allowances: 750,
    deductions: 1300,
    taxes: 2850,
    netSalary: 9600,
    status: "Paid",
    period: "September 2026",
    paymentMethod: "Direct Deposit (ACH)",
    bankAccount: "Wells Fargo •••• 3419"
  }
];

export const demoExpenses: ExpenseRecord[] = [
  {
    id: "exp_1",
    employeeId: "usr_5",
    employeeName: "Kofi Mensah",
    employeeAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
    department: "Programs & Outreach",
    category: "Travel & Flights",
    amount: 1420.50,
    currency: "USD",
    date: "2026-09-24",
    status: "Pending",
    merchant: "United Airlines / Star Alliance",
    description: "Regional team travel for Kenya field water infrastructure verification.",
    approver: "Julian Vance"
  },
  {
    id: "exp_2",
    employeeId: "usr_3",
    employeeName: "Marcus Thorne",
    employeeAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&auto=format&fit=crop&q=80",
    department: "Technology & Systems",
    category: "Software & Tools",
    amount: 840.00,
    currency: "USD",
    date: "2026-09-21",
    status: "Approved",
    merchant: "GitHub Enterprise & AWS Copilot",
    description: "Annual seats renewal for backend data pipeline engineering squad.",
    approver: "Julian Vance"
  },
  {
    id: "exp_3",
    employeeId: "usr_6",
    employeeName: "Amara Patel",
    employeeAvatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=160&auto=format&fit=crop&q=80",
    department: "Field Engineering",
    category: "Home Office",
    amount: 320.00,
    currency: "USD",
    date: "2026-09-18",
    status: "Reimbursed",
    merchant: "Ergonomic Desk Systems Inc.",
    description: "WFH dual monitor arm and high-lumens desk lamp allocation.",
    approver: "Marcus Thorne"
  },
  {
    id: "exp_4",
    employeeId: "usr_2",
    employeeName: "Julian Vance",
    employeeAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
    department: "Finance & Operations",
    category: "Client Entertainment",
    amount: 285.40,
    currency: "USD",
    date: "2026-09-26",
    status: "Pending",
    merchant: "The Modern NYC",
    description: "Executive dinner with UN SDG global partnership steering committee.",
    approver: "Dr. Sarah Lin"
  }
];

export const demoGoals: PerformanceGoal[] = [
  {
    id: "goal_1",
    employeeId: "usr_6",
    employeeName: "Amara Patel",
    employeeAvatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=160&auto=format&fit=crop&q=80",
    department: "Field Engineering",
    title: "Deploy 50 IoT telemetry flow sensors with 99.99% uptime",
    category: "Technical Execution",
    progress: 84,
    targetDate: "2026-10-31",
    status: "On Track",
    cycle: "Q3 2026",
    managerFeedback: "Exemplary progress on ruggedized cellular telemetry relays."
  },
  {
    id: "goal_2",
    employeeId: "usr_3",
    employeeName: "Marcus Thorne",
    employeeAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&auto=format&fit=crop&q=80",
    department: "Technology & Systems",
    title: "Complete SOC 2 Type II external audit with zero non-conformities",
    category: "Productivity",
    progress: 92,
    targetDate: "2026-10-15",
    status: "On Track",
    cycle: "Q3 2026",
    managerFeedback: "Evidence automation has drastically lowered auditor turnaround time."
  },
  {
    id: "goal_3",
    employeeId: "usr_5",
    employeeName: "Kofi Mensah",
    employeeAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
    department: "Programs & Outreach",
    title: "Expand regional NGO partnership network to 40 verified entities",
    category: "OKRs",
    progress: 68,
    targetDate: "2026-11-30",
    status: "At Risk",
    cycle: "Q4 2026",
    managerFeedback: "Legal MOUs in East Africa require expedited review from legal counsel."
  },
  {
    id: "goal_4",
    employeeId: "usr_4",
    employeeName: "Elena Rostova",
    employeeAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80",
    department: "Internal Audit & Risk",
    title: "Publish 100% transparent quarterly audit report with UN Water cross-reference",
    category: "Leadership",
    progress: 100,
    targetDate: "2026-09-30",
    status: "Completed",
    cycle: "Q3 2026",
    managerFeedback: "Audit delivered ahead of schedule with immaculate paper trails."
  }
];

export const demoReviewCycles: PerformanceReviewCycle[] = [
  {
    id: "rev_1",
    name: "Q3 2026 Comprehensive Peer & 360 Review",
    cycle: "Q3 2026",
    period: "Jul 1 – Sep 30, 2026",
    participantsCount: 42,
    completionRate: 88,
    status: "Active",
    deadline: "2026-10-05"
  },
  {
    id: "rev_2",
    name: "Mid-Year Leadership & Executive Calibration",
    cycle: "H1 2026",
    period: "Jan 1 – Jun 30, 2026",
    participantsCount: 16,
    completionRate: 100,
    status: "Closed",
    deadline: "2026-07-15"
  },
  {
    id: "rev_3",
    name: "Annual 2026 Total Rewards & Leveling Calibration",
    cycle: "Annual 2026",
    period: "Jan 1 – Dec 31, 2026",
    participantsCount: 65,
    completionRate: 25,
    status: "Draft",
    deadline: "2026-12-20"
  }
];

export const demoHRDocuments: HRDocument[] = [
  {
    id: "doc_1",
    title: "Global Employee Master Handbook & Conduct Code 2026",
    category: "Policies",
    fileType: "PDF",
    fileSize: "4.8 MB",
    uploadedBy: "Dr. Sarah Lin",
    uploadDate: "2026-08-15",
    version: "v4.2",
    status: "Active",
    accessPermission: "All Employees",
    downloadCount: 184
  },
  {
    id: "doc_2",
    title: "Standard Independent Contractor Agreement (IP Assignment)",
    category: "Contracts",
    fileType: "DOCX",
    fileSize: "1.2 MB",
    uploadedBy: "Julian Vance",
    uploadDate: "2026-09-02",
    version: "v2.8",
    status: "Active",
    accessPermission: "Managers & HR",
    downloadCount: 62
  },
  {
    id: "doc_3",
    title: "SOC-2 Type II Security & Access Control Policy Framework",
    category: "Compliance",
    fileType: "PDF",
    fileSize: "8.1 MB",
    uploadedBy: "Marcus Thorne",
    uploadDate: "2026-09-10",
    version: "v5.0",
    status: "Active",
    accessPermission: "Executives Only",
    downloadCount: 45
  },
  {
    id: "doc_4",
    title: "Q3 2026 Payroll Statutory Tax Withholding Reconciliation",
    category: "Payroll & Tax",
    fileType: "XLSX",
    fileSize: "2.4 MB",
    uploadedBy: "Elena Rostova",
    uploadDate: "2026-09-25",
    version: "v1.1",
    status: "Active",
    accessPermission: "Executives Only",
    downloadCount: 19
  },
  {
    id: "doc_5",
    title: "Remote Work Equipment Subsidy & Health Safety Guidelines",
    category: "Policies",
    fileType: "PDF",
    fileSize: "920 KB",
    uploadedBy: "Julian Vance",
    uploadDate: "2026-07-20",
    version: "v3.0",
    status: "Active",
    accessPermission: "All Employees",
    downloadCount: 142
  }
];

export const demoWorkflows: AutomationWorkflow[] = [
  {
    id: "wf_1",
    title: "New Employee Zero-Friction Onboarding",
    description: "Auto-creates Google Workspace account, provisions 1Password vault, invites to Slack #welcome, and sends e-sign handbook.",
    trigger: "When new employee record status changes to 'Active'",
    condition: "Department in (Engineering, Product, Operations)",
    action: "Trigger GSuite API + Send DocuSign Packet + Post Slack Bot Announcement",
    status: "Active",
    runCount: 28,
    lastExecuted: "3 days ago",
    category: "Onboarding"
  },
  {
    id: "wf_2",
    title: "Leave Approval Auto-Sync & Balance Update",
    description: "Deducts approved days from remaining balance, marks shared Google Calendar, and alerts team lead on Slack.",
    trigger: "When leave request status becomes 'Approved'",
    condition: "Duration >= 1 business day",
    action: "Update database balance + Create OOO event + Notify team channel",
    status: "Active",
    runCount: 74,
    lastExecuted: "Yesterday at 4:30 PM",
    category: "Leave & Time Off"
  },
  {
    id: "wf_3",
    title: "Contract Expiration 30-Day Warning",
    description: "Flags independent contractor agreements nearing renewal 30 days prior to end date and creates an approval task.",
    trigger: "Scheduled Cron: Daily at 08:00 UTC",
    condition: "ContractEndDate - CurrentDate <= 30 Days",
    action: "Send email digest to VP People + Open Task in Approvals Engine",
    status: "Active",
    runCount: 190,
    lastExecuted: "Today at 08:00 AM",
    category: "Contracts & Legal"
  },
  {
    id: "wf_4",
    title: "Overtime & Off-Cycle Payroll Exception Alert",
    description: "Triggers executive sign-off requirement if an employee logs more than 8 hours overtime in a single payroll pay period.",
    trigger: "When bi-weekly timesheets are compiled",
    condition: "TotalOvertimeHours > 8.0 hrs",
    action: "Flag line item for CFO review + Generate compensation memo",
    status: "Paused",
    runCount: 12,
    lastExecuted: "2 weeks ago",
    category: "Payroll"
  }
];

export const demoSupportTickets: SupportTicket[] = [
  {
    id: "tkt_1",
    ticketNumber: "PC-8902",
    subject: "HSA / FSA payroll deduction adjustment for Q4",
    category: "Payroll & Compensation",
    priority: "Medium",
    status: "In Progress",
    submittedBy: "Amara Patel",
    createdDate: "2026-09-25",
    lastUpdated: "4 hours ago",
    description: "Need to update pre-tax commuter and HSA monthly contribution limits before October payroll cutoff."
  },
  {
    id: "tkt_2",
    ticketNumber: "PC-8891",
    subject: "Grant read-only audit access to KPMG external auditors",
    category: "Permissions & Roles",
    priority: "High",
    status: "Open",
    submittedBy: "Elena Rostova",
    createdDate: "2026-09-27",
    lastUpdated: "1 day ago",
    description: "Provide temporary time-bound auditor role access to document repository and expense ledger partitions."
  },
  {
    id: "tkt_3",
    ticketNumber: "PC-8840",
    subject: "Stripe Connect webhook event duplicate retry handling",
    category: "Integrations & API",
    priority: "Critical",
    status: "Resolved",
    submittedBy: "Marcus Thorne",
    createdDate: "2026-09-20",
    lastUpdated: "Sep 22, 2026",
    description: "Configured idempotency keys on invoice.payment_succeeded listener to prevent double ledger writes."
  }
];

export const demoNotifications: NotificationItem[] = [
  {
    id: "notif_1",
    title: "Pending Leave Approval",
    message: "Kofi Mensah submitted a request for 6 days Annual Leave (Oct 5 - Oct 12).",
    category: "Approvals",
    timestamp: "12m ago",
    read: false,
    link: "/workspace/leave",
    severity: "warning"
  },
  {
    id: "notif_2",
    title: "New Job Applicant",
    message: "Amina Al-Mansoor applied for Senior Distributed Systems Engineer.",
    category: "Recruitment",
    timestamp: "1h ago",
    read: false,
    link: "/workspace/recruitment",
    severity: "info"
  },
  {
    id: "notif_3",
    title: "September Payroll Ready",
    message: "September pay period preview compiled. 6 records awaiting final executive release.",
    category: "Payroll",
    timestamp: "3h ago",
    read: false,
    link: "/workspace/payroll",
    severity: "info"
  },
  {
    id: "notif_4",
    title: "Expense Reimbursed",
    message: "Amara Patel's home office equipment expense ($320.00) has been processed via ACH.",
    category: "Payroll",
    timestamp: "1d ago",
    read: true,
    link: "/workspace/expenses",
    severity: "success"
  },
  {
    id: "notif_5",
    title: "Security Audit Cleared",
    message: "Zero unauthorized IP login attempts detected over the trailing 7 days.",
    category: "Security",
    timestamp: "2d ago",
    read: true,
    link: "/workspace/settings",
    severity: "info"
  }
];
