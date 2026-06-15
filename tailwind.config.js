export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        panel: '0 20px 70px rgba(15, 23, 42, 0.12)',
      },
      colors: {
        surface: '#f8fafc',
        panel: '#ffffff',
        brand: '#0f172a',
        accent: '#1d4ed8',
        accentSoft: '#e0e7ff',
      },
    },
  },
  plugins: [],
}
