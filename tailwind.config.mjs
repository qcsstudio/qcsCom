/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          background: "var(--background)",
          foreground: "var(--foreground)",
        },
        fontFamily: {
          syne: ["Syne", "sans-serif"], 
          nats: ["NATS", "sans-serif"], 
          montserrat: ["var(--font-montserrat)", "sans-serif"],
        },
      },
    },
    plugins: [],
  };
  