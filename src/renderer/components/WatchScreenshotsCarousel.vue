<template>
  <v-card :height="height" class="rounded-xl">
    <v-carousel cycle height="100%" hide-delimiters show-arrows-on-hover interval="15000">
      <v-carousel-item v-for="i in screenshots" :key="i">
        <v-sheet width="100%" height="100%">
          <v-img
            height="100%" width="100%" :src="'https://shikimori.one/' + i.original"
            style="background-size: cover !important;"
          />
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>
<script>
export default {
  props: ['height', 'anime_id'],
  data () {
    return {
      screenshots: []
    }
  },
  watch: {
    anime_id () {
      this.$axios.get('https://shikimori.one/api/animes/' + this.anime_id + '/screenshots').then(res => {
        this.screenshots = res.data
      })
    }
  },
  created () {
    this.$axios.get('https://shikimori.one/api/animes/' + this.anime_id + '/screenshots').then(res => {
      console.log(res)
      this.screenshots = res.data
    })
  }
}
</script>
