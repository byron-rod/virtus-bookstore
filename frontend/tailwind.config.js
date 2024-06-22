/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        about: "url(/src/assets/images/hero-bg.png)",
        banner: "url(/src/assets/images/about-banner.svg)",
        photo_shape: "url(/src/assets/images/shape-1.svg)",
      },
    },
  },
  plugins: [],
};
