/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#000000', // Black for dark mode
          light: '#121212', // Very dark gray for dark mode
          dark: '#000000',
          dashboard: '#1e3a8a', // Blue for dashboard in dark mode
        },
        secondary: {
          DEFAULT: '#3E97FF',
          light: '#5EADFF',
          dark: '#1E77DF',
        },
        accent: {
          orange: '#FF6B35',
          green: '#2ECC71',
          purple: '#8950FC',
          blue: '#3E97FF',
          yellow: '#FFD700',
          red: '#FF4136',
          teal: '#20C997',
          indigo: '#6610F2',
          pink: '#E83E8C',
          cyan: '#17A2B8',
        },
        sidebar: {
          DEFAULT: '#1e3a8a', // Blue-based theme for sidebar
          light: '#2563eb',
          dark: '#172554',
          hover: '#3b82f6',
        },
        text: {
          light: '#FFFFFF', // White text for dark mode
          dark: '#212529',
          muted: '#6C757D',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
