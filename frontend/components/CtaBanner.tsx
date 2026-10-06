"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, Sparkles, Shield, Lock } from "lucide-react";
import ThreeDCard from "./motion/ThreeDCard";

export default function CtaBanner() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-white/20 dark:bg-[#080808]/20 backdrop-blur-[1px] border-t border-slate-200/80 dark:border-white/[0.06] transition-colors duration-200 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Luxury Card Container with 3D Tilt & Elevation */}
        <ThreeDCard maxTilt={5} elevationZ={20} glareColor="#818cf8" glareOpacity={0.16}>
          <div className="relative rounded-3xl bg-gradient-to-b from-[#141418] via-[#0f0f13] to-[#0a0a0c] border border-white/[0.09] p-8 sm:p-14 lg:p-20 text-white overflow-hidden shadow-2xl">
            
            {/* Subtle Ambient Radial Lighting */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              
              {/* Modern Micro-Label */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 text-xs font-sans font-medium tracking-wide uppercase mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Available for SaaS Engineering & Architecture</span>
              </div>

              {/* Editorial Headline */}
              <h2 className="section-title text-[#f5f5f3] tracking-tight leading-tight mb-6">
                Need a Production SaaS <br className="hidden sm:inline" />
                <span className="editorial-italic gradient-text">Built End-to-End?</span>
              </h2>

              <p className="body-lg text-neutral-300 mb-10 max-w-2xl mx-auto font-normal">
                From complex relational database schemas and multi-tenant RBAC down to asynchronous queues and polished Next.js interfaces—let's build something robust together.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 max-w-md mx-auto">
                <a
                  href="mailto:dibyasarothidibya@gmail.com"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 text-sm font-semibold tracking-tight transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-xl cursor-pointer"
                >
                  Discuss a Project
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
                <Link
                  href="/workspace"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/15 text-sm font-semibold tracking-tight transition-all duration-200 cursor-pointer"
                >
                  Explore Live Demo
                </Link>
              </div>

              {/* Quiet Reassurance Badges */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-neutral-400 font-sans font-medium">
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-slate-400" />
                  <span>Python / Django / Next.js / PostgreSQL</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Multi-Tenant & RBAC Architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>71 Passing Automated Tests</span>
                </div>
              </div>

            </div>

          </div>
        </ThreeDCard>

      </div>
    </section>
  );
}
