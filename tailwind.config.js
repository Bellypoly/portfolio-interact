/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
  theme: {
    extend: {
      fontFamily: {
        dotgothic: ['"DotGothic16"', "ui-monospace", "monospace"],
        libre: ['"Libre Franklin"', "ui-sans-serif", "system-ui", "sans-serif"],
        orbitron: ['"Orbitron"', "ui-sans-serif", "system-ui", "sans-serif"],
        quicksand: ['"Quicksand"', "ui-sans-serif", "system-ui", "sans-serif"],
        roboto: ['"Roboto Condensed"', "ui-sans-serif", "system-ui", "sans-serif"],
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
