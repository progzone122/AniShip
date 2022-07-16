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
      <h4 style="color: white">Animevost</h4>
      <hr style="width: 90vw; color: white">
      <div class="container2">
        <div v-for="i in titles.animevost" v-if="titles" :key="i.id" class="block">
          <nuxt-link
            :to="{ name: 'WatchAnime', query: { id: i.id, voicer: 'animevost' } }"
          >
            <div
              class="image"
              :style="{ 'background-image': 'url(' + i.urlImagePreview + ')' }"
            >
              <div class="faded">
                <div class="anime-bottom">
                  <p class="anime-name">{{ i.title }}</p>
                  <p class="anime-description">
                    {{ descr(i.description) }}
                  </p>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
      <h4 style="color: white; margin-top: 1em">Anilibria</h4>
      <hr style="width: 90vw; color: white">
      <div class="container2">
        <div v-for="i in titles.anilibria" v-if="titles" :key="i.id" class="block">
          <nuxt-link
            :to="{ name: 'WatchAnime', query: { id: i.id, voicer: 'anilibria' } }"
          >
            <div
              class="image"
              :style="{ 'background-image': 'url(' + i.urlImagePreview + ')' }"
            >
              <div class="faded">
                <div class="anime-bottom">
                  <p class="anime-name">{{ i.title }}</p>
                  <p class="anime-description">
                    {{ descr(i.description) }}
                  </p>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { setEntry, getOneEntry, getAllKeys, removeEntry } from '../../main/indexedDB.js'
import { getTitleInfo } from "../../main/api/api.js";
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
  async mounted(){
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
    },
    descr(d) {
      return d.toString().replaceAll("<br />", "\n").substr(0, 260) + "...";
    },
  },
};
</script>
<style scoped>
.content {
  width: 100vw;
  padding-left: 2vw;
}
header {
  width: 100%;
  height: 6em;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 2em;
}
header .btn-dark {
  margin-right: 1em;
  border: none;
}
a {
  text-decoration: none;
}
.content .container {
  position: absolute;
  left: 7vw;
  padding-bottom: 10em;
}
.container2 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-columns: repeat(4, 21vw);
  gap: 1em;
}
.block {
  height: 30vw;
  width: 100%;
  background-color: #1a1e21;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
}
.block .image {
  width: 100%;
  height: 100%;
  background-size: cover;
  padding: 0;
  animation: zoom2 0.5s cubic-bezier(0, 0.55, 0.45, 1);
  transform: scale(1);
}
.block .image .faded {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.8813900560224089) 36%,
    rgba(0, 0, 0, 0.404079131652661) 100%
  );
  display: flex;
  align-items: flex-end;
}
.block .image:hover {
  animation: zoom1 0.5s cubic-bezier(0, 0.55, 0.45, 1);
  transform: scale(1.1);
}
.anime-bottom {
  padding: 1.3em;
}
.block .anime-bottom p {
  color: white;
  margin: 0;
}
.anime-name {
  font-weight: 500;
}
.anime-description {
  font-size: 14px;
}
@keyframes zoom1 {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
}
@keyframes zoom2 {
  from {
    transform: scale(1.1);
  }
  to {
    transform: scale(1);
  }
}
@keyframes zoom3 {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.9);
  }
}
@keyframes zoom4 {
  from {
    transform: scale(0.9);
  }
  to {
    transform: scale(1);
  }
}
</style>
