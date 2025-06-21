/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary color - Indigo Blue
        primary: {
          50: '#f0f4ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#1D3557', // Main primary color
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#1e3a8a',
        },
        // Haiti flag inspired colors
        haiti: {
          blue: '#1D3557',    // Deep blue from flag
          red: '#D62828',     // Red from flag
          white: '#FFFFFF',   // White from flag
          gold: '#FFD60A',    // Gold accent
        }
      }
    },
  },
  plugins: [],
};