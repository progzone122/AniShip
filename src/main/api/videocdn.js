// import $ from 'jquery'
// import { readConfig } from './database.js'
// const url_videocdn = 'https://videocdn.tv/api/anime-tv-series'
// const token = '?api_token=' + readConfig().tokens.videocdn
// let resp = ''

// export function getVideoCDN (name) {
//   $.ajax({
//     type: 'GET',
//     url: url_videocdn + token + '&title=' + name,
//     async: false,
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
//   })
//     .done(function (data) {
//       resp = data.data
//     })
//     .fail(function () { console.log('[ERROR] Ошибка загрузки'); resp = 'error' })
//   return resp
// }
