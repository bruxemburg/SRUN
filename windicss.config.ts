import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['**/*.{vue,html,jsx,tsx,ts}'],
    exclude: ['node_modules', '.git', 'excluded', 'dist', 'windi.config.{ts,js}', 'tailwind.config.{ts,js}'],
  },
  theme: {
    colors: {
      white: '#FFFFFF',
      black: {
        100: '#1B1B1E',
        75: '#545456',
        60: '#767678',
        25: '#C5C5C6',
        15: '#DDDDDD',
        5: '#F3F3F3',
      },
      blue: {
        100: '#2274A5',
        25: '#C7DCE8',
      },
      red: {
        100: '#D64045',
        25: '#FCD4CA',
      },
      green: {
        100: '#62C370',
        25: '#D7F0DB',
      },
      yellow: {
        100: '#F5BE2C',
        25: '#FDEFCA',
      },
    },
    fontSize: {
      'xs': '1em',
      'sm': '1.125em',
      'base': '1.25em',
      'lg': '1.5em',
      'xl': '2.25em',
      '2xl': '2.625em',
      '3xl': '3em',
    },
    fontFamily: {
      sans: 'Euclid Circular A',
    },
    // not necessary but still
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    letterSpacing: {
      normal: '-0.08em',
      // character spacing -40
      wide: '-0.04em',
    },
    lineHeight: {
      normal: '1.25em',
    },
  },
})
