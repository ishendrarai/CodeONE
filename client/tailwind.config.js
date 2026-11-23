/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        app: {
          bg: '#FAFAF8',
          card: '#FFFFFF',
          border: '#E5E5E0',
          'border-strong': '#D4D4CE',
          hover: '#F4F4F0',
        },
        ink: {
          DEFAULT: '#0B0B0F',
          secondary: '#52525B',
          muted: '#8E8E93',
          faint: '#C4C4C0',
        },
        accent: {
          DEFAULT: '#0052FF',
          hover: '#0043D6',
          subtle: '#EFF4FF',
          border: '#BFDBFE',
          dark: '#003199',
        },
        // Semantic status (non-neon)
        verdict: {
          ac: '#16A34A',
          'ac-bg': '#F0FDF4',
          'ac-border': '#BBF7D0',
          wa: '#DC2626',
          'wa-bg': '#FEF2F2',
          'wa-border': '#FECACA',
          tle: '#D97706',
          'tle-bg': '#FFFBEB',
          'tle-border': '#FDE68A',
        },
        difficulty: {
          easy: '#16A34A',
          'easy-bg': '#F0FDF4',
          medium: '#D97706',
          'medium-bg': '#FFFBEB',
          hard: '#DC2626',
          'hard-bg': '#FEF2F2',
        },
        // Heatmap single-hue ramp from accent
        heat: {
          0: '#EDEDEA',
          1: '#D4E2FF',
          2: '#93BAFF',
          3: '#4285FF',
          4: '#0052FF',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Geist Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.06)',
        dropdown: '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        modal: '0 20px 40px -10px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        card: '14px',
      },
    },
  },
  plugins: [],
}
