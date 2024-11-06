/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "josefin": ["Josefin Sans", "serif"],
        "inter": ["Inter", "sans-serif"]
      },
      colors:{
        "sogeti-blue": "rgb(0, 112, 173)"
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light", "dark", "cupcake", "nord"],
    base: true,
  },
}

