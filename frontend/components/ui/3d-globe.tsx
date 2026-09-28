"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import * as THREE from "three";
import { ZoomIn, ZoomOut, Play, Pause, RotateCcw } from "lucide-react";

export type GlobeMarker = {
  lat: number;
  lng: number;
  src: string;
  label: string;
  region?: string;
  country?: string;
  hires?: number;
  currency?: string;
  compliance?: string;
  avgPayout?: string;
};

export interface Globe3DConfig {
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereIntensity?: number;
  bumpScale?: number;
  autoRotateSpeed?: number;
  textureVariant?: "atmos" | "blue-marble" | "dark";
  [key: string]: any;
}

export interface Globe3DProps {
  atmosphereColor?: string;
  atmosphereIntensity?: number;
  autoRotateSpeed?: number;
  bumpScale?: number;
  config?: Globe3DConfig;
  markers?: GlobeMarker[];
  selectedMarker?: GlobeMarker | null;
  targetFocus?: { lat: number; lng: number } | null;
  autoRotateEnabled?: boolean;
  onMarkerClick?: (marker: GlobeMarker) => void;
  onMarkerHover?: (marker: GlobeMarker | null) => void;
  className?: string;
}

// Convert geographic coordinates (latitude, longitude) to 3D Cartesian coordinates
export function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Arcs connecting international talent hubs
const CONNECTION_PAIRS: [number, number][] = [
  // Americas
  [0, 1],   // New York <-> Toronto
  [0, 2],   // New York <-> Mexico City
  [2, 3],   // Mexico City <-> Bogotá
  [3, 4],   // Bogotá <-> Rio
  [4, 5],   // Rio <-> Buenos Aires
  // Transatlantic & Africa
  [0, 10],  // New York <-> London
  [10, 6],  // London <-> Lagos
  [6, 7],   // Lagos <-> Nairobi
  [6, 8],   // Lagos <-> Cape Town
  [7, 9],   // Nairobi <-> Cairo
  [9, 25],  // Cairo <-> Dubai
  // Europe
  [10, 11], // London <-> Paris
  [10, 15], // London <-> Amsterdam
  [11, 12], // Paris <-> Berlin
  [12, 19], // Berlin <-> Warsaw
  [15, 18], // Amsterdam <-> Brussels
  [11, 16], // Paris <-> Zurich
  [16, 17], // Zurich <-> Rome
  [12, 13], // Berlin <-> Stockholm
  [13, 14], // Stockholm <-> Oslo
  // Asia-Pacific & Middle East
  [10, 25], // London <-> Dubai
  [25, 23], // Dubai <-> New Delhi
  [23, 26], // New Delhi <-> Singapore
  [26, 20], // Singapore <-> Tokyo
  [20, 27], // Tokyo <-> Seoul
  [20, 24], // Tokyo <-> Shanghai
  [26, 21], // Singapore <-> Sydney
  [21, 22], // Sydney <-> Auckland
];

export function Globe3D({
  atmosphereColor = "#38bdf8",
  atmosphereIntensity = 0.35,
  autoRotateSpeed = 18,
  bumpScale = 8,
  config,
  markers = [],
  selectedMarker,
  targetFocus,
  autoRotateEnabled = true,
  onMarkerClick,
  onMarkerHover,
  className = "",
}: Globe3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredMarker, setHoveredMarker] = useState<GlobeMarker | null>(null);
  const [markerScreenPositions, setMarkerScreenPositions] = useState<
    Array<{ x: number; y: number; visible: boolean; marker: GlobeMarker; opacity: number }>
  >([]);
  const [isRotating, setIsRotating] = useState(autoRotateEnabled);

  // References for external control callbacks
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const targetRotationRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0.22, y: -0.9, active: false });

  // Resolve config / props
  const resolvedAtmosphereColor = config?.atmosphereColor ?? atmosphereColor;
  const rawIntensity = config?.atmosphereIntensity ?? atmosphereIntensity;
  const resolvedAtmosphereIntensity = rawIntensity > 1 ? rawIntensity / 50 : rawIntensity;
  const resolvedBumpScale = config?.bumpScale ?? bumpScale;
  const resolvedAutoRotateSpeed = config?.autoRotateSpeed ?? autoRotateSpeed;
  const showAtmosphere = config?.showAtmosphere ?? false;
  const textureVariant = config?.textureVariant ?? "atmos";

  const globeRadius = 2.2;

  // Compute 3D positions for markers on sphere
  const marker3DPositions = useMemo(() => {
    return markers.map((m) => ({
      marker: m,
      pos: latLngToVector3(m.lat, m.lng, globeRadius),
    }));
  }, [markers, globeRadius]);

  // Handle Target Focus programmatic smooth rotation
  useEffect(() => {
    if (!targetFocus || !globeGroupRef.current) return;
    const { lat, lng } = targetFocus;
    // Calculate Euler angles to place target lat/lng directly in front of camera
    const phi = (lat * Math.PI) / 180;
    const theta = ((lng + 180) * Math.PI) / 180;
    
    targetRotationRef.current = {
      x: Math.max(-0.9, Math.min(0.9, phi * 0.7)),
      y: -theta + Math.PI / 2,
      active: true,
    };
  }, [targetFocus]);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    let width = container.clientWidth || 800;
    let height = container.clientHeight || 800;

    // --- Scene, Camera & WebGL Renderer ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5.6);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- Globe Master Group ---
    const globeGroup = new THREE.Group();
    globeGroup.rotation.x = 0.22;
    globeGroup.rotation.y = -0.9;
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    // --- High-Contrast Illuminated Map Graphics ---
    const textureLoader = new THREE.TextureLoader();
    
    // Choose illuminated continental map graphics (atmos-2048 or blue-marble for vivid continents)
    const mapPath = textureVariant === "dark" 
      ? "/textures/earth-dark.jpg" 
      : textureVariant === "blue-marble" 
        ? "/textures/earth-blue-marble.jpg" 
        : "/textures/earth-atmos-2048.jpg";

    const earthMap = textureLoader.load(mapPath, () => {
      renderer.render(scene, camera);
    });
    const bumpMap = textureLoader.load("/textures/earth-topology.png", () => {
      renderer.render(scene, camera);
    });
    const specularMap = textureLoader.load("/textures/earth-water.png", () => {
      renderer.render(scene, camera);
    });

    [earthMap, bumpMap, specularMap].forEach((tex) => {
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.colorSpace = THREE.SRGBColorSpace;
    });

    // --- Base Globe Sphere Material with Vivid Map Graphics & Topography ---
    const sphereGeo = new THREE.SphereGeometry(globeRadius, 96, 96);
    const sphereMat = new THREE.MeshPhongMaterial({
      map: earthMap,
      bumpMap: bumpMap,
      bumpScale: (resolvedBumpScale / 8) * 0.42, // sculptural relief of mountain ranges and coasts
      specularMap: specularMap,
      specular: new THREE.Color(0x38bdf8), // cyan ocean reflection
      shininess: 24,
      emissive: new THREE.Color(0x0a101f), // radiant navy base to prevent dark shadow collapse
      emissiveIntensity: 0.45,
    });
    const globeMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(globeMesh);

    // --- Latitude & Longitude Coordinate Overlay Grid Lines ---
    const gridMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.16,
    });

    const createRing = (radius: number, yPos: number) => {
      const segments = 64;
      const points: THREE.Vector3[] = [];
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, yPos, Math.sin(theta) * radius));
      }
      const geom = new THREE.BufferGeometry().setFromPoints(points);
      return new THREE.Line(geom, gridMat);
    };

    globeGroup.add(createRing(globeRadius * 1.002, 0)); // Equator
    globeGroup.add(createRing(globeRadius * 0.88, globeRadius * 0.46)); // Tropic of Cancer
    globeGroup.add(createRing(globeRadius * 0.88, -globeRadius * 0.46)); // Tropic of Capricorn

    // 8 Longitude Meridians
    for (let m = 0; m < 8; m++) {
      const meridianPoints: THREE.Vector3[] = [];
      const angle = (m / 8) * Math.PI;
      const segments = 48;
      for (let s = 0; s <= segments; s++) {
        const phi = (s / segments) * Math.PI;
        const x = globeRadius * 1.001 * Math.sin(phi) * Math.cos(angle);
        const y = globeRadius * 1.001 * Math.cos(phi);
        const z = globeRadius * 1.001 * Math.sin(phi) * Math.sin(angle);
        meridianPoints.push(new THREE.Vector3(x, y, z));
      }
      const mGeom = new THREE.BufferGeometry().setFromPoints(meridianPoints);
      globeGroup.add(new THREE.Line(mGeom, gridMat));
    }

    // --- 3D Surface Beacons Under Every City Marker ---
    const beaconGroup = new THREE.Group();
    globeGroup.add(beaconGroup);

    marker3DPositions.forEach(({ pos }) => {
      const ringGeo = new THREE.RingGeometry(0.02, 0.05, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      
      // Position ring slightly above sphere surface and orient outward along normal
      ringMesh.position.copy(pos).multiplyScalar(1.004);
      ringMesh.lookAt(new THREE.Vector3(0, 0, 0));
      beaconGroup.add(ringMesh);
    });

    // --- Atmospheric Outer Glow Shell ---
    let atmosphereMesh: THREE.Mesh | null = null;
    if (showAtmosphere) {
      const atmoGeo = new THREE.SphereGeometry(globeRadius * 1.14, 64, 64);
      const atmoMat = new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          uniform vec3 color;
          uniform float intensity;
          void main() {
            float rim = 1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0);
            float alpha = pow(rim, 2.5) * intensity;
            gl_FragColor = vec4(color, alpha);
          }
        `,
        uniforms: {
          color: { value: new THREE.Color(resolvedAtmosphereColor) },
          intensity: { value: resolvedAtmosphereIntensity * 2.2 },
        },
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
      });
      atmosphereMesh = new THREE.Mesh(atmoGeo, atmoMat);
      scene.add(atmosphereMesh);
    }

    // --- 3D Flight & Data Arcs Between International Hubs ---
    const arcGroup = new THREE.Group();
    globeGroup.add(arcGroup);

    const arcCurves: THREE.QuadraticBezierCurve3[] = [];

    if (markers.length >= 2) {
      CONNECTION_PAIRS.forEach(([startIdx, endIdx]) => {
        if (markers[startIdx] && markers[endIdx]) {
          const startV = latLngToVector3(markers[startIdx].lat, markers[startIdx].lng, globeRadius);
          const endV = latLngToVector3(markers[endIdx].lat, markers[endIdx].lng, globeRadius);

          const midV = new THREE.Vector3().addVectors(startV, endV).multiplyScalar(0.5);
          const dist = startV.distanceTo(endV);
          const altitude = globeRadius + Math.min(dist * 0.42, 1.05);
          midV.normalize().multiplyScalar(altitude);

          const curve = new THREE.QuadraticBezierCurve3(startV, midV, endV);
          arcCurves.push(curve);

          const curvePoints = curve.getPoints(44);
          const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
          const curveMat = new THREE.LineBasicMaterial({
            color: 0x38bdf8,
            transparent: true,
            opacity: 0.45,
          });
          const arcLine = new THREE.Line(curveGeo, curveMat);
          arcGroup.add(arcLine);
        }
      });
    }

    // --- Animated Comets/Pulses Moving Along Arcs ---
    const cometCount = arcCurves.length;
    const cometMeshes: THREE.Mesh[] = [];
    const cometGeo = new THREE.SphereGeometry(0.024, 12, 12);
    const cometMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
    });

    for (let c = 0; c < cometCount; c++) {
      const comet = new THREE.Mesh(cometGeo, cometMat);
      arcGroup.add(comet);
      cometMeshes.push(comet);
    }

    // --- Multi-Directional Bright Illumination (Vibrant Continental Visibility) ---
    // High ambient fill light prevents continents from becoming dark shadows
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    scene.add(ambientLight);

    // Key Sun Light from upper right
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.6);
    dirLight1.position.set(6, 4, 6);
    scene.add(dirLight1);

    // Cyan Atmospheric Rim Fill from left
    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 1.6);
    dirLight2.position.set(-6, -2, -4);
    scene.add(dirLight2);

    // Warm Accent Rim from bottom
    const dirLight3 = new THREE.DirectionalLight(0x818cf8, 1.2);
    dirLight3.position.set(0, -6, 2);
    scene.add(dirLight3);

    // --- Interactive Rotation, Drag & Wheel Zoom ---
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let velocity = { x: 0, y: 0 };
    const damping = 0.92;
    const rotationSpeed = (resolvedAutoRotateSpeed / 1000) * 0.012;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      targetRotationRef.current.active = false;
      prevMousePos = { x: e.clientX, y: e.clientY };
      velocity = { x: 0, y: 0 };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      globeGroup.rotation.y += deltaX * 0.005;
      globeGroup.rotation.x += deltaY * 0.005;
      globeGroup.rotation.x = Math.max(-1.1, Math.min(1.1, globeGroup.rotation.x));

      velocity = { x: deltaX * 0.005, y: deltaY * 0.005 };
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    // Mouse Wheel Zoom
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.003;
      camera.position.z = Math.max(3.8, Math.min(7.5, camera.position.z + zoomDelta));
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // --- Responsive Resize ---
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 800;
      height = container.clientHeight || 800;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // --- Animation & Marker Projection Loop ---
    let animId: number;
    const tempVec = new THREE.Vector3();
    let cometProgress = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth Programmatic Camera/Rotation Focus (when user clicks a region)
      if (targetRotationRef.current.active) {
        const tr = targetRotationRef.current;
        globeGroup.rotation.x += (tr.x - globeGroup.rotation.x) * 0.08;
        
        // Normalize rotation angle wrapping
        let diffY = tr.y - globeGroup.rotation.y;
        while (diffY > Math.PI) diffY -= Math.PI * 2;
        while (diffY < -Math.PI) diffY += Math.PI * 2;
        globeGroup.rotation.y += diffY * 0.08;

        if (Math.abs(diffY) < 0.005 && Math.abs(tr.x - globeGroup.rotation.x) < 0.005) {
          targetRotationRef.current.active = false;
        }
      } else if (isDragging) {
        // Dragged manually
      } else {
        // Momentum Inertia
        if (Math.abs(velocity.x) > 0.0001 || Math.abs(velocity.y) > 0.0001) {
          globeGroup.rotation.y += velocity.x;
          globeGroup.rotation.x += velocity.y;
          globeGroup.rotation.x = Math.max(-1.1, Math.min(1.1, globeGroup.rotation.x));
          velocity.x *= damping;
          velocity.y *= damping;
        } else if (isRotating) {
          // Gentle auto-rotation
          globeGroup.rotation.y += rotationSpeed;
        }
      }

      // Animate comets along arcs
      cometProgress = (cometProgress + 0.008) % 1.0;
      cometMeshes.forEach((mesh, idx) => {
        if (arcCurves[idx]) {
          const t = (cometProgress + idx / cometCount) % 1.0;
          const pos = arcCurves[idx].getPoint(t);
          mesh.position.copy(pos);
        }
      });

      // Project 3D positions to 2D screen coordinates
      const projected = marker3DPositions.map(({ marker, pos }) => {
        tempVec.copy(pos).applyMatrix4(globeGroup.matrixWorld);

        const normal = tempVec.clone().normalize();
        const dot = normal.dot(camera.position.clone().normalize());

        const visible = dot > 0.15;
        const opacity = Math.max(0, Math.min(1, (dot - 0.15) / 0.35));

        tempVec.project(camera);

        const screenX = (tempVec.x * 0.5 + 0.5) * width;
        const screenY = (-(tempVec.y * 0.5) + 0.5) * height;

        return {
          x: screenX,
          y: screenY,
          visible,
          opacity,
          marker,
        };
      });

      // Dynamic Anti-Collision Relaxation Pass:
      // Spreads out pins (especially in dense regions like Europe) so they never overlap on screen!
      const MIN_PIN_DISTANCE = 46;
      for (let iter = 0; iter < 4; iter++) {
        for (let i = 0; i < projected.length; i++) {
          if (!projected[i].visible || projected[i].opacity < 0.25) continue;
          for (let j = i + 1; j < projected.length; j++) {
            if (!projected[j].visible || projected[j].opacity < 0.25) continue;
            const dx = projected[j].x - projected[i].x;
            const dy = projected[j].y - projected[i].y;
            const dist = Math.hypot(dx, dy);
            if (dist < MIN_PIN_DISTANCE && dist > 0.001) {
              const push = (MIN_PIN_DISTANCE - dist) * 0.45;
              const nx = (dx / dist) * push;
              const ny = (dy / dist) * push;
              projected[i].x -= nx;
              projected[i].y -= ny;
              projected[j].x += nx;
              projected[j].y += ny;
            }
          }
        }
      }

      setMarkerScreenPositions(projected);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("wheel", onWheel);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      resizeObserver.disconnect();
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      earthMap.dispose();
      bumpMap.dispose();
      specularMap.dispose();
      cometGeo.dispose();
      cometMat.dispose();
    };
  }, [
    globeRadius,
    resolvedAtmosphereColor,
    resolvedAtmosphereIntensity,
    resolvedBumpScale,
    resolvedAutoRotateSpeed,
    showAtmosphere,
    textureVariant,
    marker3DPositions,
    markers,
    isRotating,
  ]);

  // Zoom In HUD Action
  const handleZoomIn = useCallback(() => {
    if (cameraRef.current) {
      cameraRef.current.position.z = Math.max(3.8, cameraRef.current.position.z - 0.6);
    }
  }, []);

  // Zoom Out HUD Action
  const handleZoomOut = useCallback(() => {
    if (cameraRef.current) {
      cameraRef.current.position.z = Math.min(7.5, cameraRef.current.position.z + 0.6);
    }
  }, []);

  // Reset Camera View
  const handleReset = useCallback(() => {
    if (cameraRef.current && globeGroupRef.current) {
      cameraRef.current.position.set(0, 0, 5.6);
      targetRotationRef.current = { x: 0.22, y: -0.9, active: true };
    }
  }, []);

  const handlePinClick = useCallback(
    (marker: GlobeMarker, e: React.MouseEvent) => {
      e.stopPropagation();
      onMarkerClick?.(marker);
    },
    [onMarkerClick]
  );

  const handlePinMouseEnter = useCallback(
    (marker: GlobeMarker) => {
      setHoveredMarker(marker);
      onMarkerHover?.(marker);
    },
    [onMarkerHover]
  );

  const handlePinMouseLeave = useCallback(() => {
    setHoveredMarker(null);
    onMarkerHover?.(null);
  }, [onMarkerHover]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center select-none ${className}`}
      style={{ touchAction: "pan-y" }}
    >
      {/* Background Radial Atmosphere Glow (Disabled when atmosphere is turned off) */}
      {showAtmosphere && (
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] rounded-full bg-radial from-sky-500/20 via-indigo-500/10 to-transparent blur-[100px] pointer-events-none"
        />
      )}

      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-grab active:cursor-grabbing pointer-events-auto"
        style={{ touchAction: "pan-y" }}
      />

      {/* Interactive HUD Controls (Zoom In/Out, Auto-Rotate, Reset) */}
      <div className="absolute bottom-6 right-6 z-30 flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/80 dark:bg-zinc-900/80 backdrop-blur-md border border-slate-700/60 dark:border-zinc-700/60 shadow-xl pointer-events-auto">
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <div className="w-[1px] h-4 bg-slate-700 dark:bg-zinc-700" />
        <button
          onClick={() => setIsRotating((prev) => !prev)}
          title={isRotating ? "Pause Auto-Rotation" : "Resume Auto-Rotation"}
          className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          {isRotating ? <Pause className="w-4 h-4 text-sky-400" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          onClick={handleReset}
          title="Reset Orientation"
          className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* 2D Projected Talent Pins with Dynamic Badges */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {markerScreenPositions.map(({ x, y, visible, opacity, marker }) => {
          if (!visible && opacity <= 0.05) return null;
          const isHovered = hoveredMarker?.label === marker.label;
          const isSelected = selectedMarker?.label === marker.label;

          return (
            <div
              key={marker.label}
              style={{
                transform: `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`,
                opacity,
                transition: "opacity 160ms ease-out",
                zIndex: isSelected ? 50 : isHovered ? 40 : 20,
              }}
              className="absolute pointer-events-auto cursor-pointer group flex flex-col items-center"
              onClick={(e) => handlePinClick(marker, e)}
              onMouseEnter={() => handlePinMouseEnter(marker)}
              onMouseLeave={handlePinMouseLeave}
            >
              {/* Outer Pulse Ping Ring */}
              <span className="absolute -inset-1 rounded-full bg-sky-400/50 animate-ping opacity-60 pointer-events-none" />

              {/* Pin Base & Avatar Bubble */}
              <div
                className={`relative flex items-center justify-center rounded-full border transition-all duration-200 shadow-xl ${
                  isSelected
                    ? "w-9 h-9 border-sky-400 ring-4 ring-sky-500/50 scale-110 z-40 bg-slate-950"
                    : isHovered
                    ? "w-8.5 h-8.5 border-sky-400 ring-4 ring-sky-500/40 scale-105 z-30 bg-slate-900"
                    : "w-7 h-7 sm:w-7.5 sm:h-7.5 border-white/80 dark:border-zinc-700 bg-slate-900 hover:scale-105 z-20"
                }`}
              >
                <img
                  src={marker.src}
                  alt={marker.label}
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>

              {/* ALWAYS-VISIBLE Country Name Label Badge */}
              <div
                className={`mt-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium tracking-tight whitespace-nowrap backdrop-blur-md border transition-all duration-150 pointer-events-none shadow-md flex items-center gap-1 font-sans ${
                  isSelected
                    ? "bg-sky-500 text-white border-sky-300 shadow-sky-500/30 ring-2 ring-sky-400/40 scale-105"
                    : isHovered
                    ? "bg-slate-900/95 text-white border-sky-400 scale-105"
                    : "bg-slate-950/85 text-slate-200 border-white/15 hover:border-sky-400/60"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white" : "bg-sky-400"} animate-pulse`} />
                <span>{marker.country || marker.label.split("•")[0].trim()}</span>
              </div>

              {/* Tooltip Badge on Hover displaying City and Live Hires Count */}
              {(isHovered || isSelected) && (
                <div
                  className="absolute -top-7 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-tight whitespace-nowrap bg-slate-900/95 text-sky-300 border border-sky-500/50 shadow-xl pointer-events-none z-50 animate-in fade-in zoom-in-95 duration-150 font-sans"
                >
                  {marker.label}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Globe3D;
