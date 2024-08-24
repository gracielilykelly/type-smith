/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F5F5DC",
      },
      fontFamily: {
        mono: ["Courier New", "IBM Plex Mono", "monospace"],
      },
      keyframes: {
        blink: {
          "0%": { opacity: 1 },
          "50%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [
    require("@headlessui/react"),
  ],
};
