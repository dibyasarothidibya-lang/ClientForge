"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Code2, Layers, MessageCircle, Mail, Pause, Play } from "lucide-react";
import styles from "./creator-hero.module.css";

const stack = ["Next.js", "Django REST", "PostgreSQL", "Redis", "Firebase", "Docker"];
export default function CreatorHero() {
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const offsetX = useSpring(x, { stiffness: 65, damping: 22 });
  const offsetY = useSpring(y, { stiffness: 65, damping: 22 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const depth = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const still = paused || !!reducedMotion;
  function reset() { x.set(0); y.set(0); }
  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (still || event.pointerType !== "mouse") return;
    const b = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - b.left) / b.width - 0.5) * 12);
    y.set(((event.clientY - b.top) / b.height - 0.5) * 8);
  }
  const reveal = { initial: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } };
  return <div ref={ref} className={styles.hero} data-paused={still}>
    <svg width="0" height="0" aria-hidden="true" className={styles.filters}><defs><filter id="signature-ink" colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -0.2126 -0.7152 -0.0722 0 1" /></filter></defs></svg>
    <div className={styles.atmosphere} aria-hidden="true"><div /><div /><div /></div>
    <motion.div className={styles.topline} {...reveal}><span className={styles.eyebrow}>INDEPENDENT ARCHITECT · END-TO-END ENGINEERING</span><a href="https://wa.me/8801704909232" target="_blank" rel="noopener noreferrer" className={styles.availability}><span /> Let’s talk about your next build <ArrowUpRight size={13} /></a></motion.div>
    <div className={styles.grid}>
      <motion.div className={styles.copy} {...reveal}>
        <p className={styles.intro}>Dibya Sarothi Simanta <span>Full-Stack Systems Architect</span></p>
        <h1 className={styles.headline}>Vision to<br /><span>working reality.</span></h1>
        <p className={styles.description}>I design and engineer connected digital products—from the experience people touch to the infrastructure they depend on.</p>
        <div className={styles.signed}><div className={styles.signature}><Image src="/signature.jpeg" alt="Dibya’s handwritten signature" width={1448} height={1086} /></div><span>Thoughtfully designed.<br />Personally engineered.</span></div>
        <div className={styles.actions}><a className={styles.primary} href="mailto:dibyasarothidibya@gmail.com">Discuss a project <ArrowUpRight size={18} /></a><Link className={styles.secondary} href="/workspace">Experience Client Forge <ArrowUpRight size={17} /></Link></div>
        <div className="flex flex-wrap items-center gap-2.5 mt-6 font-sans">
          <a
            href="https://github.com/dibyasarothidibya-lang"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:border-slate-400 dark:hover:border-white/30 text-xs font-sans font-medium text-slate-800 dark:text-neutral-200 transition-all shadow-xs"
          >
            <svg className="w-3.5 h-3.5 fill-current text-slate-700 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          <a
            href="https://x.com/Dibyasarothi"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:border-slate-400 dark:hover:border-white/30 text-xs font-sans font-medium text-slate-800 dark:text-neutral-200 transition-all shadow-xs"
          >
            <span className="font-semibold text-xs font-sans">𝕏</span>
            <span>Twitter</span>
            <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          <a
            href="https://www.linkedin.com/in/dibya-sarothi-simanta-b1a82235a/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:border-slate-400 dark:hover:border-white/30 text-xs font-sans font-medium text-slate-800 dark:text-neutral-200 transition-all shadow-xs"
          >
            <svg className="w-3.5 h-3.5 fill-current text-[#0A66C2]" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          <a
            href="https://wa.me/8801704909232"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:border-emerald-500/40 text-xs font-sans font-medium text-slate-800 dark:text-neutral-200 transition-all shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
            <span>WhatsApp</span>
            <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          <a
            href="mailto:dibyasarothidibya@gmail.com"
            className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:border-indigo-500/40 text-xs font-sans font-medium text-slate-800 dark:text-neutral-200 transition-all shadow-xs"
          >
            <Mail className="w-3.5 h-3.5 text-indigo-400" />
            <span>Email</span>
            <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>
        </div>
      </motion.div>
      <motion.div className={styles.stage} onPointerMove={tilt} onPointerLeave={reset} style={{ y: still ? 0 : depth }} {...reveal}>
        <div className={styles.lightField} aria-hidden="true"><span /><span /></div>
        <motion.div className={styles.editorialScene} style={{ x: still ? 0 : offsetX, y: still ? 0 : offsetY }}>
          <div className={styles.editorialPortrait}>
            <Image 
              src="/creator-editorial-v2.png" 
              className={styles.darkPortrait}
              alt="Dibya Sarothi Simanta, Full-Stack Systems Architect" 
              fill 
              priority 
              sizes="(max-width: 760px) 90vw, 560px" 
            />
            <Image src="/creator-editorial-light.png" className={styles.lightPortrait} alt="Dibya Sarothi Simanta, Full-Stack Systems Architect" fill sizes="(max-width: 760px) 90vw, 560px" />
          </div>
        </motion.div>
        <span className={styles.editorialIndex}>01 / THE ARCHITECT</span>

        <div className={styles.stageCaption}><span>IDEAS → INTERFACES → INFRASTRUCTURE</span><button type="button" onClick={() => { setPaused(!paused); reset(); }} aria-pressed={paused} aria-label={paused ? "Resume hero animation" : "Pause hero animation"}>{paused ? <Play size={12} /> : <Pause size={12} />}{paused ? "Resume" : "Pause"}</button></div>
      </motion.div>
    </div>
    <motion.div className={styles.project} {...reveal}>
      <div className={styles.projectCopy}><span className={styles.eyebrow}>FLAGSHIP CASE STUDY / 001</span><h2>Client Forge <ArrowUpRight size={26} /></h2><p>A production-grade multi-tenant SaaS engineering case study and working platform demonstrating complex domain modeling, RBAC, and operational workflows.</p><div style={{display:'flex',gap:'1rem',alignItems:'center',flexWrap:'wrap'}}><Link href="/workspace">Explore Workspace <ArrowUpRight size={15} /></Link><a href="https://github.com/dibyasarothidibya-lang/ClientForge" target="_blank" rel="noopener noreferrer" style={{fontSize:'0.8125rem',opacity:0.8,display:'inline-flex',alignItems:'center',gap:'0.25rem'}}>View Repository <ArrowUpRight size={13} /></a></div></div>
      <Link href="/workspace" className={styles.productPreview} aria-label="Open the Client Forge workspace"><div className={styles.previewTop}><span><Layers size={14} /> Client Forge</span><span>WORKSPACE PREVIEW</span></div><div className={styles.previewBody}><div className={styles.previewSidebar}><span /><span /><span /><span /></div><div className={styles.previewMain}><div className={styles.previewHeading}>From scattered workflows.<br /><strong>To one clear workspace.</strong></div><div className={styles.previewMetrics}>{["People", "Operations", "Pipeline"].map((v,i)=><div key={v}><span>{v}</span><div className={styles.metricLine} style={{animationDelay:`${i * -2}s`}} /></div>)}</div><div className={styles.chart}>{[30,45,37,62,52,76,67,88,80,95,87,100].map((v,i)=><span key={i} style={{height:`${v}%`,animationDelay:`${i * -0.25}s`}} />)}</div></div></div><div className={styles.previewBottom}>PRODUCT DESIGN + SYSTEMS ENGINEERING <ArrowUpRight size={15} /></div></Link>
    </motion.div>
    <div className={styles.stack}><span>ENGINEERED WITH</span><div>{stack.map(item=><span key={item}>{item}</span>)}</div><a href="#recruitment-pipeline" aria-label="Explore platform capabilities"><ArrowDown size={16} /></a></div>
  </div>;
}
