<template>
  <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4" v-if="props.animes.length !== 0">
    <div v-for="anime in animes">
      <AnimeCard :anime="anime" />
    </div>
  </div>
  <div class="w-[100%] flex justify-center ml-[-2em]" v-else>
    <span class="loading loading-ring loading-lg" style="width: 5em;"></span> <!-- loading -->
  </div>
</template>
<script setup>
const props = defineProps({
  animes: {
    type: Array,
    default: [],
  }
});
</script>