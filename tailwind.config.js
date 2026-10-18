/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#faf7ef',
        paper: '#f2ecdd',
        ink: '#1c3325',
        inklight: '#3d5a48',
        leaf: {
          DEFAULT: '#2f6b46',
          light: '#4c8a63',
        },
        sage: '#a7c4a0',
        clay: {
          DEFAULT: '#c96b4a',
          soft: '#e0916f',
          pale: '#f7e5dc',
        },
        chalkboard: '#272b25',
        chalk: '#ece9df',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        chalk: ['Caveat', 'cursive'],
        body: ['Jost', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.35em',
      },
    },
  },
  plugins: [],
};
