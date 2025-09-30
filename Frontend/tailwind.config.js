/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0a0f',
          surface: '#13131a',
          card: '#1a1a24',
          border: '#2a2a38',
          text: {
            primary: '#e2e8f0',
            secondary: '#94a3b8',
            muted: '#64748b',
          }
        }
      }
    },
  },
  plugins: [],
}

