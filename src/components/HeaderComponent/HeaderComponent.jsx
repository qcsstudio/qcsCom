"use client";

import { useEffect, useRef } from "react";
import { NeatGradient } from "@firecms/neat";

const config = {
    colors: [
        {
            color: '#A960EE',
            enabled: true,
        },
        {
            color: '#FF333D',
            enabled: true,
        },
        {
            color: '#90E0FF',
            enabled: true,
        },
        {
            color: '#FFCB57',
            enabled: true,
        },
        {
            color: '#f5e1e5',
            enabled: false,
        },
    ],
    speed: 2,
    horizontalPressure: 3,
    verticalPressure: 6,
    waveFrequencyX: 1,
    waveFrequencyY: 2,
    waveAmplitude: 10,
    shadows: 0,
    highlights: 7,
    colorBrightness: 1.05,
    colorSaturation: 0,
    wireframe: false,
    colorBlending: 9,
    backgroundColor: '#003FFF',
    backgroundAlpha: 1,
    grainScale: 0,
    grainSparsity: 0,
    grainIntensity: 0,
    grainSpeed: 0,
    resolution: 1,
    yOffset: 0,
}


export default function NeatBackground() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const neatInstance = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Resize canvas to match container size
    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    resizeCanvas();

    // ✅ Pass actual canvas DOM element
    neatInstance.current = new NeatGradient({
      ref: canvas,
      ...config,
    });

    const observer = new ResizeObserver(() => {
      resizeCanvas();
      if (neatInstance.current?.resize) {
        neatInstance.current.resize();
      }
    });
    observer.observe(container);

    return () => {
      observer.disconnect();
      if (neatInstance.current?.destroy) {
        neatInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 77%)",
        position: "relative",
      }}
    >
      <canvas
        ref={canvasRef}
        id="gradient"
        style={{
          width: "100%",
          height: "100%",
          zIndex: -1,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
}
