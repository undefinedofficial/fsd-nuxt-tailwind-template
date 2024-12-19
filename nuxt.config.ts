import { fileURLToPath, URL } from "node:url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  ssr: true,
  srcDir: "src/",

  alias: {
    "@": fileURLToPath(new URL("./src", import.meta.url)),
    app: fileURLToPath(new URL("./src/01-app", import.meta.url)),
    processes: fileURLToPath(new URL("./src/02-processes", import.meta.url)),
    pages: fileURLToPath(new URL("./src/03-pages", import.meta.url)),
    widgets: fileURLToPath(new URL("./src/04-widgets", import.meta.url)),
    features: fileURLToPath(new URL("./src/05-features", import.meta.url)),
    entities: fileURLToPath(new URL("./src/06-entities", import.meta.url)),
    shared: fileURLToPath(new URL("./src/07-shared", import.meta.url)),
    assets: fileURLToPath(new URL("./src/07-shared/assets", import.meta.url)),
  },

  dir: {
    public: "../public",
    app: "01-app",
    layouts: "01-app/layouts",
    pages: "03-pages",
    assets: "07-shared/assets",
  },

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      titleTemplate: "Nuxt template ‣ %s",
      title: "Nuxt template",
      link: [{ rel: "icon", type: "image/png", href: "/favicon.ico" }],
      meta: [
        {
          name: "description",
          content: "nuxt-template",
        },
        { name: "keywords", content: "" },
        { name: "robots", content: "index, follow" },
        { name: "mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "application-name", content: "nuxt-template" },
        { name: "apple-mobile-web-app-title", content: "nuxt-template" },
        { name: "msapplication-starturl", content: "/" },
      ],
    },
  },

  experimental: {
    payloadExtraction: true,
    watcher: "parcel", // for higher performance
  },
  typescript: {
    // typeCheck: true,
  },

  modules: ["@vite-pwa/nuxt", "@nuxtjs/tailwindcss"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ["./src/01-app/styles/main.scss"],

  pwa: {
    /* PWA options */
    registerType: "prompt",
    injectRegister: "inline",

    // HERE! For custom service worker
    strategies: "injectManifest",
    srcDir: "../workers",
    filename: "sw.ts",

    injectManifest: {
      globPatterns: [
        "**/*.{js,css,html,png,svg,ico,json,jpg,gif,webp,mp4,webm,ogg,mp3,woff,woff2,txt,wav}",
      ],
      globDirectory: ".output/public",
    },
    pwaAssets: {
      injectThemeColor: true,
      includeHtmlHeadLinks: true,
      overrideManifestIcons: true,
      disabled: false,
      config: true,
      preset: {
        transparent: {
          sizes: [48, 72, 96, 144, 192, 256, 384, 512], // Comprehensive sizes for various Android devices
          favicons: [
            [16, "favicon-16x16.png"],
            [32, "favicon-32x32.png"],
            [48, "favicon.ico"],
          ],
        },
        maskable: {
          sizes: [192, 512], // Recommended sizes for maskable icons
          padding: 0,
        },
        apple: {
          sizes: [120, 152, 167, 180, 1024], // Covers iPad and iPhone touch icons plus one for the App Store
        },
      },
      image: "../public/static/icons/chesswood-app.svg",
      htmlPreset: "2023",
      integration: { outDir: "dist" },
    },
    workbox: {
      disableDevLogs: !import.meta.dev,
      cleanupOutdatedCaches: false,
      globPatterns: [
        "**/*.{js,css,html,png,svg,ico,json,jpg,gif,webp,mp4,webm,ogg,mp3,woff,woff2,txt,wav}",
      ],
      globDirectory: ".output/public",
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: "CacheFirst",
          options: {
            cacheName: "google-fonts-cache",
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
          handler: "CacheFirst",
          options: {
            cacheName: "gstatic-fonts-cache",
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
    manifest: {
      name: "nuxt-template",
      short_name: "nuxt-template",

      start_url: "/",
      display: "standalone",
      display_override: ["window-controls-overlay", "standalone", "fullscreen", "minimal-ui"],
      orientation: "portrait-primary",
      theme_color: "#42b883",
      background_color: "#ffffff",

      lang: "ru",
      screenshots: [],
      shortcuts: [],
      protocol_handlers: [],
      file_handlers: [],
      icons: [],
    },
    devOptions: { enabled: true, suppressWarnings: false, type: "module" },
  },
  compatibilityDate: "2024-12-17",
});
