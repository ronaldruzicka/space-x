module.exports = {
  purge: ['./pages/**/*.{tsx}', './components/**/*.{tsx}'],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
