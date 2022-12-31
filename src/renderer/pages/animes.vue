<template>
  <v-container class="c">
    <div class="animes">
      <div v-for="i in animes" :key="i" @click="$router.push({ name: 'watch', query: { id: i.id } })">
        <CardAnimeBlock :params="i" />
      </div>
      <infinite-loading v-if="animes.length" spinner="spiral" @infinite="infiniteScroll" />
    </div>
  </v-container>
</template>

<script>
const ShikimoriAPI = require('~/assets/shikimori/index')
const shiki = new ShikimoriAPI()

export default {
  name: 'Animes',
  data () {
    return {
      animes: [],
      page: 1
    }
  },
  created () {
    this.fetchData()
    shiki.animes.list({
      status: this.$route.query.status,
      order: 'popularity',
      page: 1,
      limit: 12
    }).then(res => {
      this.animes = res
    })
  },

  methods: {
    async fetchData () {
      const response = await this.$axios.get(this.url)
      this.animes = response.data
      console.log(this.animes)
    },
    infiniteScroll ($state) {
      this.page++
      setTimeout(() => {
        shiki.animes.list({
          status: this.$route.query.status,
          order: 'popularity',
          page: this.page,
          limit: 12
        }).then(res => {
          if (res.length > 1) {
            res.forEach(item => this.animes.push(item))
            $state.loaded()
          } else {
            $state.complete()
          }
        })
        // this.$axios
        //   .get(this.url)
        //   .then(response => {
        //     if (response.data.length > 1) {
        //       response.data.forEach(item => this.animes.push(item))
        //       $state.loaded()
        //     } else {
        //       $state.complete()
        //     }
        //   })
        //   .catch(err => {
        //     console.log(err)
        //   })
      }, 500)
    }
  }
}
</script>
<style lang="scss">
@import "~/assets/variables.scss";

.bl {
  color: white !important;
  padding-left: 1.5em;
  padding-right: 1.5em;
  font-weight: 600;
}

i {
  color: white !important;
}

.animes {
  margin-top: 1em;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
