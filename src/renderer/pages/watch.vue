<template>
  <v-container fluid>
    <v-row class="ma-0 pa-0">
      <v-col class="col-4 col-md-4 col-lg-3 col-xl-3">
        <v-card v-if="anime_info" class="content pa-4 rounded-lg col-12" color="primary">
          <CardAnimeBlock :params="anime_info" :watch_button="false" width="100%" height="27vw" class="rounded-xl" />
          <v-divider class="my-4" />
          <WatchAnimeSources v-if="hls_player === null && iframe_player === null" class="my-2 rounded-xl" />
          <v-btn
            v-if="hls_player !== null || iframe_player !== null" rounded color="accent" dark width="100%"
            @click="hls_player = null; iframe_player = null;"
          >
            Выйти из плеера
          </v-btn>
          <SetAnimeLists v-if="account" class="my-2" :anime="anime_info" />
        </v-card>
      </v-col>
      <v-col v-if="hls_player === null && iframe_player === null" class="col-8 col-lg-9 ma-0 pa-0">
        <v-col class="mb-4">
          <v-card class="pa-4 rounded-lg" color="primary" height="30vw">
            <WatchScreenshotsCarousel :anime_id="anime_info.id" height="100%" class="rounded-xlspo" />
          </v-card>
        </v-col>
        <v-col>
          <v-card class="pa-4 rounded-lg" color="primary">
            <v-col>
              <h4>Информация</h4>
              <v-expansion-panels v-model="panel" class="d-flex mt-4 rounded-xl" multiple>
                <v-expansion-panel :style="{ background: $vuetify.theme.themes.dark.background }">
                  <v-expansion-panel-header>Описание</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <div style="color: white; pointer-events: none;" v-html="anime_info.description_html" />
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel :style="{ background: $vuetify.theme.themes.dark.background }">
                  <v-expansion-panel-header>Жанры</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-chip-group column>
                      <v-chip v-for="genre in getGenres" :key="tag" color="primary" disabled>
                        {{ genre.russian }}
                      </v-chip>
                    </v-chip-group>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="pa-4 rounded-lg" color="primary" height="12em">
            <v-col>
              <h4>Франшиза</h4>
            </v-col>
            <WatchFranchiseAnime v-if="getFranchise.nodes.length !== 0" :params="getFranchise" />
            <v-list v-else color="primary">
              <v-list-item-group v-model="model">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title style="color: white;">{{ anime_info.russian }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
      </v-col>
      <v-col v-else class="col-8 col-lg-9 ma-0 pa-0">
        <v-col v-if="hls_player !== null">
          <v-card>
            <HlsPlayer :shikimori_info="anime_info" :source="hls_player" />
          </v-card>
        </v-col>
        <v-col v-if="iframe_player !== null">
          <v-card height="38.2vw">
            <IframePlayer :shikimori_info="anime_info" :source="iframe_player" />
          </v-card>
        </v-col>
      </v-col>
    </v-row>
    <v-col v-if="hls_player === null" width="100%">
      <WatchSimilarAnimes :id="anime_info.id" />
    </v-col>
  </v-container>
</template>

<script>
import console from 'console'
import { mapGetters, mapActions } from 'vuex'

const ShikimoriAPI = require('~/assets/shikimori/index')
const shiki = new ShikimoriAPI()

export default {
  name: 'Watch',
  components: {
    IframePlayer: () => import('~/components/players/IframePlayer.vue'),
    HlsPlayer: () => import('~/components/players/HlsPlayer.vue')
  },
  layout: 'default',
  async asyncData ({ store, query }) {
    const shikimori = await shiki.animes.get(query.id)
    const shikimori_franchise = await shiki.animes.getFranchise(query.id)
    await store.commit('watch/setShikimori_info', shikimori)
    await store.commit('watch/setFranchise', shikimori_franchise)
  },
  data () {
    return {
      image: {},
      anime_sources: [],
      anime_sourcesActive: null,
      kodik_player: null,
      hls_player: null,
      iframe_player: null
    }
  },
  created () {
    console.log(this.anime_info)
    this.$nuxt.$on('sourceShow', $event => this.sourceShow($event))
  },
  computed: {
    ...mapGetters([
      'account'
    ]),
    ...mapGetters('watch', [
      'getFranchise',
      'getGenres',
      'getEpisodes'
    ]),
    anime_info () {
      return this.$store.state.watch.shikimori_info
    }
  },
  watch: {
    anime_info () {
      return this.$store.state.watch.shikimori_info
    },
    getGenres () {
      return this.$store.state.watch.shikimori_info.genres
    },
    getEpisodes () {
      return {
        episodes: this.$store.state.watch.shikimori_info.episodes ?? 0,
        episodes_aired: this.$store.state.watch.shikimori_info.episodes_aired ?? 0,
        next_episode_at: this.$store.state.watch.shikimori_info.next_episode_at ?? null
      }
    }
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
    sourceShow ($event) {
      const api = require('sources')
      const pl = new api({
        shikimori_info: null,
        plyr: null,
        axios: null
      })
      switch (pl.sources[$event].player_ref) {
      case 'iframe':
        this.iframe_player = $event
        break
      case 'hls':
        this.hls_player = $event
        break
      default:
        break
      }
    }
  }
}
</script>
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

/* */
</style>
