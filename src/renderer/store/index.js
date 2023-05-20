const axios = require('axios')
const Shikimori = require('~/assets/shikimori')
const shiki = new Shikimori()
export const state = () => ({
  account: null
})

export const mutations = {
  setAccount(state, object) {
    state.account = object
  },
  setShikiAnime(state, object) {
    state.shiki_anime = object
  }
}

export const getters = {
  account(state) {
    return state.account
  }
}

export const actions = {
  //
  async fetchShikimoriAuth({ state }) {
    await shiki.auth.login({
      authcode: req.query.code,
    })
    // return resp.data
  },
  async fetchRefreshAuth({ state }, refreshtoken) {
    return shiki.auth.refreshToken({
      refreshtoken,
    }).then(res => {
      return res
    })
  },
  async fetchProfile({ state }, accesstoken) {
    console.log(accesstoken)
    const resp = await shiki.users.whoami({
      accesstoken
    })
    if (accesstoken !== null && accesstoken !== undefined && typeof accesstoken !== 'object') {
      this.commit('setAccount', resp)
    }
    return resp
  }
}
