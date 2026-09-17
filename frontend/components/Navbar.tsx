"use client";

import React, { useState, useEffect } from "react";
import { 
  ChevronDown, 
  ChevronRight, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Globe2, 
  Zap, 
  Laptop, 
  ArrowRight,
  Sparkles,
  Code2
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      id="_header_multi_level_dropdown_h18_001"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md border-b border-slate-200/80 dark:border-neutral-800 shadow-sm" 
          : "bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm border-b border-slate-100 dark:border-neutral-900"
      }`}
    >
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-neutral-950 via-indigo-950 to-neutral-950 text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-white/5">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
          Intelligence · Pipeline · Conversion
        </span>
        <span className="hidden sm:inline text-neutral-300">
          Walk into every conversation informed. The operating system for winning better clients.
        </span>
        <a 
          href="#demo" 
          className="inline-flex items-center text-indigo-300 hover:text-white transition-colors underline underline-offset-2 ml-1"
        >
          Explore Platform <ArrowRight className="w-3 h-3 ml-1" />
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo with custom emblem */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md shadow-indigo-500/10 border border-slate-200/80 dark:border-neutral-800 group-hover:scale-105 transition-transform bg-black flex-shrink-0">
              <img 
                src="/logo.jpg" 
                alt="The Client Forge Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-normal tracking-wide text-slate-900 dark:text-white select-none transition-colors">
                 ℭ𝔩𝔦𝔢𝔫𝔱 𝔉𝔬𝔯𝔤𝔢
              </span>
              <span className="text-[9px] uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400 -mt-1 hidden sm:inline-block">
                Client Intelligence OS
              </span>
            </div>
          </a>

          {/* Desktop Navigation with Multi-Level Dropdowns */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            
            {/* Platform Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown("products")}
              onMouseLeave={() => {
                setActiveDropdown(null);
                setActiveSubmenu(null);
              }}
            >
              <button className="flex items-center gap-1 px-3.5 py-2 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                Platform
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "products" ? "rotate-180 text-indigo-600 dark:text-indigo-400" : ""}`} />
              </button>

              {activeDropdown === "products" && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <div className="w-64 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-neutral-800 py-2 text-xs">
                    
                    {/* Intelligence Submenu Trigger */}
                    <div 
                      className="relative"
                      onMouseEnter={() => setActiveSubmenu("software")}
                      onMouseLeave={() => setActiveSubmenu(null)}
                    >
                      <button className="w-full flex items-center justify-between px-4 py-2.5 text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-neutral-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        <span className="flex items-center gap-2 font-semibold">
                          <Code2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          Opportunity Intelligence
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>

                      {/* Intelligence Flyout Submenu */}
                      {activeSubmenu === "software" && (
                        <div className="absolute top-0 left-full pl-2 z-50">
                          <div className="w-60 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-neutral-800 py-2">
                            <a href="#solutions" className="block px-4 py-2 text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-neutral-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                              <div className="font-semibold text-slate-900 dark:text-white">Prospect Intelligence</div>
                              <div className="text-[11px] text-slate-400 dark:text-neutral-500">Know before you pitch</div>
                            </a>
                            <a href="#solutions" className="block px-4 py-2 text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-neutral-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                              <div className="font-semibold text-slate-900 dark:text-white">Opportunity Pipeline</div>
                              <div className="text-[11px] text-slate-400 dark:text-neutral-500">Stage velocity & confidence</div>
                            </a>
                            <a href="#solutions" className="block px-4 py-2 text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-neutral-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                              <div className="font-semibold text-slate-900 dark:text-white">Signal Tracking</div>
                              <div className="text-[11px] text-slate-400 dark:text-neutral-500">Hiring, funding & leadership cues</div>
                            </a>
                            <a href="#solutions" className="block px-4 py-2 text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-neutral-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                              <div className="font-semibold text-slate-900 dark:text-white">Outreach Calibration</div>
                              <div className="text-[11px] text-slate-400 dark:text-neutral-500">Context that starts conversations</div>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Client Operations Submenu Trigger */}
                    <div 
                      className="relative"
                      onMouseEnter={() => setActiveSubmenu("hardware")}
                      onMouseLeave={() => setActiveSubmenu(null)}
                    >
                      <button className="w-full flex items-center justify-between px-4 py-2.5 text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-neutral-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        <span className="flex items-center gap-2 font-semibold">
                          <Laptop className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          Client Operations
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>

                      {/* Operations Flyout Submenu */}
                      {activeSubmenu === "hardware" && (
                        <div className="absolute top-0 left-full pl-2 z-50">
                          <div className="w-60 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-neutral-800 py-2">
                            <a href="#features" className="block px-4 py-2 text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-neutral-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                              <div className="font-semibold text-slate-900 dark:text-white">Client Workspaces</div>
                              <div className="text-[11px] text-slate-400 dark:text-neutral-500">Signed deals to live delivery</div>
                            </a>
                            <a href="#features" className="block px-4 py-2 text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-neutral-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                              <div className="font-semibold text-slate-900 dark:text-white">Relationship OS</div>
                              <div className="text-[11px] text-slate-400 dark:text-neutral-500">Every relationship, every detail</div>
                            </a>
                            <a href="#features" className="block px-4 py-2 text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-neutral-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                              <div className="font-semibold text-slate-900 dark:text-white">Performance Insights</div>
                              <div className="text-[11px] text-slate-400 dark:text-neutral-500">See what is actually working</div>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              )}
            </div>

            <a href="#solutions" className="px-3.5 py-2 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              Pillars
            </a>
            <a href="#features" className="px-3.5 py-2 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              Pipeline
            </a>
            <a href="#calculator" className="px-3.5 py-2 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              Value Calculator
            </a>
            <a href="#pricing" className="px-3.5 py-2 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#testimonials" className="px-3.5 py-2 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              Perspectives
            </a>
            <a href="#faq" className="px-3.5 py-2 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              FAQ
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Aesthetic Segmented Theme Switcher */}
            <ThemeToggle />

            {/* Sign In */}
            <a 
              href="/login" 
              className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Sign In
            </a>

            {/* CTA Button */}
            <a 
              href="#pricing" 
              className="h-10 px-5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-semibold rounded-xl transition-all shadow-md flex items-center gap-1.5 hover:scale-105 active:scale-95"
            >
              Start Forging
              <ArrowRight className="w-4 h-4 hidden sm:inline" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-800 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-neutral-950 border-b border-slate-200 dark:border-neutral-800 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <a 
            href="#solutions" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-800 dark:text-neutral-200 rounded-lg hover:bg-slate-50 dark:hover:bg-neutral-900"
          >
            Products & Solutions
          </a>
          <a 
            href="#features" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-800 dark:text-neutral-200 rounded-lg hover:bg-slate-50 dark:hover:bg-neutral-900"
          >
            Features
          </a>
          <a 
            href="#calculator" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-800 dark:text-neutral-200 rounded-lg hover:bg-slate-50 dark:hover:bg-neutral-900"
          >
            ROI Calculator
          </a>
          <a 
            href="#pricing" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-800 dark:text-neutral-200 rounded-lg hover:bg-slate-50 dark:hover:bg-neutral-900"
          >
            Pricing
          </a>
          <a 
            href="#faq" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-800 dark:text-neutral-200 rounded-lg hover:bg-slate-50 dark:hover:bg-neutral-900"
          >
            FAQ & Resources
          </a>
          <div className="pt-4 border-t border-slate-100 dark:border-neutral-800 flex flex-col gap-3">
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-neutral-400">Theme</span>
              <ThemeToggle />
            </div>
            <a 
              href="/login" 
              className="w-full text-center py-2.5 text-sm font-semibold text-slate-700 dark:text-neutral-300 rounded-xl border border-slate-200 dark:border-neutral-800"
            >
              Sign In
            </a>
            <a 
              href="#pricing" 
              className="w-full text-center py-2.5 text-sm font-semibold text-neutral-950 bg-white rounded-xl shadow-md"
            >
              Start Forging
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
