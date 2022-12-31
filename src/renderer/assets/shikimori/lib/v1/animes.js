class Animes {
  constructor (obj) {
    this.shikimori = obj
  }

  // https://shikimori.one/api/doc/1.0/animes/index
  async list (obj) {
    return this.shikimori.request.get('animes', obj)
  }

  // https://shikimori.one/api/doc/1.0/animes/show.html
  async get (id) {
    return this.shikimori.request.get(`animes/${id}`)
  }

  // https://shikimori.one/api/doc/1.0/animes/roles.html
  async getRoles (id) {
    return this.shikimori.request.get(`animes/${id}/roles`)
  }

  // https://shikimori.one/api/doc/1.0/animes/similar.html
  async getSimiliar (id) {
    return this.shikimori.request.get(`animes/${id}/similar`)
  }

  // https://shikimori.one/api/doc/1.0/animes/related.html
  async getRelated (id) {
    return this.shikimori.request.get(`animes/${id}/related`)
  }

  // https://shikimori.one/api/doc/1.0/animes/screenshots.html
  async getScreenshots (id) {
    return this.shikimori.request.get(`animes/${id}/screenshots`)
  }

  // https://shikimori.one/api/doc/1.0/animes/franchise.html
  async getFranchise (id) {
    return this.shikimori.request.get(`animes/${id}/franchise`)
  }

  // https://shikimori.one/api/doc/1.0/animes/external_links.html
  async getExternalLinks (id) {
    return this.shikimori.request.get(`animes/${id}/external_links`)
  }

  // https://shikimori.one/api/doc/1.0/animes/topics.html
  async getTopics (id, obj) {
    return this.shikimori.request.get(`animes/${id}/topics`, obj)
  }
}
module.exports = Animes
