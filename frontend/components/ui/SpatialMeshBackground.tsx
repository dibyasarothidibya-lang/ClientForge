"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

/**
 * SpatialMeshBackground provides an immersive 3D spatial depth canvas
 * (twinkling starfield dust & dynamic constellation links with mouse parallax)
 * strictly WITHOUT any 3D geometric polyhedral objects or sculptures.
 */
export function SpatialMeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isDestroyed = false;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const checkIsDark = () => {
      if (typeof document !== "undefined") {
        return (
          document.documentElement.classList.contains("dark") ||
          resolvedTheme === "dark"
        );
      }
      return true;
    };

    let isDark = checkIsDark();

    // Responsive particle count based on screen size
    const PARTICLE_COUNT = Math.min(180, Math.floor((width * height) / 11000));
    
    interface Particle {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      radius: number;
      baseAlpha: number;
      twinkleSpeed: number;
      twinkleOffset: number;
    }

    const particles: Particle[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 800 + 100, // depth from 100 to 900
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        vz: (Math.random() - 0.5) * 0.15,
        radius: Math.random() * 1.5 + 0.6,
        baseAlpha: Math.random() * 0.45 + 0.35,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    // Interactive mouse parallax state
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / width - 0.5) * 40;
      targetMouseY = (e.clientY / height - 0.5) * 40;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);

    // Watch theme changes
    const observer = new MutationObserver(() => {
      isDark = checkIsDark();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    let frame = 0;

    const render = () => {
      if (isDestroyed) return;
      animId = requestAnimationFrame(render);
      frame++;

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse parallax interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      const particleColor = isDark
        ? "rgba(56, 189, 248, " // Sky / Cyan
        : "rgba(30, 64, 175, "; // Indigo

      const linkColor = isDark
        ? "rgba(129, 140, 248, " // Indigo neon
        : "rgba(99, 102, 241, "; // Soft indigo

      // Draw dynamic constellation links between nearby particles
      const MAX_LINK_DIST = 95;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        // Depth scale
        const depthFactor = 600 / p1.z;
        const p1x = p1.x + currentMouseX * depthFactor;
        const p1y = p1.y + currentMouseY * depthFactor;

        for (let j = i + 1; j < Math.min(i + 7, particles.length); j++) {
          const p2 = particles[j];
          const p2DepthFactor = 600 / p2.z;
          const p2x = p2.x + currentMouseX * p2DepthFactor;
          const p2y = p2.y + currentMouseY * p2DepthFactor;

          const dx = p1x - p2x;
          const dy = p1y - p2y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_LINK_DIST) {
            const alpha = (1 - dist / MAX_LINK_DIST) * (isDark ? 0.16 : 0.09);
            ctx.beginPath();
            ctx.moveTo(p1x, p1y);
            ctx.lineTo(p2x, p2y);
            ctx.strokeStyle = `${linkColor}${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Wrap around screen boundaries
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
        if (p.z < 100) p.z = 900;
        if (p.z > 900) p.z = 100;

        const depthFactor = 600 / p.z;
        const screenX = p.x + currentMouseX * depthFactor;
        const screenY = p.y + currentMouseY * depthFactor;
        const displayRadius = p.radius * depthFactor;

        const twinkle = Math.sin(frame * p.twinkleSpeed + p.twinkleOffset) * 0.3 + 0.7;
        const alpha = Math.min(1, Math.max(0.1, p.baseAlpha * twinkle * (isDark ? 0.85 : 0.55)));

        ctx.beginPath();
        ctx.arc(screenX, screenY, displayRadius, 0, Math.PI * 2);
        ctx.fillStyle = `${particleColor}${alpha})`;
        ctx.fill();
      }
    };

    render();

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
}

export default SpatialMeshBackground;
