<template>
  <div v-if="props.anime" class="w-[100%] h-[21em] bg-cover animeCard cursor-pointer" :style="'background-image: url(https://shikimori.me/' + props.anime.image.original + ')'" @click="navigateTo({ path: '/watch', query: { id: props.anime.id } })">
    <!-- Background Overlay -->
    <div class="w-full h-full inset-0 bg-black opacity-60 hidden bg-overlay">
    </div>
    <div class="hidden bg-overlay-content relative top-[-12em]">
      <Icon class="cursor-pointer" name="material-symbols:play-circle-outline" color="white" size="88px" />
    </div>
  </div>
  <div class="mt-4">
    <p class="textP">{{ props.anime.russian ?? props.anime.name ?? "error" }}</p>
  </div>
</template>
<script setup>
const props = defineProps({
  anime: {
    type: Object,
    default: null,
  }
});
//
</script>
<style lang="scss">
.animeCard {
  &:hover {
    .bg-overlay {
      display: flex;
    }
    .bg-overlay-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>