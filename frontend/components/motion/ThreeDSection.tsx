"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ThreeDSectionProps {
  children: React.ReactNode;
  className?: string;
  depthIntensity?: number;
}

export function ThreeDSection({
  children,
  className = "",
  depthIntensity = 1,
}: ThreeDSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate gentle 3D spatial rotation as the section enters & departs the viewport
  const rawRotateX = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [3.5 * depthIntensity, 0, 0, -3.5 * depthIntensity]
  );
  const rawTranslateZ = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [-40 * depthIntensity, 0, 0, -40 * depthIntensity]
  );
  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.85, 1, 1, 0.9]
  );

  // Apply spring physics for ultra-smooth fluidity
  const rotateX = useSpring(rawRotateX, { stiffness: 120, damping: 25, mass: 0.2 });
  const translateZ = useSpring(rawTranslateZ, { stiffness: 120, damping: 25, mass: 0.2 });

  return (
    <div
      ref={ref}
      style={{ perspective: 1200 }}
      className={`relative z-10 w-full ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          translateZ,
          opacity: rawOpacity,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default ThreeDSection;
