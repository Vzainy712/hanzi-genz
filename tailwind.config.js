/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
        hanzi: ['"Noto Sans SC"', 'sans-serif'],
      },
      colors: {
        // Bảng màu GenZ - tươi sáng, hiện đại (không dùng đỏ/vàng truyền thống)
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        accent: {
          pink: '#f472b6',
          cyan: '#22d3ee',
          lime: '#a3e635',
          orange: '#fb923c',
        },
      },
      backgroundImage: {
        'gradient-genz': 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f97316 100%)',
        'gradient-cool': 'linear-gradient(135deg, #6366f1 0%, #22d3ee 100%)',
        'gradient-card': 'linear-gradient(160deg, #ffffff 0%, #faf5ff 100%)',
      },
      keyframes: {
        'pop-in': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        'pop-in': 'pop-in 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'wiggle': 'wiggle 0.4s ease-in-out',
      },
    },
  },
  plugins: [],
}
