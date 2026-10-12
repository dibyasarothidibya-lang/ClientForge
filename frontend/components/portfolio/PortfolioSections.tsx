import Link from "next/link";
import { ArrowUpRight, Play, CheckCircle2, ShieldCheck, Database, Layers } from "lucide-react";
import {
  engineer,
  commercialServices,
  businessProblems,
  guidedDemonstrationPaths,
  demonstrationModules,
  engagementPhases,
} from "@/lib/portfolio";
import ContactForm from "./ContactForm";
import s from "./portfolio.module.css";

export function BusinessProblemsSection() {
  return (
    <div className={s.shell}>
      <section id="problems" className={s.section} aria-labelledby="problems-title">
        <p className={s.eyebrow}>Operational Bottlenecks / Software Solutions</p>
        <h2 id="problems-title" className={s.title}>
          The tools work. The process doesn&apos;t.
        </h2>
        <p className={s.lead}>
          Most operational friction doesn&apos;t start with bad software—it starts when separate tools, spreadsheets, and manual handoffs create invisible business bottlenecks. Here is how I solve them in software:
        </p>
        <div className={s.problemGrid}>
          {businessProblems.map((item, idx) => (
            <div key={idx} className={s.problemCard}>
              <div className={s.problemHeader}>
                <h3>{item.problem}</h3>
                <p className={s.problemBody}>{item.consequence}</p>
              </div>
              <div className={s.solutionBox}>
                <strong>Engineered Solution</strong>
                <p>{item.solution}</p>
                <Link href={item.targetModule} className={s.link}>
                  {item.ctaText} <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function Services() {
  return (
    <div className={s.shell}>
      <section id="services" className={s.section} aria-labelledby="services-title">
        <p className={s.eyebrow}>Core Engineering Services / B2B Solutions</p>
        <h2 id="services-title" className={s.title}>
          Three ways we can work together.
        </h2>
        <p className={s.lead}>
          I partner directly with businesses to solve specific operational and technical bottlenecks—without agency overhead, account managers, or delegated junior developers.
        </p>
        {commercialServices.map((service) => (
          <article className={s.service} key={service.number}>
            <span className={s.number} aria-hidden="true">
              {service.number}
            </span>
            <div>
              <h3>{service.title}</h3>
              <p className={s.problem}>{service.problem}</p>
              <p className={s.body}>{service.consequence}</p>
            </div>
            <div>
              <p className={s.body}>{service.solution}</p>
              <p className={s.proof}>
                <strong>Engineering evidence.</strong> {service.evidence}
              </p>
              <div className={s.links}>
                <Link href={service.module} className={s.link}>
                  {service.link} <ArrowUpRight size={15} />
                </Link>
                <a
                  className={s.link}
                  href={`https://wa.me/8801704909232?text=${encodeURIComponent(service.whatsappPrefill)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {service.ctaText} <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export function GuidedDemonstrationSection() {
  return (
    <div className={s.shell}>
      <section id="guided-demo" className={s.section} aria-labelledby="guided-demo-title">
        <p className={s.eyebrow}>Guided Demonstration Journey / Live Prototype</p>
        <h2 id="guided-demo-title" className={s.title}>
          Test the engineering before starting a conversation.
        </h2>
        <p className={s.lead}>
          Choose what matters most to your organization and see how ClientForge handles real-world complexity with interactive, live-tested flows:
        </p>

        <div className={s.guidedGrid}>
          {guidedDemonstrationPaths.map((path) => (
            <Link key={path.number} href={path.path} className={s.guidedCard}>
              <div>
                <span className={s.guidedBadge}>{path.badge}</span>
                <h3>{path.title}</h3>
                <p className={s.guidedSubtitle}>{path.subtitle}</p>
                <p>{path.description}</p>
              </div>
              <span className={s.guidedAction}>
                {path.action} <ArrowUpRight size={14} />
              </span>
            </Link>
          ))}
        </div>

        <div className={s.videoCallout}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
            <div>
              <strong className="block text-sm font-medium text-slate-900 dark:text-white">
                Prefer a concise video walkthrough?
              </strong>
              <span className="text-xs text-slate-500 dark:text-neutral-400">
                Watch the 3-minute technical tour of ClientForge&apos;s architecture and live modules.
              </span>
            </div>
          </div>
          <a
            href={engineer.video}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            <span>Watch Walkthrough on YouTube</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </section>
    </div>
  );
}

export function LiveDemoNavigator() {
  return (
    <div className={s.moduleGrid}>
      {demonstrationModules.map((mod) => (
        <Link key={mod.path} href={mod.path} className={s.moduleCard}>
          <div>
            <span className={s.moduleBadge}>{mod.badge}</span>
            <h4>{mod.name}</h4>
            <p>{mod.description}</p>
          </div>
          <span className={s.moduleAction}>
            Launch module demo <ArrowUpRight size={14} />
          </span>
        </Link>
      ))}
    </div>
  );
}

export function TechnicalProofStrip() {
  return (
    <div className={s.shell}>
      <div className={s.proofBanner} aria-label="Technical verification metrics">
        <div className={s.proofItem}>
          <strong>71</strong>
          <span>Automated Tests</span>
          <p>Passing unit & regression tests covering permissions, domain services, and API endpoints.</p>
        </div>
        <div className={s.proofItem}>
          <strong>6 Tiers</strong>
          <span>RBAC Matrix</span>
          <p>Granular organization roles from Owner and Admin down to Member and Auditor.</p>
        </div>
        <div className={s.proofItem}>
          <strong>100%</strong>
          <span>Tenant Isolation</span>
          <p>Organization-scoped relational querysets preventing cross-tenant data leakage.</p>
        </div>
        <div className={s.proofItem}>
          <strong>Atomic</strong>
          <span>State Transitions</span>
          <p>Database transaction safety and Decimal arithmetic protecting critical workflows.</p>
        </div>
      </div>
    </div>
  );
}

export function FlagshipStudy() {
  return (
    <div className={s.shell}>
      <section id="selected-work" className={s.section} aria-labelledby="flagship-title">
        <p className={s.eyebrow}>Flagship Engineering Evidence / ClientForge</p>
        <div className={s.split}>
          <div>
            <span className={s.tag}>Independent engineering project</span>
            <h2 id="flagship-title" className={s.title}>
              One system. Many teams. Clear boundaries.
            </h2>
            <p className={s.lead}>
              ClientForge models the hard parts of internal operations: connected employee records, organization permissions, approval state changes, compensation calculations, and traceable activity.
            </p>
            <div className={s.links}>
              <Link href="/case-studies/clientforge" className={s.button}>
                Read the case study <ArrowUpRight size={17} />
              </Link>
              <Link href="/workspace" className={s.link}>
                Enter the live workspace demo <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
          <div>
            {[
              [
                "The business challenge",
                "People, leave, payroll, and documents cannot be dependable when each workflow holds a different version of the same record.",
              ],
              [
                "The engineering response",
                "Organization-linked data models, role-aware APIs, transactional domain services, and explicit audit events connect those workflows.",
              ],
              [
                "What it demonstrates",
                "A foundation for custom people operations software, approval systems, client account models, and reliable internal applications.",
              ],
            ].map(([title, body]) => (
              <div className={s.record} key={title}>
                <h3>{title}</h3>
                <p className={s.body}>{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "48px" }}>
          <p className={s.eyebrow}>Direct workspace navigation</p>
          <p className={s.body}>
            Explore the live implemented workspace modules directly with seeded sample data:
          </p>
          <LiveDemoNavigator />
        </div>

        <p className={s.notice}>
          The workspace includes seeded example organizations and simulated operational displays. Payroll arithmetic and workflow code are engineering demonstrations; they do not establish jurisdiction-specific tax compliance or actual money movement.
        </p>
      </section>
    </div>
  );
}

export function Engagement() {
  return (
    <div className={s.shell}>
      <section id="engagement" className={s.section}>
        <p className={s.eyebrow}>How We Work Together</p>
        <h2 className={s.title}>A clear scope before a line of production code.</h2>
        <p className={s.lead}>
          Direct collaboration with the engineer writing your code. Fixed milestones, transparent updates, and predictable outcomes from day one.
        </p>
        <ol className={s.process}>
          {engagementPhases.map((phase) => (
            <li key={phase.step}>
              <span className={s.step}>{phase.step}</span>
              <h3>{phase.phase}</h3>
              <p className={s.body}>{phase.description}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

export function AboutEngineer({ asPage = false }: { asPage?: boolean } = {}) {
  const Heading = asPage ? "h1" : "h2";
  return (
    <div className={s.shell}>
      <section id="about" className={s.section}>
        <div className={s.split}>
          <div>
            <p className={s.eyebrow}>The independent engineer</p>
            <Heading className={s.title}>Dibya Sarothi Simanta.</Heading>
            <p className={s.lead}>
              I build across backend architecture, integrations, and the interfaces that make operational software usable.
            </p>
          </div>
          <div>
            <p className={s.body}>
              I partner directly with founders, operations leads, and product teams who need dependable software built without agency bloat or communication layers. When you work with me, you communicate directly with the engineer writing your code.
            </p>
            <p className={s.body}>
              From data modeling and tenant boundaries to failure handling, responsive frontends, and automated deployments—I bring the full software lifecycle into one coherent execution. ClientForge, MediGuard AI, and my automation tools demonstrate this production-focused mindset.
            </p>
            <div className={s.links}>
              <a className={s.link} href={engineer.whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp <ArrowUpRight size={15} />
              </a>
              <a className={s.link} href={engineer.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn <ArrowUpRight size={15} />
              </a>
              <a className={s.link} href={engineer.github} target="_blank" rel="noopener noreferrer">
                GitHub Repository <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function ContactSection({ asPage = false }: { asPage?: boolean } = {}) {
  const Heading = asPage ? "h1" : "h2";
  return (
    <div className={s.shell}>
      <section id="contact" className={`${s.section} ${s.contact}`}>
        <div>
          <p className={s.eyebrow}>Start a project conversation</p>
          <Heading className={s.title}>What is slowing your business down?</Heading>
          <p className={s.lead}>
            Tell me what your team does, which systems are involved, and where the process breaks. We can start with the problem before deciding on a solution.
          </p>

          <div className="space-y-4 pt-2">
            <div>
              <span className="block text-xs uppercase tracking-wider text-slate-500 dark:text-neutral-400 font-semibold mb-1">
                Direct Email
              </span>
              <a className={s.contactEmail} href={`mailto:${engineer.email}`}>
                {engineer.email}
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                className={s.button}
                href={engineer.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                Discuss on WhatsApp <ArrowUpRight size={17} />
              </a>
              <a
                className={s.link}
                href={engineer.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn Profile <ArrowUpRight size={15} />
              </a>
            </div>

            <p className={s.body} style={{ marginTop: "24px" }}>
              Direct technical communication. No sales pitches, no marketing follow-ups, and no obligation.
            </p>
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

export function PortfolioFooter() {
  return (
    <div className={s.shell}>
      <footer className={s.footer}>
        <span>
          © {new Date().getFullYear()} Dibya Sarothi Simanta · Independent B2B software engineering
        </span>
        <div className={s.links}>
          <Link href="/case-studies/clientforge">ClientForge case study</Link>
          <Link href="/workspace">Product demo</Link>
          <Link href="/security">Implemented controls</Link>
          <a href={engineer.whatsapp} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
      </footer>
    </div>
  );
}
