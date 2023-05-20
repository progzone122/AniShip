<template>
  <v-card color="primary" class="rounded-lg">
    <v-col class="ma-0">
      <h4 class="ml-4 mt-4">Смотри также</h4>
      <div v-if="animes" class="main ma-0 pa-4" width="100%">
        <div v-for="anime in animes" :key="anime">
          <div @click="setAnime(anime)">
            <CardAnimeBlock :params="anime" />
          </div>
        </div>
      </div>
    </v-col>
  </v-card>
</template>
<script>
const ShikimoriAPI = require('~/assets/shikimori/index')
const shiki = new ShikimoriAPI()

export default {
  name: 'WatchSimilarAnimes',
  props: ['id'],
  data () {
    return {
      animes: null
    }
  },
  async fetch () {
    this.$axios.get(`https://shikimori.me/api/animes/${this.id}/similar`).then(res => {
      this.animes = res.data
    }).catch(err => {
      setTimeout(() => {
        this.$axios.get(`https://shikimori.me/api/animes/${this.id}/similar`).then(res => {
          this.animes = res.data
        })
      }, 1000)
    })
  },
  created () {

  },
  methods: {
    async setAnime (anime) {
      const shikimori = await shiki.animes.get(anime.id)
      const shikimori_franchise = await shiki.animes.getFranchise(anime.id)
      this.$nuxt.$emit('watchSimilarAnimes', {
        shikimori,
        shikimori_franchise
      })
    }
  }
}
</script>
<style scoped lang="scss">
@import "~/assets/variables.scss";

.main {
  display: flex;
  overflow-y: hidden;
  overflow-x: auto;
}
</style>
