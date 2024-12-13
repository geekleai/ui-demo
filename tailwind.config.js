/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./src/**/*.{html,ts,md}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"??"',
          'ui-sans-serif',
          '-apple-system',
          'BlinkMacSystemFont',
          'Roboto',
          '"Helvetica"',
          '"Arial"',
          '"Segoe UI"',
          '"Inter"',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Microsoft YaHei Light"',
          'sans-serif',
        ],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

