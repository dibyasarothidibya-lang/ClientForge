"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function HeroHeadline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Relaxing spring physics configuration (silky smooth, physical, zero jitter)
  const springConfig = { stiffness: 80, damping: 25, mass: 0.6 };

  // Scroll transforms for the overall Hero container
  const heroYRaw = useTransform(scrollY, [0, 480], [0, -65]);
  const heroOpacityRaw = useTransform(scrollY, [0, 380], [1, 0.08]);
  const heroScaleRaw = useTransform(scrollY, [0, 480], [1, 0.96]);

  // Multi-plane parallax depths: headline moves slightly faster than subtext
  const headlineYRaw = useTransform(scrollY, [0, 480], [0, -25]);
  const subtextYRaw = useTransform(scrollY, [0, 480], [0, -15]);
  const ctaYRaw = useTransform(scrollY, [0, 480], [0, -8]);

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
      className="relative text-center max-w-4xl mx-auto flex flex-col items-center pt-4 sm:pt-8 will-change-transform"
    >
      
      {/* Enterprise Editorial Headline in Cormorant Garamond */}
      <motion.h1
        style={{ y: headlineY }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-slate-950 dark:text-white leading-[1.04] max-w-5xl mx-auto mb-6"
      >
        Transform Workplace Culture Into Your{" "}
        <span className="font-serif italic bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-600 dark:from-indigo-400 dark:via-purple-300 dark:to-sky-400 bg-clip-text text-transparent animate-serene-gradient">
          Greatest Advantage
        </span>
        .
      </motion.h1>

      {/* Refined Subtext */}
      <motion.p
        style={{ y: subtextY }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-8 font-normal"
      >
        Automate talent pipelines, streamline cross-border onboarding, and uncover deep employee engagement insights—orchestrated by intelligent, context-aware workforce agents.
      </motion.p>

      {/* Button & Action Hierarchy */}
      <motion.div
        style={{ y: ctaY }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto"
      >
        {/* Primary CTA */}
        <motion.a
          href="/signup"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center justify-center px-7 py-3 text-sm font-semibold text-white bg-slate-950 hover:bg-slate-800 dark:text-slate-950 dark:bg-white dark:hover:bg-zinc-100 rounded-xl transition-all shadow-md shadow-slate-900/10 dark:shadow-none group cursor-pointer"
        >
          <span>Get Started Free</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </motion.a>

        {/* Secondary / Ghost Button */}
        <motion.a
          href="/#recruitment-pipeline"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center justify-center px-7 py-3 text-sm font-semibold border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-800 dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:bg-zinc-800 dark:text-zinc-200 rounded-xl transition-all shadow-xs backdrop-blur-md cursor-pointer"
        >
          <span>Explore Platform System</span>
        </motion.a>
      </motion.div>

      {/* Enterprise Trust Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.45 }}
        className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-10 text-xs text-slate-500 dark:text-zinc-400"
      >
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
          <span>SOC-2 Type II Certified</span>
        </div>
        <span className="hidden sm:inline text-slate-300 dark:text-zinc-700">•</span>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>14-Day Free Evaluation</span>
        </div>
        <span className="hidden sm:inline text-slate-300 dark:text-zinc-700">•</span>
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Zero Setup Overhead</span>
        </div>
      </motion.div>

    </motion.div>
  );
}
