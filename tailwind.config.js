/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        libre: ['"Libre Franklin"', "ui-sans-serif", "system-ui", "sans-serif"],
        quicksand: ['"Quicksand"', "ui-sans-serif", "system-ui", "sans-serif"],
        shadows: ['"Shadows Into Light"', "cursive"],
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
