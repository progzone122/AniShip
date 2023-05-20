const needle = require('needle')
const axios = require('axios')

class Auth {
  constructor (obj) {
    this.shikimori = obj
    this.clientid = this.shikimori.clientid;
    this.clientsecret = this.shikimori.clientsecret;
    this.useragent = this.shikimori.credentials.useragent;
  }

  async login (obj) {
    console.log(obj)
    if (Object.keys(obj).length !== 0) {
      return axios.post(`${this.shikimori.authlink}/token`, {
        grant_type: 'authorization_code',
        client_id: this.clientid,
        client_secret: this.clientsecret,
        code: obj.authcode,
        redirect_uri: this.shikimori.credentials.redirecturi
      }, {
        headers: {
          'user-agent': this.useragent
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
      client_id: this.clientid,
      client_secret: this.clientsecret,
      refresh_token: obj.refreshtoken
    }, {
      headers: {
        'user-agent': this.useragent
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
