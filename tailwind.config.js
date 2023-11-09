/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
   
  ],
  theme: {
    fontFamily:{
      mincho:['Shippori Mincho', 'serif']
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'su-green': '#20615b',
        'web-green': '#29C7AC',
        'web-red': '#C02739',
        'web-pink': '#E49393',
      },
    },
  },
  plugins: [],
}

