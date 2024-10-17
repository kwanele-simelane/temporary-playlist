/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      screens: {
        "2xs": "480px", // Custom screen size for less than 480px
        xs: "600px", // Custom screen size for less than 600px
        sm: "768px", // Custom screen size for less than 768px
        md: "980px", // Custom screen size for less than 980px
        lg: "1024px", // Custom screen size for less than 1024px
        xl: "1120px", // Custom screen size for 1120px and up
      },
      maxWidth: {
        "95p": "95%",
        "90p": "90%",
        "85p": "85%",
        "80p": "80%",
        "75p": "75%",
      },
    },
    // configure app color palette
    colors: {
      primary: "#00AAAD",
      alt: "#FC9E1A",
      accent: "#DADADA",
      spotify: "#69d862",
    },
    fontFamily: {
      poppins: "Poppins",
    },
    backdropBrightness: {
      25: ".25",
      175: "1.75",
    },
  },
};
