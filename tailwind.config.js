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
      },
      height: {
        "container": "calc(100vh - 8rem)"
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light", "dark", "cupcake", "nord", "valentine", "pastel", "retro", "halloween", "bumblebee", "forest", "aqua", "lofi", "wireframe", "synthwave"],
    base: true,
  },
}

