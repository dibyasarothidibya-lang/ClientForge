"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Code2, Layers, MessageCircle, Pause, Play } from "lucide-react";
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
        <div className={styles.socials}><a href="https://github.com/dibyasarothidibya-lang" target="_blank" rel="noopener noreferrer"><Code2 size={15} /> GitHub</a><a href="https://x.com/Dibyasarothi" target="_blank" rel="noopener noreferrer">𝕏 / X</a><a href="https://www.facebook.com/dibya.simanta101" target="_blank" rel="noopener noreferrer">Facebook</a><a href="https://wa.me/8801704909232" target="_blank" rel="noopener noreferrer"><MessageCircle size={15} /> WhatsApp</a></div>
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
