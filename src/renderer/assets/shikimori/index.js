const APIrequest = require('./lib/request')
const Auth = require('./lib/auth')
const Users = require('./lib/v1/users')
const Animes = require('./lib/v1/animes')
const Genres = require('./lib/v1/genres')
const User_rates = require('./lib/v2/user_rates')

class ShikimoriAPI {
  constructor () {
    // Shikimori links
    this.apilink = 'https://shikimori.me/api'
    this.authlink = 'https://shikimori.me/oauth'
    // Auth vars
    this.credentials = {
      redirecturi: 'urn:ietf:wg:oauth:2.0:oob',
      useragent: 'AniShip',
      access_token: null,
      refresh_token: null
    }
    // API functions
    this.request = new APIrequest(this)
    this.auth = new Auth(this)
    this.users = new Users(this)
    this.animes = new Animes(this)
    this.genres = new Genres(this)
    this.user_rates = new User_rates(this)
  }
}

module.exports = ShikimoriAPI
