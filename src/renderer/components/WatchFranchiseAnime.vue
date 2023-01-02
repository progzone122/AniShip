<template>
  <div>
    <v-list color="transparent" class="rounded-lg">
      <v-list-item-group v-model="model">
        <div v-for="(item, i) in params.nodes" :key="i">
          <v-list-item class="rounded-lg" @click="select(item.id)">
            <v-list-item-content>
              <v-list-item-title style="color: white;" v-text="item.name" />
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list-item-group>
    </v-list>
  </div>
</template>
<script>
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
    select (id) {
      this.$router.push({ name: 'watch', query: { id } })
      // alert(id);
      // this.$route.query.id = id;
    }
  }
}
</script>
<style scoped lang="scss">
@import "~/assets/variables.scss";

.v-list {
    background-color: $color1 !important;
    padding: 0;
    margin-top: 0.5em;
    max-height: 25em;
    overflow-y: auto;
}
</style>
