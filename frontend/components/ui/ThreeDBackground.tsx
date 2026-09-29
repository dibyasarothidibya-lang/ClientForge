"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

interface SculptureItem {
  group: THREE.Group;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  baseY: number;
  posZ: number;
  side: "left" | "right";
  floatSpeed: number;
  floatAmp: number;
  wireMat: THREE.MeshBasicMaterial;
  faceMat: THREE.MeshBasicMaterial;
  pointMat: THREE.PointsMaterial;
  darkColor: number;
  lightColor: number;
}

export function ThreeDBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    let animId: number;
    let isDestroyed = false;

    const container = containerRef.current;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Helper: Determine dark mode status reliably from DOM and theme
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

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();

    // Gentle linear fog placed far back so it never dims background shapes
    const updateFog = (dark: boolean) => {
      scene.fog = new THREE.Fog(dark ? 0x080808 : 0xf8fafc, 1500, 4500);
    };
    updateFog(isDark);

    const camera = new THREE.PerspectiveCamera(56, width / height, 1, 4000);
    camera.position.set(0, 0, 480);

    const renderer = new THREE.WebGLRenderer({
      powerPreference: "high-performance",
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0); // Transparent canvas
    container.appendChild(renderer.domElement);

    // 2. Restrained Architectural Palette Definitions (Calm, Quiet, Editorial)
    const PALETTE = {
      dark: {
        cyan: 0x475569,   // Muted slate
        indigo: 0x6366f1, // Muted refined brand indigo
        violet: 0x334155, // Deep slate
        teal: 0x475569,   // Architectural slate
        rose: 0x334155,   // Dark slate
        amber: 0x64748b,  // Neutral slate
        wireOpacity: 0.16, // Ultra-quiet wireframe
        faceOpacity: 0.012, // Whispered depth
        pointOpacity: 0.22, // Subtle nodes
        particleOpacity: 0.22, // Faint ambient dust
        lineOpacity: 0.08, // Hairline connection
      },
      light: {
        cyan: 0x94a3b8,
        indigo: 0x6366f1,
        violet: 0x94a3b8,
        teal: 0x94a3b8,
        rose: 0x94a3b8,
        amber: 0x94a3b8,
        wireOpacity: 0.14,
        faceOpacity: 0.01,
        pointOpacity: 0.18,
        particleOpacity: 0.18,
        lineOpacity: 0.06,
      },
    };

    // 3. 3D Particle Cloud / Starfield (Restrained, subtle ambient stardust)
    const PARTICLE_COUNT = 65;
    const particlePositions = new Float32Array(PARTICLE_COUNT * 3);
    const particleVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Keep central text column clear of dense particles
      const radius = 320 + Math.random() * 460;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 3400;
      const z = (Math.random() - 0.5) * 550;

      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.12,
        y: (Math.random() - 0.5) * 0.12,
        z: (Math.random() - 0.5) * 0.10,
      });
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const pCanvas = document.createElement("canvas");
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext("2d");
    if (pCtx) {
      const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, "rgba(255,255,255,0.9)");
      grad.addColorStop(0.35, "rgba(255,255,255,0.6)");
      grad.addColorStop(0.7, "rgba(255,255,255,0.15)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(pCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: isDark ? 2.6 : 2.0,
      map: particleTexture,
      transparent: true,
      opacity: isDark ? PALETTE.dark.particleOpacity : PALETTE.light.particleOpacity,
      color: isDark ? 0xcbd5e1 : 0x64748b,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 4. Dynamic Proximity Lines between Nodes (Subtle Hairlines)
    const MAX_CONNECTIONS = 90;
    const linePositions = new Float32Array(MAX_CONNECTIONS * 6);
    const lineColors = new Float32Array(MAX_CONNECTIONS * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: isDark ? PALETTE.dark.lineOpacity : PALETTE.light.lineOpacity,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // 5. 14 High-Variety 3D Sculptures with Wireframe + Translucent Glass Faces + Glowing Vertices
    const sculptures: SculptureItem[] = [];

    const createSculpture = (
      geometry: THREE.BufferGeometry,
      darkColor: number,
      lightColor: number,
      side: "left" | "right",
      baseY: number,
      posZ = -100,
      rotSpeeds: [number, number, number] = [0.3, 0.35, 0.2],
      floatAmp = 0.38,
      floatSpeed = 1.0
    ) => {
      const group = new THREE.Group();

      // Layer 1: High-contrast geometric wireframe
      const wireMat = new THREE.MeshBasicMaterial({
        color: isDark ? darkColor : lightColor,
        wireframe: true,
        transparent: true,
        opacity: isDark ? PALETTE.dark.wireOpacity : PALETTE.light.wireOpacity,
        blending: THREE.NormalBlending,
        depthWrite: false,
      });
      const wireMesh = new THREE.Mesh(geometry, wireMat);
      group.add(wireMesh);

      // Layer 2: Subtle translucent holographic glass facet fill
      const faceMat = new THREE.MeshBasicMaterial({
        color: isDark ? darkColor : lightColor,
        transparent: true,
        opacity: isDark ? PALETTE.dark.faceOpacity : PALETTE.light.faceOpacity,
        side: THREE.DoubleSide,
        blending: THREE.NormalBlending,
        depthWrite: false,
      });
      const faceMesh = new THREE.Mesh(geometry, faceMat);
      group.add(faceMesh);

      // Layer 3: Subtle vertex points at corners
      const pointMat = new THREE.PointsMaterial({
        size: isDark ? 2.2 : 1.8,
        color: isDark ? 0xe2e8f0 : lightColor,
        transparent: true,
        opacity: isDark ? PALETTE.dark.pointOpacity : PALETTE.light.pointOpacity,
        blending: THREE.NormalBlending,
        depthWrite: false,
      });
      const pointMesh = new THREE.Points(geometry, pointMat);
      group.add(pointMesh);

      // Initial dummy position, will be dynamically positioned into outer gutters
      const initialX = side === "right" ? 440 : -440;
      group.position.set(initialX, baseY, posZ);
      scene.add(group);

      sculptures.push({
        group,
        rotSpeedX: rotSpeeds[0],
        rotSpeedY: rotSpeeds[1],
        rotSpeedZ: rotSpeeds[2],
        baseY,
        posZ,
        side,
        floatAmp,
        floatSpeed,
        wireMat,
        faceMat,
        pointMat,
        darkColor,
        lightColor,
      });
    };

    // -------------------------------------------------------------
    // SECTION A: Hero & Top Landing (y = +300 to +160)
    // -------------------------------------------------------------

    // 1. Quinquefoil Torus Knot (2,5) - Outer Right
    createSculpture(
      new THREE.TorusKnotGeometry(40, 7.5, 128, 16, 2, 5),
      PALETTE.dark.cyan,
      PALETTE.light.cyan,
      "right",
      300,
      -100,
      [0.35, 0.45, 0.15],
      0.45,
      1.1
    );

    // 2. Stellated Dodecahedron with Crystal Facets - Outer Left
    createSculpture(
      new THREE.DodecahedronGeometry(42, 0),
      PALETTE.dark.violet,
      PALETTE.light.violet,
      "left",
      160,
      -90,
      [-0.3, 0.4, 0.2],
      0.4,
      0.95
    );

    // -------------------------------------------------------------
    // SECTION B: Core Modules & Workflows (y = -40 to -260)
    // -------------------------------------------------------------

    // 3. Triple Concentric Cyber Gyroscope / Orbital Gimbal - Outer Right
    {
      const group = new THREE.Group();
      const geomA = new THREE.TorusGeometry(48, 1.2, 16, 64);
      const geomB = new THREE.TorusGeometry(36, 1.2, 16, 64);
      const geomC = new THREE.TorusGeometry(24, 1.2, 16, 64);

      const wireMat = new THREE.MeshBasicMaterial({
        color: isDark ? PALETTE.dark.teal : PALETTE.light.teal,
        wireframe: true,
        transparent: true,
        opacity: isDark ? PALETTE.dark.wireOpacity : PALETTE.light.wireOpacity,
        blending: THREE.NormalBlending,
        depthWrite: false,
      });
      const faceMat = new THREE.MeshBasicMaterial({
        color: isDark ? PALETTE.dark.teal : PALETTE.light.teal,
        transparent: true,
        opacity: isDark ? PALETTE.dark.faceOpacity : PALETTE.light.faceOpacity,
        side: THREE.DoubleSide,
        blending: THREE.NormalBlending,
        depthWrite: false,
      });
      const pointMat = new THREE.PointsMaterial({
        size: isDark ? 4.0 : 3.0,
        color: isDark ? 0xffffff : PALETTE.light.teal,
        transparent: true,
        opacity: isDark ? PALETTE.dark.pointOpacity : PALETTE.light.pointOpacity,
        blending: THREE.NormalBlending,
        depthWrite: false,
      });

      const ringA = new THREE.Mesh(geomA, wireMat);
      const ringB = new THREE.Mesh(geomB, wireMat);
      ringB.rotation.x = Math.PI / 3;
      const ringC = new THREE.Mesh(geomC, wireMat);
      ringC.rotation.y = Math.PI / 3;

      group.add(ringA);
      group.add(ringB);
      group.add(ringC);
      group.add(new THREE.Points(geomA, pointMat));

      group.position.set(440, -40, -95);
      scene.add(group);

      sculptures.push({
        group,
        rotSpeedX: 0.35,
        rotSpeedY: 0.45,
        rotSpeedZ: 0.2,
        baseY: -40,
        posZ: -95,
        side: "right",
        floatAmp: 0.45,
        floatSpeed: 1.15,
        wireMat,
        faceMat,
        pointMat,
        darkColor: PALETTE.dark.teal,
        lightColor: PALETTE.light.teal,
      });
    }

    // 4. Truncated Octahedron / Archimedean Solid - Outer Left
    createSculpture(
      new THREE.OctahedronGeometry(45, 1),
      PALETTE.dark.indigo,
      PALETTE.light.indigo,
      "left",
      -260,
      -100,
      [0.3, -0.4, 0.2],
      0.38,
      1.05
    );

    // -------------------------------------------------------------
    // SECTION C: Global Workforce & Mobility (y = -480 to -680)
    // -------------------------------------------------------------

    // 5. Geodesic Fullerene / Buckyball Hex Sphere - Outer Right
    createSculpture(
      new THREE.IcosahedronGeometry(44, 2),
      PALETTE.dark.cyan,
      PALETTE.light.cyan,
      "right",
      -480,
      -110,
      [0.2, 0.35, 0.15],
      0.36,
      0.95
    );

    // 6. Trefoil Infinity Ribbon Knot (2,3) - Outer Left
    createSculpture(
      new THREE.TorusKnotGeometry(36, 8.5, 96, 16, 2, 3),
      PALETTE.dark.violet,
      PALETTE.light.violet,
      "left",
      -680,
      -95,
      [-0.35, 0.3, 0.2],
      0.45,
      1.15
    );

    // -------------------------------------------------------------
    // SECTION D: People Ops Rail & Bento Grid (y = -920 to -1140)
    // -------------------------------------------------------------

    // 7. Double Helix / DNA Spiral Cylinder - Outer Right
    createSculpture(
      new THREE.CylinderGeometry(30, 30, 85, 16, 12, true),
      PALETTE.dark.teal,
      PALETTE.light.teal,
      "right",
      -920,
      -105,
      [0.45, 0.25, 0.2],
      0.42,
      1.0
    );

    // 8. Cyber Hourglass / Hyperboloid Ruled Mesh - Outer Left
    createSculpture(
      new THREE.CylinderGeometry(20, 46, 80, 18, 8, true),
      PALETTE.dark.cyan,
      PALETTE.light.cyan,
      "left",
      -1140,
      -90,
      [0.25, -0.4, 0.3],
      0.38,
      1.1
    );

    // -------------------------------------------------------------
    // SECTION E: ROI Calculator & Metrics (y = -1380 to -1600)
    // -------------------------------------------------------------

    // 9. Stellated Kepler-Poinsot Star Polyhedron - Outer Right
    createSculpture(
      new THREE.IcosahedronGeometry(46, 1),
      PALETTE.dark.amber,
      PALETTE.light.amber,
      "right",
      -1380,
      -100,
      [0.35, 0.35, -0.2],
      0.42,
      0.95
    );

    // 10. Möbius Ribbon Twist Loop - Outer Left
    createSculpture(
      new THREE.TorusKnotGeometry(36, 6.0, 96, 16, 1, 2),
      PALETTE.dark.indigo,
      PALETTE.light.indigo,
      "left",
      -1600,
      -105,
      [-0.3, 0.4, 0.15],
      0.38,
      1.05
    );

    // -------------------------------------------------------------
    // SECTION F: Testimonials & Pricing (y = -1840 to -2060)
    // -------------------------------------------------------------

    // 11. Quad-Ring Celestial Armillary Sphere - Outer Right
    {
      const group = new THREE.Group();
      const geomRing = new THREE.TorusGeometry(48, 1.2, 16, 64);
      const geomCore = new THREE.OctahedronGeometry(22, 0);

      const wireMat = new THREE.MeshBasicMaterial({
        color: isDark ? PALETTE.dark.cyan : PALETTE.light.cyan,
        wireframe: true,
        transparent: true,
        opacity: isDark ? PALETTE.dark.wireOpacity : PALETTE.light.wireOpacity,
        blending: THREE.NormalBlending,
        depthWrite: false,
      });
      const faceMat = new THREE.MeshBasicMaterial({
        color: isDark ? PALETTE.dark.cyan : PALETTE.light.cyan,
        transparent: true,
        opacity: isDark ? PALETTE.dark.faceOpacity : PALETTE.light.faceOpacity,
        side: THREE.DoubleSide,
        blending: THREE.NormalBlending,
        depthWrite: false,
      });
      const pointMat = new THREE.PointsMaterial({
        size: isDark ? 4.2 : 3.2,
        color: isDark ? 0xffffff : PALETTE.light.cyan,
        transparent: true,
        opacity: isDark ? PALETTE.dark.pointOpacity : PALETTE.light.pointOpacity,
        blending: THREE.NormalBlending,
        depthWrite: false,
      });

      const ring1 = new THREE.Mesh(geomRing, wireMat);
      const ring2 = new THREE.Mesh(geomRing, wireMat);
      ring2.rotation.x = Math.PI / 2;
      const ring3 = new THREE.Mesh(geomRing, wireMat);
      ring3.rotation.y = Math.PI / 4;
      const core = new THREE.Mesh(geomCore, wireMat);

      group.add(ring1);
      group.add(ring2);
      group.add(ring3);
      group.add(core);
      group.add(new THREE.Points(geomCore, pointMat));

      group.position.set(440, -1840, -100);
      scene.add(group);

      sculptures.push({
        group,
        rotSpeedX: 0.3,
        rotSpeedY: 0.4,
        rotSpeedZ: 0.25,
        baseY: -1840,
        posZ: -100,
        side: "right",
        floatAmp: 0.45,
        floatSpeed: 1.2,
        wireMat,
        faceMat,
        pointMat,
        darkColor: PALETTE.dark.cyan,
        lightColor: PALETTE.light.cyan,
      });
    }

    // 12. Grand Septafoil Torus Knot (3,7) - Outer Left
    createSculpture(
      new THREE.TorusKnotGeometry(38, 6.8, 128, 16, 3, 7),
      PALETTE.dark.violet,
      PALETTE.light.violet,
      "left",
      -2060,
      -105,
      [0.35, -0.3, 0.2],
      0.42,
      1.1
    );

    // -------------------------------------------------------------
    // SECTION G: FAQ, CTA Banner & Footer (y = -2280 to -2500)
    // -------------------------------------------------------------

    // 13. Crystalline Hexagonal Bipyramid Diamond - Outer Right
    createSculpture(
      new THREE.OctahedronGeometry(48, 0),
      PALETTE.dark.rose,
      PALETTE.light.rose,
      "right",
      -2280,
      -100,
      [0.3, 0.35, 0.2],
      0.38,
      1.0
    );

    // 14. Dual Concentric Undulating Wave Rings - Outer Left
    {
      const group = new THREE.Group();
      const geomRingA = new THREE.TorusGeometry(48, 1.3, 16, 64);
      const geomRingB = new THREE.TorusGeometry(34, 1.3, 16, 64);

      const wireMat = new THREE.MeshBasicMaterial({
        color: isDark ? PALETTE.dark.indigo : PALETTE.light.indigo,
        wireframe: true,
        transparent: true,
        opacity: isDark ? PALETTE.dark.wireOpacity : PALETTE.light.wireOpacity,
        blending: THREE.NormalBlending,
        depthWrite: false,
      });
      const faceMat = new THREE.MeshBasicMaterial({
        color: isDark ? PALETTE.dark.indigo : PALETTE.light.indigo,
        transparent: true,
        opacity: isDark ? PALETTE.dark.faceOpacity : PALETTE.light.faceOpacity,
        side: THREE.DoubleSide,
        blending: THREE.NormalBlending,
        depthWrite: false,
      });
      const pointMat = new THREE.PointsMaterial({
        size: isDark ? 4.2 : 3.0,
        color: isDark ? 0xffffff : PALETTE.light.indigo,
        transparent: true,
        opacity: isDark ? PALETTE.dark.pointOpacity : PALETTE.light.pointOpacity,
        blending: THREE.NormalBlending,
        depthWrite: false,
      });

      const ringA = new THREE.Mesh(geomRingA, wireMat);
      const ringB = new THREE.Mesh(geomRingB, wireMat);
      ringB.rotation.x = Math.PI / 4;

      group.add(ringA);
      group.add(ringB);
      group.add(new THREE.Points(geomRingA, pointMat));

      group.position.set(-440, -2500, -105);
      scene.add(group);

      sculptures.push({
        group,
        rotSpeedX: 0.25,
        rotSpeedY: -0.35,
        rotSpeedZ: 0.2,
        baseY: -2500,
        posZ: -105,
        side: "left",
        floatAmp: 0.42,
        floatSpeed: 1.1,
        wireMat,
        faceMat,
        pointMat,
        darkColor: PALETTE.dark.indigo,
        lightColor: PALETTE.light.indigo,
      });
    }

    // Dynamic Responsive Outer Gutter Positioning & Text Clearance Engine
    const updateSculpturePositions = () => {
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;

      // On viewports narrower than 1140px (tablets & phones), hide 3D sculptures so text is never crowded
      const isDesktopWithGutters = currentWidth >= 1140;

      const vFovRad = (camera.fov * Math.PI) / 180;
      const visibleHalfHeight = Math.tan(vFovRad / 2) * 580; // depth ~580
      const visibleHalfWidth = visibleHalfHeight * (currentWidth / currentHeight);

      // Centered content column boundary (max-w-5xl = 1024px, max-w-4xl = 896px)
      // textHalfWidth is where the centered content column ends in Three.js coordinates
      const textHalfWidth = (Math.min(1060, currentWidth) / currentWidth) * visibleHalfWidth;

      // Outer side gutter spans from textHalfWidth to visibleHalfWidth.
      // Place the sculpture centered in this outer gutter, safely separated from text
      const gutterCenter = (textHalfWidth + visibleHalfWidth) * 0.52;
      const safeX = Math.max(textHalfWidth + 75, Math.min(visibleHalfWidth - 55, gutterCenter));

      // Scale down gently if gutter is narrower on medium-large screens (1140px-1380px)
      const gutterWidth = visibleHalfWidth - textHalfWidth;
      const scale = Math.min(1.0, Math.max(0.65, gutterWidth / 200));

      sculptures.forEach((item) => {
        item.group.visible = isDesktopWithGutters;
        if (isDesktopWithGutters) {
          item.group.position.x = item.side === "right" ? safeX : -safeX;
          item.group.scale.set(scale, scale, scale);
        }
      });
    };

    // Run initial alignment
    updateSculpturePositions();

    // 6. Dynamic Theme Swapper Function (Smooth live transition between light & dark)
    const applyThemePalette = (dark: boolean) => {
      isDark = dark;
      updateFog(dark);

      // Update Particles
      particleMaterial.color.setHex(dark ? PALETTE.dark.cyan : PALETTE.light.cyan);
      particleMaterial.opacity = dark ? PALETTE.dark.particleOpacity : PALETTE.light.particleOpacity;
      particleMaterial.needsUpdate = true;

      // Update Constellation Lines
      lineMaterial.opacity = dark ? PALETTE.dark.lineOpacity : PALETTE.light.lineOpacity;
      lineMaterial.needsUpdate = true;

      // Update All 14 Sculptures
      sculptures.forEach((item) => {
        const colorHex = dark ? item.darkColor : item.lightColor;
        item.wireMat.color.setHex(colorHex);
        item.wireMat.opacity = dark ? PALETTE.dark.wireOpacity : PALETTE.light.wireOpacity;
        item.wireMat.needsUpdate = true;

        item.faceMat.color.setHex(colorHex);
        item.faceMat.opacity = dark ? PALETTE.dark.faceOpacity : PALETTE.light.faceOpacity;
        item.faceMat.needsUpdate = true;

        item.pointMat.color.setHex(dark ? 0xffffff : item.lightColor);
        item.pointMat.opacity = dark ? PALETTE.dark.pointOpacity : PALETTE.light.pointOpacity;
        item.pointMat.needsUpdate = true;
      });
    };

    // MutationObserver to immediately catch next-themes class changes on <html>
    const observer = new MutationObserver(() => {
      const currentDark = checkIsDark();
      if (currentDark !== isDark) {
        applyThemePalette(currentDark);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // 7. Interactive Mouse & Scroll Parallax State
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    let targetScrollY = 0;
    let currentScrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Gentle, restrained parallax travel that keeps sculptures safely in side margins
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 20;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 25;
    };

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollRatio = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      targetScrollY = -scrollRatio * 2500;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      updateSculpturePositions();
    };
    window.addEventListener("resize", handleResize);

    // Initial sync
    handleScroll();

    // 8. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      if (isDestroyed) return;
      animId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth Camera & Parallax Interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.055;
      currentMouseY += (targetMouseY - currentMouseY) * 0.055;
      currentScrollY += (targetScrollY - currentScrollY) * 0.065;

      camera.position.x = currentMouseX;
      camera.position.y = currentScrollY - currentMouseY * 0.45;
      camera.lookAt(currentMouseX * 0.25, camera.position.y, 0);

      // Rotate and Animate All 14 Sculptures
      sculptures.forEach((item) => {
        item.group.rotation.x += item.rotSpeedX * delta;
        item.group.rotation.y += item.rotSpeedY * delta;
        item.group.rotation.z += item.rotSpeedZ * delta;
        item.group.position.y = item.baseY + Math.sin(elapsedTime * item.floatSpeed) * (item.floatAmp * 25);
      });

      // Update Particle Cloud Drift & Wrap
      const positions = particleGeometry.attributes.position.array as Float32Array;
      const linePos = lineGeometry.attributes.position.array as Float32Array;
      const lineCol = lineGeometry.attributes.color.array as Float32Array;

      let connectionCount = 0;
      const DIST_THRESHOLD = 85;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        positions[i * 3] += particleVelocities[i].x;
        positions[i * 3 + 1] += particleVelocities[i].y;
        positions[i * 3 + 2] += particleVelocities[i].z;

        if (positions[i * 3] > 650) positions[i * 3] = -650;
        if (positions[i * 3] < -650) positions[i * 3] = 650;
        if (positions[i * 3 + 1] > 600) positions[i * 3 + 1] = -2700;
        if (positions[i * 3 + 1] < -2700) positions[i * 3 + 1] = 600;

        if (connectionCount < MAX_CONNECTIONS) {
          for (let j = i + 1; j < Math.min(i + 12, PARTICLE_COUNT); j++) {
            const dx = positions[i * 3] - positions[j * 3];
            const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
            const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < DIST_THRESHOLD && connectionCount < MAX_CONNECTIONS) {
              const idx = connectionCount * 6;

              linePos[idx] = positions[i * 3];
              linePos[idx + 1] = positions[i * 3 + 1];
              linePos[idx + 2] = positions[i * 3 + 2];

              linePos[idx + 3] = positions[j * 3];
              linePos[idx + 4] = positions[j * 3 + 1];
              linePos[idx + 5] = positions[j * 3 + 2];

              lineCol[idx] = isDark ? 0.22 : 0.05;
              lineCol[idx + 1] = isDark ? 0.74 : 0.52;
              lineCol[idx + 2] = isDark ? 0.97 : 0.78;

              lineCol[idx + 3] = isDark ? 0.51 : 0.39;
              lineCol[idx + 4] = isDark ? 0.55 : 0.45;
              lineCol[idx + 5] = isDark ? 0.97 : 0.95;

              connectionCount++;
            }
          }
        }
      }

      particleGeometry.attributes.position.needsUpdate = true;
      lineGeometry.setDrawRange(0, connectionCount * 2);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();

      sculptures.forEach((item) => {
        item.group.traverse((child) => {
          if (child instanceof THREE.Mesh || child instanceof THREE.Points) {
            child.geometry.dispose();
          }
        });
        item.wireMat.dispose();
        item.faceMat.dispose();
        item.pointMat.dispose();
      });
    };
  }, [resolvedTheme]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
}

export default ThreeDBackground;
