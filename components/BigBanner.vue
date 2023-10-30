<template>
  <div v-if="Object.keys(props.anime).length !== 0">
    <div class="w-[100vw] h-[80vh] bg-cover"
         :style="'background-image: url(https://shikimori.me/' + props.anime.screenshots[0].original ?? null + ')'">
      <!-- Background Overlay -->
      <div class="w-full h-full inset-0 bg-black opacity-60"></div>
    </div>
    <div class="w-[100vw] relative h-[80vh] top-[-80vh] pl-28 pr-16 pb-16 flex flex-col justify-end">
      <div class="pb-8 h-[70%] flex flex-col justify-end overflow-hidden">
        <h1 class="font-bold text-5xl pb-6 bigBannerAnimeH1">{{ props.anime.info.russian ?? props.anime.info.name ?? "error" }}</h1>
        <p class="overflow-hidden bigBannerAnimeP">
          {{ stripHtmlTags(props.anime.info.description_html ?? null) }}
        </p>
      </div>
      <button class="btn btn-accent bigBannerWatchButton w-[12em]" @click="navigateTo({ path: '/watch', query: { id: props.anime.info.id } })">Смотреть</button>
    </div>
  </div>
  <div class="w-[100vw] h-[80vh] bg-black flex justify-center items-center" v-else>
    <span class="loading loading-ring loading-lg" style="width: 8em;"></span> <!-- loading -->
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  anime: {
    type: Object,
    default: {},
  },
});
//@click="navigateTo({ path: '/watch', query: { id: props.anime.id } })"
function stripHtmlTags(str) {
  // Регулярное выражение для удаления всех HTML-тегов из строки
  return str.replace(/<[^>]+>/g, '');
}
</script>