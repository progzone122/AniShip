<template>
  <v-card class="pa-4" color="primary">
    <vue-plyr ref="plyr" :options="playerOptions">
      <video data-plyr-config="{'autoplay': false}" />
    </vue-plyr>
    <div style="padding-left: 0.6em; display: flex; align-items: center; gap: 1em;">
      <v-col>
        <v-row class="d-flex align-center">
          <h3 class="mr-4 mt-2">Выбор качества:</h3>
          <div class="mt-2">
            <v-item-group mandatory>
              <v-container>
                <v-row>
                  <v-col v-for="(q, key) in quality" :key="n" cols="10" md="4">
                    <v-item v-slot="{ active, toggle }">
                      <v-card
                        :color="active ? 'primary' : ''" class="d-flex align-center rounded-lg serie_card" dark
                        height="40" width="70" elevation="0" color="transparent"
                        @click="toggle(); quality_select = pl.sources[source].setQuality(key).select;"
                      >
                        <div
                          v-if="(quality_select !== key)" class="text-h6 flex-grow-1 text-center rounded-lg"
                          style="text-transform: uppercase;"
                        >
                          {{ q }}
                        </div>
                        <div
                          v-if="quality_select === key" style="text-transform: uppercase;"
                          class="text-h6 flex-grow-1 text-center rounded-lg background"
                        >
                          {{ q }}
                        </div>
                      </v-card>
                    </v-item>
                  </v-col>
                </v-row>
              </v-container>
            </v-item-group>
          </div>
        </v-row>
      </v-col>
    </div>
    <v-item-group mandatory>
      <h3 style="padding-left: 0.6em;">Выбор серии:</h3>
      <v-container style="overflow-y: scroll; height: 25em;">
        <v-row>
          <v-col v-for="(item, key) in playlist" :key="n" cols="12" md="3">
            <v-item v-slot="{ active, toggle }">
              <v-card
                :color="active ? 'primary' : ''" class="d-flex align-center serie_card unselectable rounded-xl"
                dark height="110" elevation="0" color="transparent" @click="toggle(); pl.sources[source].play(key + 1)"
              >
                <div class="shadow">
                  <div v-if="active === false" class="text-h4 flex-grow-1 text-center banner">
                    {{ item.serie }} серия
                  </div>
                  <div v-if="active" class="text-h4 flex-grow-1 text-center">
                    <div class="rounded-lg mb-2" style="font-size: 2em !important;">
                      <v-icon>mdi-play-circle-outline</v-icon>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </v-card>
</template>
<script>
const api = require('sources')

export default {
  name: 'HlsPlayer',
  props: ['shikimori_info', 'source'],
  data () {
    return {
      playerOptions: {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
        settings: ['quality', 'speed', 'loop']
      },
      quality: null,
      quality_select: null,
      playlist: null,
      pl: null
    }
  },
  computed: {
    player () {
      return this.$refs.plyr.player
    }
  },
  async mounted () {
    this.api = require('sources')
    console.log(this.api)
    this.pl = new this.api({
      shikimori_info: this.shikimori_info,
      plyr: this.player,
      axios: this.$axios
    })
    console.log(this.pl.sources[this.source])
    this.playlist = await this.pl.sources[this.source].playlist
    this.quality = this.pl.sources[this.source].getQuality().quality
    this.quality_select = this.pl.sources[this.source].getQuality().select
    console.log(this.player.media)
    this.pl.sources[this.source].play()
    console.log(this.playlist)
  },
  async created () {

  }
}
</script>
<style scoped lang="scss">
@import "~/assets/variables.scss";

.serie_card {
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
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
