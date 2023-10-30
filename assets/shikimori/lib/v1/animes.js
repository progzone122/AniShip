class Animes {
  constructor(obj) {
    this.shikimori = obj;
  }

  async list(obj) {
    return this.shikimori.request.get('animes', obj);
  }

  async get(id) {
    return this.shikimori.request.get(`animes/${id}`);
  }

  async getRoles(id) {
    return this.shikimori.request.get(`animes/${id}/roles`);
  }

  async getSimiliar(id) {
    return this.shikimori.request.get(`animes/${id}/similar`);
  }

  async getRelated(id) {
    return this.shikimori.request.get(`animes/${id}/related`);
  }

  async getScreenshots(id) {
    return this.shikimori.request.get(`animes/${id}/screenshots`);
  }

  async getFranchise(id) {
    return this.shikimori.request.get(`animes/${id}/franchise`);
  }

  async getExternalLinks(id) {
    return this.shikimori.request.get(`animes/${id}/external_links`);
  }

  async getTopics(id, obj) {
    return this.shikimori.request.get(`animes/${id}/topics`, obj);
  }

  async getCalendar() {
    return this.shikimori.request.get('calendar');
  }
}

export default Animes;