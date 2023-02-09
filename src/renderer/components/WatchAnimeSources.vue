<template>
  <v-select v-model="e7" dark :items="items" hide-details solo class="s rounded-lg justify-center" dense flat
    background-color="success" append-icon="mdi-play">
    <template #label>
      <p>Смотреть</p>
    </template>
    <template #no-data>
      <div />
    </template>
    <template #item="{ item }" @click="setList(item)">
      <!-- <v-divider class="mb-2"></v-divider> -->
      <div style="width: 100%; height: 100%;" @click="setList(item)">
        <v-list dense>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title style="color: white;" v-text="item" />
              <!-- <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle> -->
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </template>
  </v-select>
</template>
<script>
const api = require("sources");
export default {
  name: 'SetAnimeList',
  props: ['anime'],
  data() {
    return {
      items: [],
      e7: null
    }
  },
  created() {
    this.pl = new api({
      shikimori_info: this.anime,
      plyr: null,
      axios: this.$axios
    })
    this.pl.sources.forEach(element => {
      this.items.push(element.name);
    });
  },
  methods: {
    setList(item) {
      $nuxt.$emit('sourceShow', this.items.indexOf(item))
    }
  }
}
</script>
<style lang="scss">
@import "~/assets/variables.scss";

.theme--dark.s {
  margin-top: 0.5em !important;

  input {
    cursor: pointer !important;
  }

  .v-input__control {
    .v-input__slot {
      height: 2em !important;
      color: white !important;
    }
  }

  .theme--light.v-label {
    color: rgb(252, 252, 252);
  }

  // .theme--light.v-select .v-select__selection--comma {
  //     color: rgba(0, 0, 0, 0.87);
  // }
}

// .theme--light.v-text-field--solo>.v-input__control>.v-input__slot {
//     background: #9d2449 !important;
//     color: white !important;

// }
</style>
<style scoped lang="scss">
@import "~/assets/variables.scss";

.theme--light.v-list {
  background: $color1 !important;
}
</style>
