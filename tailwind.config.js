/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        kkm: {
          jetBlack: '#020617',     // RGB: 2, 6, 23 (Official Brand Book)
          azureBlue: '#0A92EF',    // RGB: 10, 146, 239 (Official Brand Book)
          babyBlue: '#89CFF0',     // RGB: 137, 207, 240 (Official Brand Book)
          pureWhite: '#FFFFFF',    // RGB: 255, 255, 255 (Official Brand Book)
          sunGold: '#F59E0B',      // Golden-amber core
          deepBlue: '#020617',     // Jet Black / Deep Blue
          skyBlue: '#0A92EF',      // Azure Blue
        }
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'], // Primary Typeface (Official Brand Book)
        vazirmatn: ['Vazirmatn', 'sans-serif'],   // Secondary Typeface (Official Brand Book)
        sans: ['Montserrat', 'Vazirmatn', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'Vazirmatn', 'sans-serif'],
      }
    }
  }
};
