import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import WindiCSS from 'vite-plugin-windicss'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    icons({ 
      compiler: 'vue3',
      customCollections:{
        'edge': FileSystemIconLoader(
          './src/assets/icons/edge',
          svg => svg.replace(/^<svg /, '<svg fill="currentColor" ')
          )
      } 
    }),
    WindiCSS({
      onOptionsResolved: (options) => {
        options.scanOptions.extraTransformTargets.css.push(join(__dirname, 'excluded', 'included.css'))
      },
    })
  ],
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`
    }
  }
})
