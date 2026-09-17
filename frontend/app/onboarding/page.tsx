"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Building2,
  Users,
  FolderKanban,
  FileCheck2,
  ShieldCheck,
  CreditCard,
  Bot,
  ArrowRight,
  ArrowLeft,
  Sparkles
} from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    workspaceName: "Hope Foundation",
    slug: "hope-foundation",
    orgSize: "50-200",
    mission: "Global humanitarian logistics and clean water infrastructure.",
    orgType: "Nonprofit & Charity",
    teamEmails: "m.thorne@hopefoundation.org, e.rostova@hopefoundation.org",
    modules: {
      projects: true,
      audits: true,
      approvals: true,
      finance: true,
      documents: true,
      ai: true,
    },
    firstProjectTitle: "Clean Water Pipeline 2026",
    firstTaskTitle: "Verify borehole filtration pressure telemetry",
  });

  const nextStep = () => setStep((s) => Math.min(7, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const completeOnboarding = () => {
    router.push("/workspace");
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col justify-between p-4 sm:p-8 font-sans">
      {/* Top Header */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between py-4 border-b border-white/[0.08]">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/20 bg-black">
            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-serif text-xl tracking-tight text-[#f5f5f3]">ℭ𝔩𝔦𝔢𝔫𝔱 𝔉𝔬𝔯𝔤𝔢</span>
        </Link>
        <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
          <span>Step {step} of 7</span>
          <button
            onClick={completeOnboarding}
            className="text-neutral-400 hover:text-white transition-colors underline"
          >
            Skip to Demo &rarr;
          </button>
        </div>
      </header>

      {/* Main Form Container */}
      <main className="max-w-2xl mx-auto w-full my-12 bg-[#0e0e11] border border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-2xl">
        {/* Step Progress Dots */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step
                  ? "w-8 bg-indigo-500"
                  : i < step
                  ? "w-4 bg-emerald-400"
                  : "w-4 bg-white/10"
              }`}
            />
          ))}
        </div>

        {/* STEP 1: Workspace Name & Slug */}
        {step === 1 && (
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-2 block">Step 1: Workspace</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-normal text-[#f5f5f3] mb-3">Name Your Workspace</h2>
            <p className="text-sm text-neutral-400 mb-6 font-normal">
              This will be the central operational hub for all departments, projects, audits, and funds.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1.5">Organization / Workspace Name</label>
                <input
                  type="text"
                  value={formData.workspaceName}
                  onChange={(e) => setFormData({ ...formData, workspaceName: e.target.value })}
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white text-sm focus:outline-none focus:border-indigo-400"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1.5">Workspace URL Slug</label>
                <div className="flex items-center bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-neutral-400">
                  <span>clientforge.io/</span>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="bg-transparent text-white focus:outline-none ml-1 w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Organization Details */}
        {step === 2 && (
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-2 block">Step 2: Scale</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-normal text-[#f5f5f3] mb-3">Organization Profile</h2>
            <p className="text-sm text-neutral-400 mb-6 font-normal">
              Configure team capacity and core operational mission.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1.5">Organization Size</label>
                <select
                  value={formData.orgSize}
                  onChange={(e) => setFormData({ ...formData, orgSize: e.target.value })}
                  className="w-full px-4 py-3 bg-[#131317] border border-white/[0.1] rounded-xl text-white text-sm focus:outline-none focus:border-indigo-400"
                >
                  <option value="1-10">1 - 10 people (Small team or collective)</option>
                  <option value="11-50">11 - 50 people (Growing organization)</option>
                  <option value="50-200">50 - 200 people (Established agency or foundation)</option>
                  <option value="200+">200+ people (Enterprise or global humanitarian)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1.5">Mission / Operations Summary</label>
                <textarea
                  rows={3}
                  value={formData.mission}
                  onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white text-sm focus:outline-none focus:border-indigo-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Organization Type */}
        {step === 3 && (
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-2 block">Step 3: Industry</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-normal text-[#f5f5f3] mb-3">Select Entity Type</h2>
            <p className="text-sm text-neutral-400 mb-6 font-normal">
              Tailors default workflow templates, audit checklists, and fund reporting.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { title: "Nonprofit & Charity", desc: "Grants, donations, field audits & volunteers" },
                { title: "Boutique Advisory Agency", desc: "Client scopes, approvals, and contract delivery" },
                { title: "Civic Club & Association", desc: "Member dues, committees & governance logs" },
                { title: "High-Growth Team", desc: "Fast project sprints, cross-team approvals & APIs" }
              ].map((type) => (
                <div
                  key={type.title}
                  onClick={() => setFormData({ ...formData, orgType: type.title })}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    formData.orgType === type.title
                      ? "border-indigo-500 bg-indigo-950/20 shadow-lg"
                      : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.16]"
                  }`}
                >
                  <div className="font-medium text-sm text-white mb-1">{type.title}</div>
                  <div className="text-xs text-neutral-400">{type.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Invite Team */}
        {step === 4 && (
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-2 block">Step 4: Members</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-normal text-[#f5f5f3] mb-3">Invite Initial Collaborators</h2>
            <p className="text-sm text-neutral-400 mb-6 font-normal">
              Colleagues will receive invitations with preset role-based permissions.
            </p>
            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-1.5">Email addresses (comma separated)</label>
              <textarea
                rows={3}
                value={formData.teamEmails}
                onChange={(e) => setFormData({ ...formData, teamEmails: e.target.value })}
                placeholder="colleague@organization.org, lead@organization.org"
                className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white text-sm focus:outline-none focus:border-indigo-400"
              />
              <span className="text-[11px] text-neutral-500 mt-2 block font-mono">
                Pre-configured demo seeds will also be available for testing.
              </span>
            </div>
          </div>
        )}

        {/* STEP 5: Choose Modules */}
        {step === 5 && (
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-2 block">Step 5: Capabilities</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-normal text-[#f5f5f3] mb-3">Enable Workspace Modules</h2>
            <p className="text-sm text-neutral-400 mb-6 font-normal">
              Select which operational business areas you want enabled on the sidebar.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { key: "projects", label: "Projects & Tasks (Kanban)", icon: FolderKanban },
                { key: "audits", label: "Internal Audits & Risk Matrix", icon: ShieldCheck },
                { key: "approvals", label: "Approval Workflow Engine", icon: FileCheck2 },
                { key: "finance", label: "Donations & Finance", icon: CreditCard },
                { key: "documents", label: "Document Storage & Versions", icon: Building2 },
                { key: "ai", label: "Grounded AI Operations", icon: Bot },
              ].map((item) => {
                const Icon = item.icon;
                const isChecked = formData.modules[item.key as keyof typeof formData.modules];
                return (
                  <label
                    key={item.key}
                    className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-colors ${
                      isChecked
                        ? "border-indigo-500/80 bg-indigo-950/20 text-white"
                        : "border-white/[0.06] bg-white/[0.02] text-neutral-400"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          modules: { ...formData.modules, [item.key]: e.target.checked },
                        })
                      }
                      className="rounded accent-indigo-500"
                    />
                    <Icon className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span className="text-xs font-medium">{item.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 6: Create First Project */}
        {step === 6 && (
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-2 block">Step 6: First Initiative</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-normal text-[#f5f5f3] mb-3">Create Your First Project</h2>
            <p className="text-sm text-neutral-400 mb-6 font-normal">
              Seed your primary initiative and first actionable task.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1.5">Project Title</label>
                <input
                  type="text"
                  value={formData.firstProjectTitle}
                  onChange={(e) => setFormData({ ...formData, firstProjectTitle: e.target.value })}
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white text-sm focus:outline-none focus:border-indigo-400"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1.5">First Priority Task</label>
                <input
                  type="text"
                  value={formData.firstTaskTitle}
                  onChange={(e) => setFormData({ ...formData, firstTaskTitle: e.target.value })}
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white text-sm focus:outline-none focus:border-indigo-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: Workspace Ready */}
        {step === 7 && (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2 block">Setup Complete</span>
            <h2 className="text-3xl font-serif font-normal text-[#f5f5f3] mb-3">Your Workspace Is Ready</h2>
            <p className="text-sm text-neutral-400 mb-8 max-w-md mx-auto font-normal">
              {formData.workspaceName} has been configured with multi-tenancy, granular roles, seeded demo records, and connected workflows.
            </p>

            <button
              onClick={completeOnboarding}
              className="px-8 py-4 bg-[#f5f5f3] hover:bg-white text-neutral-950 font-semibold text-sm rounded-full transition-all shadow-xl hover:scale-105"
            >
              Launch Workspace &rarr;
            </button>
          </div>
        )}

        {/* Navigation Buttons */}
        {step < 7 && (
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-white/[0.08]">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-neutral-400 hover:text-white transition-colors text-xs font-mono"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            ) : <div />}

            <button
              type="button"
              onClick={nextStep}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all text-xs font-semibold shadow-lg shadow-indigo-600/30"
            >
              Next Step
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-xs font-mono text-neutral-500 py-4">
        © Client Forge Systems, Inc. • High-Impact Operations Platform
      </footer>
    </div>
  );
}
