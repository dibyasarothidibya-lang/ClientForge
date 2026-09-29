"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AnimatedLoginCharacters from "@/components/AnimatedLoginCharacters";
import ThemeToggle from "@/components/ThemeToggle";
import CodeSlots from "@/components/motion/CodeSlots";
import { ShieldCheck, KeyRound, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [mfaMode, setMfaMode] = useState(false);
  const [mfaStatus, setMfaStatus] = useState<"idle" | "working" | "success" | "error">("idle");

  const verifyAuthCode = async (code: string) => {
    setMfaStatus("working");
    return new Promise<{ ok: boolean }>((resolve) => {
      setTimeout(() => {
        // Any 6-digit code or demo 123456 verifies
        const ok = code.length === 6;
        resolve({ ok });
      }, 800);
    });
  };

  return (
    <main className="min-h-screen w-full flex flex-col lg:grid lg:grid-cols-12 bg-white dark:bg-[#070709] text-slate-900 dark:text-zinc-100 transition-colors duration-200 overflow-x-hidden">
      
      {/* Left Column: Full-Height Living Characters Showcase */}
      <section className="relative w-full lg:col-span-7 xl:col-span-7 min-h-[420px] lg:min-h-screen flex flex-col justify-between bg-slate-100/70 dark:bg-[#08080a] border-b lg:border-b-0 lg:border-r border-slate-200/80 dark:border-zinc-800/80 overflow-hidden transition-colors">
        
        {/* Top Branding matching Website Header (Bigger Logo & Authoritative Typography) */}
        <div className="relative z-20 p-6 sm:p-8 lg:p-10 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 group transition-opacity hover:opacity-90"
            title="Return to Client Forge Home"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-black shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-[1.02]">
              <img 
                src="/logo.jpg" 
                alt="Client Forge Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-victorian text-xl sm:text-2xl font-normal tracking-wide text-slate-900 dark:text-white select-none group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Client Forge
              </span>
              <span className="text-[9px] uppercase tracking-widest font-sans font-medium text-slate-500 dark:text-zinc-400 -mt-0.5">
                Client Intelligence OS
              </span>
            </div>
          </Link>

          {/* Mobile Right Quick Navigation */}
          <div className="lg:hidden flex items-center gap-2.5">
            <ThemeToggle compact />
            <Link
              href="/signup"
              className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>

        {/* Living Characters Stage: Expansive & Centered */}
        <div className="relative flex-1 w-full h-full min-h-[380px] flex items-center justify-center">
          <AnimatedLoginCharacters
            emailFocused={emailFocused}
            passwordFocused={passwordFocused}
            passwordVisible={passwordVisible}
            mode="login"
          />
        </div>
      </section>

      {/* Right Column: Full-Height Auth Form Panel */}
      <section className="w-full lg:col-span-5 xl:col-span-5 flex flex-col justify-between min-h-[580px] lg:min-h-screen p-6 sm:p-10 lg:p-12 xl:p-16 bg-white dark:bg-[#09090b] transition-colors duration-200">
        
        {/* Top Header Row with ThemeToggle & Switch Action */}
        <header className="hidden lg:flex items-center justify-end gap-3 w-full">
          <span className="text-xs text-slate-500 dark:text-zinc-400">
            Don&apos;t have an account?
          </span>
          <Link
            href="/signup"
            className="text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
          >
            Sign up
          </Link>
          <div className="h-4 w-[1px] bg-slate-200 dark:bg-zinc-800" />
          <ThemeToggle compact />
        </header>

        {/* Center: Auth Form Container */}
        <div className="w-full max-w-sm sm:max-w-md mx-auto my-auto py-8">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
              {mfaMode ? "Two-Factor Verification" : "Welcome back"}
            </h1>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1.5">
              {mfaMode
                ? "Enter the 6-digit confirmation code to access your workspace."
                : "Continue building high-certainty client relationships."}
            </p>
          </div>

          {/* MFA / CodeSlots Screen */}
          {mfaMode ? (
            <div className="flex flex-col items-center gap-5 my-2">
              <div className="w-full flex flex-col items-center gap-4">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 text-center">
                  Enter the 6-digit confirmation code sent to your business email:
                </p>

                <CodeSlots
                  length={6}
                  status={mfaStatus}
                  onChange={() => setMfaStatus("idle")}
                  onComplete={async (code) => {
                    const res = await verifyAuthCode(code);
                    setMfaStatus(res.ok ? "success" : "error");
                    if (res.ok) {
                      setTimeout(() => router.push("/workspace"), 700);
                    }
                  }}
                  accentColor="#6366f1"
                  inkColor="#fafafa"
                  slotColor="#27272a"
                  digitColor="#fafafa"
                  dangerColor="#ef4444"
                  slotSize={48}
                  gap={10}
                  radius={12}
                  caret
                  outcome="accept"
                />
              </div>

              <div className="w-full pt-4 border-t border-slate-200 dark:border-zinc-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setMfaMode(false)}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to password</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMfaStatus("idle")}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Resend code
                </button>
              </div>
            </div>
          ) : (
            /* Standard Password Form */
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-slate-700 dark:text-zinc-300 mb-1.5">
                  Work Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 rounded-xl text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 ring-1 ring-transparent focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 outline-none transition-all"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="text-xs font-medium text-slate-700 dark:text-zinc-300">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    {passwordVisible ? "Hide" : "Show"}
                  </button>
                </div>

                <input
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="••••••••••••"
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 rounded-xl text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 ring-1 ring-transparent focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 outline-none transition-all"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-slate-300 dark:border-zinc-700 accent-slate-900 dark:accent-white" />
                  <span>Remember me for 30 days</span>
                </label>

                <button 
                  type="button" 
                  onClick={() => setMfaMode(true)}
                  className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  <KeyRound className="w-3 h-3" />
                  <span>Use 2FA code</span>
                </button>
              </div>

              <div className="pt-2 space-y-2.5">
                <Link
                  href="/workspace"
                  className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl text-sm font-medium bg-slate-950 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-950 transition-colors shadow-sm"
                >
                  Sign In to Workspace
                </Link>

                <button
                  type="button"
                  onClick={() => setMfaMode(true)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-medium border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Sign In with 6-Digit Email Code</span>
                </button>
              </div>
            </form>
          )}

          <p className="text-center text-xs text-slate-500 dark:text-zinc-500 mt-6">
            Protected by enterprise encryption & SOC-2 compliance.
          </p>
        </div>

        {/* Empty bottom spacer to keep form balanced */}
        <div className="hidden lg:block h-6" />

      </section>

    </main>
  );
}
