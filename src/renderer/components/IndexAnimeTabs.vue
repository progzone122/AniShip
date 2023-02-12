<template>
  <div class="mr-2 mt-2 mb-4">
    <v-tabs
      v-model="tab" dark class="rounded-lg" width="100%" hide-slider
      background-color="primary" @change="$store.commit('animes/changeTab', tab);"
    >
      <v-tabs-slider class="list-status_slider" />

      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>
  </div>
</template>
<script>
export default {
  name: 'IndexAnimeTabs',
  data () {
    return {
      tab: 0,
      items: [
        'Онгоинги', 'Лучшие релизы', 'Релизы', 'Анонсы'
      ]
    }
  }
}
</script>
