/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0C0C0C',
        surface: '#121212',
        lightText: '#D7E2EA',
      },
      fontFamily: {
        sans: ['Kanit', 'sans-serif'],
        kanit: ['Kanit', 'sans-serif'],
        serif: ['"Alex Brush"', '"Pinyon Script"', '"Caveat"', 'cursive', 'serif'],
        cursive: ['"Alex Brush"', '"Pinyon Script"', '"Caveat"', 'cursive'],
        alex: ['"Alex Brush"', 'cursive'],
        pinyon: ['"Pinyon Script"', 'cursive'],
        caveat: ['"Caveat"', 'cursive'],
        display: ['"Alex Brush"', '"Playfair Display"', 'cursive', 'serif'],
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        syne: ['Syne', 'sans-serif'],
        cinzel: ['Cinzel', 'serif'],
        italiana: ['Italiana', 'serif'],
      },
    },
  },
  plugins: [],
}
