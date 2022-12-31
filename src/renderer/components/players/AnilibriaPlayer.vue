<template>
  <div class="main">
    <vue-plyr ref="plyr" :options="playerOptions">
      <video data-plyr-config="{'autoplay': false}" />
    </vue-plyr>
    <div style="padding-left: 0.6em; display: flex; align-items: center; gap: 1em;">
      <h3>Выбор качества:</h3>
      <v-item-group mandatory>
        <v-container>
          <v-row>
            <v-col v-for="(q, key) in params.player.playlist[serie_select].hls" :key="n" cols="10" md="4">
              <v-item v-slot="{ active, toggle }">
                <v-card
                  :color="active ? 'primary' : ''" class="d-flex align-center rounded-lg serie_card" dark
                  height="40" width="70" elevation="0"
                  color="transparent" @click="toggle(); quality = key; play(params.player.playlist[serie_select]);"
                >
                  <div
                    v-if="(quality !== key)" class="text-h6 flex-grow-1 text-center rounded-lg"
                    style="text-transform: uppercase;"
                  >
                    {{ key }}
                  </div>
                  <div v-if="quality === key" class="text-h6 flex-grow-1 text-center rounded-lg active2">
                    {{ key }}
                  </div>
                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
    </div>
    <v-item-group mandatory>
      <h3 style="padding-left: 0.6em;">Выбор серии:</h3>
      <v-container style="overflow-y: scroll; height: 25em;">
        <v-row>
          <v-col v-for="item in params.player.playlist" :key="n" cols="12" md="3">
            <v-item v-slot="{ active, toggle }">
              <v-card
                :color="active ? 'primary' : ''" class="d-flex align-center serie_card unselectable"
                :style="'background-image:' + 'url(' + 'https://www.anilibria.tv' + item.preview + ');'" dark
                height="110" elevation="0" color="transparent" @click="toggle(); play(item)"
              >
                <div class="shadow">
                  <div v-if="active === false" class="text-h4 flex-grow-1 text-center banner">
                    {{ item.serie }} серия
                  </div>
                  <v-scroll-y-transition>
                    <div v-if="active" class="text-h4 flex-grow-1 text-center">
                      <div class="rounded-lg" style="font-size: 2em !important;">
                        <v-icon>mdi-play-circle-outline</v-icon>
                      </div>
                    </div>
                  </v-scroll-y-transition>
                </div>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </div>
</template>
<script>
import Hls from 'hls.js'
export default {
  name: 'AnilibriaPlayer',
  props: ['params'],
  data () {
    return {
      playerOptions: {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
        settings: ['quality', 'speed', 'loop']
      },
      serie_select: 1,
      quality: 'hd'
    }
  },
  computed: {
    player () {
      console.log(this.$refs.plyr.player)
      return this.$refs.plyr.player
    }
  },
  mounted () {
    console.log(this.params.player.playlist)
    if (Hls.isSupported()) {
      const hls = new Hls()

      hls.loadSource(`https://${this.params.player.host}${this.params.player.playlist[1].hls[this.quality]}`)
      hls.attachMedia(this.player.media)
      window.hls = hls
    }
  },
  async created () {
    // if (this.params !== null && this.params !== undefined) {
    //   this.iframe_src = this.params.data.results[0].link
    // }
  },
  methods: {
    play (serie) {
      console.log(this.quality)
      if (Hls.isSupported()) {
        const hls = new Hls()

        hls.loadSource(`https://${this.params.player.host}${serie.hls[this.quality]}`)
        hls.attachMedia(this.player.media)
        this.serie_select = serie.serie
        window.hls = hls
      }
    }
  }
}
</script>
<style scoped lang="scss">
@import "~/assets/variables.scss";

.serie_card {
  background-color: $color1 !important;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  .banner {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .shadow {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .active {
    width: 100%;
    height: 100%;
  }

  .active2 {
    width: 100%;
    height: 100%;
    background-color: $color4 !important;
    // padding: 1em;
    // padding-left: 1.2em;
    // padding-right: 1.2em;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.main {
  height: 100%;
  // position: absolute;
  // top: 150px;
  // left: 150px;
  // overflow-x: hidden;
  // overflow-y: auto;

}
</style>
