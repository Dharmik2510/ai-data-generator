/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Tells Tailwind where to look for classes
      "./public/index.html"
    ],
    theme: {
      extend: {}, // You can extend default theme here
    },
    plugins: [], // You can add plugins here
  }