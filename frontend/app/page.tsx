import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DashboardPreview from "@/components/DashboardPreview";
import LogoCloud from "@/components/LogoCloud";
import CoreModulesTabs from "@/components/CoreModulesTabs";
import BentoGrid from "@/components/BentoGrid";
import RoiCalculator from "@/components/RoiCalculator";
import Metrics from "@/components/Metrics";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Client Forge — Opportunity Intelligence & Pipeline Engine",
  description: "Precision client acquisition and opportunity intelligence for independent principals, boutique studios, and senior advisory practices.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#080808] text-slate-900 dark:text-[#f5f5f3] overflow-x-hidden selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      {/* Sticky Glass Navigation Bar */}
      <Navbar />

      {/* Hero Section with Ambient Glow & Badges */}
      <Hero />

      {/* Opportunity Intelligence & Pipeline Command Center */}
      <DashboardPreview />

      {/* Enterprise Social Proof Marquee */}
      <LogoCloud />

      {/* Core Solutions Tabs Switcher */}
      <CoreModulesTabs />

      {/* Bento Grid Feature Architecture */}
      <BentoGrid />

      {/* Live Interactive Opportunity Value & Velocity Calculator */}
      <RoiCalculator />

      {/* Impact & Velocity Stats Strip */}
      <Metrics />

      {/* Operator Perspectives & Case Studies */}
      <Testimonials />

      {/* Transparent Pricing with Monthly / Annual Toggle */}
      <Pricing />

      {/* Objection & Mechanics FAQ Accordion */}
      <Faq />

      {/* High-Conversion Editorial CTA Banner */}
      <CtaBanner />

      {/* Comprehensive Enterprise Footer */}
      <Footer />
    </main>
  );
}
