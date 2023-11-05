const axios = require('axios')
const Shikimori = require('shikimori')
const shiki = new Shikimori()

export const state = () => ({
  shikimori_info: null,
  franchise: null
})

export const mutations = {
  setShikimori_info (state, req) {
    state.shikimori_info = req
  },
  setFranchise (state, req) {
    state.franchise = req
  }
}

export const getters = {
  getFranchise (state) {
    return state.franchise ?? null
  },
  getGenres (state) {
    return state.shikimori_info.genres ?? null
  },
  getEpisodes (state) {
    return {
      episodes: state.shikimori_info.episodes ?? 0,
      episodes_aired: state.shikimori_info.episodes_aired ?? 0,
      next_episode_at: state.shikimori_info.next_episode_at ?? null
    }
  }
}
