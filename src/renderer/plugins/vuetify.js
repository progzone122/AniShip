// 900

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import('roboto-fontface/css/roboto/roboto-fontface.css')
import('roboto-fontface/fonts/roboto/Roboto-Thin.woff2') // 100
import('roboto-fontface/fonts/roboto/Roboto-Light.woff2') // 300
import('roboto-fontface/fonts/roboto/Roboto-Regular.woff2') // 400
import('roboto-fontface/fonts/roboto/Roboto-Medium.woff2') // 500
import('roboto-fontface/fonts/roboto/Roboto-Bold.woff2') // 700
import('roboto-fontface/fonts/roboto/Roboto-Black.woff2')

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: true,
    customVariables: ['@/assets/variables.scss'],
    treeShake: true,
    themes: {
      dark: {
        primary: '#1A171E',
        secondary: '#424242',
        accent: '#EB1C24',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
        background: '#0D0D0F',
        watch: '#EB1C24'
      }
    }
  }
})
