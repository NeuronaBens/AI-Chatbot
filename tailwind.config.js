/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes :{
        slideIn :{
          '0%': {transform: 'translateX(-100%)'},
          '100%': { transform: 'translateX(0)'},
        },
        appear:{
          '0%': {transform:'translateY(50%)', opacity:0.25},
          '100%': {transform:'translateY(0)', opacity:1},
        }
      },
      animation:{
        slideleft: 'slideIn 1s ease-out',
        appearAbove: 'appear 1s ease-out',
      },
    },
  },
  plugins: [],
}
