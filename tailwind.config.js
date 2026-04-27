/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
  theme: {
    extend: {
      fontSize: {
        "pf-micro": ["var(--pf-font-micro)", { lineHeight: "1" }],
        "pf-note": ["var(--pf-font-note)", { lineHeight: "1.25rem" }],
        "pf-caption": ["var(--pf-font-caption)", { lineHeight: "1.25rem" }],
        "pf-body": ["var(--pf-font-body)", { lineHeight: "1.5rem" }],
        "pf-lead": ["var(--pf-font-lead)", { lineHeight: "1.625rem" }],
        "pf-icon": ["var(--pf-font-icon)", { lineHeight: "1" }],
        "pf-card-title": ["var(--pf-font-card-title)", { lineHeight: "1.35" }],
        "pf-job-title": ["var(--pf-font-job-title)", { lineHeight: "1.2" }],
        "pf-section": ["var(--pf-font-section)", { lineHeight: "1.2" }],
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
