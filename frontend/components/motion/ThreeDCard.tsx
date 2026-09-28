"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glareColor?: string;
  glareOpacity?: number;
  scaleHover?: number;
  elevationZ?: number;
}

export function ThreeDCard({
  children,
  className = "",
  maxTilt = 8,
  glareColor = "#38bdf8",
  glareOpacity = 0.12,
  scaleHover = 1.015,
  elevationZ = 20,
}: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.2 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothMouseX, [0, 1], [-maxTilt, maxTilt]);
  const scale = useSpring(isHovered ? scaleHover : 1, springConfig);
  const translateZ = useSpring(isHovered ? elevationZ : 0, springConfig);

  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    mouseX.set(x);
    mouseY.set(y);
    setGlarePos({ x: x * 100, y: y * 100 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className={`relative ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          translateZ,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative"
      >
        {/* Specular 3D Light Glint */}
        <div
          aria-hidden="true"
          style={{
            opacity: isHovered ? glareOpacity : 0,
            background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, ${glareColor} 0%, transparent 75%)`,
            transition: "opacity 300ms ease",
          }}
          className="absolute inset-0 pointer-events-none rounded-[inherit] z-30 mix-blend-screen"
        />

        {/* Card Content with 3D Depth */}
        <div className="relative z-10 w-full h-full">{children}</div>
      </motion.div>
    </div>
  );
}

export default ThreeDCard;
