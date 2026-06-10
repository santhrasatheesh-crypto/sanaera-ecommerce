import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'ice-melt': '#C7D8E8',
        'ice-melt-light': '#E8EEF5',
        'ice-melt-dark': '#A0B3D3',
        'merlot': '#5E1020',
        'merlot-light': '#8B3A4F',
        'merlot-dark': '#4A0D18',
        'deep-espresso': '#1A0905',
        'cream': '#F7F3EE',
        'cream-light': '#FDFBF8',
        'cream-dark': '#E8E3DB',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', ...defaultTheme.fontFamily.serif],
        display: ['Playfair Display', ...defaultTheme.fontFamily.serif],
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      letterSpacing: {
        widest: '0.15em',
        luxury: '0.08em',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-up': 'scaleUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'luxury-sm': '0 1px 3px rgba(26, 9, 5, 0.1)',
        'luxury-md': '0 4px 8px rgba(26, 9, 5, 0.12)',
        'luxury-lg': '0 12px 24px rgba(26, 9, 5, 0.15)',
        'luxury-xl': '0 20px 40px rgba(26, 9, 5, 0.2)',
      },
    },
  },
  plugins: [],
}

export default config
