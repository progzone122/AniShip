<template>
  <div class="c" style="width: 100%">
    <video
      id="aplayer"
      ref="videoPlayer"
      class="video-js vjs-theme-city"
      style="width: 100%; margin-bottom: 1em"
      playsinline
    />
    <div class="series" style="gap: 1em; margin-bottom: 1em">
      <button
        type="button"
        class="btn btn-dark"
        style="width: 31vw"
        @click="
          changeAnilibriaSeries(
            options.sources[Number.parseInt(selectSeries.name.split(' сери')[0]) - 2]
          )
        "
      >
        Предыдущая серия
      </button>
      <button
        type="button"
        class="btn btn-dark"
        style="width: 31vw"
        @click="
          changeAnilibriaSeries(
            options.sources[Number.parseInt(selectSeries.name.split(' сери')[0])]
          )
        "
      >
        Следующая серия
      </button>
    </div>
    <div
      class="series"
      style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1em"
    >
      <button
        v-for="i in options.sources"
        type="button"
        class="btn btn-dark"
        @click="changeAnilibriaSeries(i)"
      >
        {{ i.name }}
      </button>
    </div>
  </div>
</template>

<script>
import videojs from 'video.js';

export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      player: null,
      selectSeries: this.options.sources[0],
    };
  },
  async mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.options, () => {
      this.player.log("onPlayerReady", this);
    });
  },
  async beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
  methods: {
    async changeAnilibriaSeries(series) {
      console.log(series);
      this.player.src(series.src);
      this.player.play();
      this.selectSeries = series;
    },
  },
};
</script>
<style>
.c {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2em;
}
.series {
  width: 65vw;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  gap: 1em;
  justify-content: center;
}
.series li {
  margin: 0;
  padding-top: 1em;
  padding-left: 1em;
  padding-right: 1em;
  background-color: rgb(39, 39, 39);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
}
.series li p {
  color: white;
}
</style>
