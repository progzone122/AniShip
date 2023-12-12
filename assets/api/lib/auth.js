import axios from "axios";

export default class Auth {
    constructor(obj) {
        this.api = obj;
    }
    async login({ email = null, password = null }) {
        return await this.api.request.post("login", {
            email,
            password
        }).then(res => {
            return res;
        });
    }
}