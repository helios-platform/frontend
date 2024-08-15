import animate from "tailwindcss-animate";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        "custom-dark-blue": "#0f182a",
        "custom-dark-gray": "#334155",
        // "custom-dark-gray": "#1f2937", // darker
        "custom-light-purple": "#6366f1",
        "custom-green": "#0f8e6a",
        // "custom-light-blue": "#358db1",
        // "custom-light-gray": "#99a7ba",
        "custom-light-blue": "#60a5fa",
        "custom-light-gray": "#e5e7eb",
        "custom-medium-purple": "#554ee7",
      },
      boxShadow: {
        custom: "4px 4px 10px rgba(0, 0, 0, 0.3)",
        glow: "0 0 5px rgba(99, 102, 241, 0.5)",
        low: "var(--shadow-elevation-low)",
        medium: "var(--shadow-elevation-medium)",
        high: "var(--shadow-elevation-high)",
      },
    },
  },
  plugins: [animate, forms],
};
