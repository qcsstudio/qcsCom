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
      screens:{
        'xs':'480px',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        // unbounded: ['var(--font-unbounded)'],
        outfit: ["Outfit", "sans-serif"],
        nats: ["NATS", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        unbounded: ["var(--font-unbounded)", "sans-serif"],

      },
    },
  },
  plugins: [],
};
