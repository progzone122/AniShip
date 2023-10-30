class Users {
  constructor(obj) {
    this.shikimori = obj;
  }

  async list(obj) {
    return this.shikimori.request.get('users', obj);
  }

  async get(id, isnickname) {
    return this.shikimori.request.get(`users/${id}`, { is_nickname: isnickname });
  }

  async getBriefInfo(id) {
    return this.shikimori.request.get(`users/${id}/info`);
  }

  async whoami() {
    return this.shikimori.request.get('users/whoami');
  }

  async signOut() {
    return this.shikimori.request.get('users/sign_out');
  }

  async getFriends(id) {
    return this.shikimori.request.get(`users/${id}/friends`);
  }

  async getClubs(id) {
    return this.shikimori.request.get(`users/${id}/clubs`);
  }

  async getAnimeRates(id, obj) {
    console.log(this.shikimori);
    return this.shikimori.request.get(`users/${id}/anime_rates`, obj);
  }

  async getMangaRates(id, obj) {
    return this.shikimori.request.get(`users/${id}/manga_rates`, obj);
  }

  async getFavourites(id) {
    return this.shikimori.request.get(`users/${id}/favourites`);
  }

  async getMessages(id, obj) {
    return this.shikimori.request.get(`users/${id}/messages`, obj);
  }

  async getUnreadMsgCount(id) {
    return this.shikimori.request.get(`users/${id}/unread_messages`);
  }

  getUnreadMessagesCount(id) {
    return this.getUnreadMsgCount(id);
  }

  async getHistory(id, obj) {
    return this.shikimori.request.get(`users/${id}/history`, obj);
  }

  async getBans(id) {
    return this.shikimori.request.get(`users/${id}/bans`);
  }
}

export default Users;