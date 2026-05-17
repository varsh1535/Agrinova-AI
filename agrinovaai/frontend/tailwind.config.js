export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
      colors: {
        nova: {
          50: "#effdf5",
          200: "#b7f7cd",
          400: "#31d972",
          500: "#15b85b",
          700: "#0d6d38",
          950: "#03190f",
        },
      },
      boxShadow: {
        glow: "0 0 48px rgba(49, 217, 114, 0.22)",
      },
    },
  },
  plugins: [],
};
