// Working copy: keep buyer messaging editable without changing layout or demo logic.
export const engineer = {
  name: "Dibya Sarothi Simanta",
  title: "Independent B2B Software & Backend Systems Engineer",
  email: "dibyasarothidibya@gmail.com",
  whatsapp: "https://wa.me/8801704909232",
  linkedin: "https://www.linkedin.com/in/dibya-sarothi-simanta-b1a82235a/",
  repository: "https://github.com/dibyasarothidibya-lang/ClientForge",
  video: "https://youtu.be/IjmQs_fA4qU",
};

export const commercialServices = [
  {
    number: "01",
    title: "B2B backend systems & API development",
    problem: "Disconnected systems and fragile endpoints slowing your team down.",
    consequence: "Without clean architecture and resilient APIs, every new feature requires duct tape and creates maintenance debt.",
    solution: "I engineer modular Django REST and Node.js APIs with robust domain service layers, defensive input validation, structured error responses, and automated regression suites.",
    evidence: "ClientForge implements 13 modular Django apps with decoupled domain services and 71 automated tests verifying endpoints and permissions.",
    module: "/case-studies/clientforge#engineering",
    link: "Inspect API & service architecture",
    subject: "Project enquiry: B2B backend systems & API development",
  },
  {
    number: "02",
    title: "Workflow automation & internal applications",
    problem: "Operational tasks buried in chat threads and manual spreadsheets.",
    consequence: "Approvals get delayed, handoffs fall through the cracks, and team members waste hours on repetitive administration.",
    solution: "I build custom workflow engines, approval pipelines, background processing workers, and tailored internal operator interfaces.",
    evidence: "ClientForge automates leave and expense approval state machines, transaction updates, and retryable email notifications via Celery and Redis.",
    module: "/workspace/approvals",
    link: "Test live approval workflow",
    subject: "Project enquiry: workflow automation & internal applications",
  },
  {
    number: "03",
    title: "Multi-tenant SaaS development",
    problem: "Outgrowing single-account tools and needing multi-client architecture.",
    consequence: "Hardcoding client separation risks data leaks, complicates billing, and creates security liabilities.",
    solution: "I design multi-tenant architectures with organization-scoped database querysets, tenant boundary guards, and granular 6-tier role-based access control.",
    evidence: "ClientForge enforces organization scoping across models and viewsets, isolating data between tenants with Owner, Admin, Manager, Finance, Auditor, and Member roles.",
    module: "/workspace/settings",
    link: "Inspect tenant & RBAC settings",
    subject: "Project enquiry: multi-tenant SaaS development",
  },
  {
    number: "04",
    title: "Data synchronization & system integrations",
    problem: "Business tools that cannot agree on the same source of truth.",
    consequence: "Mismatched customer records, out-of-sync ledgers, and duplicate manual entry eat away operational hours.",
    solution: "I build bidirectional API integrations, data reconciliation pipelines, webhook listeners, exponential backoff retries, and tamper-evident audit logging.",
    evidence: "MediGuard coordinates openFDA regulatory data with external evidence; Flight Deal Finder orchestrates Google Flights, Google Sheets, and Twilio alerts.",
    module: "/workspace/audits",
    link: "View audit trail & event records",
    subject: "Project enquiry: data synchronization & integrations",
  },
  {
    number: "05",
    title: "Backend architecture & application modernization",
    problem: "Legacy codebases becoming brittle, sluggish, and risky to modify.",
    consequence: "Slow database queries, missing test coverage, and entangled business logic make every release an operational gamble.",
    solution: "I audit data models, optimize relational indexes, untangle database queries, introduce comprehensive test suites, and containerize deployments with Docker and Nginx.",
    evidence: "ClientForge models complex operations with transactional safety, Decimal arithmetic, and automated test coverage on a Linux VM with Nginx TLS.",
    module: "/case-studies/clientforge",
    link: "Read the technical case study",
    subject: "Project enquiry: backend architecture & modernization",
  },
];

export const businessProblems = [
  {
    problem: "Fragmented organizational & employee data",
    consequence: "People records, compensation details, and department hierarchies scattered across ad-hoc spreadsheets.",
    solution: "A structured, centralized relational data model linking employees, departments, contracts, and role histories.",
    targetModule: "/workspace/people",
    ctaText: "Inspect employee management",
  },
  {
    problem: "Sensitive actions requiring distinct permission levels",
    consequence: "Overprivileged accounts and accidental exposure of sensitive payroll, financial, or personnel records.",
    solution: "Organization-scoped role-based access control (RBAC) enforcing 6 distinct privilege tiers on every request.",
    targetModule: "/workspace/settings",
    ctaText: "Inspect RBAC & permissions",
  },
  {
    problem: "Untracked administrative & approval processes",
    consequence: "Leave requests and operational expenses approved verbally or lost in email threads with zero audit trail.",
    solution: "Structured approval state machines with automated status transitions, reviewer tracking, and event logs.",
    targetModule: "/workspace/approvals",
    ctaText: "Inspect approval workflows",
  },
  {
    problem: "Financial & operational record inconsistencies",
    consequence: "Rounding errors, duplicated calculations, and partial state changes corrupting compensation records.",
    solution: "Deterministic domain services using Decimal arithmetic, row-level database locking, and atomic transactions.",
    targetModule: "/workspace/payroll",
    ctaText: "Inspect payroll workflows",
  },
  {
    problem: "Complex systems becoming fragile over time",
    consequence: "Codebases that break whenever new features are added due to missing tests and tight coupling.",
    solution: "Decoupled Django REST service architecture protected by 71 passing automated regression test suites.",
    targetModule: "/case-studies/clientforge#engineering",
    ctaText: "Inspect architecture & tests",
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
    phase: "Discovery",
    description: "Understand the operational problem, user roles, existing software tools, and business constraints.",
  },
  {
    step: "02",
    phase: "Requirements",
    description: "Define core workflows, required system states, permission tiers, and integration touchpoints.",
  },
  {
    step: "03",
    phase: "Technical Scope",
    description: "Map database models, API contracts, domain service boundaries, and measurable milestones.",
  },
  {
    step: "04",
    phase: "Development",
    description: "Build backend domain logic and intuitive interfaces in transparent, reviewable increments.",
  },
  {
    step: "05",
    phase: "Testing",
    description: "Verify authorization boundaries, validation logic, edge cases, and automated regression tests.",
  },
  {
    step: "06",
    phase: "Delivery",
    description: "Deploy to production infrastructure with documentation, operational handover, and support.",
  },
];

export const services = commercialServices;
export const engagement = engagementPhases.map((p) => [p.phase, p.description] as [string, string]);
