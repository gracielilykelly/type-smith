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
    },
  },
};
