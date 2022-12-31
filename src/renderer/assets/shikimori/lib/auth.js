const needle = require('needle')
const axios = require('axios')

class Auth {
  constructor (obj) {
    this.shikimori = obj
  }

  async login (obj) {
    if (Object.keys(obj).length !== 0) {
      return axios.post(`${this.shikimori.authlink}/token`, {
        grant_type: 'authorization_code',
        client_id: obj.clientid,
        client_secret: obj.clientsecret,
        code: obj.authcode,
        redirect_uri: (obj.redirecturi || this.shikimori.credentials.redirecturi)
      }, {
        headers: {
          'user-agent': `${obj.useragent ? `User-Agent: ${obj.useragent}` : null}`
        }
      }).then(res => {
        if (['www-authenticate'] in res.headers) throw new Error(res.headers['www-authenticate'])

        this.shikimori.credentials.access_token = res.data.access_token
        this.shikimori.credentials.refresh_token = res.data.refresh_token
        this.shikimori.credentials.useragent = obj.useragent

        return {
          accesstoken: res.data.access_token,
          refreshtoken: res.data.refresh_token,
          createdat: res.data.created_at,
          tokenexpiresin: res.data.expires_in,
          scope: res.data.scope
        }
      })
    } else {
      return {}
    }
  }

  async refreshToken (obj) {
    return axios.post(`${this.shikimori.authlink}/token`, {
      grant_type: 'refresh_token',
      client_id: obj.clientid,
      client_secret: obj.clientsecret,
      refresh_token: obj.refreshtoken
    }, {
      headers: {
        'user-agent': `${obj.useragent ? `User-Agent: ${obj.useragent}` : null}`
      }
    }).then(res => {
      this.shikimori.credentials.access_token = res.data.access_token
      this.shikimori.credentials.refresh_token = res.data.refresh_token
      this.shikimori.credentials.useragent = obj.useragent

      return {
        accesstoken: res.data.access_token,
        refreshtoken: res.data.refresh_token,
        createdat: res.data.created_at
      }
    })
  }
}

module.exports = Auth
