module.exports = {
  // TODO: Will the styles work without purge?
  // purge: ['./pages/**/*.{tsx}', './components/**/*.{tsx}'],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
