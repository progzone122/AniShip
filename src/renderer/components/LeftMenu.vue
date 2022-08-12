<template>
  <ul class="left-menu">
    <div class="voicer">
      <b-icon class="block" icon="bullseye" style="width: 1.4em;" @click="voicer_list = !voicer_list" />
    </div>
    <transition name="fade">
      <div v-if="voicer_list" class="voicer-list">
        <img class="block" src="~assets/voicers/animevost.png" @click="changeVoicer('animevost')">
        <img class="block" src="~assets/voicers/anilibria.png" @click="changeVoicer('anilibria')">
      </div>
    </transition>
    <div @click="menu('search')"><nuxt-link to="/SearchAnime"><b-icon :icon="searchButton" /></nuxt-link></div>
    <div @click="menu('home')"><nuxt-link to="/"><b-icon :icon="'house-door' + homeButton" /></nuxt-link></div>
    <div @click="menu('favorites')"><nuxt-link to="/favorites"><b-icon :icon="'star' + favoritesButton" /></nuxt-link></div>
    <div @click="menu('coubs')"><nuxt-link to="/coubs"><b-icon :icon="'camera-reels' + coubsButton" /></nuxt-link></div>
    <div @click="menu('settings')"><nuxt-link to="/settings"><b-icon :icon="'gear' + settingsButton" /></nuxt-link></div>
  </ul>
</template>

<script>
import { getDefaultVoicer } from '../../main/settings.js'
export default {
  name: 'LeftMenu',
  data(){
    return {
      searchButton: "search",
      homeButton: "-fill",
      favoritesButton: "",
      coubsButton: "",
      settingsButton: "",
      voicer: getDefaultVoicer(),
      voicer_buttonImg: "",
      voicer_list: false
    }
  },
  created() {
    switch(this.voicer){
      case "animevost":
        this.voicer_buttonImg = '~assets/voicers/animevost.png';
        break;
      case "anilibria":
        this.voicer_buttonImg = '~assets/voicers/anilibria.png';
        break;
    }
  },
  methods: {
    menu(v){
      switch (v) {
        case 'search':
          this.searchButton = "search";
          this.homeButton = "";
          this.favoritesButton = "";
          this.coubsButton = "";
          this.settingsButton = "";
          break;
        case 'home':
          this.searchButton = "search";
          this.homeButton = "-fill";
          this.favoritesButton = "";
          this.coubsButton = "";
          this.settingsButton = "";
          break;
        case 'favorites':
          this.searchButton = "search";
          this.homeButton = "";
          this.favoritesButton = "-fill";
          this.coubsButton = "";
          this.settingsButton = "";
          break;
        case 'coubs':
          this.searchButton = "search";
          this.homeButton = "";
          this.favoritesButton = "";
          this.coubsButton = "-fill";
          this.settingsButton = "";
          break;
        case 'settings':
          this.searchButton = "search";
          this.homeButton = "";
          this.favoritesButton = "";
          this.coubsButton = "";
          this.settingsButton = "-fill";
          break;
      }
    },
    changeVoicer(v){
      this.voicer_list = !this.voicer_list;
      this.voicer = v;
      switch(this.voicer){
        case "animevost":
          this.voicer_buttonImg = '~assets/voicers/animevost.png';
          break;
        case "anilibria":
          this.voicer_buttonImg = '~assets/voicers/anilibria.png';
          break;
      }
      localStorage.setItem('voicer', v);
      window.location.href = "";
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/css/theme.scss";
.left-menu {
  list-style-type: none;
  height: 100%;
  padding: 3em 0 0 0;
  width: 5em;
  position: fixed;
  top: 0;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1em;
    height: 4em;
    padding-left: 0.5;
    &:hover {
        border-radius: 0 0.5em 0.5em 0;
    }
  }
  .active {
    border-radius: 0 0.5em 0.5em 0;
    background-color: $leftMenuVoicer_color;
  }
}
svg {
  font-size: $leftMenuSvg_size;
  color: $svg_color;
}
.voicer{
  width: 4em;
  height: 4em;
  padding: 0.7em;
  margin-bottom: 1em;
  .block{
    width: 100%;
    height: 100%;
    border-radius: 1.5em;
    margin-left: 0.5em;
    background-size: cover;
    cursor: pointer;
  }
}
.voicer-list{
  width: 4em;
  position: absolute;
  background-color: $leftMenuVoicer_color;
  padding: 0.7em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
  left: 0.5em;
  border-radius: 1em;
  .block{
    width: 100%;
    height: 2.6em;
    border-radius: 1.5em;
    background-size: cover;
    background-color: white;
    cursor: pointer;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
