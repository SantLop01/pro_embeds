/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/views/**/*.{ejs, js}", "./public/js/**/*.js"],
  darkMode: 'class',
  theme: {
    extend: {
      rotate: {
        360: '360deg',
      }
    },
  },
  plugins: [],
}

