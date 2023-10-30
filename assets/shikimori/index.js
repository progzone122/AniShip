import APIrequest from './lib/request.js';
import Auth from './lib/auth.js';
import Users from './lib/v1/users.js';
import Animes from './lib/v1/animes.js';
import Genres from './lib/v1/genres.js';
import User_rates from './lib/v2/user_rates.js';

export default class ShikimoriAPI {
  constructor() {
    // Shikimori links
    this.apilink = 'https://shikimori.me/api';
    this.authlink = 'https://shikimori.me/oauth';
    // Auth vars
    this.credentials = {
      redirecturi: 'urn:ietf:wg:oauth:2.0:oob',
      useragent: 'AniShip',
      access_token: null,
      refresh_token: null,
    };
    this.clientid = "2Ajm5Jmvf2kGKEDlilk2Pka85p2b57H4VTYS6qvWc9w";
    this.clientsecret = "YDg7tpBhQBGAUFY9zZbU89sL6kF9mtJztERjTWtNi6o";
    // API functions
    this.request = new APIrequest(this);
    this.auth = new Auth(this);
    this.users = new Users(this);
    this.animes = new Animes(this);
    this.genres = new Genres(this);
    this.user_ratess = new User_rates(this);
  }
}