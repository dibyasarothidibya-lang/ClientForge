"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
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
  Globe2, 
  Zap,
  CreditCard,
  HeartPulse,
  Info,
  PhoneCall,
  CheckCircle2
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          isScrolled
            ? "bg-white/80 dark:bg-[#070709]/80 backdrop-blur-2xl backdrop-saturate-180 border-b border-black/[0.06] dark:border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "bg-white/60 dark:bg-[#070709]/60 backdrop-blur-xl backdrop-saturate-150 border-b border-black/[0.03] dark:border-white/[0.04]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left: Original Branding Logo & Title */}
            <div className="flex items-center gap-6 xl:gap-8 shrink-0">
              <Link href="/" className="flex items-center gap-3 group shrink-0" title="Return to Client Forge Home">
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg overflow-hidden border border-slate-200 dark:border-zinc-800 bg-black shrink-0 transition-opacity group-hover:opacity-90">
                  <img
                    src="/logo.jpg"
                    alt="The Client Forge Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-victorian text-2xl sm:text-3xl font-normal tracking-wide text-slate-900 dark:text-white select-none transition-colors whitespace-nowrap">
                    Client Forge
                  </span>
                  <span className="text-[9px] uppercase tracking-widest font-sans font-medium text-slate-500 dark:text-zinc-400 -mt-0.5 hidden sm:inline-block whitespace-nowrap">
                    Client Intelligence OS
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Balanced, Uncluttered Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 font-sans">
              
              {/* 1. PeopleCore HR OS Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter("peoplecore")}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href="/peoplecore"
                  className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium tracking-tight transition-all duration-200 cursor-pointer ${
                    activeDropdown === "peoplecore"
                      ? "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 dark:bg-indigo-500/15"
                      : "text-slate-700 dark:text-neutral-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-black/[0.03] dark:hover:bg-white/[0.05]"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Workforce Module</span>
                  <ChevronDown className={`w-3 h-3 opacity-50 group-hover:opacity-100 transition-transform duration-200 ${
                    activeDropdown === "peoplecore" ? "rotate-180 text-indigo-500" : ""
                  }`} />
                </Link>

                {activeDropdown === "peoplecore" && (
                  <div 
                    className="absolute top-full left-0 pt-2 w-80 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                    onMouseEnter={() => handleMouseEnter("peoplecore")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="p-2.5 rounded-2xl bg-white/95 dark:bg-[#121216]/95 backdrop-blur-2xl border border-black/[0.06] dark:border-white/[0.1] shadow-2xl space-y-1">
                      <Link 
                        href="/peoplecore" 
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.06] transition"
                      >
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-900 dark:text-white">PeopleCore Module</div>
                          <div className="text-[11px] text-slate-500 dark:text-neutral-400 leading-tight mt-0.5">Workforce operations by Client Forge</div>
                        </div>
                      </Link>

                      <Link 
                        href="/product" 
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.06] transition"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Layers className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-900 dark:text-white">Product Tour</div>
                          <div className="text-[11px] text-slate-500 dark:text-neutral-400 leading-tight mt-0.5">Unified employee graph</div>
                        </div>
                      </Link>

                      <Link 
                        href="/features" 
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.06] transition"
                      >
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-900 dark:text-white">Features Directory</div>
                          <div className="text-[11px] text-slate-500 dark:text-neutral-400 leading-tight mt-0.5">ATS, payroll, time, OKRs</div>
                        </div>
                      </Link>

                      <Link 
                        href="/security" 
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.06] transition"
                      >
                        <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-900 dark:text-white">Security & Trust</div>
                          <div className="text-[11px] text-slate-500 dark:text-neutral-400 leading-tight mt-0.5">SOC-2 Type II, AES-256</div>
                        </div>
                      </Link>

                      <Link 
                        href="/integrations" 
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.06] transition"
                      >
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Zap className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-900 dark:text-white">Integrations</div>
                          <div className="text-[11px] text-slate-500 dark:text-neutral-400 leading-tight mt-0.5">Slack, Google, Stripe, API</div>
                        </div>
                      </Link>

                      <div className="pt-2 mt-1 border-t border-slate-100 dark:border-white/[0.06]">
                        <Link
                          href="/support-peoplecore"
                          className="flex items-center justify-between p-2 rounded-xl text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 transition"
                        >
                          <span className="flex items-center gap-1.5">
                            <HeartPulse className="w-3.5 h-3.5" /> Support PeopleCore
                          </span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Solutions Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter("solutions")}
                onMouseLeave={handleMouseLeave}
              >
                <button 
                  className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium tracking-tight transition-all duration-200 cursor-pointer ${
                    activeDropdown === "solutions"
                      ? "text-slate-950 dark:text-white bg-black/[0.04] dark:bg-white/[0.08]"
                      : "text-slate-700 dark:text-neutral-200 hover:text-slate-950 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.05]"
                  }`}
                >
                  <span>Solutions</span>
                  <ChevronDown className={`w-3 h-3 opacity-50 group-hover:opacity-100 transition-transform duration-200 ${
                    activeDropdown === "solutions" ? "rotate-180" : ""
                  }`} />
                </button>

                {activeDropdown === "solutions" && (
                  <div 
                    className="absolute top-full left-0 pt-2 w-72 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                    onMouseEnter={() => handleMouseEnter("solutions")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="p-2.5 rounded-2xl bg-white/95 dark:bg-[#121216]/95 backdrop-blur-2xl border border-black/[0.06] dark:border-white/[0.1] shadow-2xl space-y-1">
                      <Link 
                        href="/talent-intelligence" 
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.06] transition"
                      >
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-900 dark:text-white">Talent Intelligence</div>
                          <div className="text-[11px] text-slate-500 dark:text-neutral-400 leading-tight mt-0.5">Autonomous sourcing radar</div>
                        </div>
                      </Link>

                      <Link 
                        href="/people-operations" 
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.06] transition"
                      >
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-900 dark:text-white">Enterprise Scaling</div>
                          <div className="text-[11px] text-slate-500 dark:text-neutral-400 leading-tight mt-0.5">For teams with 500+ operators</div>
                        </div>
                      </Link>

                      <Link 
                        href="/global-mobility" 
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.06] transition"
                      >
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Globe2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-900 dark:text-white">Global & Remote Teams</div>
                          <div className="text-[11px] text-slate-500 dark:text-neutral-400 leading-tight mt-0.5">Distributed workforce payroll</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Pricing */}
              <Link
                href="/pricing"
                className="px-3 py-1.5 rounded-full text-[13px] font-medium tracking-tight text-slate-700 dark:text-neutral-200 hover:text-slate-950 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition cursor-pointer"
              >
                Pricing
              </Link>

              {/* 4. Company Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter("company")}
                onMouseLeave={handleMouseLeave}
              >
                <button 
                  className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium tracking-tight transition-all duration-200 cursor-pointer ${
                    activeDropdown === "company"
                      ? "text-slate-950 dark:text-white bg-black/[0.04] dark:bg-white/[0.08]"
                      : "text-slate-700 dark:text-neutral-200 hover:text-slate-950 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.05]"
                  }`}
                >
                  <span>Company</span>
                  <ChevronDown className={`w-3 h-3 opacity-50 group-hover:opacity-100 transition-transform duration-200 ${
                    activeDropdown === "company" ? "rotate-180" : ""
                  }`} />
                </button>

                {activeDropdown === "company" && (
                  <div 
                    className="absolute top-full left-0 pt-2 w-64 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                    onMouseEnter={() => handleMouseEnter("company")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="p-2.5 rounded-2xl bg-white/95 dark:bg-[#121216]/95 backdrop-blur-2xl border border-black/[0.06] dark:border-white/[0.1] shadow-2xl space-y-1">
                      <Link 
                        href="/about" 
                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.06] transition"
                      >
                        <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Info className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-900 dark:text-white">About Us</div>
                          <div className="text-[11px] text-slate-500">Mission, team & values</div>
                        </div>
                      </Link>

                      <Link 
                        href="/contact" 
                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.06] transition"
                      >
                        <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                          <PhoneCall className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-900 dark:text-white">Contact & Demo</div>
                          <div className="text-[11px] text-slate-500">Sales & enterprise inquiries</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Live App / HR Workspace Link */}
              <Link
                href="/workspace"
                className="ml-1 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold tracking-tight whitespace-nowrap shrink-0 text-slate-800 dark:text-neutral-200 bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] border border-slate-200 dark:border-white/10 transition cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shrink-0" />
                <span className="whitespace-nowrap">HR Workspace</span>
              </Link>
            </nav>

            {/* Right: Clean, Apple-Grade Minimal Controls */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              
              {/* Minimal Search Capsule */}
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden md:flex items-center gap-2 h-8 px-2.5 sm:px-3 rounded-full bg-black/[0.03] dark:bg-white/[0.05] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] border border-black/[0.05] dark:border-white/[0.08] text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white text-[12px] transition-all cursor-pointer shadow-2xs group"
                aria-label="Search"
              >
                <Search className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                <span className="font-normal text-[12px] hidden lg:inline">Search</span>
                <span className="flex items-center gap-0.5 px-1 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.07] border border-black/[0.04] dark:border-white/[0.06] text-[10px] font-mono text-neutral-400">
                  <Command className="w-2.5 h-2.5" />K
                </span>
              </button>

              {/* Fluid Theme Toggle */}
              <ThemeToggle compact />

              {/* Sign In Link */}
              <Link
                href="/login"
                className="hidden sm:inline-flex px-3 py-1.5 text-[13px] font-medium text-slate-700 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white rounded-full hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition"
              >
                Sign In
              </Link>

              {/* Primary Call to Action */}
              <Link
                href="/workspace"
                className="inline-flex items-center justify-center px-4 py-1.5 text-[13px] font-semibold tracking-tight rounded-full transition-all cursor-pointer active:scale-[0.98] hover:scale-[1.02]
                  bg-slate-950 text-white hover:bg-slate-900 shadow-sm
                  dark:bg-white dark:text-neutral-950 dark:hover:bg-white/90"
              >
                <span>Live Demo</span>
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-full text-slate-700 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Responsive Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-3xl border-b border-black/[0.06] dark:border-white/[0.08] px-5 py-5 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Mobile Search Bar */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchOpen(true);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.06] border border-black/[0.05] dark:border-white/[0.08] text-slate-600 dark:text-neutral-300 text-xs"
            >
              <span className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 opacity-60" />
                <span>Search pages, tools...</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 bg-black/[0.04] dark:bg-white/[0.08] rounded text-neutral-400">⌘K</span>
            </button>

            {/* Direct Client Forge Home Link */}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/[0.08] hover:bg-slate-100 dark:hover:bg-white/[0.08] transition"
              title="Return to Client Forge Home"
            >
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-black border border-slate-200 dark:border-white/10 shrink-0">
                <img src="/logo.jpg" alt="Client Forge Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-victorian text-lg font-normal tracking-wide text-slate-900 dark:text-white">
                  Client Forge
                </span>
                <span className="text-[10px] text-slate-500 dark:text-neutral-400 font-sans">
                  Universal Landing Page
                </span>
              </div>
            </Link>

            {/* Section 1: PeopleCore HR Platform */}
            <div className="space-y-1">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-3 pb-1">
                PeopleCore HR Platform
              </div>
              <Link 
                href="/peoplecore" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 rounded-xl hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20"
              >
                ★ PeopleCore Overview
              </Link>
              <Link 
                href="/product" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-xs text-slate-700 dark:text-neutral-200 hover:text-slate-950 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.06]"
              >
                Product Tour
              </Link>
              <Link 
                href="/features" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-xs text-slate-700 dark:text-neutral-200 hover:text-slate-950 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.06]"
              >
                Features Directory
              </Link>
              <Link 
                href="/security" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-xs text-slate-700 dark:text-neutral-200 hover:text-slate-950 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.06]"
              >
                Security & Trust
              </Link>
              <Link 
                href="/integrations" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-xs text-slate-700 dark:text-neutral-200 hover:text-slate-950 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.06]"
              >
                Integrations Directory
              </Link>
            </div>

            {/* Section 2: Solutions & Operations */}
            <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-white/[0.06]">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-3 pb-1">
                Solutions & Operations
              </div>
              <Link 
                href="/talent-intelligence" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-xs text-slate-700 dark:text-neutral-200 hover:text-slate-950 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.06]"
              >
                Talent Intelligence
              </Link>
              <Link 
                href="/people-operations" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-xs text-slate-700 dark:text-neutral-200 hover:text-slate-950 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.06]"
              >
                Enterprise Scaling
              </Link>
              <Link 
                href="/global-mobility" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-xs text-slate-700 dark:text-neutral-200 hover:text-slate-950 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.06]"
              >
                Global Mobility
              </Link>
            </div>

            {/* Section 3: Platform Links */}
            <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-white/[0.06]">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-3 pb-1">
                Platform & Company
              </div>
              <Link 
                href="/pricing" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-xs text-slate-700 dark:text-neutral-200 hover:text-slate-950 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.06]"
              >
                Pricing Plans
              </Link>
              <Link 
                href="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-xs text-slate-700 dark:text-neutral-200 hover:text-slate-950 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.06]"
              >
                About Us
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-xs text-slate-700 dark:text-neutral-200 hover:text-slate-950 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.06]"
              >
                Contact & Demo
              </Link>
              <Link 
                href="/support-peoplecore" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-xs text-indigo-600 dark:text-indigo-400 font-semibold rounded-xl hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20"
              >
                Support PeopleCore Project
              </Link>
              <Link 
                href="/workspace" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white rounded-xl hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
              >
                Open HR Workspace →
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-white/[0.08] flex flex-col gap-2">
              <Link 
                href="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-xs font-medium text-slate-700 dark:text-neutral-300 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.04]"
              >
                Sign In
              </Link>
              <Link 
                href="/signup" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-xs font-semibold text-white bg-slate-950 hover:bg-slate-900 dark:text-neutral-950 dark:bg-white rounded-xl shadow-xs"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Spotlight Search Modal */}
      {searchOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 dark:bg-black/70 backdrop-blur-xl flex items-start justify-center pt-24 sm:pt-28 px-4 animate-in fade-in duration-200"
          onClick={() => setSearchOpen(false)}
        >
          <div 
            className="w-full max-w-xl bg-white/95 dark:bg-[#141418]/95 backdrop-blur-3xl rounded-3xl border border-black/[0.08] dark:border-white/[0.12] shadow-2xl p-4 text-slate-900 dark:text-neutral-100 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.06] border border-black/[0.05] dark:border-white/[0.08]">
              <Search className="w-4 h-4 text-neutral-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search PeopleCore modules, docs, features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-slate-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none"
              />
              <button 
                onClick={() => setSearchOpen(false)}
                className="px-1.5 py-0.5 rounded text-[10px] font-mono text-neutral-500 bg-black/[0.05] dark:bg-white/[0.08] hover:bg-black/[0.08] transition-colors cursor-pointer"
              >
                ESC
              </button>
            </div>

            <div className="mt-3 px-1 space-y-1">
              {[
                { title: "PeopleCore Workforce OS", category: "HR Platform", href: "/peoplecore", icon: Sparkles },
                { title: "Product Architecture & Graph", category: "Architecture", href: "/product", icon: Layers },
                { title: "Feature Directory & Matrix", category: "Features", href: "/features", icon: CheckCircle2 },
                { title: "Security & Trust Center", category: "Compliance", href: "/security", icon: ShieldCheck },
                { title: "Ecosystem Integrations", category: "Integrations", href: "/integrations", icon: Zap },
                { title: "Pricing & Plans", category: "Billing", href: "/pricing", icon: CreditCard },
                { title: "Open HR Workspace", category: "Live App", href: "/workspace", icon: ArrowRight }
              ].filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((item, i) => {
                const Icon = item.icon;
                return (
                  <Link 
                    key={i}
                    href={item.href} 
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-700 dark:text-neutral-300 hover:bg-black/[0.03] dark:hover:bg-white/[0.06] transition group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-3.5 h-3.5 text-indigo-500" />
                      <span className="font-medium group-hover:text-slate-950 dark:group-hover:text-white transition">
                        {item.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400 px-1.5 py-0.5 rounded bg-black/[0.02] dark:bg-white/[0.04]">
                      {item.category}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
