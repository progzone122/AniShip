import $ from 'jquery'
import { getAnimeVostServer } from '../../main/settings.js'
const random = require('random-integer');
const cheerio = require('cheerio')
const url_animevost = 'https://' + getAnimeVostServer() + '/v1' + '/'
const url_animevostImg = 'https://v2.vost.pw'
let resp = ''
let req;
async function getMaxPage () {
  req = await loadTitlesAnimevost('new', 1);
  console.log(req);
  return Math.round(req.state.count / 20);
}
function getTitleId (url) {
  let first = url.split('/')
  first = first[5].split('-')
  return first[0]
}
export function getTitleInfoAnimevost (id) {
  $.ajax({
    type: 'POST',
    url: url_animevost + 'info',
    data: { id },
    async: false,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
    .done(function (data) { resp = data })
    .fail(function () { console.log('[ERROR] Ошибка загрузки'); resp = 'error' })
  return resp
}
export function seriesFromTitle (name) {
  const first = name.split(' /')
  const second = first[1].split(' [')
  return second[1].substring(0, second[1].length - 1)
}
export function loadPlaylistTitle (id) {
  $.ajax({
    type: 'POST',
    url: url_animevost + 'playlist',
    data: { id },
    async: false,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
    .done(function (data) { resp = data })
    .fail(function () { console.log('[ERROR] Ошибка загрузки'); resp = 'error' })
  return resp
}
export function rebuildPlaylist (old) {
  console.log(old)
  const res = []
  const series = []
  const other = []
  old.sort(resort)
  old.forEach(e => {
    if (e.name.includes(' сери')) {
      series.push(e)
    } else {
      other.push(e)
    }
  })
  const array = []
  series.forEach(e => { array.push(e) })
  other.forEach(e => { array.push(e) })
  for (let i = 0; i < array.length; i++) {
    res.push({
      name: array[i].name,
      preview: array[i].preview,
      std: array[i].std,
      hd: array[i].hd
    })
  };
  return res
}
function resort (item1, item2) {
  const num1 = parseInt(item1.name.match(/\d+/))
  const num2 = parseInt(item2.name.match(/\d+/))
  return parseInt(num1) - parseInt(num2)
}
export function getGenres () {
  $.get({ url: url_animevost + 'genres', async: false, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
    .done(function (data) { resp = data })
    .fail(function () { console.log('[ERROR] Ошибка загрузки'); resp = 'error' })
  return resp
}
export default function () {

}
export async function loadTitlesAnimevost (sort, page) {
  switch (sort) {
  case 'new':
    req = await fetch(url_animevost + 'last?page=' + page + '&quantity=20', {
      method: 'GET',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      credentials: 'include'
    });
    return req.json();
  case 'ongoings':
    req = await fetch(url_animevost + 'search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      credentials: 'include',
      body: new URLSearchParams({
        cat: 61
      })
    });
    return req.json();
  case 'anons':
    req = await fetch(url_animevost + 'search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      credentials: 'include',
      body: new URLSearchParams({
        cat: 68
      })
    });
    return req.json();
  case 'random':
    req = await fetch(url_animevost + 'last?page=' + String(random(1, Math.round(await getMaxPage()))) + '&quantity=20', {
      method: 'GET',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      credentials: 'include'
    });
    return req.json();
  default:
    break
  }
}
export function searchInGenreAnimevost (gen, page) {
  switch (gen) {
  // Жанры
  case 'Боевые искусства':
    gen = 'boyevyye-iskusstva'
    break
  case 'Война':
    gen = 'voyna'
    break
  case 'Драма':
    gen = 'drama'
    break
  case 'История':
    gen = 'istoriya'
    break
  case 'Комедия':
    gen = 'komediya'
    break
  case 'Меха':
    gen = 'mekha'
    break
  case 'Мистика':
    gen = 'mistika'
    break
  case 'Махо-сёдзё':
    gen = 'makho-sedze'
    break
  case 'Музыкальный':
    gen = 'muzykalnyy'
    break
  case 'Повседневность':
    gen = 'povsednevnost'
    break
  case 'Приключения':
    gen = 'priklyucheniya'
    break
  case 'Пародия':
    gen = 'parodiya'
    break
  case 'Романтика':
    gen = 'romantika'
    break
  case 'Сёнэн':
    gen = 'senen'
    break
  case 'Сёдзё':
    gen = 'sedze'
    break
  case 'Спорт':
    gen = 'sport'
    break
  case 'Сказка':
    gen = 'skazka'
    break
  case 'Сёдзё-ай':
    gen = 'sedze-ay'
    break
  case 'Сёнэн-ай':
    gen = 'senen-ay'
    break
  case 'Самураи':
    gen = 'samurai'
    break
  case 'Триллер':
    gen = 'triller'
    break
  case 'Ужасы':
    gen = 'uzhasy'
    break
  case 'Фантастика':
    gen = 'fantastika'
    break
  case 'Фэнтези':
    gen = 'fentezi'
    break
  case 'Школа':
    gen = 'shkola'
    break
  case 'Этти':
    gen = 'etti'
    break
  case 'Детектив':
    gen = 'detektiv'
    break
    // Категории
  case 'ТВ':
    gen = 'tv'
    break
  case 'ТВ-спэшл':
    gen = 'tv-speshl'
    break
  case 'OVA':
    gen = 'ova'
    break
  case 'ONA':
    gen = 'ona'
    break
  case 'Полнометражный фильм':
    gen = 'polnometrazhnyy-film'
    break
  case 'Короткометражный фильм':
    gen = 'korotkometrazhnyy-film'
    break
  case 'Дунхуа':
    gen = 'dunkhua'
    break
  }
  const URL = 'https://v2.vost.pw/zhanr/' + gen + '/page/' + page + '/'
  $.ajax({
    type: 'POST',
    url: URL,
    cache: true,
    async: false,
    timeout: 7000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
    .done(function (body) {
      const agenres = []
      let $$ = cheerio.load(body)
      $$('#centerBlock>#dle-content>.shortstory').each(function (key, value) {
        $$ = cheerio.load(value)
        agenres.push(
          {
            urlImagePreview: url_animevostImg + $$('.shortstory>.shortstoryContent>table>tbody>tr>td>div>a>img').attr('src'),
            title: $$('.shortstory>.shortstoryHead>h2>a').text(),
            id: getTitleId($$('.shortstory>.shortstoryHead>h2>a').attr('href'))
          }
        )
      })
      $$ = cheerio.load(body)
      resp = agenres
    })
    .fail(function () { console.log('[ERROR] Ошибка загрузки'); resp = 'error' })
  return resp
}
export function searchInNameAnimevost (name) {
  $.ajax({
    type: 'POST',
    url: url_animevost + 'search',
    data: { name },
    async: false,
    timeout: 4000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
    .done(function (data) { resp = data })
    .fail(function (fail) { console.log(fail.responseJSON.fail); resp = 'error' })
  return resp
}
export function titleRatingAnimevost (title) {
  return Math.round(title.rating / title.votes * 100) / 100 * 2
}
export function getTitleName (name) {
  const first = name.split(' /')
  return first[0]
}
export function getTitleName2 (name) {
  let first = name.split(' / ')[0]
  if (first.includes('(')) {
    first = first.split(' (')
    return first[0]
  }
  return first
}
export function getOriginalTitleName (name) {
  let first = name.split('/ ')
  first = first[1].split(' [')
  return first[0]
}
