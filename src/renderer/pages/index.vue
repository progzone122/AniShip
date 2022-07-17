<template>
  <div class="content">
    <header>
      <button
        type="button"
        :class="'btn btn-dark ' + topButtons['new']"
        @click="menu('new')"
      >
        Новое
      </button>
      <button
        type="button"
        :class="'btn btn-dark ' + topButtons['ongoings']"
        @click="menu('ongoings')"
      >
        Онгоинги
      </button>
      <button
        v-if="voicer === 'animevost'"
        type="button"
        :class="'btn btn-dark ' + topButtons['anons']"
        @click="menu('anons')"
      >
        Анонсы
      </button>
      <button
        v-if="voicer === 'animevost'"
        type="button"
        :class="'btn btn-dark ' + topButtons['random']"
        @click="menu('random')"
      >
        Мне повезёт
      </button>
    </header>
    <!-- -->
    <div class="container">
      <div v-for="i in titles" :key="i.id" class="block">
        <nuxt-link :to="{ path: 'WatchAnime', query: { id: i.id, voicer: voicer } }">
          <div
            class="image"
            :style="{ 'background-image': 'url(' + i.urlImagePreview + ')' }"
          >
            <div class="faded">
              <div class="anime-bottom">
                <p class="anime-name">{{ i.title.split("/")[0] }}</p>
                <p class="anime-description">
                  {{ descr(i.description) }}
                </p>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
      <div
        v-if="filter == 'new' && voicer !== 'anilibria'"
        id="loadanimes"
        class="block"
        @click="getMoreTitles()"
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
</template>

<script>
import { getDefaultVoicer } from '../../main/settings.js'
import { loadTitles } from '../../main/api/api.js'

export default {
  name: 'IndexPage',
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
  async created() {
    this.titles = await loadTitles('new', 1);
    this.titles = this.titles.data;
    console.log(this.titles);
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
    descr (d) {
      if (d.toString().includes('<br />')) {
        return d.toString().replaceAll('<br />', '\n').substr(0, 200) + '...'
      } else {
        return d.substr(0, 200) + '...'
      }
    },
    async getMoreTitles () {
      this.page = this.page + 1;
      let titles2 = await loadTitles(this.filter, this.page);
      titles2 = titles2.data;
      console.log(titles2);
      for (const i in titles2) {
        this.titles.push(titles2[i]);
      }
    }
  }
}
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
.content .container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-columns: repeat(4, 21vw);
  position: absolute;
  left: 7vw;
  gap: 1em;
  padding-bottom: 10em;
}
.content .container .block:nth-child(1) {
  grid-column: 1 / 4;
  margin-bottom: 2em;
  height: 100%;
}
.footer {
  height: 20em;
  width: 100%;
}

a {
  text-decoration: none;
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
