// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: ['@element-plus/nuxt'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})
