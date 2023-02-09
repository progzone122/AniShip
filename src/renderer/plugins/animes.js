const axios = require('axios')
const Shikimori = require('shikimori')
const shiki = new Shikimori()

export default async function (context) {
  await shiki.animes.list({
    status: 'ongoing',
    order: 'popularity',
    limit: 30
  }).then(res => {
    context.store.commit('animes/setOngoing', res)
  })
  await shiki.animes.list({
    status: 'released',
    order: 'ranked',
    limit: 30
  }).then(res => {
    context.store.commit('animes/setRanked_released', res)
  })
  await shiki.animes.list({
    status: 'released',
    order: 'popularity',
    limit: 30
  }).then(res => {
    context.store.commit('animes/setReleased', res)
  })
  await shiki.animes.list({
    status: 'anons',
    order: 'popularity',
    limit: 30
  }).then(res => {
    context.store.commit('animes/setAnons', res)
  })
}
