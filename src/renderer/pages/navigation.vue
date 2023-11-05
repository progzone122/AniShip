<template>
  <div class="main">
    <div class="left">
      <v-chip-group v-model="genres_active" column multiple class="filters-group">
        <div v-for="genre in genres" :key="genre.id">
          <v-chip color="primary" :value="genre.id" filter>
            <h4>{{ genre.russian }}</h4>
          </v-chip>
        </div>
      </v-chip-group>
    </div>
    <div class="right">
      <div class="animes">
        <div
          v-for="anime in animes" :key="anime"
          @click="$router.push({ name: 'watch', query: { id: anime.id } })"
        >
          <CardAnimeBlock :params="anime" />
        </div>
        <infinite-loading v-if="animes.length" spinner="spiral" @infinite="infiniteScroll" />
      </div>
    </div>
  </div>
</template>

<script>
const ShikimoriAPI = require('~/assets/shikimori/index')
const shiki = new ShikimoriAPI()
export default {
  name: 'Navigation',
  layout: 'default',
  async asyncData ({ $axios }) {
    const genres = []
    const genres_resp = await shiki.genres.list()
    console.log(genres_resp)
    genres_resp.forEach(function (item, i, arr) {
      if (item.kind === 'anime') {
        genres.push(item)
      }
    })
    console.log(genres_resp)
    return {
      genres
    }
  },
  data () {
    return {
      genres_active: null,
      animes: [],
      delayTimer: null,
      page: 1
    }
  },
  computed: {
    url () {
      return `https://shikimori.me/api/animes?genre=${this.genres_active}&limit=20&page=${this.page}&order=popularity`
    }
  },
  watch: {
    genres_active () {
      this.page = 1
      this.fetchData()
    }
  },
  created () {

  },
  methods: {
    // search_filters() {
    //   console.log(this.genres_active)
    //   if (this.delayTimer !== null) {
    //     clearTimeout(this.delayTimer)
    //   }
    //   this.delayTimer = setTimeout(() => {
    //     this.$axios.get(this.url).then(res => {
    //       this.animes = res
    //     })
    //     console.log(this.items)
    //   }, 1000)
    // },
    async fetchData () {
      const response = await this.$axios.get(this.url)
      this.animes = response.data
      console.log(this.animes)
    },
    infiniteScroll ($state) {
      this.page++
      console.log(this.page)
      this.$axios
        .get(this.url)
        .then(response => {
          console.log(response)
          if (response.data.length > 1) {
            response.data.forEach(item => this.animes.push(item))
            $state.loaded()
          } else {
            $state.complete()
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style scoped lang="scss">
@import "~/assets/variables.scss";

.main {
  display: flex;
  gap: 1em;
  min-height: 100vh;
  .left {
    width: 30%;

    .filters-group {
      .v-chip {
        margin: 0.5em;

        h4 {
          margin-top: 0.2em;
          font-size: 16px;
          padding: 0.3em;
        }
      }
    }
  }

  .right {
    width: 70%;
  }
}

.animes {
  margin-top: 1em;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
<style>
i {
  color: white !important;
}
</style>
