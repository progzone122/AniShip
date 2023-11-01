<template>
  <div class="carousel w-full h-[100%]" v-if="props.screenshots">
    <div v-for="(image, index) in screenshots" :key="index" :id="'slide' + index" class="carousel-item relative w-full">
      <div class="w-[100%] h-[100%] bg-cover cursor-pointer bg-center"
        :style="'background-image: url(https://shikimori.me' + image.original + ')'" />
      <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a :href="'#slide' + (index - 1)" class="btn btn-circle">❮</a>
        <a :href="'#slide' + (index + 1)" class="btn btn-circle">❯</a>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  screenshots: {
    type: Array,
    default: null,
  }
});
</script>