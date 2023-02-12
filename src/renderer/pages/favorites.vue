<template>
  <v-container fluid>
    <v-col v-if="account === null || account === undefined" class="d-flex justify-center align-center">
      <v-card class="pa-8 rounded-lg" color="transparent" elevation="0">
        <v-col class="d-flex flex-column justify-center align-center">
          <img
            src="~/assets/favicon-shikimori.png" alt="" srcset="" width="100" height="100"
            style="background-size: cover;"
          >
          <h3 class="my-2 mt-8">Для этого действия требуется авторизация в Shikimori</h3>
          <p>Авторизируйтесь для того, чтобы пользоваться полным функционалом приложения</p>
        </v-col>
      </v-card>
    </v-col>
    <div v-else style="width: 100%; display: flex; flex-direction: column; align-items: center;">
      <FavoritesAnimeTabs />
      <div class="animes">
        <div
          v-for="anime in animes" :key="anime"
          @click="$router.push({ name: 'watch', query: { id: anime.anime.id } })"
        >
          <CardAnimeBlock :params="anime.anime" />
        </div>
        <infinite-loading v-if="animes.length" spinner="spiral" @infinite="infiniteScroll" />
      </div>
    </div>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
const ShikimoriAPI = require('~/assets/shikimori/index')
const shiki = new ShikimoriAPI()

export default {
  name: 'Favorites',
  computed: {
    ...mapActions('index/fetchProfile'),
    ...mapGetters([
      'account'
    ]),
    computed_favoritesTab_active () {
      return this.$store.state.animes.favoritesTab_active
    }
  },
  watch: {
    computed_favoritesTab_active () {
      this.getAnimesByActiveTag(this.$store.state.animes.favoritesTab_active)
      return this.$store.state.animes.favoritesTab_active
    }
  },
  asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    if (store.state.account !== null && store.state.account !== undefined) {
      shiki.credentials.access_token = localStorage.getItem('access_token')
      shiki.credentials.refresh_token = localStorage.getItem('refresh_token')
    }
  },
  data () {
    return {
      animes: [],
      page: 1,
      active_tag: 'watching'
    }
  },
  async created () {
    this.getAnimesByActiveTag(this.active_tag)
  },
  methods: {
    async getAnimesByActiveTag (tag) {
      this.page = 1
      switch (this.$store.state.animes.favoritesTab_active) {
      case 0:
        this.active_tag = 'watching'
        break
      case 1:
        this.active_tag = 'planned'
        break
      case 2:
        this.active_tag = 'rewatching'
        break
      case 3:
        this.active_tag = 'completed'
        break
      case 4:
        this.active_tag = 'on_hold'
        break
      case 5:
        this.active_tag = 'dropped'
        break
      default:
        this.active_tag = 'watching'
        break
      }
      this.animes = []
      this.animes = await shiki.user_rates.anime_list(this.account.id, {
        status: this.active_tag,
        page: 1,
        limit: 30
      }).then(res => {
        // this.$store.commit("animes/setFavorites", {
        //   key: this.active_tag,
        //   value: this.animes
        // });
        // console.log(this.$store.state.animes[this.active_tag])
        return res
      })
    },
    infiniteScroll ($state) {
      this.page++
      setTimeout(() => {
        shiki.user_rates.anime_list(this.account.id, {
          status: this.active_tag,
          page: this.page,
          limit: 30
        }).then(res => {
          // delete res[0];
          console.log(res)
          if (res.length > 1) {
            res.forEach(element => {
              this.animes.push(element)
            })
            $state.loaded()
          } else {
            $state.complete()
          }
        })
      }, 1500)
    },
    get_data: item => {
      if (item === undefined) {
        return null
      }
      return localStorage.getItem(item)
    },
    set_data: (key, value) => {
      localStorage.setItem(key, value)
    }
  }
}
</script>
<style scoped lang="scss">
@import "~/assets/variables.scss";

.filters-group {
  .v-chip {
    background-color: $color4 !important;
    margin: 0.5em;

    h4 {
      margin-top: 0.2em;
      font-size: 16px;
      padding: 0.3em;
      padding-bottom: 0.4em;
    }
  }
}

.auth-failed-error {
  width: 100%;
  height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
