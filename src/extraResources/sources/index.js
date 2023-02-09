const anilibria = require('./anilibria')
const kodik = require('./kodik')

class Sources {
  constructor (obj) {
    this.shikimori_info = obj.shikimori_info
    this.plyr = obj.plyr
    this.axios = obj.axios
    //
    this.sources = [
      // Ниже подключаем расширения
      new kodik(this),
      new anilibria(this)
    ]
    //
  }
}
module.exports = Sources
