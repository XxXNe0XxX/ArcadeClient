/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        color1: "#DC5F00",
        color2: "#373A40",
        color3: "#686D76",
        color4: "#EEEEEE",
      },
      textColor: {
        color1: "#DC5F00",
        color2: "#373A40",
        color3: "#686D76",
        color4: "#EEEEEE",
      },
      borderColor: {
        color1: "#DC5F00",
        color2: "#373A40",
        color3: "#686D76",
        color4: "#EEEEEE",
      },
      fontFamily: {
        "press-start": ['"Press Start 2P"', "cursive"],
        "pixel-emulator": ["PixelEmulator", "cursive"],
      },
    },
  },

  plugins: [],
};
