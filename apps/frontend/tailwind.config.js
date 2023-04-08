/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/frontend/index.html',
    './apps/frontend/src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        danger: '#ff3333',
        'danger-darker': '#d02121',
      },
    },
  },
  plugins: [],
};
