<template>
  <v-container fluid>
    <v-col v-if="account === null || account === undefined" class="d-flex justify-center align-center">
      <v-card class="pa-8 rounded-lg" color="transparent" elevation="0">
        <v-col class="d-flex flex-column justify-center align-center">
          <img src="~/assets/favicon-shikimori.png" alt="" srcset="" width="100" height="100"
            style="background-size: cover;">
          <h3 class="my-2 mt-8">Для этого действия требуется авторизация в Shikimori</h3>
          <p>Авторизируйтесь для того, чтобы пользоваться полным функционалом приложения</p>
        </v-col>
      </v-card>
    </v-col>
    <v-col v-else>
      <!-- {{ animes }} -->
      <v-row justify="center">
        <v-expansion-panels>
          <v-expansion-panel v-for="animes2, date in animes" :key="anime" background="primary">
            <v-expansion-panel-header color="primary">{{ next_episode_at(date) }}</v-expansion-panel-header>
            <v-expansion-panel-content color="primary">
              <div v-for="anime in animes2">
                <v-row class="ml-2 mr-2 mt-4 mb-3 anime rounded-lg" @click="$router.push({ name: 'watch', query: { id: anime.id } })">
                  <img :src="'https://shikimori.me' + anime.image.original" style="width: 6em;" alt="" srcset="" class="rounded-lg">
                  <v-col class="ml-4">
                    <h4>{{ anime.russian }}</h4>
                    <v-chip-group>
                      <v-chip color="background" class="align-center">
                        <v-icon small class="mr-1">
                          mdi-star
                        </v-icon>
                        <p style="margin-top: 1.3em;">{{ anime.score }}</p>
                      </v-chip>
                      <v-chip color="background" class="align-center">
                        <v-icon small class="mr-1">
                          mdi-timer
                        </v-icon>
                        <p style="margin-top: 1.3em;">Онгоинг</p>
                      </v-chip>
                    </v-chip-group>
                  </v-col>
                </v-row>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <infinite-loading v-if="animes.length" spinner="spiral" @infinite="infiniteScroll" />
      </v-row>
    </v-col>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { format } from 'date-fns'

const ShikimoriAPI = require('~/assets/shikimori/index')
const shiki = new ShikimoriAPI()
export default {
  name: 'calendar_ongoings',
  layout: 'default',
  data() {
    return {
      page: 1,
      animes: {},
      ongoings: []
    }
  },
  computed: {
    ...mapActions('index/fetchProfile'),
    ...mapGetters([
      'account'
    ])
  },
  async created() {
    if (this.account !== null && this.account !== undefined) {
      await shiki.user_rates.anime_list(this.account.id, {
        page: this.page,
        limit: 30
      }).then(res => {
        // console.log(res);
        this.ongoings = res.filter((data) => data.anime.status === "ongoing");
      });
      console.log(this.ongoings)
      // let animes2 = {};
      let next_episode_at;
      for (const anime in this.ongoings) {
        await shiki.animes.get(this.ongoings[anime].anime.id).then((resp) => {
          next_episode_at = resp.next_episode_at.split("T")[0];
          if (next_episode_at in this.animes) {
            this.$set(this.animes[next_episode_at], this.animes[next_episode_at].length, resp);
          } else {
            this.$set(this.animes, [next_episode_at], [resp]);
          }
        });
      }
      console.log(this.animes);
    }
  },
  infiniteScroll($state) {
    this.page++
    setTimeout(() => {
      shiki.user_rates.anime_list(this.account.id, {
        page: this.page,
        limit: 30
      }).then(res => {
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
  methods: {
    next_episode_at(data) {
      const date = format(new Date(data), 'dd.MM.yyyy')
      console.log(date)
      return date
    }
  }
} 
</script>
<style lang="scss"></style>
<style scoped lang="scss">
@import "~/assets/variables.scss";

.anime {
  cursor: pointer;
  padding: 1em;

  &:hover {
    background-color: #0D0D0F;
  }
}
</style>
