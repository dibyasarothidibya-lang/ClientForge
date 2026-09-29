"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ShieldCheck, Globe2, Zap } from "lucide-react";

export default function HeroHeadline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Relaxing spring physics configuration (silky smooth, physical, zero jitter)
  const springConfig = { stiffness: 80, damping: 25, mass: 0.6 };

  // Scroll transforms for the overall Hero container
  const heroYRaw = useTransform(scrollY, [0, 480], [0, -45]);
  const heroOpacityRaw = useTransform(scrollY, [0, 420], [1, 0.15]);
  const heroScaleRaw = useTransform(scrollY, [0, 480], [1, 0.98]);

  // Multi-plane parallax depths: headline moves slightly faster than subtext
  const headlineYRaw = useTransform(scrollY, [0, 480], [0, -20]);
  const subtextYRaw = useTransform(scrollY, [0, 480], [0, -12]);
  const ctaYRaw = useTransform(scrollY, [0, 480], [0, -6]);

  // Smoothed motion values
  const heroY = useSpring(heroYRaw, springConfig);
  const heroOpacity = useSpring(heroOpacityRaw, springConfig);
  const heroScale = useSpring(heroScaleRaw, springConfig);

  const headlineY = useSpring(headlineYRaw, springConfig);
  const subtextY = useSpring(subtextYRaw, springConfig);
  const ctaY = useSpring(ctaYRaw, springConfig);

  return (
    <motion.div 
      ref={containerRef}
      style={{
        y: heroY,
        opacity: heroOpacity,
        scale: heroScale,
      }}
      className="relative text-center max-w-4xl mx-auto flex flex-col items-center pt-2 sm:pt-6 will-change-transform"
    >

      
      {/* Enterprise Editorial Headline in Cormorant Garamond */}
      <motion.h1
        style={{ y: headlineY }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-slate-950 dark:text-[#fbfbfa] leading-[1.03] max-w-5xl mx-auto mb-6"
      >
        The Intelligence Engine for <br className="hidden sm:inline" />
        <span className="font-serif italic font-normal text-indigo-600 dark:text-indigo-400">
          Global Workforce & Strategic Pipeline
        </span>.
      </motion.h1>

      {/* Refined Subtext */}
      <motion.p
        style={{ y: subtextY }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-base sm:text-lg text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-9 font-normal font-sans"
      >
        Client Forge connects candidate talent intelligence, cross-border payroll across 140+ countries, and autonomous workforce telemetry into a single, cohesive operating system.
      </motion.p>

      {/* Button & Action Hierarchy */}
      <motion.div
        style={{ y: ctaY }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
      >
        {/* Primary CTA */}
        <motion.a
          href="/workspace"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-white bg-slate-950 hover:bg-slate-800 dark:text-slate-950 dark:bg-white dark:hover:bg-neutral-100 rounded-xl transition-all shadow-md group cursor-pointer font-sans"
        >
          <span>Open HR Workspace</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </motion.a>

        {/* Secondary / Ghost Button */}
        <motion.a
          href="/peoplecore"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold border border-slate-200/90 bg-white/80 hover:bg-slate-50 text-slate-800 dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] dark:text-neutral-200 rounded-xl transition-all shadow-xs backdrop-blur-md cursor-pointer font-sans"
        >
          <span>Explore PeopleCore Platform</span>
        </motion.a>
      </motion.div>

      {/* Enterprise Trust Indicators (Calm, Quiet, Zero Green Pills) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.45 }}
        className="flex flex-wrap items-center justify-center gap-4 sm:gap-7 mt-10 text-xs text-slate-500 dark:text-neutral-400 font-sans font-medium"
      >
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400 dark:text-neutral-500" />
          <span>SOC-2 Type II Certified</span>
        </div>
        <span className="hidden sm:inline text-slate-300 dark:text-neutral-700">•</span>
        <div className="flex items-center gap-1.5">
          <Globe2 className="w-3.5 h-3.5 text-slate-400 dark:text-neutral-500" />
          <span>140+ Sovereign Jurisdictions</span>
        </div>
        <span className="hidden sm:inline text-slate-300 dark:text-neutral-700">•</span>
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-slate-400 dark:text-neutral-500" />
          <span>Instant Multi-Currency Clearing</span>
        </div>
      </motion.div>

    </motion.div>
  );
}
