import { defineStore } from 'pinia'
import Wrapper from "../assets/shikimori/index.js";
const shiki = new Wrapper();


export const account = defineStore({
    id: "account",
    state: () => {
        return {
            account: null,
            auth: null
        }
    },
    actions: {
        async fetchShikimoriAuth(code) {
            await shiki.auth.login({
                authcode: code,
            }).then(res => {
                console.log(res)
                this.auth = res;
            });
        },
        async fetchRefreshAuth () {
            this.account = await shiki.auth.refreshToken({
                refreshtoken: this.auth.refreshtoken,
            }).then(res => {
                console.log(res);
                return res
            })
        },
        async fetchProfile () {
            const resp = await shiki.users.whoami({
                refreshtoken: this.auth.accesstoken
            })
            if (this.auth.accesstoken !== null && this.auth.accesstoken !== undefined && typeof this.auth.accesstoken !== 'object') {
                this.account = resp;
            }
        }
    },
    getters: {
    },
    persist: {
        storage: persistedState.localStorage,
        expiresKey: {
            allCountrys: 24 * 60 * 60 * 1000 // 24 hours
        }
    }
})