/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */

module.exports = {
  ssr: false,
  target: 'static',
  head: {
    title: 'AniShip',
    meta: [{ charset: 'utf-8' }]
  },
  css: [
    "~assets/css/videojs.css",
    '~assets/css/global.scss'
  ],
  loading: false,
  plugins: [
    { src: '~/plugins/vue-infinite-loading', ssr: false }
  ],
  buildModules: [
  ],
  modules: [
    'bootstrap-vue/nuxt',
  ],
  bootstrapVue: {
    icons: true
  }
}
