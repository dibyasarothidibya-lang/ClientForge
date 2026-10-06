"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  ShieldCheck, 
  Terminal, 
  Code2, 
  Sparkles, 
  Layers, 
  Cpu, 
  Database, 
  Server, 
  Globe2, 
  Mail, 
  MessageCircle,
  Zap,
  ExternalLink
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  const stackPills = [
    { label: "Next.js 16 (App Router)", category: "Frontend" },
    { label: "Django REST Framework 5", category: "Backend" },
    { label: "PostgreSQL 16", category: "Database" },
    { label: "Redis 7 Broker", category: "Cache / Queue" },
    { label: "Docker Multi-Stage", category: "DevOps" },
    { label: "Nginx SSL Reverse Proxy", category: "Infrastructure" },
    { label: "Firebase OAuth 2.0", category: "Auth" },
    { label: "Oracle Cloud Linux", category: "Cloud" },
  ];

  return (
    <footer id="_footer_newsletter_columns_v6_001" className="bg-slate-100/80 dark:bg-[#040406] text-slate-600 dark:text-neutral-400 border-t border-slate-200 dark:border-white/[0.08] transition-colors duration-200 relative z-10 overflow-hidden">
      
      {/* ============================================================== */}
      {/* 3D MODERN SAAS ARCHITECT SPOTLIGHT & WORKBENCH SHOWCASE        */}
      {/* ============================================================== */}
      <div className="relative border-b border-slate-200/80 dark:border-white/[0.08] bg-white/70 dark:bg-gradient-to-b dark:from-[#08080c] dark:to-[#040406] backdrop-blur-2xl overflow-hidden">
        
        {/* Subtle Ambient Spatial Glow & Grid Background */}
        <div 
          aria-hidden="true" 
          className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none"
        />
        <div 
          aria-hidden="true" 
          className="absolute -top-32 right-1/4 w-[500px] h-[350px] bg-indigo-500/[0.06] rounded-full blur-[120px] pointer-events-none"
        />
        <div 
          aria-hidden="true" 
          className="absolute bottom-0 left-10 w-[300px] h-[200px] bg-sky-500/[0.04] rounded-full blur-[90px] pointer-events-none"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          
          {/* Main Architect Console Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* LEFT / PROFILE CARD WITH 3D TILT DEPTH (Cols 1-7) */}
            <div className="lg:col-span-7 flex flex-col items-start">
              
              {/* Category Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/25 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-medium mb-6 backdrop-blur-md shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>LEAD SYSTEMS ARCHITECT • PRODUCTION CASE STUDY</span>
              </div>

              {/* Title & Personal Engineering Statement */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-950 dark:text-[#fbfbfa] font-normal tracking-tight leading-[1.08] mb-5">
                Engineered & Deployed by <br className="hidden sm:inline" />
                <span className="font-semibold bg-gradient-to-r from-indigo-500 via-indigo-400 to-sky-400 bg-clip-text text-transparent">
                  Dibya Sarothi Simanta
                </span>
              </h2>

              <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-neutral-300 max-w-xl leading-relaxed mb-7 font-normal">
                Architected from bare metal to cloud deployment. ClientForge is a fully working multi-tenant SaaS built to demonstrate enterprise-grade product design, relational database modeling, real-time background task processing, and robust Linux infrastructure.
              </p>

              {/* Interactive Multi-Stack Spec Grid */}
              <div className="w-full max-w-2xl mb-8">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500 mb-3 flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Verified Production Stack</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {stackPills.map((pill, idx) => (
                    <div
                      key={idx}
                      className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] hover:border-indigo-500/40 dark:hover:border-indigo-400/40 hover:bg-slate-50 dark:hover:bg-white/[0.06] text-xs font-sans text-slate-700 dark:text-neutral-300 transition-all duration-200 shadow-xs"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:scale-125 transition-transform" />
                      <span className="font-medium">{pill.label}</span>
                      <span className="text-[10px] text-slate-400 dark:text-neutral-500 hidden sm:inline">({pill.category})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comprehensive Social Links Strip */}
              <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-slate-200/80 dark:border-white/[0.08] w-full">
                <span className="text-xs font-mono text-slate-400 dark:text-neutral-500 mr-1">
                  Connect & Inspect:
                </span>

                {/* GitHub */}
                <a
                  href="https://github.com/dibyasarothidibya-lang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:border-slate-400 dark:hover:border-white/30 text-xs font-medium text-slate-800 dark:text-neutral-200 transition-all shadow-xs"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-slate-700 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                {/* 𝕏 / Twitter */}
                <a
                  href="https://x.com/Dibyasarothi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:border-slate-400 dark:hover:border-white/30 text-xs font-medium text-slate-800 dark:text-neutral-200 transition-all shadow-xs"
                >
                  <span className="font-semibold text-xs">𝕏</span>
                  <span>Twitter</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/dibya-sarothi-simanta-b1a82235a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:border-slate-400 dark:hover:border-white/30 text-xs font-medium text-slate-800 dark:text-neutral-200 transition-all shadow-xs"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-[#0A66C2]" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/8801704909232"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:border-emerald-500/40 text-xs font-medium text-slate-800 dark:text-neutral-200 transition-all shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>WhatsApp</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                {/* Direct Email */}
                <a
                  href="mailto:dibyasarothidibya@gmail.com"
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:border-indigo-500/40 text-xs font-medium text-slate-800 dark:text-neutral-200 transition-all shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Email</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </div>

            </div>

            {/* RIGHT / 3D ARCHITECTURAL PORTRAIT WORKBENCH (Cols 8-12) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative w-full">
              
              {/* Modern Glass Morphic 3D Framed Card */}
              <div className="relative w-full max-w-[380px] rounded-3xl border border-slate-200/90 dark:border-white/15 bg-gradient-to-b from-white/90 via-slate-50/80 to-white/95 dark:from-zinc-900/90 dark:via-[#09090d]/90 dark:to-black/95 p-6 shadow-2xl backdrop-blur-xl group hover:border-indigo-500/40 transition-all duration-500">
                
                {/* Header of Workbench Card */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200/80 dark:border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono font-medium text-slate-700 dark:text-neutral-300">
                      SYSTEM ARCHITECT
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-500/10 px-2.5 py-0.5 rounded-md">
                    AVAILABLE FOR HIRE
                  </span>
                </div>

                {/* High-Resolution Suit Portrait in Clean Architectural Stage */}
                <div className="relative w-full h-[320px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-inner group-hover:scale-[1.01] transition-transform duration-500">
                  <img
                    src="/creator.png"
                    alt="Dibya Sarothi Simanta"
                    className="w-full h-full object-cover object-top filter contrast-[1.05]"
                  />
                  {/* Subtle Lighting Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Telemetry Tag */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-white text-xs font-sans">
                    <div>
                      <div className="font-semibold text-white">Dibya Sarothi Simanta</div>
                      <div className="text-[11px] text-neutral-400">Full-Stack SaaS Specialist</div>
                    </div>
                    <div className="text-right font-mono text-[10px] text-emerald-400">
                      ONLINE
                    </div>
                  </div>
                </div>

                {/* Actions Inside Card */}
                <div className="mt-5 space-y-2.5">
                  <a
                    href="mailto:dibyasarothidibya@gmail.com"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-white bg-slate-950 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-neutral-100 transition-all shadow-md font-sans cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Hire for Freelance SaaS Projects</span>
                  </a>

                  <Link
                    href="/workspace"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-medium border border-slate-200 dark:border-white/10 hover:bg-slate-100/60 dark:hover:bg-white/[0.05] text-slate-700 dark:text-neutral-200 transition-colors font-sans"
                  >
                    <span>Test Production Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Content */}
        <div className="py-16 sm:py-20 grid lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Brand + Manifesto + Newsletter */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3.5 mb-5 group" title="Return to Client Forge Home">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-white/15 bg-black flex-shrink-0 group-hover:border-slate-400 dark:group-hover:border-white/30 transition-colors">
                <img 
                  src="/logo.jpg" 
                  alt="The Client Forge Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-victorian text-2xl sm:text-3xl font-normal tracking-wide text-slate-900 dark:text-[#f5f5f3] select-none">
                  Client Forge
                </span>
                <span className="text-[10px] uppercase tracking-wider font-sans font-semibold text-slate-500 dark:text-neutral-400 -mt-0.5">
                  Opportunity Intelligence Engine
                </span>
              </div>
            </Link>
            
            <p className="text-slate-600 dark:text-neutral-400 text-sm mb-8 max-w-sm leading-relaxed font-sans font-normal">
              Precision market intelligence, structural signal tracking, and calibrated opportunity dossiers for independent principals and boutique studios.
            </p>

            {/* Newsletter */}
            <div>
              <div className="text-xs font-sans font-semibold uppercase tracking-wider text-slate-800 dark:text-neutral-300 mb-2.5">
                The Operator Dispatch
              </div>
              <p className="text-xs text-slate-500 dark:text-neutral-500 mb-3 font-sans font-normal">
                Monthly field notes on high-leverage client acquisition, pricing power, and studio economics.
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs font-medium text-slate-800 dark:text-neutral-200 bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 p-3 rounded-xl font-sans">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Subscribed. Welcome to the dispatch.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter work email..." 
                    required
                    className="flex-1 px-4 py-2.5 bg-white dark:bg-white/[0.03] border border-slate-300 dark:border-white/[0.1] rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 text-xs focus:outline-none focus:border-indigo-500 dark:focus:border-white/30 transition-colors font-sans shadow-xs"
                  />
                  <button 
                    type="submit" 
                    className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-[#f5f5f3] dark:hover:bg-white text-white dark:text-neutral-950 transition-colors rounded-xl font-medium text-xs flex items-center justify-center shrink-0 cursor-pointer shadow-xs"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-slate-900 dark:text-neutral-200 mb-4">Platform</h4>
              <ul className="space-y-3 text-xs font-normal font-sans">
                <li><Link href="/talent-intelligence" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Talent Intelligence</Link></li>
                <li><Link href="/people-operations" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">People Operations</Link></li>
                <li><Link href="/global-mobility" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Global Mobility</Link></li>
                <li><Link href="/pricing" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Pricing & Plans</Link></li>
                <li><Link href="/product" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Velocity Modeling</Link></li>
                <li><Link href="/workspace" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Client Ledger</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-slate-900 dark:text-neutral-200 mb-4">Practices</h4>
              <ul className="space-y-3 text-xs font-normal font-sans">
                <li><Link href="/about" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Boutique Studios</Link></li>
                <li><Link href="/features" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Specialized Advisory</Link></li>
                <li><Link href="/talent-intelligence" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Fractional Partners</Link></li>
                <li><Link href="/product" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Engineering Consultancies</Link></li>
                <li><Link href="/people-operations" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Strategy Collectives</Link></li>
                <li><Link href="/pricing" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Independent Principals</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-slate-900 dark:text-neutral-200 mb-4">Intelligence</h4>
              <ul className="space-y-3 text-xs font-normal font-sans">
                <li><Link href="/features" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Signal Methodology</Link></li>
                <li><Link href="/product" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Opportunity Metrics</Link></li>
                <li><Link href="/about" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Operator Case Studies</Link></li>
                <li><Link href="/features" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Dossier Architecture</Link></li>
                <li><Link href="/workspace" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Pipeline Simulator</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-slate-900 dark:text-neutral-200 mb-4">Integrity</h4>
              <ul className="space-y-3 text-xs font-normal font-sans">
                <li><Link href="/security" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Zero-Spam Policy</Link></li>
                <li><Link href="/security" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Data Privacy & Encryption</Link></li>
                <li><Link href="/security" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Single-Tenant Isolation</Link></li>
                <li><Link href="/security" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/security" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Security Architecture</Link></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-slate-200 dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans">
          <p className="text-slate-500 dark:text-neutral-400 font-sans font-normal">
            © {new Date().getFullYear()} Dibya Sarothi Simanta. Independent Engineering Case Study & Production SaaS Portfolio.
          </p>

          <div className="flex items-center gap-6 text-slate-500 dark:text-neutral-400 font-sans">
            <div className="flex items-center gap-2 text-slate-600 dark:text-neutral-300 font-sans">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Available for Hire</span>
            </div>
            
            <a href="https://github.com/dibyasarothidibya-lang" target="_blank" rel="noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors" aria-label="GitHub">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
