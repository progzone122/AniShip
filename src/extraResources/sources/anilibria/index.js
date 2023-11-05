const axios = require('axios')
const libs = require('../libs')
const config = require('./config.json')

class Source {
  constructor(obj) {
    this.config = config;
    this.name = config.name
    this.player_ref = config.player_ref;
    this.shikimori_info = obj.shikimori_info ?? null
    this.playerOptions = {
      controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
      settings: ['quality', 'speed', 'loop']
    },
      this.quality = ['fhd', 'hd', 'sd']
    this.quality_select = 1
    this.plyr = obj.plyr
    this.axios = obj.axios
    this.playlist = null
    if (this.shikimori_info !== null) {
      if (this.shikimori_info.fandubbers.includes('AniLibria')) {
        this.playlist = this.get_playlist()
      }
    }
    // Подключаем апи только после заполнения всех переменных!
    this.libs = new libs(this)
  }

  async get_playlist() {
    return await this.axios.get(`https://api.anilibria.tv/v2/searchTitles?search=${encodeURIComponent(this.shikimori_info.name)}&limit=1`).then(result => {
      const data = result.data[0].player.playlist
      const data2 = []
      if (result !== undefined && result !== null && result.data[0].length !== 0) {
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            const element = data[key]
            for (const key2 in element.hls) {
              const element2 = element.hls[key2]
              if (element2 !== null && element2 !== undefined && element2 !== '') {
                data[key].hls[key2] = 'https://' + result.data[0].player.host + element2
              }
            }
          }
        }
        for (const key in data) {
          data2.push(data[key])
        }
        return data2
      }
    }).catch(error => {
      if (error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log('Error', error.message)
      }
    })
  }

  getQuality() {
    console.log(this.libs);
    console.log(this.libs.player.getQuality())
    return this.libs.player.getQuality()
  }

  setQuality(new_quality) {
    this.libs.player.setQuality(new_quality)
    this.play()
    return this.libs.player.getQuality()
  }

  play(episode = null) {
    this.libs.player.HlsPlay({ episode })
  }
}
module.exports = Source
