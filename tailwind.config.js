/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      oswald: ["Oswald", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#238ffb",
        secondary: "#030F25",
        accent: "#ffffff",
        dimBlue: "#CBE1F6",
      },
    },
  },
  plugins: [],
};
