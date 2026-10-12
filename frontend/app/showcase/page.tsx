import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import PortfolioNav from "@/components/portfolio/PortfolioNav";
import LegacyShowcase from "@/components/portfolio/LegacyShowcase";
import { ContactSection, PortfolioFooter } from "@/components/portfolio/PortfolioSections";
import s from "@/components/portfolio/portfolio.module.css";

export const metadata: Metadata = {
  title: "ClientForge Secondary Product Showcase — Modeling & Pipeline Demonstrations",
  description:
    "Interactive secondary product showcase preserving ClientForge's opportunity intelligence modeling, talent cards, pipeline simulator, and scenario projections.",
  alternates: { canonical: "/showcase" },
};

export default function ShowcasePage() {
  return (
    <div className="min-h-screen text-slate-900 dark:text-zinc-100 overflow-x-clip">
      <PortfolioNav />
      <main id="main-content" className="pt-28 sm:pt-32">
        <div className={s.shell}>
          <div className="py-8 border-b border-slate-200/80 dark:border-white/10 mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-white transition-colors mb-4"
            >
              <ArrowLeft size={14} /> Back to Freelance Portfolio
            </Link>
            <span className={s.eyebrow}>
              Secondary Technical Showcase · Interactive Prototype Demonstrations
            </span>
            <h1 className={s.title}>
              ClientForge Product &amp; Pipeline Modeling Showcase
            </h1>
            <p className={s.lead}>
              This showcase preserves the interactive product demonstrations, opportunity intelligence models, candidate pipelines, and ROI scenarios designed for ClientForge. 
            </p>
            <div className="p-4 rounded-xl border border-indigo-200/60 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/20 text-xs text-slate-700 dark:text-neutral-300 leading-relaxed">
              <strong>Demonstration &amp; Simulation Context:</strong> The pipeline projections, hypothetical figures (including modeled $66,000/month or 15.5× return scenarios), candidate profiles, company names, and subscription pricing models on this page are illustrative product simulations. Factual engineering evidence—including tested organization-scoped querysets, 13 modular Django apps, and 71 passing test methods—is documented in the{" "}
              <Link href="/case-studies/clientforge" className="underline font-semibold text-indigo-600 dark:text-indigo-400">
                ClientForge Technical Case Study
              </Link>
              .
            </div>
            <div className={s.links}>
              <Link href="/case-studies/clientforge" className={s.button}>
                Read Technical Case Study <ArrowUpRight size={16} />
              </Link>
              <Link href="/workspace" className={s.link}>
                Enter Live Workspace Demo <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        <LegacyShowcase />

        <ContactSection />
      </main>
      <PortfolioFooter />
    </div>
  );
}
