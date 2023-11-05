const axios = require('axios')
const Shikimori = require('shikimori')
const shiki = new Shikimori()

export const state = () => ({
  animes: [
    'asdasd'
  ]
})

export const mutations = {
  setOngoingsCalendar (state, obj) {
    state.animes = obj
  }
}
