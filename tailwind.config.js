/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        base: ['Manrope', 'sans-serif'],
        accent: ['Archivo Black', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern':
          'url(https://images.unsplash.com/photo-1506784926709-22f1ec395907?q=80&w=2668&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      },
      colors: {
        primary: colors.indigo,
        neutral: colors.gray,
      },
    },
  },
  plugins: [],
};
