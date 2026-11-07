/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Design system tokens
        accent: {
          DEFAULT: '#5145E5',
          hover: '#4338CA',
          light: '#EEF2FF',
          muted: '#8B83F0',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          raised: '#F8F9FC',
          overlay: '#F1F3F9',
        },
        app: {
          bg: '#F8F9FC',
        },
        text: {
          primary: '#171923',
          secondary: '#747B8C',
          muted: '#A0A9B8',
          inverse: '#FFFFFF',
        },
        border: {
          DEFAULT: '#E8EAF0',
          strong: '#D0D3DD',
        },
        // Status colors — muted, not neon
        status: {
          easy: '#16A34A',
          'easy-bg': '#F0FDF4',
          medium: '#D97706',
          'medium-bg': '#FFFBEB',
          hard: '#DC2626',
          'hard-bg': '#FEF2F2',
          solved: '#16A34A',
          'solved-bg': '#F0FDF4',
          unsolved: '#747B8C',
          'unsolved-bg': '#F8F9FC',
          attempted: '#D97706',
          'attempted-bg': '#FFFBEB',
        },
        // Platform colors
        platform: {
          leetcode: '#FFA116',
          codeforces: '#1890FF',
          codechef: '#5B4638',
          atcoder: '#B22222',
          hackerrank: '#00EA64',
        },
        // Heatmap scale (GitHub-style with accent)
        heat: {
          0: '#E8EAF0',
          1: '#C5BFFB',
          2: '#9B91F5',
          3: '#7267EF',
          4: '#5145E5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': '0.625rem',
        xs: '0.75rem',
        sm: '0.8125rem',
        base: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
      },
      borderRadius: {
        DEFAULT: '0.375rem',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px 0 rgba(0,0,0,0.08)',
        'dropdown': '0 4px 16px 0 rgba(0,0,0,0.10)',
        'modal': '0 20px 60px 0 rgba(0,0,0,0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-in-right': 'slideInRight 0.25s ease-out',
        'slide-up': 'slideUp 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
