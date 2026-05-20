module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        'primary-soft': '#60A5FA',
        foreground: '#0F172A',
        muted: '#64748B',
        card: '#FFFFFF',
        glass: 'rgba(255,255,255,0.65)'
      }
    }
  },
  plugins: []
}
