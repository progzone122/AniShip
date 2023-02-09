/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */
const { getAppDataPath } = require('appdata-path')

module.exports = {
  ssr: false,
  target: 'static',
  head: {
    title: 'aniship-night',
    meta: [{ charset: 'utf-8' }]
  },
  alias: {
    sources: `${getAppDataPath('aniship-night')}/sources`,
    shikimori: '@/assets/shikimori/index.js'
  },
  loading: false,
  plugins: [
    { src: '@/plugins/vuetify.js', ssr: true },
    { src: '@/plugins/icons.js', ssr: true },
    { src: '@/plugins/infiniteloading', ssr: false },
    { src: '@/plugins/nuxt-plyr', ssr: false },
    { src: '@/plugins/animes.js', ssr: false },
    { src: '@/plugins/account.js', ssr: true }
  ],
  css: [
    'plyr/dist/plyr.css',
    '@/assets/css/overwrite.css',
    '@/assets/css/global.css',
  ],
  components: true,
  buildModules: [

  ],
  // axios: {
  //   // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
  //   baseURL: 'http://localhost:3033/',
  //   ssr: false
  // },
  modules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/axios'
  ],
  vuetify: {
    customVariables: ['@/assets/variables.scss'],
    treeShake: true,
    // dark: true,
    options: {
      customProperties: true
    },
    // theme: {
    //   dark: {
    //     primary: '#2196F3',
    //     secondary: '#424242',
    //     accent: '#FF4081',
    //     error: '#FF5252',
    //     info: '#2196F3',
    //     success: '#4CAF50',
    //     warning: '#FB8C00'
    //   }
    // }
    // theme: {
    //   dark: true,
    //   themes: {
    //     dark: {
    //       primary: '#0D0D0F',
    //       accent: '#EB1C24',
    //       // secondary: '#b0bec5',
    //       accent: '#8c9eff',
    //       error: '#b71c1c',
    //       background: '#0D0D0F'
    //     }
    //   }
    // }
  }
}
