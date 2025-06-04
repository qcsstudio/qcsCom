'use client';
import { useEffect } from "react";

// ✅ Default Export for Component <CalendlyBadge />
export default function CalendlyBadge() {
  useEffect(() => {
    const head = document.querySelector("head");

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    head.appendChild(script);
  }, []);

  return null; // No UI, just injects Calendly script
}

// ✅ Named export for using the hook separately
export function useCalendly() {
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: "https://calendly.com/rksankhyan-qcsstudio?primary_color=f1813b",
      });
    } else {
      console.warn("Calendly is not loaded yet.");
    }
  };

  return openCalendly;
}
