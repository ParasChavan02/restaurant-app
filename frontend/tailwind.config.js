/** @type {import('tailwindcss').Config} */
module.exports = {
  // Configure files to scan for Tailwind classes to enable tree-shaking
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Look for JS/JSX/TS/TSX files in src and its subdirectories
    "./public/index.html",       // Also check public HTML if you have Tailwind classes there
  ],
  theme: {
    extend: {
      // Custom font family for Inter
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      // Custom color palette to match the rustic/fine dining aesthetic
      colors: {
        amber: {
          50: '#fffdf5',
          100: '#fff9e6',
          200: '#fff0c7',
          300: '#ffe3a8',
          400: '#ffd07a',
          500: '#ffb74d', // A warm, inviting amber
          600: '#e69a2e',
          700: '#bf7d1b',
          800: '#99600f',
          900: '#734300',
        },
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c', // A neutral, earthy stone gray
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
      }
    },
  },
  plugins: [],
}
