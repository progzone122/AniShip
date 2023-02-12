const api_appdata = require("sources");
const fs = require('fs')

//
const getFiles = function (dir, files_) {

    files_ = files_ || [];

    var files = fs.readdirSync(dir);
    for (var i in files) {
        let name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files_);
        } else {
            if (name.indexOf("config.json") !== -1) {
                files_.push(name);
            }
        }
    }
    return files_;
};
//

// console.log(process.env.npm_package_version);
// pl = new api_appdata({
//     shikimori_info: null,
//     plyr: null,
//     axios: null
// });
// pl.sources.forEach(element => {
// })