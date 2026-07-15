/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#FFFFFF',
        gray: {
          100: '#F5F5F5',
          300: '#D4D4D4',
          500: '#737373',
          700: '#404040',
          900: '#171717',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Inter', 'sans-serif'],
      },
      fontWeight: {
        black: '900',
      },
      letterSpacing: {
        widest: '0.15em',
        ultra: '0.05em',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 18s linear infinite',
        'fade-up': 'fade-up 0.7s ease forwards',
      },
    },
  },
  plugins: [],
}
