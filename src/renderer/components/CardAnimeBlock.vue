<template>
  <v-card
    class="mx-6 my-6 card"
    width="220"
    max-height="500"
  >
    <v-img
      height="320"
      :src="image"
      class="rounded-lg"
    />
    <div class="watch_block rounded-lg">
      <v-icon>mdi-play-circle-outline</v-icon>
    </div>
    <v-card-title style="width: 100%; height: 3.2em;"><h4 class="clip">{{ title }}</h4></v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="params.score"
          length="10"
          color="amber"
          dense
          half-increments
          readonly
          size="12"
        />
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'CardAnimeBlock',
  props: ['params'],
  data () {
    return {
      image: 'https://shikimori.one' + this.params.image.original
    }
  },
  created () {
    if (this.params.russian !== null && this.params.russian !== undefined) {
      this.title = this.params.russian
    } else {
      this.title = this.params.name
    }
  }
}
</script>
<style scoped lang="scss">
@import "~/assets/variables.scss";
  .card{
    background-color: transparent !important;
    padding-bottom: 1em;
    box-shadow: none !important;
    &:hover{
      // background-color: $color3 !important;
      cursor: pointer;
      .watch_block{
        display: flex;
      }
    }
    .watch_block{
      width: 100%;
      height: 77.3%;
      position: absolute;
      top: 0;
      z-index: 2;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.7);
      display: none;
      i{
        font-size: 3em !important;
      }
    }
  }
  .clip{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  h4{
    color: white;
  }
</style>
