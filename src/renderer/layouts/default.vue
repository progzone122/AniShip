<template>
  <v-app class="app">
    <Header />
    <v-main>
      <LeftMenu />
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <!-- <v-footer
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'DefaultLayout',
  components: {
    Header
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="scss">
@import "~/assets/variables.scss";
  html{
    overflow: hidden;
  }
  .app{
    background-color: $bg !important;
    height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .c{
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
    background-color: $color4;
  }
  ::-webkit-scrollbar-thumb {
      background: $color2;
      border-radius: 1em;
  }
  h1, h2, h3, h4, p{
    color: white;
  }
</style>
