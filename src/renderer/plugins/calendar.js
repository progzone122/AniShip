const axios = require('axios')
const Shikimori = require('shikimori')
const shiki = new Shikimori()

export default async function (context) {
    shiki.animes.getCalendar().then(res => {
        context.store.commit('calendar/setAnimes', res)
    });
}