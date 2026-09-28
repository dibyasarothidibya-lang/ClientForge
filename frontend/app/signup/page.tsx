"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AnimatedLoginCharacters from "@/components/AnimatedLoginCharacters";
import ThemeToggle from "@/components/ThemeToggle";
import { ArrowRight, Sparkles } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    orgName: "",
    orgType: "Advisory & Principal Studio",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/onboarding");
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
              <span className="font-semibold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white select-none group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Client Forge
              </span>
              <span className="text-[9px] uppercase tracking-widest font-mono text-slate-500 dark:text-zinc-400 -mt-0.5">
                Client Intelligence OS
              </span>
            </div>
          </Link>

          {/* Mobile Right Quick Navigation */}
          <div className="lg:hidden flex items-center gap-2.5">
            <ThemeToggle compact />
            <Link
              href="/login"
              className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Living Characters Stage: Expansive & Centered */}
        <div className="relative flex-1 w-full h-full min-h-[380px] flex items-center justify-center">
          <AnimatedLoginCharacters
            emailFocused={emailFocused}
            passwordFocused={passwordFocused}
            passwordVisible={passwordVisible}
            mode="signup"
          />
        </div>
      </section>

      {/* Right Column: Full-Height Auth Form Panel */}
      <section className="w-full lg:col-span-5 xl:col-span-5 flex flex-col justify-between min-h-[580px] lg:min-h-screen p-6 sm:p-10 lg:p-12 xl:p-16 bg-white dark:bg-[#09090b] transition-colors duration-200">
        
        {/* Top Header Row with ThemeToggle & Switch Action */}
        <header className="hidden lg:flex items-center justify-end gap-3 w-full">
          <span className="text-xs text-slate-500 dark:text-zinc-400">
            Already have an account?
          </span>
          <Link
            href="/login"
            className="text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
          >
            Sign in
          </Link>
          <div className="h-4 w-[1px] bg-slate-200 dark:bg-zinc-800" />
          <ThemeToggle compact />
        </header>

        {/* Center: Auth Form Container */}
        <div className="w-full max-w-sm sm:max-w-md mx-auto my-auto py-6 sm:py-8">
          <div className="mb-5">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
              Create your workspace
            </h1>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
              Set up your client intelligence and pipeline engine.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label htmlFor="fullName" className="block text-xs font-medium text-slate-700 dark:text-zinc-300 mb-1">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Marcus Vance"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 rounded-xl text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 ring-1 ring-transparent focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="orgName" className="block text-xs font-medium text-slate-700 dark:text-zinc-300 mb-1">
                Organization / Studio Name
              </label>
              <input
                id="orgName"
                type="text"
                placeholder="Vance Advisory Group"
                required
                value={formData.orgName}
                onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 rounded-xl text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 ring-1 ring-transparent focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-medium text-slate-700 dark:text-zinc-300 mb-1">
                Work Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="marcus@vancegroup.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 rounded-xl text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 ring-1 ring-transparent focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 outline-none transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="text-xs font-medium text-slate-700 dark:text-zinc-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {passwordVisible ? "Hide" : "Show"}
                </button>
              </div>

              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Create a secure passphrase"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 rounded-xl text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 ring-1 ring-transparent focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 outline-none transition-all"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl text-sm font-medium bg-slate-950 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-950 transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Continue to Onboarding</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Direct Demo Access Shortcut */}
            <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 text-center">
              <Link
                href="/workspace"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Explore Live Demo Workspace Directly</span>
              </Link>
            </div>
          </form>
        </div>

        {/* Empty bottom spacer */}
        <div className="hidden lg:block h-6" />

      </section>

    </main>
  );
}
