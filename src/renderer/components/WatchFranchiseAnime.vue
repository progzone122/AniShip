<template>
  <v-list color="primary" height="70%">
    <v-list-item-group v-model="model">
      <div v-for="(item, i) in params.nodes" :key="i">
        <v-list-item @click="select(item.id)">
          <v-list-item-content>
            <v-list-item-title style="color: white;" v-text="item.name" />
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list-item-group>
  </v-list>
</template>
<script>
const ShikimoriAPI = require('~/assets/shikimori/index')
const shiki = new ShikimoriAPI()

export default {
  name: 'WatchFranchiseAnime',
  props: ['params'],
  data () {
    return {
      model: 0
    }
  },
  created () {
    this.params.nodes.forEach((element, key) => {
      if (element.id === this.params.current_id) {
        this.model = key
      }
    })
  },
  methods: {
    async select (id) {
      const shikimori = await shiki.animes.get(id)
      this.$nuxt.$emit('watchFranchiseAnime', {
        shikimori
      })
    }
  }
}
</script>
<style scoped lang="scss">
@import "~/assets/variables.scss";

.v-list {
  padding: 0;
  margin-top: 0.5em;
  overflow-y: auto;
}
</style>
