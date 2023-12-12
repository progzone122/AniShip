import APIrequest from './lib/request.js';
import Auth from './lib/auth.js';

export default class Api {
  constructor() {
    // Shikimori links
    this.apilink = 'http://localhost:3001';
    // Auth vars
    this.jwtToken = null;
    // API functions
    this.request = new APIrequest(this);
    this.auth = new Auth(this);
  }
}