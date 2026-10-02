"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/** A lightweight, procedural sculpture; no models, textures, or network requests. */
export default function FluidSculpture({ paused }: { paused: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const pauseRef = useRef(paused);
  useEffect(() => { pauseRef.current = paused; }, [paused]);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" }); }
    catch { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    element.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
    camera.position.z = 7.7;
    const material = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        uniform float time;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vec3 p = position + normal * (sin(position.y * 3.0 + time * 0.8) * 0.07 + cos(position.x * 4.0 + time * 0.6) * 0.04);
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          vNormal = normalize(normalMatrix * normal);
          vPosition = mv.xyz;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vec3 n = normalize(vNormal);
          vec3 view = normalize(-vPosition);
          float rim = pow(1.0 - abs(dot(n, view)), 2.8);
          float light = dot(n, normalize(vec3(-0.6, 1.0, 1.5))) * 0.5 + 0.5;
          float shine = pow(max(dot(reflect(-normalize(vec3(-1.0, 1.5, 2.0)), n), view), 0.0), 32.0);
          vec3 color = mix(vec3(0.04, 0.04, 0.07), vec3(0.18, 0.19, 0.28), light);
          color = mix(color, vec3(0.38, 0.42, 0.58), rim * 0.45);
          color += vec3(0.55, 0.58, 0.72) * (shine * 0.6);
          gl_FragColor = vec4(color, 0.55);
        }`,
    });
    const geometry = new THREE.TorusKnotGeometry(1.45, 0.27, 180, 24, 2, 3);
    const sculpture = new THREE.Mesh(geometry, material);
    sculpture.rotation.set(0.3, 0.1, -0.25);
    scene.add(sculpture);
    const resize = new ResizeObserver(() => {
      const { width, height } = element.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
    resize.observe(element);
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(element);
    let frame = 0, previous = 0, time = 0;
    function animate(now: number) {
      frame = requestAnimationFrame(animate);
      const delta = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      if (!visible || document.hidden) return;
      if (!pauseRef.current) time += delta;
      material.uniforms.time.value = time;
      sculpture.rotation.y = time * 0.12;
      sculpture.rotation.x = 0.3 + Math.sin(time * 0.24) * 0.22;
      renderer.render(scene, camera);
    }
    frame = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect(); geometry.dispose(); material.dispose(); renderer.dispose(); renderer.domElement.remove(); };
  }, []);
  return <div ref={host} aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />;
}
