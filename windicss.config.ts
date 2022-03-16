import { defineConfig } from 'windicss/helpers'

export default defineConfig({
    extract: {
        include: ['**/*.{vue,html,jsx,tsx,ts}'],
        exclude: ['node_modules', '.git', 'excluded', 'dist', 'windi.config.{ts,js}', 'tailwind.config.{ts,js}'],
    },
    theme: {
        colors: {
            teal: {
                100: '#096',
              },
        }
    }
});