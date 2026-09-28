"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  ChevronDown, 
  Search, 
  Menu, 
  X, 
  Command,
  ArrowRight,
  Sparkles,
  Layers,
  ShieldCheck,
  Building2,
  Globe2
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape" && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen]);

  useEffect(() => {
    if (searchOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [searchOpen]);

  const handleMouseEnter = (menu: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 140);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-white/75 dark:bg-[#070709]/75 backdrop-blur-2xl backdrop-saturate-180 border-b border-black/[0.06] dark:border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "bg-white/50 dark:bg-[#070709]/50 backdrop-blur-xl backdrop-saturate-150 border-b border-black/[0.03] dark:border-white/[0.04]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-15 sm:h-16">
            
            {/* Left: Original Branding Logo & Title - Preserved Untouched */}
            <div className="flex items-center gap-8">
              
              <a href="#" className="flex items-center gap-3 group">
                <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-slate-200 dark:border-zinc-800 bg-black shrink-0 transition-opacity group-hover:opacity-90">
                  <img
                    src="/logo.jpg"
                    alt="The Client Forge Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-xl sm:text-2xl font-normal tracking-tight text-slate-900 dark:text-white select-none transition-colors">
                    Client Forge
                  </span>
                  <span className="text-[9px] uppercase tracking-widest font-medium text-slate-500 dark:text-zinc-400 -mt-0.5 hidden sm:inline-block">
                    Client Intelligence OS
                  </span>
                </div>
              </a>

              {/* Apple-Style Minimal Center Nav Links */}
              <nav className="hidden lg:flex items-center gap-1">
                
                {/* Product Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => handleMouseEnter("product")}
                  onMouseLeave={handleMouseLeave}
                >
                  <button 
                    className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-normal tracking-[-0.01em] transition-all duration-300 ease-out cursor-pointer ${
                      activeDropdown === "product"
                        ? "text-neutral-950 dark:text-white bg-black/[0.04] dark:bg-white/[0.08]"
                        : "text-neutral-600 hover:text-neutral-950 dark:text-white/70 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.05]"
                    }`}
                  >
                    <span>Product</span>
                    <ChevronDown className={`w-3 h-3 opacity-40 group-hover:opacity-80 transition-all duration-300 ease-out ${
                      activeDropdown === "product" ? "rotate-180 opacity-90" : "group-hover:translate-y-[0.5px]"
                    }`} />
                  </button>

                  {activeDropdown === "product" && (
                    <div 
                      className="absolute top-full left-0 pt-2 w-80 z-50 animate-in fade-in slide-in-from-top-1 duration-200"
                      onMouseEnter={() => handleMouseEnter("product")}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="p-2 rounded-2xl bg-white/85 dark:bg-[#121216]/85 backdrop-blur-3xl backdrop-saturate-180 border border-black/[0.06] dark:border-white/[0.1] shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.65)]">
                        <a 
                          href="/talent-intelligence" 
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.06] transition-all duration-200 group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/15 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-medium text-neutral-900 dark:text-neutral-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              Autonomous Pipeline
                            </div>
                            <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed font-normal">
                              Prospect intelligence & skill ontology
                            </div>
                          </div>
                        </a>

                        <a 
                          href="/people-operations" 
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.06] transition-all duration-200 group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-sky-500/10 dark:bg-sky-500/15 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0 mt-0.5">
                            <Layers className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-medium text-neutral-900 dark:text-neutral-200 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                              Culture & Sentiment Radar
                            </div>
                            <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed font-normal">
                              Predictive team health telemetry
                            </div>
                          </div>
                        </a>

                        <a 
                          href="/global-mobility" 
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.06] transition-all duration-200 group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-medium text-neutral-900 dark:text-neutral-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                              Zero-Friction Onboarding
                            </div>
                            <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed font-normal">
                              Automated legal & employee workflows
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Solutions Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => handleMouseEnter("solutions")}
                  onMouseLeave={handleMouseLeave}
                >
                  <button 
                    className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-normal tracking-[-0.01em] transition-all duration-300 ease-out cursor-pointer ${
                      activeDropdown === "solutions"
                        ? "text-neutral-950 dark:text-white bg-black/[0.04] dark:bg-white/[0.08]"
                        : "text-neutral-600 hover:text-neutral-950 dark:text-white/70 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.05]"
                    }`}
                  >
                    <span>Solutions</span>
                    <ChevronDown className={`w-3 h-3 opacity-40 group-hover:opacity-80 transition-all duration-300 ease-out ${
                      activeDropdown === "solutions" ? "rotate-180 opacity-90" : "group-hover:translate-y-[0.5px]"
                    }`} />
                  </button>

                  {activeDropdown === "solutions" && (
                    <div 
                      className="absolute top-full left-0 pt-2 w-80 z-50 animate-in fade-in slide-in-from-top-1 duration-200"
                      onMouseEnter={() => handleMouseEnter("solutions")}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="p-2 rounded-2xl bg-white/85 dark:bg-[#121216]/85 backdrop-blur-3xl backdrop-saturate-180 border border-black/[0.06] dark:border-white/[0.1] shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.65)]">
                        <a 
                          href="/people-operations" 
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.06] transition-all duration-200 group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-amber-500/10 dark:bg-amber-500/15 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
                            <Building2 className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-medium text-neutral-900 dark:text-neutral-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                              Enterprise Scaling
                            </div>
                            <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed font-normal">
                              For organizations with 500+ operators
                            </div>
                          </div>
                        </a>

                        <a 
                          href="/global-mobility" 
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.06] transition-all duration-200 group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/15 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5">
                            <Globe2 className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-medium text-neutral-900 dark:text-neutral-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                              Global & Remote Teams
                            </div>
                            <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed font-normal">
                              Distributed workforce operations & payroll
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Pricing */}
                <a
                  href="/pricing"
                  className="px-3 py-1.5 rounded-full text-[13px] font-normal tracking-[-0.01em] text-neutral-600 hover:text-neutral-950 dark:text-white/70 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-all duration-300 ease-out"
                >
                  Pricing
                </a>

                {/* Workspace App link */}
                <a
                  href="/workspace"
                  className="px-3 py-1.5 rounded-full text-[13px] font-normal tracking-[-0.01em] text-neutral-600 hover:text-neutral-950 dark:text-white/70 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-all duration-300 ease-out"
                >
                  Workspace
                </a>
              </nav>

            </div>

            {/* Right: Apple-Style Minimal Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Apple-Grade Minimal Search Capsule */}
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden md:flex items-center gap-2 h-8 px-3 rounded-full bg-black/[0.03] dark:bg-white/[0.05] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] border border-black/[0.05] dark:border-white/[0.08] text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white text-[12px] transition-all duration-300 ease-out cursor-pointer shadow-xs group"
                aria-label="Search"
              >
                <Search className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                <span className="font-normal text-[12px]">Search</span>
                <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-black/[0.03] dark:bg-white/[0.07] border border-black/[0.04] dark:border-white/[0.06] text-[10px] font-mono tracking-tight text-neutral-400 dark:text-neutral-400">
                  <Command className="w-2.5 h-2.5" />K
                </span>
              </button>

              {/* Apple Fluid Theme Toggle */}
              <ThemeToggle compact />

              {/* Sign In */}
              <a
                href="/login"
                className="hidden sm:inline-flex px-3 py-1.5 text-[13px] font-normal text-neutral-600 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white rounded-full hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-all duration-300 ease-out"
              >
                Sign In
              </a>

              {/* Apple-Style Fluid Tactile Capsule CTA */}
              <a
                href="/signup"
                className="inline-flex items-center justify-center px-4 py-1.5 text-[13px] font-medium tracking-tight rounded-full transition-all duration-300 ease-out cursor-pointer active:scale-[0.98] hover:scale-[1.02]
                  bg-neutral-950 text-white hover:bg-neutral-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_8px_rgba(0,0,0,0.12)]
                  dark:bg-white dark:text-neutral-950 dark:hover:bg-white/95 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_2px_10px_rgba(255,255,255,0.1)]"
              >
                <span>Book Demo</span>
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors focus:outline-none"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>

            </div>

          </div>
        </div>

        {/* Apple-Style Glass Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-3xl border-b border-black/[0.06] dark:border-white/[0.08] px-5 py-5 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchOpen(true);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.06] border border-black/[0.05] dark:border-white/[0.08] text-neutral-600 dark:text-neutral-300 text-xs font-normal"
            >
              <span className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 opacity-60" />
                Search documentation, products...
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 bg-black/[0.04] dark:bg-white/[0.08] rounded border border-black/[0.05] dark:border-white/[0.06] text-neutral-400">⌘K</span>
            </button>

            <div className="space-y-1 pt-1">
              <a 
                href="/talent-intelligence" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-normal text-neutral-700 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.06] transition-colors"
              >
                Talent Intelligence
              </a>
              <a 
                href="/people-operations" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-normal text-neutral-700 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.06] transition-colors"
              >
                People Operations
              </a>
              <a 
                href="/global-mobility" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-normal text-neutral-700 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.06] transition-colors"
              >
                Global Mobility
              </a>
              <a 
                href="/pricing" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-normal text-neutral-700 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.06] transition-colors"
              >
                Pricing
              </a>
              <a 
                href="/workspace" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-normal text-neutral-700 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.06] transition-colors"
              >
                Workspace
              </a>
            </div>

            <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col gap-2">
              <a 
                href="/login" 
                className="w-full text-center py-2 text-[13px] font-normal text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white rounded-full border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.04] transition-colors"
              >
                Sign In
              </a>
              <a 
                href="/signup" 
                className="w-full text-center py-2 text-[13px] font-medium text-white bg-neutral-950 hover:bg-neutral-900 dark:text-neutral-950 dark:bg-white dark:hover:bg-white/95 rounded-full transition-colors shadow-sm"
              >
                Book Demo
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Apple Spotlight Search Modal */}
      {searchOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/45 dark:bg-black/65 backdrop-blur-xl flex items-start justify-center pt-24 sm:pt-28 px-4 animate-in fade-in duration-200"
          onClick={() => setSearchOpen(false)}
        >
          <div 
            className="w-full max-w-xl bg-white/90 dark:bg-[#141418]/90 backdrop-blur-3xl rounded-3xl border border-black/[0.08] dark:border-white/[0.12] shadow-[0_30px_90px_rgba(0,0,0,0.25)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.7)] p-4 text-neutral-900 dark:text-neutral-100 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.06] border border-black/[0.05] dark:border-white/[0.08]">
              <Search className="w-4 h-4 text-neutral-400 dark:text-neutral-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search Client Forge..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none font-normal"
              />
              <button 
                onClick={() => setSearchOpen(false)}
                className="px-1.5 py-0.5 rounded text-[10px] font-mono text-neutral-500 dark:text-neutral-400 bg-black/[0.05] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] transition-colors cursor-pointer"
              >
                ESC
              </button>
            </div>

            <div className="mt-3 px-1 space-y-1">
              <a 
                href="/talent-intelligence" 
                onClick={() => setSearchOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs text-neutral-700 dark:text-neutral-300 hover:bg-black/[0.03] dark:hover:bg-white/[0.06] transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                  <span className="font-medium group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">Automated Sourcing Pipeline</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 px-1.5 py-0.5 rounded bg-black/[0.02] dark:bg-white/[0.04]">Pillar</span>
              </a>
              <a 
                href="/people-operations" 
                onClick={() => setSearchOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs text-neutral-700 dark:text-neutral-300 hover:bg-black/[0.03] dark:hover:bg-white/[0.06] transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
                  <span className="font-medium group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">Culture & Sentiment Radar</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 px-1.5 py-0.5 rounded bg-black/[0.02] dark:bg-white/[0.04]">Analytics</span>
              </a>
              <a 
                href="/global-mobility" 
                onClick={() => setSearchOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs text-neutral-700 dark:text-neutral-300 hover:bg-black/[0.03] dark:hover:bg-white/[0.06] transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                  <span className="font-medium group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">Zero-Friction Onboarding & Payroll</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 px-1.5 py-0.5 rounded bg-black/[0.02] dark:bg-white/[0.04]">Workflow</span>
              </a>
              <a 
                href="/pricing" 
                onClick={() => setSearchOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs text-neutral-700 dark:text-neutral-300 hover:bg-black/[0.03] dark:hover:bg-white/[0.06] transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Globe2 className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
                  <span className="font-medium group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">Pricing & Subscription Plans</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 px-1.5 py-0.5 rounded bg-black/[0.02] dark:bg-white/[0.04]">Plans</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
