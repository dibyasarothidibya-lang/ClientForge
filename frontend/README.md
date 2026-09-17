# Client Forge — Client Intelligence & Operations Platform

> A modern multi-tenant SaaS platform for organizations, agencies, and enterprises to manage operations, internal audits, finances, projects, and documents with grounded AI.

---

## ✨ Features

- **Luxury Editorial Landing Page**: High-contrast serif typography, fluid bento grids, interactive testimonials, and aesthetic luxury dark/light mode toggle.
- **Living Character Auth System** (`/login`, `/signup`):
  - 4 interactive animated living characters that jump, gather in a huddle, track pointer movement across the screen, and react to click/poke interactions.
  - **Animated Placards**: Characters proudly hold physical signboard cards in their hands with organic swaying physics.
  - **Privacy Mode**: When entering or viewing passwords, characters politely look away and their placards lower bashfully.
- **7-Step Onboarding Wizard** (`/onboarding`): Complete organization provisioning workflow.
- **Public Campaign & Donor Portals** (`/campaigns/[slug]`): Real-time campaign tracking, donation tiers, Stripe simulator, and printable 501(c)(3) tax receipts.
- **Multi-Tenant Operations Workspace** (`/workspace`):
  - **Executive Dashboard**: Capital tracking, audit health metrics, approval queues, and real-time activity feed.
  - **Internal Audit Standout**: Interactive 3×3 Likelihood vs. Impact Risk Matrix heatmap, findings registry, and corrective action plans.
  - **Projects & Kanban**: Drag-and-drop / click-to-move kanban boards with priority tagging.
  - **Financials & Grants**: Multi-campaign management, transactions ledger, departmental burn rates, and Stripe sandbox.
  - **Document Vault**: WORM storage simulation, evidence uploads, and SHA-256 sealed file previewer.
  - **Grounded AI Center**: Assistant chat with schema-grounded citations, risk synthesizers, and document entity extraction.
  - **System Observability & Auditing**: Health matrix, trailing latency metrics, and HMAC-verified immutable activity trail.
  - **Full Dark / Light Mode Support**: Refined luxury theme switcher accessible anywhere across the platform.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Pure CSS Modules
- **Icons**: [Lucide React](https://lucide.dev/)
- **Type Safety**: TypeScript

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to explore the platform.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 📂 Project Structure

```
frontend/
├── app/
│   ├── campaigns/[slug]/  # Public Campaign / Donor Portals
│   ├── login/             # Animated Living Characters Login
│   ├── onboarding/        # 7-Step Workspace Provisioning
│   ├── signup/            # Workspace Registration
│   ├── workspace/         # Operations Workspace (12 Modules)
│   ├── layout.tsx         # Root Layout with Theme Provider
│   └── page.tsx           # Luxury Landing Page
├── components/
│   ├── workspace/         # Sidebar, Header, Command Palette, Heatmap
│   ├── AnimatedLoginCharacters.tsx  # Interactive living characters with placards
│   ├── ThemeToggle.tsx    # Luxury segmented theme switcher
│   └── ...
├── context/
│   └── WorkspaceContext.tsx # Multi-tenant organization state engine
└── public/                # Static brand assets & logos
```

---

## 📄 License
Private repository & proprietary software. All rights reserved.

