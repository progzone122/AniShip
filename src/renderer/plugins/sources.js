const fs = require('fs')
const api_appdata = require('sources')

//
const getFiles = function (dir, files_) {
  files_ = files_ || []

  const files = fs.readdirSync(dir)
  for (const i in files) {
    const name = dir + '/' + files[i]
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_)
    } else if (name.includes('config.json')) {
      files_.push(name)
    }
  }
  return files_
}
//

// console.log(process.env.npm_package_version);
// pl = new api_appdata({
//     shikimori_info: null,
//     plyr: null,
//     axios: null
// });
// pl.sources.forEach(element => {
// })
