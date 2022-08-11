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
