<template>
  <div class="container">
    <div class="content">
      <!-- -->
      <div id="a" />
      <header :style="{ 'background-image': 'url(' + header + ')' }">
        <div class="fadded">
          <!-- <h4 v-if="lastSeries">Вы остановились на {{lastSeries}} серии</h4>
          <a href="#player">
            <button v-if="lastSeries" type="button" @click="startLastSeries(lastSeries)" class="btn btn-dark"><p>Продолжить</p><i class="bi bi-play-fill"></i></button>
          </a> -->
        </div>
      </header>
      <!-- -->
      <div class="content2">
        <div class="content-left">
          <div class="banner" :style="{ 'background-image': 'url(' + banner + ')' }">
            <div class="fadded" />
          </div>
          <div class="list-block">
            <button
              type="button"
              :class="'btn btn-dark ' + listButtons['watch'].button"
              @click="listWatch('watch')"
            >
              {{ listButtons["watch"].text }}
            </button>
            <button
              type="button"
              :class="'btn btn-dark ' + listButtons['will']"
              @click="listWatch('will')"
            >
              Буду смотреть
            </button>
            <button
              type="button"
              :class="'btn btn-dark ' + listButtons['abandoned']"
              @click="listWatch('abandoned')"
            >
              Брошено
            </button>
          </div>
        </div>
        <div class="content-right">
          <h4 id="anime-name">{{ name }}</h4>
          <ul id="info-blocks">
            <li>
              <p style="font-weight: 600">Год</p>
              <p id="text">{{ year }}</p>
            </li>
            <li>
              <p style="font-weight: 600">Жанры</p>
              <p id="text">{{ genres }}</p>
            </li>
            <li v-if="player === 'animevost'">
              <p style="font-weight: 600">Animevost</p>
              <p id="text">{{ ratingAnimevost }}</p>
            </li>
            <li>
              <p style="font-weight: 600">Shikimori</p>
              <p id="text">{{ RatingShikimori }}</p>
            </li>
            <li v-if="player === 'animevost'">
              <p style="font-weight: 600">Режиссёр</p>
              <p id="text">{{ director }}</p>
            </li>
            <li>
              <p style="font-weight: 600">Эпизодов</p>
              <p id="text">{{ series }}</p>
            </li>
          </ul>
          <!-- <h4>Описание аниме</h4> -->
          <p id="anime-description">{{ description }}</p>
        </div>
      </div>
      <div
        style="
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 5em;
        "
      >
        <div
          v-if="playlistUrl != undefined"
          style="width: 100%; display: flex; padding-left: 10%; gap: 1em"
        />
        <div id="player">
          <b-dropdown
            v-if="player == 'animevost'"
            id="dropdown1"
            text="Плеер и озвучка"
            variant="dark"
          >
            <button
              type="button"
              class="btn btn-dark"
              @click="
                setQuality('720p');
              "
            >
              Animevost 720p
            </button>
            <button
              type="button"
              class="btn btn-dark"
              @click="
                setQuality('480p');
              "
            >
              Animevost 480p
            </button>
          </b-dropdown>
          <video
            v-if="playlistUrl != undefined && player === 'animevost'"
            :key="playlistUrl"
            controls
            class="video"
          >
            <source :src="playlistUrl" type="video/mp4">
          </video>
          <AnilibriaPlayer
            v-if="player === 'anilibria'"
            :options="anilibriaPlayer_videoOptions"
          />
        </div>
        <div
          v-if="playlist != undefined && player == 'animevost'"
          class="series"
          style="gap: 1em; margin-bottom: 1em"
        >
          <button
            type="button"
            class="btn btn-dark"
            style="width: 31vw"
            @click="
              startSeries(
                playlist[Number.parseInt(selectSeries.name.split(' сери')[0]) - 2]
              )
            "
          >
            Предыдущая серия
          </button>
          <button
            type="button"
            class="btn btn-dark"
            style="width: 31vw"
            @click="
              startSeries(playlist[Number.parseInt(selectSeries.name.split(' сери')[0])])
            "
          >
            Следующая серия
          </button>
        </div>
        <ul v-if="player == 'animevost'" class="series">
          <button
            v-for="i in playlist"
            type="button"
            class="btn btn-dark"
            @click="startSeries(i)"
          >
            {{ i.name }}
          </button>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
// import videojs from "video.js";
import AnilibriaPlayer from "../components/AnilibriaPlayer.vue";
import {
  loadPlaylistTitle,
  rebuildPlaylist,
  seriesFromTitle,
  titleRatingAnimevost,
  getTitleName,
  getOriginalTitleName,
  getTitleName2,
} from "../../main/api/animevost.js";
import {
  getTitleShikimori,
  getScreenshotsShikimori,
  titleRatingShikimori,
} from "../../main/api/shikimori.js";
import { setEntry, getOneEntry, removeEntry } from '../../main/indexedDB.js'
import { getAnilibriaSeries } from "../../main/api/anilibria.js";
import { getTitleInfo } from "../../main/api/api.js";
export default {
  name: "WatchAnime",
  components: {
    AnilibriaPlayer,
  },
  asyncData() {
    return {
      playlistUrl: undefined,
      playlistUrl2: undefined,
      listButtons: {
        watch: {
          button: "",
          text: "Смотрю",
        },
        watched: "",
        will: "",
        abandoned: "",
      },
      favorite: "",
      lastSeries: "",
      quality480Button: "",
      quality720Button: "active",
      player: "",
      anilibriaPlayer_videoOptions: {
        autoplay: false,
        controls: true,
        sources: [],
      },
    };
  },
  async created() {
    const link = window.location.href.split('?')[1].split('&');
    this.main_params = {
      id: link[0].split('=')[1],
      voicer: link[1].split('=')[1]
    }
    //Получаем параметры из ссылки
    console.log(window.location.href);
    //
    switch (this.main_params.voicer) {
      case 'animevost':
        this.player = this.main_params.voicer;
        const url_animevostImg = "https://v2.vost.pw";
        this.info = getTitleInfo(this.main_params.id, "animevost").data[0];
        break;
      case 'anilibria':
        console.log(this.player);
        this.player = this.main_params.voicer;
        this.info = getTitleInfo(this.main_params.id, "anilibria").data[0];
        break;
      default:
        alert("Произошла критическая ошибка! Параметр voicer указан неверно!");
        console.error("[ERROR] Произошла критическая ошибка! Параметр voicer указан неверно!");
        break;
    }
    this.name = this.info.title;
    this.genres = this.info.genre;
    this.year = this.info.year;
    if (this.player === "animevost") {
      this.director = this.info.director;
      this.series = seriesFromTitle(this.name);
      console.log(this.series);
      this.banner = this.info.urlImagePreview;
      this.description = this.info.description.replaceAll("<br />", "\n");
      this.ratingAnimevost = titleRatingAnimevost(this.info);
      if (this.director === "") {
        this.director = "Нет данных";
      }
      if (this.ratingAnimevost === "") {
        this.ratingAnimevost = "Нет данных";
      }
      this.RatingShikimori = titleRatingShikimori(getTitleName(this.info.title));
      if(getScreenshotsShikimori(getTitleShikimori(this.info.title.split("/")[0], this.year)[0].id).length !== 0){
        this.header =
          "https://shikimori.one/" +
          getScreenshotsShikimori(
            getTitleShikimori(getOriginalTitleName(this.info.title), this.year)[0].id
          )[0].original;
      }
    }
    if (this.player === "anilibria") {
      this.series = this.info.series;
      this.banner = this.info.urlImagePreview;
      this.description = this.info.description;
      this.RatingShikimori = titleRatingShikimori(this.info.title);
      this.playlist = await getAnilibriaSeries(this.info.title.split("/")[0], this.year);
      this.anilibriaPlayer_videoOptions.sources = [];
      for (const i in this.playlist) {
        this.anilibriaPlayer_videoOptions.sources.push({
          name: this.playlist[i].name,
          src: this.playlist[i].hd,
          type: "application/x-mpegURL",
        });
      }
      console.log(this.anilibriaPlayer_videoOptions.sources);
      if(getScreenshotsShikimori(getTitleShikimori(this.info.title.split("/")[0], this.year)[0].id).length !== 0){
        this.header =
          "https://shikimori.one/" +
          getScreenshotsShikimori(
            getTitleShikimori(this.info.title.split("/")[0], this.year)[0].id
          )[0].original;
      }
    }
    //Списки избранного
    this.title = await getOneEntry('favorites', this.main_params.voicer, String(this.main_params.id));
    console.log(this.title);
    // if (this.title !== null) {
    //   this.lastSeries = this.title[this.main_params.id].lastSeries; //<-- Временно закоменчено, функционал работает не стабильно
    // }
    if (this.title !== null) {
      switch (this.title.list) {
        case "watch":
          this.listButtons.watched = "";
          this.listButtons.watch.button = "active";
          this.listButtons.will = "";
          this.listButtons.abandoned = "";
          break;
        case "will":
          this.listButtons.watched = "";
          this.listButtons.watch.button = "";
          this.listButtons.will = "active";
          this.listButtons.abandoned = "";
          break;
        case "abandoned":
          this.listButtons.watched = "";
          this.listButtons.watch.button = "";
          this.listButtons.will = "";
          this.listButtons.abandoned = "active";
          break;
        case "watched":
          this.listButtons.watched = "active";
          this.listButtons.watch.button = "active";
          this.listButtons.watch.text = "Просмотрено";
          this.listButtons.will = "";
          this.listButtons.abandoned = "";
          break;
      }
    }
  },
  methods: {
    startSeries(series) {
      console.log(series);
      this.playlistUrl = series.hd;
      if (this.player === "animevost") {
        if (this.quality720Button === "active") {
          this.playlistUrl = series.hd;
        } else {
          this.playlistUrl = series.std;
        }
      }
    this.selectSeries = series;
    },
    startLastSeries(series) {
      this.startSeries(this.playlist[series - 1]);
    },
    listWatch(list) {
      switch (list) {
        case "watch":
          if (this.listButtons.watch.button !== "active") {
            setEntry('favorites', this.main_params.voicer, String(this.main_params.id), { list: 'watch', lastSeries: '' });
            this.listButtons.watched = "";
            this.listButtons.watch.button = "active";
            this.listButtons.will = "";
            this.listButtons.abandoned = "";
          } else if (this.listButtons.watched !== "active") {
              setEntry('favorites', this.main_params.voicer, String(this.main_params.id), { list: 'watched', lastSeries: '' });
              this.listButtons.watched = "active";
              this.listButtons.watch.button = "active";
              this.listButtons.watch.text = "Просмотрено";
              this.listButtons.will = "";
              this.listButtons.abandoned = "";
            } else {
              this.listButtons.watched = "";
              this.listButtons.watch.button = "";
              this.listButtons.will = "";
              this.listButtons.abandoned = "";
              this.listButtons.watch.text = "Смотрю";
              removeEntry('favorites', this.main_params.voicer, String(this.main_params.id));
            }
          break;
        case "will":
          if (this.listButtons.will !== "active") {
            setEntry('favorites', this.main_params.voicer, String(this.main_params.id), { list: 'will', lastSeries: '' });
          } else {
            removeEntry('favorites', this.main_params.voicer, String(this.main_params.id));
            this.listButtons.will = "";
            break;
          }
          this.listButtons.watched = "";
          this.listButtons.watch.button = "";
          this.listButtons.will = "active";
          this.listButtons.abandoned = "";
          this.listButtons.watch.text = "Смотрю";
          break;
        case "abandoned":
          if (this.listButtons.abandoned !== "active") {
            setEntry('favorites', this.main_params.voicer, String(this.main_params.id), { list: 'abandoned', lastSeries: '' });
          } else {
            removeEntry('favorites', this.main_params.voicer, String(this.main_params.id));
            this.listButtons.abandoned = "";
            break;
          }
          this.listButtons.watched = "";
          this.listButtons.watch.button = "";
          this.listButtons.will = "";
          this.listButtons.abandoned = "active";
          this.listButtons.watch.text = "Смотрю";
          break;
      }
    },
    setQuality(quality) {
      switch (quality) {
        case "480p":
          this.quality480Button = "active";
          this.quality720Button = "";
          this.playlist = rebuildPlaylist(loadPlaylistTitle(this.info.id));
          this.playlistUrl = this.playlist[0];
          break;
        case "720p":
          this.quality480Button = "";
          this.quality720Button = "active";
          this.playlist = rebuildPlaylist(loadPlaylistTitle(this.info.id));
          this.playlistUrl = this.playlist[0];
          break;
      }
    },
  },
};
</script>
<style scoped>
.container {
  padding-top: 3.5em;
  padding-left: 3vw;
  overflow-y: hidden;
}
.content {
  width: 100%;
  overflow-y: scroll;
  padding-bottom: 3em;
  overflow-y: hidden;
}
.content2 {
  display: flex;
}
.content .banner {
  width: 22vw;
  height: 30vw;
  background-size: cover;
  padding: 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
}
.fadded {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}
header .fadded {
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: flex-end;
  padding: 1em;
}
header .fadded h4 {
  margin-left: 0.4em;
  color: rgba(255, 255, 255, 0.5);
  font-size: large;
}
header .fadded button {
  display: flex;
  height: 2.5em;
  margin-left: 1em;
}
header .fadded button i {
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  margin-left: 0.8em;
  margin-bottom: 0.7em;
}
header .fadded button p {
  color: rgba(255, 255, 255, 0.5);
}
header .fadded a {
  text-decoration: none;
}
.content .content-left {
  margin-right: 1em;
}
.content .content-right {
  width: 100%;
  padding: 1em;
  gap: 1em;
  display: flex;
  flex-direction: column;
}
.content .content-right h4,
.content .content-right p {
  color: white;
}
.content .content-right #info-blocks {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(10vw, auto);
  width: 100%;
  list-style-type: none;
  padding: 0;
  gap: 1em;
}
.content .content-right #info-blocks li {
  /* width: 15vw;
  height: 10vw; */
  background-color: rgb(39, 39, 39);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2em;
  padding: 2em;
}
.content .content-right #info-blocks li p {
  margin: 0;
  text-align: center;
}
.video {
  width: 100%;
  height: 50vw;
  margin-bottom: 1em;
}
.series {
  width: 65vw;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  gap: 1em;
  justify-content: center;
}
.series li {
  margin: 0;
  padding-top: 1em;
  padding-left: 1em;
  padding-right: 1em;
  background-color: rgb(39, 39, 39);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
}
.series li p {
  color: white;
}
header {
  width: 100%;
  height: 25vw;
  background-image: url("https://static.openni.ru/uploads/posts/2022-03/1647853154_1.jpg");
  margin-bottom: 1em;
  background-attachment: fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-position-y: -10vh;
  background-repeat: no-repeat;
}
.list-block {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  justify-content: center;
  padding-top: 1em;
}
.list-block button{
  width: 100%;
}
#player {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1em;
}
#player ul {
  background-color: #212529;
  padding: 1em;
}
#dropdown1{
  width: 100%;
}
</style>
<style>

</style>
