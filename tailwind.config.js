/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "main-gradient":
          "linear-gradient(128.49deg, #CB3CFF 19.86%, #7F25FB 68.34%)",
        "button-gradient":
          "linear-gradient(90deg, #DF00DB 0%, #AB03C4 23.5%, #320079 100%)",
      },
      boxShadow: {
        "input-shadow": "0px 10px 40px 0px rgba(174, 174, 174, 0.2)",
      },
    },
  },
  plugins: [],
};
