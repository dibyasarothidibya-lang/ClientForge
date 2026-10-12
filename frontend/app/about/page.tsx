import type { Metadata } from "next";
import PortfolioNav from "@/components/portfolio/PortfolioNav";
import { AboutEngineer, ContactSection, PortfolioFooter } from "@/components/portfolio/PortfolioSections";
import SelectedWork from "@/components/SelectedWork";
export const metadata: Metadata = { title: "About Dibya Sarothi Simanta — Independent Software Engineer", description: "Independent engineering work in B2B applications, backend systems, integrations, and operational workflows.", alternates: { canonical: "/about" } };
export default function AboutPage(){return <><PortfolioNav/><main id="main-content" className="pt-28 text-slate-900 dark:text-zinc-100"><AboutEngineer asPage/><SelectedWork/><ContactSection/></main><PortfolioFooter/></>;}
