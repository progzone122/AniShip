/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */

module.exports = {
  ssr: false,
  target: 'static',
  head: {
    title: 'aniship-night',
    meta: [{ charset: 'utf-8' }]
  },
  loading: false,
  plugins: [
    { src: '@/plugins/icons.js', ssr: true },
    { src: '@/plugins/infiniteloading', ssr: false },
    { src: '@/plugins/nuxt-plyr', ssr: false }
  ],
  css: [
    'plyr/dist/plyr.css',
    '@/assets/css/overwrite.css',
    '@/assets/css/global.css'
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
    theme: {
      themes: {
        light: {
          primary: '#1867c0',
          secondary: '#b0bec5',
          accent: '#8c9eff',
          error: '#b71c1c'
        }
      }
    }
  }
}
