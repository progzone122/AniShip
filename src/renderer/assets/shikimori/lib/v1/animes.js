class Animes {
  constructor (obj) {
    this.shikimori = obj
  }

  // https://shikimori.me/api/doc/1.0/animes/index
  async list (obj) {
    return this.shikimori.request.get('animes', obj)
  }

  // https://shikimori.me/api/doc/1.0/animes/show.html
  async get (id) {
    return this.shikimori.request.get(`animes/${id}`)
  }

  // https://shikimori.me/api/doc/1.0/animes/roles.html
  async getRoles (id) {
    return this.shikimori.request.get(`animes/${id}/roles`)
  }

  // https://shikimori.me/api/doc/1.0/animes/similar.html
  async getSimiliar (id) {
    return this.shikimori.request.get(`animes/${id}/similar`)
  }

  // https://shikimori.me/api/doc/1.0/animes/related.html
  async getRelated (id) {
    return this.shikimori.request.get(`animes/${id}/related`)
  }

  // https://shikimori.me/api/doc/1.0/animes/screenshots.html
  async getScreenshots (id) {
    return this.shikimori.request.get(`animes/${id}/screenshots`)
  }

  // https://shikimori.me/api/doc/1.0/animes/franchise.html
  async getFranchise (id) {
    return this.shikimori.request.get(`animes/${id}/franchise`)
  }

  // https://shikimori.me/api/doc/1.0/animes/external_links.html
  async getExternalLinks (id) {
    return this.shikimori.request.get(`animes/${id}/external_links`)
  }

  // https://shikimori.me/api/doc/1.0/animes/topics.html
  async getTopics (id, obj) {
    return this.shikimori.request.get(`animes/${id}/topics`, obj)
  }

  // https://shikimori.me/api/doc/1.0/calendars
  async getCalendar () {
    return this.shikimori.request.get(`calendar`)
  }
}
module.exports = Animes
