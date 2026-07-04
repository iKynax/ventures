/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0a0a0a', deep: '#000000' },
        surface: { DEFAULT: '#141414', raised: '#1a1a1a' },
        accent: { DEFAULT: '#e8702a', hover: '#d2611f' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      maxWidth: {
        wrap: '80rem',
      },
    },
  },
  plugins: [],
}
