/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Palette marron-métallique industrielle
        'brand-dark': '#2e2a27',
        'brand-brown': '#4e3b2b',
        'brand-copper': '#b87333',
        'brand-light': '#d4a574',
        'brand-accent': '#8b6914',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-industrial': 'linear-gradient(135deg, #2e2a27 0%, #4e3b2b 50%, #3a2f28 100%)',
        'gradient-copper': 'linear-gradient(135deg, #b87333 0%, #8b6914 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'copper': '0 4px 14px 0 rgba(184, 115, 51, 0.39)',
        'copper-lg': '0 10px 25px 0 rgba(184, 115, 51, 0.5)',
      },
    },
  },
  plugins: [],
}
