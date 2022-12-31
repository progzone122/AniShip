<template>
  <div style="display: flex; align-items: center; gap: 0.3em;">
    <v-select
      v-model="e7" dark :items="items" label="Добавить в список" hide-details solo class="s rounded-lg" dense
      flat
    >
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
    <div style="margin-top: 0.5em !important;">
      <v-btn height="35" icon @click="remove_rate()">
        <v-icon style="font-size: 1.3em !important;">
          mdi-star-remove-outline
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

const Shikimori = require('~/assets/shikimori')
const shiki = new Shikimori()

export default {
  name: 'SetAnimeList',
  props: ['anime'],
  data () {
    return {
      items: [
        'Смотрю',
        'Запланировано',
        'Пересматриваю',
        'Просмотрено',
        'Отложено',
        'Брошено'
      ],
      value: [
        'watching',
        'planned',
        'rewatching',
        'completed',
        'on_hold',
        'dropped'
      ],
      e7: null
    }
  },
  computed: {
    ...mapGetters([
      'account'
    ])
  },
  created () {
    shiki.user_rates.get({
      user_id: this.account.id,
      target_id: this.anime.id,
      target_type: 'Anime'
    }).then(res => {
      if (res.length !== 0) {
        this.e7 = this.items[this.value.indexOf(res[0].status)]
      }
    })
  },
  methods: {
    setList (status) {
      shiki.credentials.access_token = localStorage.getItem('access_token')
      shiki.credentials.refresh_token = localStorage.getItem('refresh_token')
      shiki.user_rates.create({
        user_id: this.account.id,
        target_id: this.anime.id,
        target_type: 'Anime',
        status: this.value[this.items.indexOf(status)]
      })
    },
    remove_rate () {
      shiki.credentials.access_token = localStorage.getItem('access_token')
      shiki.credentials.refresh_token = localStorage.getItem('refresh_token')
      shiki.user_rates.get({
        user_id: this.account.id,
        target_id: this.anime.id,
        target_type: 'Anime'
      }).then(res => {
        if (res.length !== 0) {
          shiki.user_rates.destroy(res[0].id).then(res => {
            this.e7 = null
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import "~/assets/variables.scss";

.theme--dark.s {
  background-color: $color1;
  margin-top: 0.5em !important;

  input {
    cursor: pointer !important;
  }

  .v-input__control {
    .v-input__slot {
      height: 2em !important;
      background: $color1 !important;
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
