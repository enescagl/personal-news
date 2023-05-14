// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    https: false,
    host: `0.0.0.0`,
    port: 80,
  },
  css: ["~/assets/css/tailwind.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
      hmr: {
        protocol: "wss",
        port: 80,
        clientPort: 443,
      },
    },
  },
});
