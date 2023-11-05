const { getAppDataPath } = require('appdata-path')
const ncp = require('ncp').ncp
const fs = require('fs')

fs.stat(`${getAppDataPath('aniship-night')}/sources`, function (err) {
  if (err && err.code === 'ENOENT') {
    console.log('Создание директории в appdata roaming')

    ncp.limit = 16

    ncp(`${process.resourcesPath}/sources`, `${getAppDataPath('aniship-night')}/sources`, function (err) {
      if (err) {
        return console.error(err)
      }
      console.log('done!')
    })
  }
})
