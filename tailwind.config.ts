import type { Config } from 'tailwindcss'

export default {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    theme: {
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
      },
    },
    extend: {
      colors: {
        primary: '#00B5F0',
        secondary: '#233F9A',
      },
    },
  },
  plugins: [],
} satisfies Config
