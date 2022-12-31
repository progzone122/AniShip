const axios = require('axios')
const Shikimori = require('~/assets/shikimori')
const shiki = new Shikimori()
export const state = () => ({
  account: null
})

export const mutations = {
  setAccount (state, object) {
    state.account = object
  },
  setShikiAnime (state, object) {
    state.shiki_anime = object
  }
}

export const getters = {
  account (state) {
    return state.account
  }
}

export const actions = {
  //
  async fetchShikimoriAuth ({ state }) {
    await shiki.auth.login({
      clientid: '2Ajm5Jmvf2kGKEDlilk2Pka85p2b57H4VTYS6qvWc9w',
      clientsecret: 'YDg7tpBhQBGAUFY9zZbU89sL6kF9mtJztERjTWtNi6o',
      authcode: req.query.code,
      useragent: 'AniShip', // only name of your app
      redirecturi: 'urn:ietf:wg:oauth:2.0:oob' // optional: 'urn:ietf:wg:oauth:2.0:oob' by default
    })
    // return resp.data
  },
  async fetchRefreshAuth ({ state }, refreshtoken) {
    return shiki.auth.refreshToken({
      clientid: '2Ajm5Jmvf2kGKEDlilk2Pka85p2b57H4VTYS6qvWc9w',
      clientsecret: 'YDg7tpBhQBGAUFY9zZbU89sL6kF9mtJztERjTWtNi6o',
      refreshtoken,
      useragent: 'AniShip' // only name of your app
    }).then(res => {
      return res
    })
  },
  async fetchProfile ({ state }, accesstoken) {
    console.log(accesstoken)
    const resp = await shiki.users.whoami({
      useragent: 'AniShip',
      accesstoken
    })
    if (accesstoken !== null && accesstoken !== undefined && typeof accesstoken !== 'object') {
      this.commit('setAccount', resp)
    }
    return resp
  }
}
