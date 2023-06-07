/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0A95FF",
        secondary: "#E1ECF4",
        tertiary: "#39739D",
        quaternary: "#B3D3E3",
        quinary: "#5F5F5F",
        bgMain: "#F1F2F3",
      },
      fontFamily: {
        poppins: ["Poppins"],
        roboto: ["Roboto"],
      },
    },
  },
  plugins: [],
};
