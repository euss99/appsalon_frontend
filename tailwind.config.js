/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

export const content = [
  "./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",
  "./node_modules/vue-tailwind-datepicker/**/*.js",
  "./formkit.config.js"
];
export const theme = {
  extend: {
    // Customizando para que la clase "bg-app" me agregue la imagen
    backgroundImage: {
      "app": "url('/img/bg.jpg')",
    },
    colors: {
      // Agregando estilos a vue-tailwind-datepicker
      "vtd-primary": colors.blue,
    },
  },
};
export const plugins = [];
