import axios from 'axios';

class APIrequest {
  constructor(obj) {
    this.shikimori = obj;
    this.objectToParams = (obj) => new URLSearchParams(obj).toString();
  }

  async get(method, params) {
    console.log(this.shikimori.credentials.access_token);
    return axios
        .get(
            `${this.shikimori.apilink}/${method}${params ? '?' + this.objectToParams(params) : ''}`,
            {
              headers: {
                'user-agent': this.shikimori.credentials.useragent,
                Authorization: `Bearer ${this.shikimori.credentials.access_token ?? ''}`,
              },
              delay: 1000,
            }
        )
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          console.log(error);
        });
  }

  async post(method, data) {
    return axios
        .post(`${this.shikimori.apilink}/${method}`, typeof data === 'object' ? data : null, {
          headers: {
            'user-agent': this.shikimori.credentials.useragent,
            Authorization: `Bearer ${this.shikimori.credentials.access_token ?? ''}`,
          },
        })
        .then((res) => {
          return res.data;
        });
  }

  async put(method, id, data) {
    return axios
        .put(`${this.shikimori.apilink}/${method}/${id}`, data, {
          headers: {
            'user-agent': this.shikimori.credentials.useragent,
            Authorization: `Bearer ${this.shikimori.credentials.access_token ?? ''}`,
          },
        })
        .then((res) => {
          return res.data;
        });
  }

  async delete(method, id) {
    return axios
        .delete(`${this.shikimori.apilink}/${method}/${id}`, {
          headers: {
            'user-agent': this.shikimori.credentials.useragent,
            Authorization: `Bearer ${this.shikimori.credentials.access_token}`,
          },
        })
        .then((res) => {
          return res.data;
        });
  }
}

export default APIrequest;