"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AnimatedLoginCharacters from "@/components/AnimatedLoginCharacters";
import styles from "../login/login.module.css";
import { ArrowRight, Sparkles, Building2, CheckCircle2 } from "lucide-react";

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
    orgType: "Nonprofit & Humanitarian Aid",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Move to onboarding wizard
    router.push("/onboarding");
  };

  return (
    <main className={`${styles.page} relative py-8 px-4 sm:px-8`}>
      {/* Top Left Floating Brand Navigation */}
      <div className="absolute top-6 left-6 z-20 hidden sm:block">
        <Link href="/" className="inline-flex items-center gap-2.5 group" title="Return to Client Forge Home">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-200 group-hover:scale-105 transition-transform bg-black shrink-0 shadow-sm">
            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-base font-normal tracking-wide text-slate-900 select-none">
            ℭ𝔩𝔦𝔢𝔫𝔱 𝔉𝔬𝔯𝔤𝔢
          </span>
        </Link>
      </div>

      <div className={`${styles.card} max-h-[92vh] overflow-hidden`}>
        {/* LEFT SIDE: Interactive Living Characters */}
        <section className={styles.visual}>
          <AnimatedLoginCharacters
            emailFocused={emailFocused}
            passwordFocused={passwordFocused}
            passwordVisible={passwordVisible}
            mode="signup"
          />
        </section>

        {/* RIGHT SIDE: Signup Form */}
        <section className={`${styles.formSide} overflow-y-auto max-h-[92vh] py-6 px-6 sm:px-10`}>
          <div className={styles.form}>
            {/* Centered Brand Emblem & Wordmark */}
            <div className="flex justify-center mb-4">
              <Link href="/" className="inline-flex items-center gap-3 group" title="Return to Client Forge">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md shadow-indigo-500/10 border border-slate-200 group-hover:scale-105 transition-transform bg-black shrink-0">
                  <img 
                    src="/logo.jpg" 
                    alt="Client Forge Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xl sm:text-2xl font-normal tracking-wide text-slate-900 select-none transition-colors">
                    ℭ𝔩𝔦𝔢𝔫𝔱 𝔉𝔬𝔯𝔤𝔢
                  </span>
                  <span className="text-[9px] uppercase tracking-widest font-bold text-indigo-600 -mt-1">
                    Client Intelligence OS
                  </span>
                </div>
              </Link>
            </div>

            <h1 className="!text-2xl sm:!text-3xl">Create Workspace</h1>

            <p className={`${styles.subtitle} !mt-1.5 !mb-5`}>
              Launch your organization operations command center.
            </p>

            <form onSubmit={handleSubmit}>
              <div className={`${styles.field} !mb-3`}>
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Dr. Sarah Lin"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div className={`${styles.field} !mb-3`}>
                <label htmlFor="orgName">Organization Name</label>
                <input
                  id="orgName"
                  type="text"
                  placeholder="Hope Foundation"
                  required
                  value={formData.orgName}
                  onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                />
              </div>

              <div className={`${styles.field} !mb-3`}>
                <label htmlFor="email">Work Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="s.lin@hopefoundation.org"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
              </div>

              <div className={`${styles.field} !mb-4`}>
                <label htmlFor="password">
                  <span>Password</span>
                  {passwordVisible && (
                    <span className="text-[10px] text-amber-600 font-mono ml-2">
                      (characters looking away)
                    </span>
                  )}
                </label>

                <div className={styles.passwordWrapper}>
                  <input
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Create a strong password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                  />

                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setPasswordVisible((v) => !v)}
                    aria-label={passwordVisible ? "Hide password" : "Show password"}
                  >
                    {passwordVisible ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button type="submit" className={styles.loginButton}>
                Continue to Onboarding &rarr;
              </button>

              {/* Direct Demo Access Shortcut */}
              <div className="mt-4 pt-4 border-t border-slate-100 text-center">
                <Link
                  href="/workspace"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Explore Demo Workspace Directly (No Signup Required) &rarr;</span>
                </Link>
              </div>
            </form>

            <p className={styles.signup}>
              Already have an account?{" "}
              <Link href="/login">
                Log in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
