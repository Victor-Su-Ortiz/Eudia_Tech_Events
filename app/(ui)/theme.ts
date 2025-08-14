export const theme = {
  colors: {
    brand: {
      DEFAULT: '220 86% 56%', // Eudia blue
      foreground: '0 0% 100%',
    },
    background: {
      light: '0 0% 100%',
      dark: '222 47% 11%',
    },
    foreground: {
      light: '222 47% 11%',
      dark: '210 40% 98%',
    },
    card: {
      light: '0 0% 100%',
      dark: '222 47% 13%',
    },
    muted: {
      light: '210 40% 96%',
      dark: '217 33% 17%',
    },
    accent: {
      light: '210 40% 96%',
      dark: '217 33% 17%',
    },
    primary: {
      DEFAULT: '220 86% 56%',
      foreground: '0 0% 100%',
    },
    secondary: {
      light: '210 40% 96%',
      dark: '217 33% 17%',
    },
    border: {
      light: '214 32% 91%',
      dark: '217 33% 17%',
    },
  },
  fonts: {
    sans: [
      'system-ui',
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
  },
} as const
