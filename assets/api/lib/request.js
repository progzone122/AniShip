import axios from 'axios';

class APIrequest {
  constructor(obj) {
    this.api = obj;
    this.objectToParams = (obj) => new URLSearchParams(obj).toString();
  }

  async get(method, params) {
    console.log(this.api.credentials.access_token);
    return axios
      .get(
        `${this.api.apilink}/${method}${params ? '?' + this.objectToParams(params) : ''}`,
        {
          headers: {
            Authorization: `Bearer ${this.api.jwtToken ?? ''}`,
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
    return await axios.post(`${this.api.apilink}/${method}`, typeof data === 'object' ? data : null, {
      headers: {
        Authorization: `Bearer ${this.api.jwtToken ?? ''}`,
      },
    })
      .then((res) => {
        return res.data;
      });
  }

  async put(method, id, data) {
    return axios
      .put(`${this.api.apilink}/${method}/${id}`, data, {
        headers: {
          Authorization: `Bearer ${this.api.jwtToken ?? ''}`,
        },
      })
      .then((res) => {
        return res.data;
      });
  }

  async delete(method, id) {
    return axios
      .delete(`${this.api.apilink}/${method}/${id}`, {
        headers: {
          Authorization: `Bearer ${this.api.jwtToken ?? ''}`,
        },
      })
      .then((res) => {
        return res.data;
      });
  }
}

export default APIrequest;