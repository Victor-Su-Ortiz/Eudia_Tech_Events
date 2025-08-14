import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: 'hsl(var(--brand))',
          light: 'hsl(var(--brand-light))',
          dark: 'hsl(var(--brand-dark))',
          secondary: 'hsl(var(--brand-secondary))',
          tertiary: 'hsl(var(--brand-tertiary))',
          foreground: 'hsl(var(--brand-foreground))',
        },
        eudia: {
          primary: '#1675d1',
          'primary-dark': '#1261b8',
          secondary: '#e5551b',
          'secondary-dark': '#d14411',
          text: '#163340',
          'text-muted': 'rgba(20,23,46,0.62)',
          'bg-light': '#ecf7fa',
          'bg-section': '#fafbff',
          'bg-card': '#ecf7fa',
          'bg-warm': '#fff5e7',
          'bg-mint': '#dffbfc',
          teal: '#1ea5b7',
          mint: '#99e9e6',
          coral: '#ff8462',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: '16px',
        '2xl': '20px',
        '3xl': '30px',
        card: '16px',
        button: '30px',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        euclid: ['"Euclid Square"', 'Inter', ...fontFamily.sans],
        public: ['"Public Sans"', 'Inter', ...fontFamily.sans],
      },
      fontSize: {
        'heading-1': ['85px', { lineHeight: '1', letterSpacing: '-1.7px' }],
        'heading-2': ['50px', { lineHeight: '1.2', letterSpacing: '-1px' }],
        'heading-3': ['40px', { lineHeight: '1.2', letterSpacing: '-0.2px' }],
        'heading-4': ['25px', { lineHeight: '1.2', letterSpacing: '-0.125px' }],
        'heading-5': ['24px', { lineHeight: '1.2', letterSpacing: '-0.1px' }],
        'body-large': ['24px', { lineHeight: '32px', letterSpacing: '-0.12px' }],
        body: ['18px', { lineHeight: '22.4px', letterSpacing: '-0.1px' }],
        button: ['15.44px', { lineHeight: '18.53px' }],
        'button-large': ['20px', { lineHeight: '24px' }],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '25': '6.25rem',
        '30': '7.5rem',
        section: '96px',
        'button-x': '25px',
        'button-y': '12px',
        card: '30px',
      },
      boxShadow: {
        eudia: '0 4px 20px rgba(22, 51, 64, 0.08)',
        'eudia-hover': '0 8px 30px rgba(22, 51, 64, 0.12)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
