<template>
  <div>
    <!-- <v-autocomplete
            dark
            color="primary"
            ref="country"
            v-model="country"
            :rules="[() => !!country || 'This field is required']"
            :items="countries"
            required
            placeholder="Поиск аниме..."
            filled
            rounded
            dense
            class="search-input"
        >
        <template v-slot:selection="{ item }">
asdasdsa
        </template>
        <template v-slot:item="{ item }">
asdasd
        </template>
        </v-autocomplete> -->
    <v-autocomplete
      v-model="model" :items="items" :loading="isLoading" :search-input.sync="search" clearable
      placeholder="Поиск аниме..." filled rounded dense class="search-input" hide-details hide-selected
      item-text="russian" item-value="symbol" append-icon=""
    >
      <template #no-data>
        <v-list-item>
          <v-list-item-title style="color: white !important;">
            Результаты не найдены
            <!-- <strong>Cryptocurrency</strong> -->
          </v-list-item-title>
        </v-list-item>
      </template>
      <!-- <template v-slot:selection="{ attr, on, item, selected }">
                <v-chip v-bind="attr" :input-value="selected" color="blue-grey" class="white--text" v-on="on">
                    <v-icon left>mdi-coin</v-icon>
                    <span v-text="item.name"></span>
                </v-chip>
            </template> -->
      <template #item="{ item }">
        <v-list-item class="list-results" @click="$router.push({ name: 'watch', query: { id: item.id } });">
          <div style="width: 3em; margin-right: 1em;">
            <v-img height="70" :src="'https://shikimori.one' + item.image.x96" class="rounded-lg" />
          </div>
          <v-list-item-content>
            <v-list-item-title style="color: white;" v-text="item.russian" />
            <!-- <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle> -->
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-autocomplete>
  </div>
</template>
<script>
const ShikimoriAPI = require('~/assets/shikimori/index')
const shiki = new ShikimoriAPI()

export default {
  data: () => ({
    isLoading: false,
    items: null,
    model: null,
    search: null,
    tab: null,
    page: 1,
    delayTimer: null
  }),

  watch: {
    model (val) {
      if (val != null) this.tab = 0
      else this.tab = null
    },
    search (val) {
      this.isLoading = true

      if (this.delayTimer !== null) {
        clearTimeout(this.delayTimer)
      }
      this.delayTimer = setTimeout(() => {
        shiki.animes.list({
          search: val,
          limit: 15
        }).then(res => {
          this.items = res
        })
        console.log(this.items)
        this.isLoading = false
      }, 700)
    }
  }
}
</script>
<style scoped lang="scss">
@import "~/assets/variables.scss";

.theme--light.v-list {
  background: $color4;
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding-top: 1em;
  cursor: pointer;
}

.list-results {
  width: 40vw;
}
</style>
