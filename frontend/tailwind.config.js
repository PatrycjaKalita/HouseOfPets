/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      columns: {
        '4xs': '100px',
      },
      margin: {
        '15': '15px',
        '35': '35px',
        '50': '50px',
        '100': '100px'
      },
      width: {
        '100px': '100px',
      },
    },
  },
  plugins: [
    /*require('@tailwindcss/forms')*/
  ],
}
