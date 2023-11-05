const config = require('./config.json')

class Source {
  constructor (obj) {
    this.config = config
    this.name = config.name
    this.player_ref = config.player_ref
    this.plyr = obj.plyr
    this.axios = obj.axios
    this.shikimori_info = obj.shikimori_info ?? null
    this.token = 'b7cc4293ed475c4ad1fd599d114f4435'
  }

  async getIframeLink () {
    return await this.axios.get(`https://kodikapi.com/search?shikimori_id=${this.shikimori_info.id}&limit=1&token=${this.token}`).then(result => {
      if (result !== undefined && result !== null && result.data.results.length !== 0) {
        return `https:${result.data.results[0].link}`
      }
    })
  }
}
module.exports = Source
