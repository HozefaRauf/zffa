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
        accent: '#c11524',
        accentSoft: '#fff1f2',
        rose: {
          50: '#fff1f2',
          100: '#ffe1e3',
          200: '#fecdd3',
          300: '#fca5ad',
          600: '#c11524',
          700: '#9f0e1b',
        },
      },
      fontFamily: {
        display: ['Sora', 'Inter', 'ui-sans-serif', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
