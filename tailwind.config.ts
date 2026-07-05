import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      colors: {
        // Warm paper — the page base. Cream, not sterile white.
        paper: {
          DEFAULT: "#faf6ef",
          deep: "#f3ecdf",
        },
        // Sand — hairlines, quiet surfaces
        sand: {
          100: "#efe8db",
          200: "#e3d9c6",
          300: "#d2c5ac",
        },
        // Ink — deep blue-slate text
        ink: {
          DEFAULT: "#1a2530",
          soft: "#3d4c5c",
          faint: "#6b7885",
        },
        // Aegean — the single blue. Interactive elements only.
        ocean: {
          50: "#eef5f9",
          100: "#d8e9f2",
          200: "#aed1e4",
          300: "#79b2d1",
          400: "#3f8db4",
          500: "#1f6f99",
          600: "#175a7e",
          700: "#144a67",
          800: "#133d55",
          900: "#112f42",
        },
        // Terracotta — warm accent, used sparingly & semantically
        terra: {
          300: "#e8a284",
          400: "#d97a52",
          500: "#c65b33",
          600: "#a84826",
        },
        // Olive — quiet supporting tone
        olive: {
          400: "#8a8a5c",
          500: "#6e7045",
        },
        // kept for compat; maps to terracotta family
        sunset: {
          300: "#e8a284",
          400: "#d97a52",
          500: "#c65b33",
          600: "#a84826",
        },
        rose: {
          brand: "#c65b33",
        },
      },
      boxShadow: {
        float: "0 24px 50px -24px rgba(26, 37, 48, 0.28)",
        card: "0 14px 34px -18px rgba(26, 37, 48, 0.22)",
        pill: "0 8px 22px -10px rgba(26, 37, 48, 0.32)",
      },
      keyframes: {
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "gradient-pan": "gradient-pan 12s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;
