/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-light': '#02569B',
        'blue': '#40C4FF',
        'blue-dark': '#0078D4',
        'blue-soft': '#0091EA',
      },
    },
  },
  plugins: [],
}

