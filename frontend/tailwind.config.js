/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: "class", // or 'media' or 'class'
  content: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.vue"],
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
