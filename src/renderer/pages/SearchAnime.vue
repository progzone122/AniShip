<template>
  <div id="content" class="content">
    <div class="container2">
      <div class="content-left">
        <input v-model="searchInput" placeholder="Введите название и нажмите Enter" class="search-input" @keyup.enter="submit">
        <div style="margin-top: 1em; display: flex; flex-wrap: wrap; gap: 1em">
          <button v-for="i in genres" :key="i" type="button" class="btn btn-dark genre" @click="searchGenres(i)">{{ i }}</button>
        </div>
      </div>
      <div class="content-right">
        <div v-if="res.animevost" style="width: 100%;">
          <h4>Animevost</h4>
          <hr>
        </div>
        <div style="width: 100%; display: flex; flex-wrap: wrap; gap: 1em;">
          <div v-for="i in res.animevost" class="block">
            <nuxt-link :to="{name: 'WatchAnime', query: { id: i.id, voicer: 'animevost' } }">
              <div class="image" :style="{ 'background-image': 'url(' + i.urlImagePreview + ')' }">
                <div class="faded">
                  <div class="anime-bottom">
                    <p class="anime-name">{{ i.title }}</p>
                  </div>
                </div>
              </div>
            </nuxt-link>
          </div>
          <div
            v-if="genre !== undefined"
            id="loadanimes"
            class="block"
            @click="getMoreTitles"
          >
            <div
              class="image"
              style="
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                background-position: 0;
              "
            >
              <b-icon icon="plus-lg" style="color: white; margin-bottom: 0.5em;" />
              <p style="color: white">Загрузить ещё</p>
            </div>
          </div>
        </div>
        <div v-if="res.anilibria" style="width: 100%;">
          <h4>Anilibria</h4>
          <hr>
        </div>
        <div style="width: 100%; display: flex; flex-wrap: wrap; gap: 1em;">
          <div v-for="i in res.anilibria" class="block">
            <nuxt-link :to="{name: 'WatchAnime', query: { id: i.id, voicer: 'anilibria' } }">
              <div class="image" :style="{ 'background-image': 'url(' + i.urlImagePreview + ')' }">
                <div class="faded">
                  <div class="anime-bottom">
                    <p class="anime-name">{{ i.title.split("/")[0] }}</p>
                  </div>
                </div>
              </div>
            </nuxt-link>
          </div>
          <div
            v-if="genre !== undefined"
            id="loadanimes"
            class="block"
            @click="getMoreTitles2"
          >
            <div
              class="image"
              style="
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                background-position: 0;
              "
            >
              <b-icon icon="plus-lg" style="color: white; margin-bottom: 0.5em;" />
              <p style="color: white">Загрузить ещё</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LoadingBlock v-if="loading" message="Загрузка данных с сервера..." />
    <div class="up"><a href="#content"><i class="bi bi-arrow-up-circle-fill" /></a></div>
  </div>
</template>

<script>
import { getGenres, searchInGenreAnimevost } from "../../main/api/animevost.js";
import { searchInName, searchInGenre } from "../../main/api/api.js"
import LoadingBlock from "../components/LoadingBlock.vue"
export default {
  name: "SearchAnime",
  components: {
    LoadingBlock
  },
  data () {
    return {
      genres: getGenres(),
      res: {
        animevost: undefined,
        anilibria: undefined
      },
      genre: undefined,
      page: 1,
      page2: 0,
      url_animevostImg: "https://v2.vost.pw",
      loading: false,
      searchInput: ""
    };
  },
  async mounted() {
    
  },
  created() {
    delete this.genres[3];
    delete this.genres[4];
    delete this.genres[24];
    delete this.genres[30];
    delete this.genres[31];
    delete this.genres[37];
    delete this.genres[61];
    delete this.genres[68];
  },
  methods: {
    searchGenres(i){
      this.loading = true;
      setTimeout(async () => {
      this.page = 1;
      this.genre = i;
      this.res = await searchInGenre(i, 1);
      this.loading = false;
      console.log(this.res);
      }, 50);
    },
    getMoreTitles(){
      this.loading = true;
      setTimeout(async () => {
      this.page = this.page + 1;
      const res2 = searchInGenreAnimevost(this.genre, this.page);
      console.log(res2);
      for (const i in res2) {
        this.res.animevost.push(res2[i]);
      }
      this.loading = false;
      }, 100);
    },
    async getMoreTitles2(){
      this.page2 = this.page2 + 15;
      let res2 = await searchInGenre(this.genre, this.page2);
      res2 = res2.anilibria;
      for (const i in res2) {
        this.res.anilibria.push(res2[i]);
      }
    },
    submit(){
      // if(this.searchInput.length >= 3){
      //   this.res = searchInName(this.searchInput).data;
      // }
      this.res = searchInName(this.searchInput);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
hr{
  width: 100%;
  color: white;
  height: 0.1em;
}
h4{
  color: white;
}
.container2 {
  display: flex;
  gap: 2em;
  padding-left: 1em;
}
.content {
  width: 100vw;
  padding-left: 5em;
  padding-top: 4vw;
  display: flex;
  padding-bottom: 5em;
}
.content-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  width: 65vw;
  gap: 1em;
  padding-bottom: 10em;
  padding-right: 2em;
}
.content-left{
  width: 30vw;
  padding: 1em;
  padding-bottom: 6em;
}
.search-input {
  background-color: transparent;
  border: 1px solid white;
  border-radius: 0.4em;
  width: 100%;
  color: white;
  padding: 7px;
  height: 2.4em;
  width: 100%;
}
.search-input:focus,
.search-input:hover {
  box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.65);
  background-color: #0e0e0e;
  outline: none;
}
/* .genre{
  border-radius: 1em;
} */
i{
  color: white;
}
@media screen and (max-width: 1401px) {
  /* .content-right {
    display: grid;
    grid-template-columns: repeat(2, 21vw);
    gap: 1em;
  } */
}
@media screen and (max-width: 2000px) {
  /* .content-right {
    grid-template-columns: repeat(3, 21vw);
  } */
}
a {
  text-decoration: none;
}
.block {
  height: 25vw;
  width: 18vw;
  background-color: #1a1e21;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
}
.block .image {
  width: 101%;
  height: 102%;
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
#app, body, html, .container2, .content{
  overflow-y: hidden;
}
.up{
  position: fixed;
  bottom: 4%;
  right: 3.4%;
  cursor: pointer;
}
.up a{
  text-decoration: none;
}
.up a i{
  font-size: 2.5em;
  color: rgb(49, 55, 59, 0.6);
}
</style>