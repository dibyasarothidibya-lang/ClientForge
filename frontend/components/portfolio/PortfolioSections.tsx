import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  engineer,
  commercialServices,
  businessProblems,
  demonstrationModules,
  engagementPhases,
} from "@/lib/portfolio";
import s from "./portfolio.module.css";

export function BusinessProblemsSection() {
  return (
    <div className={s.shell}>
      <section id="problems" className={s.section} aria-labelledby="problems-title">
        <p className={s.eyebrow}>Operational challenges / Architectural solutions</p>
        <h2 id="problems-title" className={s.title}>
          Operational friction rarely starts as a software bug.
        </h2>
        <p className={s.lead}>
          It starts with ad-hoc spreadsheets, untracked approvals, and fragmented records that slow your business down. Here is how I solve them in software.
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
          <p>Passing unit & regression tests covering permissions, services, and endpoints.</p>
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

export function Services() {
  return (
    <div className={s.shell}>
      <section id="services" className={s.section} aria-labelledby="services-title">
        <p className={s.eyebrow}>Commercial services / B2B engineering</p>
        <h2 id="services-title" className={s.title}>
          When the workaround becomes the bottleneck.
        </h2>
        <p className={s.lead}>
          I engineer robust backend architectures, workflow automation, and custom internal software designed to handle complex business operations reliably.
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
                  href={`mailto:${engineer.email}?subject=${encodeURIComponent(service.subject)}`}
                >
                  Discuss this problem <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export function FlagshipStudy() {
  return (
    <div className={s.shell}>
      <section id="selected-work" className={s.section} aria-labelledby="flagship-title">
        <p className={s.eyebrow}>Flagship engineering evidence / ClientForge</p>
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
        <p className={s.eyebrow}>How we work together</p>
        <h2 className={s.title}>A clear scope before a line of production code.</h2>
        <p className={s.lead}>
          Scope, pricing, and delivery dates are agreed for the actual project. Each step has a practical output you can review.
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
              ClientForge, MediGuard AI, and my automation projects are evidence of independent engineering work. My starting specialization is software for people operations and complex administrative processes.
            </p>
            <p className={s.body}>
              I bring data modeling, permission boundaries, failure handling, and deployment into the same conversation as the user workflow. These projects are presented as technical evidence, without invented client engagements or revenue results.
            </p>
            <div className={s.links}>
              <a className={s.link} href={engineer.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn <ArrowUpRight size={15} />
              </a>
              <a className={s.link} href="https://github.com/dibyasarothidibya-lang" target="_blank" rel="noopener noreferrer">
                Inspect my work <ArrowUpRight size={15} />
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
          <Heading className={s.title}>What is slowing your operation down?</Heading>
          <p className={s.lead}>
            Tell me what your team does, which systems are involved, and where the process breaks. We can start with the problem before deciding on a solution.
          </p>
        </div>
        <div>
          <a className={s.contactEmail} href={`mailto:${engineer.email}`}>
            {engineer.email}
          </a>
          <a className={s.button} href={`mailto:${engineer.email}?subject=Project%20enquiry`}>
            Discuss a Project <ArrowUpRight size={17} />
          </a>
          <div className={s.links}>
            <a className={s.link} href={engineer.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp <ArrowUpRight size={15} />
            </a>
            <a className={s.link} href={engineer.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn <ArrowUpRight size={15} />
            </a>
          </div>
          <p className={s.body}>
            Email and WhatsApp connect directly. No form submission or account is required.
          </p>
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
        </div>
      </footer>
    </div>
  );
}
