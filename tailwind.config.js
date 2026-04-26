/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
  theme: {
    extend: {
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
