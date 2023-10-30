// const ShikimoriAPI = require('./index')
import ShikimoriAPI from "./index.js";
const shiki = new ShikimoriAPI()

// shiki.request.get("animes").then((res) => {
//     console.log(res);
// });
// shiki.auth.login({
//   // clientid: '2Ajm5Jmvf2kGKEDlilk2Pka85p2b57H4VTYS6qvWc9w',
//   // clientsecret: 'YDg7tpBhQBGAUFY9zZbU89sL6kF9mtJztERjTWtNi6o',
//   authcode: "dikzb57AEMK6w-uE-0-E3zcY83q85V9Qx1xdMPwMEtQ",
//   // useragent: 'AniShip' // only name of your app
// }).then(res => {
  // console.log(res)
  // shiki.users.whoami().then(res2 => {
  //   shiki.user_rates.get({
  //       user_id: res.id
  //   }).then(res => {
  //       console.log(res);
  //   });
  //   // shiki.user_rates.create({
  //   //   user_id: res2.id,
  //   //   target_id: 21,
  //   //   target_type: 'Anime',
  //   //   status: 'planned'
  //   // })
  //   console.log(res2)
//   })
//   console.log(res)
// }).catch(err => {
//   console.log(err.message);
// });
// shiki.users.getAnimeRates(1017013).then((res) => {
//     console.log(res);
// });
// shiki.auth.refreshToken({
//     // clientid: '2Ajm5Jmvf2kGKEDlilk2Pka85p2b57H4VTYS6qvWc9w',
//     // clientsecret: 'YDg7tpBhQBGAUFY9zZbU89sL6kF9mtJztERjTWtNi6o',
//     refreshtoken: "eLPpbZcy5K5v3y4bGGJSG2E-wkz7B_3DphlKqPGLqqs",
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

// axios.post(`https://shikimori.me/oauth/token`, {
//   grant_type: 'authorization_code',
//   client_id: "8wQqINBMCMhVS5-V3_XOtTFyQ97Hr7jp3lYxL7vsLcQ",
//   client_secret: "zaXWE8ec_2XqN0tlTSsEcqpY_8celTIwhN7MLhEXhU4",
//   code: "BmYpjdY-mK3oa0sqgi3KQg9UkNmw2eP7SQjO5h0OJZI",
//   redirect_uri: "urn:ietf:wg:oauth:2.0:oob"
// }, {
//   headers: {
//     'user-agent': `test2`
//   }
// }).then(res => {
//   console.log(res);
// }).catch(err => {
//   console.log(err.message);
// });