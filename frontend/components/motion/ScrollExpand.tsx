"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface ScrollExpandProps {
  alt?: string;
  enabled?: boolean;
  endRadius?: number;
  holdDistance?: number;
  mediaZoom?: number;
  overlayScrim?: number;
  scrollDistance?: number;
  scrollHint?: string;
  smoothing?: number;
  src: string;
  startHeight?: number;
  startRadius?: number;
  startWidth?: number;
  title?: string;
  useWindowScroll?: boolean;
  children?: React.ReactNode;
}

export default function ScrollExpand({
  alt = "Showcase",
  enabled = true,
  endRadius = 12,
  holdDistance = 0.35,
  mediaZoom = 1.2,
  overlayScrim = 0.35,
  scrollDistance = 1.2,
  scrollHint = "Scroll to expand ecosystem",
  smoothing = 0.1,
  src,
  startHeight = 65,
  startRadius = 24,
  startWidth = 65,
  title,
  useWindowScroll = true,
  children,
}: ScrollExpandProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    let targetProgress = 0;
    let currentProgress = 0;
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far into view the element is
      const totalDist = windowHeight * scrollDistance;
      const offsetTop = rect.top;
      
      // Calculate progress between 0 and 1
      const rawProgress = (windowHeight - offsetTop) / totalDist;
      targetProgress = Math.min(Math.max(rawProgress, 0), 1);
    };

    const updateLoop = () => {
      currentProgress += (targetProgress - currentProgress) * (smoothing || 0.1);
      setProgress(currentProgress);
      animationFrameId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    animationFrameId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled, scrollDistance, smoothing]);

  // Interpolated values
  const currentWidth = startWidth + (100 - startWidth) * progress;
  const currentHeight = startHeight + (88 - startHeight) * progress;
  const currentRadius = startRadius - (startRadius - endRadius) * progress;
  const currentZoom = 1 + (mediaZoom - 1) * progress;
  const currentScrim = overlayScrim * (0.6 + 0.4 * progress);
  const hintOpacity = Math.max(0, 1 - progress * 2.5);
  const textScale = 0.94 + 0.06 * progress;
  const textOpacity = 0.5 + 0.5 * progress;
  const textY = (1 - progress) * 18;

  return (
    <div 
      ref={containerRef} 
      className="relative w-full py-8 flex flex-col items-center justify-center overflow-hidden transition-colors"
    >
      {/* Expanding Container */}
      <div
        style={{
          width: `${currentWidth}%`,
          height: `${currentHeight}vh`,
          borderRadius: `${currentRadius}px`,
          willChange: "width, height, border-radius",
        }}
        className="relative overflow-hidden shadow-2xl border border-slate-200/80 dark:border-zinc-800 transition-[box-shadow] duration-300"
      >
        {/* Unfolding Image */}
        <img
          src={src}
          alt={alt}
          style={{
            transform: `scale(${currentZoom})`,
            willChange: "transform",
          }}
          className="w-full h-full object-cover transition-transform duration-75 ease-out"
        />

        {/* Dynamic Dark Scrim Overlay */}
        <div
          style={{
            backgroundColor: `rgba(9, 9, 11, ${currentScrim})`,
          }}
          className="absolute inset-0 transition-colors pointer-events-none"
        />

        {/* Centered Children Content with Relaxing Scroll Animation */}
        <div 
          style={{
            transform: `translateY(${textY}px) scale(${textScale})`,
            opacity: textOpacity,
            transition: "transform 140ms ease-out, opacity 140ms ease-out",
          }}
          className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10"
        >
          {children}
        </div>

        {/* Scroll Hint */}
        {scrollHint && hintOpacity > 0.05 && (
          <div
            style={{ opacity: hintOpacity }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white text-xs font-mono tracking-wider transition-opacity pointer-events-none"
          >
            <span>{scrollHint}</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </div>
        )}
      </div>
    </div>
  );
}
