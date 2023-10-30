class Genres {
  constructor(obj) {
    this.shikimori = obj;
  }

  async list() {
    return this.shikimori.request.get('genres');
  }
}

export default Genres;