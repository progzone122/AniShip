<template>
  <div style="width: 100%; height: 32em;">
    <iframe :src="iframe_src" width="100%" height="100%" frameborder="0" allowfullscreen />
  </div>
</template>
<script>
export default {
  name: 'KodikPlayer',
  props: ['params'],
  data () {
    return {
      iframe_src: null
    }
  },
  async created () {
    if (this.params !== null && this.params !== undefined) {
      this.iframe_src = `https://${this.params.data.results[0].link}`
    }
  }
}
</script>
<style scoped lang="scss">
@import "~/assets/variables.scss";

</style>
