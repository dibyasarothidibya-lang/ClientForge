import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { engineer, services, engagement } from "@/lib/portfolio";
import s from "./portfolio.module.css";

export function Services() {
  return <div className={s.shell}><section id="services" className={s.section} aria-labelledby="services-title">
    <p className={s.eyebrow}>Business problems / Engineering services</p>
    <h2 id="services-title" className={s.title}>When the workaround becomes the bottleneck.</h2>
    <p className={s.lead}>My initial focus is people operations, administrative workflows, and B2B internal systems. The work starts with your process, its risks, and the records your team needs to trust.</p>
    {services.map(service=><article className={s.service} key={service.number}>
      <span className={s.number} aria-hidden="true">{service.number}</span>
      <div><h3>{service.title}</h3><p className={s.problem}>{service.problem}</p><p className={s.body}>{service.consequence}</p></div>
      <div><p className={s.body}>{service.solution}</p><p className={s.proof}><strong>Engineering evidence.</strong> {service.evidence}</p>
        <Link href={service.module} className={s.link}>{service.link}<ArrowUpRight size={15}/></Link><br/>
        <a className={s.link} href={`mailto:${engineer.email}?subject=${encodeURIComponent(service.subject)}`}>Discuss this problem<ArrowUpRight size={15}/></a>
      </div>
    </article>)}
  </section></div>;
}

export function FlagshipStudy() {
  return <div className={s.shell}><section id="selected-work" className={s.section} aria-labelledby="flagship-title">
    <p className={s.eyebrow}>Flagship engineering evidence / ClientForge</p>
    <div className={s.split}><div><span className={s.tag}>Independent engineering project</span><h2 id="flagship-title" className={s.title}>One system. Many teams. Clear boundaries.</h2>
      <p className={s.lead}>ClientForge models the hard parts of internal operations: connected employee records, organisation permissions, approval state changes, compensation calculations, and traceable activity.</p>
      <div className={s.links}><Link href="/case-studies/clientforge" className={s.button}>Read the case study<ArrowUpRight size={17}/></Link><Link href="/workspace" className={s.link}>Enter the product demo<ArrowUpRight size={15}/></Link></div></div>
      <div>{[
        ["The business challenge", "People, leave, payroll, and documents cannot be dependable when each workflow holds a different version of the same record."],
        ["The engineering response", "Organisation-linked data models, role-aware APIs, transactional domain services, and explicit audit events connect those workflows."],
        ["What it demonstrates", "A foundation for custom people operations software, approval systems, client account models, and reliable internal applications."],
      ].map(([title,body])=><div className={s.record} key={title}><h3>{title}</h3><p className={s.body}>{body}</p></div>)}</div>
    </div><p className={s.notice}>The workspace includes seeded example organisations and simulated operational displays. Payroll arithmetic and workflow code are engineering demonstrations; they do not establish jurisdiction-specific tax compliance or actual money movement.</p>
  </section></div>;
}

export function Engagement() {
  return <div className={s.shell}><section id="engagement" className={s.section}><p className={s.eyebrow}>How we work together</p><h2 className={s.title}>A clear scope before a line of production code.</h2><p className={s.lead}>Scope, pricing, and delivery dates are agreed for the actual project. Each step has a practical output you can review.</p><ol className={s.process}>{engagement.map(([title,body],i)=><li key={title}><span className={s.step}>0{i+1}</span><h3>{title}</h3><p className={s.body}>{body}</p></li>)}</ol></section></div>;
}

export function AboutEngineer({ asPage = false }: { asPage?: boolean } = {}) {
  const Heading = asPage ? "h1" : "h2";
  return <div className={s.shell}><section id="about" className={s.section}><div className={s.split}><div><p className={s.eyebrow}>The independent engineer</p><Heading className={s.title}>Dibya Sarothi Simanta.</Heading><p className={s.lead}>I build across backend architecture, integrations, and the interfaces that make operational software usable.</p></div><div><p className={s.body}>ClientForge, MediGuard AI, and my automation projects are evidence of independent engineering work. My starting specialisation is software for people operations and complex administrative processes.</p><p className={s.body}>I bring data modelling, permission boundaries, failure handling, and deployment into the same conversation as the user workflow. These projects are presented as technical evidence, without invented client engagements or revenue results.</p><div className={s.links}><a className={s.link} href={engineer.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight size={15}/></a><a className={s.link} href="https://github.com/dibyasarothidibya-lang" target="_blank" rel="noopener noreferrer">Inspect my work<ArrowUpRight size={15}/></a></div></div></div></section></div>;
}

export function ContactSection({ asPage = false }: { asPage?: boolean } = {}) {
  const Heading = asPage ? "h1" : "h2";
  return <div className={s.shell}><section id="contact" className={`${s.section} ${s.contact}`}><div><p className={s.eyebrow}>Start a project conversation</p><Heading className={s.title}>What is slowing your operation down?</Heading><p className={s.lead}>Tell me what your team does, which systems are involved, and where the process breaks. We can start with the problem before deciding on a solution.</p></div><div><a className={s.contactEmail} href={`mailto:${engineer.email}`}>{engineer.email}</a><a className={s.button} href={`mailto:${engineer.email}?subject=Project%20enquiry`}>Discuss a Project<ArrowUpRight size={17}/></a><div className={s.links}><a className={s.link} href={engineer.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp<ArrowUpRight size={15}/></a><a className={s.link} href={engineer.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight size={15}/></a></div><p className={s.body}>Email and WhatsApp connect directly. No form submission or account is required.</p></div></section></div>;
}

export function PortfolioFooter() {
  return <div className={s.shell}><footer className={s.footer}><span>© {new Date().getFullYear()} Dibya Sarothi Simanta · Independent B2B software engineering</span><div className={s.links}><Link href="/case-studies/clientforge">ClientForge case study</Link><Link href="/workspace">Product demo</Link><Link href="/security">Implemented controls</Link></div></footer></div>;
}
