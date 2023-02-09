const axios = require('axios')
const Shikimori = require('shikimori')
const shiki = new Shikimori()

export const state = () => ({
  indexTab_active: 0,
  favoritesTab_active: 0,
  ongoing: [],
  ranked_released: [],
  released: [],
  anons: [],
  watchSource_active: null,
  // favorites: {
  //   watching: null,
  //   planned: null,
  //   rewatching: null,
  //   completed: null,
  //   on_hold: null,
  //   dropped: null
  // }
})

export const mutations = {
  setOngoing (state, req) {
    state.ongoing = req
  },
  setRanked_released (state, req) {
    state.ranked_released = req
  },
  setReleased (state, req) {
    state.released = req
  },
  setAnons (state, req) {
    state.anons = req
  },
  /* */
  changeTab (state, req) {
    state.indexTab_active = req
  },
  changeFavoritesTab (state, req) {
    state.favoritesTab_active = req
  },
  /* */
  addOngoing (state, req) {
    state.ongoing.push(req)
  },
  addRanked_released (state, req) {
    state.ranked_released.push(req)
  },
  addReleased (state, req) {
    state.released.push(req)
  },
  addAnons (state, req) {
    state.anons.push(req)
  },
  // setFavorites (state, obj) {
  //   state.favorites[obj.key] = obj.value;
  // }
}