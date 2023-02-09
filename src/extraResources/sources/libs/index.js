const player = require('./player')
class Libs {
  constructor (obj) {
    this.playerOptions = {
      controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
      settings: ['quality', 'speed', 'loop']
    },
    this.quality = obj.quality
    this.quality_select = obj.quality_select
    this.plyr = obj.plyr
    this.axios = obj.axios
    this.playlist = obj.playlist
    this.player = new player(this)
  }
}
module.exports = Libs
