import Vue from 'vue'
import VuePlyr from 'vue-plyr'

Vue.use(VuePlyr, {
  plyr: {
    fullscreen: { enabled: false }
  },
  emit: ['ended']
})
