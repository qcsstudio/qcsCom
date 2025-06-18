"use client";

import { useEffect, useRef } from "react";
import { NeatGradient } from "@firecms/neat";
import { Syne, Unbounded } from 'next/font/google';

const unbounded = Unbounded({ subsets: ['latin'], weight: '700' });

const config = {
  colors: [
        {
            color: '#FD113F',
            enabled: true,
        },
        {
            color: '#90E0FF',
            enabled: true,
        },
        {
            color: '#FFC858',
            enabled: true,
        },
        {
            color: '#753BFF',
            enabled: true,
        },
        {
            color: '#f5e1e5',
            enabled: false,
        },
    ],
    speed: 2,
    horizontalPressure: 5,
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
    grainIntensity: 0.025,
    grainSpeed: 0,
    resolution: 1,
    yOffset: 0,
};

export default function NeatBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const neat = new NeatGradient({
      ref: canvasRef.current,
      ...config
    });

    return () => {
      neat.destroy();
    };
  }, []);

  return (
    <div className="w-[100%] h-[100%]">
      <p className={`text-[#000] absolute w-[44%] text-3xl xl:text-[61px] md:text-[46px]  font-extrabold leading-tight ${unbounded.className}  top-[14%] left-[88px]`} >Automate Your Business. Scale with Smart SaaS. Achieve Career Excellence</p>

    <div className="container w-[100%] h-[100vh] " style={{clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 77%)"}}>
      
      <canvas
        ref={canvasRef}
        id="gradient"
        style={{
          width: "100%",
          height: "100%",
          // position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1
        }}
        />
    </div>
        </div>
  );
}
