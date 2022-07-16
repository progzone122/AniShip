import $ from 'jquery'
const url_shikimori = 'https://shikimori.one/api/'
let resp = ''

export function titleRatingShikimori (name) {
  $.ajax({
    type: 'GET',
    url: url_shikimori + 'animes?search=' + name,
    async: false,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
    .done(function (data) { resp = data[0].score })
    .fail(function () { console.log('[ERROR] Ошибка загрузки'); resp = 'error' })
  return resp
}
export function getTitleShikimori (name, year) {
  $.ajax({
    type: 'GET',
    url: url_shikimori + 'animes?search=' + name + '&season=' + year,
    async: false,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
    .done(function (data) { resp = data; console.log(data) })
    .fail(function () { console.log('[ERROR] Ошибка загрузки'); resp = 'error' })
  return resp
}
export function getScreenshotsShikimori (id) {
  $.ajax({
    type: 'GET',
    url: url_shikimori + '/animes/' + id + '/screenshots',
    async: false,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
    .done(function (data) { resp = data; console.log(data) })
    .fail(function () { console.log('[ERROR] Ошибка загрузки'); resp = 'error' })
  return resp
}
