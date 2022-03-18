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
        25: '#F5BE2C',
      },
    },
  },
})
