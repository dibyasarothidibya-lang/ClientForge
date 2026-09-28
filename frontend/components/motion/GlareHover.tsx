"use client";

import React, { useRef, useState } from "react";

interface GlareHoverProps {
  className?: string;
  glareAngle?: number;
  glareColor?: string;
  glareOpacity?: number;
  glareSize?: number;
  playOnce?: boolean;
  transitionDuration?: number;
  children?: React.ReactNode;
}

export default function GlareHover({
  className = "",
  glareAngle = -30,
  glareColor = "#ffffff",
  glareOpacity = 0.15,
  glareSize = 280,
  playOnce = false,
  transitionDuration = 800,
  children,
}: GlareHoverProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glarePosition, setGlarePosition] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });
  const [tilt, setTilt] = useState<{ rotateX: number; rotateY: number }>({
    rotateX: 0,
    rotateY: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    // Subtle 3D tilt
    const rotateX = ((y / rect.height) - 0.5) * -12;
    const rotateY = ((x / rect.width) - 0.5) * 12;

    setGlarePosition({
      x: xPercent,
      y: yPercent,
      opacity: glareOpacity,
    });
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: `transform ${transitionDuration}ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease`,
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Glare Sheen Spotlight Overlay */}
      <div
        style={{
          opacity: glarePosition.opacity,
          background: `radial-gradient(circle ${glareSize}px at ${glarePosition.x}% ${glarePosition.y}%, ${glareColor} 0%, transparent 80%)`,
          transform: `rotate(${glareAngle}deg)`,
          transition: "opacity 300ms ease",
        }}
        className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay"
      />

      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
