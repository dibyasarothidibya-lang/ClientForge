"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import {
  ShieldCheck,
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Building2,
  UserCheck
} from "lucide-react";

export default function AuthFlowsPage() {
  const router = useRouter();

  // Mode: signin | signup | forgot | reset | verify | 2fa | org-create | org-invite
  const [mode, setMode] = useState<
    "signin" | "signup" | "forgot" | "reset" | "verify" | "2fa" | "org-create" | "org-invite"
  >("signin");

  // Form states
  const [email, setEmail] = useState("sarah.lin@acme.io");
  const [password, setPassword] = useState("••••••••••••");
  const [fullName, setFullName] = useState("Dr. Sarah Lin");
  const [companyName, setCompanyName] = useState("Acme Global Technologies");
  const [companySize, setCompanySize] = useState("50-250 Employees");
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [twoFactorCode, setTwoFactorCode] = useState(["4", "8", "9", "2", "1", "0"]);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#08080a] text-slate-900 dark:text-zinc-100 flex flex-col justify-between p-4 sm:p-8 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3 group" title="Return to Client Forge Home">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-black shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-[1.02]">
            <img 
              src="/logo.jpg" 
              alt="Client Forge Logo" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="flex flex-col">
            <span className="font-victorian text-xl font-normal tracking-wide text-slate-900 dark:text-white select-none group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              Client Forge
            </span>
            <span className="text-[9px] uppercase tracking-widest font-sans font-medium text-slate-500 dark:text-zinc-400 -mt-0.5">
              PeopleCore Auth
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle compact />
          <Link
            href="/workspace"
            className="text-xs text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white font-medium"
          >
            Go to Workspace &rarr;
          </Link>
        </div>
      </header>

      {/* Floating Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs shadow-xl flex items-center gap-2 border border-slate-700"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Switcher Pills for Instant Demonstration */}
      <div className="max-w-xl mx-auto w-full mb-4">
        <div className="flex items-center justify-center flex-wrap gap-1.5 p-1 bg-slate-200/70 dark:bg-white/[0.04] rounded-2xl text-[11px] font-medium text-slate-600 dark:text-neutral-400">
          {[
            { id: "signin", label: "1. Sign In" },
            { id: "signup", label: "2. Sign Up" },
            { id: "forgot", label: "3. Forgot Pass" },
            { id: "reset", label: "4. Reset Pass" },
            { id: "verify", label: "5. Verify Email" },
            { id: "2fa", label: "6. 2FA Code" },
            { id: "org-create", label: "7. Create Org" },
            { id: "org-invite", label: "8. Accept Invite" },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id as any)}
              className={`px-2.5 py-1 rounded-xl transition-colors cursor-pointer ${
                mode === m.id
                  ? "bg-white dark:bg-white text-slate-950 dark:text-neutral-950 font-semibold shadow-xs"
                  : "hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Form Card */}
      <div className="max-w-md mx-auto w-full rounded-3xl p-6 sm:p-10 bg-white dark:bg-[#0e0e12] border border-slate-200 dark:border-white/[0.08] shadow-sm space-y-6">
        {/* 1. SIGN IN */}
        {mode === "signin" && (
          <div className="space-y-5">
            <div>
              <h1 className="text-2xl font-bold text-slate-950 dark:text-white tracking-tight">Sign in to PeopleCore</h1>
              <p className="text-xs text-slate-500 mt-1">Access your enterprise workforce management command center.</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                router.push("/workspace");
              }}
              className="space-y-4 text-xs font-sans"
            >
              <div>
                <label className="text-slate-500 block mb-1 font-medium">Work Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-slate-500 font-medium">Password</label>
                  <button
                    type="button"
                    onClick={() => setMode("forgot")}
                    className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 w-3.5 h-3.5" />
                  <span className="text-slate-500 text-[11px]">Remember this browser for 30 days</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-semibold text-xs shadow-md cursor-pointer transition-all"
              >
                Sign In
              </button>

              <div className="relative text-center my-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-white/[0.08]" /></div>
                <span className="relative bg-white dark:bg-[#0e0e12] px-3 text-[10px] uppercase font-semibold text-slate-400">or Single Sign-On</span>
              </div>

              <button
                type="button"
                onClick={() => setMode("2fa")}
                className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/[0.04] text-xs font-medium text-slate-700 dark:text-neutral-300 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <KeyRound className="w-4 h-4 text-indigo-500" />
                <span>Continue with Corporate SAML / Okta</span>
              </button>

              <p className="text-center text-xs text-slate-500 pt-2">
                Need an organization account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer"
                >
                  Sign up
                </button>
              </p>
            </form>
          </div>
        )}

        {/* 2. SIGN UP */}
        {mode === "signup" && (
          <div className="space-y-5">
            <div>
              <h1 className="text-2xl font-bold text-slate-950 dark:text-white tracking-tight">Create your account</h1>
              <p className="text-xs text-slate-500 mt-1">Start your 14-day free trial of PeopleCore enterprise HR.</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setMode("org-create");
              }}
              className="space-y-3.5 text-xs font-sans"
            >
              <div>
                <label className="text-slate-500 block mb-1 font-medium">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
                />
              </div>

              <div>
                <label className="text-slate-500 block mb-1 font-medium">Work Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
                />
              </div>

              <div>
                <label className="text-slate-500 block mb-1 font-medium">Company Name *</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
                />
              </div>

              <div>
                <label className="text-slate-500 block mb-1 font-medium">Company Size</label>
                <select
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] outline-none cursor-pointer"
                >
                  <option value="1-15 Employees">1-15 Employees (Seed / Early)</option>
                  <option value="16-50 Employees">16-50 Employees (Growth)</option>
                  <option value="50-250 Employees">50-250 Employees (Scale-up)</option>
                  <option value="250+ Employees">250+ Employees (Enterprise)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-500 block mb-1 font-medium">Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Minimum 10 characters"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="rounded border-slate-300 w-3.5 h-3.5"
                />
                <span className="text-slate-500 text-[11px]">
                  I accept the Master Services Agreement & Privacy Policy
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-semibold text-xs shadow-md cursor-pointer transition-all"
              >
                Create Account &rarr;
              </button>

              <p className="text-center text-xs text-slate-500 pt-2">
                Already registered?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer"
                >
                  Sign in
                </button>
              </p>
            </form>
          </div>
        )}

        {/* 3. FORGOT PASSWORD */}
        {mode === "forgot" && (
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-950 dark:text-white tracking-tight">Forgot password?</h1>
              <p className="text-xs text-slate-500 mt-1">Enter your work email address to receive password reset instructions.</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setMode("reset");
                showNotification("Reset instructions dispatched to email.");
              }}
              className="space-y-4 text-xs font-sans"
            >
              <div>
                <label className="text-slate-500 block mb-1 font-medium">Work Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-semibold text-xs shadow-md cursor-pointer transition-all"
              >
                Send Reset Link
              </button>

              <button
                type="button"
                onClick={() => setMode("signin")}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                &larr; Back to sign in
              </button>
            </form>
          </div>
        )}

        {/* 4. RESET PASSWORD */}
        {mode === "reset" && (
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-950 dark:text-white tracking-tight">Choose a new password</h1>
              <p className="text-xs text-slate-500 mt-1">Your new password must be at least 10 characters long.</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setMode("signin");
                showNotification("Password successfully updated. Please sign in.");
              }}
              className="space-y-4 text-xs font-sans"
            >
              <div>
                <label className="text-slate-500 block mb-1 font-medium">New Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
                />
              </div>
              <div>
                <label className="text-slate-500 block mb-1 font-medium">Confirm New Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-semibold text-xs shadow-md cursor-pointer transition-all"
              >
                Reset Password
              </button>
            </form>
          </div>
        )}

        {/* 5. EMAIL VERIFICATION */}
        {mode === "verify" && (
          <div className="text-center space-y-4 py-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-500 mx-auto flex items-center justify-center">
              <Mail className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-slate-950 dark:text-white tracking-tight">Verify your email</h1>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              We&apos;ve sent a verification link to <strong>{email}</strong>. Click the link in the message to activate your organization seat.
            </p>
            <button
              onClick={() => {
                showNotification("Verification email re-dispatched.");
              }}
              className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer block mx-auto"
            >
              Resend verification email
            </button>
            <button
              onClick={() => setMode("signin")}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-neutral-200"
            >
              &larr; Back to sign in
            </button>
          </div>
        )}

        {/* 6. TWO-FACTOR AUTH */}
        {mode === "2fa" && (
          <div className="space-y-5">
            <div>
              <h1 className="text-2xl font-bold text-slate-950 dark:text-white tracking-tight">Two-Factor Verification</h1>
              <p className="text-xs text-slate-500 mt-1">Enter the 6-digit TOTP code generated by your authenticator app.</p>
            </div>

            <div className="flex justify-center gap-2 my-4">
              {twoFactorCode.map((digit, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const newArr = [...twoFactorCode];
                    newArr[i] = e.target.value;
                    setTwoFactorCode(newArr);
                  }}
                  className="w-11 h-12 text-center text-lg font-bold rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] outline-none focus:border-indigo-500"
                />
              ))}
            </div>

            <button
              onClick={() => router.push("/workspace")}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-semibold text-xs shadow-md cursor-pointer transition-all"
            >
              Verify Code & Continue
            </button>

            <button
              type="button"
              onClick={() => setMode("signin")}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              &larr; Cancel and return to sign in
            </button>
          </div>
        )}

        {/* 7. ORGANIZATION CREATION */}
        {mode === "org-create" && (
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-950 dark:text-white tracking-tight">Create your organization</h1>
              <p className="text-xs text-slate-500 mt-1">Set up your multi-tenant workspace domain and legal entity.</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                router.push("/onboarding/peoplecore");
              }}
              className="space-y-4 text-xs font-sans"
            >
              <div>
                <label className="text-slate-500 block mb-1 font-medium">Organization Name</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] outline-none"
                />
              </div>

              <div>
                <label className="text-slate-500 block mb-1 font-medium">Workspace URL Slug</label>
                <div className="flex items-center rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] px-3 py-2">
                  <span className="text-slate-400">app.peoplecore.io/</span>
                  <input
                    type="text"
                    defaultValue="acme-global"
                    className="bg-transparent outline-none flex-1 font-medium text-slate-900 dark:text-white pl-1"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-semibold text-xs shadow-md cursor-pointer transition-all"
              >
                Launch Setup Wizard &rarr;
              </button>
            </form>
          </div>
        )}

        {/* 8. ORGANIZATION INVITATION ACCEPTANCE */}
        {mode === "org-invite" && (
          <div className="text-center space-y-4 py-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
              <UserCheck className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-slate-950 dark:text-white tracking-tight">You&apos;ve been invited!</h1>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
              <strong>Julian Vance</strong> has invited you to join <strong>Acme Global Technologies</strong> as a <strong>Department Manager</strong>.
            </p>

            <button
              onClick={() => router.push("/workspace")}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md cursor-pointer transition-all"
            >
              Accept Invitation & Join Workspace
            </button>

            <button
              onClick={() => setMode("signin")}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-neutral-200"
            >
              Decline invitation
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400 py-4">
        Protected by 256-bit TLS encryption, SOC 2 Type II controls, and ISO 27001 data residency.
      </footer>
    </main>
  );
}
