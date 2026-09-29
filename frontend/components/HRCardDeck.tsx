"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

export interface HRCardData {
  category: string;
  title: string;
  src: string;
  targetSection: string;
  ctaText: string;
  description: string;
}

const hrSolutionsData: HRCardData[] = [
  {
    category: "Talent Acquisition",
    title: "Autonomous pipeline matching & skill scoring",
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    targetSection: "/talent-intelligence",
    ctaText: "Explore Sourcing Engine",
    description: "Screen candidates against 40+ engineering and product competencies in seconds without recruiter bias."
  },
  {
    category: "Global Payroll & EOR",
    title: "Multi-currency payroll across 140+ countries",
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    targetSection: "/global-mobility",
    ctaText: "Check Country Coverage",
    description: "Automate statutory filings, localized health benefits, and tax compliance with one monthly invoice."
  },
  {
    category: "Employee Engagement",
    title: "Real-time sentiment telemetry & pulse alerts",
    src: "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=1200&q=80",
    targetSection: "/people-operations",
    ctaText: "View Sentiment Model",
    description: "Detect burnout signals and team misalignment across active Slack and collaboration workspaces."
  },
  {
    category: "Automated Onboarding",
    title: "Day-one equipment, IAM access, and compliance",
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    targetSection: "/onboarding/peoplecore",
    ctaText: "Preview Workflow Engine",
    description: "Zero-touch provisioning: contracts signed, laptop shipped, and role-based permissions granted automatically."
  },
  {
    category: "Performance Calibration",
    title: "Continuous feedback cycles & 360 reviews",
    src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    targetSection: "/workspace/performance",
    ctaText: "Audit Calibration Tool",
    description: "Objective manager reviews backed by sprint deliverables, key peer inputs, and impact milestones."
  },
  {
    category: "Security & Compliance",
    title: "Global audit trails, GDPR & SOC-2 compliance",
    src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
    targetSection: "/security",
    ctaText: "Inspect SOC-2 Protocols",
    description: "End-to-end encryption, localized data residency across EU/APAC, and real-time audit logging."
  }
];

export function HRCardDeck() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  // Triple set for seamless continuous infinite looping
  const loopedCards = [...hrSolutionsData, ...hrSolutionsData, ...hrSolutionsData];

  // Auto-roaming scroll animation loop
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let reqId: number;
    const speed = 0.85; // smooth continuous drift speed

    const step = () => {
      if (!isPaused && !isDraggingRef.current && el) {
        el.scrollLeft += speed;

        // Infinite loop threshold: when scrolled 1 full set of cards, wrap around
        const singleSetWidth = el.scrollWidth / 3;
        if (el.scrollLeft >= singleSetWidth * 2) {
          el.scrollLeft -= singleSetWidth;
        } else if (el.scrollLeft <= 5) {
          el.scrollLeft += singleSetWidth;
        }
      }
      reqId = requestAnimationFrame(step);
    };

    reqId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(reqId);
  }, [isPaused]);

  // Initial scroll offset into the middle set of cards
  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      const singleSetWidth = el.scrollWidth / 3;
      el.scrollLeft = singleSetWidth * 0.25;
    }
  }, []);

  // Pointer drag gestures (mouse + touch)
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;

    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
    setIsPaused(true);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!isDraggingRef.current || !el) return;

    e.preventDefault();
    hasMovedRef.current = true;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    el.scrollLeft = scrollLeftRef.current - walk;

    // Handle seamless wrap during manual drag
    const singleSetWidth = el.scrollWidth / 3;
    if (el.scrollLeft >= singleSetWidth * 2) {
      el.scrollLeft -= singleSetWidth;
      scrollLeftRef.current -= singleSetWidth;
    } else if (el.scrollLeft <= 5) {
      el.scrollLeft += singleSetWidth;
      scrollLeftRef.current += singleSetWidth;
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    isDraggingRef.current = false;
    setIsPaused(false);
  }, []);

  return (
    <section className="w-full py-20 bg-slate-50/20 dark:bg-[#080808]/20 border-t border-slate-200/70 dark:border-neutral-900 transition-colors overflow-hidden relative z-10">
      
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-6 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-indigo-600 dark:text-indigo-400">
            Workforce Architecture
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-slate-900 dark:text-white mt-1.5 leading-[1.06]">
            Engineered for Modern People Operations.
          </h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-neutral-400 max-w-sm leading-relaxed">
          Drag horizontally or hover to inspect modules. Click any card action to jump into specific workflow deep dives.
        </p>
      </div>

      {/* Auto-Roaming & Draggable Card Rail (Zero External Arrows) */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          if (!isDraggingRef.current) setIsPaused(false);
        }}
        className="flex gap-6 overflow-x-auto scrollbar-none px-6 md:px-12 py-4 cursor-grab active:cursor-grabbing select-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {loopedCards.map((card, idx) => (
          <div
            key={`${card.category}-${idx}`}
            className="group relative flex-shrink-0 w-[300px] sm:w-[360px] md:w-[420px] h-[500px] rounded-3xl overflow-hidden border border-slate-200/80 dark:border-neutral-800 bg-neutral-900 shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:[transform:perspective(1000px)_rotateX(2.5deg)_rotateY(-2.5deg)_translateZ(12px)] [transform-style:preserve-3d]"
          >
            {/* Specular 3D Holographic Light Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/0 via-white/5 to-sky-300/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 mix-blend-overlay" />

            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0">
              <Image
                src={card.src}
                alt={card.title}
                fill
                sizes="(max-width: 768px) 300px, 420px"
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                priority={idx < 3}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

            {/* Top Category Badge */}
            <div className="absolute top-6 left-6 z-10 pointer-events-none">
              <span className="px-3 py-1 rounded-full text-xs font-medium text-white/95 bg-white/20 dark:bg-black/40 backdrop-blur-md border border-white/25 dark:border-white/10 shadow-xs">
                {card.category}
              </span>
            </div>

            {/* Bottom Content & Embedded Action Button */}
            <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col justify-end">
              <h3 className="font-serif text-2xl md:text-3xl font-normal text-white leading-snug">
                {card.title}
              </h3>
              <p className="mt-2 text-xs md:text-sm text-neutral-300 line-clamp-2 leading-relaxed">
                {card.description}
              </p>

              {/* Embedded Section Deep-Link Button */}
              <Link
                href={card.targetSection}
                onClick={(e) => {
                  e.stopPropagation();
                  // If dragging occurred, prevent navigation
                  if (hasMovedRef.current) {
                    e.preventDefault();
                  }
                }}
                className="mt-5 inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-white/95 hover:bg-white text-neutral-900 text-xs md:text-sm font-semibold transition-all duration-200 shadow-sm active:scale-[0.98] group/btn cursor-pointer"
              >
                <span>{card.ctaText}</span>
                <span className="text-neutral-500 group-hover/btn:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Named alias for backward compatibility
export const AppleCardsCarouselDemo = HRCardDeck;
export default HRCardDeck;
