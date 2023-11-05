// const Shikimori = require('shikimori-api-node')
// const shiki = new Shikimori()
const axios = require('axios')

const apilink = 'https://shikimori.me/api'
class User_rates {
  constructor (obj) {
    this.shikimori = obj
  }

  // https://shikimori.me/api/doc/2.0/user_rates/show.html
  async get (obj) {
    return this.shikimori.request.get('v2/user_rates', obj)
    // return this.shikimori.request.get(`v2/user_rates/${id}`);
  }

  // https://shikimori.me/api/doc/2.0/user_rates/index.html
  async list (obj) {
    return this.shikimori.request.get('v2/user_rates', obj)
  }

  async anime_list (id, obj) {
    return this.shikimori.request.get(`users/${id}/anime_rates`, obj)
  }

  // https://shikimori.me/api/doc/2.0/user_rates/create.html
  async create (obj) {
    return this.shikimori.request.post('v2/user_rates', obj)
  }

  // https://shikimori.me/api/doc/2.0/user_rates/update.html
  async update (id, obj) {
    return this.shikimori.request.put('v2/user_rates', id, obj)
  }

  // https://shikimori.me/api/doc/2.0/user_rates/increment.html
  async increment (id) {
    return this.shikimori.request.post(`v2/user_rates/${id}/increment`)
  }

  // https://shikimori.me/api/doc/2.0/user_rates/destroy.html
  async destroy (id) {
    return this.shikimori.request.delete('v2/user_rates', id)
  }
}
module.exports = User_rates
