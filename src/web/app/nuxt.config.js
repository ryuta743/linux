const colors = require('vuetify/es5/util/colors').default

module.exports = {
  mode: 'universal',

  serverMiddleware: [
    '~/api/index.js',
  ],


  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#'
    },
    titleTemplate: '%s - HackmdBase',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'theme-color',
        content: '#212121'
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes'
      },
      /* { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }, */
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'メイドインジャパンの工芸品が工房から直接帰るショッピングサイト！'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: '天職'
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://hackmdbase-fire.herokuapp.com'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: '天職'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'メイドインジャパンの工芸品が工房から直接帰るショッピングサイト！'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://hackmdbase-fire.herokuapp.com/img/hackmdbase2.png'
      },
      {
        property: 'fb:app_id',
        content: '373239600269292'
      },
      {
        name: 'twitter:card',
        content: 'summary'
      },
      {
        name: 'twitter:site',
        content: '@aspirational_ta'
      },
      {
        name: 'twitter:title',
        content: '天職'
      },
      {
        name: 'twitter:description',
        content: 'メイドインジャパンの工芸品が工房から直接帰るショッピングサイト！'
      },
      {
        name: 'twitter:image',
        content: 'https://hackmdbase-fire.herokuapp.com/img/hackmdbase2.png'
      },
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/earlyaccess/hannari.css'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Sawarabi+Mincho'
      },
      {
        rel: 'apple-touch-icon',
        href: 'https://hackmdbase-fire.herokuapp.com/img/hackmdbase-app.png'
      },
      {
        rel: 'manifest',
        href: 'manifest.json'
      },
      //https://fonts.googleapis.com/css?family=Sawarabi+Mincho
      //<link href="https://fonts.googleapis.com/earlyaccess/hannari.css" rel="stylesheet">
      //<link href="https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c&display=swap" rel="stylesheet">
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/mixin-common-methods',
    '~/plugins/chart.js',
    '~/plugins/bar_chart.js',
    '~/plugins/v-lazy-image.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true
  },

  proxy: {
    '/api-account': {
      target: 'http://express-account-service.default.svc.cluster.local',
      pathRewrite: {
        '^/api-account': '/'
      }
    },
    '/api-buy': {
      target: 'http://express-buy-service.default.svc.cluster.local',
      pathRewrite: {
        '^/api-buy': '/'
      }
    },
    '/api-cart': {
      target: 'http://express-cart-service.default.svc.cluster.local',
      pathRewrite: {
        '^/api-cart': '/'
      }
    },
    '/api-buy': {
      target: 'http://express-contact-service.default.svc.cluster.local',
      pathRewrite: {
        '^/api-contact': '/'
      }
    },
    '/api-linebot': {
      target: 'http://express-linebot-service.default.svc.cluster.local',
      pathRewrite: {
        '^/api-linebot': '/'
      }
    },
    '/api-product': {
      target: 'http://express-product-service.default.svc.cluster.local',
      pathRewrite: {
        '^/api-product': '/'
      }
    },
    '/api-review': {
      target: 'http://express-review-service.default.svc.cluster.local',
      pathRewrite: {
        '^/api-review': '/'
      }
    },
    '/api-users': {
      target: 'http://express-users-service.default.svc.cluster.local',
      pathRewrite: {
        '^/api-users': '/'
      }
    },
    '/api-workshop': {
      target: 'http://express-ws-service.default.svc.cluster.local',
      pathRewrite: {
        '^/api-workshop': '/'
      }
    },
    '/api-workshopManage': {
      target: 'http://express-wsm-service.default.svc.cluster.local',
      pathRewrite: {
        '^/api-workshopManage': '/'
      }
    },
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
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
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}