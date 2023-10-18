// vite.config.ts
import { defineConfig } from "file:///Users/vtak/Dev/pelilauta-next/node_modules/.pnpm/vite@4.4.7_sass@1.64.1/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/vtak/Dev/pelilauta-next/node_modules/.pnpm/@vitejs+plugin-vue@4.2.3_vite@4.4.7+vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import VueI18nPlugin from "file:///Users/vtak/Dev/pelilauta-next/node_modules/.pnpm/@intlify+unplugin-vue-i18n@0.12.2_vue-i18n@9.2.2/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "url";
var __vite_injected_original_import_meta_url = "file:///Users/vtak/Dev/pelilauta-next/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => {
            return tag.startsWith("cyan-") || tag.startsWith("cn-");
          }
        }
      }
    }),
    VueI18nPlugin({
      include: resolve(dirname(fileURLToPath(__vite_injected_original_import_meta_url)), "./path/to/src/locales/**")
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdnRhay9EZXYvcGVsaWxhdXRhLW5leHRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy92dGFrL0Rldi9wZWxpbGF1dGEtbmV4dC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvdnRhay9EZXYvcGVsaWxhdXRhLW5leHQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgVnVlSTE4blBsdWdpbiBmcm9tICdAaW50bGlmeS91bnBsdWdpbi12dWUtaTE4bi92aXRlJ1xuaW1wb3J0IHsgcmVzb2x2ZSwgZGlybmFtZSB9IGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICd1cmwnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbdnVlKHtcbiAgICB0ZW1wbGF0ZToge1xuICAgICAgY29tcGlsZXJPcHRpb25zOiB7XG4gICAgICAgIGlzQ3VzdG9tRWxlbWVudDogKHRhZykgPT4ge1xuICAgICAgICAgIHJldHVybiB0YWcuc3RhcnRzV2l0aCgnY3lhbi0nKSB8fFxuICAgICAgICAgICAgdGFnLnN0YXJ0c1dpdGgoJ2NuLScpXG4gICAgICAgICAgICAvLyAocmV0dXJuIHRydWUsIGlmIGl0J3MgYSBjdXN0b20gZWxlbWVudClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSksXG4gIFZ1ZUkxOG5QbHVnaW4oe1xuICAgIGluY2x1ZGU6IHJlc29sdmUoZGlybmFtZShmaWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybCkpLCAnLi9wYXRoL3RvL3NyYy9sb2NhbGVzLyoqJyksXG4gIH0pXVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFEsU0FBUyxvQkFBb0I7QUFDelMsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sbUJBQW1CO0FBQzFCLFNBQVMsU0FBUyxlQUFlO0FBQ2pDLFNBQVMscUJBQXFCO0FBSnNJLElBQU0sMkNBQTJDO0FBT3JOLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUFDLElBQUk7QUFBQSxNQUNaLFVBQVU7QUFBQSxRQUNSLGlCQUFpQjtBQUFBLFVBQ2YsaUJBQWlCLENBQUMsUUFBUTtBQUN4QixtQkFBTyxJQUFJLFdBQVcsT0FBTyxLQUMzQixJQUFJLFdBQVcsS0FBSztBQUFBLFVBRXhCO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELGNBQWM7QUFBQSxNQUNaLFNBQVMsUUFBUSxRQUFRLGNBQWMsd0NBQWUsQ0FBQyxHQUFHLDBCQUEwQjtBQUFBLElBQ3RGLENBQUM7QUFBQSxFQUFDO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
