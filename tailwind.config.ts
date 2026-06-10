import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'ice-melt': '#C7D8E8',
        'merlot': '#5E1020',
        'deep-espresso': '#1A0905',
        'cream': '#F7F3EE',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.15em',
      },
    },
  },
  plugins: [],
}

export default config
