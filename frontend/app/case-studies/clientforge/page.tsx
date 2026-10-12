import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PortfolioNav from "@/components/portfolio/PortfolioNav";
import ClientForgeStudy from "@/components/portfolio/ClientForgeStudy";
import { ContactSection, PortfolioFooter } from "@/components/portfolio/PortfolioSections";
import s from "@/components/portfolio/portfolio.module.css";

export const metadata: Metadata = {
  title: "ClientForge — B2B Software Engineering Case Study",
  description:
    "Inspect ClientForge’s tenant boundaries, role permissions, relational models, transactional services, and implementation evidence.",
  alternates: { canonical: "/case-studies/clientforge" },
};

export default function CaseStudy() {
  return (
    <div className="overflow-x-clip text-slate-900 dark:text-zinc-100">
      <PortfolioNav />
      <main id="main-content" className="pt-28 sm:pt-32">
        <ClientForgeStudy />

        <div className={s.shell}>
          <div className="my-8 p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-between gap-4 flex-wrap">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
                Interactive Demonstration Layer
              </span>
              <p className="text-sm text-slate-600 dark:text-neutral-400 max-w-xl">
                Explore the secondary product marketing demonstrations, candidate pipeline models, and scenario simulators on the dedicated showcase page.
              </p>
            </div>
            <Link
              href="/showcase"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <span>Explore Product Showcase</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        <ContactSection />
      </main>
      <PortfolioFooter />
    </div>
  );
}
