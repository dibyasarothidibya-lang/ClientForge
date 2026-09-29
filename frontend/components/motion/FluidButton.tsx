"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface FluidButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glass" | "danger";
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  disabled?: boolean;
  glowColor?: string;
  magnetic?: boolean;
}

export default function FluidButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  href,
  icon,
  iconRight,
  disabled = false,
  glowColor,
  magnetic = true,
}: FluidButtonProps) {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coords relative to button for radial glow & magnetic pull
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for magnetic translation
  const springConfig = { stiffness: 450, damping: 24, mass: 0.1 };
  const smoothX = useSpring(useTransform(mouseX, [-50, 50], magnetic ? [-4, 4] : [0, 0]), springConfig);
  const smoothY = useSpring(useTransform(mouseY, [-50, 50], magnetic ? [-4, 4] : [0, 0]), springConfig);

  // Local radial glow coordinates (0% to 100%)
  const [radialPos, setRadialPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!btnRef.current || disabled) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Centered offset for magnetic pull
    mouseX.set(x - rect.width / 2);
    mouseY.set(y - rect.height / 2);

    // Percentage for radial gradient
    setRadialPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    if (!disabled) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Base sizing classes
  const sizeClasses = {
    xs: "px-2.5 py-1 text-[11px] rounded-lg gap-1.5",
    sm: "px-3 py-1.5 text-xs rounded-xl gap-2",
    md: "px-4 py-2 text-xs sm:text-sm rounded-xl gap-2",
    lg: "px-5 py-2.5 text-sm sm:text-base rounded-2xl gap-2.5",
  };

  // Variant color definitions
  const variantStyles = {
    primary:
      "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20 border border-indigo-500/40 hover:border-indigo-400",
    secondary:
      "bg-slate-100 hover:bg-slate-200/90 dark:bg-white/[0.08] dark:hover:bg-white/[0.14] text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 shadow-xs",
    outline:
      "bg-transparent hover:bg-slate-100 dark:hover:bg-white/[0.06] text-slate-700 dark:text-neutral-300 border border-slate-300 dark:border-white/15 hover:border-slate-400 dark:hover:border-white/30",
    ghost:
      "bg-transparent hover:bg-slate-100/80 dark:hover:bg-white/[0.05] text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white",
    glass:
      "bg-white/70 dark:bg-black/40 backdrop-blur-md border border-white/40 dark:border-white/10 text-slate-900 dark:text-white shadow-xs hover:border-indigo-400/50",
    danger:
      "bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 hover:border-red-500/50 shadow-xs",
  };

  const defaultGlowColors = {
    primary: "rgba(255, 255, 255, 0.28)",
    secondary: "rgba(99, 102, 241, 0.22)",
    outline: "rgba(99, 102, 241, 0.18)",
    ghost: "rgba(255, 255, 255, 0.12)",
    glass: "rgba(99, 102, 241, 0.25)",
    danger: "rgba(239, 68, 68, 0.25)",
  };

  const activeGlow = glowColor || defaultGlowColors[variant];

  const content = (
    <motion.span
      style={{ x: smoothX, y: smoothY }}
      className="relative z-10 flex items-center justify-center font-medium select-none pointer-events-none"
    >
      {icon && <span className="shrink-0 transition-transform duration-200 group-hover:scale-110">{icon}</span>}
      <span>{children}</span>
      {iconRight && <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">{iconRight}</span>}
    </motion.span>
  );

  const sharedClasses = `relative inline-flex items-center justify-center font-sans overflow-hidden transition-all duration-200 select-none cursor-pointer group ${
    sizeClasses[size]
  } ${variantStyles[variant]} ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        ref={btnRef as React.Ref<HTMLAnchorElement>}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={sharedClasses}
      >
        {/* Radial cursor-following liquid glow */}
        {isHovered && !disabled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              background: `radial-gradient(circle 80px at ${radialPos.x}% ${radialPos.y}%, ${activeGlow}, transparent 100%)`,
            }}
            className="absolute inset-0 pointer-events-none z-0"
          />
        )}
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      ref={btnRef as React.Ref<HTMLButtonElement>}
      type="button"
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={sharedClasses}
    >
      {/* Radial cursor-following liquid glow */}
      {isHovered && !disabled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            background: `radial-gradient(circle 80px at ${radialPos.x}% ${radialPos.y}%, ${activeGlow}, transparent 100%)`,
          }}
          className="absolute inset-0 pointer-events-none z-0"
        />
      )}
      {content}
    </motion.button>
  );
}
