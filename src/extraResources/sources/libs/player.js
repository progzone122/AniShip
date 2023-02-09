class Player {
  constructor (obj) {
    this.Hls = require('hls.js')
    this.episode = 1
    this.plyr = obj.plyr
    this.quality = obj.quality
    this.quality_select = obj.quality_select
    this.playlist = obj.playlist
  }
}
class HlsPlayer extends Player {
  async HlsPlay ({ episode = null }) {
    const hls = new this.Hls()
    const playlist2 = await this.playlist
    hls.loadSource(playlist2[(episode ?? this.episode) - 1].hls[this.quality[this.quality_select]])
    hls.attachMedia(this.plyr.media)
    window.hls = hls
  }

  async next_HlsPlay () {
    const hls = new this.Hls()
    const playlist2 = await this.playlist
    if (this.episode - 1 < playlist2.length) {
      this.episode++
      hls.loadSource(playlist2[this.episode - 1].hls[this.quality[this.quality_select]])
      hls.attachMedia(this.plyr.media)
      window.hls = hls
    }
  }

  getQuality () {
    return Object.assign({ quality: this.quality }, {
      select: this.quality_select
    })
  }

  setQuality (new_quality) {
    this.quality_select = new_quality
  }
}

module.exports = Player
module.exports = HlsPlayer
