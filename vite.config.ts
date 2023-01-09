import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => {
          return tag.startsWith('cyan-') ||
            tag.startsWith('cn-')
            // (return true, if it's a custom element)
        }
      }
    }
  }),
  VueI18nPlugin({
    include: resolve(dirname(fileURLToPath(import.meta.url)), './path/to/src/locales/**'),
  })]
})
