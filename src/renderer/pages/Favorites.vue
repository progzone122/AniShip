<template>
  <div class="content">
    <header>
      <button type="button" :class="'btn btn-dark ' + watchButton" @click="list('watch')">
        Смотрю
      </button>
      <button
        type="button"
        :class="'btn btn-dark ' + willWatchButton"
        @click="list('will')"
      >
        Буду смотреть
      </button>
      <button
        type="button"
        :class="'btn btn-dark ' + watchedButton"
        @click="list('watched')"
      >
        Просмотрено
      </button>
      <button
        type="button"
        :class="'btn btn-dark ' + abandonedWatchButton"
        @click="list('abandoned')"
      >
        Брошено
      </button>
    </header>
    <div class="container">
    <div v-if="titles.animevost.length !== 0">
      <h4 style="color: white">Animevost</h4>
      <hr style="width: 90vw; color: white">
      <div class="container2">
        <div v-for="i in titles.animevost" v-if="titles" :key="i.id" class="block">
          <nuxt-link
            :to="{ name: 'WatchAnime', query: { id: i.id, voicer: 'animevost' } }"
          >
            <TitleBlock :title="i" voicer="animevost" />
          </nuxt-link>
        </div>
      </div>
    </div>
    <div v-if="titles.anilibria.length !== 0">
      <h4 style="color: white; margin-top: 1em">Anilibria</h4>
      <hr style="width: 90vw; color: white">
      <div class="container2">
        <div v-for="i in titles.anilibria" v-if="titles" :key="i.id" class="block">
          <nuxt-link
            :to="{ name: 'WatchAnime', query: { id: i.id, voicer: 'anilibria' } }"
          >
            <TitleBlock :title="i" voicer="anilibria" />
          </nuxt-link>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import { setEntry, getOneEntry, getAllKeys, removeEntry } from '../../main/indexedDB.js'
import { getTitleInfo } from "../../main/api/api.js";
import TitleBlock from '../components/TitleBlock.vue';
export default {
  name: "Favorites",
  asyncData() {
    return {
      database: {},
      watchButton: "active",
      willWatchButton: "",
      watchedButton: "",
      abandonedWatchButton: "",
      titles: {
        animevost: [],
        anilibria: [],
      },
    };
  },
  components: {
    TitleBlock
  },
  async created(){
    this.animevost_keys = await getAllKeys('favorites', 'animevost');
    this.anilibria_keys = await getAllKeys('favorites', 'anilibria');
    for(const i in this.animevost_keys){
      const title = await getOneEntry('favorites', 'animevost', this.animevost_keys[i]);
      if (title.list === "watch") {
        this.titles.animevost.push(getTitleInfo(Number(this.animevost_keys[i]), "animevost").data[0]);
      }
    }
    for(const i in this.anilibria_keys){
      const title = await getOneEntry('favorites', 'anilibria', this.anilibria_keys[i]);
      if (title.list === "watch") {
        this.titles.anilibria.push(getTitleInfo(Number(this.anilibria_keys[i]), "anilibria").data[0]);
      }
    }
  },
  methods: {
    async list(obj) {
      switch (obj) {
        case "watch":
          this.titles = {
            animevost: [],
            anilibria: [],
          };
            for(const i in this.animevost_keys){
            const title = await getOneEntry('favorites', 'animevost', this.animevost_keys[i]);
            if (title.list === "watch") {
                this.titles.animevost.push(getTitleInfo(Number(this.animevost_keys[i]), "animevost").data[0]);
            }
            }
            for(const i in this.anilibria_keys){
            const title = await getOneEntry('favorites', 'anilibria', this.anilibria_keys[i]);
            if (title.list === "watch") {
                this.titles.anilibria.push(getTitleInfo(Number(this.anilibria_keys[i]), "anilibria").data[0]);
            }
            }
          this.watchButton = "active";
          this.willWatchButton = "";
          this.watchedButton = "";
          this.abandonedWatchButton = "";
          break;
        case "will":
          this.titles = {
            animevost: [],
            anilibria: [],
          };
            for(const i in this.animevost_keys){
            const title = await getOneEntry('favorites', 'animevost', this.animevost_keys[i]);
            if (title.list === "will") {
                this.titles.animevost.push(getTitleInfo(Number(this.animevost_keys[i]), "animevost").data[0]);
            }
            }
            for(const i in this.anilibria_keys){
            const title = await getOneEntry('favorites', 'anilibria', this.anilibria_keys[i]);
            if (title.list === "will") {
                this.titles.anilibria.push(getTitleInfo(Number(this.anilibria_keys[i]), "anilibria").data[0]);
            }
            }
          this.watchButton = "";
          this.willWatchButton = "active";
          this.watchedButton = "";
          this.abandonedWatchButton = "";
          break;
        case "watched":
          this.titles = {
            animevost: [],
            anilibria: [],
          };
            for(const i in this.animevost_keys){
            const title = await getOneEntry('favorites', 'animevost', this.animevost_keys[i]);
            if (title.list === "watched") {
                this.titles.animevost.push(getTitleInfo(Number(this.animevost_keys[i]), "animevost").data[0]);
            }
            }
            for(const i in this.anilibria_keys){
            const title = await getOneEntry('favorites', 'anilibria', this.anilibria_keys[i]);
            if (title.list === "watched") {
                this.titles.anilibria.push(getTitleInfo(Number(this.anilibria_keys[i]), "anilibria").data[0]);
            }
            }
          this.watchButton = "";
          this.willWatchButton = "";
          this.watchedButton = "active";
          this.abandonedWatchButton = "";
          break;
        case "abandoned":
          this.titles = {
            animevost: [],
            anilibria: [],
          };
            for(const i in this.animevost_keys){
            const title = await getOneEntry('favorites', 'animevost', this.animevost_keys[i]);
            if (title.list === "abandoned") {
                this.titles.animevost.push(getTitleInfo(Number(this.animevost_keys[i]), "animevost").data[0]);
            }
            }
            for(const i in this.anilibria_keys){
            const title = await getOneEntry('favorites', 'anilibria', this.anilibria_keys[i]);
            if (title.list === "abandoned") {
                this.titles.anilibria.push(getTitleInfo(Number(this.anilibria_keys[i]), "anilibria").data[0]);
            }
            }
          this.watchButton = "";
          this.willWatchButton = "";
          this.watchedButton = "";
          this.abandonedWatchButton = "active";
          break;
      }
    }
  }
};
</script>
<style scoped lang="scss">
@import "../assets/css/theme.scss";
.content {
  width: 100vw;
  padding-left: 2vw;
  .container {
    position: absolute;
    left: 7vw;
    padding-bottom: 10em;
  }
}
header {
  width: 100%;
  height: 6em;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 2em;
  .btn-dark {
    margin-right: 1em;
    border: none;
  }
}
a {
  text-decoration: none;
}
.container2 {
  width: 100%;
  display: grid;
  gap: $indexTitles_gap;
  grid-template-columns: repeat($indexTitles_columns, 1fr);
}
</style>
