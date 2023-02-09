<template>
  <v-container fluid>
    <IndexAnimeTabs />
    <div id="top" style="display: flex; gap: 1em; margin-left: 1em;">
        <div class="animes">
          <div
            v-for="anime in animes_list" :key="anime"
            @click="$router.push({ name: 'watch', query: { id: anime.id } })"
          >
            <CardAnimeBlock :params="anime" />
          </div>
          <infinite-loading v-if="animes_list" spinner="spiral" @infinite="infiniteScroll" />
        </div>
      </div>
      <!-- -->  
    <v-btn
      v-if="top_button" elevation="6" fab large fixed style="bottom: 2em; right: 3em;" class="top-button" 
      color="primary"
      @click="toTop()"
    >
      <v-icon>mdi-arrow-up</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
const ShikimoriAPI = require('~/assets/shikimori/index')
const shiki = new ShikimoriAPI()

export default {
  name: 'Index',
  layout: 'default',
  data () {
    return {
      animes_list: null,
      page: 1,
      top_button: false
    }
  },
  fetch () {
    this.animes_list = this.$store.state.animes.ongoing
  },
  computed: {
    tab () {
      return this.$store.state.animes.indexTab_active
    }
  },
  watch: {
    tab () {
      this.page = 1
      switch (this.$store.state.animes.indexTab_active) {
      case 0:
        this.$store.commit('animes/setOngoing', this.$store.state.animes.ongoing.slice(0, 30))
        this.animes_list = this.$store.state.animes.ongoing
        break
      case 1:
        this.$store.commit('animes/setRanked_released', this.$store.state.animes.ranked_released.slice(0, 30))
        this.animes_list = this.$store.state.animes.ranked_released
        break
      case 2:
        this.$store.commit('animes/setReleased', this.$store.state.animes.released.slice(0, 30))
        this.animes_list = this.$store.state.animes.released
        break
      case 3:
        this.$store.commit('animes/setAnons', this.$store.state.animes.anons.slice(0, 30))
        this.animes_list = this.$store.state.animes.anons
        break
      default:
        break
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      setInterval(() => {
        if (window.scrollY > 1000) {
          this.top_button = true
        } else {
          this.top_button = false
        }
      }, 1000)
    })
  },
  created () {
    console.log(this.animes_list)

    console.log(this.animes_list)
  },
  methods: {
    toTop () {
      window.scrollTo(0, 0)
    },
    infiniteScroll ($state) {
      this.page++
      setTimeout(() => {
        switch (this.tab) {
        case 0:
          shiki.animes.list({
            status: 'released',
            order: 'ranked',
            page: this.page,
            limit: 30
          }).then(res => {
            if (res.length > 1) {
              res.forEach(item => this.$store.commit('animes/addOngoing', item))
              $state.loaded()
            } else {
              $state.complete()
            }
          }).catch(err => {
            console.log(err)
          })
          break
        case 1:
          shiki.animes.list({
            status: 'released',
            order: 'ranked',
            page: this.page,
            limit: 30
          }).then(res => {
            if (res.length > 1) {
              res.forEach(item => this.$store.commit('animes/addRanked_released', item))
              $state.loaded()
            } else {
              $state.complete()
            }
          }).catch(err => {
            console.log(err)
          })
          break
        case 2:
          shiki.animes.list({
            status: 'released',
            order: 'popularity',
            page: this.page,
            limit: 30
          }).then(res => {
            if (res.length > 1) {
              res.forEach(item => this.$store.commit('animes/addReleased', item))
              $state.loaded()
            } else {
              $state.complete()
            }
          }).catch(err => {
            console.log(err)
          })
          break
        case 3:
          shiki.animes.list({
            status: 'anons',
            order: 'popularity',
            page: this.page,
            limit: 30
          }).then(res => {
            if (res.length > 1) {
              res.forEach(item => this.$store.commit('animes/addAnons', item))
              $state.loaded()
            } else {
              $state.complete()
            }
          }).catch(err => {
            console.log(err)
          })
          break
        default:
          shiki.animes.list({
            status: 'released',
            order: 'ranked',
            page: this.page,
            limit: 30
          }).then(res => {
            if (res.length > 1) {
              res.forEach(item => this.animes_list.push(item))
              $state.loaded()
            } else {
              $state.complete()
            }
          }).catch(err => {
            console.log(err)
          })
          break
        }
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
  cursor: pointer;
}

i {
  color: white !important;
}
</style>
