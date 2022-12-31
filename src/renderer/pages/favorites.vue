<template>
  <v-container class="c">
    <div v-if="account === null || account === undefined" class="auth-failed-error">
      <img src="~/assets/favicon-shikimori.png" alt="" srcset="">
      <h3>Для этого действия требуется авторизация в Shikimori</h3>
      <p>Авторизируйтесь для того, чтобы пользоваться полным функционалом приложения</p>
    </div>
    <div v-else style="width: 100%; display: flex; flex-direction: column; align-items: center;">
      <div>
        <v-chip-group dark mandatory class="filters-group">
          <div v-for="tag in tags">
            <v-chip :key="tag.value" @click="getAnimesByActiveTag(tag.value)">
              <h4>
                {{ tag.name }}
              </h4>
            </v-chip>
          </div>
        </v-chip-group>
        <div class="animes">
          <div v-for="anime in animes" :key="anime" @click="$router.push({ name: 'watch', query: { id: anime.anime.id } })">
            <CardAnimeBlock :params="anime.anime" />
          </div>
          <infinite-loading v-if="animes.length" spinner="spiral" @infinite="infiniteScroll" />
        </div>
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
    ])
  },
  data () {
    return {
      animes: [],
      page: 1,
      active_tag: 'watching',
      tags: [
        {
          name: 'Смотрю',
          value: 'watching'
        },
        {
          name: 'Запланировано',
          value: 'planned'
        },
        {
          name: 'Пересматриваю',
          value: 'rewatching'
        },
        {
          name: 'Просмотрено',
          value: 'completed'
        },
        {
          name: 'Отложено',
          value: 'on_hold'
        },
        {
          name: 'Брошено',
          value: 'dropped'
        }
      ]
    }
  },
  async created () {
    if (this.account !== null && this.account !== undefined) {
      shiki.credentials.access_token = localStorage.getItem('access_token')
      shiki.credentials.refresh_token = localStorage.getItem('refresh_token')
      this.getAnimesByActiveTag(this.active_tag)
    }
  },
  methods: {
    async getAnimesByActiveTag (tag) {
      this.page = 1
      this.active_tag = tag
      this.animes = []
      this.animes = await shiki.user_rates.anime_list(this.account.id, {
        status: tag,
        page: 1,
        limit: 12
      })
    },
    infiniteScroll ($state) {
      this.page++
      setTimeout(() => {
        shiki.user_rates.anime_list(this.account.id, {
          status: this.active_tag,
          page: this.page,
          limit: 12
        }).then(res => {
          delete res[0]
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

  img {
    width: 6em;
    height: 6em;
    margin-bottom: 1em;
  }
}
</style>
