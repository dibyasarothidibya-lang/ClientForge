"use client";

import { useState } from "react";
import Link from "next/link";
import AnimatedLoginCharacters from "@/components/AnimatedLoginCharacters";
import styles from "./login.module.css";

export default function LoginPage() {
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        {/* LEFT SIDE */}
        <section className={styles.visual}>
          <AnimatedLoginCharacters
            emailFocused={emailFocused}
            passwordFocused={passwordFocused}
            passwordVisible={passwordVisible}
            mode="login"
          />
        </section>

        {/* RIGHT SIDE */}
        <section className={styles.formSide}>
          <div className={styles.form}>
            <div className="flex justify-center mb-6">
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

            <h1>Welcome back</h1>

            <p className={styles.subtitle}>
              Continue building better client relationships.
            </p>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className={styles.field}>
                <label htmlFor="email">Email</label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="password">Password</label>

                <div className={styles.passwordWrapper}>
                  <input
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="••••••••"
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                  />

                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setPasswordVisible((visible) => !visible)}
                    aria-label={
                      passwordVisible ? "Hide password" : "Show password"
                    }
                  >
                    {passwordVisible ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className={styles.options}>
                <label>
                  <input type="checkbox" />
                  Remember me
                </label>

                <button type="button">
                  Forgot password?
                </button>
              </div>

              <button type="submit" className={styles.loginButton}>
                Log in
              </button>

              <button type="button" className={styles.googleButton}>
                <GoogleIcon />
                Continue with Google
              </button>
            </form>

            <p className={styles.signup}>
              New to Client Forge?{" "}
              <Link href="/signup">
                Create account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.57c2.08-1.92 3.27-4.74 3.27-8.09Z"
      />

      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.76c-.99.66-2.25 1.05-3.71 1.05-2.87 0-5.3-1.94-6.17-4.54H2.14v2.84A11 11 0 0 0 12 23Z"
      />

      <path
        fill="#FBBC05"
        d="M5.83 14.09A6.61 6.61 0 0 1 5.48 12c0-.73.13-1.43.35-2.09V7.07H2.14A11 11 0 0 0 1 12c0 1.78.43 3.46 1.14 4.93l3.69-2.84Z"
      />

      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.2 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.14 7.07l3.69 2.84c.87-2.6 3.3-4.53 6.17-4.53Z"
      />
    </svg>
  );
}
