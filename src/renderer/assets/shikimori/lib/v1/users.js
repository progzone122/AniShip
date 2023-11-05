class Users {
  constructor (obj) {
    this.shikimori = obj
  }

  // https://shikimori.me/api/doc/1.0/users/index.html
  async list (obj) {
    return this.shikimori.request.get('users', obj)
  }

  // https://shikimori.me/api/doc/1.0/users/show.html
  async get (id, isnickname) {
    return this.shikimori.request.get(`users/${id}`, { is_nickname: isnickname })
  }

  // https://shikimori.me/api/doc/1.0/users/info.html
  async getBriefInfo (id) {
    return this.shikimori.request.get(`users/${id}/info`)
  }

  // https://shikimori.me/api/doc/1.0/users/whoami.html
  async whoami () {
    return this.shikimori.request.get('users/whoami')
  }

  // https://shikimori.me/api/doc/1.0/users/sign_out.html
  async signOut () {
    return this.shikimori.request.get('users/sign_out')
  }

  // https://shikimori.me/api/doc/1.0/users/friends.html
  async getFriends (id) {
    return this.shikimori.request.get(`users/${id}/friends`)
  }

  // https://shikimori.me/api/doc/1.0/users/clubs.html
  async getClubs (id) {
    return this.shikimori.request.get(`users/${id}/clubs`)
  }

  // https://shikimori.me/api/doc/1.0/users/anime_rates.html
  async getAnimeRates (id, obj) {
    console.log(this.shikimori)
    return this.shikimori.request.get(`users/${id}/anime_rates`, obj)
  }

  // https://shikimori.me/api/doc/1.0/users/manga_rates.html
  async getMangaRates (id, obj) {
    return this.shikimori.request.get(`users/${id}/manga_rates`, obj)
  }

  // https://shikimori.me/api/doc/1.0/users/favourites.html
  async getFavourites (id) {
    return this.shikimori.request.get(`users/${id}/favourites`)
  }

  async getFavorites (id) {
    return this.getFavourites(id)
  }

  // https://shikimori.me/api/doc/1.0/users/messages.html
  async getMessages (id, obj) {
    return this.shikimori.request.get(`users/${id}/messages`, obj)
  }

  // https://shikimori.me/api/doc/1.0/users/unread_messages.html
  async getUnreadMsgCount (id) {
    return this.shikimori.request.get(`users/${id}/unread_messages`)
  }

  getUnreadMessagesCount = id => { return this.getUnreadMsgCount(id) }

  // https://shikimori.me/api/doc/1.0/users/history.html
  async getHistory (id, obj) {
    return this.shikimori.request.get(`users/${id}/history`, obj)
  }

  // https://shikimori.me/api/doc/1.0/users/bans.html
  async getBans (id) {
    return this.shikimori.request.get(`users/${id}/bans`, obj)
  }
}
module.exports = Users
