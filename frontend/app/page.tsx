import type { Metadata } from "next";
import PortfolioNav from "@/components/portfolio/PortfolioNav";
import CreatorHero from "@/components/hero/CreatorHero";
import {
  BusinessProblemsSection,
  Services,
  FlagshipStudy,
  GuidedDemonstrationSection,
  TechnicalProofStrip,
  Engagement,
  AboutEngineer,
  ContactSection,
  PortfolioFooter,
} from "@/components/portfolio/PortfolioSections";
import GlobalWorkforceBanner from "@/components/GlobalWorkforceBanner";
import SelectedWork from "@/components/SelectedWork";
import LegacyShowcase from "@/components/portfolio/LegacyShowcase";
import Faq from "@/components/Faq";
import ThreeDSection from "@/components/motion/ThreeDSection";
import s from "@/components/portfolio/portfolio.module.css";

export const metadata: Metadata = {
  title: "Dibya Sarothi Simanta — B2B Software & Backend Systems Engineer",
  description:
    "Independent engineer for custom internal business applications, workflow automation, and reliable backend systems. Explore ClientForge and working engineering projects.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Dibya Sarothi Simanta — Independent B2B Software Engineer",
    description:
      "Reliable backend systems, integrations, and operational software. Engineering evidence through ClientForge, MediGuard AI, and automation projects.",
    url: "/",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dibya Sarothi Simanta — engineering portfolio",
      },
    ],
  },
};

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dibya Sarothi Simanta",
  jobTitle: "Independent B2B Software & Backend Systems Engineer",
  url: "https://dibyasarothi.is-a.dev/",
  email: "dibyasarothidibya@gmail.com",
  sameAs: [
    "https://github.com/dibyasarothidibya-lang",
    "https://www.linkedin.com/in/dibya-sarothi-simanta-b1a82235a/",
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen text-slate-900 dark:text-zinc-100 overflow-x-clip">
      <PortfolioNav />
      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(person).replace(/</g, "\\u003c"),
          }}
        />
        <section
          id="hero-section"
          aria-label="Independent engineering services"
          className="pt-28 sm:pt-32 pb-14"
        >
          <div className={s.shell}>
            <CreatorHero introOnly />
          </div>
        </section>

        <BusinessProblemsSection />
        <Services />
        <FlagshipStudy />
        <GuidedDemonstrationSection />

        <ThreeDSection depthIntensity={0.45}>
          <GlobalWorkforceBanner />
        </ThreeDSection>

        <TechnicalProofStrip />

        <details className={s.demoDetails}>
          <summary>
            Secondary Technical Showcase — Opportunity & Pipeline Intelligence Modeling
            <span>
              Interactive module tabs, workforce rail, technical visualisations, scenario calculator, and architecture decisions. Sample data and projections are labelled inside the demonstrations.
            </span>
          </summary>
          <LegacyShowcase />
        </details>

        <ThreeDSection depthIntensity={0.65}>
          <SelectedWork />
        </ThreeDSection>

        <Engagement />
        <AboutEngineer />
        <Faq />
        <ContactSection />
      </main>
      <PortfolioFooter />
    </div>
  );
}
