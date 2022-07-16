<template>
  <div style="display: flex;">
    <LeftMenu />
    <nuxt />
  </div>
</template>

<script>
import LeftMenu from '../components/LeftMenu.vue'
export default {
  name: 'DefaultLayout',
  components: {
    LeftMenu
  }
}
</script>

<style>
#app, body, html {
  width: 100vw;
  background-color: #121212;
  height: 100vh;
  overflow-x: hidden;
}
::-webkit-scrollbar-track {
    border-radius: 8px;
}
::-webkit-scrollbar {
    width: 9px;
}
::-webkit-scrollbar-thumb {
    border-radius: 8px;
}
::-webkit-scrollbar-thumb {
    background: #1A1E21;
}
</style>
