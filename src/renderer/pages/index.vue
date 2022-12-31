<template>
  <v-container class="c">
    <div v-for="i in animes_list">
      <div v-if="i !== null">
        <div @click="$router.push({ name: 'animes', query: { status: i.status } })">
          <v-chip color="#29455c" large class="bl">
            {{ i.name }}
          </v-chip>
        </div>
        <div class="animes">
          <div v-for="anime in i.data" :key="anime" @click="$router.push({ name: 'watch', query: { id: anime.id } })">
            <CardAnimeBlock :params="anime" />
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
const ShikimoriAPI = require('~/assets/shikimori/index')
const shiki = new ShikimoriAPI()

export default {
  name: 'Index',
  layout: 'default',
  async asyncData ({ $axios }) {
    const released = await shiki.animes.list({
      status: 'released',
      order: 'popularity',
      limit: 12
    })
    const critic = await shiki.animes.list({
      status: 'released',
      order: 'ranked',
      limit: 12
    })
    const ongoing = await shiki.animes.list({
      status: 'ongoing',
      order: 'popularity',
      limit: 12
    })
    const anons = await shiki.animes.list({
      status: 'anons',
      order: 'popularity',
      limit: 12
    })
    // console.log(await $axios.$get('https://localhost:3033/shikimori/add?user_id=1017013&target_id=5114'));
    return {
      animes_list: [
        {
          name: 'Онгоинги',
          status: 'ongoing',
          data: ongoing
        },
        {
          name: 'Лучшие релизы',
          status: 'critic',
          data: critic
        },
        {
          name: 'Релизы',
          status: 'released',
          data: released
        },
        {
          name: 'Анонсы',
          status: 'anons',
          data: anons
        }
      ]
    }
  },
  data () {
    return {
    }
  },
  created () {

  }
}
</script>
<style lang="scss">
@import "~/assets/variables.scss";

.c {
  width: 100vw;
}

.bl {
  color: white !important;
  padding-left: 1.5em;
  padding-right: 1.5em;
  font-weight: 600;
  cursor: pointer;
}

i {
  color: white !important;
}

.animes {
  margin-top: 1em;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
<style scoped lang="scss">
@import "~/assets/variables.scss";
</style>
