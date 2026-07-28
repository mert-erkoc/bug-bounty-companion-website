/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#060D1B",
        cyan: {
          DEFAULT: "#06B6D4",
          light: "rgba(6,182,212,0.1)",
          border: "rgba(6,182,212,0.28)",
        },
        green: {
          DEFAULT: "#22C55E",
          light: "rgba(34,197,94,0.1)",
          border: "rgba(34,197,94,0.28)",
        },
        purple: {
          DEFAULT: "#A855F7",
          light: "rgba(168,85,247,0.1)",
          border: "rgba(168,85,247,0.28)",
        },
        extension: {
          bg: "#0B1017",
          surf: "#131B27",
          surf2: "#1B2639",
          border: "rgba(255,255,255,0.08)",
          text: "rgba(255,255,255,0.90)",
          muted: "rgba(255,255,255,0.42)",
          dim: "rgba(255,255,255,0.22)",
          blue: "#4775FF",
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
}
