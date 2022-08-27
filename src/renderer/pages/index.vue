<template>
  <div class="content">
    <!-- -->
    <div class="container">
      <p v-if="recent_titles.length !== 0" style="font-weight: 600; margin-top: 2em;">Последнее просмотренное</p>
      <div class="titles" style="margin-bottom: 1em;">
        <div v-for="i in recent_titles.slice(0, 4)" :key="i">
          <TitleBlock :title="i" :voicer="voicer" />
        </div>
      </div>
      <!-- -->
      <ul class="categories">
        <li 
          @click="menu('new')"
        >
          <div class="icon-block">
            <b-icon icon="clock" />
          </div>
          <p>Последняя активность</p>
        </li>
        <li
          @click="menu('ongoings')"
        >
          <div class="icon-block">
            <b-icon icon="calendar-week" />
          </div>
          <p>Онгоинги</p>
        </li>
        <li
          v-if="voicer !== 'anilibria'"
          @click="menu('anons')"
        >
          <div class="icon-block">
            <b-icon icon="calendar2-date" />
          </div>
          <p>Анонсы</p>
        </li>
        <li
          @click="menu('random')"
        >
          <div class="icon-block">
            <b-icon icon="shuffle" />
          </div>
          <p>Мне повезёт</p>
        </li>
      </ul>
      <div class="titles" style="margin-bottom: 2em;">
        <div v-for="i in titles" :key="i.id">
          <TitleBlock :title="i" :voicer="voicer" />
        </div>
      </div>
      <!-- -->
      <div v-if="filter !== 'random'" style="width: 100%; display: flex; justify-content: center;">
        <button
          squared
          class="btn btn-dark"
          style="
              margin-bottom: 2em;
            "
          @click="getMoreTitles()"
        >
          Загрузить ещё
        </button>
      </div>
      <!-- -->
    </div>
  </div>
</template>

<script>
import { getDefaultVoicer } from '../../main/settings.js'
import { loadTitles, getTitleInfo } from '../../main/api/api.js'
import { getAllKeys, getOneEntry } from '../../main/indexedDB.js'
import TitleBlock from '../components/TitleBlock.vue'
export default {
  name: 'IndexPage',
  components: {
    TitleBlock
  },
  async asyncData() {
    let titles = await loadTitles('new', 1);
    titles = titles.data;
    const recent_titles_keys = await getAllKeys('recent_titles', getDefaultVoicer());
    const recent_titles = [];
    for(const i in recent_titles_keys.sort((a, b) => b - a)){
      recent_titles[i] = await getTitleInfo(Number(recent_titles_keys[i]), getDefaultVoicer());
      recent_titles[i] = recent_titles[i].data[0];
    }
    return {
      titles,
      recent_titles
    }
  },
  data() {
    return {
      filter: 'new',
      topButtons: {
        new: 'active',
        ongoings: 'noactive',
        anons: 'noactive',
        random: 'noactive'
      },
      titles: [],
      page: 1,
      voicer: getDefaultVoicer()
    }
  },
  methods: {
    async menu (filter) {
      this.filter = filter
      switch (filter) {
      case 'new':
        this.topButtons.new = 'active'
        this.topButtons.ongoings = 'noactive'
        this.topButtons.anons = 'noactive'
        this.topButtons.random = 'noactive'
        this.page = 1
        this.titles = await loadTitles('new', 1)
        this.titles = this.titles.data;
        break
      case 'ongoings':
        this.topButtons.new = 'noactive'
        this.topButtons.ongoings = 'active'
        this.topButtons.anons = 'noactive'
        this.topButtons.random = 'noactive'
        this.page = 1
        this.titles = await loadTitles('ongoings', 1)
        this.titles = this.titles.data;
        break
      case 'anons':
        this.topButtons.new = 'noactive'
        this.topButtons.ongoings = 'noactive'
        this.topButtons.anons = 'active'
        this.topButtons.random = 'noactive'
        this.page = 1
        this.titles = await loadTitles('anons', 1)
        this.titles = this.titles.data;
        break
      case 'random':
        this.topButtons.new = 'noactive'
        this.topButtons.ongoings = 'noactive'
        this.topButtons.anons = 'noactive'
        this.topButtons.random = 'active'
        this.page = 1
        this.titles = await loadTitles('random', 1)
        this.titles = this.titles.data;
        break
      default:
        break
      }
    },
    async getMoreTitles () {
      this.page = this.page + 1;
      let titles2 = await loadTitles(this.filter, this.page);
      titles2 = titles2.data;
      for (const i in titles2) {
        this.titles.push(titles2[i]);
      }
    }
  }
}
</script>
<style scoped lang="scss">
  @import "../assets/css/theme.scss";
  @import "../assets/css/animations.scss";
  .container{
      margin-top: 3em;
      margin-left: 9vw;
      width: 100vw;
  }
  .categories{
      width: 100%;
      padding: 0;
      list-style-type: none;
      font-weight: 600;
      display: grid;
      gap: 2em;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      li{
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
          background-color: $liBlock_backgroundColor;
          height: 5em;
          display: flex;
          align-items: center;
          cursor: pointer;
          transform: scale(1s);
          &:hover{
              animation: zoom 0.3s cubic-bezier(0, 0.55, 0.45, 1);
              transform: scale(0.9);
          }
      }
      p{
          margin-top: 1em;
      }
      .icon-block{
          width: 5em;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
              svg{
                  color: $svg_color;
                  font-size: $svgLeftMenu_size;
              }
      }
  }
  .titles{
      width: 100%;
      display: grid;
      gap: $indexTitles_gap;
      grid-template-columns: repeat($indexTitles_columns, 1fr);
      padding: 0;
  }
</style>