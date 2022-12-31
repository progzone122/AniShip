const axios = require('axios')

class APIrequest {
  constructor (obj) {
    this.shikimori = obj
    this.objectToParams = obj => new URLSearchParams(obj).toString()
  }

  // method: string, params: object
  async get (method, params) {
    console.log(this.shikimori.credentials.access_token)
    return axios.get(`${this.shikimori.apilink}/${method}${(params ? '?' + this.objectToParams(params) : '')}`, {
      headers: {
        'user-agent': `User-Agent: ${this.shikimori.credentials.useragent}`,
        Authorization: `Bearer ${this.shikimori.credentials.access_token ?? ''}`
      },
      delay: 1000,
    }).then(res => {
      return res.data
    })
  }

  // method: string, data: object
  async post (method, data) {
    return axios.post(`${this.shikimori.apilink}/${method}`, (typeof (data) === 'object' ? data : null), {
      headers: {
        'user-agent': `User-Agent: ${this.shikimori.credentials.useragent}`,
        Authorization: `Bearer ${this.shikimori.credentials.access_token ?? ''}`
      }
    }).then(res => {
      return res.data
    })
  }

  // method: string, id: integer, data: object
  async put (method, id, data) {
    return axios.put(`${this.shikimori.apilink}/${method}/${id}`, data, {
      headers: {
        'user-agent': `User-Agent: ${this.shikimori.credentials.useragent}`,
        Authorization: `Bearer ${this.shikimori.credentials.access_token ?? ''}`
      }
    }).then(res => {
      return res.data
    })
  }

  // method: string, id: integer
  async delete (method, id) {
    return axios.delete(`${this.shikimori.apilink}/${method}/${id}`, {
      headers: {
        'user-agent': `User-Agent: ${this.shikimori.credentials.useragent}`,
        Authorization: `Bearer ${this.shikimori.credentials.access_token}`
      }
    }).then(res => {
      return res.data
    })
  }
}

module.exports = APIrequest
