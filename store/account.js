import { defineStore } from 'pinia'
import Api from "../assets/api/index.js";
const api = new Api();


export const account = defineStore({
    id: "account",
    state: () => {
        return {
            account: null,
            auth: null
        }
    },
    actions: {
        login() {

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