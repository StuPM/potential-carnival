import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import ui from "@nuxt/ui/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ["search"].includes(tag),
        },
      },
    }),
    // Nuxt UI - components, icons and theme. Colours are Tailwind palette names
    ui({
      ui: {
        colors: {
          primary: "orange",
          neutral: "stone",
        },
      },
    }),
  ],
  server: {
    // port: 8088,
    cors: false,
    open: true,
  },
});
