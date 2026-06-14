/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-accent": "#9139f6",
        "brand-accent-hover": "#7a2dd4",
      },
      backgroundColor: {
        "vibe-page": "#ffffff",
        "vibe-card": "#ffffff",
        "vibe-header-bg": "#ffffff",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['"Monument Extended"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
