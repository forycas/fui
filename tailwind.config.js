const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      black: '#000',
      white: '#fff',
      emerald: colors.emerald
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
}
