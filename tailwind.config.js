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
        color5: "black",
      },
      textColor: {
        color1: "#DC5F00",
        color2: "#373A40",
        color3: "#686D76",
        color4: "#EEEEEE",
        color5: "black",
      },
      borderColor: {
        color1: "#DC5F00",
        color2: "#373A40",
        color3: "#686D76",
        color4: "#EEEEEE",
        color5: "black",
      },
      fontFamily: {
        "press-start": ['"Press Start 2P"', "cursive"],
        "pixel-emulator": ["PixelEmulator", "cursive"],
      },
    },
  },

  plugins: [],
};
