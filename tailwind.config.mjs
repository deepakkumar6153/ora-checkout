/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    theme: {
      extend: {
        colors: {
          primary: "#F26B3A", // Swiggy-like orange
          secondary: "#FFCB47", // Yellow shade for highlights
          dark: "#282c3f",
          light: "#f5f5f5",
          grayText: "#7e808c",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
