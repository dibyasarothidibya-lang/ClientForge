// Working copy: keep buyer messaging editable without changing layout or demo logic.
export const engineer = {
  name: "Dibya Sarothi Simanta",
  title: "Independent B2B Software & Backend Systems Engineer",
  tagline: "Custom Internal Tools · Workflow Automation · Reliable Backend Systems",
  positioning:
    "I build custom internal software and backend systems that replace disconnected spreadsheets, manual workflows, and unreliable business processes.",
  email: "dibyasarothidibya@gmail.com",
  whatsapp: "https://wa.me/8801704909232",
  linkedin: "https://www.linkedin.com/in/dibya-sarothi-simanta-b1a82235a/",
  github: "https://github.com/dibyasarothidibya-lang",
  twitter: "https://x.com/Dibyasarothi",
  repository: "https://github.com/dibyasarothidibya-lang/ClientForge",
  video: "https://youtu.be/IjmQs_fA4qU",
};

export const commercialServices = [
  {
    number: "01",
    title: "Custom Internal Tools",
    problem: "Critical business operations run on fragile spreadsheets, email threads, and disconnected SaaS apps that cannot talk to each other.",
    consequence: "Data gets lost between departments, team members duplicate manual work, and leadership lacks a single source of operational truth.",
    solution: "I build bespoke internal tools, operational dashboards, customer/staff management portals, and administrative backends tailored to your exact business logic.",
    evidence: "ClientForge provides a unified workforce directory, department hierarchies, contract tracking, and granular management interfaces.",
    module: "/workspace/people",
    link: "Inspect internal directory demo",
    whatsappPrefill: "Hi Dibya, I'm interested in discussing a custom internal tool for my business.",
    subject: "Project inquiry: Custom Internal Tools",
    ctaText: "Discuss an Internal Tool",
  },
  {
    number: "02",
    title: "Workflow Automation & Integrations",
    problem: "Approvals, handoffs, and data reconciliation require constant manual intervention, phone calls, and spreadsheet copy-pasting.",
    consequence: "Process bottlenecks delay execution, human errors slip into sensitive records, and operational costs scale with every new hire.",
    solution: "I engineer deterministic workflow state machines, automated approval hierarchies, background job workers, webhook handlers, and third-party API sync pipelines.",
    evidence: "ClientForge automates multi-step leave and expense approval transitions with atomic validation, Celery background tasks, and event auditing.",
    module: "/workspace/approvals",
    link: "Test live approval engine",
    whatsappPrefill: "Hi Dibya, I'd like to automate our business approvals and system workflows.",
    subject: "Project inquiry: Workflow Automation & Integrations",
    ctaText: "Automate a Workflow",
  },
  {
    number: "03",
    title: "Backend Development & SaaS Systems",
    problem: "Application backends suffer from slow database queries, security vulnerabilities, loose data validation, and lack of transaction safety.",
    consequence: "Data corruption during concurrent operations, permission leaks between customer accounts, and fragile systems that break under load.",
    solution: "I architect robust Django REST and Node.js backends with strict multi-tenant isolation, 6-tier RBAC security, Decimal-precision financial arithmetic, and automated test suites.",
    evidence: "ClientForge implements 13 modular Django applications, organization-scoped database querysets, and 71 automated regression test methods.",
    module: "/case-studies/clientforge#engineering",
    link: "Inspect backend architecture & 71 tests",
    whatsappPrefill: "Hi Dibya, I need backend development or SaaS architecture for my project.",
    subject: "Project inquiry: Backend Development & SaaS Systems",
    ctaText: "Discuss Backend Development",
  },
];

export const businessProblems = [
  {
    problem: "Disconnected Business Information",
    consequence: "Customer records, employee details, and project data are split across 5 different spreadsheets and SaaS tools with no central source of truth.",
    solution: "Centralized relational database schemas with typed data models, foreign-key integrity, and real-time operational views.",
    targetModule: "/workspace/people",
    ctaText: "Inspect data structure demo",
  },
  {
    problem: "Manual Approval Bottlenecks",
    consequence: "Leave requests, purchase orders, budget approvals, and team sign-offs sit unattended in emails and chat threads with zero status tracking.",
    solution: "Rigid approval state machines with explicit pending/approved/rejected states, reviewer permissions, and automatic notifications.",
    targetModule: "/workspace/approvals",
    ctaText: "Inspect approval workflows",
  },
  {
    problem: "Systems That Cannot Communicate",
    consequence: "SaaS subscriptions and legacy databases operate in silos, requiring manual copy-pasting of records between platforms.",
    solution: "Bidirectional API integrations, resilient webhook listeners, idempotent retry queues, and automated audit logs.",
    targetModule: "/workspace/audits",
    ctaText: "Inspect audit trail engine",
  },
  {
    problem: "Unreliable Application Backends",
    consequence: "Legacy backends experience race conditions, data corruption during concurrent edits, and lack permission enforcement.",
    solution: "Atomic database transactions (select_for_update), Decimal arithmetic, organization-scoped querysets, and comprehensive automated test suites.",
    targetModule: "/case-studies/clientforge#engineering",
    ctaText: "Inspect backend architecture",
  },
];

export const guidedDemonstrationPaths = [
  {
    number: "01",
    title: "Organize Business Records",
    subtitle: "For teams replacing spreadsheet chaos with structured data",
    description: "Inspect how ClientForge organizes employee directories, department hierarchies, and lifecycle events into an intuitive, relational interface.",
    path: "/workspace/people",
    action: "Open People Directory",
    badge: "Relational Data Modeling",
  },
  {
    number: "02",
    title: "Track an Approval Workflow",
    subtitle: "For teams needing automated, verifiable sign-offs",
    description: "Walk through a live state machine transition: submit a leave or expense request, review permissions, and observe real-time status transitions.",
    path: "/workspace/approvals",
    action: "Test Approval Engine",
    badge: "State Machine Transitions",
  },
  {
    number: "03",
    title: "Control Access & Track Changes",
    subtitle: "For organizations requiring strict security and auditability",
    description: "Explore 6-tier RBAC role definitions (Owner to Auditor), tenant data boundaries, and immutable event audit logs.",
    path: "/workspace/settings",
    action: "Inspect RBAC & Audits",
    badge: "Multi-Tenant Security",
  },
];

export const demonstrationModules = [
  {
    name: "Organization & RBAC",
    description: "6 permission roles and multi-tenant scoping",
    path: "/workspace/settings",
    badge: "Security & Tenancy",
  },
  {
    name: "Employee Management",
    description: "Directory, lifecycle tracking & profiles",
    path: "/workspace/people",
    badge: "People Operations",
  },
  {
    name: "Payroll & Compensation",
    description: "Ledgers, Decimal calculations & payslips",
    path: "/workspace/payroll",
    badge: "Financial Operations",
  },
  {
    name: "Approval Workflows",
    description: "Leave & expense state-machine transitions",
    path: "/workspace/approvals",
    badge: "Workflow Engine",
  },
  {
    name: "Audit Trail",
    description: "Traceable event logs & actor tracking",
    path: "/workspace/audits",
    badge: "Data Integrity",
  },
  {
    name: "Document Governance",
    description: "Scoped storage paths & metadata tracking",
    path: "/workspace/documents",
    badge: "Compliance",
  },
];

export const engagementPhases = [
  {
    step: "01",
    phase: "Understand the Problem",
    duration: "Diagnostic & Discovery",
    description: "Initial diagnostic conversation to understand your workflow bottlenecks, existing spreadsheets and tools, user roles, and business constraints.",
  },
  {
    step: "02",
    phase: "Define the Solution",
    duration: "Architecture & Scoping",
    description: "Before writing any code, I deliver a clear technical specification: database schemas, API contracts, domain state machines, and a fixed-milestone scope.",
  },
  {
    step: "03",
    phase: "Build & Validate",
    duration: "Iterative Development",
    description: "Iterative implementation with direct access to progress. Features are backed by automated tests, strict validation, and reviewable working demos.",
  },
  {
    step: "04",
    phase: "Deliver & Support",
    duration: "Deployment & Handover",
    description: "Production deployment on secure cloud infrastructure, database migrations, operational documentation, and direct post-launch technical handover.",
  },
];

export const faqs = [
  {
    question: "What types of projects do you typically take on?",
    answer: "I specialize in three core areas: (1) Custom internal business applications that replace spreadsheet chaos (employee directories, operational dashboards, customer portals), (2) Workflow automation and integrations (approval state machines, API connections, notification queues), and (3) Backend engineering & multi-tenant SaaS systems (Django REST / Node.js APIs, database optimization, 6-tier RBAC, and test suites).",
  },
  {
    question: "How does working with an independent engineer compare to hiring an agency or full-time employee?",
    answer: "With an agency, you pay heavy overhead for account managers, sales reps, and office space, while your actual work is often delegated to junior developers. With a full-time hire, you take on hiring delays, benefits, and long-term commitments. Working directly with me gives you senior-level engineering, direct technical communication, agile delivery, and fixed-scope predictability.",
  },
  {
    question: "Is ClientForge an active commercial SaaS or an engineering case study?",
    answer: "ClientForge is an independently built, production-grade SaaS demonstration platform. It features 13 modular Django applications, 6 permission tiers, multi-tenant database scoping, and 71 automated regression tests. The organizations and figures inside the demo are seeded sample datasets designed to demonstrate architectural depth.",
  },
  {
    question: "What is your typical project timeline and engagement model?",
    answer: "Projects typically range from 2 to 8 weeks depending on scope. We begin with a diagnostic discussion and technical scoping phase before agreeing on a fixed-price proposal with milestone-based delivery. You always know what is being built, when it will be delivered, and what it will cost before development begins.",
  },
  {
    question: "How do you ensure data security and multi-tenant isolation?",
    answer: "Security and isolation are engineered at the database and application levels. Every query is scoped to the authenticated tenant organization. We implement 6-tier Role-Based Access Control (RBAC), atomic transactions with row-level locks for sensitive state updates, parameterized SQL queries, and complete event audit trails.",
  },
  {
    question: "How do we start a project conversation?",
    answer: "Send a direct message via WhatsApp or email dibyasarothidibya@gmail.com. Tell me briefly about your current workflow, which tools you use, and where the bottleneck is. I will review your requirements and respond within 24 hours to schedule a technical discovery discussion.",
  },
];

export const services = commercialServices;
export const engagement = engagementPhases.map((p) => [p.phase, p.description] as [string, string]);
