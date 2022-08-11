import $ from 'jquery'
const random = require('random-integer');
const url_anilibria = 'https://api.anilibria.tv/v2/'
let resp = ''
let req;
let resp2 = []
let after_limit = 0;
export function getTitleInfoAnilibria (id) {
  $.ajax({
    type: 'GET',
    url: url_anilibria + 'getTitle?id=' + id,
    async: false,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
    .done(function (data) {
      resp = {}
      let genres = ''
      for (const i in data.genres) {
        genres = genres + '\n' + data.genres[i]
      }
      resp.data = [{
        id: data.id,
        title: data.names.ru + ' /',
        description: data.description,
        urlImagePreview: 'https://anilibria.tv' + data.posters.small.url,
        year: data.season.year,
        series: data.player.series.string,
        genre: genres
      }]
      console.log(resp)
    })
    .fail(function () { console.log('[ERROR] Ошибка загрузки'); resp = 'error' })
  return resp
}
export async function loadTitlesAnilibria (sort, page = 1) {
  after_limit = page * 100 - 100;
  switch (sort) {
  case 'new':
    req = await fetch(url_anilibria + 'getUpdates?after=' + after_limit + '&filter=names.ru,description,posters.small,id&limit=100', {
      method: 'GET',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      credentials: 'include'
    });
    req = await req.json();
    resp2 = []
    for (const i in req) {
      resp2[i] = {
        id: req[i].id,
        title: req[i].names.ru + ' /',
        description: req[i].description,
        urlImagePreview: 'https://anilibria.tv' + req[i].posters.small.url
      }
    }
    resp = {
      data: resp2
    };
    return resp;
  case 'ongoings':
    req = await fetch(url_anilibria + 'advancedSearch?query={status.code} == 1&filter=names.ru,description,posters.small,id&limit=200', {
      method: 'GET',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      credentials: 'include'
    });
    req = await req.json();
    resp2 = []
    for (const i in req) {
      resp2[i] = {
        id: req[i].id,
        title: req[i].names.ru + ' /',
        description: req[i].description,
        urlImagePreview: 'https://anilibria.tv' + req[i].posters.small.url
      }
    }
    resp = {
      data: resp2
    };
    return resp;
  case 'random':
    req = await fetch(url_anilibria + 'advancedSearch?query={status.code} == 1&filter=names.ru,description,posters.small,id&limit=40&after=' + String(30), {
      method: 'GET',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      credentials: 'include'
    });
    req = await req.json();
    resp2 = []
    for (const i in req) {
      resp2[i] = {
        id: req[i].id,
        title: req[i].names.ru + ' /',
        description: req[i].description,
        urlImagePreview: 'https://anilibria.tv' + req[i].posters.small.url
      }
    }
    resp = {
      data: resp2
    };
    return resp;
  default:
    break
  }
}
export async function getAnilibriaSeries (ru_name, year) {
  req = await fetch(url_anilibria + 'searchTitles?search=' + ru_name + '&year=' + year, {
    method: 'GET',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    credentials: 'include'
  });
  req = await req.json();
  resp = []
  // console.log(data)
  for (const i in req[0].player.playlist) {
    resp.push({
      name: req[0].player.playlist[i].serie + ' серия',
      preview: req[0].player.playlist[i].preview,
      std: 'https://' + req[0].player.host + req[0].player.playlist[i].hls.sd,
      hd: 'https://' + req[0].player.host + req[0].player.playlist[i].hls.sd,
      fhd: 'https://' + req[0].player.host + req[0].player.playlist[i].hls.fhd
    });
  }
  return resp;
}
export default function () {

}
export function searchInNameAnilibria (name) {
  $.ajax({
    type: 'GET',
    url: url_anilibria + 'searchTitles?search=' + name + '&filter=names.ru,description,posters.small,id',
    async: false,
    timeout: 6000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
    .done(function (data) {
      resp = {}
      const resp2 = []
      for (const i in data) {
        resp2[i] = {
          id: data[i].id,
          title: data[i].names.ru + ' /',
          description: data[i].description,
          urlImagePreview: 'https://anilibria.tv' + data[i].posters.small.url
        }
      }
      resp.data = resp2
    })
    .fail(function () { console.log('[ERROR] Ошибка загрузки'); resp = 'error' })
  return resp
}
export async function searchInGenreAnilibria (gen, page) {
  req = await fetch(url_anilibria + 'searchTitles?genres=' + gen + '&filter=names.ru,description,posters.small,id&limit=15&after=' + page, {
    method: 'GET',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    credentials: 'include'
  });
  req = await req.json();
  resp = {}
  const resp2 = []
  for (const i in req) {
    resp2[i] = {
      id: req[i].id,
      title: req[i].names.ru + ' /',
      description: req[i].description,
      urlImagePreview: 'https://anilibria.tv' + req[i].posters.small.url
    }
  }
  resp = {
    data: resp2
  }
  return resp;
}
