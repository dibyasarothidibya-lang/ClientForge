"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Terminal } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer id="_footer_newsletter_columns_v6_001" className="bg-slate-100/80 dark:bg-[#050505] text-slate-600 dark:text-neutral-400 border-t border-slate-200 dark:border-white/[0.08] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Content */}
        <div className="py-20 grid lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Brand + Manifesto + Newsletter */}
          <div className="lg:col-span-4">
            <a href="#" className="flex items-center gap-3.5 mb-5 group">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-white/15 bg-black flex-shrink-0 group-hover:border-slate-400 dark:group-hover:border-white/30 transition-colors">
                <img 
                  src="/logo.jpg" 
                  alt="The Client Forge Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-normal tracking-wide text-slate-900 dark:text-[#f5f5f3] select-none">
                  ℭ𝔩𝔦𝔢𝔫𝔱 𝔉𝔬𝔯𝔤𝔢
                </span>
                <span className="text-[10px] uppercase tracking-widest font-mono text-slate-500 dark:text-neutral-400 -mt-0.5">
                  Opportunity Intelligence Engine
                </span>
              </div>
            </a>
            
            <p className="text-slate-600 dark:text-neutral-400 text-sm mb-8 max-w-sm leading-relaxed font-normal">
              Precision market intelligence, structural signal tracking, and calibrated opportunity dossiers for independent principals and boutique studios.
            </p>

            {/* Newsletter */}
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-800 dark:text-neutral-300 mb-2.5">
                The Operator Dispatch
              </div>
              <p className="text-xs text-slate-500 dark:text-neutral-500 mb-3 font-normal">
                Monthly field notes on high-leverage client acquisition, pricing power, and studio economics.
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 p-3 rounded-xl font-mono">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
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
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-900 dark:text-neutral-300 mb-4">Platform</h4>
              <ul className="space-y-3 text-xs font-normal">
                <li><a href="#demo" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Signal Ingestion</a></li>
                <li><a href="#features" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Executive Triggers</a></li>
                <li><a href="#solutions" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Dossier Synthesizer</a></li>
                <li><a href="#calculator" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Velocity Modeling</a></li>
                <li><a href="#pricing" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Pricing & Plans</a></li>
                <li><a href="#solutions" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Client Ledger</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-900 dark:text-neutral-300 mb-4">Practices</h4>
              <ul className="space-y-3 text-xs font-normal">
                <li><a href="#solutions" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Boutique Studios</a></li>
                <li><a href="#solutions" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Specialized Advisory</a></li>
                <li><a href="#solutions" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Fractional Partners</a></li>
                <li><a href="#solutions" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Engineering Consultancies</a></li>
                <li><a href="#solutions" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Strategy Collectives</a></li>
                <li><a href="#solutions" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Independent Principals</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-900 dark:text-neutral-300 mb-4">Intelligence</h4>
              <ul className="space-y-3 text-xs font-normal">
                <li><a href="#faq" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Signal Methodology</a></li>
                <li><a href="#calculator" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Opportunity Metrics</a></li>
                <li><a href="#testimonials" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Operator Case Studies</a></li>
                <li><a href="#features" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Dossier Architecture</a></li>
                <li><a href="#demo" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Pipeline Simulator</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-900 dark:text-neutral-300 mb-4">Integrity</h4>
              <ul className="space-y-3 text-xs font-normal">
                <li><a href="#faq" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Zero-Spam Policy</a></li>
                <li><a href="#faq" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Data Privacy & Encryption</a></li>
                <li><a href="#faq" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Single-Tenant Isolation</a></li>
                <li><a href="#faq" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#faq" className="text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors">Security Architecture</a></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-slate-200 dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p className="text-slate-500 dark:text-neutral-500">
            © {new Date().getFullYear()} Client Forge Systems, Inc. Precision client acquisition for senior operators.
          </p>

          <div className="flex items-center gap-6 text-slate-500 dark:text-neutral-500">
            <div className="flex items-center gap-2 text-slate-600 dark:text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
              <span>Signal nodes active</span>
            </div>
            
            {/* Minimal Links */}
            <a href="https://github.com" className="hover:text-white transition-colors" aria-label="GitHub">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://twitter.com" className="hover:text-white transition-colors" aria-label="Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
