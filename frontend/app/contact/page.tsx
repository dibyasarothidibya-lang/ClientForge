import type { Metadata } from "next";
import PortfolioNav from "@/components/portfolio/PortfolioNav";
import { ContactSection, Engagement, PortfolioFooter } from "@/components/portfolio/PortfolioSections";
export const metadata: Metadata = { title: "Discuss a Software Project — Dibya Sarothi Simanta", description: "Contact Dibya about backend systems, integrations, workflow automation, and custom B2B software.", alternates: { canonical: "/contact" } };
export default function ContactPage(){return <><PortfolioNav/><main id="main-content" className="pt-28 text-slate-900 dark:text-zinc-100"><ContactSection asPage/><Engagement/></main><PortfolioFooter/></>;}
