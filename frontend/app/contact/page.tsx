"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpatialMeshBackground from "@/components/ui/SpatialMeshBackground";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  Building2,
  ArrowRight,
  MessageSquare,
  ShieldCheck
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    teamSize: "25-100",
    category: "Request Product Demo",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070709] text-slate-900 dark:text-neutral-100 font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200 relative overflow-x-hidden">
      <SpatialMeshBackground />
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-14 sm:pt-40 sm:pb-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Contact & Sales</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-950 dark:text-white max-w-4xl mx-auto">
          Let’s talk about your <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-sky-500 to-indigo-400">people operations.</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto mt-4 leading-relaxed">
          Whether you want a tailored product demo, custom enterprise pricing, or security compliance reviews, our team is ready.
        </p>
      </section>

      {/* Main Form & Info Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Info Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-950 dark:text-white">Direct Advisory Channels</h3>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
                  Connect with our solutions architects directly.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Enterprise Inquiries</div>
                    <div className="text-slate-500 font-mono mt-0.5">enterprise@peoplecore.com</div>
                    <div className="text-[11px] text-emerald-600 mt-0.5">SLA: Under 1 hour response</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Security & Audit Desk</div>
                    <div className="text-slate-500 font-mono mt-0.5">security@peoplecore.com</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">For SOC-2 reports and vendor questionnaires</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Support Coverage</div>
                    <div className="text-slate-500 mt-0.5">24/7 Global Follow-the-Sun for Business & Enterprise</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/[0.04]">
                <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                  Global Hubs
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-neutral-400">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900/50">
                    <div className="font-bold text-slate-900 dark:text-white">San Francisco</div>
                    <div className="text-[11px] text-slate-400">555 Mission St, Suite 2400</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900/50">
                    <div className="font-bold text-slate-900 dark:text-white">London</div>
                    <div className="text-[11px] text-slate-400">100 Bishopsgate, Level 18</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact / Demo Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-md">
            {isSubmitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-950 dark:text-white">Message Dispatched!</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, {formData.name}. Our enterprise team has received your inquiry and will follow up within 1 business hour.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        company: "",
                        teamSize: "25-100",
                        category: "Request Product Demo",
                        message: ""
                      });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-neutral-800 text-slate-900 dark:text-white text-xs font-semibold"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-1">
                    Send an Inquiry or Schedule a Demo
                  </h3>
                  <p className="text-xs text-slate-500">
                    Fill in your details below and a specialist will connect with you.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Eleanor Vance"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="eleanor@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Acme Technologies"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                      Current Headcount
                    </label>
                    <select
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white focus:outline-none cursor-pointer"
                    >
                      <option value="1-15">1-15 Employees</option>
                      <option value="15-50">15-50 Employees</option>
                      <option value="50-250">50-250 Employees</option>
                      <option value="250-1000">250-1,000 Employees</option>
                      <option value="1000+">1,000+ Enterprise</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white focus:outline-none cursor-pointer"
                  >
                    <option value="Request Product Demo">Request Tailored Product Demo</option>
                    <option value="Enterprise Sales">Enterprise Custom Pricing & Contract</option>
                    <option value="Security & Compliance">Security & Compliance Pack Access</option>
                    <option value="BambooHR / Workday Migration">Legacy System Migration</option>
                    <option value="Technical & Developer API">Custom Django / API Integration</option>
                    <option value="Other">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                    Message or Requirements
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your current HR tech stack, timeline, or key feature requirements..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition cursor-pointer shadow-md shadow-indigo-600/25 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Dispatching Message...</span>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
