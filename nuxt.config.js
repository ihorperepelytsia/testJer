export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Jerold - ИИ для эффективного трейдинга",
    // htmlAttrs: {
    //   lang: 'en'
    // },
    // https://ribs.studio/Share.png
    meta: [
      { charset: "utf-8" },
      {
        hid: "og:title",
        property: "og:title",
        content: "Jerold - ИИ для эффективного трейдинга",
      },
      {
        hid: "og:description",
        property: "og:description",
        content:
          "Персональный помощник профессиональных трейдеров на базе ИИ и авторского научного подхода. Основан на принципах торговли Александра Герчика.",
      },
      { hid: "og:url", property: "og:url", content: "https://jerold.trading" },
      { hid: "og:type", property: "og:type", content: "website" },
      { hid: "og:image", property: "og:image", content: "/b2.jpg" },
      { hid: "og:image:width", property: "og:image:width", content: "1280" },
      { hid: "og:image:height", property: "og:image:height", content: "628" },
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: "summary_large_image",
      },
      { hid: "twitter:image", name: "twitter:image", content: "/b2.jpg" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Персональный помощник профессиональных трейдеров на базе ИИ и авторского научного подхода. Основан на принципах торговли Александра Герчика.",
      },
      { name: "format-detection", content: "telephone=no" },
      {
        name: "facebook-domain-verification",
        content: "gdzd3d3wg558ykmw5qsn05ovsoo9ge",
      },
    ],
    link: [
      { rel: "stylesheet", href: "/favicon.ico" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
    ],
    noscript: [
      {
        innerHTML:
          '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TH7XHRG" height="0" width="0" style="display:none;visibility:hidden"></iframe>',
        body: true,
      },
    ],
    __dangerouslyDisableSanitizers: ["noscript"],
  },
  ssr: true,
  // generate: {
  //   fallback: true,
  // },
  target: "static",
  serverMiddleware: [
    {
      path: "/.well-known/apple-developer-merchantid-domain-association",
      handler: "~/api/applePayKey.js",
    },
  ],

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/fonts.css", "~/assets/css/style.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/locomotiveScroll", ssr: false },
    { src: "~/plugins/youtube", ssr: false },
    { src: "plugins/renderBuble.js", mode: "client" },
    { src: "plugins/compare-image.js", mode: "client" },
    { src: "plugins/vee-validate.js" },
    { src: "plugins/notification.js", ssr: false },
    { src: "plugins/v-mask.js", ssr: false },
  ],

  styleResources: {
    scss: ["./assets/css/*.scss"],
    hoistUseStatements: true,
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      "nuxt-lazy-load",
      {
        directiveOnly: true,
        observerConfig: {
          rootMargin: "0px 0px 200px 0px",
        },
      },
    ],
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/style-resources",
    "@nuxtjs/gtm",
  ],
  env: {
    // base_url: "https://f728-91-201-247-195.eu.ngrok.io",
    baseUrl: "https://jerold-signal.space",
    stripe_test:
      "pk_test_51Kad65K2FoJO3pChxbTUfmfKBL9ztKwhBoIJdeJoz1IT46qcHXW0INVyGneycKrJ7XlFqRGxw20jdKpziLUzUmJT00ZvWBZ5fu",
    stripe_prod:
      "pk_live_51Kad65K2FoJO3pChEGWbT2SZfLZNKYmJJcIrqOpJLacTS9SyUjMKWSkdY8qlzUeG0jTWkrlTpT3TcG9DX80zWDbe00NnOywpms",
  },
  gtm: {
    id: "GTM-TH7XHRG",
    enabled: true,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: false,
    transpile: [({ isLegacy }) => isLegacy && "three", "vee-validate"],
  },
};
