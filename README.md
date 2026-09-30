# ClientForge — Enterprise Workforce & Client Intelligence OS

<div align="center">

![ClientForge](frontend/public/logo.jpg)

**High-certainty workforce orchestration, precision opportunity intelligence, and enterprise-grade multi-tenant operations.**

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.8-blue?style=flat-square&logo=react)](https://react.dev/)
[![Django 6](https://img.shields.io/badge/Django-6.1.1-092e20?style=flat-square&logo=django)](https://www.djangoproject.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Stripe](https://img.shields.io/badge/Stripe-v15.6-635bff?style=flat-square&logo=stripe)](https://stripe.com/)
[![Firebase](https://img.shields.io/badge/Firebase-v12.19-ffca28?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS 4](https://img.shields.io/badge/TailwindCSS-4.0-38b2ac?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)](#-license)

[System Architecture](#-master-system-architecture--flowcharts) • [Module Flowcharts](#-end-to-end-operational-flowcharts) • [Deep-Dive Backend Architecture](#-deep-dive-backend-system-architecture) • [Core Capabilities](#-core-capabilities) • [Quick Start](#-quick-start) • [Environment Variables](#-configuration)

</div>

---

## 🗺️ Master System Architecture & Flowcharts

### 1. High-Level Enterprise System Topology

The following diagram maps the entire distributed architecture across client applications, perimeter security, API gateways, core service domains, asynchronous background processing, database tiers, and third-party integrations:

```mermaid
flowchart TD
    subgraph Clients["Presentation & Client Layer (Next.js 16 / React 19)"]
        WebDesktop["Desktop Browser (App Router)"]
        WebMobile["Mobile Responsive Client"]
        LivingAuth["Living Characters Auth Stage"]
        PricingUI["Pricing & Tier Checkout Modal"]
        ComplianceUI["Security & Compliance Pack Modal"]
    end

    subgraph SecurityPerimeter["Perimeter Security & Routing"]
        Cloudflare["Cloudflare Edge (DDoS / SSL Termination)"]
        CORS["Django CORS Middleware"]
        TenantContext["TenantContextMiddleware (Organization Scoping)"]
        JWTAuth["JWT Bearer Authentication Handler"]
        Throttling["API Rate Limiting (User / Anon / Auth)"]
    end

    subgraph APIGateway["Core REST API Engine (Django 6 / DRF 3.18)"]
        AuthApp["apps.accounts (Users, Sessions, MFA)"]
        OrgApp["apps.organizations (Tenants, Teams, RBAC)"]
        EmpApp["apps.employees (Lifecycle, Profiles, Directory)"]
        AttApp["apps.attendance (Shifts, GPS / IP Punch Clocks)"]
        LeaveApp["apps.leave (Balances, Multi-Tier Approvals)"]
        PayrollApp["apps.payroll (Comp Ledgers, Payslip Disbursal)"]
        DocApp["apps.documents (AES-256 Vault, SHA-256 Seals)"]
        AuditApp["apps.audit (HMAC Immutable Activity Log)"]
        OpsApp["apps.operations (Pipeline, Bootstrap, Radar)"]
        NotifApp["apps.notifications (Email Service & CID Branding)"]
        IntegApp["apps.integrations (Firebase SSO, Stripe Sessions)"]
    end

    subgraph AsyncWorker["Asynchronous Event & Task Processing"]
        RedisBroker["Redis 8 (Message Broker & Cache)"]
        CeleryWorker["Celery 5.6 Worker Cluster"]
        CeleryBeat["Celery Beat Periodic Scheduler"]
    end

    subgraph Persistence["Persistence & Storage Layer"]
        PostgresPrimary[("PostgreSQL 16 Primary DB (ACID Multi-Tenant)")]
        LocalMedia["Local Media Encrypted Volume"]
        CloudStorage["Google Cloud Storage Bucket"]
    end

    subgraph ExternalEcosystem["Third-Party Cloud Ecosystem"]
        GoogleIdentity["Firebase Auth / Google Identity Toolkit"]
        StripeGateway["Stripe Checkout & Billing Engine"]
        GoogleSMTP["Gmail SMTP Relay (smtp.gmail.com)"]
        ResendSMTP["Resend Transactional Mail Engine"]
    end

    %% Client Interactions
    Clients -->|HTTPS Requests| Cloudflare
    Cloudflare --> CORS
    CORS --> TenantContext
    TenantContext --> JWTAuth
    JWTAuth --> Throttling

    %% Routing to Apps
    Throttling --> AuthApp
    Throttling --> OrgApp
    Throttling --> EmpApp
    Throttling --> AttApp
    Throttling --> LeaveApp
    Throttling --> PayrollApp
    Throttling --> DocApp
    Throttling --> AuditApp
    Throttling --> OpsApp
    Throttling --> NotifApp
    Throttling --> IntegApp

    %% Integrations & External
    IntegApp -->|OAuth Token Verification| GoogleIdentity
    IntegApp -->|Session Creation & Webhooks| StripeGateway
    NotifApp -->|TLS 587 Relay| GoogleSMTP
    NotifApp -->|REST / SMTP| ResendSMTP

    %% Async Dispatch
    NotifApp -.->|Queue Email Task| RedisBroker
    PayrollApp -.->|Queue Bulk Payslip Generation| RedisBroker
    RedisBroker --> CeleryWorker
    CeleryBeat --> RedisBroker

    %% Storage & DB
    APIGateway -->|Read / Write Partitioned Rows| PostgresPrimary
    DocApp -->|Save Encrypted Vault Objects| LocalMedia
    DocApp -->|Archive Documents| CloudStorage
```

---

## 🔄 End-to-End Operational Flowcharts

### 2. Dual Authentication & Session Lifecycle (Native JWT vs. Firebase Google SSO)

```mermaid
sequenceDiagram
    autonumber
    actor User as User / Browser
    participant Client as Frontend (Next.js 16)
    participant Google as Google Identity / Firebase
    participant API as Backend Auth API (/api/v1/auth/)
    participant DB as PostgreSQL Database
    participant Mail as Email Service (SMTP)

    alt Native Email & Password Sign-In
        User->>Client: Enters Work Email & Password
        Note over Client: Living characters look away (Privacy Mode)
        Client->>API: POST /api/v1/auth/login/ {email, password}
        API->>DB: Query User & Verify Argon2/BCrypt Hash
        alt Valid Credentials & MFA Required
            API-->>Client: 200 OK {mfa_required: true}
            API->>Mail: Dispatch 6-Digit Verification Code
            Client->>User: Renders CodeSlots Modal
            User->>Client: Submits 6-digit Code
            Client->>API: POST /api/v1/auth/login/ {code, email}
        end
        API-->>Client: 200 OK {access_token, refresh_token, user, org}
        Client->>User: Redirects to /workspace
    else Google One-Tap / Popup SSO
        User->>Client: Clicks "Continue with Google"
        Client->>Google: signInWithPopup(auth, googleProvider)
        Google-->>Client: Returns Firebase ID Token (JWT)
        Client->>API: POST /api/v1/auth/firebase-login/ {idToken}
        API->>Google: Verify ID Token Signature with Firebase Admin SDK
        Google-->>API: Token Claims (UID, Email, Name)
        API->>DB: Get or Provision User & Default Organization
        API-->>Client: 200 OK {access_token, refresh_token, user, org}
        Client->>User: Sets Local Storage & Enters /workspace
    end
```

---

### 3. Stripe Subscription Checkout & Webhook Provisioning Flow

```mermaid
flowchart TD
    StartCheckout(["User on /pricing selects Plan"]) --> ClickCheckout["Click 'Deploy Plan' / 'Activate Trial'"]
    ClickCheckout --> Modal["Open Subscription Modal"]
    Modal --> SubmitStripe["POST /api/v1/integrations/stripe/create-checkout-session/"]

    subgraph BackendSession["Backend Session Provisioner"]
        SubmitStripe --> LookupPrice["Map Tier: Independent ($49) / Boutique ($149) / Growth ($349)"]
        LookupPrice --> CallStripe["stripe.checkout.Session.create(...) with ClientForge Logo & URLs"]
        CallStripe --> ReturnURL["Return {success: true, checkout_url, session_id}"]
    end

    ReturnURL --> RedirectStripe["Redirect Browser to official Stripe Hosted Checkout"]
    RedirectStripe --> UserEntersCard["User completes Card Payment (or 4242 Test Sandbox)"]

    subgraph StripeCloud["Stripe Cloud Engine"]
        UserEntersCard --> StripeProcesses["Payment Authorized & Captured"]
        StripeProcesses --> EmitWebhook["Emit Event: checkout.session.completed"]
        StripeProcesses --> RedirectSuccess["Redirect User to /pricing?payment=success&session_id=..."]
    end

    EmitWebhook --> WebhookEndpoint["POST /api/v1/integrations/stripe/webhook/"]

    subgraph Provisioning["Tenant Provisioning Engine"]
        WebhookEndpoint --> VerifySig["Verify Stripe Signature Header"]
        VerifySig --> MatchTenant["Extract customer_email & plan_name metadata"]
        MatchTenant --> UpgradeDB["Update Organization.plan in PostgreSQL"]
        UpgradeDB --> DispatchWelcome["EmailService.send_transactional_email (Welcome Receipt)"]
    end

    RedirectSuccess --> EnterWorkspace["User Clicks 'Enter Workspace' with upgraded entitlement"]
```

---

### 4. Enterprise Attendance, Leave Governance & Itemized Payroll Cycle

```mermaid
flowchart LR
    subgraph AttendanceCycle["1. Daily Attendance & Time Tracking"]
        PunchIn["Employee Mobile/Desktop Clock In"] --> GPSCheck["Validate Geofence & IP Whitelist"]
        GPSCheck --> CalcStatus{"Timestamp vs Shift Policy"}
        CalcStatus -->|Before Shift Start| Present["Status: Present"]
        CalcStatus -->|Grace Period Exceeded| Late["Status: Late (+ Minutes Late)"]
        CalcStatus -->|Half-day Threshold| HalfDay["Status: Half Day"]
        Present & Late & HalfDay --> LogRecord["Write AttendanceRecord with Time-Lock"]
    end

    subgraph LeaveGovernance["2. Tiered Leave Governance"]
        ReqLeave["Submit Leave Request (Annual / Medical / Casual)"] --> CheckBal{"Check Entitlement Balance"}
        CheckBal -->|Insufficient Days| RejectAuto["Instant Ineligible Error"]
        CheckBal -->|Available Balance| NotifyLead["Notify Department Lead via Email"]
        NotifyLead --> ReviewDecision{"Manager Review"}
        ReviewDecision -->|Approved| DeductBal["Deduct Balance + Mark Calendar"]
        ReviewDecision -->|Rejected| RevertBal["Retain Balance + Send Reason"]
        DeductBal & RevertBal --> SendDecisionMail["EmailService: Leave Status Notification"]
    end

    subgraph PayrollCycle["3. Monthly Payroll Compilation"]
        PeriodEnd["Period Closing Date (e.g. Month End)"] --> GatherData["Aggregate Attendance Days + Approved Leaves"]
        GatherData --> CalcGross["Compute Base Salary + Overtime - Deductions"]
        CalcGross --> ApprExpenses["Audit & Sum Approved Expense Reimbursements"]
        ApprExpenses --> NetDisbursal["Compute Final Net Compensation Ledger"]
        NetDisbursal --> GenerateSlip["Create PayrollRecord & Generate HTML Payslip"]
        GenerateSlip --> SendPayslipMail["EmailService: Dispatch Itemized Payslip with Inline Logo"]
    end

    AttendanceCycle --> LeaveGovernance
    LeaveGovernance --> PayrollCycle
```

---

## 🏛️ Deep-Dive Backend System Architecture

ClientForge's backend is engineered to handle rigorous multi-tenant B2B SaaS demands, ensuring zero data leakage, continuous auditability, sub-100ms API response latency, and resilient third-party integrations.

### 1. Multi-Tenant Boundary Isolation & Organization Scoping
* **Contextual Request Hydration**: Every inbound HTTP request passes through `TenantContextMiddleware`. The middleware inspects `X-Organization-Id` headers or decoded JWT claims (`org_id`) to bind an immutable `request.organization` and `request.membership` context.
* **Declarative Manager Filters**: All tenant-scoped models inherit from a specialized `TenantManager` with default querysets restricted via `.filter(organization=request.organization)`. This guarantees that even accidental raw ORM queries cannot read or write data across organizational boundaries.
* **Role-Based Access Control (RBAC)**: Fine-grained permission classes (`IsTenantMember`, `IsTenantAdmin`, `IsTenantOwner`) govern operations across departments, salary figures, and audit findings, ensuring absolute least-privilege compliance.

### 2. Dual Cryptographic Authentication Engine
* **Stateless JWT Rotation**: Token pairs generated via Django REST Framework SimpleJWT implement short-lived access tokens (60 minutes) alongside sliding refresh tokens (7 days). Token blacklisting in Redis prevents replay attacks during logouts or privilege revocations.
* **Federated Google Identity Verification**: Firebase Web SDK signs Google OAuth payloads into cryptographic identity tokens. The backend validates token signatures in real-time via the Google Identity Public Key Set, extracting verified email claims, creating missing tenant profiles, and synchronizing user identities without passwords.
* **Two-Factor Authentication (2FA)**: Time-sensitive, 6-digit confirmation codes are dispatched via outbound transactional channels, enforcing two-step verification for sensitive operations like organization switching and administrative exports.

### 3. Asynchronous Job Queues & Resilient Email Transport
* **Worker Queue Architecture**: Celery 5.6 coupled with Redis 8 handles high-volume, non-blocking tasks including bulk payslip calculations, audit report exports, and transactional email distribution.
* **Inline MIME Email Composition**: To maximize inbox deliverability and prevent email clients (like Gmail or Apple Mail) from blocking branding assets, emails embed high-resolution PNG/JPEG logos as inline MIME attachments referenced through unique Content-IDs (`cid:clientforge_logo`), ensuring immediate visual fidelity without user prompts.
* **Transport Failover**: Built-in support for dual SMTP transports—primary production relays via Google Workspace SMTP (`smtp.gmail.com:587`) or custom infrastructure via Resend (`smtp.resend.com:587`) with automatic fallbacks and synchronous graceful degradation.

### 4. Billing, Checkout Sessions & Webhook Synchronization
* **Server-Side Session Minting**: Checkout sessions are minted server-side using Stripe's official SDK, preventing client-side parameter manipulation, tier spoofing, or pricing tampering.
* **Webhook Idempotency**: Stripe webhook endpoints verify HMAC SHA-256 signatures (`HTTP_STRIPE_SIGNATURE`) using a dedicated signing secret. Events like `checkout.session.completed` update tenant subscription tiers atomically inside database transactions.
* **Self-Contained Sandbox**: Supports full test-mode operation without requiring verified banking rails or regional merchant approvals, enabling frictionless local and staging development.

### 5. Compliance, Time-Locked Auditing & Document Vault
* **Immutable Audit Trail**: Any record creation, status update, download, or financial change records an audit entry with actor identity, source IP, user-agent, UTC timestamp, and JSON delta state.
* **AES-256 Document Vault**: Sensitive corporate documents (such as executive contracts, medical leaves, and payroll records) are stored with SHA-256 integrity checksums to detect file tampering.
* **Data Privacy Governance**: Pre-configured architectural compliance supporting SOC-2 Type II controls, ISO 27001 data isolation policies, and GDPR/CCPA data subject access workflows.

---

## 🌟 Core Capabilities

### 🏢 PeopleCore™ HR & Workforce OS
* **Full Lifecycle Employee Management**: Departments, designated job roles, automated compensation structures, and emergency contacts.
* **Smart Attendance & Real-Time Punch Clock**: GPS/IP-validated shifts, automated status calculation (`Present`, `Late`, `Half Day`, `Absent`), and team rosters.
* **Tiered Leave Governance**: Entitlement balance ledgers, single-click approvals, and employee self-service balances.
* **Payroll & Expense Reimbursement Engine**: Auto-computed net compensations, direct bank disbursements, and automated itemized payslip delivery.
* **Immutable Document Vault**: AES-256 encrypted storage with SHA-256 seal verification for contracts, medical leave slips, and compliance dossiers.

### 🛡️ Enterprise Security & Multi-Tenancy
* **Strict Tenant Context Isolation**: Middleware-enforced logical and physical tenant boundary isolation across all database operations.
* **Zero-Trust Audit Logs**: Cryptographically verifiable audit trail capturing actor, target UUID, IP address, user-agent, and before/after payloads.
* **Interactive Living Characters Auth**: Reactive, organic UI characters that track cursor interactions, huddle together, and bashfully cover their eyes during password entry.
* **Dual Authentication Modes**:
  * Native JWT with rotating refresh tokens and BCrypt password encryption.
  * Google One-Tap & Popup OAuth via Firebase Authentication.

### 📧 Transactional Email Engine
* Centralized delivery service with styled HTML templates, plain-text fallbacks, and embedded **inline CID branding**.
* Production-ready for Gmail SMTP Relay, Resend, SendGrid, or AWS SES.
* Automated dispatch for:
  * Team member workspace invitations with expiring single-use tokens.
  * One-click password resets and email account verification.
  * Leave approval/rejection notices.
  * Itemized monthly payslips.
  * SOC-2 & ISO-27001 Security & Compliance Dossiers.

---

## 🏗️ Architecture & Technology Matrix

| Layer | Technologies | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | [Next.js 16 (Turbopack App Router)](https://nextjs.org/) | Server & Client Components, Dynamic Routes, Fast Refresh |
| **UI Library** | [React 19](https://react.dev/) | Concurrent UI features, actions, hooks |
| **Styling & Motion** | [Tailwind CSS v4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion) | Fluid luxury styling, 3D cards, character rigging |
| **Interactive 3D** | [Three.js](https://threejs.org/) | Spatial mesh particle field & depth backgrounds |
| **Backend Framework** | [Django 6.1](https://www.djangoproject.com/) / Python 3.13 | High-concurrency enterprise REST API |
| **API Architecture** | [Django REST Framework 3.18](https://www.django-rest-framework.org/) | REST serializers, viewsets, and granular permission gates |
| **Relational Database** | [PostgreSQL 16](https://www.postgresql.org/) | Multi-tenant relational schema, indexes, and transactions |
| **Cache & Tasks** | [Redis 8](https://redis.io/) & [Celery 5.6](https://docs.celeryq.dev/) | Asynchronous email queues, periodic scheduler, caching |
| **Payment Gateway** | [Stripe SDK 15.6](https://stripe.com/) | Hosted Checkout Sessions, Webhooks, Billing tiers |
| **Identity & Storage** | [Firebase Admin 7.7](https://firebase.google.com/) | Google OAuth verification & Cloud Storage buckets |
| **Email Relay** | Google SMTP Relay / Resend | High-deliverability transactional dispatch with inline CID |

---

## 📂 Project Structure

```text
Client Forge/
├── backend/                        # Django REST API Engine
│   ├── apps/
│   │   ├── accounts/               # Custom User, JWT Auth, Firebase SSO, Password Resets
│   │   ├── attendance/             # Daily Punch Clocks, Overtime, Shift Management
│   │   ├── audit/                  # Immutable Audit Trail & Telemetry
│   │   ├── documents/              # Encrypted Document Vault & Downloads
│   │   ├── employees/              # Staff Directory, Compensation, Emergency Contacts
│   │   ├── integrations/           # External Providers (Firebase, Stripe, Webhooks)
│   │   ├── leave/                  # Entitlements, Leave Requests, Approval Workflows
│   │   ├── notifications/          # Email Service, Base Templates, Diagnostic Commands
│   │   ├── operations/             # Candidates, Performance Goals, Workspace Bootstrap
│   │   ├── organizations/          # Multi-Tenant Isolation, Memberships, Departments
│   │   └── payroll/                # Salaries, Expense Approvals, Itemized Payslips
│   ├── core/                       # Settings, Middleware, URL Routing, Exceptions
│   ├── templates/emails/           # Responsive Transactional Email Templates
│   └── manage.py                   # Management Command CLI
├── frontend/                       # Next.js 16 Web Application
│   ├── app/                        # App Router Pages (Landing, Auth, Workspace, Pricing)
│   ├── components/                 # Living Characters, Navbar, Modals, 3D Canvas
│   ├── context/                    # Multi-Tenant Workspace & Auth Context
│   ├── lib/                        # API Client, Firebase Client, Seed Data
│   └── public/                     # Brand Assets, Logos, Vectors
├── docker-compose.yml              # Multi-Service Production Compose
└── README.md                       # Master Architecture Guide
```

---

## 🚀 Quick Start

### Prerequisites
* **Node.js** >= 20.x
* **Python** >= 3.11 (3.13 recommended)
* **PostgreSQL** >= 15
* **Redis** (optional for dev, required for Celery tasks)

---

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate Python virtual environment
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Seed baseline demonstration data
python manage.py seed_data

# Start development server
python manage.py runserver 127.0.0.1:8000
```

---

### 2. Frontend Setup

```bash
# Navigate to frontend directory in a separate terminal
cd frontend

# Install npm dependencies
npm install

# Start development server
npm run dev
```

Visit **[http://localhost:3000](http://localhost:3000)** in your browser to explore the platform.

---

## ⚙️ Configuration

### Backend (`backend/.env`)

```env
# Application Core
DJANGO_SECRET_KEY=your-secure-production-secret-key
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0

# Database (PostgreSQL)
DB_NAME=client_forge
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=127.0.0.1
DB_PORT=5432

# Redis & Queues
REDIS_URL=redis://127.0.0.1:6379/0
CELERY_BROKER_URL=redis://127.0.0.1:6379/0

# Stripe Payments (Sandbox)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Authentication & Firebase
FIREBASE_CREDENTIALS_PATH=firebase-service-account.json
FIREBASE_STORAGE_BUCKET=your-app.firebasestorage.app

# Email Delivery (Gmail SMTP or Resend)
DJANGO_EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your_email@gmail.com
EMAIL_HOST_PASSWORD=your_app_password
DEFAULT_FROM_EMAIL=ClientForge <your_email@gmail.com>

# Frontend Origin
FRONTEND_URL=http://localhost:3000
```

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-web-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## 🧪 Testing & Diagnostics

### Run Full Test Suite (71 Unit & Integration Tests)
```bash
python manage.py test
```

### Test Outbound Email Dispatch
```bash
python manage.py test_email --to recipient@example.com
```

### Verify System Health
```bash
curl http://127.0.0.1:8000/api/v1/health/
```

---

## 📄 License
Proprietary & Confidential. All rights reserved. © 2026 Client Forge Systems, Inc.
