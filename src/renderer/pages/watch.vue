<template>
  <div>
    <v-row class="banner-block">
      <WatchScreenshotsCarousel height="100%" :anime_id="$route.query.id" />
    </v-row>
    <v-container class="c c-watch">
      <div class="anime-info rounded-lg">
        <div style="display: flex; gap: 1em;">
          <div style="width: 13em; height: 100%;">
            <v-img
              :lazy-src="'https://shikimori.one' + anime_info.image.preview"
              :src="'https://shikimori.one' + anime_info.image.original" class="rounded-lg"
            />
            <div style="width: 100%; display: flex; justify-content: center;">
              <v-rating :value="anime_info.score" length="10" color="amber" dense half-increments readonly size="12" />
            </div>
            <SetAnimeLists v-if="account" :anime="anime_info" />
          </div>
          <!-- -->
          <div style="width: 100%; display: flex; flex-direction: column; gap: 1em;">
            <h2>{{ anime_info.name }}</h2>
            <h4>Статус: {{ getShikiStatus(anime_info.status) }}</h4>
            <div style="color: white;" v-html="anime_info.description_html" />
            <div style="width: 100%;" v-if="shikimori_franchise.nodes.length !== 0">
              <h4>Франшиза:</h4>
              <WatchFranchiseAnime :params="shikimori_franchise" />
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5em; width: 100%;">
              <v-chip
                v-for="genre in anime_info.genres" :key="genre.id" dark class="bl genre-chip"
                style="padding: 1.5em !important;"
              >
                {{ genre.russian }}
              </v-chip>
            </div>
          </div>
        </div>
      </div>
      <div v-if="anime_info.status !== 'anons'" class="player-block rounded-lg">
        <div class="player-block_left">
          <KodikPlayer v-if="anime_sourcesActive === 'kodik'" :params="kodik_player" />
          <AnilibriaPlayer v-if="anime_sourcesActive === 'anilibria'" :params="anilibria_player" />
        </div>
        <div class="player-block_right">
          <v-list dense dark rounded class="anime_sources-list">
            <h3 style="margin: 0.5em;">Выбор источника</h3>
            <div v-for="item in anime_sources">
              <v-list-item :key="item" @click="anime_sourcesActive = item.id">
                <v-list-item-content>
                  <v-list-item-title v-text="item.name" />
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-list>
        </div>
      </div>
      <WatchSimilarAnimes :id="anime_info.id" />
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

const ShikimoriAPI = require('~/assets/shikimori/index')
const shiki = new ShikimoriAPI()

export default {
  name: 'Index',
  components: {
    KodikPlayer: () => import('~/components/players/KodikPlayer.vue'),
    AnilibriaPlayer: () => import('~/components/players/AnilibriaPlayer.vue')
  },
  async beforeRouteUpdate (to, from, next) {
    console.log(to)
    this.anime_info = await shiki.animes.get(to.query.id)
    this.shikimori_franchise = await shiki.animes.getFranchise(to.query.id)
    this.anime_sources = []
    this.addSources()
    next()
  },
  layout: 'default',
  async asyncData ({ $store, query }) {
    console.log(await shiki.animes.get(query.id))
    const shikimori = await shiki.animes.get(query.id)
    const shikimori_franchise = await shiki.animes.getFranchise(query.id)
    return {
      anime_info: shikimori,
      shikimori_franchise
    }
  },
  data () {
    return {
      image: {},
      anime_sources: [],
      anime_sourcesActive: null,
      kodik_player: null
    }
  },
  created () {
    this.addSources()
  },
  computed: {
    ...mapGetters([
      'account'
    ])

  },
  methods: {
    getShikiStatus (status) {
      switch (status) {
      case 'released':
        return 'вышло'
      case 'ongoing':
        return 'онгоинг'
      case 'anons':
        return 'анонс'
      default:
        return 'ошибка загрузки'
      }
    },
    addSources () {
      this.$axios.get(`https://kodikapi.com/search?shikimori_id=${this.$route.query.id}&limit=1&token=b7cc4293ed475c4ad1fd599d114f4435`).then(result => {
        console.log(result)
        if (result !== undefined && result !== null && result.data.results.length !== 0) {
          this.kodik_player = result
          this.anime_sources.push({
            id: 'kodik',
            name: 'Kodik'
          })
          console.log(this.kodik_player)
        }
      })
      if (this.anime_info.fandubbers.includes('AniLibria')) {
        this.$axios.get(`https://api.anilibria.tv/v2/searchTitles?search=${encodeURIComponent(this.anime_info.name)}&limit=1`).then(result => {
          console.log(result)
          if (result !== undefined && result !== null && result.data[0].length !== 0) {
            this.anilibria_player = result.data[0]
            this.anime_sources.push({
              id: 'anilibria',
              name: 'Anilibria'
            })
            console.log(this.anilibria_player)
          }
        }).catch(error => {
          if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
            return res.status(500).json({ error: error.response.status })
          } else if (error.request) {
            console.log(error.request)
            return res.status(500).json({ error: error.request })
          } else {
            console.log('Error', error.message)
            return res.status(500).json({ error: error.message })
          }
        })
      }
    }
  }
}
</script>
<style scoped lang="scss">
@import "~/assets/variables.scss";

a {
  color: red !important;

  &:active {
    color: red !important;
  }

  &:visited {
    color: red !important;
  }
}
</style>
<style lang="scss">
@import "~/assets/variables.scss";

a {
  color: white !important;

  &:active {
    color: white !important;
  }

  &:visited {
    color: white !important;
  }
}

@import "~/assets/variables.scss";

i {
  color: white !important;
}

.banner-block {
  height: 65vh;
  width: 97vw;
  top: 4em;
  right: 0;
  position: absolute;
}

.anime-info {
  display: flex;
  flex-direction: column;
  gap: 1em;
  background-color: $color2;
  width: 80vw;
  padding: 1em;
  margin-bottom: 3em;
}

.c-watch {
  position: absolute;
  top: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.player-block {
  width: 80vw;
  min-height: 30em;
  background-color: $color2;
  display: flex;
  padding: 1em;
  gap: 1em;

  .player-block_left {
    width: 70%;
    height: 100%;
  }

  .player-block_right {
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1em;

    .anime_sources-list {
      background-color: transparent !important;
    }
  }
}

.genre-chip {
  background-color: $color1 !important;
}
</style>
