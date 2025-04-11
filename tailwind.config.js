/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          black: '#121212',
          green: '#00ff00',
          dimgreen: '#00cc00',
          gray: '#ababab',
          white: '#ffffff',
        },
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "'Fira Code'", "'Courier New'", 'monospace'],
        sans: ["'Inter'", 'Helvetica', 'Arial', 'sans-serif'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        }
      },
      animation: {
        blink: 'blink 1s step-end infinite',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}