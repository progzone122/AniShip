<template>
  <v-navigation-drawer permanent expand-on-hover style="margin-top: 3em;" fixed dark floating color="primary">
    <v-list>
      <v-list-item
        v-if="$store.state.account !== undefined && $store.state.account !== null && Object.keys($store.state.account).length !== 0"
        link
      >
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ nickname }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ "#" + id }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content style="width: 100% !important;">
          <div style="width: 1em;" class="d-flex justify-end">
            <v-btn icon @click="logout()">
              <v-icon style="margin: 0; padding: 0;">
                mdi-location-exit
              </v-icon>
            </v-btn>
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-else link>
        <AuthDialog />
      </v-list-item>
    </v-list>

    <v-divider />

    <v-list nav dense rounded>
      <v-list-item v-for="item in items" :key="item" link @click="$router.push({ name: item.to })">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
const ShikimoriAPI = require('~/assets/shikimori/index')
const shiki = new ShikimoriAPI()
export default {
  name: 'LeftMenu',
  data () {
    return {
      items: [
        {
          icon: 'mdi-compass-outline',
          title: 'Навигатор',
          to: 'navigation'
        },
        {
          icon: 'mdi-home-outline',
          title: 'Главная',
          to: 'index'
        },
        {
          icon: 'mdi-heart-outline',
          title: 'Избранное',
          to: 'favorites'
        },
        {
          icon: 'mdi-cog-outline',
          title: 'Настройки',
          to: 'settings'
        }
      ]
    }
  },
  computed: {
    ...mapActions(['index/fetchProfile']),
    nickname () {
      return this.$store.state.account.nickname
    },
    id () {
      return this.$store.state.account.id
    },
    watch: {
      nickname () {
        return this.$store.state.account.nickname
      },
      id () {
        return this.$store.state.account.id
      }
    }
  },
  created () {
    // const refresh_token = localStorage.getItem('refresh_token') ?? null
    // if (refresh_token !== null) {
    //   this.$store.dispatch('fetchRefreshAuth', localStorage.getItem('refresh_token')).then(res => {
    //     console.log(res)
    //     localStorage.setItem('access_token', res.accesstoken)
    //     localStorage.setItem('refresh_token', res.refreshtoken)
    //     this.$store.dispatch('fetchProfile', res.accesstoken)
    //   })
    // }
  },
  methods: {
    get_data: item => {
      if (item === undefined) {
        return null
      }
      return localStorage.getItem(item)
    },
    async logout () {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      shiki.credentials.access_token = null
      shiki.credentials.refresh_token = null
      // await this.$store.commit('setAccountId', null)
      this.$router.go(0)
    }
  }
}
</script>
<style scoped lang="scss">
@import "~/assets/variables.scss";

.menu {
  background-color: $color3 !important;
  margin-top: 3.5em;
  z-index: 1;
}
</style>
