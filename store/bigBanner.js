import { defineStore } from 'pinia'
import Wrapper from "../assets/shikimori/index.js";
const shiki = new Wrapper();


export const bigBanner = defineStore({
    id: "bigBanner",
    state: () => {
        return {
            animes: []
        }
    },
    actions: {
        async fetchAnimes () {
            await shiki.animes.list({
                limit: 2,
                order: "random",
                score: 8
            }).then(async (res) => {
                for (const anime of res) {
                    await shiki.animes.getScreenshots(anime.id).then(async (res2) => {
                        await shiki.animes.get(anime.id).then(async (res3) => {
                            await this.animes.push({
                                info: res3,
                                screenshots: res2
                            });
                        });
                    });
                }
                // this.animes = res;
                console.log(this.animes)
            });
        }
    },
    getters: {
    },
    persist: {
        storage: persistedState.localStorage,
        expiresKey: {
            animes: 1 * 60 * 60 * 1000 // 1 hours
        }
    }
})