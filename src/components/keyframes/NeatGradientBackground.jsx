"use client";
import React from "react";
export default function NeatGradientBackground() {
  return (
    <div className="absolute inset-0 z-[-1] animate-gradientBackground bg-gradient-to-r from-[#FF7E5F] via-[#FEB47B] to-[#86A8E7] bg-[length:400%_400%]">
      <style jsx global>{`
        @keyframes gradientBackground {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradientBackground {
          animation: gradientBackground 15s ease infinite;
        }
      `}</style>
    </div>
  );
}

React

Reply

