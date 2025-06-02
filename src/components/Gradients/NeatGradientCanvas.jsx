"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
export default function NeatGradientCanvas() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const clock = new THREE.Clock();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-50, 50, 50, -50, 1, 1000);
    camera.position.z = 5;
    const geometry = new THREE.PlaneGeometry(50, 80, 120, 120);
    // SHADER UNIFORMS
    const uniforms = {
      u_time: { value: 0.0 },
      u_resolution: { value: new THREE.Vector2(width, height) },
      u_wave_frequency_x: { value: 0.2 },
      u_wave_frequency_y: { value: 0.2 },
      u_wave_amplitude: { value: 1.5 }
    };
    // SIMPLE ANIMATED SHADER EXAMPLE
    const vertexShader = `
      varying vec2 vUv;
      uniform float u_time;
      uniform float u_wave_frequency_x;
      uniform float u_wave_frequency_y;
      uniform float u_wave_amplitude;
      void main() {
        vUv = uv;
        vec3 pos = position;
        pos.z += sin(pos.x * u_wave_frequency_x + u_time) * u_wave_amplitude;
        pos.z += cos(pos.y * u_wave_frequency_y + u_time) * u_wave_amplitude;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;
    const fragmentShader = `
      varying vec2 vUv;
      void main() {
        vec3 color = vec3(0.1 + 0.6 * vUv.x, 0.3 + 0.5 * vUv.y, 0.8);
        gl_FragColor = vec4(color, 1.0);
      }
    `;
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      wireframe: false,
    });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    const animate = () => {
      uniforms.u_time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
    const handleResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h);
      uniforms.u_resolution.value.set(w, h);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="w-full h-screen absolute top-0 left-0 z-[-1]"
    />
  );
}
