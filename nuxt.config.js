import colors from "vuetify/es5/util/colors";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - nuxt-app",
    title: "nuxt-app",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~assets/scss/main.scss",
    "@fortawesome/fontawesome-svg-core/styles.css",
    "@fortawesome/fontawesome-free/css/all.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/vuelidate" },
    { src: "~plugins/localStorage", ssr: false },
    { src: "~plugins/sweetAlert" },
    { src: "~/plugins/aos", ssr: false },
    "~/plugins/fontawesome.js",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "@nuxtjs/fontawesome",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    // https://go.nuxtjs.dev/content
    "@nuxt/content",
    "@nuxtjs/auth-next",
    "@nuxtjs/i18n",
    "bootstrap-vue/nuxt",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "http://amlak.softgatesdemo.com/api/",
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
      name: "Reda-website",
      short_name: "Reda-website",
      display: "standalone",
      theme_color: "#00BB7E",
    },
    // icon: {
    //   source: 'static/images/fonders-logo.png',
    //   fileName: 'fonders-logo.png'
    // },
  },
  i18n: {
    locales: [
      {
        name: "عربي",
        code: "ar",
        iso: "ar-AR",
        file: "ar.json",
      },
      {
        name: "english",
        code: "en",
        iso: "en-US",
        file: "en.json",
      },
    ],
    defaultLocale: "en",
    seo: true,
    lazy: true,
    langDir: "lang/",
    vueI18n: {
      fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
      messages: {
        ar: {
          welcome: "مرحباً",
        },
        en: {
          welcome: "welcome",
        },
      },
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/scss/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  auth: {
    redirect: {
      login: "auth/login",
      logout: "/",
      callback: "auth/login",
      home: "/",
    },
    strategies: {
      local: {
        token: {
          property: "token",
          required: true,
          type: "Bearer",
        },
        user: {
          property: false, // here should be `false`, as you defined in user endpoint `propertyName`
          autoFetch: true,
        },
        endpoints: {
          login: { url: "auth/login", method: "post" },
          logout: { url: "logout", method: "get" },
          user: { url: "user", method: "get" },
        },
        // tokenRequired: true,
        // tokenType: '',
      },
    },
  },
  loading: {
    color: "#00BB7E",
    failedColor: "#FF4949",
    height: "6px",
  },

  fontawesome: {
    icons: {
      solid: true,
      regular: true,
      brands: true,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
