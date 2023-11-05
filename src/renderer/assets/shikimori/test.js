const ShikimoriAPI = require('./index')
const shiki = new ShikimoriAPI()

// shiki.request.get("animes").then((res) => {
//     console.log(res);
// });
shiki.auth.login({
  clientid: '2Ajm5Jmvf2kGKEDlilk2Pka85p2b57H4VTYS6qvWc9w',
  clientsecret: 'YDg7tpBhQBGAUFY9zZbU89sL6kF9mtJztERjTWtNi6o',
  authcode: 'N7LunyeD-yflqXmTEwrILxqg8UTTWKk3r-dAr9PWR8M',
  useragent: 'AniShip' // only name of your app
}).then(res => {
  console.log(res)
  shiki.users.whoami().then(res2 => {
    // shiki.user_rates.get({
    //     user_id: res.id
    // }).then(res => {
    //     console.log(res);
    // });
    shiki.user_rates.create({
      user_id: res2.id,
      target_id: 21,
      target_type: 'Anime',
      status: 'planned'
    })
  })
})
// shiki.users.getAnimeRates(1017013).then((res) => {
//     console.log(res);
// });
// shiki.auth.refreshToken({
//     clientid: '2Ajm5Jmvf2kGKEDlilk2Pka85p2b57H4VTYS6qvWc9w',
//     clientsecret: 'YDg7tpBhQBGAUFY9zZbU89sL6kF9mtJztERjTWtNi6o',
//     refreshtoken: "vCPGFwpoF-IE1mI2OpplG7wDhyJpZEbQ1662nio0JUI",
//     useragent: 'AniShip', // only name of your app
// }).then((res) => {
//     console.log(res);
//     shiki.users.whoami().then(res => {
//         shiki.user_rates.get(res.id).then(res => {
//             console.log(res);
//         });
//     });
// });
// shiki.animes.list({
//     status: "released",
//     order: "ranked",
//     limit: 12
// }).then((res) => {
//     console.log(res);
// });
