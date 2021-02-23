const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      ...colors,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
