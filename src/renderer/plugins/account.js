const axios = require('axios')
const Shikimori = require('shikimori')
const shiki = new Shikimori()

export default function (context) {
  const refreshtoken = localStorage.getItem('refresh_token') ?? null
  if (refreshtoken !== null) {
    shiki.auth.refreshToken({
      refreshtoken
    }).then(res => {
      console.log(res)
      localStorage.setItem('access_token', res.accesstoken)
      localStorage.setItem('refresh_token', res.refreshtoken)
      shiki.users.whoami({
        accesstoken: res.accesstoken
      }).then(res2 => {
        if (res.accesstoken !== null && res.accesstoken !== undefined && typeof res.accesstoken !== 'object') {
          context.store.commit('setAccount', res2)
        }
      })
    })
  }
}
