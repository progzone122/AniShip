<template>
  <v-app dark class="app" :style="{background: $vuetify.theme.themes.dark.background}">
    <v-container fluid>
      <Header />
      <v-main class="pl-15 mt-16">
        <LeftMenu />
        <v-container fluid>
          <Nuxt />
        </v-container>
      </v-main>
      <!-- <v-footer
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
    }
  }
}
</script>
<style lang="scss">
@import "~/assets/variables.scss";
.c {
  margin-left: 2em !important;
  margin-top: 5em;
  display: flex;
  flex-direction: column;
  align-items: center;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar {
  background-color: #1A171E;
}

::-webkit-scrollbar-thumb {
  background-color: #0D0D0F;
  border-radius: 1em;
}

h1,
h2,
h3,
h4,
p {
  color: white;
}

/* */
.animes {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

/* */
// .theme--dark.v-tabs>.v-tabs-bar {
//   background-color: $color2 !important;
// }
</style>
