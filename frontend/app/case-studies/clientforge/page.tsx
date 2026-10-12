import type { Metadata } from "next";
import PortfolioNav from "@/components/portfolio/PortfolioNav";
import ClientForgeStudy from "@/components/portfolio/ClientForgeStudy";
import GlobalWorkforceBanner from "@/components/GlobalWorkforceBanner";
import LegacyShowcase from "@/components/portfolio/LegacyShowcase";
import { ContactSection, PortfolioFooter } from "@/components/portfolio/PortfolioSections";
import ThreeDSection from "@/components/motion/ThreeDSection";
import s from "@/components/portfolio/portfolio.module.css";
export const metadata: Metadata = { title: "ClientForge — B2B Software Engineering Case Study", description: "Inspect ClientForge’s tenant boundaries, role permissions, relational models, transactional services, and interactive operations demonstrations.", alternates: { canonical: "/case-studies/clientforge" } };
export default function CaseStudy(){return <div className="overflow-x-clip text-slate-900 dark:text-zinc-100"><PortfolioNav/><main id="main-content"><ClientForgeStudy/><ThreeDSection depthIntensity={.45}><GlobalWorkforceBanner/></ThreeDSection><details className={s.demoDetails}><summary>Explore the original interactive product demonstrations<span>Go deeper into the platform’s interface concepts, sample scenarios, and domain workflows.</span></summary><LegacyShowcase/></details><ContactSection/></main><PortfolioFooter/></div>;}
