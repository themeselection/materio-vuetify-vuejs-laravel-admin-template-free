import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vuetify from 'vite-plugin-vuetify'
import laravel from 'laravel-vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    laravel({
  input: ['resources/ts/main.ts'],
  refresh: true,
}),
    vue({
  template: {
      transformAssetUrls: {
          base: null,
          includeAbsolute: false,
      },
  },
}),
    vueJsx(),

    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      styles: {
        configFile: 'resources/styles/variables/_vuetify.scss',
      },
    }),
    Components({
      dirs: ['resources/ts/@core/components'],
      dts: true,
    }),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core', '@vueuse/math', 'pinia'],
      vueTemplate: true,
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@core-scss': fileURLToPath(new URL('./resources/styles/@core', import.meta.url)),
      '@': fileURLToPath(new URL('./resources/ts', import.meta.url)),
      '@core': fileURLToPath(new URL('./resources/ts/@core', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./resources/ts/@layouts', import.meta.url)),
      '@images': fileURLToPath(new URL('./resources/images/', import.meta.url)),
      '@styles': fileURLToPath(new URL('./resources/styles/', import.meta.url)),
      '@configured-variables': fileURLToPath(new URL('./resources/styles/variables/_template.scss', import.meta.url)),
      '@axios': fileURLToPath(new URL('./resources/ts/plugins/axios', import.meta.url)),
      'apexcharts': fileURLToPath(new URL('node_modules/apexcharts-clevision', import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 5000,
  },
  optimizeDeps: {
    exclude: ['vuetify'],
    entries: [
      './resources/ts/**/*.vue',
    ],
  },
})
