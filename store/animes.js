import { defineStore } from 'pinia'
import Wrapper from "../assets/shikimori/index.js";
const shiki = new Wrapper();


export const animes = defineStore({
    id: "animes",
    state: () => {
        return {
            ongoings: [],
            ranked_released: [],
            released: [],
            anons: [],
        }
    },
    actions: {
        async fetchAnimesOngoings () {
            await shiki.animes.list({
                limit: 30,
                order: "popularity",
                status: "ongoing"
            }).then(async (res) => {
                this.ongoings = res;
            });
        },
        async fetchAnimesRanked_released () {
            await shiki.animes.list({
                limit: 30,
                order: "ranked",
                status: "released"
            }).then(async (res) => {
                this.ranked_released = res;
            });
        },
        async fetchAnimesReleased () {
            await shiki.animes.list({
                limit: 30,
                order: "random",
                status: "released",
                score: 7
            }).then(async (res) => {
                this.released = res;
            });
        },
        async fetchAnimesAnons () {
            await shiki.animes.list({
                limit: 30,
                status: "anons"
            }).then(async (res) => {
                this.anons = res;
                console.log(res);
            });
        },
        async fetchAnimesAdd (type, page) {
            switch (type) {
                case "ongoings":
                    await shiki.animes.list({
                        limit: 30,
                        order: "popularity",
                        status: "ongoing",
                        page
                    }).then(async (res) => {
                        for (const anime of res) {
                            this.ongoings.push(anime);
                        }
                    });
                case "rank_released":
                    await shiki.animes.list({
                        limit: 30,
                        order: "ranked",
                        status: "released",
                        page
                    }).then(async (res) => {
                        for (const anime of res) {
                            this.ranked_released.push(anime);
                        }
                    });
                case "released":
                    await shiki.animes.list({
                        limit: 30,
                        order: "random",
                        status: "released",
                        score: 7,
                        page
                    }).then(async (res) => {
                        for (const anime of res) {
                            this.released.push(anime);
                        }
                    });
                case "anons":
                    await shiki.animes.list({
                        limit: 30,
                        status: "anons",
                        page
                    }).then(async (res) => {
                        for (const anime of res) {
                            this.anons.push(anime);
                        }
                    });
            }
        }
    },
    getters: {
    },
})