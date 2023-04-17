<template>
  <v-card :height="height" class="rounded-xl">
    <v-carousel height="100%" hide-delimiters show-arrows-on-hover>
      <v-carousel-item v-for="(i, pos) in videos" :key="i">
        <v-sheet width="100%" height="100%">
          <iframe :src="videos[pos].player_url" frameborder="0" style="width: 100%; height: 100%;" allowfullscreen></iframe>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>
<script>
export default {
  props: ['height', 'videos'],
  data () {
    return {
    }
  },
  created () {
    console.log(this.videos);
  }
}
</script>
