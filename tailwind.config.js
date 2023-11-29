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
        'apple-gray': '#FAFAFC',
        'btn-blue': '#0271E4',
        ///* Coolors Exported Palette - https://coolors.co/20615b-39736d-52847f-6a9692-83a7a4-9cb9b6-b5cac8-cddcdb-e6eded-ffffff 'caribbean_current' 'hookers_green' 'cambridge_blue' 'anti-flash_white'*/
        'caribbean_current': { DEFAULT: '#20615B', 100: '#061312', 200: '#0d2624', 300: '#133936', 400: '#194d47', 500: '#20615b', 600: '#33998f', 700: '#53c6ba', 800: '#8cd9d1', 900: '#c6ece8' }, 'myrtle_green': { DEFAULT: '#39736D', 100: '#0b1716', 200: '#172e2c', 300: '#224642', 400: '#2e5d58', 500: '#39736d', 600: '#4fa199', 700: '#78bcb5', 800: '#a5d3ce', 900: '#d2e9e6' }, 
        'hookers_green': { DEFAULT: '#52847F', 100: '#101a19', 200: '#213533', 300: '#314f4c', 400: '#426965', 500: '#52847f', 600: '#6da49e', 700: '#92bbb7', 800: '#b6d1cf', 900: '#dbe8e7' }, 'dark_cyan': { DEFAULT: '#6A9692', 100: '#151e1d', 200: '#2a3c3a', 300: '#3f5a57', 400: '#557774', 500: '#6a9692', 600: '#88aaa7', 700: '#a5c0bd', 800: '#c3d5d3', 900: '#e1eae9' }, 
        'cambridge_blue': { DEFAULT: '#83A7A4', 100: '#192322', 200: '#314544', 300: '#4a6865', 400: '#628a87', 500: '#83a7a4', 600: '#9bb8b5', 700: '#b4cac8', 800: '#cddbda', 900: '#e6eded' }, 'ash_gray': { DEFAULT: '#9CB9B6', 100: '#1c2827', 200: '#39504e', 300: '#557874', 400: '#759d99', 500: '#9cb9b6', 600: '#b0c7c5', 700: '#c4d5d3', 800: '#d8e3e2', 900: '#ebf1f0' }, 
        //ash gray
        'anti-flash_white': { DEFAULT: '#E6EDED', 100: '#273636', 200: '#4f6d6d', 300: '#7a9f9f', 400: '#b1c6c6', 500: '#e6eded', 600: '#ecf1f1', 700: '#f1f5f5', 800: '#f6f8f8', 900: '#fafcfc' }, 'white': { DEFAULT: '#FFFFFF', 100: '#333333', 200: '#666666', 300: '#999999', 400: '#cccccc', 500: '#ffffff', 600: '#ffffff', 700: '#ffffff', 800: '#ffffff', 900: '#ffffff' }
      },
      
    },
  },
  plugins: [],
}

