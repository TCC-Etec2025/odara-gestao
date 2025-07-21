module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ajuste para incluir seus arquivos
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'odara-primary': '#B76E79',
        'odara-secondary': '#F8E9E9',
        'odara-accent': '#E3C4C8',
        'odara-dark': '#4A2A2F',
      },
    },
  },
  plugins: [],
}