const axios = require('axios')
const Shikimori = require('shikimori')
const shiki = new Shikimori()

export default function (context) {
    const refreshtoken = localStorage.getItem('refresh_token') ?? null;
    if (refreshtoken !== null) {
        shiki.auth.refreshToken({
            clientid: '2Ajm5Jmvf2kGKEDlilk2Pka85p2b57H4VTYS6qvWc9w',
            clientsecret: 'YDg7tpBhQBGAUFY9zZbU89sL6kF9mtJztERjTWtNi6o',
            refreshtoken,
            useragent: 'AniShip' // only name of your app
        }).then(res => {
            console.log(res)
            localStorage.setItem('access_token', res.accesstoken)
            localStorage.setItem('refresh_token', res.refreshtoken)
            shiki.users.whoami({
                useragent: 'AniShip',
                accesstoken: res.accesstoken
            }).then(res2 => {
                if (res.accesstoken !== null && res.accesstoken !== undefined && typeof res.accesstoken !== 'object') {
                    context.store.commit('setAccount', res2)
                }
            })
        })
    }
}