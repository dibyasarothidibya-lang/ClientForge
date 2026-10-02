import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CoreModulesTabs from "@/components/CoreModulesTabs";
import GlobalWorkforceBanner from "@/components/GlobalWorkforceBanner";
import HRCardDeck from "@/components/HRCardDeck";
import BentoGrid from "@/components/BentoGrid";
import RoiCalculator from "@/components/RoiCalculator";
import Metrics from "@/components/Metrics";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import ThreeDSection from "@/components/motion/ThreeDSection";

export const metadata = {
  title: "Dibya Sarothi Simanta — The Architect Behind Client Forge",
  description: "Meet Dibya Sarothi Simanta, full-stack systems architect, and explore Client Forge: a showcase of end-to-end SaaS design, engineering, and deployment.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent dark:bg-transparent text-slate-900 dark:text-[#f5f5f3] overflow-x-hidden selection:bg-indigo-500 selection:text-white transition-colors duration-200 relative">

      {/* Sticky Glass Navigation Bar */}
      <Navbar />

      {/* Hero Section with Ambient Glow, Continuous Marquee, & Outcome Metrics */}
      <Hero />

      {/* Core Solutions Tabs Switcher */}
      <ThreeDSection depthIntensity={0.65}>
        <CoreModulesTabs />
      </ThreeDSection>

      {/* Side-Anchored 3D Global Workforce & Mobility Banner */}
      <ThreeDSection depthIntensity={0.45}>
        <GlobalWorkforceBanner />
      </ThreeDSection>

      {/* Auto-Roaming People Operations Card Rail */}
      <ThreeDSection depthIntensity={0.6}>
        <HRCardDeck />
      </ThreeDSection>

      {/* Bento Grid Feature Architecture */}
      <ThreeDSection depthIntensity={0.7}>
        <BentoGrid />
      </ThreeDSection>

      {/* Live Interactive Opportunity Value & Velocity Calculator */}
      <ThreeDSection depthIntensity={0.6}>
        <RoiCalculator />
      </ThreeDSection>

      {/* Impact & Velocity Stats Strip */}
      <ThreeDSection depthIntensity={0.75}>
        <Metrics />
      </ThreeDSection>

      {/* Operator Perspectives & Case Studies */}
      <ThreeDSection depthIntensity={0.7}>
        <Testimonials />
      </ThreeDSection>

      {/* Objection & Mechanics FAQ Accordion */}
      <ThreeDSection depthIntensity={0.6}>
        <Faq />
      </ThreeDSection>

      {/* High-Conversion Editorial CTA Banner */}
      <ThreeDSection depthIntensity={0.7}>
        <CtaBanner />
      </ThreeDSection>

      {/* Comprehensive Enterprise Footer */}
      <Footer />
    </main>
  );
}
