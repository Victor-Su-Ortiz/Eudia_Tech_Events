export const theme = {
  colors: {
    // Eudia brand colors from main website
    brand: {
      DEFAULT: '207 73% 50%', // Primary blue (#1675d1)
      light: '185 49% 87%', // Light blue background (#dffbfc)
      dark: '194 28% 31%', // Dark blue (#516c8e)
      foreground: '0 0% 100%',
      secondary: '17 74% 51%', // Orange CTA (#e5551b)
      tertiary: '8 100% 66%', // Coral accent (#ff8462)
    },
    // Accent colors for events and categories
    accent: {
      teal: '176 60% 40%', // #1ea5b7
      mint: '174 54% 70%', // #99e9e6
      coral: '12 100% 75%', // #ff8462
      purple: '271 81% 56%', // For AI/ML events
      green: '142 71% 45%', // For sustainability/biotech
    },
    // Text colors from Eudia design
    text: {
      primary: '195 41% 18%', // Primary text (#163340)
      secondary: '223 11% 14%', // Secondary text (#1b1c28)
      muted: '225 23% 60%', // Muted text (rgba(20,23,46,0.62))
      white: '0 0% 100%',
    },
    background: {
      light: '0 0% 100%', // White
      section: '222 55% 97%', // Gray-50 (#fafbff)
      card: '185 49% 95%', // Light blue (#ecf7fa)
      accent: '29 100% 94%', // Light orange (#fff5e7)
      dark: '222 47% 11%',
    },
    foreground: {
      light: '195 41% 18%', // #163340
      dark: '210 40% 98%',
    },
    card: {
      light: '0 0% 100%',
      hover: '185 49% 95%', // #ecf7fa
      dark: '222 47% 13%',
    },
    muted: {
      light: '210 40% 96.1%',
      dark: '217 33% 17%',
    },
    primary: {
      DEFAULT: '207 73% 50%', // #1675d1
      foreground: '0 0% 100%',
    },
    secondary: {
      light: '17 74% 51%', // #e5551b
      dark: '217 33% 17%',
    },
    border: {
      light: '214.3 31.8% 91.4%',
      dark: '217 33% 17%',
    },
  },
  fonts: {
    // Eudia font stack - matches main website
    euclid: [
      '"Euclid Square"',
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(', '),
    sans: [
      '"Euclid Square"',
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      '"Noto Sans"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      '"Noto Color Emoji"',
    ].join(', '),
    body: [
      '"Public Sans"',
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
    ].join(', '),
    mono: [
      'ui-monospace',
      'SFMono-Regular',
      '"SF Mono"',
      'Consolas',
      '"Liberation Mono"',
      'Menlo',
      'monospace',
    ].join(', '),
  },
  radius: {
    DEFAULT: '0.5rem',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.875rem', // 30px for buttons
    card: '1rem', // 16px for cards
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
    '3xl': '5rem',
    '4xl': '6rem',
    section: '6rem', // 96px for section padding
  },
  // Button and component spacing from Eudia
  components: {
    button: {
      paddingX: '1.5625rem', // 25px
      paddingY: '0.75rem', // 12px
      gap: '0.675rem', // 10.807px
      height: '3rem', // 48px
    },
    card: {
      padding: '1.875rem', // 30px
      gap: '1.5rem', // 24px
    },
    header: {
      height: '4rem', // 64px
      paddingX: '3rem', // 48px
    },
  },
  // Eudia design principles
  principles: {
    efficiency: 'Fast loading, intuitive navigation, minimal clicks',
    clarity: 'Clear typography, organized layout, accessible content',
    trust: 'Consistent design, accurate information, transparent sources',
    innovation: 'AI-powered legal solutions for modern teams',
  },
} as const
