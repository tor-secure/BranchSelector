/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#367AF3",
        secondary: "#030F25",
        accent: "#ffffff",
        dimBlue: '#CBE1F6',  
      },
      fontFamily: {
        poppins : ["Poppins", "san-serif"]
      }
  
    },
   
  },
  plugins: [],
};
