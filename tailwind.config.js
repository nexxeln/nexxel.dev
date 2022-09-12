/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "t-pink": "#f4cfdf",
        "t-purple": "#cabdff",
        "t-orange": "#ffbc99",
        "t-red": "#ff6961",
      },
      animation: {
        "gradient-text": "gradient-text 5s ease infinite",
        "fade-in-up": "fade-in-up 0.5s ease-out",
      },
      keyframes: {
        "gradient-text": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
