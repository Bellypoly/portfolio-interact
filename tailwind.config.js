/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
  theme: {
    extend: {
      fontSize: {
        "site-micro": ["var(--site-font-micro)", { lineHeight: "1" }],
        "site-note": ["var(--site-font-note)", { lineHeight: "1.25rem" }],
        "site-caption": ["var(--site-font-caption)", { lineHeight: "1.25rem" }],
        "site-body": ["var(--site-font-body)", { lineHeight: "1.5rem" }],
        "site-lead": ["var(--site-font-lead)", { lineHeight: "1.625rem" }],
        "site-icon": ["var(--site-font-icon)", { lineHeight: "1" }],
        "site-card-title": [
          "var(--site-font-card-title)",
          { lineHeight: "1.35" },
        ],
        "site-job-title": ["var(--site-font-job-title)", { lineHeight: "1.2" }],
      },
      fontFamily: {
        georgia: ["Georgia", '"Times New Roman"', "Times", "ui-serif", "serif"],
        aurebesh: ['"Aurebesh"', "ui-sans-serif", "sans-serif"],
        fleur: ['"Fleur De Leah"', "ui-serif", "serif"],
        robotomono: ['"Roboto Mono"', "ui-monospace", "monospace"],
        orbitron: ['"Orbitron"', "ui-sans-serif", "system-ui", "sans-serif"],
        quicksand: ["Quicksand", "ui-sans-serif", "system-ui", "sans-serif"],
        roboto: [
          '"Roboto Condensed"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        silkscreen: ['"Silkscreen"', "ui-monospace", "monospace"],
        stacknotch: [
          '"Stack Sans Notch"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
