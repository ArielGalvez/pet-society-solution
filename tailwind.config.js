const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#F38B34",
          light: "#FFA16C",
          dark: "#c45610",
        },
        secondary: {
          DEFAULT: "#2A2A2A",
          light: "#696969",
          dark: "#1D1D1D",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
